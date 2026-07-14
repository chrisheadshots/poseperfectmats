import { NextResponse } from "next/server";
import { getCheckoutUrlFromCart } from "@/lib/shopify/checkout";

export async function POST() {
  try {
    const result = await getCheckoutUrlFromCart();
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
