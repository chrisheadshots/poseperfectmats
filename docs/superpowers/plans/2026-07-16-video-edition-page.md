# Video Edition Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a standalone `/video-edition` page for the PosePerfect Mat™ Video Edition (a chroma-key green mat for video/streaming production), fully wired to the existing cart, with zero in-site nav/footer/persona-gate presence — reachable only via direct link and search.

**Architecture:** One new static Next.js route (`app/video-edition/page.tsx`) composed from two new page-local presentational components, one new page-local JSON-LD component, and one new copy-data file — following the exact composition pattern already used by `app/[slug]/page.tsx` (import named section components, assemble in JSX order). One new `CatalogItemId` (`"video-edition"`) added to the existing shared catalog so the page's Add-to-Cart buttons flow through the already-working `useCart`/multi-line cart infrastructure with zero new cart logic.

**Tech Stack:** Next.js 16.2.10 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion. **No test runner is configured in this repo** (`package.json` has no `test` script, no jest/vitest/playwright dependency). This plan's verification steps use the codebase's actual established pattern instead: `npm run build` (TypeScript type-check + compile) and `npm run lint` (ESLint) after every code change, plus concrete browser-tool verification (via the Claude Browser MCP tools) for anything with visible/behavioral output — checking exact rendered text, exact DOM values, and exact cart state. Every verification step below specifies the exact command or exact browser check to run and the exact expected result.

## Global Constraints

