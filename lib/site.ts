// One place for every contact detail. Replace the PLACEHOLDER values before launch.

/** Canonical origin. Vercel previews and www both resolve here. */
export const siteUrl = 'https://inrealife.in';

export const site = {
  // Owner-confirmed 2026-10-03: the business is "In Real Life" and "IRL" is its
  // short form. No other name: not "IRL - In Real Life", not "In Real Life
  // Holidays". The full name matches the Google Business Profile exactly.
  name: 'IRL',
  fullName: 'In Real Life',
  tagline: 'We plan. You travel.',
  subline: 'Holiday packages from Kolhapur to all of India and the world. Tell us your budget. We build your trip.',
  city: 'Kolhapur',

  // Real number, owner-confirmed 2026-08-15.
  phoneDisplay: '93246 01955',
  phoneLink: 'tel:+919324601955',
  // Same number for WhatsApp until the owner says there is a separate
  // WhatsApp Business line; the old value was a fabricated placeholder.
  whatsappNumber: '919324601955',
  // Real inbox, owner-confirmed 2026-08-15.
  email: 'holidays@inrealife.in',
  address: '334, Office No. 2A, 2nd Floor, Trade Center, Station Road, Kolhapur 416001',
  timings: 'Monday to Sunday, 10 am to 7 pm',
  landmarkLine: 'We are in Trade Center on Station Road, 2nd floor. Walk-ins welcome, no appointment needed.',

  // PLACEHOLDER: social links.
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  youtube: 'https://youtube.com/',

  // Google Business Profile, set up by the owner 2026-10-03. Every map link
  // points at the listing itself rather than an address search, which on
  // Station Road lands on a cluster of other Trade Centre businesses. The cid
  // and place id are the same listing (the place id decodes to the cid's
  // feature id), and the pin is the one on the profile.
  google: {
    profile: 'https://maps.google.com/?cid=8335604660928947464',
    embed: 'https://maps.google.com/maps?cid=8335604660928947464&output=embed',
    reviews: 'https://search.google.com/local/reviews?placeid=ChIJzUMK3LcBwTsRCKXCckYErnM',
    writeReview: 'https://search.google.com/local/writereview?placeid=ChIJzUMK3LcBwTsRCKXCckYErnM',
    lat: 16.703809,
    lng: 74.239323,
  },

  bottomLine: 'IRL is a Kolhapur based travel company. Every trip is planned by a real person, not an app.',
};

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Sent by the straight-to-chat buttons (header, floating pill, FAQ, Reviews).
// No blanks to fill in: asking someone to do data entry inside a chat box is
// worse than just asking them in the conversation. Trip enquiries go through the
// form instead, which sends a fully filled message.
export const defaultWaMessage = 'Hi IRL, I want to plan a trip.';
