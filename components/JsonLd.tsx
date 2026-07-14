import { MASTER_FAQS, SITE } from "@/lib/copy/personas";
import { LOOX_STATS } from "@/lib/reviews/reviews";
import { CATALOG } from "@/lib/catalog/catalog";

export function JsonLd() {
  const product = CATALOG["standard-unbranded"];
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: SITE.heroSubheadline,
      image: [product.image],
      brand: { "@type": "Brand", name: "PosePerfect Mat" },
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
      },
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
