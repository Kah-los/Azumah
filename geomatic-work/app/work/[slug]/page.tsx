import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, getProject, getRelatedProjects } from "@/lib/projects";
import { ProjectArt } from "@/components/site/project-art";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { BlueprintBackground } from "@/components/site/blueprint-background";
import { Sunlight } from "@/components/site/sunlight";
import { Cursor } from "@/components/site/cursor";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { MobileCTA } from "@/components/site/mobile-cta";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found · Maypels Engineering Services" };
  return {
    title: `${project.title} · Maypels Engineering Services`,
    description: project.summary,
    openGraph: {
      title: `${project.title} · ${project.client}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudy({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Cursor />
      <BlueprintBackground />
      <Sunlight />
      <Nav />
      <main id="main" className="relative z-10">
        {/* Back link */}
        <div className="px-6 pt-32 md:px-16 md:pt-36">
          <a
            href="/#work"
            className="mono inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-dim)] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
          >
            <ArrowLeft size={12} strokeWidth={1.5} /> Back to selected work
          </a>
        </div>

        {/* Hero */}
        <section className="relative px-6 pb-20 pt-12 md:px-16 md:pb-24 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <Reveal>
              <span className="mono mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                <span className="h-px w-4 bg-current" /> {project.tag}
              </span>
              <h1 className="mb-6 font-light leading-[0.98] tracking-[-0.035em] text-[clamp(40px,5.5vw,84px)]">
                {project.title}
              </h1>
              <p className="mono mb-2 text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-dim)]">
                Client
              </p>
              <p className="text-[18px] tracking-[-0.01em] text-[color:var(--color-ink)]">{project.client}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[400/280] overflow-hidden rounded-[18px] border border-[color:var(--color-line-strong)]">
                <ProjectArt project={project} priority sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
            </Reveal>
          </div>

          {/* Project banner — the four numbers a procurement officer screens for */}
          <Reveal delay={0.15}>
            <dl className="mono mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[color:var(--color-line)] sm:grid-cols-4">
              <Banner k="Role" v={project.role} />
              <Banner k="Scale" v={project.scale} />
              <Banner k="Standards" v={`${project.standards.length} cited`} />
              <Banner k="Deliverables" v={`${project.deliverables.length} items`} />
            </dl>
          </Reveal>
        </section>

        {/* Overview */}
        <Section title="Overview" num="01">
          <p className="max-w-[68ch] text-[17px] leading-[1.7] text-[color:var(--color-ink-dim)]">{project.overview}</p>
        </Section>

        {/* Challenge */}
        <Section title="Challenge" num="02">
          <h3 className="mb-6 max-w-[24ch] font-light leading-[1.1] tracking-[-0.02em] text-[clamp(24px,3vw,36px)]">
            {project.challenge.headline}
          </h3>
          <p className="max-w-[68ch] text-[16px] leading-[1.7] text-[color:var(--color-ink-dim)]">{project.challenge.body}</p>
        </Section>

        {/* Methodology */}
        <Section title="Methodology" num="03">
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-[color:var(--color-line)] md:grid-cols-2">
            {project.methodology.map((m, i) => (
              <li key={m.name} className="bg-[color:var(--color-bg)] p-8 md:p-10">
                <span className="mono mb-3 block text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mb-3 text-[18px] font-normal tracking-[-0.01em] text-[color:var(--color-ink)]">{m.name}</h4>
                <p className="text-[14px] leading-[1.65] text-[color:var(--color-ink-dim)]">{m.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Two-column: Equipment + Standards */}
        <Section title="Equipment and standards" num="04">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="mono mb-5 block text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                Equipment
              </span>
              <ul className="space-y-3">
                {project.equipment.map((e) => (
                  <li key={e} className="mono flex items-center gap-3 text-[12px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)]">
                    <span className="h-px w-4 bg-[color:var(--color-accent)] opacity-60" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="mono mb-5 block text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
                Standards followed
              </span>
              <ul className="space-y-3">
                {project.standards.map((s) => (
                  <li key={s} className="mono flex items-center gap-3 text-[12px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)]">
                    <span className="h-px w-4 bg-[color:var(--color-accent)] opacity-60" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Accuracy achieved — the numbers procurement screens for */}
        <Section title="Accuracy achieved" num="05">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[color:var(--color-line)] md:grid-cols-4">
            {project.accuracy.map((a) => (
              <div key={a.k} className="bg-[color:var(--color-bg)] p-7 md:p-9">
                <dt className="mono mb-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">{a.k}</dt>
                <dd className="font-light leading-none tracking-[-0.02em] text-[clamp(26px,3vw,38px)] text-[color:var(--color-ink)]">
                  {a.v}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Deliverables */}
        <Section title="Deliverables supplied" num="06">
          <ul className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
            {project.deliverables.map((d, i) => (
              <li key={d} className="flex items-baseline gap-6 py-5">
                <span className="mono text-[10px] tracking-[0.25em] text-[color:var(--color-ink-mute)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-[1.5] text-[color:var(--color-ink)]">{d}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Outcome */}
        <Section title="Outcome" num="07">
          <h3 className="mb-6 max-w-[26ch] font-light leading-[1.1] tracking-[-0.025em] text-[clamp(28px,3.5vw,44px)]">
            {project.outcome.headline}
          </h3>
          <p className="mb-10 max-w-[68ch] text-[16px] leading-[1.7] text-[color:var(--color-ink-dim)]">{project.outcome.body}</p>
          {project.outcome.metrics && (
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[color:var(--color-line)] md:grid-cols-3">
              {project.outcome.metrics.map((m) => (
                <div key={m.k} className="bg-[color:var(--color-bg)] p-7 md:p-9">
                  <dt className="mono mb-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">{m.k}</dt>
                  <dd className="font-light leading-none tracking-[-0.02em] text-[clamp(28px,3vw,40px)] text-[color:var(--color-accent)]">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Section>

        {/* Related services */}
        <Section title="Related services" num="08">
          <ul className="flex flex-wrap gap-2">
            {project.related.map((r) => (
              <li
                key={r}
                className="rounded-full border border-[color:var(--color-line)] px-3 py-1.5 text-[13px] text-[color:var(--color-ink-dim)] transition-colors duration-300 hover:border-[color:var(--color-line-strong)] hover:text-[color:var(--color-ink)]"
              >
                {r}
              </li>
            ))}
          </ul>
        </Section>

        {/* Contact CTA */}
        <section className="px-6 py-24 md:px-16 md:py-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-[24px] glass-strong p-10 md:p-16">
              <div className="pointer-events-none absolute -left-[10%] -top-[50%] h-[200%] w-[60%] bg-[radial-gradient(circle,rgba(140,200,255,.18),transparent_60%)] blur-[60px]" />
              <span aria-hidden className="mb-8 block h-px w-12 bg-[color:var(--color-accent)]" />
              <h2 className="mb-6 max-w-[18ch] font-light leading-[1.05] tracking-[-0.035em] text-[clamp(32px,4.5vw,56px)]">
                Discuss a project like {project.title}.
              </h2>
              <p className="mb-9 max-w-[52ch] text-[16px] leading-[1.65] text-[color:var(--color-ink-dim)]">
                Tell us the asset, the scope, the timing. A Chartered Surveyor replies with a
                feasibility note inside one working day.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button href="/#contact" variant="primary" withArrow>
                  Request a proposal
                </Button>
                <Button href="mailto:leslie.azumah@gmail.com" variant="ghost">
                  leslie.azumah@gmail.com
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="border-t border-[color:var(--color-line)] px-6 py-20 md:px-16 md:py-28">
            <span className="mono mb-10 block text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
              Related projects
            </span>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/work/${r.slug}`}
                  className="group flex items-center gap-6 rounded-[14px] border border-[color:var(--color-line)] glass p-5 transition-all duration-500 hover:border-[color:var(--color-line-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
                >
                  <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-[8px] md:h-24 md:w-32">
                    <ProjectArt project={r} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mono mb-1.5 block text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                      {r.tag}
                    </span>
                    <h3 className="truncate text-[17px] tracking-[-0.01em] text-[color:var(--color-ink)]">{r.title}</h3>
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.25}
                    className="text-[color:var(--color-ink-dim)] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]"
                  />
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}

function Section({ title, num, children }: { title: string; num: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[color:var(--color-line)] px-6 py-16 md:px-16 md:py-24">
      <Reveal>
        <div className="mb-10 flex items-baseline gap-6">
          <span className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
            {num}
          </span>
          <h2 className="font-light tracking-[-0.02em] text-[clamp(22px,2.4vw,30px)] text-[color:var(--color-ink)]">
            {title}
          </h2>
        </div>
        {children}
      </Reveal>
    </section>
  );
}

function Banner({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[color:var(--color-bg)] p-5 md:p-6">
      <dt className="mono mb-2 text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">{k}</dt>
      <dd className="text-[14px] tracking-[-0.005em] text-[color:var(--color-ink)] md:text-[15px]">{v}</dd>
    </div>
  );
}
