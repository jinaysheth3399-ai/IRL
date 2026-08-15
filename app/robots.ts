import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

// Everything is open, including AI crawlers (GPTBot, ClaudeBot, PerplexityBot):
// nearly half of local trip recommendations now come through AI assistants, and
// a Kolhapur agency wants to be citable, not invisible. Only the enquiry form's
// thank-you states carry nothing worth crawling, and they are client-side only.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
