"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHead } from "@/components/site/services";
import { ProjectArt } from "@/components/site/project-art";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { PROJECTS, type Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

export function Work() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-16 md:py-40">
      <SectionHead title="Selected work">
        A fragment of the projects we&apos;ve geo-referenced over the last decade: rail
        viaducts, glass museums, offshore arrays.
      </SectionHead>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [project.parallax * 200, project.parallax * -200]);

  return (
    <motion.a
      ref={ref}
      href={`/work/${project.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
      style={{ y: reduce ? 0 : y }}
      aria-label={`Read the ${project.title} case study`}
      className="group relative block overflow-hidden rounded-[18px] border border-[color:var(--color-line)] glass transition-all duration-700 hover:-translate-y-1.5 hover:border-[color:var(--color-line-strong)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
    >
      <div className="relative aspect-[400/280] overflow-hidden">
        <div className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
          <ProjectArt project={project} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[color:var(--color-bg)] via-[rgba(6,9,14,0.6)] to-transparent" />
      </div>
      <div className="p-8 md:p-10">
        <div className="mb-3 flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            {project.tag}
          </span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.25}
            className="text-[color:var(--color-ink-dim)] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]"
          />
        </div>
        <h3 className="mb-2 text-[24px] font-normal tracking-[-0.02em]">{project.title}</h3>
        <p className="text-[15px] leading-[1.6] text-[color:var(--color-ink-dim)]">{project.summary}</p>

        <div className="mono mt-6 grid grid-cols-2 gap-2 border-t border-[color:var(--color-line)] pt-5 text-[10px] uppercase tracking-[0.2em]">
          <div className="flex flex-col gap-1">
            <span className="text-[color:var(--color-ink-mute)]">Role</span>
            <span className="text-[color:var(--color-ink)]">{project.role}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[color:var(--color-ink-mute)]">Scale</span>
            <span className="text-[color:var(--color-ink)]">{project.scale}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
