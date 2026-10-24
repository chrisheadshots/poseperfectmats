"use client";

/**
 * Legacy buy-now helper. Prefer `useCart().addItem` / `useCart().checkout`.
 * Kept so older call sites can still jump straight to Shopify checkout URL.
 */
import { useCallback, useRef, useState } from "react";
import { trackMetaEvent } from "@/lib/analytics/meta-pixel";
import { CATALOG, type CatalogItemId } from "@/lib/catalog/catalog";

type AddPayload =
  | { itemId: CatalogItemId; quantity?: number }
  | { lines: Array<{ itemId: CatalogItemId; quantity: number }> };

type CartResponse =
  | {
      ok: true;
      mode: "cart" | "fallback";
      checkoutUrl: string;
      message?: string;
    }
  | { ok: false; error: string };

export function useCheckout() {
  const inFlight = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(async (payload: AddPayload) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as CartResponse;
      if (!data.ok) {
        setError(data.error);
        return;
      }

      if (data.mode === "fallback") {
        window.location.href = data.checkoutUrl;
        return;
      }

      const lines =
        "lines" in payload
          ? payload.lines
          : [{ itemId: payload.itemId, quantity: payload.quantity ?? 1 }];
      const value = lines.reduce((sum, line) => {
        const item = CATALOG[line.itemId];
        return sum + (item.priceCents / 100) * line.quantity;
      }, 0);
      trackMetaEvent("AddToCart", {
        content_ids: lines.map((line) => CATALOG[line.itemId].metaContentId),
        content_type: "product",
        value,
        currency: "USD",
        num_items: lines.reduce((sum, line) => sum + line.quantity, 0),
      });
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }, []);

  return { checkout, pending, error };
}
