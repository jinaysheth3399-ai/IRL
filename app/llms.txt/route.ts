import { destinations } from '@/lib/destinations';
import { founder } from '@/lib/content';
import { site, siteUrl } from '@/lib/site';

// Rendered once at build, like robots.txt and sitemap.xml, so it always lists
// exactly the trips the site sells.
export const dynamic = 'force-static';

/**
 * /llms.txt: a plain-text summary of the business for AI systems, in the
 * llmstxt.org shape (an H1, a one-paragraph summary, then sections of links).
 *
 * Honest about its value: Google Search ignores this file (Google's AI
 * optimization guide, 2026), and no major AI provider has confirmed reading
 * other sites' copies. It costs nothing, it counts in Lighthouse's agent
 * checks, and it is in place if that changes.
 *
 * No prices on purpose: they are dated and change with every brochure, and a
 * summary that outlived a price would keep repeating it. Trip pages carry them.
 */

type Trip = (typeof destinations)[number];

const sentence = (s: string) => {
  const t = s.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
};

const tripLine = (d: Trip) =>
  `- [${d.name}](${siteUrl}/trips/${d.slug}/): ${sentence(d.duration)} Best time: ${sentence(d.bestTime)} Good for: ${d.goodFor.join(', ')}.`;

export function GET() {
  const india = destinations.filter((d) => d.region === 'india');
  const world = destinations.filter((d) => d.region === 'world');

  const text = [
    `# ${site.fullName} (${site.name})`,
    '',
    `> ${site.fullName} (${site.name}) is a travel agency at Trade Center, Station Road, Kolhapur, Maharashtra, India. It plans holiday packages across India and abroad, and custom trips, for families from Kolhapur and nearby towns. One person plans each trip and stays the contact during it.`,
    '',
    `- Office: ${site.address}. Open ${site.timings}. Walk-ins welcome, no appointment needed.`,
    `- Phone and WhatsApp: +91 ${site.phoneDisplay}. Email: ${site.email}.`,
    `- Google Business Profile: ${site.google.profile}`,
    `- Founder: ${founder.name}, an entrepreneur with over 15 years of experience building and scaling businesses across technology, food-tech, quick commerce, e-commerce and travel. He founded the restaurant-tech platform Ressy (acquired by Eatigo), was part of Zepto's early core team, and has managed destination operations across Thailand, Bali, Vietnam and Dubai.`,
    '- Team: 20 years of combined experience in the travel industry. Over those years the team has planned trips for more than 1,00,000 travellers, mostly through other travel agents. IRL now plans trips directly for families.',
    '- Flights: IRL books flights from any airport to anywhere in the world, including Kolhapur, Pune, Mumbai, Belagavi and Goa.',
    '- Visas: IRL helps with visas for its international trips and checks the current rule for your dates before you pay.',
    '- Food: pure vegetarian and Jain food can be arranged. IRL checks the food options at each hotel before booking it.',
    '- Prices: each trip page shows one "from" price per person, the group size it assumes and the date it is valid until. Flights are not included. The exact price for your group is sent on WhatsApp.',
    '',
    '## Trips in India',
    '',
    ...india.map(tripLine),
    '',
    '## Trips abroad',
    '',
    ...world.map(tripLine),
    '',
    '## Planning and booking',
    '',
    `- [Plan my trip](${siteUrl}/plan-my-trip/): the enquiry form. Tell IRL where, when and how many people; a person replies on WhatsApp.`,
    `- [How it works](${siteUrl}/how-it-works/): from the first message to the trip, step by step.`,
    `- [FAQ](${siteUrl}/faq/): advance and payments, cancellations, food, flights, visas, senior travellers and honeymoons.`,
    '',
    '## About IRL',
    '',
    `- [About IRL](${siteUrl}/about/): the founder, the team and why IRL started in Kolhapur.`,
    `- [Why families choose IRL](${siteUrl}/why-us/)`,
    `- [Guest reviews](${siteUrl}/reviews/): reviews from IRL's guests, with a link to IRL's Google reviews.`,
    `- [Contact](${siteUrl}/contact/): address, hours, phone, WhatsApp and map.`,
    '',
    '## Optional',
    '',
    `- [Digital Franchise Partner programme](${siteUrl}/digital-franchise/): for people who want to start a travel business with IRL's training and support. This is not a holiday offer.`,
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    '',
  ].join('\n');

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
