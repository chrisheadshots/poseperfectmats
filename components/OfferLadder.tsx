"use client";

import Image from "next/image";
import { CATALOG, formatMoney, VOLUME_TIERS } from "@/lib/catalog/catalog";
import { useCart } from "@/components/cart/CartProvider";

const BRANDED = CATALOG["standard-branded"];
const GUIDE = CATALOG["posing-guide"];
const PRO_KIT_CENTS = BRANDED.priceCents + GUIDE.priceCents; // real à-la-carte total, no fake discount
const STUDIO_QTY = 3;
const STUDIO_FULL_CENTS = BRANDED.priceCents * STUDIO_QTY;
const FLOOR_OFF = VOLUME_TIERS[0].percentOff;

/**
 * Good/Better/Best value ladder shown at peak intent (right after the ROI
 * calculator). The middle "Pro Kit" is center-staged (decoy effect) and adds
 * mat + guide via the multi-line cart path. Prices shown are real à-la-carte
 * totals or full price + an honest "discount at checkout" note — never a number
 * higher than Shopify charges.
 */
export function OfferLadder() {
  const { addItem, pending } = useCart();

  return (
    <section id="kit" className="scroll-mt-20 bg-paper-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Pick your setup
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          One mat fixes today. A kit runs every shoot.
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Most photographers start with the Pro Kit — the mat plus the direction
          language to use it. Shooting volume? The Studio Pack discounts
          automatically at checkout.
        </p>

        <div className="mt-10 grid items-start gap-4 lg:grid-cols-3">
          {/* Good — Solo */}
          <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">
              Solo Mat
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl">
              {formatMoney(BRANDED.priceCents)}
            </p>
            <p className="mt-1 text-sm text-muted">
              One branded PosePerfect Mat™ — fix your next session.
            </p>
            <div className="relative mt-5 h-32 overflow-hidden rounded-2xl bg-paper">
              <Image
                src={BRANDED.image}
                alt={BRANDED.title}
                fill
                className="object-contain p-3"
                sizes="360px"
              />
            </div>
            <ul className="mt-5 flex-1 space-y-1.5 text-sm text-ink/80">
              <li>1× Branded Standard mat</li>
              <li>Color-coded footprint guides</li>
              <li>Anti-slip · wipe-clean</li>
            </ul>
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                void addItem({ itemId: "standard-branded", quantity: 1 })
              }
              className="mt-6 w-full rounded-full border border-ink py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white disabled:opacity-60"
            >
              {pending ? "Adding…" : `Add ${formatMoney(BRANDED.priceCents)}`}
            </button>
          </article>

          {/* Better — Pro Kit (center-staged) */}
          <article className="flex h-full flex-col rounded-3xl border-2 border-yellow bg-ink p-6 text-white shadow-[0_20px_60px_rgba(12,12,12,0.18)] lg:-mt-3 lg:mb-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.14em] text-yellow">
                Pro Kit
              </p>
              <span className="rounded-full bg-yellow px-2.5 py-0.5 text-[11px] font-bold text-ink">
                Most popular
              </span>
            </div>
            <p className="mt-2 font-[family-name:var(--font-display)] text-4xl text-yellow">
              {formatMoney(PRO_KIT_CENTS)}
            </p>
            <p className="mt-1 text-sm text-white/70">
              The mat + the Advanced Posing Guide — everything to direct clients
              like a pro.
            </p>
            <div className="relative mt-5 h-32 overflow-hidden rounded-2xl bg-white/95">
              <Image
                src={GUIDE.image}
                alt="PosePerfect Mat plus Advanced Posing Guide"
                fill
                className="object-contain p-3"
                sizes="360px"
              />
            </div>
            <ul className="mt-5 flex-1 space-y-1.5 text-sm text-white/85">
              <li>1× Branded Standard mat</li>
              <li>Advanced Posing Guide (ebook)</li>
              <li>Body angles + direction scripts</li>
            </ul>
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                void addItem({
                  lines: [
                    { itemId: "standard-branded", quantity: 1 },
                    { itemId: "posing-guide", quantity: 1 },
                  ],
                })
              }
              className="mt-6 w-full rounded-full bg-yellow py-3 text-sm font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-60"
            >
              {pending ? "Adding…" : `Add the Pro Kit — ${formatMoney(PRO_KIT_CENTS)}`}
            </button>
          </article>

          {/* Best — Studio Pack */}
          <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">
              Studio Pack
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl">
              {formatMoney(STUDIO_FULL_CENTS)}
            </p>
            <p className="mt-1 text-sm text-muted">
              Three mats for multi-station days — {FLOOR_OFF}%+ off applies
              automatically at checkout.
            </p>
            <div className="relative mt-5 h-32 overflow-hidden rounded-2xl bg-paper">
              <Image
                src={BRANDED.image}
                alt="Three PosePerfect Mats for volume days"
                fill
                className="object-contain p-3"
                sizes="360px"
              />
            </div>
            <ul className="mt-5 flex-1 space-y-1.5 text-sm text-ink/80">
              <li>3× Branded Standard mats</li>
              <li>Run parallel stations / assistants</li>
              <li>Volume discount auto-applied</li>
            </ul>
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                void addItem({
                  itemId: "standard-branded",
                  quantity: STUDIO_QTY,
                })
              }
              className="mt-6 w-full rounded-full border border-ink py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white disabled:opacity-60"
            >
              {pending ? "Adding…" : "Add 3 mats"}
            </button>
          </article>
        </div>

        <p className="mt-6 text-sm text-muted">
          Need Unbranded, Junior, or a custom volume count?{" "}
          <a
            href="/#offers"
            className="font-medium text-ink underline decoration-yellow underline-offset-4 hover:text-yellow-deep"
          >
            See all versions & volume options →
          </a>
        </p>
      </div>
    </section>
  );
}
