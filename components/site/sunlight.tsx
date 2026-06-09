"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Dynamic sunlight system — a soft cursor-driven radial glow that
 * sits above the blueprint and below content. Provides ambient
 * "light direction" that subtly responds to the user.
 */
export function Sunlight() {
  const touch = useIsTouch();
  const reduce = usePrefersReducedMotion();

  const mx = useMotionValue(50);
  const my = useMotionValue(20);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 1 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (touch || reduce) return;
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [touch, reduce, mx, my]);

  const bg = useMotionTemplate`radial-gradient(900px circle at ${sx}% ${sy}%, rgba(140,200,255,.07), transparent 55%)`;

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
      style={{ background: bg }}
    />
  );
}
