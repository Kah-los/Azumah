"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { FacadePoster } from "./facade-poster";

// three.js loads only when this section is reached, and never enters
// First Load JS (ssr:false + dynamic import). The poster is the loading state.
const PointCloud = dynamic(() => import("./point-cloud"), {
  ssr: false,
  loading: () => <FacadePoster className="absolute inset-0 h-full w-full opacity-60" />,
});

const SPECS = [
  { k: "Formats", v: "E57 · LAS · RCP" },
  { k: "Density", v: "6 mm" },
  { k: "Accuracy", v: "± 2 mm" },
  { k: "Classes", v: "12" },
];

export function Receive() {
  return (
    <section id="receive" className="relative px-6 py-28 md:px-16 md:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <Reveal>
          <span aria-hidden className="mb-8 block h-px w-12 bg-[color:var(--color-accent)]" />
          <h2 className="mb-5 font-light leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,64px)]">
            What you receive
          </h2>
          <p className="mb-8 max-w-[52ch] text-[16px] leading-[1.7] text-[color:var(--color-ink-dim)]">
            Every engagement ends in the same place: a registered, classified point cloud you
            can measure against. The viewport alongside is a facade capture, decimated for the
            browser from roughly 1.4 billion returns to sixty thousand.
          </p>

          <dl className="mb-9 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[color:var(--color-line)] sm:grid-cols-4">
            {SPECS.map((s) => (
              <div key={s.k} className="bg-[color:var(--color-bg)] p-5">
                <dt className="mono mb-2 text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                  {s.k}
                </dt>
                <dd className="text-[15px] text-[color:var(--color-ink)]">{s.v}</dd>
              </div>
            ))}
          </dl>

          <Button href="#contact" variant="ghost">
            Discuss a deliverable
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <figure
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[color:var(--color-line-strong)] glass"
            aria-label="Interactive point-cloud scan of a building facade, captured by terrestrial laser scanner and rendered as intensity-graded survey returns. Drag to orbit."
          >
            {/* faint registration crosshair to reinforce the viewport read */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
              <div className="absolute left-1/2 top-4 h-3 w-px -translate-x-1/2 bg-[color:var(--color-line-strong)]" />
              <div className="absolute bottom-4 left-1/2 h-3 w-px -translate-x-1/2 bg-[color:var(--color-line-strong)]" />
              <div className="absolute left-4 top-1/2 h-px w-3 -translate-y-1/2 bg-[color:var(--color-line-strong)]" />
              <div className="absolute right-4 top-1/2 h-px w-3 -translate-y-1/2 bg-[color:var(--color-line-strong)]" />
            </div>
            <PointCloud />
            <figcaption className="mono absolute right-4 top-4 z-10 text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-ink-dim)]">
              61,440 pts · WGS84
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
