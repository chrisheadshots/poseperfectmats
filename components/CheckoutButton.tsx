"use client";

import { useCheckout } from "@/lib/hooks/useCheckout";
import type { CatalogItemId } from "@/lib/catalog/catalog";
import { formatMoney } from "@/lib/catalog/catalog";

type Props = {
  label?: string;
  itemId?: CatalogItemId;
  quantity?: number;
  className?: string;
};

export function CheckoutButton({
  label = "Add to cart",
  itemId = "standard-unbranded",
  quantity = 1,
  className = "",
}: Props) {
  const { checkout, pending, error } = useCheckout();

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => checkout({ itemId, quantity })}
        className={`rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-60 ${className}`}
      >
        {pending ? "Taking you to checkout…" : label}
      </button>
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </div>
  );
}

export function Price({
  cents,
  compareAtCents,
}: {
  cents: number;
  compareAtCents?: number;
}) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="text-lg font-semibold">{formatMoney(cents)}</span>
      {compareAtCents ? (
        <span className="text-sm text-muted line-through">
          {formatMoney(compareAtCents)}
        </span>
      ) : null}
    </span>
  );
}
