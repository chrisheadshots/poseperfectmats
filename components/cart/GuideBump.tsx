"use client";

import Image from "next/image";
import { CATALOG } from "@/lib/catalog/catalog";
import { formatMoney } from "@/lib/catalog/catalog";
import { useCart } from "./CartProvider";

const GUIDE = CATALOG["posing-guide"];
const MAT_HANDLES = new Set(
  Object.values(CATALOG)
    .filter((i) => i.kind === "mat" && i.id !== "video-edition")
    .map((i) => i.handle),
);

/**
 * One-tap attach for the Advanced Posing Guide, shown only when the cart holds a
 * mat but not the guide. Uses the existing addItem path — pure-margin AOV bump at
 * the auto-opened drawer, the site's highest-intent unused impression.
 */
export function GuideBump({ className = "" }: { className?: string }) {
  const { cart, addItem, pending } = useCart();
  const lines = cart?.lines.nodes ?? [];

  const hasMat = lines.some((l) => MAT_HANDLES.has(l.merchandise.product.handle));
  const hasGuide = lines.some(
    (l) => l.merchandise.product.handle === GUIDE.handle,
  );
  if (!hasMat || hasGuide) return null;

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-yellow/60 bg-yellow/10 p-3 ${className}`}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
        <Image
          src={GUIDE.image}
          alt={GUIDE.title}
          fill
          className="object-contain p-1"
          sizes="56px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Add the Advanced Posing Guide</p>
        <p className="text-xs text-muted">
          Direction language + body angles that pair with the mat —{" "}
          {formatMoney(GUIDE.priceCents)}.
        </p>
      </div>
      <button
        type="button"
        disabled={pending}
        onClick={() => void addItem({ itemId: "posing-guide", quantity: 1 })}
        className="shrink-0 rounded-full bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:bg-ink-soft disabled:opacity-60"
      >
        {pending ? "…" : "Add $19.97"}
      </button>
    </div>
  );
}
