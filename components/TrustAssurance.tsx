import { LOOX_STATS, ORDER_STATS } from "@/lib/reviews/reviews";

type Props = {
  className?: string;
  /** Show the shipping expectation line (use at checkout handoff points). */
  showShippingNote?: boolean;
};

/** Compact trust strip for checkout handoff points — real store numbers only. */
export function TrustAssurance({
  className = "",
  showShippingNote = true,
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
          processing. International calculated at checkout. Volume discounts
          (2–5 mats, 15–30%) apply automatically at Shopify checkout — no code
          needed.
        </p>
      ) : null}
    </div>
  );
}
