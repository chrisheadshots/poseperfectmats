/**
 * Fail Up Inc. Shopify Meta (Facebook) Pixel - public ID from store customer events.
 *
 * Funnel coverage on poseperfectmats.com:
 * - PageView: MetaPixel script init
 * - ViewContent: hero / product entry (trackViewContent)
 * - AddToCart: successful headless cart mutation only
 * - InitiateCheckout / AddPaymentInfo / Purchase: native Shopify checkout
 * - Purchase: fires on Fail Up Inc. Shopify checkout (store pixel), not this
 *   headless domain. Do not emit a second checkout event before redirecting.
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
    __ppmMetaReady?: boolean;
    __ppmMetaQueue?: FbqArgs[];
  }
}

/** Explicit IDs identify a logical action across transport retries. Scope to this pixel. */
export function trackMetaEvent(event: string, params?: MetaEventParams) {
  if (typeof window === "undefined") return;
  const args: FbqArgs = [
    "trackSingle",
    META_PIXEL_ID,
    event,
    params ?? {},
    { eventID: `ppm-${crypto.randomUUID()}` },
  ];
  if (window.__ppmMetaReady && typeof window.fbq === "function") {
    window.fbq(...args);
  } else {
    // Hero effects may run before Next's afterInteractive pixel initializer.
    (window.__ppmMetaQueue ??= []).push(args);
  }
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
