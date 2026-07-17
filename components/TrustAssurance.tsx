import { LOOX_STATS, ORDER_STATS } from "@/lib/reviews/reviews";

type Props = {
  className?: string;
  /** Show the shipping expectation line (use at checkout handoff points). */
  showShippingNote?: boolean;
  /**
   * Show the "Buy 2+ mats and save 10%" volume-discount sentence. Only true
   * for products actually covered by Shopify's automatic volume discount —
   * set to false for products excluded from that discount's scope (e.g.
   * Video Edition, which is absent from VOLUME_ELIGIBLE_IDS in
   * lib/catalog/catalog.ts and verified via a live cart test to get no
   * discount at checkout).
   */
  showVolumeDiscount?: boolean;
};

/** Compact trust strip for checkout handoff points — real store numbers only. */
export function TrustAssurance({
  className = "",
  showShippingNote = true,
  showVolumeDiscount = true,
}: Props) {
  return (
    <div className={`text-xs text-muted ${className}`}>
      <p className="font-medium text-ink/80">
        {ORDER_STATS.label} · {LOOX_STATS.count} verified Loox reviews ·{" "}
        {LOOX_STATS.average}★ · 30-day guarantee path
      </p>
      {showShippingNote ? (
        <p className="mt-1">
          Free US shipping (economy) — typically 5–7 business days after
          processing. International calculated at checkout.
          {showVolumeDiscount
            ? " Buy 2+ mats and save 10% (branded often more) — applied automatically at checkout, no code needed."
            : null}
        </p>
      ) : null}
    </div>
  );
}
