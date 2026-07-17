# Video Edition Page — Design Spec

## Context

`PosePerfect Mat™ Video Edition` (Shopify handle `poseperfect-mat™-video-edition`, $44.99, product ID `gid://shopify/Product/11987477758270`) sells live but has no presence on poseperfectmats.com. It's a genuinely distinct product from the site's five existing photography personas: a **true chroma-key green mat** for video/streaming production, not a variant of the black headshot-posing mat. It has **zero Loox reviews** and only 5 orders in the last 90 days with no marketing behind it — a different evidence footing than the five proven personas.

Goal: give it a real, honest standalone page, without implying it has the same proof or audience-fit as the established personas.

## Decisions (confirmed with user)

- **Not a 6th persona.** Standalone route, not in header nav, not in the "Who are you?" persona gate.
- **Zero footer presence.** No link anywhere on the site. Discovery is via direct link (ads/social/QR) and search engines only (sitemap inclusion).
- **Primary audience: content creators / streamers** (not existing photographer customers, not a hedge between both).
- **Proof strategy:** borrow real brand-wide stats (208 verified Loox reviews, 4.6★, 2,900+ orders shipped) via the existing `TrustAssurance` component, explicitly not implying those are Video-Edition-specific. No fabricated testimonials, no invented review count for this product.
- **Full landing-page scope** (not a lightweight product page, not an offer-grid-only tile): hero, mechanism section, use-case highlights, trust strip, FAQ, final CTA. Explicitly **skips** the ROI calculator (calibrated to "minutes saved per headshot," doesn't map to streaming) and the Loox review/video/photo sections (no product-specific proof exists — showing them would misrepresent).

## Source of truth (real Shopify data, pulled 2026-07-16)

- Title: "PosePerfect Mat™ Video Edition by Chris Headshots (UnBranded)"
- Price: $44.99, no compare-at price
- Handle: `poseperfect-mat™-video-edition`
- Image: `https://cdn.shopify.com/s/files/1/0817/9099/2702/files/PPM_Video_Mat_2026.png?v=1784077468`
- Real description (paraphrased into site copy, not verbatim-copied): true chroma-key green surface with placement-guide footprints, polyester front/rubber back, anti-slip backing, one-sided print, hand wash, 18" × 30", assembled in the USA with globally sourced parts.
- Zero Loox reviews on this product (no `loox` metafields present).

## Page content

**Route:** `app/video-edition/page.tsx` — new static file-based route. Not part of the `[slug]` dynamic persona route (that route's types are coupled to `PERSONAS`/`PERSONA_DEFAULTS`; keeping this separate avoids polluting those types with a non-persona entity). Own `generateMetadata` (title/description/OG), matching the persona-page metadata pattern in `app/[slug]/page.tsx`.

**Sections, top to bottom:**

1. **Hero** — reuses `components/Hero.tsx` as-is (already generic: eyebrow/headline/subheadline/ctaLabel/image/imageAlt/itemId props).
   - Eyebrow: "For video & content creators"
   - Headline: "Same Mark Every Take. Invisible in the Final Cut."
   - Subheadline: "PosePerfect Mat™ Video Edition uses true chroma-key green with color-coded footprint guides — hit the same spot every take, and the mat keys out clean in post."
   - CTA label: "Add PosePerfect Mat™ Video Edition — $44.99"
   - `itemId`: `"video-edition"`
   - Image: real Shopify `PPM_Video_Mat_2026.png` URL above; alt text describing the chroma-key green mat.

2. **Mechanism (3-step)** — bespoke local JSX in the page file (not a shared component), visually matching the existing `HowItWorks` pattern (numbered 01/02/03, border-t-2 border-yellow) but with new copy, since `components/Sections.tsx`'s `HowItWorks` has hardcoded headshot-crop copy that doesn't fit:
   1. **Place the mat** — "True chroma-key green, sized 18\" × 30\", anti-slip backing keeps it put on set."
   2. **Hit your mark** — "Color-coded footprints give your subject the same stance and position, take after take."
   3. **Key it out** — "The green area keys out with standard chroma-key software, same as your backdrop. Footprints are setup guides — they're under your subject's feet during the actual shot."
   - Below the 3 steps, one spec line pulled from real Shopify product data: "Polyester front, rubber back · Anti-slip backing · One-sided print · Hand wash · Assembled in the USA with globally sourced parts."

3. **Use-case highlights** — bespoke local JSX, 4 cards, plausible (not fabricated as testimonials/claims about specific customers):
   - Tutorial & course creators — "Keep your on-camera position consistent across every lesson you film."
   - Streamers & virtual sets — "Same framing every stream, so your virtual background doesn't drift."
   - Rotating-guest shows — "Give every guest the same mark — no re-blocking the shot between takes."
   - Multi-take productions — "Reset fast between takes without re-measuring your frame."

4. **Trust strip** — reuses `components/TrustAssurance.tsx` as-is (real brand-wide stats: order count, Loox review count/average, shipping/guarantee copy). No product-specific proof claims layered on top.

5. **FAQ** — reuses `components/FAQ.tsx` (`items`/`title` props). New question set for this page:
   1. *"Will the mat actually disappear in my final video?"* → "The green surface keys out with standard chroma-key software, just like your backdrop. The footprint markers are there to help you set up — they sit under your subject's feet once you're rolling, so they're not visible in the shot either."
   2. *"How is this different from the standard PosePerfect Mat?"* → "The standard mat is black, designed to sit below a headshot crop. Video Edition is true chroma-key green, built for setups where the mat itself is in frame and needs to key out."
   3. *"Will it work with my keying software?"* → "It's a standard chroma-key green surface, so it behaves like any green screen backdrop in OBS, Premiere, After Effects, or similar. Key quality still depends on your lighting and exposure, same as your backdrop."
   4. *"What size is it?"* → "18\" × 30\", same footprint as the standard mat — portable enough for a desk setup or a studio floor."
   5. *"How long does shipping take?"* → "US orders ship free on the economy tier, typically arriving within 5–7 business days after 3–5 days of processing. International orders (27 countries via USPS/DHL) are calculated at checkout and can add customs time." (Mechanics only, copied from the real shipping terms in `MASTER_FAQS` — deliberately drops that FAQ's "several reviewers recommend..." line, since Video Edition has no reviews to attribute that to.)
   6. *"What is your return policy?"* → "The product page offers a 30-day money-back style trial. Fail Up Inc.'s global refund policy historically restricted returns on sale items — if you need a return, contact support@failupinc.com promptly with your order so they can honor the product-page guarantee language." (Same trim: drops `MASTER_FAQS`'s "buyers with damaged prints report..." line, since that's reviewer testimony specific to the other product.)

6. **Final CTA** — reuses `components/Sections.tsx`'s `FinalCTA` (title/body/cta props).
   - Title: "Try it on your next shoot."
   - CTA: `CheckoutButton` with `itemId="video-edition"`, label "Add PosePerfect Mat™ Video Edition — $44.99"

**JSON-LD:** minimal page-local `Product` schema (name, image, price, offers) added directly in the new page — scoped only to this page, separate from the global `components/JsonLd.tsx` (which is hardcoded to the branded headshot mat and out of scope to touch). **No `aggregateRating`** field, since there are zero reviews for this product — consistent with the site's standing rule that all proof numbers must trace to live data.

## Catalog / data wiring

- New `CatalogItemId` value `"video-edition"` added to the union type and `CATALOG` record in `lib/catalog/catalog.ts`: `kind: "mat"`, `priceCents: 4499`, no `compareAtCents`, real Shopify `handle` and `image`, description paraphrased from the real Shopify product description.
- **Not** added to `MAT_VERSION_IDS` (keeps the master page's "Shop by version" grid scoped to headshot-mat variants — a different-use-case product there would confuse that grid's purpose).
- **Not** added to `VOLUME_ELIGIBLE_IDS` or `PERSONA_DEFAULTS` — no volume-builder or persona-default participation. Purchased only via this page's own CTA (still flows through the existing shared cart infrastructure — `AddToCartButton`/`CheckoutButton`/`useCart` — no new cart logic needed).

## Discovery

- **`app/sitemap.ts`**: add one entry for `/video-edition` at lower priority (0.5) and `changeFrequency: "monthly"`, so it's crawlable via search despite having no in-site links pointing to it.
- **No footer link, no nav link, no persona-gate link.** Fully orphaned within the site's own navigation by design — reachable only via direct link (ads/social/QR) or search.

## Out of scope

- No changes to `components/JsonLd.tsx`, `PersonaGate`, `SiteHeader`, or `SiteFooter`.
- No changes to the Meta ads campaign (a future ad set targeting this page is a separate task, not part of this spec).
- No review-collection mechanism for this product (out of scope; would be a future task once real orders/reviews accumulate).

## Verification

1. `npm run build` + `npm run lint` clean.
2. `/video-edition` renders all six sections; hero CTA and final CTA both add `video-edition` to cart at $44.99 via the existing multi-line-capable cart provider.
3. Confirm the page does **not** appear in `SiteHeader` nav, `PersonaGate`, or `SiteFooter` — grep for `video-edition` in those three files should return nothing.
4. Confirm `/video-edition` appears in `app/sitemap.ts` output.
5. Product JSON-LD on the page validates (Google Rich Results test) with no `aggregateRating` present.
6. Visual check (desktop + 375px mobile) via Browser pane: chroma-key green product image renders correctly, FAQ accordion works, cards read cleanly at mobile width.
