"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Mobile-only bottom CTA. Stays out of the way until the user has scrolled
 * past the first viewport, then slides up. Hides once #contact is in view so
 * it never duplicates the section CTA on the same screen.
 *
 * Visual weight is deliberately low: ~52px tall, glass background, single
 * action. No icons, no badges, no "urgent" affordance.
 */
export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const contact = document.getElementById("contact");
      const contactInView =
        contact !== null &&
        contact.getBoundingClientRect().top < window.innerHeight - 100;
      setVisible(y > window.innerHeight * 0.6 && !contactInView);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[90] md:hidden"
          style={{
            paddingBottom: "max(0px, env(safe-area-inset-bottom))",
          }}
        >
          <a
            href="/#contact"
            className="flex items-center justify-between gap-3 rounded-full border border-[color:var(--color-line-strong)] bg-[rgba(8,12,18,0.88)] px-5 py-3.5 backdrop-blur-xl transition-colors duration-300 hover:bg-[rgba(8,12,18,0.95)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
            aria-label="Discuss a project — go to contact"
          >
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
              Discuss a project
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-bg)]">
              <ArrowRight size={14} strokeWidth={1.75} />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
