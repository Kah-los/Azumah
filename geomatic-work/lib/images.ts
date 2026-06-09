/**
 * Verified Unsplash imagery catalog.
 *
 * Every URL here was confirmed via WebFetch against the canonical photo page;
 * none are guessed. Each entry pairs the asset with descriptive alt text in
 * the firm's voice (image-as-deliverable, not stock-as-decoration).
 *
 * Replace any of these with a project-cleared photo by editing this file.
 */

export type SiteImage = {
  id: string;          // Unsplash photo id slug — for next/image and as a stable key
  src: string;         // images.unsplash.com canonical URL
  alt: string;
  /** Suggested focal point for object-position (e.g. "center 30%"). */
  focal?: string;
};

const u = (id: string, opts: { w?: number; q?: number } = {}) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${opts.w ?? 1920}&q=${opts.q ?? 70}`;

/**
 * Local photographs of Maypels' actual fieldwork.
 *
 * Catalogued from the photographs supplied by Leslie Azumah. Each entry
 * is captioned in alt text in the firm's voice so that screen readers and
 * SEO read accurate field content rather than generic stock-image fallback.
 */
export const LOCAL = {
  /** Two surveyors (incl. Leslie) running a GNSS rover survey on a Volta Region site.
      Primary trust image — used in the Principal section. */
  leslieGNSS: {
    id: "local-leslie-gnss",
    src: "/photos/IMG_7708.jpeg",
    alt: "Leslie Azumah conducting GNSS control surveying in the Volta Region.",
    focal: "center 35%",
  },
  /** Portrait-style shot of Leslie at a construction site with a grader. */
  lesliePortrait: {
    id: "local-leslie-portrait",
    src: "/photos/IMG_5428.jpeg",
    alt: "Leslie Azumah on a road construction site in Ghana, alongside grading equipment.",
    focal: "center 35%",
  },
  /** Atmospheric solo shot at a total station on a hilltop. */
  totalStationHilltop: {
    id: "local-total-station-hilltop",
    src: "/photos/IMG_2189.jpeg",
    alt: "Setting up a total station on a hilltop in the Volta Region.",
    focal: "center 40%",
  },
  /** Four-person field crew posed around a GNSS rover. */
  crewGNSS: {
    id: "local-crew-gnss",
    src: "/photos/IMG_7710.jpeg",
    alt: "Maypels field crew with a GNSS rover during a control survey.",
    focal: "center 35%",
  },
  /** Crew setting up tripod-mounted survey equipment in the field. */
  fieldSetup: {
    id: "local-field-setup",
    src: "/photos/IMG_4546.jpeg",
    alt: "Survey crew setting up equipment on site in the Volta Region.",
    focal: "center 40%",
  },
  /** Single surveyor with equipment on rocky terrain. */
  fieldworkRocky: {
    id: "local-fieldwork-rocky",
    src: "/photos/IMG_8490.jpeg",
    alt: "Surveying work on rocky terrain in the Volta Region.",
    focal: "center 40%",
  },
} as const;

export const IMG = {
  /** Curved modern building, Accra, Ghana. Hero. */
  hero: {
    id: "1680888690561-e9df354ccf45",
    src: u("1680888690561-e9df354ccf45", { w: 2400, q: 72 }),
    alt: "A contemporary curved-facade commercial building in Accra, Ghana, lit at the blue hour.",
    focal: "center 40%",
  },
  /** Surveyor in the field, total-station tripod on green ground. */
  surveying: {
    id: "1628158088936-68ccaaa400dc",
    src: u("1628158088936-68ccaaa400dc", { w: 1600 }),
    alt: "A surveyor's total-station tripod set up on a green field, ready for observation.",
    focal: "center 45%",
  },
  /** Surveyor working with positioning instrument, road context. */
  surveyorAtWork: {
    id: "1526593676484-54adc4701fee",
    src: u("1526593676484-54adc4701fee", { w: 1600 }),
    alt: "A land surveyor reviewing readings on a positioning instrument at the roadside.",
    focal: "center 40%",
  },
  /** Construction site with workers, used for setting-out / engineering. */
  constructionSite: {
    id: "1667207591118-73d5eeaeed96",
    src: u("1667207591118-73d5eeaeed96", { w: 1600 }),
    alt: "An active construction site with workers in hard hats, mid-build.",
    focal: "center 45%",
  },
  /** UAV / drone, used for aerial mapping. */
  drone: {
    id: "1507582020474-9a35b7d455d9",
    src: u("1507582020474-9a35b7d455d9", { w: 1600 }),
    alt: "A survey-grade quadcopter UAV in flight against a clear sky.",
    focal: "center 50%",
  },
  /** Topographic terrain map, used for topographic surveys. */
  topo: {
    id: "1756478054877-3556f34c8652",
    src: u("1756478054877-3556f34c8652", { w: 1600 }),
    alt: "A green-graded topographic terrain rendering, contour-coded by elevation.",
    focal: "center 50%",
  },
  /** Aerial road, used for engineering / infrastructure surveys. */
  road: {
    id: "1490463136745-80e3fc793cbd",
    src: u("1490463136745-80e3fc793cbd", { w: 1600 }),
    alt: "An aerial view of a curving highway cutting through landscape.",
    focal: "center 50%",
  },
  /** Aerial green grass field, used for cadastral / boundary surveys. */
  land: {
    id: "1524508414616-58c3667563b9",
    src: u("1524508414616-58c3667563b9", { w: 1600 }),
    alt: "An aerial view of green farmland parcelled by hedgerows.",
    focal: "center 50%",
  },
  /** Aerial green field, used in case-study art. */
  landAlt: {
    id: "1546453667-8a8d2d07bc20",
    src: u("1546453667-8a8d2d07bc20", { w: 1600 }),
    alt: "An aerial composition of green field strips and hedgerow boundaries.",
    focal: "center 50%",
  },
} satisfies Record<string, SiteImage>;

export type ImgKey = keyof typeof IMG;
