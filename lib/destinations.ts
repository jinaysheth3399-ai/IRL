// Copy of record: supplied by the owner (2026-08-08).
//
// Prices (added 2026-08-14) are the "from" rates off the owner's own print
// brochures, so a customer holding a brochure and a customer on the site never
// see two different numbers. They are anchors only: the exact quote still
// happens on WhatsApp, which is why every price ships with its group-size basis.

export type Tier = { name: string; note: string };

/**
 * The lowest advertised rate for a destination, taken verbatim from the owner's
 * print brochures so the site and the brochure never quote different numbers.
 *
 * `basis` is not fine print. Each brochure anchors its "from" rate on a different
 * group size (6 to 14 travellers), so the same trip costs a couple noticeably
 * more. The basis has to be readable next to the number or the price misleads.
 */
export type PriceFrom = {
  amount: string; // formatted for display, e.g. '17,500' or '385'
  currency: 'INR' | 'USD';
  pax: string; // group size the rate assumes, e.g. '12' or '6 to 9'
  per?: 'person' | 'adult'; // Dubai's brochure quotes per adult
};

export type Destination = {
  slug: string;
  name: string;
  region: 'india' | 'world';
  code: string;
  heroLine: string;
  intro: string;
  goodFor: string[];
  bestTime: string;
  duration: string;
  durationShort: string;
  altDuration?: string;
  photo: string;
  caption: string;
  tiers: Tier[];
  /** Absent where we have no current brochure rate. Those pages show no price. */
  priceFrom?: PriceFrom;
  groupNote?: string;
  days?: string[];
  daysTitle?: string;
  daysSummary?: string;
  included: string[];
  notIncluded: string[];
  thingsToKnow: string[];
};

