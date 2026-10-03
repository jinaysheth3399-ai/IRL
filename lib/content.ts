// Shared page content. Copy of record supplied by the owner (2026-08-08), prices removed site-wide.

import { PRICES_VALID_UNTIL_LABEL } from '@/lib/price';

export const announcements = [
  // Reads the same date as the price stamps, so the bar can never promise a
  // different deadline from the prices underneath it.
  `Planning a Diwali trip? Prices are valid till ${PRICES_VALID_UNTIL_LABEL}. Book early.`,
  'Office in Kolhapur. Walk in any day, 10 am to 7 pm.',
];

export const trustStrip = [
  'Office in Kolhapur. Come meet us.',
  'Trips for every budget.',
  'One person handles your trip from start to end.',
  'WhatsApp support while you travel.',
];

export const howItWorksShort = [
  {
    title: 'Tell us your dream trip.',
    text: 'Message us on WhatsApp or fill one small form. Where, when, how many people, and your budget.',
  },
  {
    title: 'Get your plan in 24 hours.',
    text: 'We send you a full day-wise plan with the exact price. No hidden charges.',
  },
  {
    title: 'Book and relax.',
    text: 'Pay a small advance to confirm. We book everything. Hotels, cabs, flights, visa. You just pack your bags.',
  },
];

export const howItWorksFull = [
  {
    title: 'You tell us.',
    text: 'Message us on WhatsApp, call, fill the form, or walk into our Kolhapur office. Tell us where, when, how many people, and your budget. Not sure where to go? Tell us your budget and we will suggest.',
  },
  {
    title: 'We build your plan.',
    text: 'Within 24 hours you get a full day-wise plan on WhatsApp. Hotels with names and photos, exact price per person, what is included and what is not. Everything in writing.',
  },
  {
    title: 'You say yes.',
    text: 'Want a cheaper hotel? A bigger room? One more day? We change the plan till it fits you. No charge for changes at this stage.',
  },
  {
    title: 'Book with a small advance.',
    text: 'Pay part now, rest later. We confirm your hotels, cabs, flights and visa and send you every confirmation on WhatsApp.',
  },
  {
    title: 'Travel tension-free.',
    text: 'Before you leave, you get a full trip file: tickets, hotel vouchers, driver numbers, and a day-wise plan. During the trip, one call or message reaches the same person who planned it.',
  },
  {
    title: 'Come back and tell us everything.',
    text: 'Share your photos. Leave a review. Get a returning traveller discount on your next trip.',
  },
];

export const seasons = [
  {
    months: 'August to September',
    monthNumbers: [8, 9],
    text: 'Kerala is green and beautiful after the rains. Ladakh roads are open.',
    slugs: ['kerala', 'ladakh'],
  },
  {
    months: 'October to December',
    monthNumbers: [10, 11, 12],
    text: 'Best time for Dubai, Andaman, and Kashmir snow season starts.',
    slugs: ['dubai', 'andaman', 'kashmir'],
  },
  {
    months: 'January to March',
    monthNumbers: [1, 2, 3],
    text: 'Thailand, Vietnam, Sri Lanka. Great weather, great prices.',
    slugs: ['thailand', 'vietnam', 'sri-lanka'],
  },
];

export const whyTrust = [
  'We are from Kolhapur. You can walk into our office any day.',
  'No call centre. The person who plans your trip also picks up your call during the trip.',
  'Clear prices. What we quote is what you pay.',
  'Pure veg and Jain food options arranged on every trip.',
  'Easy payment in parts.',
];

export const whyBookPoints = [
  {
    title: 'We are local.',
    text: 'Our office is in Kolhapur. You can meet us before you pay a single rupee.',
  },
  {
    title: 'One person, start to end.',
    text: 'No call centre. No "please hold". The person who plans your trip picks up your call during the trip too.',
  },
  {
    title: 'Clear prices.',
    text: 'What we quote is what you pay. Every inclusion and exclusion in writing before you book.',
  },
  {
    title: 'Food you can eat.',
    text: 'Pure veg, Jain, or non-veg. We check food options at every hotel before we book it.',
  },
  {
    title: 'Easy payments.',
    text: 'Book with a small advance. Pay the rest in parts before the trip.',
  },
  {
    title: 'Help with everything.',
    text: 'Flights, visa, travel insurance, forex. One office for all of it.',
  },
  {
    title: 'We answer at 11 pm too.',
    text: 'If something goes wrong on your trip, we fix it. That is the whole point of booking with a real company.',
  },
];

// Real guest reviews, supplied by the owner on 2026-08-15 and lightly edited for
// clarity only; the voice and every claim are the guest's own. `photo` is filled
// in as the owner sends each guest's photo.
export type GuestReview = {
  name: string;
  tag?: string; // a short line under the name, only when the guest gave one
  text: string;
  photo?: string; // e.g. '/photos/reviews/akash.jpg'
};

export const guestReviews: GuestReview[] = [
  {
    name: 'Akash Korgaonkar',
    photo: '/photos/reviews/akash.jpg',
    tag: 'Ruggedian, Kolhapur',
    text:
      'Koustubh and his team have been planning all our family vacations for years. Happy to see them open this up to the rest of Kolhapur. If it is a vacation, it has to be IRL.',
  },
  {
    name: 'Rounak Patil',
    photo: '/photos/reviews/rounak.jpg',
    tag: 'Government contractor, Kolhapur',
    text:
      'We love the name In Real Life. The name is new, but for my family and friends the service is at least 15 years old. If it is a holiday, it is this same team. That is the trust we have in their comfort and execution.',
  },
  {
    name: 'Yugandhara and John',
    photo: '/photos/reviews/yugandhara.jpg',
    tag: 'CEO, Vitualist, Mumbai',
    text:
      'We book all our holidays only through the IRL team. They understand our taste and the exclusivity we want. What we need is trust, and with IRL we have the comfort to hand over our travel plans completely, anywhere in the world. We are based in Mumbai, but for holidays it is always IRL. Happy to see them open their new office in Kolhapur, which is my native place too.',
  },
];

