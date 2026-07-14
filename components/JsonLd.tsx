import { MASTER_FAQS, SITE } from "@/lib/copy/personas";
import { LOOX_STATS } from "@/lib/reviews/reviews";
import { CATALOG } from "@/lib/catalog/catalog";

export function JsonLd() {
  const product = CATALOG["standard-unbranded"];
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Fail Up Inc.",
      url: "https://failupinc.com",
      email: "support@failupinc.com",
      telephone: "+1-305-424-8626",
      address: {
        "@type": "PostalAddress",
        streetAddress: "19 NW 7th Ave",
        addressLocality: "Fort Lauderdale",
        addressRegion: "FL",
        postalCode: "33311",
        addressCountry: "US",
      },
      brand: {
        "@type": "Brand",
        name: SITE.name,
      },
      sameAs: [SITE.instagramUrl, SITE.url],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      description: SITE.heroSubheadline,
      publisher: {
        "@type": "Organization",
        name: "Fail Up Inc.",
      },
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: SITE.heroSubheadline,
      image: [product.image],
      sku: product.handle,
      brand: { "@type": "Brand", name: SITE.name },
      manufacturer: {
        "@type": "Organization",
        name: "Fail Up Inc.",
      },
      offers: {
        "@type": "Offer",
        url: SITE.url,
        priceCurrency: "USD",
        price: (product.priceCents / 100).toFixed(2),
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Fail Up Inc." },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: LOOX_STATS.average,
        reviewCount: LOOX_STATS.count,
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use PosePerfect Mat™",
      description:
        "Place the mat, match the color-coded footprints, and shoot with less client repositioning.",
      step: [
        {
          "@type": "HowToStep",
          name: "Place the mat",
          text: "Set PosePerfect Mat™ where the subject should stand for the frame.",
        },
        {
          "@type": "HowToStep",
          name: "Match the footprints",
          text: "Ask the client to stand on the red, yellow, or blue footprint guides.",
        },
        {
          "@type": "HowToStep",
          name: "Shoot and crop",
          text: "Capture the shot and crop so feet stay outside the hero frame when needed.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: MASTER_FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