export const destinations: Destination[] = [
  {
    slug: 'kashmir',
    name: 'Kashmir',
    region: 'india',
    code: 'SXR',
    heroLine: 'Kashmir. Snow, lakes, and a houseboat night you will remember forever.',
    intro:
      'Srinagar, Gulmarg, Pahalgam and Sonmarg. Gardens, shikara rides, and mountains all around. This is the most loved family trip in India.',
    goodFor: ['Family', 'Honeymoon', 'Senior Citizens', 'Friends'],
    bestTime: 'March to October for gardens and greenery. December to February for snow.',
    duration: '6 Nights 7 Days (3N Srinagar, 2N Pahalgam, 1N Houseboat)',
    durationShort: '6N 7D',
    photo: '/photos/kashmir.jpg',
    caption: 'Morning shikara on Dal Lake',
    tiers: [
      { name: 'Budget', note: 'Good 3-star hotels, deluxe houseboat.' },
      { name: 'Comfort', note: 'Better hotels, premium houseboat.' },
      { name: 'Premium', note: '4-star hotels, premium houseboat.' },
    ],
    priceFrom: { amount: '17,500', currency: 'INR', pax: '12' },
    groupNote:
      'Travelling as 2? Price goes up a little. Group of 6 or more? Price drops. Ask us for your exact number.',
    daysTitle: 'Your 7 days',
    days: [
      'Day 1: Land in Srinagar. Visit Pari Mahal and gardens. Relax.',
      'Day 2: Full day Gulmarg. Cable car ride to the snow (ticket extra).',
      'Day 3: Drive to Pahalgam. Dry fruit market and apple valley on the way.',
      'Day 4: Full day Pahalgam. Aaru Valley, Betaab Valley, Chandanwari.',
      'Day 5: Back to Srinagar. Nishat and Shalimar gardens. One hour shikara ride on Dal Lake.',
      'Day 6: Day trip to Sonmarg. Glacier and river views. Night in houseboat.',
      'Day 7: Fly back home with a full heart.',
    ],
    included: [
      'Hotels and houseboat',
      'Breakfast and dinner daily',
      'Private car for the full trip',
      'Airport pick up and drop',
      'One hour shikara ride',
      'All taxes',
    ],
    notIncluded: [
      'Flights',
      'Gulmarg cable car ticket',
      'Local union taxis at Gulmarg, Pahalgam and Sonmarg',
      'Pony rides and lunch',
    ],
    thingsToKnow: [
      'Snow jeep is compulsory on the Gulmarg road from late December to mid March. We tell you the exact cost with your plan.',
      'Carry warm clothes even in summer.',
      'Pure veg food is easily available.',
    ],
  },
  {
    slug: 'ladakh',
    name: 'Ladakh',
    region: 'india',
    code: 'IXL',
    heroLine: 'Ladakh. The trip of a lifetime. Mountains like nowhere else on Earth.',
    intro:
      'Leh, Nubra Valley, and the famous blue Pangong Lake. High roads, camel rides on sand dunes, and stars like you have never seen.',
    goodFor: ['Friends', 'Couples', 'Adventure lovers'],
    bestTime: 'May to early October. Closed rest of the year.',
    duration: '6 Nights 7 Days (3N Leh, 2N Nubra, 1N Pangong)',
    durationShort: '6N 7D',
    altDuration: 'A 7N 8D option with Turtuk village or Kargil is also available.',
    photo: '/photos/ladakh.jpg',
    caption: 'The road to Leh, somewhere past the clouds',
    tiers: [
      { name: 'Budget', note: 'Clean guest houses and camps.' },
      { name: 'Comfort', note: '3-star hotels and better camps.' },
      { name: 'Premium', note: '4-star hotels and the best camps at Pangong.' },
    ],
    priceFrom: { amount: '17,900', currency: 'INR', pax: '12' },
    groupNote: 'Group of 6 travelling together? Price drops a lot. Ask us.',
    daysTitle: 'Your 7 days',
    days: [
      'Day 1: Land in Leh. Full rest day. Your body needs it at this height.',
      'Day 2: Leh sightseeing. Monasteries, Magnetic Hill, Sangam point.',
      'Day 3: Drive over Khardung La, one of the highest roads in the world, to Nubra Valley.',
      'Day 4: Visit Turtuk, the last village of India.',
      'Day 5: Drive to Pangong Lake. Night in a camp by the lake.',
      'Day 6: Sunrise at Pangong. Drive back to Leh.',
      'Day 7: Fly home.',
    ],
    included: [
      'All stays',
      'Breakfast and dinner daily',
      'Private vehicle',
      'Ladakh entry and wildlife fees',
      'Airport transfers',
      'One oxygen cylinder in the vehicle for the high altitude days',
    ],
    notIncluded: [
      'Flights',
      'Monument entry tickets',
      'Adventure activities like ATV ride and camel ride',
      'GST',
    ],
    thingsToKnow: [
      'Day 1 rest is compulsory. The first day at this height feels heavy for everyone, and that is normal.',
      'If you have a serious heart or breathing problem, please talk to your doctor before booking.',
      'Only veg food is served at Nubra and Pangong.',
      'Electricity in camps runs from 7 pm to 11 pm.',
      'Carry a valid photo ID.',
    ],
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    region: 'india',
    code: 'COK',
    heroLine: 'Kerala. Green hills, calm backwaters, and the most relaxing trip in India.',
    intro:
      'Tea gardens of Munnar, wildlife at Thekkady, a boat ride in Alleppey, and beaches at Kovalam. Kerala is slow, green and beautiful.',
    goodFor: ['Honeymoon', 'Family', 'Senior Citizens'],
    bestTime: 'September to March. Fresh and green after the rains.',
    duration: '7 Nights 8 Days (Alleppey, Kumarakom, Thekkady, Munnar, Kochi)',
    durationShort: '7N 8D',
    altDuration: 'An 8 Nights option with Kovalam beach is also available.',
    photo: '/photos/kerala.jpg',
    caption: 'Slow morning on the backwaters',
    tiers: [
      { name: 'Comfort', note: 'Good hotels, AC car for the full trip.' },
      { name: 'Premium', note: 'Better rooms, lake view stays.' },
    ],
    priceFrom: { amount: '22,350', currency: 'INR', pax: '10' },
    groupNote:
      'Honeymoon couple? Ask us for the special honeymoon plan with candle light dinner and flower bed decoration.',
    daysTitle: 'Your 8 days',
    days: [
      'Day 1: Land in Kochi. Drive to Alleppey. Beach sunset.',
      'Day 2: Kumarakom. Relax by Vembanad Lake.',
      'Day 3: Drive to Thekkady through spice gardens.',
      'Day 4: Periyar lake boat ride. Evening Kathakali or martial arts show.',
      'Day 5: Drive to Munnar. Tea museum and botanical garden.',
      'Day 6: Full day Munnar. Eravikulam park, dams, and view points.',
      'Day 7: Drive to Kochi. Fort Kochi, Chinese fishing nets, Marine Drive.',
      'Day 8: Fly home.',
    ],
    included: [
      'All hotels',
      'Breakfast daily',
      'AC private car with driver',
      'All tolls and taxes',
      'Airport pick up and drop',
    ],
    notIncluded: [
      'Flights',
      'Entry tickets',
      'Houseboat stay (can be added, ask us)',
      'Lunch and dinner',
      'GST',
    ],
    thingsToKnow: [
      'Hill station hotels in Munnar and Thekkady have non-AC rooms because the weather is cool.',
      'Jain and pure veg food is available everywhere.',
      'Add one night in a houseboat if your budget allows. It is worth it.',
    ],
  },
  {
    slug: 'andaman',
    name: 'Andaman',
    region: 'india',
    code: 'IXZ',
    heroLine: "Andaman. Clean blue water, white sand, and India's best beaches.",
    intro:
      "Port Blair, Havelock and Neil Island. Asia's best beach at Radhanagar, water sports, and the story of Cellular Jail. A foreign-feeling trip without a passport.",
    goodFor: ['Honeymoon', 'Family', 'Beach lovers'],
    bestTime: 'October to May. Avoid June to September (heavy rain).',
    duration: '5 Nights 6 Days (3N Port Blair, 1N Havelock, 1N Neil)',
    durationShort: '5N 6D',
    altDuration: 'A 6 Nights option with 2 nights at Havelock is also available.',
    photo: '/photos/andaman.jpg',
    caption: 'Radhanagar Beach, just before sunset',
    tiers: [
      { name: 'Budget', note: 'Clean 2-star hotels. Breakfast and dinner included.' },
      { name: 'Comfort', note: '3-star deluxe hotels and beach resorts.' },
      { name: 'Premium', note: '4-star hotels.' },
      { name: 'Luxury', note: '5-star beach resorts like Sea Shell and Barefoot.' },
    ],
    priceFrom: { amount: '21,800', currency: 'INR', pax: '6' },
    daysTitle: 'Your 6 days',
    days: [
      "Day 1: Land at Port Blair. Corbyn's Cove beach. Evening light and sound show at Cellular Jail.",
      'Day 2: Boat trip to Ross Island and North Bay. Snorkelling and sea walk available.',
      'Day 3: Private cruise to Havelock. Radhanagar Beach, one of the best in Asia.',
      'Day 4: Boat to Neil Island. Bharatpur beach, Laxmanpur sunset point, Natural Bridge.',
      'Day 5: Cruise back to Port Blair. Evening free for shopping.',
      'Day 6: Fly home.',
    ],
    included: [
      'All hotels',
      'Breakfast and dinner daily',
      'AC car for all transfers',
      'Private cruise tickets between islands',
      'All entry permits and ferry tickets',
      'Help at every airport and jetty',
    ],
    notIncluded: ['Flights', 'Water sports like scuba, sea walk and jet ski', 'GST'],
    thingsToKnow: [
      'Carry a valid photo ID for every traveller.',
      'Ferry timings depend on weather.',
      'Book scuba in advance through us to get a fixed slot.',
    ],
  },
  {
    slug: 'himachal',
    name: 'Himachal',
    region: 'india',
    code: 'IXC',
    heroLine: 'Himachal. Snow points, mall roads, and mountain air. The classic hill trip.',
    intro:
      'Manali and Shimla with Solang Valley, Atal Tunnel, and Kufri. Simple, beautiful, and easy on the pocket.',
    goodFor: ['Family', 'Honeymoon', 'First-time hill trip'],
    bestTime: 'All year. March to June for pleasant weather. December to February for snow.',
    duration: '6 Nights 7 Days (4N Manali, 2N Shimla)',
    durationShort: '6N 7D',
    altDuration: 'A big 9 Nights 10 Days option adds Dharamshala, Dalhousie and Amritsar.',
    photo: '/photos/himachal.jpg',
    caption: 'Fresh snow above Manali',
    tiers: [
      { name: 'Comfort', note: 'Good hotels, breakfast and dinner included.' },
      { name: 'Premium', note: 'Premium rooms with balcony and views.' },
    ],
    priceFrom: { amount: '20,950', currency: 'INR', pax: '6' },
    daysTitle: 'Your 7 days',
    days: [
      'Day 1: Arrive Chandigarh. Drive to Manali.',
      'Day 2: Manali local. Hadimba Temple, Club House, Vashisht hot springs.',
      'Day 3: Solang Valley and Atal Tunnel. Paragliding and zorbing available.',
      'Day 4: Jogni waterfall and free time on Mall Road.',
      'Day 5: Drive to Shimla. Kullu shawl factory and river rafting point on the way.',
      'Day 6: Kufri and Shimla city. Jakhu Temple, Mall Road, Scandal Point.',
      'Day 7: Drive to Chandigarh. Journey home.',
    ],
    included: [
      'Hotels',
      'Breakfast and dinner daily',
      'Private car from Chandigarh to Chandigarh',
      'All tolls, parking and driver charges',
    ],
    notIncluded: [
      'Train or flight to Chandigarh',
      'Adventure activities',
      'Rohtang Pass permit (subject to government rules)',
      'GST',
    ],
    thingsToKnow: [
      'Rohtang Pass stays closed every Tuesday.',
      'Room heaters in winter may cost extra as per hotel rules.',
      'AC in the car stays off on hill climbs. That is normal for every hill station.',
    ],
  },
  {
    slug: 'sikkim-darjeeling',
    name: 'Sikkim Darjeeling',
    region: 'india',
    code: 'IXB',
    heroLine: 'Sikkim and Darjeeling. Monasteries, toy train town, and Kanchenjunga views.',
    intro:
      'Gangtok, the flower valley of Yumthang, quiet Pelling, and the tea gardens of Darjeeling. The full North East classic in one trip.',
    goodFor: ['Family', 'Couples', 'Nature lovers'],
    bestTime: 'March to June and October to December. Yumthang flowers bloom in April and May.',
    duration: '8 Nights 9 Days (3N Gangtok, 2N Lachung, 1N Pelling, 2N Darjeeling)',
    durationShort: '8N 9D',
    photo: '/photos/sikkim-darjeeling.jpg',
    caption: 'Kanchenjunga above the tea gardens',
    tiers: [
      { name: 'Budget', note: 'Good hotels, breakfast and dinner included.' },
      { name: 'Comfort', note: 'Better hotels and premium rooms.' },
      { name: 'Premium', note: 'The best available in each town.' },
    ],
    priceFrom: { amount: '21,850', currency: 'INR', pax: '6' },
    daysTitle: 'Your 9 days',
    days: [
      'Day 1: Arrive Bagdogra. Drive to Gangtok. Evening on MG Road.',
      'Day 2: Tsomgo Lake and Baba Mandir. Snow point (Nathula optional, permit needed).',
      'Day 3: Drive to Lachung in North Sikkim.',
      'Day 4: Yumthang, the Valley of Flowers.',
      'Day 5: Back to Gangtok.',
      'Day 6: Drive to Pelling. Kanchenjunga views on a clear day.',
      'Day 7: Drive to Darjeeling. Evening at Mall.',
      'Day 8: Early morning Tiger Hill sunrise. Batasia Loop, monastery, zoo, tea gardens.',
      'Day 9: Drive to Bagdogra. Fly home.',
    ],
    included: [
      'All hotels',
      'Breakfast and dinner daily',
      'Private vehicle for the full route',
      'All permits, tolls and driver charges',
      'A tour coordinator on call through the trip',
    ],
    notIncluded: [
      'Flights or train',
      'Entry tickets',
      'Ropeway and rafting',
      'Nathula permit cost (if open)',
      'Room heater charges',
      'GST',
    ],
    thingsToKnow: [
      'Hills mean non-AC rooms and vehicles, and that is fine because the weather is cool.',
      'Nathula opening depends on the army and weather.',
      'Carry ID cards for permits.',
    ],
  },
  {
    slug: 'meghalaya',
    name: 'Meghalaya',
    region: 'india',
    code: 'GAU',
    heroLine: 'Meghalaya. Waterfalls, crystal clear rivers, and the cleanest village in Asia.',
    intro:
      "Shillong, Cherrapunjee, the glass-like Umngot river at Dawki, and Kamakhya temple in Guwahati. India's most beautiful secret.",
    goodFor: ['Friends', 'Couples', 'Photographers'],
    bestTime: 'October to May. In monsoon the waterfalls are at full power but it rains a lot.',
    duration: '6 Nights 7 Days (3N Shillong, 1N Dawki, 2N Guwahati)',
    durationShort: '6N 7D',
    photo: '/photos/meghalaya.jpg',
    caption: 'Nohkalikai Falls, Cherrapunjee',
    tiers: [],
    groupNote:
      'The per-person price depends on your group size. Groups of 6 or 8 pay less than a group of 4. Tell us your number and we send the exact price.',
    daysTitle: 'Your 7 days',
    days: [
      'Day 1: Arrive Guwahati. Drive to Shillong past Umiam Lake. Elephant Falls and Shillong Peak.',
      'Day 2: Cherrapunjee day trip. Nohkalikai Falls, Seven Sisters Falls, Mawsmai caves.',
      'Day 3: Mawlynnong, the cleanest village in Asia. Living Root Bridge. Night at Dawki.',
      'Day 4: Boat ride on the crystal clear Umngot river. Krangsuri waterfall. Back to Shillong.',
      'Day 5: Laitlum Canyon views. Drive to Guwahati.',
      'Day 6: Maa Kamakhya temple darshan. Brahmaputra river cruise in the evening.',
      'Day 7: Fly home.',
    ],
    priceFrom: { amount: '27,250', currency: 'INR', pax: '6' },
    included: [
      'All hotels',
      'Breakfast and dinner daily',
      'Mineral water daily',
      'Private vehicle',
      'All driver and parking charges',
    ],
    notIncluded: ['Flights', 'Boat ride and cruise tickets', 'VIP darshan at Kamakhya', 'GST'],
    thingsToKnow: [
      'Roads are good but hilly.',
      'Dawki boat ride is best in November to April when the water is clearest.',
    ],
  },
  {
    slug: 'south-india',
    name: 'South India',
    region: 'india',
    code: 'BLR',
    heroLine: 'Mysore, Coorg, Wayanad, Ooty. Palaces, coffee estates and hill stations in one trip.',
    intro:
      'Mysore Palace, the coffee land of Coorg, green Wayanad, and the queen of hills Ooty. A perfect road trip for families.',
    goodFor: ['Family', 'Senior Citizens', 'Couples'],
    bestTime: 'September to May.',
    duration: '7 Nights 8 Days (1N Mysore, 2N Coorg, 2N Wayanad, 2N Ooty)',
    durationShort: '7N 8D',
    photo: '/photos/south-india.jpg',
    caption: 'Temple towers of the south',
    tiers: [
      { name: 'Comfort', note: 'Good hotels and resorts, breakfast included.' },
      { name: 'Premium', note: 'Better resorts with views.' },
    ],
    priceFrom: { amount: '28,950', currency: 'INR', pax: '10' },
    daysTitle: 'Your 8 days',
    days: [
      'Day 1: Arrive Bangalore. Drive to Mysore. Palace, Chamundi Hills, Brindavan Gardens fountain show.',
      'Day 2: Drive to Coorg. Golden Buddha temple at Bylakuppe on the way.',
      "Day 3: Dubare Elephant Camp, Raja's Seat, Madikeri Fort.",
      'Day 4: Drive to Wayanad. Pookode Lake.',
      'Day 5: Wayanad sightseeing. Iruppu Falls.',
      'Day 6: Drive to Ooty. Botanical Garden, Ooty Lake, Doddabetta Peak.',
      "Day 7: Coonoor day trip. Sim's Park, Dolphin's Nose, tea gardens.",
      'Day 8: Drive to Coimbatore. Fly home.',
    ],
    included: [
      'All hotels',
      'Breakfast daily',
      'AC vehicle for the full trip',
      'All tolls, parking and driver charges',
    ],
    notIncluded: ['Flights', 'Entry tickets', 'Lunch and dinner', 'GST'],
    thingsToKnow: [
      'Hill station rooms are non-AC.',
      'The drive is part of the fun on this trip, so keep the camera ready.',
    ],
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    region: 'world',
    code: 'DXB',
    heroLine: "Dubai. The world's tallest building, desert safari, and shopping heaven.",
    intro:
      'Burj Khalifa, Dubai Mall, desert safari with dinner, dhow cruise, and the grand BAPS Hindu temple in Abu Dhabi. Dubai is the easiest first foreign trip.',
    goodFor: ['Family', 'Friends', 'First foreign trip'],
    bestTime: 'October to March. Summer is very hot.',
    duration: '5 Nights 6 Days',
    durationShort: '5N 6D',
    altDuration: 'A 7 Nights option with a 2 night Abu Dhabi stay and Yas Island parks is also available.',
    photo: '/photos/dubai.jpg',
    caption: 'Burj Khalifa at golden hour',
    tiers: [],
    groupNote: 'Flights and visa are extra. We book both for you and quote everything together on WhatsApp.',
    daysTitle: 'Your 6 days',
    days: [
      'Day 1: Land in Dubai. Check in and relax.',
      'Day 2: Dubai city tour, monorail ride to Atlantis, evening dhow cruise with dinner.',
      'Day 3: Desert safari. Dune bashing, camel ride, BBQ dinner and shows.',
      'Day 4: Dubai Mall and Burj Khalifa 124th floor.',
      'Day 5: Abu Dhabi day trip with BAPS Hindu Mandir.',
      'Day 6: Fly home.',
    ],
    priceFrom: { amount: '35,300', currency: 'INR', pax: '6', per: 'adult' },
    included: [
      'Hotel with breakfast',
      'All transfers in a private vehicle',
      'City tour',
      'Dhow cruise with dinner',
      'Desert safari with dinner',
      'Burj Khalifa ticket',
      'Abu Dhabi tour with temple entry',
      'Tourism tax',
    ],
    notIncluded: ['Flights', 'Visa', 'Travel insurance', 'Lunch', 'GST and TCS'],
    thingsToKnow: [
      'Dubai visa is easy and comes in 3 to 4 working days. We do the full visa process for you.',
      'Carry a passport valid for at least 6 months.',
    ],
  },
  {
    slug: 'bali',
    name: 'Bali',
    region: 'world',
    code: 'DPS',
    heroLine: 'Bali. Temples, rice fields, beach clubs and the most beautiful honeymoon island.',
    intro:
      'Ubud jungles, the famous Bali swing, Tanah Lot sea temple, and water sports at Nusa islands. Bali gives you a 5-star feel at an India-like price.',
    goodFor: ['Honeymoon', 'Couples', 'Friends'],
    bestTime: 'April to October. Avoid heavy rain months of January and February.',
    duration: '5 Nights 6 Days (3N Ubud or Kuta, 2N Seminyak or Nusa Dua)',
    durationShort: '5N 6D',
    photo: '/photos/bali.jpg',
    caption: 'Ulun Danu temple on the lake',
    tiers: [],
    groupNote:
      'Your plan includes a private car with driver, the Kintamani volcano tour, the Ubud tour, a water sports day, Uluwatu sunset with the Kecak dance, and one candle light dinner for couples.',
    included: [
      'Hotel or private pool villa',
      'Breakfast daily',
      'Private car with English speaking driver',
      'All tours as per plan',
      'Airport transfers',
    ],
    notIncluded: ['Flights', 'Visa on arrival', 'Water sports tickets', 'Lunch and dinner', 'GST and TCS'],
    thingsToKnow: [
      'Indians get visa on arrival in Bali. Carry a passport valid for 6 months.',
      'Pool villa upgrade is the best money you will spend on a honeymoon.',
    ],
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    region: 'world',
    code: 'BKK',
    heroLine: 'Thailand. Beaches, street food, islands and the best value foreign trip.',
    intro:
      "Bangkok temples and malls, Pattaya's Coral Island, or the beach life of Phuket and Krabi. Thailand is cheap, fun, and easy.",
    goodFor: ['Friends', 'Family', 'Couples'],
    bestTime: 'November to March.',
    duration: '4 Nights 5 Days (Bangkok + Pattaya) or 5 Nights 6 Days (Phuket + Krabi)',
    durationShort: '4N 5D',
    photo: '/photos/thailand.jpg',
    caption: 'Longtail boats at Railay',
    tiers: [],
    groupNote:
      'Your plan includes hotels with breakfast, the Coral Island tour with lunch, the Bangkok city and temple tour, Safari World or island hopping, and all transfers.',
    included: [
      'Hotels with breakfast',
      'All tours with tickets as per plan',
      'All transfers',
      'English speaking guide on tour days',
    ],
    notIncluded: [
      'Flights',
      'Visa if applicable (Thailand has been visa free for Indians in recent seasons, we confirm the latest rule when you book)',
      'Lunch and dinner unless mentioned',
      'GST and TCS',
    ],
    thingsToKnow: [
      'Thai street food is a trip highlight but pure veg restaurants and Indian restaurants are easy to find.',
      'Carry a passport valid for 6 months.',
    ],
  },
  {
    slug: 'vietnam',
    name: 'Vietnam',
    region: 'world',
    code: 'HAN',
    heroLine: 'Vietnam. Ha Long Bay cruise, golden bridge, and the new favourite of Indian travellers.',
    intro:
      'Hanoi, a night on a Ha Long Bay cruise, the Golden Hands Bridge at Ba Na Hills in Da Nang, and lantern-lit Hoi An. Vietnam is beautiful and very affordable.',
    goodFor: ['Couples', 'Friends', 'Photographers'],
    bestTime: 'October to April.',
    duration: '6 Nights 7 Days (2N Hanoi, 1N Ha Long cruise, 3N Da Nang with Hoi An)',
    durationShort: '6N 7D',
    photo: '/photos/vietnam.jpg',
    caption: 'Ha Long Bay from the top deck',
    tiers: [],
    included: [
      'Hotels with breakfast',
      'One night cruise stay with all meals on the cruise',
      'Ba Na Hills ticket with cable car',
      'Hoi An tour',
      'All transfers',
      'English speaking guide',
    ],
    notIncluded: ['Flights', 'E-visa', 'Lunch and dinner unless mentioned', 'GST and TCS'],
    thingsToKnow: [
      'Vietnam e-visa takes 4 to 5 working days. We apply for you.',
      'The Ha Long cruise night is the highlight, do not skip it.',
    ],
  },
  {
    slug: 'sri-lanka',
    name: 'Sri Lanka',
    region: 'world',
    code: 'CMB',
    heroLine: 'Sri Lanka. Ramayana trail, hill trains, safaris and beaches. All in one small island.',
    intro:
      "Sigiriya rock fortress, Kandy's Temple of the Tooth, tea hills of Nuwara Eliya, leopard safari at Yala, and Bentota beach. Sri Lanka packs everything into one week.",
    goodFor: ['Family', 'Senior Citizens', 'Ramayana yatra groups'],
    bestTime: 'September to March.',
    duration: '7 Nights 8 Days (2N Sigiriya, 1N Kandy, 1N Nuwara Eliya, 1N Yala, 2N Bentota)',
    durationShort: '7N 8D',
    altDuration: 'An 8 Nights option is also available.',
    photo: '/photos/sri-lanka.jpg',
    caption: 'Sigiriya, the Lion Rock',
    tiers: [
      { name: 'Comfort', note: 'Good hotels through the route.' },
      { name: 'Premium', note: 'Better rooms and views.' },
      { name: 'Luxury', note: 'Cinnamon hotels through the trip.' },
    ],
    priceFrom: { amount: '385', currency: 'USD', pax: '8' },
    daysTitle: 'Your 8 days',
    days: [
      'Day 1: Land in Colombo. Drive to Sigiriya.',
      'Day 2: Climb Sigiriya rock. Dambulla cave temple. Village tour.',
      'Day 3: Kandy. Temple of the Tooth and cultural dance show.',
      'Day 4: Nuwara Eliya. Hanuman temple, Ramboda falls, tea factory, Gregory Lake.',
      'Day 5: Yala. Evening jeep safari, spot leopards and elephants.',
      'Day 6: Drive to Bentota. Madu river boat ride and turtle farm.',
      'Day 7: Beach day and water sports at Bentota.',
      'Day 8: Colombo city tour and fly home.',
    ],
    included: [
      'Hotels',
      'Breakfast and dinner daily',
      'Private AC vehicle with English speaking driver guide',
      'Water bottle daily',
      'All taxes',
    ],
    notIncluded: [
      'Flights',
      'Entry tickets for Sigiriya and the Yala safari',
      'Visa (free entry for Indians currently, we confirm at booking)',
      'Lunch',
      'GST and TCS',
    ],
    thingsToKnow: [
      'For Ramayana yatra groups we run a special temple-focused plan with Seetha Amman temple and Ashok Vatika.',
      'Dress modestly at temples. Shoulders and knees covered.',
    ],
  },
  {
    slug: 'cambodia',
    name: 'Cambodia',
    region: 'world',
    code: 'REP',
    heroLine: 'Cambodia. Angkor Wat, the largest temple in the world, built for Lord Vishnu.',
    intro:
      "Siem Reap and the mighty Angkor Wat, Bayon's smiling faces, the Tomb Raider temple, 1000 Shivlings on Kulen mountain, and floating villages. A dream trip for history and temple lovers.",
    goodFor: ['Temple and history lovers', 'Couples', 'Senior Citizens'],
    bestTime: 'October to March.',
    duration: '4 Nights 5 Days (all in Siem Reap)',
    durationShort: '4N 5D',
    photo: '/photos/cambodia.jpg',
    caption: 'Angkor Wat in still water',
    tiers: [
      { name: 'Comfort', note: 'Good hotel with breakfast.' },
      { name: 'Premium', note: 'Resort and spa stay.' },
    ],
    priceFrom: { amount: '23,596', currency: 'INR', pax: '6 to 9' },
    daysTitle: 'Your 5 days',
    days: [
      'Day 1: Land in Siem Reap. Relax.',
      'Day 2: Full day Angkor tour. Angkor Thom, Bayon temple, Ta Prohm and the great Angkor Wat with its Samudra Manthan carvings.',
      'Day 3: Kulen mountain. 1000 Shivlings in the river and the royal waterfall.',
      'Day 4: Optional Tonle Sap floating village boat trip. Evening Apsara dance show.',
      'Day 5: Fly home.',
    ],
    included: [
      'Hotel with breakfast',
      'Private AC vehicle',
      'English speaking guide',
      'Government taxes',
      'Water bottles',
    ],
    notIncluded: [
      'Flights',
      'Angkor entry ticket',
      'Visa (we arrange it)',
      'Lunch and dinner',
      'Tips',
      'GST and TCS',
    ],
    thingsToKnow: [
      'The Angkor carvings tell full stories from the Ramayana and Mahabharata. Take the guide, it changes the whole experience.',
      'Sunrise at Angkor Wat is worth the early alarm.',
    ],
  },
  {
    slug: 'philippines',
    name: 'Philippines',
    region: 'world',
    code: 'MNL',
    heroLine: "Philippines. Boracay's white beach, island hopping, and clear blue water.",
    intro:
      "Manila's history, three days on Boracay's famous White Beach, and Cebu's islands. For travellers who want a beach trip beyond the usual.",
    goodFor: ['Honeymoon', 'Beach lovers', 'Friends'],
    bestTime: 'November to May.',
    duration: '7 Nights 8 Days (2N Manila, 3N Boracay, 2N Cebu)',
    durationShort: '7N 8D',
    photo: '/photos/philippines.jpg',
    caption: 'Blue lagoons of Palawan',
    tiers: [
      { name: 'Comfort', note: '3-star hotels through the trip.' },
      { name: 'Premium', note: '4-star hotels through the trip.' },
      { name: 'Luxury', note: '5-star hotels through the trip.' },
    ],
    priceFrom: { amount: '69,170', currency: 'INR', pax: '11 to 14' },
    daysSummary:
      'Manila city tour with lunch, then three days on Boracay with island hopping and a land tour, then Cebu with its twin city tour. Beach time built in every day.',
    included: [
      'All hotels with breakfast',
      'Manila city tour with lunch',
      'Boracay island hopping with lunch',
      'Boracay land tour with lunch',
      'Cebu twin city tour',
      'All airport transfers',
      'Entrance fees',
      'English speaking guide',
      'Water on tour days',
    ],
    notIncluded: [
      'International flights',
      'Domestic flights inside Philippines',
      'Visa',
      'Tips and terminal fees',
      'GST and TCS',
    ],
    thingsToKnow: [
      'This trip has two internal flights, so pack light.',
      'Boracay sunset sailing is the cheapest happiness you will ever buy.',
    ],
  },
  {
    slug: 'south-africa',
    name: 'South Africa',
    region: 'world',
    code: 'JNB',
    heroLine: "South Africa. Lions in the wild, Table Mountain, and the world's most beautiful drive.",
    intro:
      "Johannesburg, Sun City's Valley of Waves, real jungle safaris at Mabula, the Garden Route, and Cape Town. The big dream trip.",
    goodFor: ['Family', 'Couples', 'Wildlife lovers'],
    bestTime: 'May to October for safaris. November to March for Cape Town beaches.',
    duration: '10 Nights 11 Days (1N Johannesburg, 2N Sun City, 1N Mabula, 3N Garden Route, 3N Cape Town)',
    durationShort: '10N 11D',
    photo: '/photos/south-africa.jpg',
    caption: 'Sunset game drive at Mabula',
    tiers: [
      { name: 'Superior', note: 'Well rated hotels through the route.' },
      { name: 'Deluxe', note: 'Better hotels and rooms.' },
      { name: 'Luxury', note: 'Palace of the Lost City at Sun City.' },
    ],
    priceFrom: { amount: '1,35,677', currency: 'INR', pax: '10' },
    daysSummary:
      'Johannesburg casino evening, two days at Sun City water park, morning and evening game drives at Mabula with all meals, Cango Caves and ostrich farm on the Garden Route, Knysna waterfront, then Cape Town: Table Mountain cable car, penguin colony, Cape of Good Hope, and the V and A Waterfront.',
    included: [
      'All hotels and the safari lodge',
      'Breakfast daily',
      'All meals at Mabula',
      'Two game drives',
      'Table Mountain cable car',
      'Cape Point funicular',
      'Penguin park',
      'Seal island cruise',
      'Guided city tours',
      'All transfers',
    ],
    notIncluded: [
      'Flights (international and one internal flight)',
      'Visa',
      'Lunch and dinner except at Mabula',
      'Tips',
      'GST and TCS',
    ],
    thingsToKnow: [
      'South Africa visa takes time, apply 45 to 60 days early. We guide you through the full file.',
      'One internal flight (Johannesburg to George) is booked separately.',
    ],
  },
];

export const indiaTrips = destinations.filter((d) => d.region === 'india');
export const worldTrips = destinations.filter((d) => d.region === 'world');

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function waMessageFor(name: string): string {
  return `Hi IRL, I want the exact price for ${name}. We are ____ people, travelling in ____.`;
}
