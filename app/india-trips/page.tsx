import type { Metadata } from 'next';
import Link from 'next/link';
import { TripCard, PlanTripButton } from '@/components/ui';
import { indiaTrips } from '@/lib/destinations';
import { fare, PRICES_UPDATED } from '@/lib/price';

export const metadata: Metadata = {
  title: 'India Tour Packages from Kolhapur',
  description:
    'Kashmir, Ladakh, Kerala, Andaman, Himachal and more. Eight trips across India, planned person to person from Kolhapur. Get your exact price on WhatsApp.',
};

const rotations = [-3.2, 2.4, -1.6, 3, -2.4, 1.5, -3.6, 2.8];

export default function IndiaTripsPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <h1>India Trips</h1>
          <p style={{ marginTop: '1rem', color: 'var(--cream-soft)', fontSize: '1.15rem' }}>
            Eight trips across India, planned person to person from Kolhapur.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="grid-cards">
            {indiaTrips.map((d, i) => (
              <TripCard
                key={d.slug}
                slug={d.slug}
                name={d.name}
                durationShort={d.durationShort}
                photo={d.photo}
                rotate={rotations[i % rotations.length]}
                code={d.code}
                fare={fare(d.priceFrom)}
              />
            ))}
          </div>
          <p className="fare-footnote">From prices are group rates. Prices updated {PRICES_UPDATED}.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note" style={{ maxWidth: '44rem', marginInline: 'auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <i className="tape" aria-hidden="true" />
            <h2>Not sure which trip fits?</h2>
            <p style={{ margin: '0.75rem auto 1.5rem' }}>Message us. We suggest the right trip for your group and budget.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center' }}>
              <PlanTripButton />
              <Link className="btn btn-ghost" href="/world-trips/" style={{ color: 'var(--ink)' }}>
                See World Trips
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
