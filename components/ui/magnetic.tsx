"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Magnetic wrapper. The outer container pulls at `strength` (default 0.35);
 * the inner span pulls at `innerStrength` (default 0.15). Returns via spring.
 * Wraps children in a <div> — put your <a>/<button> *inside*.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  innerStrength = 0.15,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  innerStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduce = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });
  const six = useSpring(ix, { stiffness: 240, damping: 22, mass: 0.5 });
  const siy = useSpring(iy, { stiffness: 240, damping: 22, mass: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (touch || reduce) return;
    const r = ref.current!.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width / 2;
    const dy = e.clientY - r.top - r.height / 2;
    x.set(dx * strength);
    y.set(dy * strength);
    ix.set(dx * innerStrength);
    iy.set(dy * innerStrength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      <motion.span style={{ x: six, y: siy }} className="inline-flex items-center gap-3">
        {children}
      </motion.span>
    </motion.div>
  );
}
