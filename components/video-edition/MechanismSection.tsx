"use client";

import { Reveal } from "@/components/motion/Reveal";
import {
  VIDEO_EDITION_MECHANISM_STEPS,
  VIDEO_EDITION_SPEC_LINE,
} from "@/lib/copy/video-edition";

export function MechanismSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Behind the scenes
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Three steps. Same mark. Clean key.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VIDEO_EDITION_MECHANISM_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06}>
              <div className="border-t-2 border-yellow pt-5">
                <p className="font-[family-name:var(--font-display)] text-3xl text-yellow-deep">
                  {step.n}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-muted">{VIDEO_EDITION_SPEC_LINE}</p>
        </Reveal>
      </div>
    </section>
  );
}
