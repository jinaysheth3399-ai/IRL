import type { PriceFrom } from '@/lib/destinations';

/**
 * How long the published from-prices hold. Hand-edited when the owner re-quotes.
 * One date drives every surface: the stamp on each trip, the footnotes under
 * the trip lists, the announcement bar and the offers' priceValidUntil.
 * Owner-set 2026-10-03: every from-price holds until the end of October 2026.
 */
export const PRICES_VALID_UNTIL = '2026-10-31';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** '2026-10-31' becomes '31 October 2026'. No locale data, so build and browser agree. */
export const PRICES_VALID_UNTIL_LABEL = (() => {
  const [y, m, d] = PRICES_VALID_UNTIL.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
})();

/**
 * The caveat that keeps a "from" rate honest. It ships on every priced page,
 * not only the five destinations that happen to carry a groupNote of their own,
 * because a from-price without it misleads a couple by roughly 25 percent.
 */
export const GROUP_NOTE =
  'Travelling as 2? Price goes up a little. Group of 6 or more? Price drops. Ask us for your exact number.';

/** Printed as a mono word, never a glyph, so a third currency costs one entry. */
const CURRENCY_WORD: Record<PriceFrom['currency'], string> = { INR: 'Rs', USD: 'USD' };
/** Spoken form: "RS" and "USD" do not read aloud reliably. */
const CURRENCY_SPOKEN: Record<PriceFrom['currency'], string> = { INR: 'rupees', USD: 'US dollars' };

export type Fare = {
  currency: string; // 'Rs' | 'USD'
  amount: string; // '17,500'
  unit: string; // 'per person' | 'per adult'
  basis: string; // '12 travellers sharing' | '11 to 14 travellers sharing'
  spoken: string; // full sentence for assistive tech
};

/**
 * Nullable in, nullable out. Call sites pass `d.priceFrom` straight through and
 * render on the result, so an unpriced destination cannot reach a fare element.
 */
export function fare(p?: PriceFrom | null): Fare | null {
  if (!p) return null;
  const unit = `per ${p.per ?? 'person'}`;
  const basis = `${p.pax} travellers sharing`;
  return {
    currency: CURRENCY_WORD[p.currency],
    amount: p.amount,
    unit,
    basis,
    spoken: `From ${p.amount} ${CURRENCY_SPOKEN[p.currency]} ${unit}, ${basis}, flights not included.`,
  };
}
