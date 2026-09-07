import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHead, IconCheck, IconChevron } from '@/components/ui';
import { FranchiseForm } from '@/components/franchise-form';
import { siteUrl } from '@/lib/site';
import {
  askedQuestions,
  notNeeded,
  howItWorks,
  hesitations,
  benefits,
  suitableFor,
  franchiseFaqs,
} from '@/lib/franchise';

// Literal backslash for the JSON-LD escape, kept out of string literals.
const BACKSLASH = String.fromCharCode(92);

export const metadata: Metadata = {
  title: { absolute: 'Travel Business Franchise Opportunity from Kolhapur | IRL' },
  description:
    'Turn your network into a travel business. Become an IRL Digital Franchise Partner: 7 day destination training, a dedicated relationship manager and full backend support. No office needed.',
  alternates: { canonical: './' },
  openGraph: {
    title: 'Turn your network into a travel business | IRL Digital Franchise Partner',
    description:
      'You bring the customer. IRL handles itineraries, hotels, transfers and on-ground execution. Training and a dedicated relationship manager included.',
    images: ['/photos/hero.jpg'],
  },
};

/* The FAQ answers are genuine questions the brochure anticipates, so they ship
   as FAQPage. Google retired FAQ rich results in May 2026, so this earns no
   SERP badge; it stays because AI assistants still read it when someone asks
   about travel franchise opportunities. */
const franchiseJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: franchiseFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Digital Franchise Partner', item: `${siteUrl}/franchise/` },
      ],
    },
  ],
};

