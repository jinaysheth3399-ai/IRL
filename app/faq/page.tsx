import type { Metadata } from 'next';
import { IconChevron, WaButton } from '@/components/ui';
import { faqs } from '@/lib/content';
import { defaultWaMessage } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'FAQ | Questions everyone asks' },
  description: 'Plain answers to the twelve questions travellers ask us most, from advance and payments to food and visas.',
};

export default function FaqPage() {
  return (
    <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Questions everyone asks</h1>
        <div style={{ maxWidth: '52rem', marginInline: 'auto', display: 'grid', gap: '1rem' }}>
          {faqs.map((f, i) => (
            <div key={f.q} className="note" style={{ transform: `rotate(${i % 2 === 0 ? -0.35 : 0.4}deg)`, padding: '1.1rem 1.4rem' }}>
              <details className="fold" open={i === 0}>
                <summary>
                  <IconChevron />
                  <span style={{ fontWeight: 700, fontSize: '1.08rem' }}>{f.q}</span>
                </summary>
                <p style={{ paddingTop: '0.6rem', paddingLeft: '1.65rem' }}>{f.a}</p>
              </details>
            </div>
          ))}
          <div style={{ marginTop: '1.5rem' }}>
            <p className="hand" style={{ color: 'var(--marigold)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Did not find your question?
            </p>
            <WaButton message={defaultWaMessage}>Ask on WhatsApp</WaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
