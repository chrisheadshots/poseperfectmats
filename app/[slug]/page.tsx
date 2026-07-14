import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Ambassadors } from "@/components/Ambassadors";
import { CheckoutButton } from "@/components/CheckoutButton";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { LooxReviews } from "@/components/LooxReviews";
import { OfferCatalog } from "@/components/OfferCatalog";
import {
  FinalCTA,
  HowItWorks,
  ProblemSection,
} from "@/components/Sections";
import { StickyCta } from "@/components/StickyCta";
import {
  PERSONA_DEFAULTS,
  type CatalogItemId,
} from "@/lib/catalog/catalog";
import { MASTER_FAQS, PERSONAS } from "@/lib/copy/personas";
import { reviewsForPersona } from "@/lib/reviews/reviews";

const SLUG_TO_KEY = {
  "corporate-headshots": "corporate",
  "school-volume": "school",
  "event-photo-booths": "events",
  "family-sessions": "family",
  "beginner-photographers": "beginner",
} as const;

type Slug = keyof typeof SLUG_TO_KEY;

function isSlug(value: string): value is Slug {
  return value in SLUG_TO_KEY;
}

function getDefaultItemId(slug: Slug): CatalogItemId {
  return PERSONA_DEFAULTS[SLUG_TO_KEY[slug]].itemId;
}

export function generateStaticParams() {
  return (Object.keys(SLUG_TO_KEY) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const persona = PERSONAS[SLUG_TO_KEY[slug]];
  return {
    title: persona.headline,
    description: persona.subheadline,
  };
}

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const persona = PERSONAS[SLUG_TO_KEY[slug]];
  const defaultItem = getDefaultItemId(slug);
  const faqs = [...persona.faqs, ...MASTER_FAQS.slice(0, 3)];
  const reviewTag =
    persona.key === "corporate"
      ? "corporate"
      : persona.key === "school"
        ? "school"
        : persona.key === "events"
          ? "events"
          : persona.key === "family"
            ? "family"
            : "beginner";

  return (
    <>
      <Hero
        eyebrow={persona.eyebrow}
        headline={persona.headline}
        subheadline={persona.subheadline}
        ctaLabel={persona.primaryCta}
        image={persona.heroImage}
        imageAlt={persona.heroAlt}
        itemId={defaultItem}
      />
      <ProblemSection title={persona.problemTitle} body={persona.problemBody} />
      <HowItWorks />
      <OfferCatalog persona={persona.key} />
      <LooxReviews
        reviews={reviewsForPersona(reviewTag, 3)}
        title={`Proof for ${persona.navLabel.toLowerCase()}`}
      />
      <Ambassadors />
      <FAQ items={faqs} title={`${persona.navLabel} FAQ`} />
      <FinalCTA
        title={persona.primaryCta}
        cta={
          <CheckoutButton label={persona.primaryCta} itemId={defaultItem} />
        }
      />
      <StickyCta label={persona.primaryCta} itemId={defaultItem} />
    </>
  );
}
