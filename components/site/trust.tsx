"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionHead } from "@/components/site/services";

/**
 * VERIFY: the labels below describe practice standards, not delivered totals.
 * The previous version of this section claimed acreage, project count and
 * retention rate that could not be verified. If real numbers are added later,
 * update the labels to match (e.g. "Projects delivered since 2014").
 */
const STATS = [
  { value: 2, prefix: "±", suffix: "mm", label: "Setting-out tolerance, typical", decimals: 0 },
  { value: 6, suffix: "", label: "Disciplines under one practice", decimals: 0 },
  { value: 24, suffix: "h", label: "Feasibility note on enquiry", decimals: 0 },
  { value: 100, suffix: "%", label: "Work signed by a Licensed Surveyor", decimals: 0 },
];

export function Trust() {
  return (
    <section id="trust" className="relative px-6 py-32 md:px-16 md:py-40">
      <SectionHead title="What we hold ourselves to.">
        Standards, not totals. The numbers below describe how the practice operates day to day,
        not a track record we ask you to take on trust.
      </SectionHead>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-[color:var(--color-line)] glass sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCell key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatCell({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals,
  index,
}: (typeof STATS)[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2,
      delay: 0.2 + index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, count, value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="relative bg-[color:var(--color-bg)] p-10 md:p-12"
    >
      {/* tick marks — surveyor's ruler edges */}
      <div className="pointer-events-none absolute inset-x-10 top-0 flex justify-between md:inset-x-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`h-1 w-px ${i % 3 === 0 ? "bg-[color:var(--color-accent)]" : "bg-[color:var(--color-line-strong)]"}`} />
        ))}
      </div>

      <span aria-hidden className="mb-6 mt-4 block h-px w-6 bg-[color:var(--color-line-strong)]" />
      <div className="flex items-baseline gap-1 font-light leading-none tracking-[-0.03em] text-[clamp(40px,6vw,68px)] text-[color:var(--color-ink)]">
        <span>{prefix}</span>
        <motion.span>{rounded}</motion.span>
        <span className="mono text-[14px] tracking-[0.1em] text-[color:var(--color-ink-dim)]">{suffix}</span>
      </div>
      <p className="mt-4 text-[13px] text-[color:var(--color-ink-dim)]">{label}</p>
    </motion.div>
  );
}
