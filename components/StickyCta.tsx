"use client";

import { useEffect, useState } from "react";
import { CheckoutButton } from "@/components/CheckoutButton";
import type { CatalogItemId } from "@/lib/catalog/catalog";

type Props = {
  label?: string;
  itemId?: CatalogItemId;
};

export function StickyCta({
  label = "Add PosePerfect Mat™ - $44.99",
  itemId = "standard-branded",
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-1.5">
        <CheckoutButton
          label={label}
          itemId={itemId}
          showQty={false}
          className="w-full [&_button]:w-full"
        />
        <p className="text-[10px] text-white/50">
          Free US shipping · 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}
