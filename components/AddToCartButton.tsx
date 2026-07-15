"use client";

import { useState } from "react";
import type { CatalogItemId } from "@/lib/catalog/catalog";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/cart/QuantityStepper";

type Props = {
  itemId?: CatalogItemId;
  quantity?: number;
  label?: string;
  showQty?: boolean;
  minQty?: number;
  maxQty?: number;
  className?: string;
  buttonClassName?: string;
};

export function AddToCartButton({
  itemId = "standard-branded",
  quantity: initialQuantity = 1,
  label = "Add to cart",
  showQty = true,
  minQty = 1,
  maxQty = 20,
  className = "",
  buttonClassName = "",
}: Props) {
  const { addItem, pending, error } = useCart();
  const [qty, setQty] = useState(initialQuantity);

  return (
    <div className={`inline-flex flex-col items-start gap-2 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        {showQty ? (
          <QuantityStepper
            value={qty}
            min={minQty}
            max={maxQty}
            onChange={setQty}
            aria-label="Quantity to add"
          />
        ) : null}
        <button
          type="button"
          disabled={pending}
          onClick={() => void addItem({ itemId, quantity: qty })}
          className={`rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-60 ${buttonClassName}`}
        >
          {pending ? "Adding…" : label}
        </button>
      </div>
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </div>
  );
}
