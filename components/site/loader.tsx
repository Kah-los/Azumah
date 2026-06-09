"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const COORD_SEQUENCE = [
  "6.6018° N · 0.4708° E",
  "ELEV 158.2m · ±0.4cm",
  "GHANA NATIONAL GRID",
  "RMSE 0.003m",
];

export function Loader() {
  const reduce = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const [coord, setCoord] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 200 : 1900);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    const i = setInterval(() => setCoord((c) => (c + 1) % COORD_SEQUENCE.length), 480);
    return () => clearInterval(i);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center bg-[color:var(--color-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* expanding survey grid */}
          <motion.svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1600 1200"
            preserveAspectRatio="xMidYMid slice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 1.4 }}
          >
            <defs>
              <pattern id="ldr-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(184,226,255,.08)" strokeWidth=".5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ldr-grid)" />
          </motion.svg>

          <div className="relative flex flex-col items-center gap-8">
            <svg viewBox="0 0 100 100" className="h-[88px] w-[88px]">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth=".5" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth=".5" />
              {[0, 90, 180, 270].map((a) => (
                <line
                  key={a}
                  x1="50"
                  y1="6"
                  x2="50"
                  y2="14"
                  stroke="rgba(255,255,255,.4)"
                  strokeWidth=".75"
                  transform={`rotate(${a} 50 50)`}
                />
              ))}
              <motion.g
                style={{ originX: "50px", originY: "50px" }}
                animate={{ rotate: 380 }}
                transition={{
                  duration: reduce ? 0 : 2.4,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: reduce ? 0 : Infinity,
                }}
              >
                <polygon points="50,18 53,50 50,82 47,50" fill="rgba(255,255,255,.85)" />
              </motion.g>
              <circle cx="50" cy="50" r="2" fill="#fff" />
            </svg>

            <div className="flex flex-col items-center gap-3.5 mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-dim)]">
              <span className="text-[13px] tracking-[0.6em] text-[color:var(--color-ink)]">MAYPELS</span>
              <div className="h-px w-[220px] overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-[color:var(--color-accent)] shadow-[0_0_10px_var(--color-glow)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: reduce ? 0.2 : 1.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <motion.span
                key={coord}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-[9px]"
              >
                Establishing coordinates · {COORD_SEQUENCE[coord]}
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
