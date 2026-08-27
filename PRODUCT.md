# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js/React (user's explicit choice for a greenfield build). Static export (`output: 'export'`): no accounts, no payment gateway, no server-side booking. Cheap to host anywhere.

## Users

Leisure travellers from Kolhapur and nearby towns (Sangli, Ichalkaranji, Satara belt). Tier 2/3 buyers across all budgets: families, honeymoon couples, friends groups, and senior citizens. WhatsApp-first, price-aware, trust people over platforms. Many are vegetarian or Jain and food availability is a real decision factor. They scroll for proof (a real office, plain terms, familiar faces) before beauty. The conversion event is a WhatsApp conversation, phone call, or office visit, never an online checkout.

## Product Purpose

The website of IRL (In Real Life), a Kolhapur travel company selling India and international holiday packages. The site's only job is to start conversations: WhatsApp enquiries, calls, form submissions, office visits. Success = enquiries per week.

## Positioning

"Every trip is planned by a real person, not an app." No call centre: the person who plans the trip answers the phone during the trip. Local office you can walk into any day, 10 am to 7 pm. Counter-position to MakeMyTrip-style aggregators; same lane as Kesari/Veena World but local and personal. IRL frames itself as an experience company: it sells the memory the family brings home, then backs it with proof and support.

## Operating Context

- Enquiry flow: visitor picks a destination, taps a WhatsApp CTA ("Get My Kashmir Price on WhatsApp"), chats, gets a full day-wise plan with exact price within 24 hours, books with an advance (usually 30 percent), pays the rest in parts.
- Supplier PDFs (Paryatan Tours, not in repo) hold pax-slab net pricing, seasonal windows, and cancellation terms. Net rates NEVER reach the site. The retail "from" rates that do appear come from the owner's own customer-facing brochures, not from these.
- Trip tiers per destination: Budget / Comfort / Premium (some add Luxury). Never 3-star/4-star jargon as tier names.
- India destinations: Kashmir, Ladakh, Kerala, Andaman, Himachal, Sikkim Darjeeling, Meghalaya, South India (Mysore Coorg Wayanad Ooty). World: Dubai, Bali, Thailand, Vietnam, Sri Lanka, Cambodia, Philippines, South Africa.
- Full site copy (every page, every destination) was supplied by the owner on 2026-08-08 and lives in the site's data files; it is the copy of record.

## Capabilities and Constraints

- Pages: Home, 16 destination pages (one template), India Trips and World Trips listing pages, Plan My Trip (5-field form), How It Works (6 steps), About, Why Book With Us (7 points), Reviews, FAQ (12 questions), Contact.
- Navigation: Home | India Trips | World Trips | How It Works | Reviews | About Us | Contact. Footer quick links add FAQ.
- Global elements: rotating announcement bar, floating WhatsApp button on every page with the pre-filled message "Hi IRL, I want to plan a trip. Destination: ____. Number of people: ____. Month: ____.", footer with full contact block and the line "IRL is a Kolhapur based travel company. Every trip is planned by a real person, not an app."
- FROM PRICES ONLY (changed 2026-08-14, superseding the no-prices rule of 2026-08-08). Each destination may show ONE anchor rate, copied verbatim from the owner's print brochure so the site and the brochure never quote different numbers. Every price MUST ship with the group size it assumes, because the brochures anchor on 6 to 14 travellers depending on the destination and a couple pays roughly 25 percent more. A price without its basis is a misleading price. Flights are excluded from every rate and this must be stated. Still forbidden: per-tier price tables, net rates, third-party ticket amounts, and any implication that the anchor is the final quote. The exact price is still only given on WhatsApp. Prices are hardcoded in lib/destinations.ts and frozen at build time, so they need a manual edit and redeploy when rates move; lib/price.ts holds the one PRICES_UPDATED stamp shown to visitors.
- Deliberately excluded, do not add: blog, payment gateway, login/accounts, downloadable package PDFs.
- Forms have no backend (static export): submit composes a WhatsApp message and opens wa.me. Plan My Trip fields, exactly five: destination dropdown (+ "Not sure, suggest me"), month (+ "Flexible"), people (adults/children), budget-per-person dropdown, WhatsApp number.
- Reviews policy: publish only real reviews, never fabricate testimonials. Three real guest reviews (Akash Korgaonkar, Rounak Patil, Yugandhara Lad) were supplied by the owner on 2026-08-15, lightly edited for clarity only, and are live in lib/content.ts guestReviews. Guest photos to follow; the photo field renders when filled.

