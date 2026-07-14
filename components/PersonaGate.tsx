"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PERSONA_LIST } from "@/lib/copy/personas";

const LABELS: Record<string, { title: string; blurb: string }> = {
  "/corporate-headshots": {
    title: "Corporate Headshots",
    blurb: "LinkedIn days, executive libraries, brand-consistent turns.",
  },
  "/school-volume": {
    title: "Schools",
    blurb: "Picture day, sports, and volume lines that refuse to stall.",
  },
  "/event-photo-booths": {
    title: "Photo Booth / Events",
    blurb: "Guests self-position. Operators keep the funnel moving.",
  },
  "/family-sessions": {
    title: "Family Photographer",
    blurb: "Minis, reunions, and sessions where kids need a clear game.",
  },
  "/beginner-photographers": {
    title: "Beginner Photographer",
    blurb: "A physical SOP while you level up lighting and direction.",
  },
};

export function PersonaGate() {
  return (
    <section id="who" className="scroll-mt-20 border-b border-line bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Who are you?
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Pick your workflow. We’ll speak your language.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Same PosePerfect System™ — customized proof, offers, and copy for
            the jobs on your calendar.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONA_LIST.map((p, i) => {
            const meta = LABELS[p.path] ?? {
              title: p.navLabel,
              blurb: p.subheadline,
            };
            return (
              <Reveal key={p.path} delay={i * 0.04}>
                <Link
                  href={p.path}
                  className="group flex h-full flex-col border border-line bg-paper px-5 py-5 transition hover:border-yellow hover:bg-yellow/15"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    Custom experience
                  </p>
                  <h3 className="mt-2 text-xl font-semibold group-hover:underline">
                    {meta.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{meta.blurb}</p>
                  <p className="mt-4 text-sm font-semibold text-yellow-deep">
                    Open my page →
                  </p>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={0.2}>
            <Link
              href="#offers"
              className="group flex h-full flex-col border border-ink bg-ink px-5 py-5 text-white transition hover:bg-ink-soft"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-yellow">
                Studio / multi-role
              </p>
              <h3 className="mt-2 text-xl font-semibold">Studio & volume ops</h3>
              <p className="mt-2 flex-1 text-sm text-white/65">
                You wear every hat — jump into the full offer stack and system
                roadmap.
              </p>
              <p className="mt-4 text-sm font-semibold text-yellow">
                Shop the system →
              </p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
