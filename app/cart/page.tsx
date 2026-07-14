import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your PosePerfect Mat™ cart, change quantities, and checkout securely via Fail Up Inc. Shopify.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartPageClient />;
}
