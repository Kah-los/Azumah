"use client";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { MediaPlate } from "@/components/ui/media-plate";
import { LOCAL } from "@/lib/images";

const OFFICES = [
  { city: "Ho · Volta Region", addr: "Ho, Volta Region, Ghana", phone: "+233 54 386 0396" },
];

/**
 * VERIFY: each row is a commitment to the client. Confirm these timings are
 * deliverable in practice before launch; if not, soften further.
 */
const EXPECT = [
  { n: "01", t: "1 working day", b: "Reply from Leslie Azumah personally, with feasibility, datum and method." },
  { n: "02", t: "Within a week", b: "Fixed-fee proposal with deliverable matrix, programme and any site assumptions." },
  { n: "03", t: "On mobilisation", b: "Calibration record and method statement issued before site access." },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:px-16 md:pb-40">
      <Reveal>
        <div className="relative overflow-hidden rounded-[24px] glass-strong p-10 md:p-20">
          {/* Real field photo from the practice's archive — graded strong so
              that copy remains the focal point and reads with > 4.5:1 contrast. */}
          <div className="pointer-events-none absolute inset-0 -z-[1] opacity-90">
            <MediaPlate
              image={LOCAL.totalStationHilltop}
              grade="strong"
              corners={false}
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="absolute inset-0"
              imageClassName="[filter:saturate(0.5)_contrast(1.05)_brightness(0.55)]"
            />
          </div>
          <div className="pointer-events-none absolute -left-[10%] -top-[50%] h-[200%] w-[60%] bg-[radial-gradient(circle,rgba(140,200,255,.18),transparent_60%)] blur-[60px]" />

          <span aria-hidden className="mb-8 block h-px w-12 bg-[color:var(--color-accent)]" />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <h2 className="mb-6 max-w-[16ch] font-light leading-[1] tracking-[-0.04em] text-[clamp(40px,6vw,80px)]">
                Speak directly with a qualified surveyor.
              </h2>
              <p className="mb-9 max-w-[56ch] text-[17px] leading-[1.6] text-[color:var(--color-ink-dim)] md:text-[18px]">
                Every enquiry is reviewed by Leslie Azumah before a proposal is issued. Send the
                site, the scope, or the question.
              </p>

              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button
                  href="mailto:leslie.azumah@gmail.com?subject=Project enquiry"
                  variant="primary"
                  size="lg"
                  withArrow
                >
                  leslie.azumah@gmail.com
                </Button>
                <Button href="tel:+233543860396" variant="ghost" size="lg">
                  +233 54 386 0396
                </Button>
              </div>

              {/* VERIFY: capability statement PDF does not yet exist in /public */}
              <a
                href="/maypels-capability-2026.pdf"
                className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-dim)] transition-colors duration-300 hover:text-[color:var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
              >
                <span className="h-px w-6 bg-current" />
                Download capability statement (PDF · available on request)
              </a>
            </div>

            <div className="md:col-span-5">
              <span className="mono mb-6 block text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                What to expect
              </span>
              <ol className="space-y-5">
                {EXPECT.map((e) => (
                  <li key={e.n} className="flex gap-4 border-t border-[color:var(--color-line)] pt-5">
                    <span className="mono mt-0.5 text-[11px] tracking-[0.2em] text-[color:var(--color-accent)]">
                      {e.n}
                    </span>
                    <div>
                      <div className="mb-1 text-[14px] tracking-[-0.01em] text-[color:var(--color-ink)]">{e.t}</div>
                      <p className="text-[13px] leading-[1.6] text-[color:var(--color-ink-dim)]">{e.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[color:var(--color-line)] pt-10 md:mt-20 md:grid-cols-3">
            {OFFICES.map((o) => (
              <div key={o.city} className="flex flex-col gap-1.5">
                <span className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                  {o.city}
                </span>
                <span className="text-[14px] text-[color:var(--color-ink)]">{o.addr}</span>
                <a
                  href={`tel:${o.phone.replace(/\s/g, "")}`}
                  className="mono text-[11px] tracking-[0.15em] text-[color:var(--color-ink-dim)] transition-colors duration-300 hover:text-[color:var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
                >
                  {o.phone}
                </a>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                Principal
              </span>
              <span className="text-[14px] text-[color:var(--color-ink)]">Leslie Azumah</span>
              <span className="mono text-[11px] tracking-[0.15em] text-[color:var(--color-ink-dim)]">
                Member, Ghana Institution of Surveyors
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                Email
              </span>
              <a
                href="mailto:leslie.azumah@gmail.com"
                className="text-[14px] text-[color:var(--color-ink)] transition-colors duration-300 hover:text-[color:var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
              >
                leslie.azumah@gmail.com
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
