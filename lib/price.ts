import type { PriceFrom } from '@/lib/destinations';

/** Hand-edited when the owner re-quotes. One string, every surface. */
export const PRICES_UPDATED = 'August 2026';

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
