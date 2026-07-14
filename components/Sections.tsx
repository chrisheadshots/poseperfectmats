import type { ReactNode } from "react";

export function ProblemSection({
  title = "Every “step left” costs you time.",
  body = "Clients guess where to stand. Groups drift out of composition. Lines slow down. You repeat the same five instructions all day. PosePerfect turns the floor into a visual instruction system so the repositioning loop ends.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-y border-line bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            {title}
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-muted">{body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Clients guess where to stand",
                "Groups drift out of composition",
                "Lines slow down",
                "You repeat directions all day",
              ].map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-yellow pl-3 text-sm font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Place the mat",
      body: "Drop it on hardwood, carpet, concrete, or tile. Anti-slip backing stays put.",
    },
    {
      n: "02",
      title: "Match feet to colors",
      body: "Subjects stand on the footprints — stance and turn without a lecture.",
    },
    {
      n: "03",
      title: "Shoot, crop, next",
      body: "Capture, keep the mat out of the final crop, move the line forward.",
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          How it works
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Three steps. Less talking.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t-2 border-yellow pt-5">
              <p className="font-[family-name:var(--font-display)] text-3xl text-yellow-deep">
                {s.n}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({
  title = "Try it on your next shoot.",
  body = "If PosePerfect doesn’t make positioning faster and easier, contact Fail Up Inc. support within 30 days of delivery about a return under the product-page guarantee.",
  cta,
}: {
  title?: string;
  body?: string;
  cta: ReactNode;
}) {
  return (
    <section className="bg-ink py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
        <div className="max-w-xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-white/65">{body}</p>
        </div>
        {cta}
      </div>
    </section>
  );
}