export default function FranchisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(franchiseJsonLd).replace(/</g, BACKSLASH + 'u003c') }}
      />

      {/* Opening: the promise */}
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <h1 style={{ maxWidth: '16ch' }}>
            Turn your network into a <span className="lime">travel business.</span>
          </h1>
          <p className="hero-sub" style={{ maxWidth: '54ch' }}>
            Travel is one of the most recommendation driven businesses in the world. You may already be recommending
            destinations, hotels and experiences. Become an IRL Digital Franchise Partner and build a business around
            it.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="#franchise-form">
              Contact Us To Know More
            </Link>
            <Link className="btn btn-ghost" href="#how-it-works">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* The authored moment: the questions people already ask you */}
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <SectionHead title="Every day, someone asks you this." />
          <div className="asked-grid">
            {askedQuestions.map((q, i) => (
              <p key={q} className="note asked" style={{ transform: `rotate(${[-1.4, 1, -0.7, 1.3][i]}deg)` }}>
                <i className="tape" aria-hidden="true" />
                {q}
              </p>
            ))}
          </div>
          <p style={{ marginTop: '2rem', fontSize: '1.15rem', maxWidth: '54ch' }}>
            You answer these already, for free. As an IRL Digital Franchise Partner, the same conversations become your
            travel business.
          </p>
        </div>
      </section>

      {/* Your network, our expertise */}
      <section className="section">
        <div className="container">
          <SectionHead
            title="Your network. Our expertise."
            lead="You bring the customer. IRL manages everything that comes after."
          />
          <div className="grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
            <div>
              <p style={{ fontSize: '1.15rem' }}>
                From itinerary creation and hotel bookings to activities, transfers and on ground execution, our travel
                team supports you through the entire journey. You stay the first point of contact for your customer,
                while IRL works with you behind the scenes.
              </p>
              <ul className="list-plain" style={{ marginTop: '1.5rem' }}>
                {notNeeded.map((line) => (
                  <li key={line} style={{ paddingBlock: '0.45rem' }}>
                    <IconCheck color="var(--marigold)" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="note franchise-kit" style={{ transform: 'rotate(-0.6deg)' }}>
              <i className="tape" aria-hidden="true" />
              <span className="stamp">All you need</span>
              <p className="kit-line">Your phone</p>
              <p className="kit-plus" aria-hidden="true">
                +
              </p>
              <p className="kit-line">Your network</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works: five steps */}
      <section className="section" id="how-it-works">
        <div className="container">
          <SectionHead title="How the IRL Digital Franchise works" />
          <div className="grid-3">
            {howItWorks.map((step, i) => (
              <div
                key={step.title}
                className="note"
                style={{ transform: `rotate(${[-0.8, 0.6, -0.5, 0.7, -0.4][i]}deg)` }}
              >
                <i className="tape" aria-hidden="true" />
                <p className="hand step-index">Step {i + 1}</p>
                <h3 style={{ margin: '0.25rem 0 0.5rem' }}>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The hesitation, named and answered */}
      <section className="section">
        <div className="container">
          <SectionHead title="You do not need to be a travel expert." />
          <div className="grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
            <div className="note" style={{ transform: 'rotate(-0.5deg)' }}>
              <i className="tape" aria-hidden="true" />
              <h3>Most people stop here</h3>
              <p style={{ marginTop: '0.5rem' }}>They do not know:</p>
              <ul className="hesitation-list">
                {hesitations.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: '1.15rem' }}>
                With IRL you do not have to work all of this out yourself. Our team gives you the operational expertise
                to service your customers properly, from the first question to the last transfer.
              </p>
              <p style={{ marginTop: '1rem' }}>
                That is the whole point of the model. You are good with people. We are good at the machinery behind a
                holiday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="section">
        <div className="container">
          <SectionHead title="Why become an IRL Digital Franchise Partner?" />
          <div className="grid-3">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="note"
                style={{ transform: `rotate(${[-0.6, 0.7, -0.4, 0.5, -0.7, 0.4, -0.5][i]}deg)` }}
              >
                <i className="tape" aria-hidden="true" />
                <h3>{b.title}</h3>
                <p style={{ marginTop: '0.5rem' }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="section">
        <div className="container">
          <SectionHead title="Who is this for?" lead="The model suits people who are already trusted by people." />
          <div className="suitable-grid">
            {suitableFor.map((s, i) => (
              <p
                key={s}
                className="stub"
                style={{ transform: `rotate(${[-1, 0.8, -0.6, 1.2, -0.9, 0.7, -0.5][i]}deg)`, margin: 0 }}
              >
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* The emotional close */}
      <section className="section">
        <div className="container">
          <div className="note franchise-close" style={{ transform: 'rotate(-0.4deg)' }}>
            <i className="tape" aria-hidden="true" />
            <h2>You already recommend travel. Now build a business around it.</h2>
            <p style={{ marginTop: '1rem' }}>Every family has someone who plans the holidays.</p>
            <p>Every office has someone people call for hotel recommendations.</p>
            <p>Every WhatsApp group has that one person who knows where to go, where to stay and what to do.</p>
            <p className="close-punch">If that person is you, IRL gives you the support system to take the next step.</p>
          </div>
        </div>
      </section>

      {/* The form */}
      <section className="section" id="franchise-form">
        <div className="container">
          <div className="note" style={{ maxWidth: '40rem', marginInline: 'auto', padding: '2rem 1.75rem 1.75rem' }}>
            <i className="tape" aria-hidden="true" />
            <h2 style={{ fontSize: '1.5rem' }}>Contact us to know more.</h2>
            <p style={{ margin: '0.6rem 0 1.4rem' }}>
              Fill in your details and our team will connect with you to explain the model, the support and the
              commercials.
            </p>
            <FranchiseForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHead title="Questions partners ask" />
          <div style={{ maxWidth: '52rem', display: 'grid', gap: '1rem' }}>
            {franchiseFaqs.map((f, i) => (
              <div
                key={f.q}
                className="note"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.35 : 0.4}deg)`, padding: '1.1rem 1.4rem' }}
              >
                <details className="fold" open={i === 0}>
                  <summary>
                    <IconChevron />
                    <span style={{ fontWeight: 700, fontSize: '1.08rem' }}>{f.q}</span>
                  </summary>
                  <p style={{ paddingTop: '0.6rem', paddingLeft: '1.65rem' }}>{f.a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Build your travel business with IRL.</h2>
          <p className="hand" style={{ color: 'var(--marigold)', fontSize: '1.25rem', marginTop: '0.75rem' }}>
            Your network. Our expertise.
          </p>
          <div style={{ marginTop: '1.75rem' }}>
            <Link className="btn btn-primary" href="#franchise-form">
              Contact Us To Know More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
