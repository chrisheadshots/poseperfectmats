/**
 * Canonical trust / risk-reversal copy for CTAs, cart, and FAQ.
 * Prefer plain “30-day money-back guarantee” over “guarantee path.”
 */
export const GUARANTEE = {
  short: "30-day money-back guarantee",
  line: "30-day money-back guarantee - if positioning is not faster, email support@failupinc.com.",
  faq: "30-day money-back guarantee. If PosePerfect Mat™ does not make positioning faster, email support@failupinc.com with your order within 30 days of delivery for a refund under the product-page guarantee. Damaged prints are typically replaced free.",
  ctaBody:
    "Add PosePerfect Mat™, stack Junior and the guide as you grow. 30-day money-back guarantee - if positioning is not faster, email support@failupinc.com.",
} as const;

/**
 * Matched to live Storefront delivery rates on 2026-10-26 (Fail Up Inc.).
 * US Standard Delivery was $13.09 for one physical mat in NY, FL, CA, MT, AK,
 * HI, and PR, $18.48 for two mats (including the Family & Volume Pack), and
 * the rate description was "5-10 business days". The digital posing guide
 * had no shipping line. International rates varied by country.
 */
export const SHIPPING = {
  short: "Shipping calculated at checkout",
  window: "US delivery typically 5-10 business days",
  line: "Shipping is calculated at checkout. US Standard Delivery typically takes 5-10 business days. One mat is $13.09 in the US. International rates are calculated at checkout.",
  faq: "Shipping is calculated at Shopify checkout. US Standard Delivery typically takes 5-10 business days. One mat is $13.09 in the US. The Family & Volume Pack (two mats) is $18.48. The Advanced Posing Guide is a digital file and has no shipping charge. International rates and delivery times are calculated at checkout, and customs can add time, so order ahead of a booked shoot.",
} as const;
