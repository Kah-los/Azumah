# Pre-launch verification

This site is built around the profile of **Maypels Engineering Services**, a
land surveying and engineering practice in Ho, Volta Region, led by
**Leslie Azumah**, Member of the Ghana Institution of Surveyors.

Every claim below is structured so it can be verified or replaced before
publication.

The list is split into three parts:

1. **Confirmed by the client** — verified, in use, safe.
2. **Safe to publish immediately** — descriptive of the practice or public
   references, no factual claims that need backing documentation.
3. **Still requires verification** — claims that depend on real-world
   documentation that hasn't yet been confirmed.

---

## 1. Confirmed by the client

These are wired into the site, the metadata, the JSON-LD, the footer and
the Contact section, all linking through to working `mailto:` / `tel:` URLs.

- **Principal Surveyor**: Leslie Azumah
- **Professional Membership**: Member, Ghana Institution of Surveyors (GhIS)
- **Email**: leslie.azumah@gmail.com
- **Phone**: +233 54 386 0396
- **Location**: Ho, Volta Region, Ghana

Surfaces using these values:

- `components/site/contact.tsx` (Email + phone buttons, office, principal block)
- `components/site/principal.tsx` (Bio + monogram)
- `components/site/footer.tsx` (Contact strip)
- `app/layout.tsx` (metadata + JSON-LD structured data)

---

## 2. Safe to publish immediately

These are descriptive of the practice or reference real public standards.
They do not claim membership, status, or completed work that requires backing
documentation.

### Practice positioning (Hero)

- "A land surveying practice based in Ho, Volta Region, serving developers,
  civil contractors, institutions and private landowners across the Volta
  Region and Greater Accra."
- "Datum: Accra / WGS84" — describes the reference frame used
- "Coverage: Volta + Greater Accra" — describes the geographic remit
- "Practice: Survey Act 1962" — references the public Act under which the
  practice operates

### Disciplines (Services)

The six service cards describe capability:

- Land Surveying — describes typical scope (cadastral, parcel, title)
- Boundary and Cadastral
- Construction Setting-Out
- Topographic Surveys
- Engineering Surveys
- UAV Mapping (descriptive only — see UAV operator note below)

Service meta lines reference the public Survey Act 1962, LI 1444 (pillar
specification), and ISO 17123 (instrument standard). These are public
references, not claimed accreditations.

### Process (5-step pipeline)

The 5-step process describes how the practice operates. It does not claim
totals, completed projects, or named clients.

### Standards-based "What we hold ourselves to" (Trust section)

- ± 2 mm typical setting-out tolerance — verifiable against instrument + method
- 6 disciplines under one practice — verifiable from Services section itself
- 24 h feasibility note on enquiry — confirmed by Contact "What to expect"
- 100% work signed by a Licensed Surveyor — confirmed (Leslie signs every deliverable)

### Sector strip (was Clients)

Eight sector labels (residential developers, commercial developers, civil
contractors, etc.). Each is a category of client, not a named client.

### Credentials section — public references

- Survey Act 1962 (Act 127) — public Act
- LI 1444 pillar specification — public LI
- ISO 17123 / ISO 9001 — referenced as "aligned", not certified
- LISAG, GhIS, GCAA — referenced at principal/practice level

Note: GhIS membership is **confirmed**. LISAG line in Credentials is still
flagged for verification (Section 3, below).

### Principal section

- "Leslie Azumah" — confirmed
- "Member, Ghana Institution of Surveyors" — confirmed
- "Ho, Volta Region, Ghana" — confirmed
- "Land Surveying, Boundary and Cadastral, Topographic Surveys, Engineering Surveys" — confirmed disciplines

### Case studies (4 representative projects)

All four projects are explicitly **representative**: methodology and
scope are realistic for a Ho-based practice, and clients are anonymised.

- "Residential Boundary Survey · Ho"
- "School Site Layout · Volta Region"
- "Commercial Building Setting-Out · Ho"
- "Agricultural UAV Mapping · North Volta"

`lib/projects.ts` opens with a clear note that these are representative
patterns to be replaced with real engagements before publication.

### Deliverable section (Three.js)

The point-cloud viewport is a procedurally generated demonstration of what
a registered scan looks like. The caption "61,440 pts · WGS84" and the HUD
("Drag to orbit", "Facade scan · E57") describe what the canvas is actually
rendering. It does not claim to be a specific client's data.

### Structured data (JSON-LD)

`app/layout.tsx` emits a Schema.org `ProfessionalService` + `Person` graph
on every page. Every field in the graph is backed by content visible on
the rendered surface.

---

## 3. Still requires verification

Every item below depends on real-world documentation that hasn't yet been
confirmed. Each is marked `// VERIFY:` in the source.

### A. Additional memberships and registrations (Credentials)

