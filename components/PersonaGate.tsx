import Link from "next/link";
import { PERSONA_LIST } from "@/lib/copy/personas";

export function PersonaGate() {
  return (
    <section id="personas" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Built for your workflow
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Same mat. Different jobs.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONA_LIST.map((p) => (
            <Link
              key={p.path}
              href={p.path}
              className="group border border-line bg-white p-5 transition hover:border-yellow hover:bg-yellow/20"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {p.eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:underline">
                {p.headline}
              </h3>
              <p className="mt-4 text-sm font-medium text-yellow-deep">
                {p.primaryCta} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
