import { storefrontFetch } from "./client";

const PRODUCT_BY_HANDLE = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      availableForSale
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export type StorefrontVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
};

export type StorefrontProduct = {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  featuredImage?: { url: string; altText?: string | null } | null;
  variants: { nodes: StorefrontVariant[] };
};

export async function getProductByHandle(
  handle: string,
): Promise<StorefrontProduct | null> {
  const data = await storefrontFetch<{ product: StorefrontProduct | null }>(
    PRODUCT_BY_HANDLE,
    { handle },
  );
  return data.product;
}

export async function getPrimaryVariantId(
  handle: string,
): Promise<string | null> {
  const product = await getProductByHandle(handle);
  const variant = product?.variants.nodes.find((v) => v.availableForSale);
  return variant?.id ?? product?.variants.nodes[0]?.id ?? null;
}
