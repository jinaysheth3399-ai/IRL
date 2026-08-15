import type { MetadataRoute } from 'next';
import { destinations } from '@/lib/destinations';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

// Static export: generated once at build. Priorities follow the funnel: the
// destination pages are where price-intent searches should land, the listing
// pages gather them, and the utility pages trail.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority,
  });

  return [
    page('/', 1),
    page('/india-trips/', 0.9),
    page('/world-trips/', 0.9),
    ...destinations.map((d) => page(`/trips/${d.slug}/`, 0.8)),
    page('/plan-my-trip/', 0.7),
    page('/how-it-works/', 0.6),
    page('/why-us/', 0.5),
    page('/reviews/', 0.5),
    page('/about/', 0.5),
    page('/faq/', 0.5),
    page('/contact/', 0.5),
  ];
}
