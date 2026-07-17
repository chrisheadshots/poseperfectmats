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
