import type { Metadata } from 'next';
import { Archivo, Chivo_Mono, Mukta } from 'next/font/google';
import './globals.css';
import { site, siteUrl } from '@/lib/site';
import { AnnouncementBar, Footer } from '@/components/chrome';
import { Header } from '@/components/site-header';
import { FloatingWhatsApp } from '@/components/floating-wa';
import { SiteLoader } from '@/components/loader';

const display = Archivo({
  weight: ['600', '800', '900'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const hand = Chivo_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
});

const body = Mukta({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Under 60 characters so it survives the SERP uncut; city and category first.
    default: 'Travel Agency in Kolhapur for India and World Trips | IRL',
    template: '%s | IRL',
  },
  description:
    "Kolhapur's own travel company. Kashmir, Kerala, Dubai, Bali and more. Tell us your budget, we plan your trip. WhatsApp us today.",
  // './' resolves per page, so every route canonicalises to its own apex URL
  // (www 308s here; Vercel previews would otherwise index as duplicates).
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    siteName: site.fullName,
    locale: 'en_IN',
    images: ['/photos/hero.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

// Real facts only: address, hours, logo, phone and email are owner-confirmed.
// The social links are still placeholders in lib/site.ts, so they stay out of
// the schema until they are real; a fabricated NAP is worse than a sparse one.
const agencyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: site.fullName,
  url: siteUrl,
  image: `${siteUrl}/brand/irl-lockup.png`,
  slogan: site.tagline,
  telephone: '+919324601955',
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '334, Office No. 2A, 2nd Floor, Trade Center, Station Road',
    addressLocality: 'Kolhapur',
    addressRegion: 'Maharashtra',
    postalCode: '416001',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '10:00',
    closes: '19:00',
  },
};

const contract = `
DIRECTION CONTRACT (impeccable)
THESIS: The site is a night departure from Kolhapur: black sky, warm paper boarding passes, and one lime plane that carries the visitor from the office to sixteen destinations. It refuses the travel-portal arrangement and shows no prices anywhere.
OWN-WORLD: Palette pinned by the IRL logo: near-black night, warm paper, chartreuse lime, olive-gray support, deep leaf green for green text on paper. Archivo Black display, Mukta body, Chivo Mono ticket data. Boarding-pass cards with punched edges, dashed lime flight paths, corner ticks. WhatsApp deep green appears only on WhatsApp actions; brand lime never does.
STORY: A family lands in the dark cinematic hero, watches the lime plane draw its route, browses destinations as boarding passes, reads the plan in plain words, taps WhatsApp to get the price.
FIRST VIEWPORT: Full-bleed night photo; huge "We plan. You travel." with lime accent; a dashed lime flight path draws itself and the plane rides it; two actions; punched boarding-stub proof strip beneath.
FORM: Night Flight, user-pinned rebrand from the IRL logo; supersedes the album rendition of seed 72edd0cc.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${hand.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* In the initial server-rendered HTML, as structured-data guidance
            requires; escaped so nothing in the data can close the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyJsonLd).replace(/</g, '\\u003c') }}
        />
        {/* Runs before first paint: a repeat visitor in the same session must never
            see a flash of the intro before React can take it down. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('irl-loader-seen'))document.documentElement.setAttribute('data-loader-seen','')}catch(e){}`,
          }}
        />
        {/* Without JS the loader can never dismiss itself, so it must not exist. */}
        <noscript>
          <style>{`.site-loader{display:none!important}`}</style>
        </noscript>
        <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: `<!--${contract}-->` }} />
        <SiteLoader />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
