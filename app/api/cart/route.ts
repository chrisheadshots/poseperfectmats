import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CART_COOKIE } from "@/lib/shopify/checkout";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { getCart } from "@/lib/shopify/cart";

export async function GET() {
  if (!isShopifyConfigured()) {
    return NextResponse.json({
      ok: true,
      configured: false,
      cart: null,
    });
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) {
    return NextResponse.json({ ok: true, configured: true, cart: null });
  }

  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ ok: true, configured: true, cart });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cart error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
