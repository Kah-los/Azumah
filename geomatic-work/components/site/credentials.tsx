"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

/**
 * VERIFY BEFORE PUBLICATION: every line below references a real Ghanaian or
 * international body. None of them are valid to display unless the firm has
 * the documentation on file. See VERIFY_BEFORE_LAUNCH.md.
 */
const ACCREDITATIONS = [
  { name: "LISAG", note: "Principals · Licensed Surveyor" },
  { name: "GhIS", note: "Principals · Member" },
  { name: "Survey Act 1962", note: "Practising under Act 127" },
  { name: "ISO 17123", note: "Instrument calibration aligned" },
  { name: "ISO 9001:2015", note: "Quality processes aligned" },
  { name: "GCAA", note: "UAV operator (where applicable)" },
];

const EQUIPMENT = [
  "Leica · RTC360 · TS16 · GS18T",
  "Trimble · R12i · S7 · SX12",
  "DJI · M350 RTK · Matrice 30T",
  "NavVis · VLX3 · MLX",
  "Topcon · GT-1200 · HiPer VR",
  "South · Galaxy G6 · N40",
];

const SECTORS = [
  "Residential developers",
  "Commercial developers",
  "Civil contractors",
  "Educational institutions",
  "Religious institutions",
  "Private landowners",
  "Agricultural estates",
  "District authorities",
];

export function Credentials() {
  return (
    <section id="credentials" className="relative px-6 py-28 md:px-16 md:py-36">
      <Reveal>
        <h2 className="sr-only">Credentials</h2>
        <div className="mb-16 flex flex-col gap-6 border-y border-[color:var(--color-line)] py-10 md:flex-row md:items-center md:justify-between md:gap-10 md:py-12">
          <p className="max-w-[40ch] font-light leading-[1.15] tracking-[-0.025em] text-[26px] md:text-[34px]">
            All work signed off by <em>Licensed Surveyors</em>, practising under the Survey Act 1962.
          </p>
          <div className="mono flex flex-col gap-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-dim)] md:text-right">
            <span>Professional Indemnity</span>
            {/* VERIFY: replace with actual cover before launch */}
            <span className="text-[color:var(--color-ink)]">Cover in place</span>
            <span className="mt-2 text-[color:var(--color-ink-mute)]">Certificate available on request</span>
          </div>
        </div>
      </Reveal>

      {/* Three-column credential grid */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        {/* Accreditations */}
        <Reveal className="md:col-span-5" delay={0.05}>
          <Header num="/A" label="Accreditations" />
          <ul className="mt-8 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
            {ACCREDITATIONS.map((a, i) => (
              <Row key={a.name} index={i}>
                <span className="text-[16px] tracking-[-0.01em] text-[color:var(--color-ink)]">{a.name}</span>
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
                  {a.note}
                </span>
              </Row>
            ))}
          </ul>
        </Reveal>

        {/* Equipment */}
        <Reveal className="md:col-span-4" delay={0.12}>
          <Header num="/B" label="Equipment" />
          <ul className="mt-8 space-y-3">
            {EQUIPMENT.map((e, i) => (
              <motion.li
                key={e}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="mono flex items-center gap-3 text-[12px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)]"
              >
                <span className="h-px w-4 bg-[color:var(--color-accent)] opacity-60" />
                {e}
              </motion.li>
            ))}
          </ul>
          <p className="mono mt-8 max-w-[36ch] text-[10px] uppercase leading-[1.7] tracking-[0.2em] text-[color:var(--color-ink-mute)]">
            All instruments calibrated to ISO 17123 standards. Calibration certificates included
            with every deliverable.
          </p>
        </Reveal>

        {/* Sectors */}
        <Reveal className="md:col-span-3" delay={0.19}>
          <Header num="/C" label="Sectors" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {SECTORS.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-full border border-[color:var(--color-line)] px-3 py-1.5 text-[12px] tracking-[-0.005em] text-[color:var(--color-ink-dim)] transition-colors duration-300 hover:border-[color:var(--color-line-strong)] hover:text-[color:var(--color-ink)]"
              >
                {s}
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Deliverable promise — reinforces compliance-readiness */}
      <Reveal delay={0.2}>
        <div className="mono mt-20 grid grid-cols-2 gap-y-4 border-t border-[color:var(--color-line)] pt-10 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-mute)] md:grid-cols-4">
          <span><span className="text-[color:var(--color-accent)]">·</span> Survey Act 1962 (Act 127)</span>
          <span><span className="text-[color:var(--color-accent)]">·</span> LI 1444 pillar spec</span>
          <span><span className="text-[color:var(--color-accent)]">·</span> Lands Commission practice</span>
          <span><span className="text-[color:var(--color-accent)]">·</span> GCAA UAV regulations</span>
        </div>
      </Reveal>
    </section>
  );
}

function Header({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-[color:var(--color-line-strong)] pb-4">
      <span className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        {num}
      </span>
      <h3 className="text-[18px] font-light tracking-[-0.01em] text-[color:var(--color-ink)]">{label}</h3>
    </div>
  );
}

function Row({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-baseline justify-between gap-4 py-4"
    >
      {children}
    </motion.li>
  );
}
