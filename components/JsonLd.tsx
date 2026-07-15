import { MASTER_FAQS, SITE } from "@/lib/copy/personas";
import { LOOX_STATS_BY_PRODUCT, REVIEWS } from "@/lib/reviews/reviews";
import { CATALOG } from "@/lib/catalog/catalog";
import { LOOX_VIDEOS } from "@/lib/reviews/loox-media";

export function JsonLd() {
  const product = CATALOG["standard-branded"];
  const productStats = LOOX_STATS_BY_PRODUCT["standard-branded"];
  // Only reviews left on this exact product — schema must not blend products.
  const productReviews = REVIEWS.filter(
    (r) => r.product === "PosePerfect Mat™ by Chris Headshots",
  ).slice(0, 5);
  const demo = LOOX_VIDEOS.find((v) => v.id === "r5seTpBe3") ?? LOOX_VIDEOS[0];

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
        ratingValue: productStats.average,
        reviewCount: productStats.count,
        bestRating: "5",
        worstRating: "1",
      },
      review: productReviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        ...(r.date ? { datePublished: r.date } : {}),
        reviewBody: r.body,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: "5",
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use PosePerfect Mat™",
      description:
        "Place the mat, match the color-coded footprints, and shoot with less client repositioning.",
      totalTime: "PT1M",
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
    ...(demo
      ? [
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "PosePerfect Mat™ customer demo video",
            description:
              "Muted customer demonstration and review footage of PosePerfect Mat™ in real photographer workflows.",
            thumbnailUrl: [demo.poster],
            contentUrl: demo.preview,
            uploadDate: "2026-06-12",
            duration: `PT${Math.round(demo.videoDuration)}S`,
          },
        ]
      : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
