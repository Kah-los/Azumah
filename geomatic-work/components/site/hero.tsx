"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MaskReveal, Reveal } from "@/components/ui/reveal";
import { MediaPlate } from "@/components/ui/media-plate";
import { IMG } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-28 pt-32 md:px-16 md:pb-32 md:pt-40">
      {/* Photographic underlayer — sits behind the existing blueprint grid and
          all content. Quietly graded so the hero copy stays the focal point. */}
      <div className="absolute inset-0 -z-[2]">
        <MediaPlate
          image={IMG.hero}
          grade="strong"
          corners={false}
          priority
          sizes="100vw"
          className="absolute inset-0"
          imageClassName="[filter:saturate(0.45)_contrast(1.05)_brightness(0.7)]"
        />
      </div>

      {/* Corner technical annotations (desktop only) */}
      <FeatureChip name="DATUM" value="Accra · WGS84" pos="left-10 top-36" delay={2.4} />
      <FeatureChip name="EPSG" value="2136 · 4326" pos="right-10 top-36" delay={2.5} />

      <div className="relative flex flex-1 flex-col justify-center">
        <Reveal delay={2.1}>
          <span className="eyebrow inline-flex items-center gap-3.5">
            <span className="hairline" />
            Land surveying · Engineering services · Ho, Volta Region
          </span>
        </Reveal>

        <h1 className="my-8 max-w-[18ch] font-light leading-[0.96] tracking-[-0.045em] text-[clamp(44px,8.4vw,128px)]">
          <MaskReveal
            delayBase={2.2}
            stagger={0.14}
            lines={[
              <span key="l1">The geometry</span>,
              <span key="l2"><em>of the built world,</em></span>,
              <span key="l3">measured to the millimetre.</span>,
            ]}
          />
        </h1>

        <Reveal delay={2.7} y={20}>
          <p className="mb-11 max-w-[58ch] text-[16px] leading-[1.7] text-[color:var(--color-ink-dim)] md:text-[17px]">
            A land surveying practice based in Ho, Volta Region, serving developers,
            civil contractors, institutions and private landowners across the Volta Region
            and Greater Accra.
          </p>
        </Reveal>

        <Reveal delay={2.85} y={16}>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Button href="#contact" variant="primary" withArrow>
              Request a proposal
            </Button>
            <Button href="#work" variant="ghost">
              Selected work
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Datum baseline — coordinates pinned to the bottom of the hero. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-16 border-t border-[color:var(--color-line-strong)] pt-6 md:mt-24"
      >
        <div className="mono mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_var(--color-glow)]" />
            Live · Field operations
          </span>
          <span className="hidden md:inline">Ho · Volta Region · Ghana · 6.6018° N · 0.4708° E</span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-12">
          <Metric k="Datum" v="Accra / WGS84" />
          <Metric k="Coverage" v="Volta + Greater Accra" />
          <Metric k="Practice" v="Survey Act 1962" />
          {/* VERIFY: replace with actual delivered count before launch */}
          <Metric k="Projects" v="Selected work below" />
        </div>
      </motion.div>
    </section>
  );
}

function FeatureChip({
  name,
  value,
  pos,
  delay,
}: {
  name: string;
  value: string;
  pos: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${pos} hidden items-center gap-2.5 lg:flex`}
    >
      <div className="relative">
        <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
        <div className="absolute -inset-1.5 rounded-full bg-[color:var(--color-accent)] opacity-30 blur-sm" />
      </div>
      <div className="mono text-[10px] uppercase tracking-[0.25em]">
        <div className="text-[color:var(--color-ink)]">{name}</div>
        <div className="text-[color:var(--color-ink-dim)]">{value}</div>
      </div>
    </motion.div>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)] md:text-[10px]">
        {k}
      </span>
      <span className="text-[13px] text-[color:var(--color-ink)] md:text-[14px]">{v}</span>
    </div>
  );
}
