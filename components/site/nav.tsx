"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Deliverable", href: "#receive" },
  { label: "Work", href: "#work" },
  { label: "Principal", href: "#principal" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[color:var(--color-line)] bg-gradient-to-b from-[rgba(6,9,14,0.78)] to-[rgba(6,9,14,0.2)] px-6 py-4 backdrop-blur-xl backdrop-saturate-150 md:px-12 md:py-5"
      >
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <AnimatedNavLink key={l.href} href={l.href}>
              {l.label}
            </AnimatedNavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Magnetic>
            <a
              href="#contact"
              className="rounded-full border border-[color:var(--color-line-strong)] glass px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-all duration-500 hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-bg)] hover:shadow-[0_0_30px_var(--color-glow)] md:px-5 md:py-3 md:text-[12px]"
            >
              <span>Start a survey</span>
            </a>
          </Magnetic>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-line)] glass md:hidden"
          >
            <span className="relative block h-3 w-4">
              <motion.span
                className="absolute left-0 right-0 top-0 h-px bg-[color:var(--color-ink)]"
                animate={{ y: open ? 6 : 0, rotate: open ? 45 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-px bg-[color:var(--color-ink)]"
                animate={{ y: open ? -6 : 0, rotate: open ? -45 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] flex flex-col bg-[color:var(--color-bg)]/95 px-6 pb-12 pt-28 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-4 border-b border-[color:var(--color-line)] py-5 font-light leading-none tracking-[-0.02em] text-[40px]"
                >
                  <span className="mono text-[11px] tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{l.label}</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mono flex flex-col gap-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]"
            >
              <span>Maypels Engineering Services</span>
              <span>leslie.azumah@gmail.com · +233 54 386 0396</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 text-[12px] font-medium tracking-[0.4em] md:text-[13px]">
      <svg viewBox="0 0 24 24" width="20" height="20" className="text-[color:var(--color-accent)]">
        <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth=".75" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1="12" y1="1" x2="12" y2="5" stroke="currentColor" strokeWidth=".75" transform={`rotate(${a} 12 12)`} />
        ))}
      </svg>
      <span>MAYPELS</span>
    </a>
  );
}

function AnimatedNavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-block h-5 overflow-hidden text-[12px] uppercase tracking-[0.15em]",
        className
      )}
    >
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
        <span className="text-[color:var(--color-ink-dim)]">{children}</span>
        <span className="text-[color:var(--color-accent)]">{children}</span>
      </span>
    </a>
  );
}
