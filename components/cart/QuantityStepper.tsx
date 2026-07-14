type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  id?: string;
  tone?: "light" | "dark";
  "aria-label"?: string;
};

export function QuantityStepper({
  value,
  min = 1,
  max = 20,
  onChange,
  className = "",
  id,
  tone = "light",
  "aria-label": ariaLabel = "Quantity",
}: Props) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const shell =
    tone === "dark"
      ? "border-white/25 bg-white/10 text-white"
      : "border-line bg-white text-ink";

  return (
    <div className={`inline-flex items-center rounded-full border ${shell} ${className}`}>
      <button
        type="button"
        aria-label={`Decrease ${ariaLabel}`}
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
        className="h-10 w-10 text-lg font-medium transition hover:opacity-80 disabled:opacity-30"
      >
        −
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        aria-label={ariaLabel}
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isNaN(next)) return;
          onChange(clamp(next));
        }}
        className={`h-10 w-12 border-x bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
          tone === "dark" ? "border-white/25 text-white" : "border-line text-ink"
        }`}
      />
      <button
        type="button"
        aria-label={`Increase ${ariaLabel}`}
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
        className="h-10 w-10 text-lg font-medium transition hover:opacity-80 disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
