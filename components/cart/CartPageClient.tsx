"use client";

import Image from "next/image";
import Link from "next/link";
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

export function CartPageClient() {
  const {
    cart,
    loading,
    pending,
    error,
    setLineQuantity,
    removeLine,
    checkout,
    totalQuantity,
  } = useCart();

  const lines = cart?.lines.nodes ?? [];
  const subtotal = cart
    ? formatAmount(
        cart.cost.subtotalAmount.amount,
        cart.cost.subtotalAmount.currencyCode,
      )
    : "$0.00";

  return (
    <section className="bg-paper">
      <div className="border-b border-line bg-ink px-4 pb-14 pt-28 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.18em] text-yellow">Cart</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Your cart
          </h1>
          <p className="mt-3 text-sm text-white/60">
            {loading
              ? "Loading…"
              : `${totalQuantity} item${totalQuantity === 1 ? "" : "s"} · change quantities anytime`}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-muted">Loading cart…</p>
          ) : lines.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white px-5 py-12 text-center">
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted">
                Pick a mat version, bundle, or volume pack to get started.
              </p>
              <Link
                href="/#offers"
                className="mt-6 inline-flex rounded-full bg-yellow px-5 py-2.5 text-sm font-semibold text-ink"
              >
                Shop mats
              </Link>
            </div>
          ) : (
            lines.map((line) => {
              const image =
                line.merchandise.image?.url ||
                line.merchandise.product.featuredImage?.url ||
                catalogImageForHandle(line.merchandise.product.handle);
              const title = line.merchandise.product.title;
              const lineTotal = formatAmount(
                line.cost.totalAmount.amount,
                line.cost.totalAmount.currencyCode,
              );

              return (
                <article
                  key={line.id}
                  className="flex gap-4 rounded-2xl border border-line bg-white p-4"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-paper-deep">
                    {image ? (
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain p-2"
                        sizes="112px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold">{title}</h2>
                    <p className="mt-1 text-sm font-medium">{lineTotal}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <QuantityStepper
                        value={line.quantity}
                        min={1}
                        max={20}
                        onChange={(qty) => {
                          void setLineQuantity(line.id, qty);
                        }}
                      />
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => void removeLine(line.id)}
                        className="text-sm text-muted underline-offset-2 hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-white p-5 lg:sticky lg:top-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Subtotal</span>
            <span className="text-xl font-semibold">{subtotal}</span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Taxes and shipping calculated at Fail Up Inc. Shopify checkout.
          </p>
          <button
            type="button"
            disabled={pending || lines.length === 0}
            onClick={() => void checkout()}
            className="mt-5 w-full rounded-full bg-yellow py-3.5 text-sm font-semibold text-ink hover:bg-yellow-deep disabled:opacity-50"
          >
            {pending ? "Working…" : "Checkout securely"}
          </button>
          <Link
            href="/#offers"
            className="mt-3 block text-center text-sm text-muted hover:text-ink"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
