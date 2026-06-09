# MAYPELS Engineering Services

Website for Maypels Engineering Services, a land surveying and engineering practice
based in Ho, Volta Region, Ghana, led by Leslie Azumah (Member, Ghana Institution
of Surveyors).

## Stack

- **Next.js 15** (App Router, React 19, Turbopack)
- **Tailwind CSS v4** (zero-config `@theme`)
- **Framer Motion 11** (mask reveals, springs, layout)
- **shadcn-style** component structure with **CVA** variants
- **21st.dev MCP** patterns adapted for the design system

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production check
```

## File map

```
app/
  layout.tsx              fonts (Inter / JetBrains Mono / Instrument Serif), metadata
  page.tsx                page composition
  globals.css             Tailwind v4 @theme tokens + reduced-motion
components/
  ui/
    tilt-card.tsx         3D tilt + specular highlight + cursor-follow glow
    magnetic.tsx          outer/inner magnetic wrapper (0.35 / 0.15)
    reveal.tsx            Reveal + MaskReveal
    button.tsx            CVA Button (primary / ghost · sm/md/lg)
  site/
    loader.tsx            compass + coord readout + bar
    cursor.tsx            difference-blend ring + accent dot
    blueprint-background.tsx   layers 2–5 (grid · contours · triangulation · coord chips · data streams)
    sunlight.tsx          dynamic radial light following cursor
    nav.tsx               glass nav · vertical-flip links · magnetic CTA
    hero.tsx              choreographed mask-reveal hero + parallax feature chips
    services.tsx          tilt cards · animated icons · corner squares on hover
    service-icons.tsx     6 semantically-motivated motion icons
    work.tsx              scroll-parallax project cards · image zoom
    process.tsx           5-step timeline that fills on scroll
    trust.tsx             animated stat counters with ruler ticks
    contact.tsx           glass CTA card with atmospheric glow
    footer.tsx            hairline footer
lib/
  utils.ts                cn()
  hooks.ts                usePrefersReducedMotion · useIsTouch · useMounted
```

## 21st.dev MCP patterns adopted

| Section       | Pattern adapted                                                 | Source 21st component  |
| ------------- | --------------------------------------------------------------- | ---------------------- |
| Nav           | Vertical-flip nav links on hover                                | Mini Navbar            |
| Hero          | Floating annotation chips around the headline                   | Hero Odyssey           |
| Services      | Corner squares + hover border illumination                      | Dark Grid              |
| Work          | `group-hover:scale-110` image zoom inside card                  | ProjectCard            |
| Contact       | Atmospheric blur glow as depth layer                            | Elite Plan Card        |

Primitives (TiltCard, Magnetic, Reveal, Button, Loader, Cursor, BlueprintBackground, Sunlight,
Trust counters, animated service icons) were built directly — those are the seams worth owning.

## Performance & a11y

- All motion respects `prefers-reduced-motion`.
- Cursor / tilt / magnetic disabled when `hover: none` (touch).
- Mobile breakpoint at 900px+ via Tailwind `md:` / `lg:` utilities.
- All animations target GPU-friendly `transform` / `opacity`.
- Lighthouse-friendly font loading via `next/font` (no FOIT, swap on).

## Improving any component

Each visual unit is its own file under `components/site/` or `components/ui/`. To swap in a
different 21st.dev primitive later, replace the file — the section components consume props,
not implementation details.
