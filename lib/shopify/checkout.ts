import { cookies } from "next/headers";
import {
  CATALOG,
  type CatalogItemId,
  shopifyProductUrl,
} from "@/lib/catalog/catalog";
import { isShopifyConfigured } from "@/lib/shopify/client";
import {
  ensureCartWithLines,
  getCart,
  removeCartLines,
  updateCartLines,
  type ShopifyCart,
} from "@/lib/shopify/cart";
import { getPrimaryVariantId } from "@/lib/shopify/products";

export const CART_COOKIE = "ppm_cart_id";

export type AddLineRequest = {
  itemId: CatalogItemId;
  quantity: number;
};

export type CartActionResult =
  | {
      ok: true;
      mode: "cart";
      cart: ShopifyCart;
      checkoutUrl: string;
    }
  | {
      ok: true;
      mode: "fallback";
      checkoutUrl: string;
      message: string;
      cart: null;
    }
  | {
      ok: false;
      error: string;
    };

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 14,
};

async function setCartCookie(cartId: string) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cartId, COOKIE_OPTS);
}

async function readCartId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value;
}

async function resolveVariantIds(
  lines: AddLineRequest[],
): Promise<Array<{ merchandiseId: string; quantity: number }>> {
  const resolved = [];
  for (const line of lines) {
    const item = CATALOG[line.itemId];
    if (!item) throw new Error(`Unknown catalog item: ${line.itemId}`);
    const merchandiseId = await getPrimaryVariantId(item.handle);
    if (!merchandiseId) {
      throw new Error(`No variant for ${item.handle}`);
    }
    resolved.push({ merchandiseId, quantity: Math.max(1, line.quantity) });
  }
  return resolved;
}

function fallbackResult(itemId: CatalogItemId, message: string): CartActionResult {
  return {
    ok: true,
    mode: "fallback",
    checkoutUrl: shopifyProductUrl(CATALOG[itemId].handle),
    message,
    cart: null,
  };
}

export async function addItemsToCart(
  lines: AddLineRequest[],
): Promise<CartActionResult> {
  if (!lines.length) {
    return { ok: false, error: "No items provided" };
  }

  if (!isShopifyConfigured()) {
    return fallbackResult(
      lines[0].itemId,
      "Storefront API token not configured — opening Fail Up Inc. product page.",
    );
  }

  try {
    const existingId = await readCartId();
    const merchandiseLines = await resolveVariantIds(lines);
    const cart = await ensureCartWithLines(existingId, merchandiseLines);
    await setCartCookie(cart.id);
    return {
      ok: true,
      mode: "cart",
      cart,
      checkoutUrl: cart.checkoutUrl,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cart error";
    return fallbackResult(
      lines[0].itemId,
      `Shopify cart unavailable (${message}). Opening product page.`,
    );
  }
}

/** @deprecated Prefer addItemsToCart — kept for buy-now redirect responses */
export async function addItemsAndGetCheckout(
  lines: AddLineRequest[],
): Promise<CartActionResult> {
  return addItemsToCart(lines);
}

export async function updateCartLineQuantities(
  lines: Array<{ id: string; quantity: number }>,
): Promise<CartActionResult> {
  if (!isShopifyConfigured()) {
    return { ok: false, error: "Shopify is not configured" };
  }

  const cartId = await readCartId();
  if (!cartId) return { ok: false, error: "Cart is empty" };

  try {
    const toRemove = lines.filter((l) => l.quantity <= 0).map((l) => l.id);
    const toUpdate = lines.filter((l) => l.quantity > 0);

    let cart: ShopifyCart | null = null;
    if (toUpdate.length) {
      cart = await updateCartLines(cartId, toUpdate);
    }
    if (toRemove.length) {
      cart = await removeCartLines(cartId, toRemove);
    }
    if (!cart) {
      cart = await getCart(cartId);
    }
    if (!cart) return { ok: false, error: "Cart not found" };

    await setCartCookie(cart.id);
    return {
      ok: true,
      mode: "cart",
      cart,
      checkoutUrl: cart.checkoutUrl,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cart update failed";
    return { ok: false, error: message };
  }
}

export async function removeCartLineIds(
  lineIds: string[],
): Promise<CartActionResult> {
  if (!lineIds.length) return { ok: false, error: "No lines to remove" };
  return updateCartLineQuantities(lineIds.map((id) => ({ id, quantity: 0 })));
}

export async function getCheckoutUrlFromCart(): Promise<CartActionResult> {
  if (!isShopifyConfigured()) {
    return {
      ok: false,
      error: "Shopify is not configured",
    };
  }

  const cartId = await readCartId();
  if (!cartId) return { ok: false, error: "Your cart is empty" };

  try {
    const cart = await getCart(cartId);
    if (!cart || cart.totalQuantity < 1) {
      return { ok: false, error: "Your cart is empty" };
    }
    return {
      ok: true,
      mode: "cart",
      cart,
      checkoutUrl: cart.checkoutUrl,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout unavailable";
    return { ok: false, error: message };
  }
}
