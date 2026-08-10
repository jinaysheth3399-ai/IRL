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

"Every trip is planned by a real person, not an app." No call centre: the person who plans the trip answers the phone during the trip. Local office you can walk into any day, 10 am to 8 pm. Counter-position to MakeMyTrip-style aggregators; same lane as Kesari/Veena World but local and personal. IRL frames itself as an experience company: it sells the memory the family brings home, then backs it with proof and support.

## Operating Context

- Enquiry flow: visitor picks a destination, taps a WhatsApp CTA ("Get My Kashmir Price on WhatsApp"), chats, gets a full day-wise plan with exact price within 24 hours, books with an advance (usually 30 percent), pays the rest in parts.
- Supplier PDFs (Paryatan Tours, not in repo) hold pax-slab net pricing, seasonal windows, and cancellation terms. Pricing data NEVER reaches the site.
- Trip tiers per destination: Budget / Comfort / Premium (some add Luxury). Never 3-star/4-star jargon as tier names.
- India destinations: Kashmir, Ladakh, Kerala, Andaman, Himachal, Sikkim Darjeeling, Meghalaya, South India (Mysore Coorg Wayanad Ooty). World: Dubai, Bali, Thailand, Vietnam, Sri Lanka, Cambodia, Philippines, South Africa.
- Full site copy (every page, every destination) was supplied by the owner on 2026-08-08 and lives in the site's data files; it is the copy of record.

## Capabilities and Constraints

- Pages: Home, 16 destination pages (one template), India Trips and World Trips listing pages, Plan My Trip (5-field form), How It Works (6 steps), About, Why Book With Us (7 points), Reviews, FAQ (12 questions), Contact.
- Navigation: Home | India Trips | World Trips | How It Works | Reviews | About Us | Contact. Footer quick links add FAQ.
- Global elements: rotating announcement bar, floating WhatsApp button on every page with the pre-filled message "Hi IRL, I want to plan a trip. Destination: ____. Number of people: ____. Month: ____.", footer with full contact block and the line "IRL is a Kolhapur based travel company. Every trip is planned by a real person, not an app."
- NO PRICES anywhere on the site, ever: no package prices, no "starting from" figures, no tier prices, no third-party ticket amounts. The user confirmed this on 2026-08-08, overriding the price tables in the supplied copy (which are B2B net rates). Price lives only in the WhatsApp conversation and the office. The Plan My Trip budget dropdown (visitor stating their own budget) and the FAQ's "usually 30 percent advance" payment term are allowed; specific rupee/dollar amounts are not.
- Deliberately excluded, do not add: blog, payment gateway, login/accounts, downloadable package PDFs.
- Forms have no backend (static export): submit composes a WhatsApp message and opens wa.me. Plan My Trip fields, exactly five: destination dropdown (+ "Not sure, suggest me"), month (+ "Flexible"), people (adults/children), budget-per-person dropdown, WhatsApp number.
- Reviews policy: publish only real reviews. Sample cards must be visibly labelled as samples to replace. Never fabricate testimonials presented as genuine.

## Brand Commitments

- Name: IRL (In Real Life). Tagline: "We plan. You travel." Subline: "Holiday packages from Kolhapur to all of India and the world. Tell us your budget. We build your trip."
- PLACEHOLDER contacts (owner will fill; keep in one config constant `lib/site.ts`): phone, WhatsApp number, email, full office address, Instagram/Facebook/YouTube links, Google Maps location. Timings are real: Monday to Sunday, 10 am to 8 pm.
- Voice: simple English, short sentences, no jargon, NO EM DASHES anywhere in copy or UI text. The site is English only: the owner removed all Marathi copy on 2026-08-10, so do not reintroduce it. Button labels from the copy doc: Plan My Trip on WhatsApp | Get My Price | See All Trips | Start Planning Now | Chat With Us.
- SEO title pattern: "[Destination] Tour Package from Kolhapur | [Duration] | IRL" (no prices in metas).
- Logo (supplied 2026-08-08, binding): black "IRL" wordmark, warm off-white panel, chartreuse lime paper-plane with contrail, "IN REAL LIFE" letterspaced. The site palette is pinned to it: near-black night ground, warm paper, lime accent, plus harmonizing supports (olive-gray secondary text, deep leaf green for green text on paper). User confirmed extra harmonizing colors are welcome. Logo file itself not yet in repo; owner to supply.
- Visual world (user-pinned rebrand, 2026-08-08): Night Flight. Supersedes the earlier Family Travel Album rendition (seed 72edd0cc) which the user rejected for its maroon palette and low wow factor. Boarding-pass paper cards with punched edges, dashed lime flight paths, airport route codes (KLH origin), Archivo Black display, Mukta body, Chivo Mono ticket data, cinematic full-bleed night hero with an animated plane. The user wants first-look wow and an experiential feel. WhatsApp deep green stays reserved for WhatsApp actions; brand lime never impersonates it. DESIGN.md records the system after the build.

## Evidence on Hand

- Destination photography: 17 verified placeholder photos in `public/photos/` (Unsplash + Wikimedia Commons, credits in `public/photos/credits.json`); owner replaces with real guest photos over time.
- Not yet available, never fabricate: real reviews, guest photos/videos, founder name/photo/bio, real traveller counts (numbers strip on About stays as placeholders), Google Reviews embed. These render as clearly labelled placeholders on the owner's replacement list.
- Cancellation/payment terms come from supplier PDFs; FAQ states them in plain words without amounts.

## Product Principles

- Proof before beauty: the office, plain terms, and real faces appear early on every page.
- Every page ends in a conversation: WhatsApp first, phone second.
- Sell the experience, keep the price in conversation: emotional imagery leads; inclusions and honest exclusions are one scroll away; the exact price is always one tap away on WhatsApp.
- Plain words win: if a sentence would not be said aloud across a desk in Kolhapur, rewrite it.
- Local is the moat: the office, the one person, the on-trip support differentiate IRL from every app.

## Accessibility & Inclusion

Audience is multigenerational and mobile-first on mid-range Android phones. Large tap targets, large clickable phone numbers, contrast at or above WCAG AA on the velvet ground, low data weight, comfortable base font size.