## Brand Commitments

- Name: IRL (In Real Life). Tagline: "We plan. You travel." Subline: "Holiday packages from Kolhapur to all of India and the world. Tell us your budget. We build your trip."
- Contacts live in one config constant, `lib/site.ts`. Real: the office address (334, Office No. 2A, 2nd Floor, Trade Center, Station Road, Kolhapur 416001), timings (Monday to Sunday, 10 am to 7 pm; owner corrected from 8 pm on 2026-08-15), phone +91 83246 01955 and email holidays@inrealife.in (owner-confirmed 2026-08-15). Owner confirmed one number for phone and WhatsApp for now. Still PLACEHOLDER: Instagram/Facebook/YouTube links.
- Voice: simple English, short sentences, no jargon, NO EM DASHES anywhere in copy or UI text. The site is English only: the owner removed all Marathi copy on 2026-08-10, so do not reintroduce it. Button labels from the copy doc: Plan My Trip on WhatsApp | Get My Price | See All Trips | Start Planning Now | Chat With Us.
- SEO title pattern: "[Destination] Tour Package from Kolhapur | [Duration] | IRL" (no prices in metas).
- Logo (supplied 2026-08-08, binding): black "IRL" wordmark, warm off-white panel, chartreuse lime paper-plane with contrail, "IN REAL LIFE" letterspaced. The site palette is pinned to it: near-black night ground, warm paper, lime accent, plus harmonizing supports (olive-gray secondary text, deep leaf green for green text on paper). User confirmed extra harmonizing colors are welcome. Logo file itself not yet in repo; owner to supply.
- Visual world (user-pinned rebrand, 2026-08-08): Night Flight. Supersedes the earlier Family Travel Album rendition (seed 72edd0cc) which the user rejected for its maroon palette and low wow factor. Boarding-pass paper cards with punched edges, dashed lime flight paths, airport route codes (KLH origin), Archivo Black display, Mukta body, Chivo Mono ticket data, cinematic full-bleed night hero with an animated plane. The user wants first-look wow and an experiential feel. WhatsApp deep green stays reserved for WhatsApp actions; brand lime never impersonates it. DESIGN.md records the system after the build.

## Evidence on Hand

- Destination photography: 17 verified placeholder photos in `public/photos/` (Unsplash + Wikimedia Commons, credits in `public/photos/credits.json`); owner replaces with real guest photos over time.
- Not yet available, never fabricate: guest trip photos/videos, review headshots, Google Reviews embed, real social links. Reviews, founder bio and the numbers strip went real in August 2026.
- Cancellation/payment terms come from supplier PDFs; FAQ states them in plain words without amounts.

## Product Principles

- Proof before beauty: the office, plain terms, and real faces appear early on every page.
- Every page ends in a conversation: WhatsApp first, phone second.
- Sell the experience, anchor the price, close in conversation: emotional imagery leads; a single honest "from" rate with its group-size basis tells the visitor whether the trip is in reach; inclusions and honest exclusions are one scroll away; the exact price is always one tap away on WhatsApp.
- Plain words win: if a sentence would not be said aloud across a desk in Kolhapur, rewrite it.
- Local is the moat: the office, the one person, the on-trip support differentiate IRL from every app.

## Accessibility & Inclusion

Audience is multigenerational and mobile-first on mid-range Android phones. Large tap targets, large clickable phone numbers, contrast at or above WCAG AA on the velvet ground, low data weight, comfortable base font size.
