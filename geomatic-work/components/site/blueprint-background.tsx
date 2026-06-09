"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

const COORD_CHIPS = [
  { label: "6.6018° N · 0.4708° E", top: "12%", left: "8%", depth: 0.3 },
  { label: "ELEV 158.2m · ±0.4cm", top: "22%", right: "10%", depth: 0.6 },
  { label: "N 729812.45", top: "58%", left: "14%", depth: 0.4 },
  { label: "E 612408.91", top: "70%", right: "8%", depth: 0.5 },
  { label: "GHANA NATIONAL GRID", top: "42%", left: "46%", depth: 0.35 },
  { label: "RMSE 0.003m", top: "84%", left: "30%", depth: 0.7 },
];

const SURVEY_POINTS = [
  { x: 200, y: 300 }, { x: 460, y: 180 }, { x: 720, y: 260 },
  { x: 920, y: 160 }, { x: 1180, y: 240 }, { x: 1400, y: 320 },
  { x: 380, y: 420 }, { x: 880, y: 380 }, { x: 1280, y: 460 },
];

const TRIANGLES = [
  "200,300 460,180 380,420",
  "460,180 720,260 380,420",
  "720,260 920,160 880,380",
  "920,160 1180,240 880,380",
  "1180,240 1400,320 1280,460",
];

const DATA_STREAMS = [
  "M -50,500 Q 400,420 800,480 T 1700,440",
  "M -50,640 Q 380,560 820,620 T 1700,580",
  "M -50,780 Q 420,700 800,760 T 1700,720",
];

export function BlueprintBackground() {
  const touch = useIsTouch();
  const reduce = usePrefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 1 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 1 });

  useEffect(() => {
    if (touch || reduce) return;
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [touch, reduce, mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-90"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(140,180,220,.04)" strokeWidth=".5" />
          </pattern>
          <pattern id="grid-bold" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(140,180,220,.08)" strokeWidth=".75" />
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="rgba(8,14,22,0)" />
            <stop offset="100%" stopColor="rgba(4,8,14,1)" />
          </radialGradient>
        </defs>

        {/* LAYER 2: blueprint grid */}
        <rect width="100%" height="100%" fill="url(#grid-fine)" />
        <rect width="100%" height="100%" fill="url(#grid-bold)" />

        {/* LAYER 4: animated contour lines */}
        <g stroke="rgba(120,170,210,.18)" fill="none" strokeWidth=".75">
          {[700, 740, 780, 820, 860].map((y, i) => (
            <motion.path
              key={y}
              d={`M0,${y} Q400,${y - 120} 800,${y - 60} T1600,${y - 100}`}
              animate={reduce ? undefined : { opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 8, delay: -i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        {/* LAYER 3: triangulation network */}
        <g stroke="rgba(180,210,240,.22)" fill="none" strokeWidth=".5">
          {TRIANGLES.map((pts, i) => (
            <motion.polygon
              key={i}
              points={pts}
              animate={reduce ? undefined : { opacity: [0.9, 0.3, 0.9] }}
              transition={{ duration: 6, delay: -i * 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        {/* survey points */}
        <g>
          {SURVEY_POINTS.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="var(--color-accent)"
              style={{ filter: "drop-shadow(0 0 6px var(--color-glow))" }}
              animate={reduce ? undefined : { opacity: [1, 0.4, 1], r: [3, 2, 3] }}
              transition={{ duration: 3, delay: -(i % 3), repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        {/* data streams: moving dashed traces (LAYER addition — GIS data) */}
        <g stroke="rgba(184,226,255,.35)" fill="none" strokeWidth="1" strokeLinecap="round">
          {DATA_STREAMS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              strokeDasharray="6 14"
              animate={reduce ? undefined : { strokeDashoffset: [0, -400] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "linear" }}
              opacity={0.5}
            />
          ))}
        </g>

        <rect width="100%" height="100%" fill="url(#vignette)" />
      </svg>

      {/* LAYER 5: floating coordinate chips with depth-based parallax */}
      {COORD_CHIPS.map((c, i) => (
        <CoordChip key={i} chip={c} sx={sx} sy={sy} reduce={reduce} />
      ))}
    </div>
  );
}

function CoordChip({
  chip,
  sx,
  sy,
  reduce,
}: {
  chip: (typeof COORD_CHIPS)[number];
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(sx, (n) => n * chip.depth * 20);
  const y = useTransform(sy, (n) => n * chip.depth * 20);
  return (
    <motion.div
      className="mono absolute whitespace-nowrap border border-[rgba(184,226,255,0.08)] bg-[rgba(8,14,22,0.4)] px-2.5 py-1.5 text-[10px] uppercase tracking-[0.15em] text-[rgba(184,226,255,0.35)] backdrop-blur-md"
      style={{
        top: chip.top,
        left: chip.left,
        right: chip.right,
        x: reduce ? 0 : x,
        y: reduce ? 0 : y,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1.4 }}
    >
      <motion.span
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 8 + chip.depth * 6, repeat: Infinity, ease: "easeInOut" }}
        className="block"
      >
        {chip.label}
      </motion.span>
    </motion.div>
  );
}
