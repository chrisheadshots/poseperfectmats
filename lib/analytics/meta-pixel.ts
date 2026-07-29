/**
 * Fail Up Inc. Shopify Meta (Facebook) Pixel - public ID from store customer events.
 *
 * Funnel coverage on poseperfectmats.com:
 * - PageView: MetaPixel script init
 * - ViewContent: hero / product entry (trackViewContent)
 * - AddToCart / InitiateCheckout: CartProvider + checkout hooks
 * - Purchase: fires on Fail Up Inc. Shopify checkout (store pixel), not this
 *   headless domain - verify in Events Manager after a test order.
 */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1086592242799135";

type FbqArgs = [string, ...unknown[]];

type MetaEventParams = Record<
  string,
  string | number | boolean | string[] | number[] | undefined
>;

declare global {
  interface Window {
    fbq?: ((...args: FbqArgs) => void) & {
      callMethod?: (...args: FbqArgs) => void;
      queue?: FbqArgs[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window["fbq"];
  }
}

export function trackMetaEvent(event: string, params?: MetaEventParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) {
    window.fbq("track", event, params);
    return;
  }
  window.fbq("track", event);
}

/** Standard ViewContent for catalog entry points (hero, product pages). */
export function trackViewContent(params: {
  contentIds: string[];
  contentName: string;
  value: number;
  currency?: string;
}) {
  trackMetaEvent("ViewContent", {
    content_ids: params.contentIds,
    content_type: "product",
    content_name: params.contentName,
    value: params.value,
    currency: params.currency ?? "USD",
  });
}
