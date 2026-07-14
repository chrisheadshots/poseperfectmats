const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-04";

export function isShopifyConfigured(): boolean {
  return Boolean(domain && token);
}

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!domain || !token) {
    throw new Error("Shopify Storefront API is not configured");
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront HTTP ${res.status}`);
  }

  const json = (await res.json()) as ShopifyResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify Storefront returned empty data");
  }
  return json.data;
}
