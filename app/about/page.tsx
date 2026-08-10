import type { Metadata } from 'next';
import { SectionHead } from '@/components/ui';
import { aboutEnglish, founder } from '@/lib/content';

export const metadata: Metadata = {
  title: { absolute: 'About IRL | We are In Real Life' },
  description: 'IRL is a Kolhapur travel company. Walk into our office, have a cup of tea, and plan your trip face to face.',
};

export default function AboutPage() {
  return (
    <>
      {/* Our story, in plain words */}
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1.25rem' }}>We are IRL. In Real Life.</h1>
          <div style={{ maxWidth: '68ch' }}>
            {aboutEnglish.map((para, i) =>
              i === aboutEnglish.length - 1 ? (
                <p
                  key={para}
                  className="hand"
                  style={{ marginTop: '1.5rem', color: 'var(--marigold)', fontSize: '1.55rem', fontWeight: 700, lineHeight: 1.35 }}
                >
                  {para}
                </p>
              ) : (
                <p key={para} style={{ marginTop: i === 0 ? 0 : '1rem', color: 'var(--cream)' }}>
                  {para}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      {/* Founder: the real face and the real record */}
      <section className="section">
        <div className="container">
          <SectionHead title="The person behind IRL" />
          <div className="grid-2 founder-grid">
            <figure className="print founder-print">
              <i className="corner tl" aria-hidden="true" />
              <i className="corner tr" aria-hidden="true" />
              <i className="corner bl" aria-hidden="true" />
              <i className="corner br" aria-hidden="true" />
              <div className="frame" style={{ aspectRatio: '4 / 5' }}>
                <img
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role}`}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 380px"
                />
              </div>
              <figcaption className="caption">{founder.role}</figcaption>
            </figure>

            <div>
              <p className="founder-name">{founder.name}</p>
              <p className="founder-lead">{founder.lead}</p>
              {founder.story.map((para) => (
                <p key={para} className="founder-story">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers strip: owner-supplied and true. The traveller count is the team's
          record across their years in the trade, and the label says so. */}
      <section className="section">
        <div className="container">
          <SectionHead title="The numbers so far" />
          <div className="grid-cards" style={{ gap: '1rem' }}>
            {[
              '30+ countries travelled',
              '1,00,000+ travellers served by our team',
              '20 years combined in travel',
              '1 city we call home',
            ].map((line, i) => (
              <p
                key={line}
                className="stub"
                style={{ transform: `rotate(${[-1, 0.8, -0.6, 1.2][i]}deg)`, margin: 0, textAlign: 'center' }}
              >
                {line}
              </p>
            ))}
          </div>
          <p className="hand" style={{ marginTop: '1.1rem', color: 'var(--cream-soft)', fontSize: '1.1rem' }}>
            Real numbers only. These update as they grow.
          </p>
        </div>
      </section>
    </>
  );
}
