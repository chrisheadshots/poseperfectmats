"use client";

import { useCallback, useState } from "react";
import type { CatalogItemId } from "@/lib/catalog/catalog";

type AddPayload =
  | { itemId: CatalogItemId; quantity?: number }
  | { lines: Array<{ itemId: CatalogItemId; quantity: number }> };

type CartResponse =
  | {
      ok: true;
      mode: "checkout" | "fallback";
      checkoutUrl: string;
      message?: string;
    }
  | { ok: false; error: string };

export function useCheckout() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(async (payload: AddPayload) => {
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
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setPending(false);
    }
  }, []);

  return { checkout, pending, error };
}
