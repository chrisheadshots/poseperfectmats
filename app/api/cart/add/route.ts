import { NextResponse } from "next/server";
import type { CatalogItemId } from "@/lib/catalog/catalog";
import { addItemsAndGetCheckout } from "@/lib/shopify/checkout";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      lines?: Array<{ itemId: CatalogItemId; quantity: number }>;
      itemId?: CatalogItemId;
      quantity?: number;
    };

    const lines =
      body.lines ??
      (body.itemId
        ? [{ itemId: body.itemId, quantity: body.quantity ?? 1 }]
        : []);

    const result = await addItemsAndGetCheckout(lines);
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
