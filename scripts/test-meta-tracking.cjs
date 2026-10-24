// Run with: node scripts/test-meta-tracking.cjs
// Exercise emitted events and asynchronous cart actions without contacting Meta/Shopify.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const crypto = require('node:crypto').webcrypto;

function load(file, imports = {}, globals = {}) {
  const exports = {};
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(output, {
    exports, process, crypto, ...globals,
    require(name) {
      if (name in imports) return imports[name];
      throw new Error(`Unexpected import: ${name}`);
    },
  }, { filename: file });
  return exports;
}
const jsx = { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
const catalog = load('lib/catalog/catalog.ts');
const window = { location: { href: '' } };
const calls = [];
const pixel = load('lib/analytics/meta-pixel.ts', {}, { window });
pixel.trackViewContent({ contentIds: ['53217456259390'], contentName: 'Branded', value: 44.99 });
assert.equal(window.__ppmMetaQueue.length, 1, 'early hero event must be queued');
const component = load('components/MetaPixel.tsx', {
  'react/jsx-runtime': jsx, 'next/script': {}, '@/lib/analytics/meta-pixel': pixel,
});
const script = component.MetaPixel().props.children[0].props.children;
window.fbq = (...args) => calls.push(args);
// Model the existing SDK stub so the loader does not create a network script.
const document = {};
vm.runInNewContext(script, { window, document, fbq: window.fbq, crypto });
vm.runInNewContext(script, { window, document, fbq: window.fbq, crypto });
assert.equal(calls.filter(a => a[0] === 'init').length, 1, 'initialization is idempotent');
assert.equal(calls.filter(a => a[2] === 'PageView').length, 1);
assert.equal(calls.filter(a => a[2] === 'ViewContent').length, 1, 'queue flushes exactly once');
assert.equal(window.__ppmMetaQueue.length, 0);

let fetchCalls = 0;
let respond;
let response;
const react = {
  createContext: () => ({ Provider: 'Provider' }),
  useCallback: f => f, useMemo: f => f(), useContext: () => {}, useEffect: () => {},
  useRef: value => ({ current: value }), useState: value => [value, () => {}],
};
const provider = load('components/cart/CartProvider.tsx', {
  'react/jsx-runtime': jsx, react, '@/lib/analytics/meta-pixel': pixel,
  '@/lib/catalog/catalog': catalog,
}, { window, fetch: async () => {
  fetchCalls++;
  await new Promise(resolve => { respond = resolve; });
  return { json: async () => response };
} });
const cart = provider.CartProvider({children:null}).props.value;
const branded = catalog.CATALOG['standard-branded'];
response = { ok: true, mode: 'cart', cart: { lines: { nodes: [{
  merchandise: { id: 'gid://shopify/ProductVariant/53217456259390', product: { handle: branded.handle } },
}] } }, checkoutUrl: 'https://failupinc.com/checkouts/test' };
(async () => {
  const first = cart.addItem({itemId:'standard-branded',quantity:2});
  const overlap = await cart.addItem({itemId:'standard-branded',quantity:2});
  assert.equal(overlap, false);
  assert.equal(fetchCalls, 1, 'overlapping clicks must not submit a second mutation');
  respond(); await first;
  const adds = () => calls.filter(a => a[2] === 'AddToCart');
  assert.equal(adds().length, 1);
  assert.equal(adds()[0][0], 'trackSingle');
  assert.equal(adds()[0][1], '1086592242799135');
  assert.equal(adds()[0][3].content_ids.join(','), '53217456259390');
  assert.equal(adds()[0][3].value, 89.98);
  assert.equal(adds()[0][3].num_items, 2);
  assert.equal(adds()[0][3].currency, 'USD');
  const second = cart.addItem({itemId:'standard-branded'}); respond(); await second;
  assert.equal(adds().length, 2, 'a separate intended add remains trackable');
  assert.notEqual(adds()[0][4].eventID, adds()[1][4].eventID);
  response = { ok: false, error: 'Rejected' };
  const failed = cart.addItem({itemId:'standard-branded'}); respond(); await failed;
  assert.equal(adds().length, 2, 'failed mutations do not produce events');
  response = { ok:true,mode:'fallback',cart:null,checkoutUrl:'https://failupinc.com/products/test' };
  const fallback = cart.addItem({itemId:'standard-branded'}); respond(); await fallback;
  assert.equal(adds().length, 2, 'product-page fallback is not an add');
  response = { ok:true,mode:'cart',checkoutUrl:'https://failupinc.com/checkouts/test' };
  const checkout = cart.checkout(); respond(); await checkout;
  assert.equal(window.location.href, response.checkoutUrl);
  assert.equal(calls.filter(a => a[2] === 'InitiateCheckout').length, 0, 'native Shopify owns checkout tracking');
  for (const item of Object.values(catalog.CATALOG)) assert.match(item.metaContentId, /^\d+$/);
  console.log('PASS: queue replay, single initialization, cart overlap, distinct actions, numeric IDs, quantities, failure/fallback, native checkout ownership');
})().catch(error => { console.error(error); process.exitCode = 1; });
