"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem } from "@/lib/copy/personas";
import { MASTER_FAQS } from "@/lib/copy/personas";

type Props = {
  items?: FaqItem[];
  title?: string;
};

export function FAQ({
  items = MASTER_FAQS,
  title = "Objections, answered",
}: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">FAQ</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {title}
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{item.question}</span>
                  <span className="text-yellow-deep">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
