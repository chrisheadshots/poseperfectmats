import { CASE_STUDY, LOOX_STATS, type Review } from "@/lib/reviews/reviews";

type Props = {
  reviews: Review[];
  title?: string;
};

export function LooxReviews({
  reviews,
  title = "What verified buyers say",
}: Props) {
  return (
    <section id="reviews" className="scroll-mt-20 bg-paper-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Loox · {LOOX_STATS.count} verified reviews · {LOOX_STATS.average}★
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {title}
        </h2>
        <blockquote className="mt-8 border-l-4 border-yellow pl-5">
          <p className="font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl">
            “{CASE_STUDY.quote}”
          </p>
          <footer className="mt-3 text-sm text-muted">— {CASE_STUDY.name}</footer>
        </blockquote>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={`${r.name}-${r.date}`}
              className="flex flex-col rounded-2xl bg-white p-5"
            >
              <div className="text-yellow" aria-label="5 stars">
                ★★★★★
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/85">
                “{r.body}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-muted"> · Verified · {r.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
