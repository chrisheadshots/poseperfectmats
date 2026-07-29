"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { trackViewContent } from "@/lib/analytics/meta-pixel";
import { CATALOG, formatMoney } from "@/lib/catalog/catalog";
import { SITE } from "@/lib/copy/personas";
import { GUARANTEE, SHIPPING } from "@/lib/copy/trust";
import { LOOX_VIDEOS } from "@/lib/reviews/loox-media";
import {
  LOOX_STATS_BY_PRODUCT,
  ORDER_STATS,
  siteProofLabel,
} from "@/lib/reviews/reviews";

type Scene = {
  id: string;
  caption: string;
  sub?: string;
  durationMs: number;
  mood: "chaos" | "command" | "product" | "clarity" | "win" | "cta";
};

const SCENES: Scene[] = [
  {
    id: "chaos",
    caption: "Clients guessing where to stand",
    sub: "The line stalls. Your frame waits.",
    durationMs: 2800,
    mood: "chaos",
  },
  {
    id: "step",
    caption: "“Step left.”",
    durationMs: 2000,
    mood: "command",
  },
  {
    id: "back",
    caption: "“Move back.”",
    durationMs: 2000,
    mood: "command",
  },
  {
    id: "closer",
    caption: "“Closer…”",
    durationMs: 2000,
    mood: "command",
  },
  {
    id: "mat",
    caption: "PosePerfect Mat™ placed",
    sub: "Color-coded footprints. Instant instructions.",
    durationMs: 3200,
    mood: "product",
  },
  {
    id: "lineup",
    caption: "Clients line up themselves",
    sub: "Stance. Spacing. Consistency - without the lecture.",
    durationMs: 3000,
    mood: "clarity",
  },
  {
    id: "smile",
    caption: "You shoot. They relax.",
    durationMs: 2400,
    mood: "win",
  },
  {
    id: "done",
    caption: "Usable frame. Next.",
    sub: "Time back. Pride up. Line moving.",
    durationMs: 2800,
    mood: "win",
  },
  {
    id: "cta",
    caption: "Stop repeating yourself.",
    sub: "Add the workflow tool that pays for itself.",
    durationMs: 4000,
    mood: "cta",
  },
];

const DEMO_VIDEO =
  LOOX_VIDEOS.find((v) => v.id === "YhJnMjnWc") ?? LOOX_VIDEOS[0];

const BRANDED = CATALOG["standard-branded"];
const GUIDE = CATALOG["posing-guide"];
const PRO_KIT_CENTS = BRANDED.priceCents + GUIDE.priceCents;
const BRANDED_LOOX = LOOX_STATS_BY_PRODUCT["standard-branded"];

