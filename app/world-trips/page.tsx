import type { Metadata } from 'next';
import Link from 'next/link';
import { TripCard, WaButton } from '@/components/ui';
import { worldTrips } from '@/lib/destinations';
import { defaultWaMessage } from '@/lib/site';

export const metadata: Metadata = {
  title: 'International Tour Packages from Kolhapur',
  description:
    'Dubai, Bali, Thailand, Vietnam and more. Eight trips across the world, with full visa and flight help from our Kolhapur office. Get your exact price on WhatsApp.',
};

const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.8];

export default function WorldTripsPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <h1>World Trips</h1>
          <p style={{ marginTop: '1rem', color: 'var(--cream-soft)', fontSize: '1.15rem' }}>
            Eight trips across the world, with full visa and flight help from our Kolhapur office.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="grid-cards">
            {worldTrips.map((d, i) => (
              <TripCard
                key={d.slug}
                slug={d.slug}
                name={d.name}
                durationShort={d.durationShort}
                photo={d.photo}
                rotate={rotations[(i + 3) % rotations.length]}
                code={d.code}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note" style={{ maxWidth: '44rem', marginInline: 'auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <i className="tape" aria-hidden="true" />
            <h2>Not sure which trip fits?</h2>
            <p style={{ margin: '0.75rem auto 1.5rem' }}>Message us. We suggest the right trip for your group and budget.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center' }}>
              <WaButton message={defaultWaMessage}>Plan My Trip on WhatsApp</WaButton>
              <Link className="btn btn-ghost" href="/india-trips/" style={{ color: 'var(--ink)' }}>
                See India Trips
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
