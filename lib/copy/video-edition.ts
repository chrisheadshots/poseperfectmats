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
