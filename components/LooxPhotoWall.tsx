"use client";

import { useState } from "react";
import Image from "next/image";
import { LOOX_PHOTOS, type LooxPhoto } from "@/lib/reviews/loox-media";

export function LooxPhotoWall() {
  const [active, setActive] = useState<LooxPhoto | null>(null);

  return (
    <section id="customer-photos" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Customer photos · Loox verified
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          From real shoots, not stock
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Photo reviews submitted with verified purchases on Fail Up Inc. —
          used here as additional social proof alongside written testimonials.
        </p>

        <div className="mt-10 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {LOOX_PHOTOS.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActive(photo)}
              className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-line bg-white text-left transition hover:border-yellow"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold">{photo.reviewer}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted">
                  {photo.body}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo review by ${active.reviewer}`}
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] w-full bg-ink sm:aspect-video">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="800px"
              />
            </div>
            <div className="p-5">
              <p className="text-yellow" aria-hidden>
                ★★★★★
              </p>
              <p className="mt-2 text-lg font-semibold">{active.reviewer}</p>
              <p className="mt-1 text-sm text-muted">{active.product}</p>
              <p className="mt-3 text-sm leading-relaxed">{active.body}</p>
              <button
                type="button"
                className="mt-5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
