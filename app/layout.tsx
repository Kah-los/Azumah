import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono-var",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif-var",
});

// VERIFY: replace with the firm's real production domain when known
const SITE_URL = "https://maypels.com";

export const metadata: Metadata = {
  title: "Maypels Engineering Services · Leslie Azumah · Land Surveyor · Ho, Ghana",
  description:
    "A land surveying and engineering practice based in Ho, Volta Region, led by Leslie Azumah, Member of the Ghana Institution of Surveyors. Land surveying, cadastral, topographic, engineering and UAV mapping.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  authors: [{ name: "Leslie Azumah" }],
  openGraph: {
    title: "Maypels Engineering Services · Ho, Volta Region",
    description:
      "Land surveying and engineering practice led by Leslie Azumah, Member of the Ghana Institution of Surveyors. Cadastral, setting-out, topographic, engineering and UAV mapping in the Volta Region and Greater Accra.",
    url: SITE_URL,
    type: "website",
    siteName: "Maypels Engineering Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maypels Engineering Services · Ho, Ghana",
    description:
      "Land surveying and engineering practice led by Leslie Azumah, Member of the Ghana Institution of Surveyors.",
  },
};

/**
 * Schema.org structured data — describes the practice and the principal,
 * for search engine results and AI agents that consume JSON-LD.
 *
 * Every claim below mirrors what is on the page and what is verifiable.
 * Do not add fields here that cannot be backed up on the rendered surface.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#practice`,
      name: "Maypels Engineering Services",
      description:
        "Land surveying and engineering practice based in Ho, Volta Region, Ghana. Land surveying, boundary and cadastral, construction setting-out, topographic, engineering and UAV mapping.",
      url: SITE_URL,
      telephone: "+233-54-386-0396",
      email: "leslie.azumah@gmail.com",
      areaServed: [
        { "@type": "AdministrativeArea", name: "Volta Region" },
        { "@type": "AdministrativeArea", name: "Greater Accra" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ho",
        addressRegion: "Volta Region",
        addressCountry: "GH",
      },
      founder: { "@id": `${SITE_URL}/#leslie-azumah` },
      employee: { "@id": `${SITE_URL}/#leslie-azumah` },
      serviceType: [
        "Land Surveying",
        "Boundary and Cadastral",
        "Construction Setting-Out",
        "Topographic Surveys",
        "Engineering Surveys",
        "UAV Mapping",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#leslie-azumah`,
      name: "Leslie Azumah",
      jobTitle: "Principal Surveyor",
      email: "leslie.azumah@gmail.com",
      telephone: "+233-54-386-0396",
      worksFor: { "@id": `${SITE_URL}/#practice` },
      memberOf: {
        "@type": "Organization",
        name: "Ghana Institution of Surveyors",
        alternateName: "GhIS",
      },
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ho",
          addressRegion: "Volta Region",
          addressCountry: "GH",
        },
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        {children}
      </body>
    </html>
  );
}
