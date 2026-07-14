# Deploy poseperfectmats.com

## Live now

| Item | Value |
|---|---|
| Production URL | https://poseperfectmat.vercel.app |
| GitHub | https://github.com/chrisheadshots/poseperfectmats |
| Vercel project | `loft954-projects/poseperfectmat` |
| Domains attached | `poseperfectmats.com`, `www.poseperfectmats.com` (DNS pending) |

## DNS (GoDaddy / domaincontrol.com)

Current nameservers are `ns61.domaincontrol.com` / `ns62.domaincontrol.com`. Keep them and add records **or** switch nameservers to Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

### Recommended records (keep GoDaddy NS)

In GoDaddy DNS for `poseperfectmats.com`:

| Type | Name | Value | Notes |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | Apex → Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | www → Vercel |

Remove any conflicting A/CNAME on `@` or `www` that point elsewhere. Vercel emails when verification completes.

## 1. Shopify Storefront token (required for headless cart)

1. Open Fail Up Inc. Shopify Admin (`c767d9.myshopify.com`).
2. Enable the **Headless** sales channel (or create a custom app with Storefront API access).
3. Create a **Storefront API access token** with product + cart scopes.
4. In Vercel → Project → Settings → Environment Variables, add:

```
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<token>
```

5. Redeploy production after adding the token:

```bash
vercel --prod
```

Until the token is set, CTAs open Fail Up Inc. product pages as a fallback.

## 2. Environment variables (already set on production where applicable)

| Name | Value |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `c767d9.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | *(add manually — secret)* |
| `SHOPIFY_API_VERSION` | `2025-04` |
| `NEXT_PUBLIC_SITE_URL` | `https://poseperfectmats.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL` | `https://failupinc.com` |

## 3. Smoke test

1. Open https://poseperfectmat.vercel.app (and poseperfectmats.com after DNS)
2. ROI calculator + FAQ
3. Shop offer tabs / Volume Builder
4. Persona routes: `/corporate-headshots`, `/school-volume`, `/event-photo-booths`, `/family-sessions`, `/beginner-photographers`
5. CTA → Shopify `checkoutUrl` once token is configured
