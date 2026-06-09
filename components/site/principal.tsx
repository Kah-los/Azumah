"use client";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { MediaPlate } from "@/components/ui/media-plate";
import { LOCAL } from "@/lib/images";

/**
 * Principal section — "Meet your surveyor".
 *
 * The plate on the left is a real field photograph of Leslie conducting a
 * GNSS control survey. If a different photo turns out to be the right one,
 * swap the `image` prop in <MediaPlate> below (catalog lives in lib/images.ts).
 */

const DISCIPLINES = [
  "Land Surveying",
  "Boundary and Cadastral",
  "Topographic Surveys",
  "Engineering Surveys",
];

export function Principal() {
  return (
    <section
      id="principal"
      aria-label="Meet your surveyor"
      className="relative px-6 py-28 md:px-16 md:py-36"
    >
      <Reveal>
        <span aria-hidden className="mb-8 block h-px w-12 bg-[color:var(--color-accent)]" />
        <p className="mono mb-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
          Meet your surveyor
        </p>
        <h2 className="mb-14 max-w-[18ch] font-light leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,64px)]">
          The professional behind every signed deliverable.
        </h2>
      </Reveal>

      <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
        {/* Field photograph */}
        <Reveal className="md:col-span-5">
          <figure>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] border border-[color:var(--color-line-strong)] glass">
              <MediaPlate
                image={LOCAL.leslieGNSS}
                grade="quiet"
                corners
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="absolute inset-0"
              />
            </div>
            <figcaption className="mono mt-4 text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-dim)]">
              Leslie Azumah conducting GNSS control surveying in the Volta Region.
            </figcaption>
          </figure>
        </Reveal>

        {/* Bio + disciplines */}
        <Reveal className="md:col-span-7" delay={0.1}>
          <h3 className="mb-2 font-light leading-[1.05] tracking-[-0.02em] text-[clamp(28px,3.4vw,44px)] text-[color:var(--color-ink)]">
            Leslie Azumah
          </h3>
          <p className="mono mb-8 text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-dim)]">
            Principal Surveyor · Ho, Volta Region
          </p>

          <p className="mb-10 max-w-[58ch] text-[16px] leading-[1.7] text-[color:var(--color-ink-dim)] md:text-[17px]">
            Every enquiry is reviewed by Leslie before a proposal is issued, and every
            deliverable is signed off by him before it leaves the office. That is the practice
            in one sentence.
          </p>

          <dl className="mb-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10">
            <Row k="Membership" v="Ghana Institution of Surveyors" />
            <Row k="Based" v="Ho, Volta Region, Ghana" />
            <Row k="Practice" v="Survey Act 1962 (Act 127)" />
            <Row k="Sign-off" v="Every deliverable, by name" />
          </dl>

          <span className="mono mb-4 block text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
            Disciplines
          </span>
          <ul className="mb-12 flex flex-wrap gap-2">
            {DISCIPLINES.map((d) => (
              <li
                key={d}
                className="rounded-full border border-[color:var(--color-line)] px-3 py-1.5 text-[13px] text-[color:var(--color-ink-dim)] transition-colors duration-300 hover:border-[color:var(--color-line-strong)] hover:text-[color:var(--color-ink)]"
              >
                {d}
              </li>
            ))}
          </ul>

          <Button href="#contact" variant="primary" withArrow>
            Discuss a project with Leslie
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-[color:var(--color-line)] pt-4">
      <dt className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">{k}</dt>
      <dd className="text-[14px] tracking-[-0.005em] text-[color:var(--color-ink)]">{v}</dd>
    </div>
  );
}
