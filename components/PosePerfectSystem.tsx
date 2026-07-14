"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

const ROADMAP = [
  {
    status: "live" as const,
    title: "PosePerfect Mat™",
    body: "The floor SOP — color footprints for adults and brand stations.",
  },
  {
    status: "live" as const,
    title: "Junior Edition",
    body: "Kids / second-station throughput for picture day and family volume.",
  },
  {
    status: "live" as const,
    title: "Advanced Posing Guide",
    body: "Coach clients (and yourself) beyond feet — into expression and shape.",
  },
  {
    status: "live" as const,
    title: "Volume Photography Kit",
    body: "Multi-mat packs + automatic Shopify volume tiers for busy seasons.",
  },
  {
    status: "next" as const,
    title: "Video Edition",
    body: "Training + demo packs so your whole team runs the same station.",
  },
  {
    status: "next" as const,
    title: "Studio Workflow Kit",
    body: "Matched mats, guides, and station checklists for multi-bay studios.",
  },
  {
    status: "future" as const,
    title: "AI Posing Assistant",
    body: "Real-time cues layered on the physical system — not instead of it.",
  },
  {
    status: "future" as const,
    title: "Studio Operating System",
    body: "The long game: physical + digital workflow that scales with your brand.",
  },
];

export function PosePerfectSystem() {
  return (
    <section id="system" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            PosePerfect System™
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Not a gadget. A professional platform in motion.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Start with the mat. Stack Junior, the guide, and volume kits as your
            calendar fills. You&apos;re joining an evolving ecosystem built for
            photographers who treat posing as operations — not improvisation.
          </p>
        </Reveal>

        <div className="mt-12 space-y-0">
          {ROADMAP.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.03}>
              <div className="relative grid gap-4 border-l border-line py-5 pl-6 md:grid-cols-[140px_1fr] md:items-start">
                <span
                  className={`absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full ${
                    item.status === "live"
                      ? "bg-yellow"
                      : item.status === "next"
                        ? "bg-ink"
                        : "bg-line"
                  }`}
                />
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {item.status === "live"
                    ? "Available now"
                    : item.status === "next"
                      ? "On the roadmap"
                      : "Future vision"}
                </p>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="/#offers"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink-soft"
            >
              Enter the system — shop mats
            </a>
            <Link
              href="/beginner-photographers"
              className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              New to posing systems? Start here →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
