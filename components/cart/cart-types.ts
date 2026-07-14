import type { ShopifyCart } from "@/lib/shopify/cart";

export type CartApiSuccess = {
  ok: true;
  mode: "cart" | "fallback";
  cart: ShopifyCart | null;
  checkoutUrl: string;
  message?: string;
  configured?: boolean;
};

export type CartApiFailure = {
  ok: false;
  error: string;
};

export type CartApiResponse = CartApiSuccess | CartApiFailure;

export type CartGetResponse =
  | {
      ok: true;
      configured: boolean;
      cart: ShopifyCart | null;
    }
  | CartApiFailure;
