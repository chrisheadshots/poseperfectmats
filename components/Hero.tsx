"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LOOX_STATS } from "@/lib/reviews/reviews";
import { SITE } from "@/lib/copy/personas";
import { CheckoutButton } from "@/components/CheckoutButton";
import type { CatalogItemId } from "@/lib/catalog/catalog";

type Props = {
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  itemId?: CatalogItemId;
};

export function Hero({
  headline = SITE.heroHeadline,
  subheadline = SITE.heroSubheadline,
  ctaLabel = SITE.primaryCta,
  eyebrow = "PosePerfect Mat™",
  image = "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/poseperfect-mat-hero.png?v=1782353205",
  imageAlt = "PosePerfect Mat with color-coded footprint guides",
  itemId = "standard-unbranded",
}: Props) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden hero-wash text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto grid min-h-[92vh] max-w-6xl items-end gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight text-yellow sm:text-5xl md:text-6xl"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-5 max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-[2.65rem]"
          >
            {headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg"
          >
            {subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <CheckoutButton label={ctaLabel} itemId={itemId} />
            <a
              href="#how-it-works"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:border-yellow hover:text-yellow"
            >
              {SITE.secondaryCta}
            </a>
          </motion.div>
          <p className="mt-6 text-sm text-white/55">
            {LOOX_STATS.count} verified Loox reviews · {LOOX_STATS.average}★ ·
            30-day support path · Free tracked shipping ·{" "}
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline decoration-yellow/50 underline-offset-4 transition hover:text-yellow"
            >
              {SITE.instagramHandle}
            </a>
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-6 rounded-full bg-yellow/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <Image
              src={image}
              alt={imageAlt}
              width={900}
              height={900}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
