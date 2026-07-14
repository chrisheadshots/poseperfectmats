import { NextResponse } from "next/server";
import { updateCartLineQuantities } from "@/lib/shopify/checkout";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      lines?: Array<{ id: string; quantity: number }>;
      lineId?: string;
      quantity?: number;
    };

    const lines =
      body.lines ??
      (body.lineId != null && body.quantity != null
        ? [{ id: body.lineId, quantity: body.quantity }]
        : []);

    if (!lines.length) {
      return NextResponse.json(
        { ok: false, error: "No line updates provided" },
        { status: 400 },
      );
    }

    const result = await updateCartLineQuantities(lines);
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
