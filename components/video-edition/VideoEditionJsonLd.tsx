import { CATALOG } from "@/lib/catalog/catalog";
import { SITE } from "@/lib/copy/personas";

/**
 * Pure schema builder, no React dependency — kept separate from the component
 * below so it can be sanity-checked with a plain node script (see Task 5, Step 2).
 * Deliberately has NO aggregateRating: this product has zero Loox reviews.
 */
export function buildVideoEditionProductSchema() {
  const product = CATALOG["video-edition"];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [product.image],
    sku: product.handle,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: {
      "@type": "Organization",
      name: "Fail Up Inc.",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/video-edition`,
      priceCurrency: "USD",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Fail Up Inc." },
    },
  };
}

export function VideoEditionJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildVideoEditionProductSchema()),
      }}
    />
  );
}
