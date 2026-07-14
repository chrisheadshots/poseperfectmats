"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatMoney } from "@/lib/catalog/catalog";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Reveal } from "@/components/motion/Reveal";

const MAT_COST = 54.99;

export function ROICalculator() {
  const [subjects, setSubjects] = useState(40);
  const [minutesWasted, setMinutesWasted] = useState(5);
  const [hourly, setHourly] = useState(150);
  const [jobsPerMonth, setJobsPerMonth] = useState(8);

  const result = useMemo(() => {
    const hoursPerJob = (subjects * minutesWasted) / 60;
    const moneyPerJob = hoursPerJob * hourly;
    const recoveredMinutes = subjects * minutesWasted;
    // ~45 minutes ≈ one micro booking / mini block unlocked per job
    const additionalBookingsPossible = Math.max(
      0,
      Math.floor(recoveredMinutes / 45),
    );
    const monthlyHours = hoursPerJob * jobsPerMonth;
    const monthlyMoney = moneyPerJob * jobsPerMonth;
    const annualRevenue = monthlyMoney * 12;
    const paybackJobs = moneyPerJob > 0 ? MAT_COST / moneyPerJob : Infinity;
    return {
      hoursPerJob,
      moneyPerJob,
      additionalBookingsPossible,
      monthlyHours,
      monthlyMoney,
      annualRevenue,
      paybackJobs,
    };
  }, [subjects, minutesWasted, hourly, jobsPerMonth]);

  return (
    <section id="roi" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Savings calculator
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
              Translate “step left” into hours, cash, and bookings.
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Model your next volume day. Official product claim: cut session
              time from ~10 minutes to ~2 per person. Your numbers. Your rate.
              Your upside.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li>• Hours saved per job</li>
              <li>• Money recovered at your hourly value</li>
              <li>• Additional booking blocks unlocked</li>
              <li>• Estimated annual revenue regained</li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_20px_60px_rgba(12,12,12,0.06)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="People photographed / job"
                  value={subjects}
                  min={1}
                  onChange={setSubjects}
                />
                <Field
                  label="Avg minutes wasted / person"
                  value={minutesWasted}
                  min={1}
                  max={15}
                  onChange={setMinutesWasted}
                />
                <Field
                  label="Your hourly rate ($)"
                  value={hourly}
                  min={25}
                  onChange={setHourly}
                />
                <Field
                  label="Jobs like this / month"
                  value={jobsPerMonth}
                  min={1}
                  max={40}
                  onChange={setJobsPerMonth}
                />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Stat
                  label="Hours saved / job"
                  value={`${result.hoursPerJob.toFixed(1)} hrs`}
                />
                <Stat
                  label="Money saved / job"
                  value={formatMoney(Math.round(result.moneyPerJob * 100))}
                />
                <Stat
                  label="Extra booking blocks unlocked"
                  value={`${result.additionalBookingsPossible}+`}
                />
                <Stat
                  label="Est. annual value regained"
                  value={formatMoney(Math.round(result.annualRevenue * 100))}
                  highlight
                />
              </div>

              <p className="mt-4 text-sm text-muted">
                Payback on the $54.99 Unbranded mat:{" "}
                <span className="font-semibold text-ink">
                  {Number.isFinite(result.paybackJobs)
                    ? `${Math.max(0.1, result.paybackJobs).toFixed(1)} jobs`
                    : "—"}
                </span>{" "}
                at these inputs · ~{result.monthlyHours.toFixed(1)} hrs / month
                recovered
              </p>

              <div className="mt-6">
                <AddToCartButton label="Add the $54.99 Unbranded mat" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="text-sm">
      <span className="font-medium">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2.5 outline-none ring-yellow focus:ring-2"
      />
    </label>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-4 py-5 ${
        highlight ? "bg-yellow text-ink" : "bg-ink text-white"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-[0.14em] ${
          highlight ? "text-ink/60" : "text-white/50"
        }`}
      >
        {label}
      </p>
      <motion.p
        key={value}
        initial={{ opacity: 0.35, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-2 font-[family-name:var(--font-display)] text-3xl ${
          highlight ? "text-ink" : "text-yellow"
        }`}
      >
        {value}
      </motion.p>
    </div>
  );
}
