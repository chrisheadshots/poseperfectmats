"use client";

import { Reveal } from "@/components/motion/Reveal";
import {
  CASE_STUDY,
  LOOX_STATS,
  ORDER_STATS,
  REVIEWS,
} from "@/lib/reviews/reviews";

export function CostOfDoingNothing() {
  return (
    <section id="cost" className="scroll-mt-20 border-y border-line bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            The cost of doing nothing
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Every “step left” is billable time you never invoice.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Direction fatigue",
              body: "You become a human GPS. Clients freeze. Assistants guess. The shutter waits.",
            },
            {
              title: "Inconsistent frames",
              body: "Spacing drifts. Shoulders conflict. Retakes stack. Galleries look uneven.",
            },
            {
              title: "Throughput ceiling",
              body: "The line determines your day — not your lighting, crop, or creative skill.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="h-full border-t-2 border-yellow bg-paper px-5 py-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <blockquote className="mt-10 max-w-3xl border-l-2 border-yellow pl-5 text-xl leading-relaxed text-ink sm:text-2xl">
            “{CASE_STUDY.quote}”
            <footer className="mt-3 text-sm text-muted">
              — {CASE_STUDY.name}
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

export function WorkflowCompare() {
  return (
    <section id="workflow" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Manual positioning vs PosePerfect
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Traditional workflow → PosePerfect workflow
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-[1.5rem] border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Traditional
              </p>
              <ol className="mt-5 space-y-4 text-sm">
                {[
                  "Subject walks into frame confused",
                  "You say step left / move back / closer",
                  "Adjust again for stance and angle",
                  "Shoot. Retake. Reset. Repeat × N",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-[family-name:var(--font-display)] text-lg text-muted">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-muted line-through decoration-ink/20">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[1.5rem] border border-yellow bg-ink p-6 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-yellow">
                PosePerfect System™
              </p>
              <ol className="mt-5 space-y-4 text-sm">
                {[
                  "Place the mat once",
                  "Subject matches colored footprints",
                  "Capture the usable frame",
                  "Next — without reinventing the stance",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-[family-name:var(--font-display)] text-lg text-yellow">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-white/85">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhyItWorks() {
  return (
    <section id="why" className="scroll-mt-20 bg-paper-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Why it works
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Visual cues beat verbal corrections.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Psychology",
              body: "Feet on a mark feel concrete. Clients stop negotiating their body in space.",
            },
            {
              title: "Geometry",
              body: "Color footprints encode turn and stance — including that crisp shoulder offset pros chase.",
            },
            {
              title: "Operations",
              body: "Anyone on your team can run the station. Your SOP lives on the floor.",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <article className="h-full bg-white px-5 py-6">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-muted">
            Built for hardwood, concrete, tile, and low-pile carpet ·
            Anti-slip rubber backing · Wipe-clean · Rated for 1000+ sessions ·{" "}
            {LOOX_STATS.count} verified buyer reviews
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function ContextualProof() {
  const picks = [
    REVIEWS.find((r) => r.name.startsWith("Roger")),
    REVIEWS.find((r) => r.name.startsWith("John")),
    REVIEWS.find((r) => r.name.startsWith("Manuel")),
    REVIEWS.find((r) => r.name.startsWith("Kane")),
  ].filter(Boolean);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Verified Loox voices
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Photographers describing the same pain — then the same fix.
          </h2>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
            <span>
              <span className="font-[family-name:var(--font-display)] text-2xl text-ink">
                {LOOX_STATS.count}
              </span>{" "}
              verified Loox reviews
            </span>
            <span>
              <span className="font-[family-name:var(--font-display)] text-2xl text-ink">
                {LOOX_STATS.average}★
              </span>{" "}
              average rating
            </span>
            <span>
              <span className="font-[family-name:var(--font-display)] text-2xl text-ink">
                {ORDER_STATS.label.split(" ")[0]}
              </span>{" "}
              orders shipped
            </span>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {picks.map((review, i) =>
            review ? (
              <Reveal key={review.name} delay={i * 0.05}>
                <figure className="h-full border border-line bg-white p-5">
                  <p className="text-sm leading-relaxed text-ink">
                    “{review.body}”
                  </p>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">
                    {review.name} · Verified purchase · {review.product}
                  </figcaption>
                </figure>
              </Reveal>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}

export function Objections() {
  const items = [
    {
      q: "Can’t I just use tape?",
      a: "Tape marks a point. PosePerfect teaches stance — turn, spread, and consistency — with no residue and a look that belongs in a pro set.",
    },
    {
      q: "Will the mat show in the photo?",
      a: "For headshots, frame and crop so feet sit below the hero crop. Many leave it just outside the usable frame, or pull it before a wide group final.",
    },
    {
      q: "What if subjects are different heights/sizes?",
      a: "Standard is the workhorse for adults. Junior covers kids / second stations. Family & Volume Pack pairs both for picture-day throughput.",
    },
    {
      q: "Is this only for volume?",
      a: "Volume operators feel ROI first — but branded headshot studios love the “stand on blue” clarity that kills awkward silence.",
    },
    {
      q: "Will the print wear out?",
      a: "Reviewers who store it tightly rolled for long stretches report cracking or fading. Store it flat or loosely rolled print-side out and wipe clean — volume shooters run it through back-to-back picture days.",
    },
    {
      q: "When will it actually arrive?",
      a: "US orders ship free on the economy tier — typically 5–7 business days after 3–5 days of processing. International orders are carrier-calculated and can sit in customs, so order well ahead of a booked shoot.",
    },
  ];

  return (
    <section id="objections" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Common objections
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Straight answers from the set.
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <div className="grid gap-3 py-6 md:grid-cols-[0.9fr_1.4fr]">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UseCaseResults() {
  const cases = [
    {
      title: "Corporate headshots",
      body: "Same mark. Same turn. Brand libraries look like one intentional system.",
    },
    {
      title: "School / picture day",
      body: "“Stand on the blue feet” becomes the entire briefing. Lines keep moving.",
    },
    {
      title: "Event & photo booth",
      body: "Guests self-position. Operators stop herding. Throughput climbs.",
    },
    {
      title: "Studio portraits",
      body: "Subject confidence up, direction down — feet handled so you direct expression.",
    },
    {
      title: "Family & mini sessions",
      body: "Kids + parents get a game (“stand on red!”). Posing conflict drops.",
    },
    {
      title: "Beginner photographers",
      body: "A physical SOP while you learn lighting and crop — fewer “am I doing this right?” moments.",
    },
  ];

  return (
    <section id="results" className="scroll-mt-20 bg-ink py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-yellow">
            Professional results
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Built for the jobs photographers actually book.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <article className="border border-white/10 bg-white/[0.03] p-5 transition hover:border-yellow/50">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-white/65">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
