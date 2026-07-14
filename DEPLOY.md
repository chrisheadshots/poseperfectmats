# Deploy poseperfectmats.com

## 1. Shopify Storefront token

1. Open Fail Up Inc. Shopify Admin (`c767d9.myshopify.com`).
2. Enable the **Headless** sales channel (or create a custom app with Storefront API access).
3. Create a **Storefront API access token** with at least:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts` / cart scopes (Cart API)
4. Put the token in Vercel env as `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

Until the token is set, CTAs open Fail Up product pages as a fallback.

## 2. Vercel project

```bash
npx vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard.

### Required environment variables

| Name | Value |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `c767d9.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | *(from Shopify)* |
| `SHOPIFY_API_VERSION` | `2025-04` |
| `NEXT_PUBLIC_SITE_URL` | `https://poseperfectmats.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL` | `https://failupinc.com` |

## 3. Domain DNS (poseperfectmats.com)

In Vercel → Project → Settings → Domains:

1. Add `poseperfectmats.com`
2. Add `www.poseperfectmats.com` (redirect www → apex or vice versa)

At your DNS provider, apply the records Vercel shows (typically):

- **A** `@` → `76.76.21.21`
- **CNAME** `www` → `cname.vercel-dns.com`

Wait for TLS + DNS verification (can take a few minutes to hours).

## 4. Smoke test

1. Open `https://poseperfectmats.com`
2. Use ROI calculator and FAQ
3. Click **Get PosePerfect Mat** — should redirect to Shopify `checkoutUrl` when token is configured
4. Hit persona routes under `/corporate-headshots`, `/school-volume`, etc.