export const faqs = [
  {
    q: 'How much advance do I pay to book?',
    a: 'Usually 30 percent of the trip cost. The rest is paid before the trip starts. For international trips with flights, flight cost is paid at booking.',
  },
  {
    q: 'Can I pay in parts?',
    a: 'Yes. Book with the advance and pay the balance in easy parts before departure.',
  },
  {
    q: 'What if I cancel?',
    a: 'Every trip has a clear cancellation rule that we share in writing before you book. The earlier you cancel, the more you get back. Flight tickets follow airline rules.',
  },
  {
    q: 'Is food included?',
    a: 'It depends on the trip. Most of our India trips include breakfast and dinner. We always mention it clearly. Pure veg and Jain food can be arranged everywhere.',
  },
  {
    q: 'Do you book flights too?',
    a: 'Yes. Flights, trains, hotels, cabs, visa, insurance, forex. Everything in one place.',
  },
  {
    q: 'Do you help with passports and visas?',
    a: 'We guide you for a new passport and we fully handle visas for Dubai, Vietnam, Cambodia, Sri Lanka and more.',
  },
  {
    q: 'Can senior citizens do these trips?',
    a: 'Yes. Kashmir, Kerala, South India, Sri Lanka and Dubai are all senior friendly. For Ladakh we recommend a doctor’s opinion first because of the height.',
  },
  {
    q: 'Can you change the plan for me?',
    a: 'Yes. Every plan can be changed. More days, fewer days, better hotels, different cities. Tell us what you want.',
  },
  {
    q: 'Do you do honeymoon packages?',
    a: 'Yes. Bali, Kerala, Andaman, Kashmir and Vietnam are our most booked honeymoon trips. Ask for the honeymoon plan with special stays and dinners.',
  },
  {
    q: 'Do trips start from Kolhapur?',
    a: 'Trips are priced from the arrival airport (example: Srinagar for Kashmir). We book your flights from Pune, Mumbai, Belgaum or Goa airport, whichever works best for you.',
  },
  {
    q: 'Is my money safe?',
    a: 'You get a written confirmation and receipt for every payment, and hotel vouchers with your name before you travel. And our office is right here in Kolhapur.',
  },
  {
    q: 'When should I book?',
    a: 'For summer and Diwali holidays, book 2 to 3 months early. Prices only go up closer to the date.',
  },
];

export const aboutEnglish = [
  'Big companies plan your trip through a call centre. Someone in another city, reading from a screen, who will never see your face.',
  'We do it differently. We are from Kolhapur. You can walk into our office, have a cup of tea, and plan your trip face to face. The person who plans your trip is the same person who answers your call when you are standing at the airport.',
  'We started IRL with one simple thought: people in our city dream of the same trips as people in Mumbai and Pune. Kashmir. Dubai. Bali. Europe someday. But they want someone they can trust. Someone real. Someone local.',
  'That is us. We plan. You travel.',
];

// Owner-supplied facts (2026-08-10). The 1,00,000+ figure is the team's record across
// their years in the trade, not IRL's own count, and the copy says so plainly.
// Owner-supplied bio (2026-10-03), replacing the 2026-08-10 travel-count
// version. Edited only for the house rules: no em or en dashes, the business
// named as on the Google profile ("IRL (In Real Life)" rather than "In Real
// Life Holidays"), and plain paragraphs in place of WhatsApp bold markers.
// Time-sensitive: Zepto had SEBI clearance but had not listed as of 2026-10-03;
// reword the Zepto paragraph once it does.
export const founder = {
  name: 'Koustubh Rajepandhare',
  role: 'Founder, IRL',
  photo: '/photos/founder.jpg',
  // Non-breaking spaces keep each role whole and each dot on the line it
  // follows, so a wrap never starts a line with a stray separator.
  lead: 'Entrepreneur · Startup Operator · Travel & Experiences Leader',
  story: [
    'Koustubh Rajepandhare is an entrepreneur and business leader with over 15 years of experience building and scaling businesses across technology, food-tech, quick commerce, e-commerce and travel.',
    "He founded Ressy, a restaurant-tech platform that worked with thousands of restaurants and built technology connecting restaurants, consumers and payment ecosystems. Ressy was subsequently acquired by Eatigo, the TripAdvisor-backed restaurant reservation platform, following which Koustubh took over as Eatigo's Country Lead for India, leading its expansion and operations in the country.",
    "Koustubh was later part of the core team at Zepto during its earliest days, helping build and scale one of India's first large-scale 10-minute quick-commerce operations. As part of the leadership team, he contributed to the rapid rollout of the business across cities, stores, operations and teams during the formative phase of what went on to become one of India's most recognised quick-commerce companies and is now progressing towards the public markets.",
    'His operating experience also includes leadership roles across high-growth businesses such as Groupon and Ninjacart, giving him extensive experience in scaling consumer businesses, operations and marketplaces.',
    "In the travel industry, Koustubh has managed and scaled Eagle Crest DMC's destination operations across Thailand, Bali, Vietnam and Dubai, gaining deep on-ground experience in contracting, destination management, holiday operations and customer experience across some of Asia's most popular outbound travel markets.",
    'At IRL (In Real Life), Koustubh brings together this combination of technology-led thinking, large-scale operations and destination expertise to build a travel company focused on one simple objective: making holiday planning more transparent, personalised and dependable.',
    'His philosophy for IRL is straightforward: use technology to simplify travel, but never take the human expertise out of it.',
  ],
};
