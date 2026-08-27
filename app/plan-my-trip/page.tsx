import type { Metadata } from 'next';
import { WaButton, IconPhone } from '@/components/ui';
import { site, defaultWaMessage } from '@/lib/site';
import { PlanForm } from '@/components/plan-form';

export const metadata: Metadata = {
  title: 'Plan My Trip | Tell us your dream trip',
  description:
    'Tell IRL where you want to go, when, how many people, and your budget. A real person from Kolhapur replies on WhatsApp within 24 hours.',
};

export default function PlanMyTripPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container" style={{ maxWidth: '48rem', textAlign: 'center' }}>
          <h1>Tell us your dream trip. We will do the rest.</h1>
          <p style={{ marginTop: '1rem', marginInline: 'auto', color: 'var(--cream-soft)', fontSize: '1.15rem' }}>
            Fill this small form. You will hear from us within 24 hours. No spam, no pressure.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2.75rem' }}>
        <div className="container">
          <PlanForm />

          <div style={{ maxWidth: '40rem', marginInline: 'auto', marginTop: '2.75rem', textAlign: 'center' }}>
            <p style={{ marginInline: 'auto', color: 'var(--cream-soft)' }}>
              In a hurry? WhatsApp us directly or call us. Office open 10 am to 7 pm, all days.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center', marginTop: '1.1rem' }}>
              <WaButton message={defaultWaMessage}>Plan My Trip on WhatsApp</WaButton>
              <a className="btn btn-ghost" href={site.phoneLink}>
                <IconPhone /> {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
