import Link from "next/link";
import { PERSONA_LIST, SITE } from "@/lib/copy/personas";
import { LOOX_STATS } from "@/lib/reviews/reviews";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl">
            PosePerfect Mat
          </p>
          <p className="mt-3 max-w-sm text-sm text-white/65">
            The anti-awkward, time-saving posing system for photographers who
            shoot groups, headshots, and high-volume sessions.
          </p>
          <p className="mt-4 text-sm text-yellow">{SITE.poweredBy}</p>
          <p className="mt-2 text-xs text-white/45">
            {LOOX_STATS.count} verified Loox reviews · {LOOX_STATS.average}★
            average
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">
            Use cases
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {PERSONA_LIST.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="hover:text-yellow">
                  {p.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">
            Support
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href="mailto:support@failupinc.com" className="hover:text-yellow">
                support@failupinc.com
              </a>
            </li>
            <li>
              <a href="tel:3054248626" className="hover:text-yellow">
                305-424-8626
              </a>
            </li>
            <li>
              <a
                href="https://failupinc.com"
                className="hover:text-yellow"
                target="_blank"
                rel="noreferrer"
              >
                failupinc.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} PosePerfect Mat · {SITE.poweredBy}
      </div>
    </footer>
  );
}
