import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { PERSONA_LIST, SITE } from "@/lib/copy/personas";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
            {SITE.name}
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/55 group-hover:text-yellow">
            {SITE.poweredBy}
          </span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-white/75 lg:flex">
          {PERSONA_LIST.map((p) => (
            <Link
              key={p.path}
              href={p.path}
              className="transition hover:text-yellow"
            >
              {p.navLabel}
            </Link>
          ))}
          <CartButton />
          <a
            href="#offers"
            className="rounded-full bg-yellow px-4 py-2 font-semibold text-ink transition hover:bg-yellow-deep"
          >
            Shop mats
          </a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <CartButton />
          <a
            href="#offers"
            className="rounded-full bg-yellow px-4 py-2 text-sm font-semibold text-ink"
          >
            Shop
          </a>
        </div>
      </div>
    </header>
  );
}
