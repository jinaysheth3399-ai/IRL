import type { Metadata } from 'next';
import Link from 'next/link';
import { whyBookPoints } from '@/lib/content';

export const metadata: Metadata = {
  title: { absolute: 'Why Book With IRL' },
  description: 'Seven plain reasons families from Kolhapur and nearby towns book their trips with IRL.',
};

const rotations = [-0.8, 0.6, -0.5, 0.7, -0.6, 0.8, -0.4];

export default function WhyUsPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <h1 style={{ marginBottom: '2rem' }}>Why families choose IRL</h1>
          <div className="grid-2">
            {whyBookPoints.map((point, i) => (
              <div
                key={point.title}
                className="note"
                style={
                  i === whyBookPoints.length - 1
                    ? { transform: `rotate(${rotations[i]}deg)`, gridColumn: '1 / -1', maxWidth: '44rem', width: '100%', justifySelf: 'center' }
                    : { transform: `rotate(${rotations[i]}deg)` }
                }
              >
                <i className="tape" aria-hidden="true" />
                <p className="hand" style={{ color: 'var(--kumkum-deep)', fontWeight: 700, fontSize: '1.05rem' }}>
                  Reason {i + 1}
                </p>
                <h3 style={{ margin: '0.25rem 0 0.5rem' }}>{point.title}</h3>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link className="btn btn-primary" href="/plan-my-trip/">
              Plan My Trip
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
