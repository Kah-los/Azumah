"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Generic fade-up reveal observed via IntersectionObserver (once). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "p" | "h2" | "h3" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

/** Mask-reveal for hero/section headlines. Each line is wrapped in overflow-hidden. */
export function MaskReveal({
  lines,
  className,
  delayBase = 0,
  stagger = 0.12,
}: {
  lines: ReactNode[];
  className?: string;
  delayBase?: number;
  stagger?: number;
}) {
  return (
    <span className={cn("block", className)}>
      {lines.map((l, i) => (
        <span key={i} className="reveal-mask">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: delayBase + i * stagger,
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
