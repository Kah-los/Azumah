"use client";

import { motion } from "framer-motion";

/**
 * Each icon has unique, semantically-motivated motion:
 *  - scan: rotating concentric rings + sweeping radar arm
 *  - drone: 4 rotors counter-rotating, central frame pulses
 *  - geodesy: globe lat/lon ellipses with pulsing center node
 *  - bim: hex wireframe with subtle structural pulse
 *  - monitoring: animated line graph + reading pulse
 *  - twin: grid intersections pulsing in sequence
 */

const inf = { repeat: Infinity, ease: "linear" as const };

export function ScanIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8">
      <motion.g
        style={{ originX: "32px", originY: "32px" }}
        animate={{ rotate: 360 }}
        transition={{ ...inf, duration: 18 }}
      >
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth=".75" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth=".5" />
        <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth=".5" />
      </motion.g>
      <motion.line
        x1="32" y1="32" x2="32" y2="4"
        stroke="currentColor" strokeWidth="1"
        style={{ originX: "32px", originY: "32px" }}
        animate={{ rotate: 360 }}
        transition={{ ...inf, duration: 5 }}
      />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

export function DroneIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8">
      <line x1="14" y1="14" x2="50" y2="50" stroke="currentColor" strokeWidth=".5" />
      <line x1="50" y1="14" x2="14" y2="50" stroke="currentColor" strokeWidth=".5" />
      {[
        { cx: 14, cy: 14, dir: 1 },
        { cx: 50, cy: 14, dir: -1 },
        { cx: 14, cy: 50, dir: -1 },
        { cx: 50, cy: 50, dir: 1 },
      ].map((r, i) => (
        <motion.circle
          key={i}
          cx={r.cx} cy={r.cy} r="6"
          fill="none" stroke="currentColor" strokeWidth=".75"
          strokeDasharray="2 6"
          style={{ originX: `${r.cx}px`, originY: `${r.cy}px` }}
          animate={{ rotate: r.dir * 360 }}
          transition={{ ...inf, duration: 3.5 }}
        />
      ))}
      <motion.rect
        x="26" y="26" width="12" height="12"
        fill="none" stroke="currentColor" strokeWidth="1"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function GeodesyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8">
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth=".75" />
      <motion.ellipse
        cx="32" cy="32" rx="24" ry="10"
        fill="none" stroke="currentColor" strokeWidth=".5"
        animate={{ ry: [10, 22, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx="32" cy="32" rx="10" ry="24"
        fill="none" stroke="currentColor" strokeWidth=".5"
        animate={{ rx: [10, 22, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.circle
        cx="32" cy="32" r="3" fill="currentColor"
        animate={{ opacity: [1, 0.3, 1], r: [3, 4, 3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function BimIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8">
      <motion.polygon
        points="32,8 56,22 56,46 32,60 8,46 8,22"
        fill="none" stroke="currentColor" strokeWidth=".75"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <line x1="32" y1="8" x2="32" y2="34" stroke="currentColor" strokeWidth=".5" />
      <line x1="8" y1="22" x2="32" y2="34" stroke="currentColor" strokeWidth=".5" />
      <line x1="56" y1="22" x2="32" y2="34" stroke="currentColor" strokeWidth=".5" />
      <line x1="32" y1="34" x2="32" y2="60" stroke="currentColor" strokeWidth=".5" />
      <motion.circle
        cx="32" cy="34" r="2" fill="currentColor"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function MonitoringIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8">
      <line x1="6" y1="54" x2="58" y2="54" stroke="currentColor" strokeWidth=".5" />
      <line x1="6" y1="10" x2="6" y2="54" stroke="currentColor" strokeWidth=".5" />
      <motion.polyline
        points="6,46 18,32 28,40 40,18 50,28 58,16"
        fill="none" stroke="currentColor" strokeWidth="1"
        animate={{ pathLength: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="40" cy="18" r="2.5" fill="currentColor"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function TwinIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8">
      <rect x="8" y="8" width="48" height="48" fill="none" stroke="currentColor" strokeWidth=".75" />
      <line x1="8" y1="24" x2="56" y2="24" stroke="currentColor" strokeWidth=".5" />
      <line x1="8" y1="40" x2="56" y2="40" stroke="currentColor" strokeWidth=".5" />
      <line x1="24" y1="8" x2="24" y2="56" stroke="currentColor" strokeWidth=".5" />
      <line x1="40" y1="8" x2="40" y2="56" stroke="currentColor" strokeWidth=".5" />
      {[
        { cx: 24, cy: 24 }, { cx: 40, cy: 24 },
        { cx: 24, cy: 40 }, { cx: 40, cy: 40 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx} cy={p.cy} r="2.5" fill="currentColor"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
