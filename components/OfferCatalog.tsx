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
  volumeEstimate,
  type CatalogItemId,
  type PersonaKey,
} from "@/lib/catalog/catalog";
import { useCheckout } from "@/lib/hooks/useCheckout";
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
  const [volumeId, setVolumeId] = useState<CatalogItemId>(
    defaults.mode === "volume" ? defaults.itemId : "standard-unbranded",
  );
  const [qty, setQty] = useState(defaults.mode === "volume" ? defaults.qty : 3);
  const { checkout, pending, error } = useCheckout();

  const estimate = useMemo(
    () => volumeEstimate(volumeId, qty),
    [volumeId, qty],
  );

  const selectedItem = CATALOG[selected];

  return (
    <section id="offers" className="scroll-mt-20 bg-paper-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Shop PosePerfect
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Mats, bundles, and volume packs
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Choose Unbranded or Branded Standard, Junior for kids stations, or
          grab a ready bundle. Multi-buy tiers match the live Fail Up Inc. offer
          (2–5 mats).
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
            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink px-5 py-4 text-white">
              <div>
                <p className="font-medium">{selectedItem.title}</p>
                <p className="text-sm text-white/60">
                  Headless checkout via Fail Up Inc. Shopify
                </p>
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => checkout({ itemId: selected, quantity: 1 })}
                className="rounded-full bg-yellow px-5 py-3 text-sm font-semibold text-ink disabled:opacity-60"
              >
                {pending ? "Loading…" : `Buy ${formatMoney(selectedItem.priceCents)}`}
              </button>
            </div>
          </div>
        ) : null}

        {tab === "bundles" ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BUNDLE_IDS.map((id) => {
              const item = CATALOG[id];
              return (
                <div
                  key={id}
                  className="flex flex-col rounded-2xl border border-line bg-white p-5"
                >
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
                  <p className="mt-2 flex-1 text-sm text-muted">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <Price
                      cents={item.priceCents}
                      compareAtCents={item.compareAtCents}
                    />
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => checkout({ itemId: id, quantity: 1 })}
                      className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft disabled:opacity-60"
                    >
                      {pending ? "…" : "Add bundle"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {tab === "volume" ? (
          <div className="mt-8 rounded-2xl border border-line bg-white p-6">
            <p className="text-sm text-muted">
              Mix Standard or Junior mats. Estimated savings reflect Fail Up
              Inc.&apos;s live tiers — final discount applies at Shopify checkout
              when automatic discounts are active.
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
                <label className="block text-sm font-medium">
                  Quantity
                  <input
                    type="range"
                    min={2}
                    max={5}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="mt-3 w-full accent-yellow-deep"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted">
                    {VOLUME_TIERS.map((t) => (
                      <span
                        key={t.qty}
                        className={qty === t.qty ? "font-semibold text-ink" : ""}
                      >
                        {t.qty} · {t.percentOff}%
                      </span>
                    ))}
                  </div>
                </label>
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
                    checkout({ itemId: volumeId, quantity: qty })
                  }
                  className="mt-5 w-full rounded-full bg-yellow py-3 text-sm font-semibold text-ink disabled:opacity-60"
                >
                  {pending ? "Loading…" : "Checkout pack"}
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
