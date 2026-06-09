"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

export function Cursor() {
  const touch = useIsTouch();
  const reduce = usePrefersReducedMotion();
  const [hover, setHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (touch || reduce) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [touch, reduce, x, y]);

  if (touch || reduce) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          borderColor: hover ? "var(--color-accent)" : "rgba(255,255,255,.35)",
          background: hover ? "rgba(180,220,255,.08)" : "transparent",
        }}
        transition={{ width: { duration: 0.25 }, height: { duration: 0.25 } }}
        className="pointer-events-none fixed left-0 top-0 z-[9000] rounded-full border mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[9001] h-1 w-1 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_12px_var(--color-glow)]"
      />
    </>
  );
}