export function HeroDemo() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const { addItem, pending, error } = useCart();
  const scene = SCENES[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % SCENES.length);
    }, scene.durationMs);
    return () => window.clearTimeout(t);
  }, [index, scene.durationMs, reduced]);

  useEffect(() => {
    trackViewContent({
      contentIds: [BRANDED.handle],
      contentName: BRANDED.title,
      value: BRANDED.priceCents / 100,
    });
  }, []);

  return (
    <section className="relative overflow-hidden hero-wash text-white lg:min-h-[100svh]">
      <div className="absolute inset-0">
        {DEMO_VIDEO ? (
          <video
            className="h-full w-full object-cover opacity-35"
            autoPlay
            muted
            loop
            playsInline
            poster={DEMO_VIDEO.poster}
            aria-hidden
          >
            <source src={DEMO_VIDEO.preview} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl content-start gap-4 px-4 pb-8 pt-[4.75rem] sm:gap-6 sm:px-6 sm:pb-12 sm:pt-24 lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr] lg:content-center lg:items-center lg:gap-10 lg:pb-20 lg:pt-28">
        {/* Mat first on mobile so it lands above the fold */}
        <div className="relative order-1 lg:order-2">
          <div className="absolute -inset-4 rounded-full bg-yellow/15 blur-3xl sm:-inset-8" />
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:rounded-[1.75rem]">
            <div className="relative h-[38svh] max-h-[320px] w-full min-h-[200px] sm:h-auto sm:max-h-none sm:min-h-0 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="https://cdn.shopify.com/s/files/1/0817/9099/2702/files/poseperfect-mat-hero.png?v=1782353205"
                alt="PosePerfect Mat™ color-coded footprint guides"
                fill
                priority
                className={`object-contain object-center p-3 transition duration-700 sm:p-6 lg:p-8 ${
                  scene.mood === "chaos"
                    ? "scale-105 opacity-40 blur-[1px]"
                    : "opacity-95"
                }`}
                sizes="(max-width:1024px) 92vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 bottom-0 p-3 sm:p-6 lg:p-7"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-yellow sm:text-[11px] sm:tracking-[0.2em]">
                    Live demo · muted · captions
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-lg leading-tight sm:mt-2 sm:text-2xl lg:text-3xl">
                    {scene.caption}
                  </p>
                  {scene.sub ? (
                    <p className="mt-1 line-clamp-2 text-xs text-white/70 sm:mt-2 sm:text-sm">
                      {scene.sub}
                    </p>
                  ) : null}
                  {scene.mood === "cta" ? (
                    <a
                      href="/#kit"
                      className="mt-2 inline-flex rounded-full bg-yellow px-3 py-1.5 text-xs font-semibold text-ink sm:mt-4 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      Compare kits →
                    </a>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-1 px-3 py-2 sm:px-4 sm:py-3">
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Jump to scene ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1 flex-1 rounded-full transition ${
                    i === index ? "bg-yellow" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-body)] text-2xl font-semibold leading-none tracking-tight text-yellow sm:text-5xl md:text-6xl"
          >
            {SITE.name}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-2 max-w-xl text-[1.35rem] font-medium leading-snug tracking-tight sm:mt-5 sm:text-4xl sm:leading-tight md:text-[2.7rem]"
          >
            {SITE.heroHeadline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-2 max-w-lg text-sm leading-snug text-white/75 sm:mt-5 sm:text-lg sm:leading-relaxed"
          >
            <span className="sm:hidden">
              Color-coded footprints so clients stand correctly in seconds -
              stop burning billable minutes on “step left.”
            </span>
            <span className="hidden sm:inline">{SITE.heroSubheadline}</span>
          </motion.p>

          {/* Proof bar */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-[11px] leading-relaxed text-white/60 sm:mt-5 sm:text-sm"
          >
            {siteProofLabel()} · {ORDER_STATS.label}
            <span className="hidden sm:inline">
              {" "}
              · Branded mat {BRANDED_LOOX.count} reviews @ {BRANDED_LOOX.average}
              ★
            </span>
          </motion.p>

          {/* Offer stack: Mat vs Pro Kit */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-4 flex flex-col gap-2 sm:mt-6 sm:gap-3"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  void addItem({ itemId: "standard-branded", quantity: 1 })
                }
                className="rounded-full bg-yellow px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_0_1px_rgba(245,197,24,0.35)] transition hover:bg-yellow-deep disabled:opacity-60 sm:px-6 sm:py-3"
              >
                {pending
                  ? "Adding…"
                  : `Add Mat - ${formatMoney(BRANDED.priceCents)}`}
              </button>
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
                className="rounded-full border border-yellow/70 bg-yellow/10 px-5 py-2.5 text-sm font-semibold text-yellow transition hover:bg-yellow hover:text-ink disabled:opacity-60 sm:px-6 sm:py-3"
              >
                {pending
                  ? "Adding…"
                  : `Pro Kit - ${formatMoney(PRO_KIT_CENTS)}`}
              </button>
            </div>
            <p className="text-[11px] text-white/55 sm:text-xs">
              Mat only · or Pro Kit (mat + Advanced Posing Guide). Most
              photographers start with the Pro Kit.
            </p>
            {error ? (
              <p className="text-xs text-red-300">{error}</p>
            ) : null}
          </motion.div>

          {/* Shipping + guarantee + secondary */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 space-y-2 sm:mt-5"
          >
            <p className="text-[11px] leading-relaxed text-white/55 sm:text-sm">
              {SHIPPING.short} · typically 5–7 business days after processing ·{" "}
              {GUARANTEE.short}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/50 sm:text-xs">
              <a
                href="/#roi"
                className="underline decoration-white/30 underline-offset-4 transition hover:text-yellow hover:decoration-yellow/50"
              >
                Run your ROI
              </a>
              <span aria-hidden>·</span>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/30 underline-offset-4 transition hover:text-yellow hover:decoration-yellow/50"
              >
                {SITE.instagramHandle}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
