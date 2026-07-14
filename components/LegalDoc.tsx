import type { ReactNode } from "react";

export function LegalDoc({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-paper">
      <div className="border-b border-line bg-ink px-4 pb-16 pt-28 text-white sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-yellow">
            Legal
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-white/55">Last updated: {updated}</p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-14 text-[15px] leading-relaxed text-ink sm:px-6 [&_a]:text-ink [&_a]:underline [&_a]:decoration-yellow [&_a]:underline-offset-4 hover:[&_a]:text-ink-soft [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:tracking-tight [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