- [ ] **LISAG (Licensed Surveyors Association of Ghana)** — Credentials lists
  "Principals · Licensed Surveyor". Confirm Leslie is a current LISAG-licensed
  surveyor and obtain the licence reference. If yes, replace with the licence
  number. If LISAG is not held but Leslie is licensed via another route,
  rewrite the line to match. If neither applies, remove.
- [ ] **GCAA UAV operator** — Credentials reads "where applicable". Confirm
  whether the practice holds a CAA-Ghana commercial UAV operator certificate.
  If yes, replace with the certificate reference. If no, remove the UAV
  Mapping service card or mark it as a partner-delivered service.
- [ ] **ISO 9001:2015** — currently "aligned". If a third-party certificate
  is held, name the certifying body. Otherwise "aligned" is honest but
  verify the practice operates to a quality management system.
- [ ] **ISO 17123** — applies to instruments. Verify the practice's
  instruments have current calibration certificates from a recognised
  laboratory; otherwise reword to "Instruments calibrated annually" or
  similar.

### B. Professional Indemnity (Credentials)

- [ ] Credentials reads "Cover in place · Certificate available on request".
  Confirm a current professional indemnity policy is in force. When known,
  replace with the cover figure and the underwriter.

### C. Other contact details

- [ ] **Street address** — Contact lists "Ho, Volta Region, Ghana". If a
  specific street address is willing to be published, replace it. Many sole
  practitioners deliberately publish only city + region — that is a defensible
  position.
- [ ] **Sub-offices** — Contact currently lists one office (Ho). Do not
  add Accra/Takoradi entries unless real.

### D. Stated commitments

- [ ] **"1 working day feasibility note"** — Contact "What to expect" row 01
  is now phrased as "Reply from Leslie Azumah personally". Confirm achievable
  in practice; if not, soften further.
- [ ] **"Within a week fixed-fee proposal"** — confirm achievable.

### E. Capability statement PDF

- [ ] Contact links to `/meridian-capability-2026.pdf`. This file does not
  exist in `/public`. Either produce the PDF and drop it into `public/`, or
  change the copy to "Capability statement available on request" (the link
  copy already says "available on request" — confirm whether to keep the link).

### F. Case studies — replace with real engagements

The four case studies are clearly marked as representative in `lib/projects.ts`.
Before launch, choose one of these paths per project:

1. **Replace with a real, completed engagement** where the client has agreed
   in writing to be named. Update the `client` field with the real name.
2. **Keep the representative form** and add a one-line disclosure at the top of
   the Work section, e.g. "Representative project · client confidentiality
   respected".
3. **Remove the case study** if neither of the above applies.

Per-project verification:

- [ ] **Residential Boundary Survey · Ho** — 4.2 ha, 38 plots, 152 pillars.
- [ ] **School Site Layout · Volta Region** — 1.8 ha, 9 buildings.
- [ ] **Commercial Building Setting-Out · Ho** — 1,200 m², 4 storeys.
- [ ] **Agricultural UAV Mapping · North Volta** — 84 ha, 1.5 cm GSD.

### G. Equipment list

Per-project equipment lists name specific instruments (Leica RTC360, Trimble
R12i, NavVis VLX3, DJI M350 RTK, etc.) in older case studies.

- [ ] Replace with the actual instruments the practice owns or has under
  lease. Honest list of the real kit is more credible than a wishlist.

### H. Imagery

The site uses stock photography from Unsplash for Hero, Services and Work
cards, and for the Contact background.

- [ ] When real practice photography is available (a site photo, a photo of
  Leslie at work, a finished project) drop it into `lib/images.ts` and
  update the relevant `imageKey` reference. The treatment system in
  `components/ui/media-plate.tsx` will grade it to match.

### I. Hero metric "Selected work below"

- [ ] The fourth hero metric reads "Selected work below" rather than a
  delivered count. If Leslie wants to display a count, replace with a real
  number he can defend.

### J. Brand / trade name

- [ ] "Maypels Engineering Services" is the working brand on the site. Confirm this
  matches the registered trade name. If different, update `layout.tsx`,
  `nav.tsx`, the loader, the footer, the structured data, and the metadata.

---

## Smoke tests after wiring

Run these in the browser before launch:

- [ ] Click every `mailto:` — opens to `leslie.azumah@gmail.com` with subject
- [ ] Click every `tel:` — opens to `+233543860396`
- [ ] View source — JSON-LD `<script type="application/ld+json">` present in body
- [ ] Validate the JSON-LD at <https://validator.schema.org/>
- [ ] Click every nav item (desktop + mobile menu) — each anchor scrolls to its section
- [ ] Open a case study page (e.g. `/work/residential-boundary-survey-ho`) — Mobile CTA appears, footer email/phone work, "Back to selected work" returns to `/#work`

## How to use this list

1. Section 1 is wired. Nothing to do.
2. Section 2 is safe to publish.
3. Walk through Section 3 alphabetically (A through J).
4. Search the repo for `// VERIFY:` to find every line that changes when each
   item is resolved.
