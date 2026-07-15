"use client";

import { AddToCartButton } from "@/components/AddToCartButton";
import type { CatalogItemId } from "@/lib/catalog/catalog";
import { formatMoney } from "@/lib/catalog/catalog";

type Props = {
  label?: string;
  itemId?: CatalogItemId;
  quantity?: number;
  className?: string;
  showQty?: boolean;
};

/** Primary product CTA — adds to Shopify cart with optional quantity. */
export function CheckoutButton({
  label = "Add to cart",
  itemId = "standard-branded",
  quantity = 1,
  className = "",
  showQty = true,
}: Props) {
  return (
    <AddToCartButton
      label={label}
      itemId={itemId}
      quantity={quantity}
      showQty={showQty}
      buttonClassName={className}
    />
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
