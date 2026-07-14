import Image from "next/image";
import { AMBASSADORS } from "@/lib/copy/ambassadors";
import { SITE } from "@/lib/copy/personas";

export function Ambassadors() {
  return (
    <section id="trusted" className="scroll-mt-20 bg-ink py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-yellow">
          Social proof
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Trusted by Top Photographers
        </h2>
        <p className="mt-3 max-w-2xl text-white/65">
          Trusted by working photographers using PosePerfect Mat in real
          sessions — @jaquieohh, @shootwithray, and @joeywrightphoto.
        </p>
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:border-yellow hover:text-yellow"
        >
          Follow us on Instagram {SITE.instagramHandle}
        </a>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {AMBASSADORS.map((a) => (
            <article
              key={a.handle}
              className="flex flex-col border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-yellow/30 bg-ink-soft">
                <Image
                  src={a.image}
                  alt={`${a.name} — ${a.role}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <p className="text-sm text-yellow">{a.handle}</p>
              <h3 className="mt-1 text-xl font-semibold">{a.name}</h3>
              <p className="mt-1 text-sm text-white/55">{a.role}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/40">
                {a.location}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                “{a.highlight}”
              </p>
              <div className="mt-5 flex gap-4 text-sm">
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
                  className="text-white/60 hover:text-yellow"
                >
                  Website
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
