import type { Metadata } from 'next';
import { Archivo, Chivo_Mono, Mukta } from 'next/font/google';
import './globals.css';
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
  title: {
    default: 'IRL Kolhapur | Travel Agency for India and International Tour Packages',
    template: '%s | IRL',
  },
  description:
    "Kolhapur's own travel company. Kashmir, Kerala, Dubai, Bali and more. Tell us your budget, we plan your trip. WhatsApp us today.",
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
