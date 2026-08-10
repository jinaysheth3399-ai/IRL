import type { Metadata } from 'next';
import { WaButton } from '@/components/ui';
import { defaultWaMessage } from '@/lib/site';
import { howItWorksFull } from '@/lib/content';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Six simple steps from one WhatsApp message to your full trip. A real person in Kolhapur plans it, books it, and answers your call during the trip.',
};

const rotations = [-1, 0.8, -0.7, 1.1, -0.9, 0.6];

export default function HowItWorksPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container" style={{ maxWidth: '52rem', textAlign: 'center' }}>
          <h1>From one message to your dream trip. Here is exactly how.</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2.75rem' }}>
        <div className="container">
          <ol style={{ listStyle: 'none', maxWidth: '52rem', marginInline: 'auto', display: 'grid', gap: '2.25rem' }}>
            {howItWorksFull.map((step, i) => (
              <li
                key={step.title}
                className="note"
                style={{
                  transform: `rotate(${rotations[i % rotations.length]}deg)`,
                  width: 'min(100%, 42rem)',
                  justifySelf: i % 2 ? 'end' : 'start',
                }}
              >
                <i className="tape" aria-hidden="true" />
                <p className="hand" style={{ color: 'var(--kumkum-deep)', fontWeight: 700, fontSize: '1.05rem' }}>
                  Step {i + 1}
                </p>
                <h3 style={{ margin: '0.25rem 0 0.5rem' }}>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note" style={{ maxWidth: '44rem', marginInline: 'auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <i className="tape" aria-hidden="true" />
            <h2>Start with one message.</h2>
            <div style={{ marginTop: '1.25rem' }}>
              <WaButton message={defaultWaMessage}>Start With One Message</WaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
