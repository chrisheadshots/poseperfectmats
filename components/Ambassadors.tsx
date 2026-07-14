"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { AMBASSADORS } from "@/lib/copy/ambassadors";
import { SITE } from "@/lib/copy/personas";

export function Ambassadors() {
  return (
    <section id="trusted" className="scroll-mt-20 bg-ink py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-yellow">
            Authority
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Trusted by Professional Photographers
          </h2>
          <p className="mt-3 max-w-2xl text-white/65">
            Not “influencers.” Working image-makers with real studios, clients,
            and standards — the people you want setting the bar on set.
          </p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:border-yellow hover:text-yellow"
          >
            Follow the brand {SITE.instagramHandle}
          </a>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {AMBASSADORS.map((a, i) => (
            <Reveal key={a.handle} delay={i * 0.06}>
              <article className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-5 transition hover:border-yellow/40">
                <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-yellow/30 bg-ink-soft">
                  <Image
                    src={a.image}
                    alt={`${a.name} — professional photographer`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width:1024px) 100vw, 33vw"
                  />
                </div>
                <p className="text-sm text-yellow">{a.handle}</p>
                <h3 className="mt-1 text-2xl font-semibold">{a.name}</h3>
                <p className="mt-1 text-sm text-white/55">{a.role}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/40">
                  {a.location}
                </p>
                {a.years ? (
                  <p className="mt-3 text-xs font-medium text-white/70">
                    {a.years}
                  </p>
                ) : null}
                {a.specialty ? (
                  <p className="mt-1 text-xs text-white/55">
                    Specialty: {a.specialty}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {a.bio}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/85">
                  “{a.highlight}”
                </p>
                {a.accomplishments?.length ? (
                  <ul className="mt-4 space-y-1.5 text-xs text-white/50">
                    {a.accomplishments.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
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
                    className="text-white/70 hover:text-yellow hover:underline"
                  >
                    Website
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
