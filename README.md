# IRL - In Real Life · Website

The website of IRL, a Kolhapur travel company. Built with Next.js as a fully static site: no accounts, no payment gateway, no server. Every call to action opens WhatsApp, a phone call, or the office.

## Run it

```bash
npm install
npm run dev        # develop at http://localhost:3000
npm run build      # static export into ./out
```

Deploy the `out/` folder to any static host (Netlify, Vercel, Cloudflare Pages, or plain hosting).

## Before launch: replace the placeholders

1. **Contact details**: everything lives in [lib/site.ts](lib/site.ts). Fill in the real phone number, WhatsApp number (international format, digits only), email, office address, map query, and social links. One file updates the whole site.
2. **Photos**: `public/photos/` holds stock and Wikimedia placeholder images (credits in `public/photos/credits.json`). Replace them with real guest photos over time; keep the same file names.
3. **Reviews**: the site shows clearly labelled sample cards. Collect real reviews (name, city, trip, photo, ideally a 20 second video) and replace the samples in [lib/content.ts](lib/content.ts). Never publish invented reviews.
4. **About page**: add the founder's real name, photo, and two lines. Fill the numbers strip only with real numbers.
5. **Prices**: the site deliberately shows no prices anywhere. Price happens in the WhatsApp conversation. Keep it that way.

## Where the content lives

- [lib/destinations.ts](lib/destinations.ts): all 16 trips (day plans, tiers, inclusions, things to know).
- [lib/content.ts](lib/content.ts): homepage sections, how it works, why book with us, FAQ, about copy.
- Voice rules: simple English, short sentences, no em dashes, no prices.

## Utility scripts

- `node scripts/fetch-photos.mjs` re-downloads placeholder photography.
- `node scripts/shoot.mjs` captures desktop and mobile screenshots of every key page into `.impeccable/shots/` (needs `npm run build` first and Microsoft Edge installed).
