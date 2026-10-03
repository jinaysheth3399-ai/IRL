import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHead, WaButton } from '@/components/ui';
import { guestReviews } from '@/lib/content';
import { defaultWaMessage, site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Reviews | Real trips, real people' },
  description:
    'What IRL travellers say in their own words. Real guests, real names. Ask us on WhatsApp for traveller references any time.',
};

export default function ReviewsPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1.5rem' }}>Real trips. Real people. Real reviews.</h1>
          <div className="grid-3">
            {guestReviews.map((r, i) => (
              <figure key={r.name} className="note" style={{ transform: `rotate(${[-0.6, 0.7, -0.4][i % 3]}deg)` }}>
                <i className="tape" aria-hidden="true" />
                {r.photo ? <img className="review-photo" src={r.photo} alt={r.name} loading="lazy" /> : null}
                <blockquote>
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <figcaption className="review-byline hand">
                  <span>
                    {r.name}
                    {r.tag ? (
                      <>
                        <br />
                        <span style={{ fontWeight: 400 }}>{r.tag}</span>
                      </>
                    ) : null}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          {/* Links rather than a widget: a reviews widget needs a third-party
              script or a paid API, and this site is static. The Google listing
              holds every review, not only the three we chose to show. */}
          <div
            style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem 1.75rem' }}
          >
            <a className="btn btn-ghost" href={site.google.reviews} target="_blank" rel="noopener noreferrer">
              Read all our reviews on Google
            </a>
            <p style={{ color: 'var(--cream-soft)' }}>
              Travelled with us?{' '}
              <a href={site.google.writeReview} target="_blank" rel="noopener noreferrer">
                Leave a review on Google
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* More references, one tap away */}
      <section className="section">
        <div className="container">
          <SectionHead title="Want to hear it directly?" />
          <div className="note" style={{ maxWidth: '44rem', transform: 'rotate(-0.5deg)' }}>
            <i className="tape" aria-hidden="true" />
            <p>
              Ask us on WhatsApp for traveller references. We will connect you with guests who have taken the trip you
              are planning.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <WaButton message={defaultWaMessage}>Ask us on WhatsApp</WaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Every page ends in a conversation */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Want to be on this page? Take a trip with us.</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <Link className="btn btn-primary" href="/plan-my-trip/">
              Plan My Trip
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
