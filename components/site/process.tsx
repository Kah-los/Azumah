"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHead } from "@/components/site/services";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  { n: "01", title: "Brief & feasibility", body: "We translate intent into datum, accuracy class and capture method.", deliverable: "Survey specification PDF" },
  { n: "02", title: "Field capture", body: "Calibrated instruments, redundant control, weather-windowed flights.", deliverable: "Raw data + calibration certs" },
  { n: "03", title: "Registration", body: "Cloud-to-cloud and target-based alignment with closure reports.", deliverable: "Registered cloud + RMSE report" },
  { n: "04", title: "Modelling", body: "Geometry extraction, semantic tagging, tolerance-aware reconstruction.", deliverable: "Revit + IFC at agreed LOD" },
  { n: "05", title: "Delivery", body: "Versioned, interoperable, web-streamable, yours to build against.", deliverable: "Signed-off issue package" },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section id="process" className="relative px-6 py-32 md:px-16 md:py-40">
      <SectionHead num="A five-step pipeline" title="How we work">
        A linear pipeline that compresses years of field experience into a deliverable you can
        trust before you build against it.
      </SectionHead>

      <div ref={ref} className="relative grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
        {/* Timeline line — fills as section enters view */}
        <div className="absolute left-[5%] right-[5%] top-[80px] hidden h-px bg-[color:var(--color-line)] md:block">
          <motion.div
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-[color:var(--color-accent)] to-transparent"
          />
        </div>

        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} className="relative md:pt-20">
            {/* node */}
            <div className="absolute left-0 top-[73px] hidden h-3.5 w-3.5 rounded-full border border-[color:var(--color-accent)] bg-[color:var(--color-bg)] shadow-[0_0_12px_var(--color-glow)] md:block" />
            <span className="mono mb-3 block text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              {s.n}
            </span>
            <h4 className="mb-2 text-[18px] tracking-[-0.01em]">{s.title}</h4>
            <p className="mb-5 text-[13px] leading-[1.65] text-[color:var(--color-ink-dim)]">{s.body}</p>
            <div className="mono inline-flex items-center gap-2 border-t border-[color:var(--color-line)] pt-3 text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-ink-mute)]">
              <span className="h-1 w-1 rounded-full bg-[color:var(--color-accent)]" />
              {s.deliverable}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
