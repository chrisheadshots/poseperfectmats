const ROWS = [
  {
    feature: "Shows exact foot placement",
    pose: true,
    tape: false,
    dots: "partial",
    verbal: false,
  },
  {
    feature: "No residue / cleanup",
    pose: true,
    tape: false,
    dots: true,
    verbal: true,
  },
  {
    feature: "Assists / trainees can run it",
    pose: true,
    tape: "partial",
    dots: "partial",
    verbal: false,
  },
  {
    feature: "Professional studio look",
    pose: true,
    tape: false,
    dots: "partial",
    verbal: true,
  },
  {
    feature: "Teach stance, not just a point",
    pose: true,
    tape: false,
    dots: false,
    verbal: "partial",
  },
] as const;

function Cell({ value }: { value: boolean | "partial" }) {
  if (value === true) return <span className="font-semibold text-ink">Yes</span>;
  if (value === "partial")
    return <span className="text-muted">Partial</span>;
  return <span className="text-muted">No</span>;
}

export function Comparison() {
  return (
    <section id="compare" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Comparison
        </p>
        <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Tape marks a spot. PosePerfect teaches the stance.
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-paper-deep text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Feature</th>
                <th className="px-4 py-3 font-medium text-ink">PosePerfect</th>
                <th className="px-4 py-3 font-medium">Tape</th>
                <th className="px-4 py-3 font-medium">Floor dots</th>
                <th className="px-4 py-3 font-medium">Verbal only</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-line/70">
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  <td className="px-4 py-3 bg-yellow/15">
                    <Cell value={row.pose} />
                  </td>
                  <td className="px-4 py-3">
                    <Cell value={row.tape} />
                  </td>
                  <td className="px-4 py-3">
                    <Cell value={row.dots} />
                  </td>
                  <td className="px-4 py-3">
                    <Cell value={row.verbal} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
