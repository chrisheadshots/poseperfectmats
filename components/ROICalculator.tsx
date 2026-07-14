"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatMoney } from "@/lib/catalog/catalog";
import { CheckoutButton } from "@/components/CheckoutButton";

const DEFAULT_RATE = 150;
const MAT_COST = 54.99;

export function ROICalculator() {
  const [subjects, setSubjects] = useState(40);
  const [minutesSaved, setMinutesSaved] = useState(5);
  const [hourly, setHourly] = useState(DEFAULT_RATE);

  const result = useMemo(() => {
    const hours = (subjects * minutesSaved) / 60;
    const money = hours * hourly;
    const paybackJobs = money > 0 ? MAT_COST / money : Infinity;
    return { hours, money, paybackJobs };
  }, [subjects, minutesSaved, hourly]);

  return (
    <section id="roi" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              ROI calculator
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
              How much is repositioning costing you?
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Official claim: cut session time from about 10 minutes to 2 minutes
              per person. Model your next job with the defaults below — then buy
              the mat that pays for itself.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_20px_60px_rgba(12,12,12,0.06)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-3">
              <label className="text-sm">
                <span className="font-medium">Subjects / job</span>
                <input
                  type="number"
                  min={1}
                  value={subjects}
                  onChange={(e) => setSubjects(Number(e.target.value) || 0)}
                  className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2"
                />
              </label>
              <label className="text-sm">
                <span className="font-medium">Minutes saved / subject</span>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={minutesSaved}
                  onChange={(e) => setMinutesSaved(Number(e.target.value) || 0)}
                  className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2"
                />
              </label>
              <label className="text-sm">
                <span className="font-medium">Your hourly value ($)</span>
                <input
                  type="number"
                  min={25}
                  value={hourly}
                  onChange={(e) => setHourly(Number(e.target.value) || 0)}
                  className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2"
                />
              </label>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat
                label="Time saved / job"
                value={`${result.hours.toFixed(1)} hrs`}
              />
              <Stat
                label="Value recovered"
                value={formatMoney(Math.round(result.money * 100))}
              />
              <Stat
                label="Jobs to pay for $54.99"
                value={
                  Number.isFinite(result.paybackJobs)
                    ? `${Math.max(0.1, result.paybackJobs).toFixed(1)}`
                    : "—"
                }
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CheckoutButton label="Get the $54.99 Unbranded mat" />
              <p className="text-sm text-muted">
                Tip from live reviews: one high-volume day often covers the mat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-ink px-4 py-5 text-white">
      <p className="text-xs uppercase tracking-[0.14em] text-white/50">
        {label}
      </p>
      <motion.p
        key={value}
        initial={{ opacity: 0.4, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 font-[family-name:var(--font-display)] text-3xl text-yellow"
      >
        {value}
      </motion.p>
    </div>
  );
}
