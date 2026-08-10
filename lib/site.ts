// One place for every contact detail. Replace the PLACEHOLDER values before launch.
export const site = {
  name: 'IRL',
  fullName: 'IRL - In Real Life',
  tagline: 'We plan. You travel.',
  subline: 'Holiday packages from Kolhapur to all of India and the world. Tell us your budget. We build your trip.',
  city: 'Kolhapur',

  // PLACEHOLDER: real phone number, digits only for links, pretty for display.
  phoneDisplay: '98XXX XXXXX',
  phoneLink: 'tel:+919800000000',
  // PLACEHOLDER: WhatsApp number in international format, digits only.
  whatsappNumber: '919800000000',
  // PLACEHOLDER: office email.
  email: 'hello@irltravel.in',
  address: '334, Office No. 2A, 2nd Floor, Trade Center, Station Road, Kolhapur 416001',
  timings: 'Monday to Sunday, 10 am to 8 pm',
  landmarkLine: 'We are in Trade Center on Station Road, 2nd floor. Walk-ins welcome, no appointment needed.',

  // PLACEHOLDER: social links.
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  youtube: 'https://youtube.com/',

  // Drives the footer map link and the embedded map on Contact.
  mapsQuery: 'Trade Center, Station Road, Kolhapur, Maharashtra 416001',

  bottomLine: 'IRL is a Kolhapur based travel company. Every trip is planned by a real person, not an app.',
};

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage =
  'Hi IRL, I want to plan a trip. Destination: ____. Number of people: ____. Month: ____.';