- All proof/stat claims must trace to live data already in the codebase (`LOOX_STATS`, `ORDER_STATS` from `lib/reviews/reviews.ts`) — this product itself has **zero reviews**; never invent a review count, testimonial, or "reviewers report" claim for Video Edition specifically.
- No `aggregateRating` in this page's JSON-LD (zero reviews for this product).
- Price is $44.99, no compare-at price (verified against live Shopify data — do not add a fake strikethrough price).
- **Zero footer, nav, or persona-gate presence** — do not touch `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/PersonaGate.tsx`, or `lib/copy/personas.ts`'s `PERSONAS`/`PERSONA_LIST`.
- Do not add `"video-edition"` to `MAT_VERSION_IDS`, `VOLUME_ELIGIBLE_IDS`, or `PERSONA_DEFAULTS` in `lib/catalog/catalog.ts` — no volume-builder or offer-grid participation.
- Image domain `cdn.shopify.com` is already allow-listed in `next.config.ts` — no config change needed for the new product image.
- Read `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` if metadata behavior is ever in question (already confirmed for this plan: static `export const metadata: Metadata = {...}` is correct for a route with no dynamic params, matching `app/layout.tsx`'s own pattern).

---

## File Structure

```
lib/catalog/catalog.ts                          [MODIFY] add "video-edition" CatalogItemId + CATALOG entry
lib/copy/video-edition.ts                        [CREATE] all page copy: hero, mechanism steps, use-case cards, FAQ items
components/video-edition/MechanismSection.tsx    [CREATE] 3-step "how it works" section
components/video-edition/UseCaseSection.tsx      [CREATE] 4-card use-case grid
components/video-edition/VideoEditionJsonLd.tsx  [CREATE] page-local Product schema (pure function + component wrapper)
app/video-edition/page.tsx                       [CREATE] route: metadata + section composition
app/sitemap.ts                                   [MODIFY] add /video-edition entry
```

---

### Task 1: Catalog entry for Video Edition

**Files:**
- Modify: `lib/catalog/catalog.ts:1-7` (the `CatalogItemId` union) and `lib/catalog/catalog.ts:38-120` (the `CATALOG` record — add one new entry; do not reorder existing entries)

**Interfaces:**
- Produces: `CatalogItemId` now includes `"video-edition"`; `CATALOG["video-edition"]` is a `CatalogItem` with `kind: "mat"`, `priceCents: 4499`, no `compareAtCents`, real Shopify `handle`/`image`. Every later task that imports `CATALOG` or `CatalogItemId` from `@/lib/catalog/catalog` relies on this entry existing.

- [ ] **Step 1: Add `"video-edition"` to the `CatalogItemId` union**

In `lib/catalog/catalog.ts`, change:

```ts
export type CatalogItemId =
  | "standard-unbranded"
  | "standard-branded"
  | "junior-unbranded"
  | "posing-guide"
  | "family-volume-pack"
  | "mat-guide-bundle";
```

to:

```ts
export type CatalogItemId =
  | "standard-unbranded"
  | "standard-branded"
  | "junior-unbranded"
  | "posing-guide"
  | "family-volume-pack"
  | "mat-guide-bundle"
  | "video-edition";
```

- [ ] **Step 2: Add the `CATALOG["video-edition"]` entry**

In `lib/catalog/catalog.ts`, immediately after the closing `},` of the `"mat-guide-bundle"` entry (right before the final `};` that closes the `CATALOG` object), add:

```ts
  "video-edition": {
    id: "video-edition",
    kind: "mat",
    title: "PosePerfect Mat™ Video Edition (Unbranded)",
    shortTitle: "Video Edition",
    handle: "poseperfect-mat™-video-edition",
    priceCents: 4499,
    description:
      "True chroma-key green with color-coded footprint guides — hit the same mark every take, and the mat keys out clean in post.",
    image:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/PPM_Video_Mat_2026.png?v=1784077468",
  },
```

- [ ] **Step 3: Verify it compiles**

Run: `cd /Users/loft954llc/poseperfectmat && npm run build 2>&1 | tail -20`
Expected: `✓ Compiled successfully` and `✓ Generating static pages` — no TypeScript errors. (Nothing consumes `"video-edition"` yet, so there is nothing new to render — this step only confirms the type and object literal are well-formed.)

- [ ] **Step 4: Verify lint is clean**

Run: `npm run lint 2>&1 | tail -20`
Expected: same error/warning count as before this change (no new errors introduced by this edit). If you're unsure of the baseline, run `git stash && npm run lint 2>&1 | grep -c error && git stash pop` to compare counts before/after.

- [ ] **Step 5: Commit**

```bash
cd /Users/loft954llc/poseperfectmat
git add lib/catalog/catalog.ts
git commit -m "Add Video Edition catalog entry

New CatalogItemId + CATALOG record for the green-screen mat, sourced
from live Shopify data (gid://shopify/Product/11987477758270). Not
added to MAT_VERSION_IDS/VOLUME_ELIGIBLE_IDS/PERSONA_DEFAULTS — this
product has no offer-grid or volume-builder participation, per the
2026-07-16 design spec."
```

---

### Task 2: Page copy data file

**Files:**
- Create: `lib/copy/video-edition.ts`

**Interfaces:**
- Consumes: `FaqItem` type from `@/lib/copy/personas` (`{ question: string; answer: string }`).
- Produces: `VIDEO_EDITION_COPY` object (hero fields), `VIDEO_EDITION_MECHANISM_STEPS` array, `VIDEO_EDITION_USE_CASES` array, `VIDEO_EDITION_FAQS: FaqItem[]`, `VIDEO_EDITION_SPEC_LINE: string`. Tasks 3, 4, 5, and 6 import from this file — the exact export names above must match what those tasks import.

- [ ] **Step 1: Create the file with all copy content**

Create `lib/copy/video-edition.ts`:

```ts
import type { FaqItem } from "@/lib/copy/personas";

/** Hero + page-level copy for the standalone Video Edition page. Not a persona — see docs/superpowers/specs/2026-07-16-video-edition-page-design.md. */
export const VIDEO_EDITION_COPY = {
  eyebrow: "For video & content creators",
  headline: "Same Mark Every Take. Invisible in the Final Cut.",
  subheadline:
    "PosePerfect Mat™ Video Edition uses true chroma-key green with color-coded footprint guides — hit the same spot every take, and the mat keys out clean in post.",
  primaryCta: "Add PosePerfect Mat™ Video Edition — $44.99",
  imageAlt:
    "PosePerfect Mat Video Edition — chroma-key green mat with color-coded footprint guides",
  finalCtaTitle: "Try it on your next shoot.",
} as const;

export type MechanismStep = {
  n: string;
  title: string;
  body: string;
};

export const VIDEO_EDITION_MECHANISM_STEPS: MechanismStep[] = [
  {
    n: "01",
    title: "Place the mat",
    body: "True chroma-key green, sized 18\" × 30\", anti-slip backing keeps it put on set.",
  },
  {
    n: "02",
    title: "Hit your mark",
    body: "Color-coded footprints give your subject the same stance and position, take after take.",
  },
  {
    n: "03",
    title: "Key it out",
    body: "The green area keys out with standard chroma-key software, same as your backdrop. Footprints are setup guides — they're under your subject's feet during the actual shot.",
  },
];

/** Verbatim from live Shopify product data (gid://shopify/Product/11987477758270), pulled 2026-07-16. */
export const VIDEO_EDITION_SPEC_LINE =
  "Polyester front, rubber back · Anti-slip backing · One-sided print · Hand wash · Assembled in the USA with globally sourced parts.";

export type UseCaseCard = {
  title: string;
  body: string;
};

export const VIDEO_EDITION_USE_CASES: UseCaseCard[] = [
  {
    title: "Tutorial & course creators",
    body: "Keep your on-camera position consistent across every lesson you film.",
  },
  {
    title: "Streamers & virtual sets",
    body: "Same framing every stream, so your virtual background doesn't drift.",
  },
  {
    title: "Rotating-guest shows",
    body: "Give every guest the same mark — no re-blocking the shot between takes.",
  },
  {
    title: "Multi-take productions",
    body: "Reset fast between takes without re-measuring your frame.",
  },
];

export const VIDEO_EDITION_FAQS: FaqItem[] = [
  {
    question: "Will the mat actually disappear in my final video?",
    answer:
      "The green surface keys out with standard chroma-key software, just like your backdrop. The footprint markers are there to help you set up — they sit under your subject's feet once you're rolling, so they're not visible in the shot either.",
  },
  {
    question: "How is this different from the standard PosePerfect Mat?",
    answer:
      "The standard mat is black, designed to sit below a headshot crop. Video Edition is true chroma-key green, built for setups where the mat itself is in frame and needs to key out.",
  },
  {
    question: "Will it work with my keying software?",
    answer:
      "It's a standard chroma-key green surface, so it behaves like any green screen backdrop in OBS, Premiere, After Effects, or similar. Key quality still depends on your lighting and exposure, same as your backdrop.",
  },
  {
    question: "What size is it?",
    answer:
      "18\" × 30\", same footprint as the standard mat — portable enough for a desk setup or a studio floor.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "US orders ship free on the economy tier, typically arriving within 5–7 business days after 3–5 days of processing. International orders (27 countries via USPS/DHL) are calculated at checkout and can add customs time.",
  },
  {
    question: "What is your return policy?",
    answer:
      "The product page offers a 30-day money-back style trial. Fail Up Inc.'s global refund policy historically restricted returns on sale items — if you need a return, contact support@failupinc.com promptly with your order so they can honor the product-page guarantee language.",
  },
];
```

- [ ] **Step 2: Verify it compiles and lints**

Run: `npm run build 2>&1 | tail -20 && npm run lint 2>&1 | tail -20`
Expected: build succeeds, no new lint errors. (This file has no consumers yet, so nothing renders — this only confirms the file itself is well-typed.)

- [ ] **Step 3: Verify no placeholder or fabricated-proof text slipped in**

Run:
```bash
grep -inE "TBD|TODO|FIXME|reviewers report|verified purchase|customers say" lib/copy/video-edition.ts
```
Expected: no output (empty). This file must never claim reviews/testimonials for this product.

- [ ] **Step 4: Commit**

```bash
git add lib/copy/video-edition.ts
git commit -m "Add Video Edition page copy data

Centralizes hero, mechanism-step, use-case, and FAQ copy for the new
standalone page in one file, matching the site's existing pattern of
keeping page copy in lib/copy/. FAQ shipping/returns items are trimmed
from the equivalent MASTER_FAQS entries to remove reviewer-testimony
language that doesn't apply to this zero-review product."
```

---

### Task 3: MechanismSection component

**Files:**
- Create: `components/video-edition/MechanismSection.tsx`

**Interfaces:**
- Consumes: `VIDEO_EDITION_MECHANISM_STEPS`, `VIDEO_EDITION_SPEC_LINE` from `@/lib/copy/video-edition`; `Reveal` from `@/components/motion/Reveal`.
- Produces: `MechanismSection()` — a zero-prop component. Task 6 renders `<MechanismSection />` directly.

- [ ] **Step 1: Create the component**

Create `components/video-edition/MechanismSection.tsx`:

```tsx
"use client";

import { Reveal } from "@/components/motion/Reveal";
import {
  VIDEO_EDITION_MECHANISM_STEPS,
  VIDEO_EDITION_SPEC_LINE,
} from "@/lib/copy/video-edition";

export function MechanismSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Behind the scenes
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Three steps. Same mark. Clean key.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VIDEO_EDITION_MECHANISM_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06}>
              <div className="border-t-2 border-yellow pt-5">
                <p className="font-[family-name:var(--font-display)] text-3xl text-yellow-deep">
                  {step.n}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-muted">{VIDEO_EDITION_SPEC_LINE}</p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: `✓ Compiled successfully`. (Not yet imported anywhere, so no route renders it — this confirms the component itself type-checks.)

- [ ] **Step 3: Commit**

```bash
git add components/video-edition/MechanismSection.tsx
git commit -m "Add Video Edition MechanismSection component

Bespoke 3-step section (place mat / hit your mark / key it out) —
visually matches the existing HowItWorks pattern but with new copy,
since HowItWorks's hardcoded text assumes the black headshot mat's
crop-based framing, which doesn't apply to chroma-key use."
```

---

### Task 4: UseCaseSection component

**Files:**
- Create: `components/video-edition/UseCaseSection.tsx`

**Interfaces:**
- Consumes: `VIDEO_EDITION_USE_CASES` from `@/lib/copy/video-edition`; `Reveal` from `@/components/motion/Reveal`.
- Produces: `UseCaseSection()` — a zero-prop component. Task 6 renders `<UseCaseSection />` directly.

- [ ] **Step 1: Create the component**

Create `components/video-edition/UseCaseSection.tsx`:

```tsx
"use client";

import { Reveal } from "@/components/motion/Reveal";
import { VIDEO_EDITION_USE_CASES } from "@/lib/copy/video-edition";

export function UseCaseSection() {
  return (
    <section className="bg-paper-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Who it's for
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Built for repeatable video setups.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {VIDEO_EDITION_USE_CASES.map((useCase, i) => (
            <Reveal key={useCase.title} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-line bg-white p-5">
                <h3 className="text-lg font-semibold">{useCase.title}</h3>
                <p className="mt-2 text-sm text-muted">{useCase.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add components/video-edition/UseCaseSection.tsx
git commit -m "Add Video Edition UseCaseSection component

Four plausible use-case cards (tutorial creators, streamers, rotating
guest shows, multi-take productions) — grounded in the product's real
function, not framed as customer testimonials or claims about
specific buyers, since this product has zero reviews."
```

---

### Task 5: VideoEditionJsonLd component

**Files:**
- Create: `components/video-edition/VideoEditionJsonLd.tsx`

**Interfaces:**
- Consumes: `CATALOG` from `@/lib/catalog/catalog`; `SITE` from `@/lib/copy/personas`.
- Produces: `buildVideoEditionProductSchema()` — pure function, no React/DOM dependency, returns a plain JSON-serializable object. `VideoEditionJsonLd()` — component wrapping it in a `<script type="application/ld+json">` tag. Task 6 renders `<VideoEditionJsonLd />` directly. The pure function is exported separately so its shape can be checked without rendering React (see Step 2).

- [ ] **Step 1: Create the component**

Create `components/video-edition/VideoEditionJsonLd.tsx`:

```tsx
import { CATALOG } from "@/lib/catalog/catalog";
import { SITE } from "@/lib/copy/personas";

/**
 * Pure schema builder, no React dependency — kept separate from the component
 * below so it can be sanity-checked with a plain node script (see Task 5, Step 2).
 * Deliberately has NO aggregateRating: this product has zero Loox reviews.
 */
export function buildVideoEditionProductSchema() {
  const product = CATALOG["video-edition"];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [product.image],
    sku: product.handle,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: {
      "@type": "Organization",
      name: "Fail Up Inc.",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/video-edition`,
      priceCurrency: "USD",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Fail Up Inc." },
    },
  };
}

export function VideoEditionJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildVideoEditionProductSchema()),
      }}
    />
  );
}
```

- [ ] **Step 2: Verify it compiles in the Next build**

This file uses the project's `@/` path aliases (`@/lib/catalog/catalog`, `@/lib/copy/personas`), which only resolve through the project's own `tsconfig.json`/Next build pipeline — not a standalone `tsc` invocation. `npm run build` is the correct, reliable way to type-check it. Run:

```bash
npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Manually confirm the schema object literal in Step 1 has no `aggregateRating` key and price math is correct**

Re-read the `buildVideoEditionProductSchema()` function you just wrote in Step 1. Confirm by inspection: (a) no `aggregateRating` field appears anywhere in the returned object — this product has zero Loox reviews; (b) `offers.price` is computed as `(product.priceCents / 100).toFixed(2)` where `product = CATALOG["video-edition"]` and `priceCents: 4499` (set in Task 1) — so `price` evaluates to `"44.99"`.

The full runtime assertion — parsing the actual rendered `<script>` tag in a live browser and checking both of these — happens once the page exists to render it, in Task 6 Step 6. That is the real end-to-end check; this step is a read-through sanity pass before moving on.

- [ ] **Step 4: Commit**

```bash
git add components/video-edition/VideoEditionJsonLd.tsx
git commit -m "Add Video Edition page-local Product JSON-LD

Scoped only to /video-edition, separate from the global JsonLd.tsx
(which describes the branded headshot mat on every route — this is
existing site behavior, not a regression). No aggregateRating: this
product has zero Loox reviews, and the site's standing rule is every
proof number must trace to live data."
```

---

### Task 6: Route composition — `app/video-edition/page.tsx`

**Files:**
- Create: `app/video-edition/page.tsx`

**Interfaces:**
- Consumes: `VIDEO_EDITION_COPY`, `VIDEO_EDITION_FAQS` from `@/lib/copy/video-edition`; `CATALOG` from `@/lib/catalog/catalog`; `MechanismSection` from `@/components/video-edition/MechanismSection`; `UseCaseSection` from `@/components/video-edition/UseCaseSection`; `VideoEditionJsonLd` from `@/components/video-edition/VideoEditionJsonLd`; `Hero` from `@/components/Hero`; `TrustAssurance` from `@/components/TrustAssurance`; `FAQ` from `@/components/FAQ`; `FinalCTA` from `@/components/Sections`; `CheckoutButton` from `@/components/CheckoutButton`.
- Produces: the `/video-edition` route. Task 7 (sitemap) references this exact path (`/video-edition`).

- [ ] **Step 1: Create the page**

Create `app/video-edition/page.tsx`:

```tsx
import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { FinalCTA } from "@/components/Sections";
import { TrustAssurance } from "@/components/TrustAssurance";
import { MechanismSection } from "@/components/video-edition/MechanismSection";
import { UseCaseSection } from "@/components/video-edition/UseCaseSection";
import { VideoEditionJsonLd } from "@/components/video-edition/VideoEditionJsonLd";
import { CATALOG } from "@/lib/catalog/catalog";
import {
  VIDEO_EDITION_COPY,
  VIDEO_EDITION_FAQS,
} from "@/lib/copy/video-edition";

const PATH = "/video-edition";
const PRODUCT = CATALOG["video-edition"];

export const metadata: Metadata = {
  title: VIDEO_EDITION_COPY.headline,
  description: VIDEO_EDITION_COPY.subheadline,
  alternates: { canonical: PATH },
  openGraph: {
    title: VIDEO_EDITION_COPY.headline,
    description: VIDEO_EDITION_COPY.subheadline,
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: VIDEO_EDITION_COPY.headline,
    description: VIDEO_EDITION_COPY.subheadline,
  },
};

export default function VideoEditionPage() {
  return (
    <>
      <VideoEditionJsonLd />
      <Hero
        eyebrow={VIDEO_EDITION_COPY.eyebrow}
        headline={VIDEO_EDITION_COPY.headline}
        subheadline={VIDEO_EDITION_COPY.subheadline}
        ctaLabel={VIDEO_EDITION_COPY.primaryCta}
        image={PRODUCT.image}
        imageAlt={VIDEO_EDITION_COPY.imageAlt}
        itemId="video-edition"
      />
      <MechanismSection />
      <UseCaseSection />
      <section className="border-y border-line bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <TrustAssurance />
        </div>
      </section>
      <FAQ items={VIDEO_EDITION_FAQS} title="Video Edition FAQ" />
      <FinalCTA
        title={VIDEO_EDITION_COPY.finalCtaTitle}
        cta={
          <CheckoutButton
            label={VIDEO_EDITION_COPY.primaryCta}
            itemId="video-edition"
          />
        }
      />
    </>
  );
}
```

Note: the hero image is read from `CATALOG["video-edition"].image` (set in Task 1) rather than hardcoded again here — one source of truth for the product image URL.

- [ ] **Step 2: Verify build and lint are clean**

Run: `npm run build 2>&1 | tail -25 && npm run lint 2>&1 | tail -25`
Expected: `✓ Compiled successfully`, `✓ Generating static pages using N workers` and the build output lists `○ /video-edition` as a new static route. No new lint errors.

- [ ] **Step 3: Verify nothing links to it from nav/footer/persona-gate**

Run:
```bash
grep -rn "video-edition" components/SiteHeader.tsx components/SiteFooter.tsx components/PersonaGate.tsx lib/copy/personas.ts 2>/dev/null
```
Expected: no output (empty) — confirms zero footer/nav/persona-gate presence, matching the approved design spec.

- [ ] **Step 4: Browser-verify the page renders correctly**

Start the dev server via the Browser pane's `preview_start` tool with `{"name": "poseperfect-dev"}` (this is the existing `.claude/launch.json` config name already used earlier in this project — reuse it, don't create a new one), then use the Claude Browser tools:

```
mcp__Claude_Browser__preview_start (name: "poseperfect-dev")
mcp__Claude_Browser__navigate → http://localhost:3000/video-edition
mcp__Claude_Browser__get_page_text
```

Expected in the extracted text: the headline "Same Mark Every Take. Invisible in the Final Cut.", all four use-case card titles ("Tutorial & course creators", "Streamers & virtual sets", "Rotating-guest shows", "Multi-take productions"), the price "$44.99" in the hero CTA, and the FAQ question "Will the mat actually disappear in my final video?".

Then run:
```
mcp__Claude_Browser__javascript_tool (action: javascript_exec, text: "document.title")
```
Expected: `"Same Mark Every Take. Invisible in the Final Cut. · PosePerfect Mat™"` (the `%s · PosePerfect Mat™` template from `app/layout.tsx` applied to this page's `metadata.title`).

Finally, take a desktop screenshot:
```
mcp__Claude_Browser__computer (action: screenshot)
```
Expected: hero renders with the chroma-key green mat image, headline, and CTA button all visible above the fold at the default desktop viewport width.

- [ ] **Step 5: Browser-verify Add to Cart works and creates a real $44.99 cart line**

```
mcp__Claude_Browser__javascript_tool (action: javascript_exec, text:
  "(() => { const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Video Edition') && b.textContent.includes('44.99')); btn.click(); return btn ? 'clicked' : 'NOT FOUND'; })()"
)
```
Expected: `"clicked"`. Wait ~2 seconds, then:
```
mcp__Claude_Browser__javascript_tool (action: javascript_exec, text:
  "(() => { const d = document.querySelector('[role=\"dialog\"]'); if (!d) return JSON.stringify({drawerOpen:false}); const lines = [...d.querySelectorAll('li')].map(li => li.querySelector('.truncate')?.textContent); const subtotal = d.textContent.match(/Subtotal\\s*\\$[\\d.]+/)?.[0]; return JSON.stringify({drawerOpen:true, lines, subtotal}); })()"
)
```
Expected: `drawerOpen: true`, `subtotal` is `"Subtotal$44.99"`, and `lines` includes a string containing `"Video Edition"` — check with `.includes("Video Edition")` rather than an exact match. The cart drawer's line-item title (`line.merchandise.product.title` in `components/cart/CartDrawer.tsx`) is populated live from the **real Shopify product title** at checkout time ("PosePerfect Mat™ Video Edition by Chris Headshots (UnBranded)"), which is *not* the same string as this catalog entry's local `title` field written in Task 1 ("PosePerfect Mat™ Video Edition (Unbranded)", used only for this site's own display copy, e.g. in the JSON-LD schema in Task 5). Do not assert an exact string match against the Task 1 title here — that would fail against the real cart response.

- [ ] **Step 6: Browser-verify the JSON-LD script is valid and has no aggregateRating**

```
mcp__Claude_Browser__javascript_tool (action: javascript_exec, text:
  "(() => { const scripts = [...document.querySelectorAll('script[type=\"application/ld+json\"]')]; const veScript = scripts.find(s => { try { return JSON.parse(s.textContent).sku === 'poseperfect-mat™-video-edition'; } catch { return false; } }); if (!veScript) return 'NOT FOUND'; const parsed = JSON.parse(veScript.textContent); return JSON.stringify({ hasAggregateRating: 'aggregateRating' in parsed, price: parsed.offers.price, name: parsed.name }); })()"
)
```
Expected: `{"hasAggregateRating":false,"price":"44.99","name":"PosePerfect Mat™ Video Edition (Unbranded)"}`.

- [ ] **Step 7: Mobile check**

```
mcp__Claude_Browser__resize_window (preset: mobile)
mcp__Claude_Browser__computer (action: screenshot)
```
Expected: hero, use-case cards, and FAQ all readable with no horizontal overflow at 375px width.

- [ ] **Step 8: Commit**

```bash
git add app/video-edition/page.tsx
git commit -m "Add standalone /video-edition route

Composes Hero, MechanismSection, UseCaseSection, TrustAssurance, FAQ,
and FinalCTA into a full landing page for the green-screen mat.
itemId=\"video-edition\" flows through the existing CheckoutButton/
useCart infrastructure with no new cart logic. Verified: builds
clean, add-to-cart creates a real \$44.99 cart line, JSON-LD has no
aggregateRating, page is absent from nav/footer/persona-gate."
```

---

### Task 7: Sitemap entry

**Files:**
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `SITE.url` from `@/lib/copy/personas` (already imported in this file).
- Produces: one additional entry in the `MetadataRoute.Sitemap` array returned by `sitemap()`.

- [ ] **Step 1: Add the entry**

In `app/sitemap.ts`, the current return statement is:

```ts
  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...personas,
    {
      url: `${SITE.url}/cart`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
```

Change it to add the new entry right after `...personas,`:

```ts
  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...personas,
    {
      url: `${SITE.url}/video-edition`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/cart`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
```

(Leave the rest of the array — `/privacy`, `/trademark` — unchanged.)

- [ ] **Step 2: Verify build is clean**

Run: `npm run build 2>&1 | tail -20`
Expected: `✓ Compiled successfully`, and the route list includes `○ /sitemap.xml`.

- [ ] **Step 3: Verify the sitemap actually contains the new URL**

Start the dev server if not already running (`npm run dev` on port 3000, or via the Browser pane's `preview_start`), then:

```bash
curl -s http://localhost:3000/sitemap.xml | grep -o "https://poseperfectmats.com/video-edition"
```
Expected: `https://poseperfectmats.com/video-edition` (exactly one match).

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts
git commit -m "Add /video-edition to sitemap

Lower priority (0.5) and monthly change frequency, since the page has
zero in-site nav/footer links by design — sitemap inclusion is the
only way search engines discover it."
```

---

### Task 8: End-to-end verification, deploy

**Files:** none (verification-only task)

- [ ] **Step 1: Full clean build**

```bash
cd /Users/loft954llc/poseperfectmat
rm -rf .next
npm run build 2>&1 | tail -40
```
Expected: `✓ Compiled successfully`, `✓ Generating static pages using N workers (N/N)`, and `○ /video-edition` appears in the route list as a static (`○`) route, not dynamic.

- [ ] **Step 2: Full lint pass**

```bash
npm run lint 2>&1
```
Expected: same error count as the `main` branch baseline before this feature (no new errors from any file this plan touched). If any new errors appear in files this plan created/modified, fix them now.

- [ ] **Step 3: Grep sweep for stray placeholder/fabrication text across all new files**

```bash
grep -rniE "TBD|TODO|FIXME|lorem ipsum|reviewers report|verified purchase" \
  lib/copy/video-edition.ts \
  components/video-edition/ \
  app/video-edition/page.tsx
```
Expected: no output.

- [ ] **Step 4: Confirm zero nav/footer/persona-gate presence one more time (post-integration)**

```bash
grep -rn "video-edition" components/SiteHeader.tsx components/SiteFooter.tsx components/PersonaGate.tsx lib/copy/personas.ts app/page.tsx 2>/dev/null
```
Expected: no output.

- [ ] **Step 5: Push and deploy**

```bash
git push origin main
```

Then poll production until the route is live (Vercel auto-deploys on push to `main`, per this repo's existing deployment flow documented in `DEPLOY.md`):

```bash
for i in $(seq 1 20); do
  code=$(curl -s -o /dev/null -w "%{http_code}" https://poseperfectmats.com/video-edition)
  if [ "$code" = "200" ]; then echo "LIVE (200)"; break; fi
  sleep 20
done
curl -s https://poseperfectmats.com/video-edition | grep -o "Same Mark Every Take[^<]*" | head -1
curl -s https://poseperfectmats.com/sitemap.xml | grep -o "https://poseperfectmats.com/video-edition"
```
Expected: `LIVE (200)`, the headline text present, and the sitemap URL present.

- [ ] **Step 6: Final production sanity check via browser**

```
mcp__Claude_Browser__navigate → https://poseperfectmats.com/video-edition
mcp__Claude_Browser__computer (action: screenshot)
```
Expected: page renders identically to the local dev verification in Task 6, Steps 4–7, on the live production domain.
