import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHead, WaButton } from '@/components/ui';
import { sampleReviews } from '@/lib/content';
import { defaultWaMessage } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Reviews | Real trips, real people' },
  description: 'Every review on this page will be from a real IRL traveller. We are collecting our first written reviews now.',
};

export default function ReviewsPage() {
  return (
    <>
      {/* Honest empty state first */}
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1.5rem' }}>Real trips. Real people. Real reviews.</h1>
          <div className="note" style={{ maxWidth: '44rem', transform: 'rotate(-0.6deg)' }}>
            <i className="tape" aria-hidden="true" />
            <p>
              We are collecting our first written reviews right now. Every review on this page will be from a real IRL
              traveller, with their name, their city and their own photos. Until then, ask us on WhatsApp for traveller
              references.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <WaButton message={defaultWaMessage}>Ask us on WhatsApp</WaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Sample cards, visibly labelled, waiting for real ones */}
      <section className="section">
        <div className="container">
          <SectionHead title="What this page will hold" />
          <div className="grid-3">
            {sampleReviews.map((r, i) => (
              <figure key={r.name} className="note" style={{ transform: `rotate(${[-0.6, 0.7, -0.4][i]}deg)` }}>
                <i className="tape" aria-hidden="true" />
                <p className="hand" style={{ color: 'var(--kumkum-deep)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  Sample card, to be replaced
                </p>
                <blockquote>
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <figcaption className="hand" style={{ marginTop: '0.7rem', color: 'var(--ink-soft)', fontWeight: 700 }}>
                  {r.name}
                  <br />
                  <span style={{ fontWeight: 400 }}>{r.trip}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          {/* Owner: embed the Google Reviews widget here once the Google Business profile has reviews. */}
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
