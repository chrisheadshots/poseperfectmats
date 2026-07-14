"use client";

import { useCart } from "./CartProvider";

type Props = {
  className?: string;
  light?: boolean;
};

export function CartButton({ className = "", light = true }: Props) {
  const { totalQuantity, openCart, loading } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
        light
          ? "border-white/30 text-white hover:border-yellow hover:text-yellow"
          : "border-line text-ink hover:border-ink"
      } ${className}`}
      aria-label={`Open cart${totalQuantity ? `, ${totalQuantity} items` : ""}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.2" fill="currentColor" />
        <circle cx="18" cy="20" r="1.2" fill="currentColor" />
      </svg>
      <span className="hidden sm:inline">Cart</span>
      <span
        className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
          light ? "bg-yellow text-ink" : "bg-ink text-white"
        }`}
      >
        {loading ? "…" : totalQuantity}
      </span>
    </button>
  );
}
