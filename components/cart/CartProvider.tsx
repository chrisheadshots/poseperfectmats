"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { trackMetaEvent } from "@/lib/analytics/meta-pixel";
import { CATALOG, type CatalogItemId } from "@/lib/catalog/catalog";
import type { ShopifyCart } from "@/lib/shopify/cart";
import type { CartApiResponse, CartGetResponse } from "./cart-types";

type AddPayload =
  | { itemId: CatalogItemId; quantity?: number }
  | { lines: Array<{ itemId: CatalogItemId; quantity: number }> };

type CartContextValue = {
  cart: ShopifyCart | null;
  configured: boolean;
  loading: boolean;
  pending: boolean;
  error: string | null;
  open: boolean;
  totalQuantity: number;
  refresh: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (payload: AddPayload) => Promise<boolean>;
  setLineQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  checkout: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

async function readJson<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await readJson<CartGetResponse>(res);
      if (!data.ok) {
        setError(data.error);
        return;
      }
      setConfigured(data.configured);
      setCart(data.cart);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);
  const toggleCart = useCallback(() => setOpen((v) => !v), []);

  const addItem = useCallback(
    async (payload: AddPayload) => {
      setPending(true);
      setError(null);
      try {
        const body =
          "lines" in payload
            ? { lines: payload.lines }
            : {
                itemId: payload.itemId,
                quantity: Math.max(1, payload.quantity ?? 1),
              };

        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await readJson<CartApiResponse>(res);
        if (!data.ok) {
          setError(data.error);
          return false;
        }

        if (data.mode === "fallback") {
          window.location.href = data.checkoutUrl;
          return true;
        }

        setCart(data.cart);
        setOpen(true);

        const lines =
          "lines" in payload
            ? payload.lines
            : [
                {
                  itemId: payload.itemId,
                  quantity: Math.max(1, payload.quantity ?? 1),
                },
              ];
        const value = lines.reduce((sum, line) => {
          const item = CATALOG[line.itemId];
          return sum + (item.priceCents / 100) * line.quantity;
        }, 0);
        trackMetaEvent("AddToCart", {
          content_ids: lines.map((line) => CATALOG[line.itemId].handle),
          content_type: "product",
          value,
          currency: "USD",
          num_items: lines.reduce((sum, line) => sum + line.quantity, 0),
        });
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not add to cart");
        return false;
      } finally {
        setPending(false);
      }
    },
    [],
  );

  const setLineQuantity = useCallback(async (lineId: string, quantity: number) => {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId, quantity }),
      });
      const data = await readJson<CartApiResponse>(res);
      if (!data.ok) {
        setError(data.error);
        return;
      }
      if (data.mode === "cart") setCart(data.cart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update cart");
    } finally {
      setPending(false);
    }
  }, []);

  const removeLine = useCallback(
    async (lineId: string) => {
      await setLineQuantity(lineId, 0);
    },
    [setLineQuantity],
  );

  const checkout = useCallback(async () => {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/cart/checkout", { method: "POST" });
      const data = await readJson<CartApiResponse>(res);
      if (!data.ok) {
        setError(data.error);
        return;
      }

      if (data.cart) {
        trackMetaEvent("InitiateCheckout", {
          content_ids: data.cart.lines.nodes.map(
            (line) => line.merchandise.product.handle,
          ),
          content_type: "product",
          value: Number(data.cart.cost.totalAmount.amount),
          currency: data.cart.cost.totalAmount.currencyCode,
          num_items: data.cart.totalQuantity,
        });
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setPending(false);
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      configured,
      loading,
      pending,
      error,
      open,
      totalQuantity: cart?.totalQuantity ?? 0,
      refresh,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      setLineQuantity,
      removeLine,
      checkout,
    }),
    [
      cart,
      configured,
      loading,
      pending,
      error,
      open,
      refresh,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      setLineQuantity,
      removeLine,
      checkout,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
