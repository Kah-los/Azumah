"use client";

import { motion } from "framer-motion";

/**
 * Sector strip — replaces what was previously a named-client wordmark strip.
 *
 * Named clients without written permission to publish creates a real
 * liability and is the kind of claim that loses procurement trust if a
 * call-back verification fails. Until cleared client lockups are on hand,
 * this strip communicates breadth of work via sector tags instead.
 *
 * To switch back to a named-client strip later, replace the SECTORS array
 * with real wordmarks (SVG) and update the heading copy accordingly.
 */

const SECTORS = [
  "RESIDENTIAL DEVELOPERS",
  "COMMERCIAL DEVELOPERS",
  "CIVIL CONTRACTORS",
  "PRIVATE LANDOWNERS",
  "EDUCATIONAL INSTITUTIONS",
  "DISTRICT AUTHORITIES",
  "AGRICULTURAL ESTATES",
  "RELIGIOUS INSTITUTIONS",
];

export function Clients() {
  return (
    <section
      aria-label="Sectors served"
      className="relative border-y border-[color:var(--color-line)] px-6 py-12 md:px-16 md:py-14"
    >
      <div className="mono mb-7 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
        <span>Working across the Volta Region and Greater Accra</span>
        <span className="hidden md:inline">Selected sectors served</span>
      </div>

      <ul className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
        {SECTORS.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <span className="text-center text-[11px] font-medium tracking-[0.14em] text-[color:var(--color-ink-dim)] opacity-70 transition-opacity duration-500 hover:opacity-100 md:text-[12px]">
              {c}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
