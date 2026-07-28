"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { AMBASSADORS } from "@/lib/copy/ambassadors";
import { SITE } from "@/lib/copy/personas";

export function Ambassadors() {
  return (
    <section id="trusted" className="scroll-mt-20 bg-ink py-14 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-yellow">
                Pros
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
                Trusted on set
              </h2>
            </div>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/70 transition hover:text-yellow"
            >
              {SITE.instagramHandle} →
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {AMBASSADORS.map((a, i) => (
            <Reveal key={a.handle} delay={i * 0.05}>
              <article className="flex gap-3 border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow/40 sm:flex-col sm:items-start">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-yellow/40 bg-ink-soft sm:h-20 sm:w-20">
                  <Image
                    src={a.image}
                    alt={`${a.name}, professional photographer`}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-yellow">{a.handle}</p>
                  <h3 className="mt-0.5 text-lg font-semibold leading-tight">
                    {a.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/50">{a.role}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-snug text-white/75">
                    “{a.highlight}”
                  </p>
                  <div className="mt-3 flex gap-3 text-xs">
                    <a
                      href={a.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-yellow hover:underline"
                    >
                      Instagram
                    </a>
                    <a
                      href={a.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/60 hover:text-yellow hover:underline"
                    >
                      Website
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
