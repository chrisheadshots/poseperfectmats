/**
 * Refresh Loox review data from Shopify product metafields.
 *
 * Loox stores each product's review snapshot in metafields under the `loox`
 * namespace (`num_reviews`, `avg_rating`, and `reviews` — an HTML blob with
 * reviewer names and bodies). This script pulls those metafields via the
 * Shopify Admin GraphQL API, writes a raw snapshot to
 * `lib/reviews/loox-source.json`, and prints a diff against the constants in
 * `lib/reviews/reviews.ts`.
 *
 * Curation stays manual: persona tagging and quote selection are editorial.
 * After running, update LOOX_STATS / LOOX_STATS_BY_PRODUCT and hand-pick new
 * quotes into REVIEWS.
 *
 * Usage:
 *   SHOPIFY_ADMIN_TOKEN=shpat_... npm run refresh:reviews
 * (SHOPIFY_STORE_DOMAIN and SHOPIFY_API_VERSION are read from .env.local.)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    // .env.local optional — env vars may come from the shell
  }
}
loadEnvLocal();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const VERSION = process.env.SHOPIFY_API_VERSION ?? "2025-04";
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

// Shopify product title → catalog item id (see lib/catalog/catalog.ts)
const PRODUCT_TITLE_TO_ID = {
  "PosePerfect Mat™ by Chris Headshots": "standard-branded",
  "PosePerfect Mat™ by Chris Headshots (UnBranded)": "standard-unbranded",
  "PosePerfect Mat™ Junior by Chris Headshots (UnBranded)": "junior-unbranded",
  "PosePerfect Mat™ Advanced Posing Guide (Ebook)": "posing-guide",
};

if (!DOMAIN || !TOKEN) {
  console.error(
    [
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_TOKEN.",
      "",
      "This script needs an Admin API token (metafields are not exposed to",
      "the Storefront token used by the site). Create one in the Fail Up Inc.",
      "Shopify admin (Settings → Apps → Develop apps) with read_products",
      "scope, then run:",
      "",
      "  SHOPIFY_ADMIN_TOKEN=shpat_... npm run refresh:reviews",
      "",
      "Alternative without a token: pull the `loox` namespace metafields for",
      "the four PosePerfect products via the Shopify MCP (graphql_query) and",
      "update lib/reviews/reviews.ts constants by hand.",
    ].join("\n"),
  );
  process.exit(1);
}

const QUERY = /* GraphQL */ `
  query LooxMetafields($query: String!) {
    products(first: 10, query: $query) {
      nodes {
        title
        handle
        metafields(first: 30, namespace: "loox") {
          nodes {
            key
            value
          }
        }
      }
    }
  }
`;

function parseReviewsHtml(html) {
  // Blob shape: <div class="review"><div class="name">N</div><div class="review_text">T</div></div>...
  const reviews = [];
  const re =
    /<div class="review"><div class="name">([\s\S]*?)<\/div><div class="review_text">([\s\S]*?)<\/div><\/div>/g;
  let m;
  while ((m = re.exec(html))) {
    const decode = (s) =>
      s
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();
    reviews.push({ name: decode(m[1]), body: decode(m[2]) });
  }
  return reviews;
}

const res = await fetch(
  `https://${DOMAIN}/admin/api/${VERSION}/graphql.json`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query: QUERY, variables: { query: "PosePerfect" } }),
  },
);
if (!res.ok) {
  console.error(`Shopify Admin API error: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const json = await res.json();
if (json.errors) {
  console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
  process.exit(1);
}

const snapshot = { pulledAt: new Date().toISOString(), products: [] };
let total = 0;
let weighted = 0;

for (const product of json.data.products.nodes) {
  const itemId = PRODUCT_TITLE_TO_ID[product.title];
  if (!itemId) continue;
  const fields = Object.fromEntries(
    product.metafields.nodes.map((f) => [f.key, f.value]),
  );
  const count = Number(fields.num_reviews ?? 0);
  const average = Number(fields.avg_rating ?? 0);
  total += count;
  weighted += count * average;
  snapshot.products.push({
    itemId,
    title: product.title,
    handle: product.handle,
    count,
    average,
    reviews: parseReviewsHtml(fields.reviews ?? ""),
  });
}

const outPath = resolve(root, "lib/reviews/loox-source.json");
writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(`Wrote ${outPath}`);
console.log("\nLive Loox totals:");
for (const p of snapshot.products) {
  console.log(
    `  ${p.itemId.padEnd(20)} ${String(p.count).padStart(4)} reviews · ${p.average}★ · ${p.reviews.length} texts parsed`,
  );
}
console.log(
  `  ${"TOTAL".padEnd(20)} ${String(total).padStart(4)} reviews · ${(weighted / (total || 1)).toFixed(2)}★ weighted`,
);

const reviewsTs = readFileSync(resolve(root, "lib/reviews/reviews.ts"), "utf8");
const current = reviewsTs.match(/count:\s*(\d+),\s*\n\s*average:\s*([\d.]+)/);
if (current) {
  const [, c, a] = current;
  const drift = Number(c) !== total;
  console.log(
    `\nreviews.ts LOOX_STATS: ${c} @ ${a}★ — ${
      drift
        ? `STALE (live total is ${total}); update LOOX_STATS and LOOX_STATS_BY_PRODUCT.`
        : "matches live total."
    }`,
  );
}
