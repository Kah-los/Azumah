"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { MediaPlate } from "@/components/ui/media-plate";
import { IMG, LOCAL } from "@/lib/images";
import type { SiteImage } from "@/lib/images";
import {
  ScanIcon,
  DroneIcon,
  GeodesyIcon,
  BimIcon,
  MonitoringIcon,
  TwinIcon,
} from "@/components/site/service-icons";
import type { ReactNode } from "react";

type Service = {
  icon: ReactNode;
  title: string;
  body: string;
  meta: string;
  image: SiteImage;
};

const SERVICES: Service[] = [
  {
    icon: <GeodesyIcon />,
    title: "Land Surveying",
    body:
      "Cadastral, parcel and title surveys to LISAG and Lands Commission standards. Field-verified, Licensed-Surveyor signed.",
    meta: "Survey Act 1962 · Licensed Surveyor signed",
    image: LOCAL.crewGNSS, // real field crew with GNSS — flagship card
  },
  {
    icon: <ScanIcon />,
    title: "Boundary and Cadastral",
    body:
      "Pillar location, demarcation and boundary disputes. Coordinated parcels in Ghana National Grid with witness statements.",
    meta: "LI 1444 pillar specification",
    image: IMG.land,
  },
  {
    icon: <MonitoringIcon />,
    title: "Construction Setting-Out",
    body:
      "Daily setting-out for civils contractors. Robotic total stations, redundant control and as-built deviation reporting against design.",
    meta: "Tolerance ± 8 mm · ISO 17123-3",
    image: LOCAL.lesliePortrait, // Leslie on a road construction site
  },
  {
    icon: <BimIcon />,
    title: "Topographic Surveys",
    body:
      "Detailed topographic capture for site development, with contours, services and existing-feature attribution ready for the design team.",
    meta: "1:200 to 1:2000 · DWG/DGN",
    image: IMG.topo,
  },
  {
    icon: <TwinIcon />,
    title: "Engineering Surveys",
    body:
      "Route corridor, highway, drainage and utility surveys for infrastructure projects. Network adjusted to the Ghana National Grid.",
    meta: "Ghana National Grid · DWG / DGN",
    image: IMG.road,
  },
  {
    icon: <DroneIcon />,
    title: "UAV Mapping",
    body:
      "Aerial photogrammetry and LiDAR for site monitoring, volumetrics and orthorectified mapping. CAA-Ghana approved operators.",
    meta: "Operated under GCAA UAV regulations",
    image: IMG.drone,
  },
];

export function Services() {
  return (
    <section id="services" className="relative px-6 py-32 md:px-16 md:py-40">
      <SectionHead title="Disciplines">
        Six interdependent practices, one continuous reference frame. Every deliverable is
        geo-anchored, version-controlled and signed by a Licensed Surveyor.
      </SectionHead>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <TiltCard className="h-full">
            <ServiceCardBody {...SERVICES[0]} featured />
          </TiltCard>
        </Reveal>
        {SERVICES.slice(1).map((s, i) => (
          <Reveal key={s.title} delay={(i + 1) * 0.08}>
            <TiltCard className="h-full">
              <ServiceCardBody {...s} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCardBody({
  icon,
  title,
  body,
  meta,
  image,
  featured = false,
}: Service & { featured?: boolean }) {
  if (featured) {
    return (
      <div className="relative grid gap-0 md:grid-cols-[1fr_0.95fr]">
        {/* corner squares retained from the existing design */}
        <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
          <div className="absolute -left-1.5 -top-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
          <div className="absolute -right-1.5 -top-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
          <div className="absolute -bottom-1.5 -left-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
          <div className="absolute -bottom-1.5 -right-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
        </div>

        <div className="p-9 md:p-12">
          <div className="mb-7 grid h-16 w-16 place-items-center rounded-xl border border-[color:var(--color-line-strong)] glass text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:shadow-[0_0_24px_var(--color-glow)] md:h-20 md:w-20">
            {icon}
          </div>
          <span className="mono mb-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
            <span className="h-px w-4 bg-current" /> Flagship discipline
          </span>
          <h3 className="mb-4 max-w-[20ch] font-light leading-[1.05] tracking-[-0.025em] text-[clamp(28px,3.4vw,40px)]">
            {title}
          </h3>
          <p className="mb-6 max-w-[58ch] text-[16px] leading-[1.6] text-[color:var(--color-ink-dim)]">{body}</p>
          <div className="mono border-t border-[color:var(--color-line)] pt-4 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-ink-mute)]">
            {meta}
          </div>
        </div>

        {/* Photographic plate, right side */}
        <div className="relative min-h-[260px] md:min-h-full">
          <MediaPlate
            image={image}
            grade="default"
            corners
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="absolute inset-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
        <div className="absolute -left-1.5 -top-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
        <div className="absolute -right-1.5 -top-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
        <div className="absolute -bottom-1.5 -left-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
        <div className="absolute -bottom-1.5 -right-1.5 h-2 w-2 bg-[color:var(--color-accent)]" />
      </div>

      {/* Image strip at top — subtle, lets icon + heading anchor the card */}
      <div className="relative h-32 overflow-hidden">
        <MediaPlate
          image={image}
          grade="strong"
          corners={false}
          sizes="(min-width: 1024px) 30vw, 50vw"
          className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />
        {/* Icon sits on top of the strip, anchored bottom-left */}
        <div className="absolute -bottom-7 left-6 z-20 grid h-14 w-14 place-items-center rounded-xl border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)] text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:shadow-[0_0_24px_var(--color-glow)]">
          {icon}
        </div>
      </div>

      <div className="p-6 pt-12 md:p-8 md:pt-14">
        <h3 className="mb-3 text-[22px] font-normal tracking-[-0.02em]">{title}</h3>
        <p className="mb-6 text-[15px] leading-[1.65] text-[color:var(--color-ink-dim)]">{body}</p>
        <div className="mono border-t border-[color:var(--color-line)] pt-4 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
          {meta}
        </div>
      </div>
    </div>
  );
}

export function SectionHead({
  title,
  children,
  num,
}: {
  num?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-20 max-w-[760px]">
        <span aria-hidden className="mb-8 block h-px w-12 bg-[color:var(--color-accent)]" />
        {num && (
          <span className="mono mb-3 block text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-mute)]">
            {num}
          </span>
        )}
        <h2 className="mb-5 font-light leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,64px)]">
          {title}
        </h2>
        <p className="max-w-[60ch] text-[16px] text-[color:var(--color-ink-dim)]">{children}</p>
      </div>
    </Reveal>
  );
}
