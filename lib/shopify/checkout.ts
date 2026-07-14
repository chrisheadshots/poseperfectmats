import { cookies } from "next/headers";
import {
  CATALOG,
  type CatalogItemId,
  shopifyProductUrl,
} from "@/lib/catalog/catalog";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { ensureCartWithLines, type ShopifyCart } from "@/lib/shopify/cart";
import { getPrimaryVariantId } from "@/lib/shopify/products";

export const CART_COOKIE = "ppm_cart_id";

export type AddLineRequest = {
  itemId: CatalogItemId;
  quantity: number;
};

export type CartActionResult =
  | {
      ok: true;
      mode: "checkout";
      checkoutUrl: string;
      cart: ShopifyCart;
    }
  | {
      ok: true;
      mode: "fallback";
      checkoutUrl: string;
      message: string;
    }
  | {
      ok: false;
      error: string;
    };

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

export async function addItemsAndGetCheckout(
  lines: AddLineRequest[],
): Promise<CartActionResult> {
  if (!lines.length) {
    return { ok: false, error: "No items provided" };
  }

  if (!isShopifyConfigured()) {
    const first = CATALOG[lines[0].itemId];
    return {
      ok: true,
      mode: "fallback",
      checkoutUrl: shopifyProductUrl(first.handle),
      message:
        "Storefront API token not configured — opening Fail Up Inc. product page.",
    };
  }

  try {
    const cookieStore = await cookies();
    const existingId = cookieStore.get(CART_COOKIE)?.value;
    const merchandiseLines = await resolveVariantIds(lines);
    const cart = await ensureCartWithLines(existingId, merchandiseLines);
    cookieStore.set(CART_COOKIE, cart.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
    return {
      ok: true,
      mode: "checkout",
      checkoutUrl: cart.checkoutUrl,
      cart,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cart error";
    const first = CATALOG[lines[0].itemId];
    return {
      ok: true,
      mode: "fallback",
      checkoutUrl: shopifyProductUrl(first.handle),
      message: `Shopify cart unavailable (${message}). Opening product page.`,
    };
  }
}
