"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CATALOG } from "@/lib/catalog/catalog";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";

function catalogImageForHandle(handle: string): string | null {
  const match = Object.values(CATALOG).find((item) => item.handle === handle);
  return match?.image ?? null;
}

function formatAmount(amount: string, currencyCode: string) {
  const value = Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode || "USD",
  }).format(Number.isFinite(value) ? value : 0);
}

export function CartDrawer() {
  const {
    open,
    closeCart,
    cart,
    pending,
    error,
    loading,
    setLineQuantity,
    removeLine,
    checkout,
    totalQuantity,
  } = useCart();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const lines = cart?.lines.nodes ?? [];
  const subtotal = cart
    ? formatAmount(
        cart.cost.subtotalAmount.amount,
        cart.cost.subtotalAmount.currencyCode,
      )
    : "$0.00";

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        onClick={closeCart}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              Your cart
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
              {totalQuantity} item{totalQuantity === 1 ? "" : "s"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-ink"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading ? (
            <p className="text-sm text-muted">Loading cart…</p>
          ) : lines.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white px-4 py-10 text-center">
              <p className="font-medium">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted">
                Add a mat, bundle, or volume pack from the shop section.
              </p>
              <a
                href="/#offers"
                onClick={closeCart}
                className="mt-5 inline-flex rounded-full bg-yellow px-4 py-2 text-sm font-semibold text-ink"
              >
                Browse offers
              </a>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const image =
                  line.merchandise.image?.url ||
                  line.merchandise.product.featuredImage?.url ||
                  catalogImageForHandle(line.merchandise.product.handle);
                const title = line.merchandise.product.title;
                const variant =
                  line.merchandise.title !== "Default Title"
                    ? line.merchandise.title
                    : null;
                const lineTotal = formatAmount(
                  line.cost.totalAmount.amount,
                  line.cost.totalAmount.currencyCode,
                );

                return (
                  <li
                    key={line.id}
                    className="flex gap-3 rounded-2xl border border-line bg-white p-3"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-paper-deep">
                      {image ? (
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-contain p-1.5"
                          sizes="80px"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{title}</p>
                      {variant ? (
                        <p className="text-xs text-muted">{variant}</p>
                      ) : null}
                      <p className="mt-1 text-sm font-medium">{lineTotal}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <QuantityStepper
                          value={line.quantity}
                          min={1}
                          max={20}
                          onChange={(qty) => {
                            void setLineQuantity(line.id, qty);
                          }}
                          aria-label={`Quantity for ${title}`}
                        />
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => void removeLine(line.id)}
                          className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        </div>

        <div className="border-t border-line bg-white px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="text-lg font-semibold">{subtotal}</span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Taxes and shipping calculated at Fail Up Inc. Shopify checkout.
          </p>
          <button
            type="button"
            disabled={pending || lines.length === 0}
            onClick={() => void checkout()}
            className="mt-4 w-full rounded-full bg-yellow py-3.5 text-sm font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-50"
          >
            {pending ? "Working…" : "Checkout securely"}
          </button>
          <Link
            href="/cart"
            onClick={closeCart}
            className="mt-2 block text-center text-xs text-muted hover:text-ink"
          >
            Open full cart page
          </Link>
        </div>
      </aside>
    </div>
  );
}
