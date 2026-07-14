/** Fail Up Inc. Shopify Meta (Facebook) Pixel — public ID from store customer events. */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1086592242799135";

type FbqArgs = [string, ...unknown[]];

declare global {
  interface Window {
    fbq?: ((...args: FbqArgs) => void) & { callMethod?: (...args: FbqArgs) => void; queue?: FbqArgs[]; loaded?: boolean; version?: string };
    _fbq?: Window["fbq"];
  }
}

export function trackMetaEvent(
  event: string,
  params?: Record<
    string,
    string | number | boolean | string[] | number[] | undefined
  >,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) {
    window.fbq("track", event, params);
    return;
  }
  window.fbq("track", event);
}
