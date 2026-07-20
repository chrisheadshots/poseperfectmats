export type CatalogItemId =
  | "standard-unbranded"
  | "standard-branded"
  | "junior-unbranded"
  | "posing-guide"
  | "family-volume-pack"
  | "mat-guide-bundle"
  | "video-edition";

export type CatalogKind = "mat" | "digital" | "bundle";

export type CatalogItem = {
  id: CatalogItemId;
  kind: CatalogKind;
  title: string;
  shortTitle: string;
  handle: string;
  priceCents: number;
  compareAtCents?: number;
  description: string;
  image: string;
  badge?: string;
};

export type PersonaKey =
  | "master"
  | "corporate"
  | "school"
  | "events"
  | "family"
  | "beginner";

export type VolumeTier = {
  qty: number;
  percentOff: number;
};

/** Live Fail Up Inc. catalog (validated 2026-07-14). Wear+Pose and On-Set Starter excluded. */
export const CATALOG: Record<CatalogItemId, CatalogItem> = {
  "standard-unbranded": {
    id: "standard-unbranded",
    kind: "mat",
    title: "PosePerfect Mat™ — Standard (Unbranded)",
    shortTitle: "Unbranded Standard",
    handle: "poseperfect-mat™-by-chris-headshots-unbranded",
    priceCents: 5499,
    compareAtCents: 9999,
    description:
      "18\" × 30\" color-coded footprint guides with no logo — clean for premium studios and on-camera framing.",
    image:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/poseperfect-mat-hero.png?v=1782353205",
    badge: "No logo — clean pro look",
  },
  "standard-branded": {
    id: "standard-branded",
    kind: "mat",
    title: "PosePerfect Mat™ — Standard (Branded)",
    shortTitle: "Branded Standard",
    handle: "poseperfect-mat™-by-chris-headshots",
    priceCents: 4499,
    compareAtCents: 8999,
    description:
      "Same professional stance system with Chris Headshots branding — the mat 1,600+ photographers picked, at the best price.",
    image:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/ChatGPT_Image_Jul_14_2026_10_41_18_PM.png?v=1784083338",
    badge: "Most popular",
  },
  "junior-unbranded": {
    id: "junior-unbranded",
    kind: "mat",
    title: "PosePerfect Mat™ Junior (Unbranded)",
    shortTitle: "Junior Unbranded",
    handle: "poseperfect-mat™-junior-by-chris-headshots-unbranded",
    priceCents: 5499,
    compareAtCents: 9999,
    description:
      "Sized for kids, school picture days, and second stations — pair with Standard for Family & Volume setups.",
    image:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/ChatGPT_Image_Jul_14_2026_07_39_52_PM.png?v=1784083407",
  },
  "posing-guide": {
    id: "posing-guide",
    kind: "digital",
    title: "Advanced Posing Guide (Ebook)",
    shortTitle: "Posing Guide",
    handle: "poseperfect-mat™-advanced-posing-guide-ebook",
    priceCents: 1997,
    compareAtCents: 3999,
    description:
      "Digital posing education that pairs with the mat — ideal when you want direction language, not just foot placement.",
    image:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/PPM_Guide_Mockup_Main.png?v=1755061597",
  },
  "family-volume-pack": {
    id: "family-volume-pack",
    kind: "bundle",
    title: "Family & Volume Pack — Standard + Junior",
    shortTitle: "Family & Volume Pack",
    handle: "family-volume-pack-poseperfect-mat™-junior-mat",
    priceCents: 9499,
    description:
      "Two stations ready: Standard + Junior mats for school days, family minis, and multi-assistant workflows.",
    image:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/3ec758599e81145666697104250b29de_1783356758744_518e82c3-7269-4d52-927b-54c6b781e818.jpg?v=1783357034",
    badge: "Best for volume",
  },
  "mat-guide-bundle": {
    id: "mat-guide-bundle",
    kind: "bundle",
    title: "PosePerfect Mat™ + Advanced Posing Guide",
    shortTitle: "Mat + Guide Bundle",
    handle: "poseperfect-mat™-advanced-posing-guide-bundle",
    priceCents: 6747,
    compareAtCents: 7496,
    description:
      "Physical stance system plus the Advanced Posing Guide — the confidence kit for newer shooters and headshot pros.",
    image: "/products/pro-kit-mat-guide.png",
    badge: "Save vs buying separate",
  },
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
};

export const MAT_VERSION_IDS: CatalogItemId[] = [
  "standard-unbranded",
  "standard-branded",
  "junior-unbranded",
  "posing-guide",
];

export const BUNDLE_IDS: CatalogItemId[] = [
  "family-volume-pack",
  "mat-guide-bundle",
];

/**
 * Verified against live Storefront carts (2026-07-15): a "Buy 2+ mats, save 10%"
 * automatic discount fires on every mat (unbranded, junior, mixed). Branded mats
 * get MORE via a separate store "Bundle Discount" app (15% at 2, 25% at 3), so
 * 10% is the honest floor we advertise — the site never displays a number higher
 * than Shopify charges. Do not re-add a 15–30% ladder; it does not fire uniformly.
 */
export const VOLUME_TIERS: VolumeTier[] = [{ qty: 2, percentOff: 10 }];

export const VOLUME_ELIGIBLE_IDS: CatalogItemId[] = [
  "standard-unbranded",
  "standard-branded",
  "junior-unbranded",
];

export type PersonaDefault =
  | { mode: "item"; itemId: CatalogItemId }
  | { mode: "volume"; itemId: CatalogItemId; qty: number };

export const PERSONA_DEFAULTS: Record<PersonaKey, PersonaDefault> = {
  master: { mode: "item", itemId: "standard-branded" },
  corporate: { mode: "volume", itemId: "standard-unbranded", qty: 3 },
  school: { mode: "item", itemId: "family-volume-pack" },
  events: { mode: "item", itemId: "standard-unbranded" },
  family: { mode: "item", itemId: "family-volume-pack" },
  beginner: { mode: "item", itemId: "mat-guide-bundle" },
};

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function volumeDiscountForQty(qty: number): number {
  let pct = 0;
  for (const tier of VOLUME_TIERS) {
    if (qty >= tier.qty) pct = tier.percentOff;
  }
  return pct;
}

export function volumeEstimate(itemId: CatalogItemId, qty: number) {
  const item = CATALOG[itemId];
  const subtotal = item.priceCents * qty;
  const percentOff = volumeDiscountForQty(qty);
  const savings = Math.round(subtotal * (percentOff / 100));
  return {
    subtotal,
    percentOff,
    savings,
    total: subtotal - savings,
  };
}

export function shopifyProductUrl(handle: string): string {
  const base =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL ?? "https://failupinc.com";
  return `${base}/products/${encodeURIComponent(handle)}`;
}
