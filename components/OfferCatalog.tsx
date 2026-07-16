"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BUNDLE_IDS,
  CATALOG,
  MAT_VERSION_IDS,
  PERSONA_DEFAULTS,
  VOLUME_ELIGIBLE_IDS,
  VOLUME_TIERS,
  formatMoney,
  volumeDiscountForQty,
  volumeEstimate,
  type CatalogItemId,
  type PersonaKey,
} from "@/lib/catalog/catalog";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { Price } from "@/components/CheckoutButton";

type Tab = "versions" | "bundles" | "volume";

type Props = {
  persona?: PersonaKey;
};

export function OfferCatalog({ persona = "master" }: Props) {
  const defaults = PERSONA_DEFAULTS[persona];
  const initialTab: Tab =
    defaults.mode === "volume"
      ? "volume"
      : BUNDLE_IDS.includes(defaults.itemId)
        ? "bundles"
        : "versions";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [selected, setSelected] = useState<CatalogItemId>(defaults.itemId);
  const [versionQty, setVersionQty] = useState(1);
  const [attachGuide, setAttachGuide] = useState(false);
  const [volumeId, setVolumeId] = useState<CatalogItemId>(
    defaults.mode === "volume" ? defaults.itemId : "standard-unbranded",
  );
  const [qty, setQty] = useState(defaults.mode === "volume" ? defaults.qty : 3);
  const { addItem, pending, error } = useCart();

  const estimate = useMemo(
    () => volumeEstimate(volumeId, qty),
    [volumeId, qty],
  );

  const selectedItem = CATALOG[selected];
  const matVolumePercent =
    selectedItem.kind === "mat" ? volumeDiscountForQty(versionQty) : 0;
  const addBarTotal =
    selectedItem.priceCents * versionQty +
    (attachGuide && selectedItem.kind === "mat"
      ? CATALOG["posing-guide"].priceCents
      : 0);

  return (
    <section id="offers" className="scroll-mt-20 bg-paper-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Enter the PosePerfect System™
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Build your kit. Raise your AOV like a pro.
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Start with Standard (Unbranded or Branded), add Junior for kids
          stations, stack the Posing Guide, or jump into volume packs. Quantity
          first — cart second — Shopify checkout when you&apos;re ready.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ["versions", "Shop by version"],
              ["bundles", "Bundles"],
              ["volume", "Volume Builder"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === id
                  ? "bg-ink text-white"
                  : "bg-white text-ink hover:bg-yellow"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "versions" ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {MAT_VERSION_IDS.map((id) => {
              const item = CATALOG[id];
              const active = selected === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  className={`flex gap-4 rounded-2xl border bg-white p-4 text-left transition ${
                    active
                      ? "border-yellow ring-2 ring-yellow"
                      : "border-line hover:border-ink/30"
                  }`}
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-paper">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{item.shortTitle}</h3>
                      {item.badge ? (
                        <span className="rounded-full bg-yellow/80 px-2 py-0.5 text-[11px] font-semibold">
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                    <div className="mt-2">
                      <Price
                        cents={item.priceCents}
                        compareAtCents={item.compareAtCents}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
            <div className="md:col-span-2 rounded-2xl bg-ink px-5 py-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{selectedItem.title}</p>
                  <p className="text-sm text-white/60">
                    Add to cart · Shopify checkout via Fail Up Inc.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <QuantityStepper
                    value={versionQty}
                    min={1}
                    max={20}
                    onChange={setVersionQty}
                    tone="dark"
                  />
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      const canAttach =
                        attachGuide && selectedItem.kind === "mat";
                      if (canAttach) {
                        void addItem({
                          lines: [
                            { itemId: selected, quantity: versionQty },
                            { itemId: "posing-guide", quantity: 1 },
                          ],
                        });
                      } else {
                        void addItem({ itemId: selected, quantity: versionQty });
                      }
                    }}
                    className="rounded-full bg-yellow px-5 py-3 text-sm font-semibold text-ink disabled:opacity-60"
                  >
                    {pending ? "Adding…" : `Add ${formatMoney(addBarTotal)}`}
                  </button>
                </div>
              </div>

              {selectedItem.kind === "mat" ? (
                <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-white/85">
                  <input
                    type="checkbox"
                    checked={attachGuide}
                    onChange={(e) => setAttachGuide(e.target.checked)}
                    className="h-4 w-4 accent-yellow"
                  />
                  Add the Advanced Posing Guide ebook (+
                  {formatMoney(CATALOG["posing-guide"].priceCents)}) — direction
                  language that pairs with the mat
                </label>
              ) : null}

              {selectedItem.kind === "mat" && versionQty === 1 ? (
                <p className="mt-2 text-xs text-yellow">
                  Add 1 more mat → save {VOLUME_TIERS[0].percentOff}% automatically
                  at checkout.
                </p>
              ) : null}
              {selectedItem.kind === "mat" && versionQty >= 2 ? (
                <p className="mt-2 text-xs text-yellow">
                  {versionQty} mats — {matVolumePercent}%+ off applies
                  automatically at checkout.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {tab === "bundles" ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BUNDLE_IDS.map((id) => (
              <BundleCard
                key={id}
                itemId={id}
                pending={pending}
                onAdd={(quantity) => void addItem({ itemId: id, quantity })}
              />
            ))}
          </div>
        ) : null}

        {tab === "volume" ? (
          <div className="mt-8 rounded-2xl border border-line bg-white p-6">
            <p className="text-sm text-muted">
              Buy 2 or more mats and save at least 10% — applied automatically at
              Shopify checkout, no code needed. Branded mats often save even more.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto]">
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Mat version
                  <select
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
                    value={volumeId}
                    onChange={(e) =>
                      setVolumeId(e.target.value as CatalogItemId)
                    }
                  >
                    {VOLUME_ELIGIBLE_IDS.map((id) => (
                      <option key={id} value={id}>
                        {CATALOG[id].shortTitle} —{" "}
                        {formatMoney(CATALOG[id].priceCents)}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <p className="text-sm font-medium">Quantity</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <QuantityStepper
                      value={qty}
                      min={2}
                      max={5}
                      onChange={setQty}
                    />
                    <div className="flex flex-wrap gap-2 text-xs text-muted">
                      {VOLUME_TIERS.map((t) => (
                        <button
                          key={t.qty}
                          type="button"
                          onClick={() => setQty(t.qty)}
                          className={`rounded-full px-2.5 py-1 ${
                            qty === t.qty
                              ? "bg-ink font-semibold text-white"
                              : "bg-paper"
                          }`}
                        >
                          {t.qty} · {t.percentOff}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-ink p-5 text-white md:min-w-[240px]">
                <p className="text-sm text-white/60">Est. pack total</p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-4xl text-yellow">
                  {formatMoney(estimate.total)}
                </p>
                <p className="mt-2 text-sm text-white/65">
                  {qty} mats · {estimate.percentOff}% off · save{" "}
                  {formatMoney(estimate.savings)}
                </p>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    void addItem({ itemId: volumeId, quantity: qty })
                  }
                  className="mt-5 w-full rounded-full bg-yellow py-3 text-sm font-semibold text-ink disabled:opacity-60"
                >
                  {pending ? "Adding…" : "Add pack to cart"}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      </div>
    </section>
  );
}

function BundleCard({
  itemId,
  pending,
  onAdd,
}: {
  itemId: CatalogItemId;
  pending: boolean;
  onAdd: (quantity: number) => void;
}) {
  const item = CATALOG[itemId];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white p-5">
      <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-paper">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-3"
          sizes="400px"
        />
      </div>
      {item.badge ? (
        <span className="mb-2 w-fit rounded-full bg-yellow/80 px-2 py-0.5 text-[11px] font-semibold">
          {item.badge}
        </span>
      ) : null}
      <h3 className="text-xl font-semibold">{item.shortTitle}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Price cents={item.priceCents} compareAtCents={item.compareAtCents} />
        <div className="flex flex-wrap items-center gap-2">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <button
            type="button"
            disabled={pending}
            onClick={() => onAdd(quantity)}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft disabled:opacity-60"
          >
            {pending ? "…" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
