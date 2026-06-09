/**
 * Project case studies.
 *
 * IMPORTANT: every entry below is a REPRESENTATIVE PROJECT — a scope and
 * methodology pattern, with client identity anonymised. Several Ghanaian
 * surveying firms publish work this way because most engagements are
 * commercial-confidential.
 *
 * Before publication:
 *  - Replace each entry with a real, completed engagement where the client
 *    has given written permission to be named, OR
 *  - Keep the anonymised form and add a one-line note on the site explaining
 *    that work is presented under client confidentiality.
 *
 * Do NOT publish these entries as proven past work in their current form
 * without verification.
 */

import type { ImgKey } from "@/lib/images";

export type Project = {
  slug: string;
  client: string;
  title: string;
  tag: string;
  summary: string;
  role: string;
  scale: string;

  overview: string;

  challenge: {
    headline: string;
    body: string;
  };

  methodology: Array<{
    name: string;
    body: string;
  }>;

  equipment: string[];
  standards: string[];
  accuracy: Array<{ k: string; v: string }>;
  deliverables: string[];

  outcome: {
    headline: string;
    body: string;
    metrics?: Array<{ k: string; v: string }>;
  };

  related: string[];

  art: {
    imageKey: ImgKey;
  };

  parallax: number;
};

export const PROJECTS: Project[] = [
  {
    slug: "residential-boundary-survey-ho",
    client: "Private residential developer · Ho",
    title: "Residential Boundary Survey · Ho",
    tag: "Cadastral · 2024",
    summary:
      "Boundary survey, subdivision and pillar location for a 4.2-hectare residential development on the outskirts of Ho.",
    role: "Boundary survey and demarcation",
    scale: "4.2 ha · 38 plots",
    overview:
      "A private developer commissioned a boundary survey, subdivision plan and pillar location for a new residential development on the outskirts of Ho. The brief required a Lands Commission-compliant cadastral package suitable for plot-by-plot title registration, with concrete pillars planted on every parcel corner.",
    challenge: {
      headline: "Subdivide 4.2 hectares cleanly enough that every plot can be titled on first submission.",
      body:
        "The site bordered three pre-existing parcels with conflicting boundary descriptions. The cadastral package had to reconcile those parcels, present a coordinated subdivision, and produce title-ready documentation per plot, so that buyers could register without follow-up surveys.",
    },
    methodology: [
      { name: "Search and reconnaissance", body: "Search at the Lands Commission for adjoining parcel descriptions and reconciliation of conflicting beacons on the ground." },
      { name: "Control", body: "Two-point GNSS control referenced to the Ghana National Grid (Accra Datum) and onward to WGS84." },
      { name: "Boundary survey", body: "Total-station traverse with redundant observations at each corner; boundary closure verified before pillar planting." },
      { name: "Pillar planting and documentation", body: "Concrete pillars planted at every parcel corner. Site plan and per-plot deeds plans prepared for Lands Commission submission." },
    ],
    equipment: ["Total station (1\")", "GNSS rover with RTK base", "Concrete pillars to LI 1444 specification"],
    standards: ["Survey Act 1962 (Act 127)", "Lands Commission practice notes", "LI 1444 (boundary and pillar specification)"],
    accuracy: [
      { k: "Boundary closure", v: "1 : 8,000" },
      { k: "Parcel area tolerance", v: "± 0.2%" },
      { k: "Plots delivered", v: "38" },
      { k: "Pillars planted", v: "152" },
    ],
    deliverables: [
      "Subdivision plan (Lands Commission format)",
      "Per-plot deeds plans (38 plots)",
      "Boundary report with closure calculations",
      "Pillar location schedule with as-planted coordinates",
      "Title-ready package for Lands Commission submission",
    ],
    outcome: {
      headline: "All 38 plots accepted for registration on first submission.",
      body:
        "Title applications cleared the Lands Commission's first-stage review without amendment. The developer used the same package to support buyer-side finance applications.",
      metrics: [
        { k: "Plots accepted on first submission", v: "38 / 38" },
        { k: "Boundary disputes raised", v: "0" },
        { k: "Programme variance", v: "On time" },
      ],
    },
    related: ["Boundary and Cadastral", "Land Surveying", "Topographic Surveys"],
    art: { imageKey: "land" },
    parallax: 0.08,
  },
  {
    slug: "school-site-layout-volta-region",
    client: "District education authority · Volta Region",
    title: "School Site Layout · Volta Region",
    tag: "Institutional · 2023",
    summary:
      "Topographic survey and setting-out for a new junior high school on a 1.8-hectare site in the Volta Region.",
    role: "Topographic survey and setting-out",
    scale: "1.8 ha · 9 buildings",
    overview:
      "A district education authority engaged the practice to survey the site for a new junior high school and to provide setting-out for the civil works. The package covered an existing-conditions topographic survey, a setting-out of the masterplan against the architect's drawings, and a final as-built report at handover.",
    challenge: {
      headline: "Lay out a nine-building school cleanly, on sloping ground, on a school holiday programme.",
      body:
        "The brief required setting-out for nine buildings, drainage and an access road on a sloping site, with all field works delivered inside the school holidays to allow construction to begin on day one of the next term.",
    },
    methodology: [
      { name: "Topographic survey", body: "Topographic survey at 1:500 scale, with services and existing features captured for the architect." },
      { name: "Local control", body: "Three-station local control network referenced to the Ghana National Grid and verified by closed traverse." },
      { name: "Setting-out", body: "Building corners, drainage runs, and access-road alignment set out from the local control with documented offsets." },
      { name: "As-built", body: "Final as-built survey of foundations and drainage at handover, with deviation report against design." },
    ],
    equipment: ["Total station (2\")", "GNSS rover with RTK base", "Auto-level for benchmark transfer"],
    standards: ["Survey Act 1962 (Act 127)", "Ghana Education Service site standards", "LISAG practice guidance"],
    accuracy: [
      { k: "Setting-out (horizontal)", v: "± 12 mm" },
      { k: "Setting-out (vertical)", v: "± 10 mm" },
      { k: "Topographic scale", v: "1:500" },
      { k: "Closure", v: "Within tolerance" },
    ],
    deliverables: [
      "Topographic survey (DWG + PDF)",
      "Local control network with as-planted coordinates",
      "Setting-out packs for the civils contractor",
      "As-built survey of foundations and drainage",
      "Handover report",
    ],
    outcome: {
      headline: "Foundations poured on schedule, with no re-setting of pegs.",
      body:
        "Civil works started on day one of the next term as planned. No setting-out pegs required re-issue during the foundation phase.",
      metrics: [
        { k: "Buildings set out", v: "9" },
        { k: "Programme variance", v: "On time" },
        { k: "Re-set requests", v: "0" },
      ],
    },
    related: ["Topographic Surveys", "Construction Setting-Out", "Engineering Surveys"],
    art: { imageKey: "constructionSite" },
    parallax: 0.14,
  },
  {
    slug: "commercial-building-setting-out-ho",
    client: "Private commercial developer · Ho",
    title: "Commercial Building Setting-Out · Ho",
    tag: "Construction · 2024",
    summary:
      "Setting-out and as-built monitoring for a four-storey mixed-use commercial building in central Ho.",
    role: "Construction setting-out",
    scale: "1,200 m² footprint · 4 storeys",
    overview:
      "A developer engaged the practice for setting-out and as-built monitoring of a four-storey mixed-use building in central Ho. The brief covered piling, foundations, columns, floor slabs and the roof line, with as-built deviation reporting against the structural engineer's drawings at every floor.",
    challenge: {
      headline: "Hold every column to specification across four storeys, on an infill site.",
      body:
        "An infill site with party walls on two sides limited setting-out lines of sight. Column verticality and slab levels had to be held to specification across four storeys, with a documented record against the structural engineer's drawings at every floor.",
    },
    methodology: [
      { name: "Control transfer", body: "Site control transferred from the developer's reference points and verified by closed traverse." },
      { name: "Piling and foundations", body: "Pile positions set out, with as-driven coordinates recorded for the geotechnical record." },
      { name: "Frame", body: "Per-floor column setting-out from a transferred control point, with verticality verified by plumb laser to the top floor." },
      { name: "As-built", body: "Floor-by-floor as-built deviation reports against the structural engineer's drawings." },
    ],
    equipment: ["Total station (1\")", "Auto-level", "Plumb laser for verticality transfer"],
    standards: ["Survey Act 1962 (Act 127)", "ISO 17123-3 (total stations)", "LISAG practice guidance"],
    accuracy: [
      { k: "Column position", v: "± 8 mm" },
      { k: "Floor level", v: "± 6 mm" },
      { k: "Verticality (G to L4)", v: "± 18 mm" },
      { k: "Pile as-driven", v: "± 25 mm" },
    ],
    deliverables: [
      "Site control transfer report",
      "Pile as-driven coordinate schedule",
      "Per-floor setting-out packs",
      "Per-floor as-built deviation reports",
      "Final as-built summary at handover",
    ],
    outcome: {
      headline: "Frame topped out with no remedial setting-out required.",
      body:
        "The frame reached roof level without remedial setting-out at any floor. The as-built record was accepted by the structural engineer at first review.",
      metrics: [
        { k: "Floors set out", v: "4" },
        { k: "Remedial sets required", v: "0" },
        { k: "Deviation reports accepted on first review", v: "4 / 4" },
      ],
    },
    related: ["Construction Setting-Out", "Engineering Surveys", "Land Surveying"],
    art: { imageKey: "road" },
    parallax: 0.05,
  },
  {
    slug: "agricultural-uav-mapping-volta",
    client: "Private landowner · North Volta Region",
    title: "Agricultural UAV Mapping · North Volta",
    tag: "Agricultural · 2024",
    summary:
      "UAV orthophotography and topographic survey of 84 hectares of farmland for subdivision and management planning.",
    role: "UAV mapping and topographic survey",
    scale: "84 ha · 1.5 cm GSD",
    overview:
      "A private landowner commissioned a UAV orthophoto and topographic survey of an 84-hectare family-owned holding in the north of the Volta Region. The brief supported a subdivision exercise and an irrigation planning study for the landowner's agronomy consultant.",
    challenge: {
      headline: "Map 84 hectares in a single dry-season window, at survey-grade resolution.",
      body:
        "The brief required a 1.5 cm ground sample distance orthophoto and a 25 cm-contour topographic surface, captured in a single dry-season window. The site had limited road access and no pre-existing control, so a primary control network had to be established before flights began.",
    },
    methodology: [
      { name: "Primary control", body: "Five GCP-style control points established across the site, with GNSS-RTK observation referenced to the Ghana National Grid." },
      { name: "Flight planning", body: "Flight plan in three blocks at 90 m AGL, 80% forward overlap and 70% side overlap, sized to the dry-season weather window." },
      { name: "Capture", body: "UAV flights flown across two consecutive days, with ground checks against the GCPs after each block." },
      { name: "Processing and reporting", body: "Orthophoto and DSM processed against the GCPs, with RMSE reporting per block and a final subdivision-ready package." },
    ],
    equipment: ["UAV with RTK / PPK GNSS", "GNSS RTK rover and base", "Ground control targets"],
    standards: ["Ghana Civil Aviation Authority drone regulations", "Survey Act 1962 (Act 127)", "LISAG practice guidance"],
    accuracy: [
      { k: "Orthophoto GSD", v: "1.5 cm" },
      { k: "Horizontal (vs GCP)", v: "± 30 mm" },
      { k: "Vertical (vs GCP)", v: "± 55 mm" },
      { k: "Coverage", v: "100% of holding" },
    ],
    deliverables: [
      "Orthorectified mosaic of the holding (GeoTIFF)",
      "Digital surface model (GeoTIFF)",
      "25 cm topographic contours (DWG)",
      "GCP report with RMSE per block",
      "Subdivision-ready coordinate schedule",
    ],
    outcome: {
      headline: "Subdivision and irrigation plans drafted from the orthophoto without re-survey.",
      body:
        "The landowner's agronomy consultant drafted the irrigation plan directly off the orthophoto and DSM. The subdivision exercise proceeded without a return field visit.",
      metrics: [
        { k: "Hectares captured", v: "84" },
        { k: "Flight days", v: "2" },
        { k: "Re-fly events", v: "0" },
      ],
    },
    related: ["UAV Mapping", "Topographic Surveys", "Boundary and Cadastral"],
    art: { imageKey: "landAlt" },
    parallax: 0.11,
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, n = 2): Project[] {
  return PROJECTS.filter((p) => p.slug !== slug).slice(0, n);
}
