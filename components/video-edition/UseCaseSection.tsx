"use client";

import { Reveal } from "@/components/motion/Reveal";
import { VIDEO_EDITION_USE_CASES } from "@/lib/copy/video-edition";

export function UseCaseSection() {
  return (
    <section className="bg-paper-deep py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Who it’s for
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Built for repeatable video setups.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {VIDEO_EDITION_USE_CASES.map((useCase, i) => (
            <Reveal key={useCase.title} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-line bg-white p-5">
                <h3 className="text-lg font-semibold">{useCase.title}</h3>
                <p className="mt-2 text-sm text-muted">{useCase.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
