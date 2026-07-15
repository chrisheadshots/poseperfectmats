# PosePerfect Mat — Landing System

Conversion site for **PosePerfect Mat** on [poseperfectmats.com](https://poseperfectmats.com), powered by Fail Up Inc. headless Shopify checkout.

## Pages

| Route | Purpose |
|---|---|
| `/` | Master ROI landing page |
| `/corporate-headshots` | Corporate persona |
| `/school-volume` | School / volume persona |
| `/event-photo-booths` | Event / photo booth persona |
| `/family-sessions` | Family / mini sessions persona |
| `/beginner-photographers` | Beginner photographer persona |

## Setup

1. Copy env template:

```bash
cp .env.example .env.local
```

2. In Shopify Admin → **Sales channels → Headless** (or Storefront API), create a Storefront access token with product + cart scopes for shop `c767d9.myshopify.com` (failupinc.com).

3. Fill `.env.local`:

```
SHOPIFY_STORE_DOMAIN=c767d9.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_or_storefront_token_here
SHOPIFY_API_VERSION=2025-04
NEXT_PUBLIC_SITE_URL=https://poseperfectmats.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL=https://failupinc.com
```

Without a token, CTAs fall back to Fail Up Inc. product pages so the site still demos.

```bash
npm install
npm run dev
```

## Deploy to Vercel + poseperfectmats.com

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Add the same env vars in Vercel Project Settings.
4. **Domains** → Add `poseperfectmats.com` and `www.poseperfectmats.com`.
5. At your DNS host for poseperfectmats.com:
   - Apex: Vercel A record `76.76.21.21` (or ALIAS/ANAME per Vercel UI)
   - `www`: CNAME to `cname.vercel-dns.com` (confirm values in Vercel domain panel)
6. After DNS verifies, set production URL in env `NEXT_PUBLIC_SITE_URL=https://poseperfectmats.com`.

Checkout still opens Fail Up Inc. Shopify hosted checkout (`cart.checkoutUrl`) after cart handoff.

## Catalog

**Mats:** Unbranded Standard ($54.99), Branded Standard ($44.99), Junior Unbranded ($54.99), Posing Guide ebook ($19.97)

**Bundles:** Family & Volume Pack ($94.99), Mat + Guide ($67.47)

**Excluded:** Wear + Pose, On-Set Starter

**Volume Builder:** 2–5 mats at 15–30% (matches live store widget; discount applied by Shopify automatic discounts at checkout when configured)

## Social proof

Loox stats on-site: **208 verified reviews · 4.6★** — pulled from the live `loox` product metafields on 2026-07-14 (branded 135 @ 4.7★, unbranded 63 @ 4.6★, Junior 3 @ 4.7★, guide 7 @ 4.3★; not the inflated 1,258 badge on the product template). Order proof: **2,900+ orders shipped** (2,973 all-time per Shopify analytics, same date). Ambassadors: `@jaquieohh`, `@shootwithray`, `@joeywrightphoto`.

### Refreshing reviews

Review content is a curated static snapshot in `lib/reviews/reviews.ts` — nothing is fetched from Loox at runtime.

1. Run `SHOPIFY_ADMIN_TOKEN=shpat_... npm run refresh:reviews` (needs an Admin API token with `read_products`; the site's Storefront token cannot read metafields). This writes `lib/reviews/loox-source.json` and prints live counts vs the constants.
2. Update `LOOX_STATS`, `LOOX_STATS_BY_PRODUCT`, and `ORDER_STATS` in `lib/reviews/reviews.ts`.
3. Hand-pick new quotes into `REVIEWS` with persona tags — curation is editorial, keep quotes verbatim and never fabricate dates (omit `date` when the source has none).

No Admin token? Pull the `loox` namespace metafields for the four PosePerfect products via the Shopify MCP (`graphql_query`) and update the constants by hand.
