import type { Metadata } from 'next';
import { WaButton, IconPhone } from '@/components/ui';
import { site, defaultWaMessage } from '@/lib/site';
import { EnquiryForm } from '@/components/enquiry-form';

export const metadata: Metadata = {
  title: 'Contact IRL Kolhapur',
  description:
    'Call, WhatsApp, email, or walk into the IRL office in Kolhapur. Open Monday to Sunday, 10 am to 8 pm. Come plan your trip face to face.',
};

const factLabel = { color: 'var(--kumkum-deep)', fontWeight: 700, fontSize: '1.02rem' } as const;

export default function ContactPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container" style={{ maxWidth: '52rem', textAlign: 'center' }}>
          <h1>Come, let&rsquo;s plan your trip over a cup of tea.</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2.75rem' }}>
        <div className="container grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
          <div>
            <div className="note" style={{ padding: '1.9rem 1.75rem' }}>
              <i className="tape" aria-hidden="true" />
              <dl style={{ display: 'grid', gap: '1.15rem' }}>
                <div>
                  <dt className="hand" style={factLabel}>
                    Office
                  </dt>
                  <dd>{site.address}</dd>
                </div>
                <div>
                  <dt className="hand" style={factLabel}>
                    Call
                  </dt>
                  <dd>
                    <a
                      href={site.phoneLink}
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontSize: '1.7rem',
                        color: 'var(--kumkum-deep)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <IconPhone size={22} /> {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="hand" style={factLabel}>
                    WhatsApp
                  </dt>
                  <dd style={{ paddingTop: '0.35rem' }}>
                    <WaButton message={defaultWaMessage}>Chat Now</WaButton>
                  </dd>
                </div>
                <div>
                  <dt className="hand" style={factLabel}>
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      style={{ color: 'var(--kumkum-deep)', textDecorationColor: 'rgba(176, 44, 21, 0.5)' }}
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="hand" style={factLabel}>
                    Timings
                  </dt>
                  <dd>{site.timings}</dd>
                </div>
              </dl>
            </div>
            <p style={{ marginTop: '1.25rem', color: 'var(--cream-soft)' }}>{site.landmarkLine}</p>
          </div>

          <div className="print">
            <i className="corner tl" aria-hidden="true" />
            <i className="corner tr" aria-hidden="true" />
            <i className="corner bl" aria-hidden="true" />
            <i className="corner br" aria-hidden="true" />
            <div className="frame">
              <span className="map-cover">IRL office · Station Road, Kolhapur</span>
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed&iwloc=near`}
                title="IRL office on Google Maps"
                style={{ border: 0, display: 'block', width: '100%', height: 380 }}
                loading="lazy"
              />
            </div>
            <p className="caption">Our office in Kolhapur. Walk in any day.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="note" style={{ maxWidth: '40rem', marginInline: 'auto', padding: '2rem 1.75rem 1.75rem' }}>
            <i className="tape" aria-hidden="true" />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.1rem' }}>Or tell us your trip here.</h2>
            <EnquiryForm source="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
