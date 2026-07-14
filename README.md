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

Loox stats on-site: **213 verified reviews · 4.6★** (not the inflated 1,258 badge on the product template). Ambassadors: `@jaquieohh`, `@shootwithray`, `@joeywrightphoto`.
