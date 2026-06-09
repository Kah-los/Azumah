"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * 3D tilt card with:
 *  - lerped rotateX/Y (spring-smoothed motion values)
 *  - cursor-follow radial glow (.card-glow)
 *  - specular highlight band
 *  - depth layers via translateZ on children that opt in via [data-depth]
 */
export function TiltCard({
  children,
  className,
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduce = usePrefersReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });

  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const shadowX = useTransform(sx, [0, 1], [24, -24]);
  const shadowY = useTransform(sy, [0, 1], [24, -24]);
  const boxShadow = useTransform(
    [shadowX, shadowY] as const,
    ([sxv, syv]: number[]) =>
      `${sxv}px ${syv}px 60px -20px rgba(0,0,0,.5), 0 0 0 1px rgba(180,210,240,.10)`
  );

  const specularX = useTransform(sx, [0, 1], ["20%", "80%"]);
  const specularY = useTransform(sy, [0, 1], ["20%", "80%"]);
  const specular = useTransform(
    [specularX, specularY] as const,
    ([xv, yv]: string[]) =>
      `radial-gradient(600px circle at ${xv} ${yv}, rgba(255,255,255,.06), transparent 40%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (touch || reduce) return;
    const r = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    x.set(nx);
    y.set(ny);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };

  const handleLeave = () => {
    if (touch || reduce) return;
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: touch || reduce ? 0 : rotateX,
        rotateY: touch || reduce ? 0 : rotateY,
        boxShadow: touch || reduce ? undefined : boxShadow,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={cn(
        "group relative overflow-hidden rounded-[18px] glass transition-colors duration-500",
        "hover:border-[color:var(--color-line-strong)]",
        className
      )}
    >
      {/* specular highlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: specular }}
      />
      {/* cursor-follow glow */}
      <motion.div
        aria-hidden
        className="card-glow pointer-events-none absolute h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[8px] transition-opacity duration-300 group-hover:opacity-100"
        style={{
          left: px,
          top: py,
          background:
            "radial-gradient(circle, rgba(140,200,255,.18), transparent 70%)",
        }}
      />
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
