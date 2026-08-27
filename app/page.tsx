import Link from 'next/link';
import { PhotoPrint, SectionHead, TripCard, PlanTripButton, IconCheck } from '@/components/ui';
import { indiaTrips, worldTrips } from '@/lib/destinations';
import { trustStrip, howItWorksShort, seasons, whyTrust, guestReviews } from '@/lib/content';
import { site } from '@/lib/site';
import { fare, PRICES_UPDATED } from '@/lib/price';
import { SeasonNow } from '@/components/season-now';


export default function HomePage() {
  return (
    <>
      {/* Hero: the night departure */}
      <section className="hero">
        <div className="hero-photo" aria-hidden="true">
          <img src="/photos/hero.jpg" alt="" loading="eager" />
        </div>
        <svg className="flight" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="route" d="M -40 420 C 280 370, 560 300, 840 235 C 1060 185, 1240 150, 1480 105" />
          <g className="plane">
            <path d="M0 0 22 -8 12 12 7 4 Z" fill="var(--lime)" transform="translate(-11 -2)" />
          </g>
        </svg>
        <div className="hero-inner">
          <h1>
            We plan.
            <br />
            <span className="lime">You travel.</span>
          </h1>
          <p className="hero-sub">{site.subline}</p>
          <div className="hero-actions">
            <PlanTripButton />
            <Link className="btn btn-ghost" href="/india-trips/">
              See All Trips
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip: taped ticket stubs */}
      <section className="section" aria-label="Why travellers trust IRL" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="grid-cards" style={{ gap: '1rem' }}>
            {trustStrip.map((line, i) => (
              <p key={line} className="stub" style={{ transform: `rotate(${[-1, 0.8, -0.6, 1.2][i]}deg)`, margin: 0 }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Destination grids */}
      <section className="section" id="india">
        <div className="container">
          <SectionHead title="Where do you want to go?" lead="Every trip below is planned person to person. From prices are group rates, and your exact price comes on WhatsApp." />
          <h3 className="hand" style={{ color: 'var(--marigold)', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
            India Trips
          </h3>
          <div className="grid-cards">
            {indiaTrips.map((d) => (
              <TripCard key={d.slug} slug={d.slug} name={d.name} durationShort={d.durationShort} photo={d.photo} code={d.code} fare={fare(d.priceFrom)} />
            ))}
          </div>
          <h3 className="hand" style={{ color: 'var(--marigold)', fontSize: '1.4rem', margin: '2.5rem 0 1.2rem' }}>
            World Trips
          </h3>
          <div className="grid-cards">
            {worldTrips.map((d) => (
              <TripCard key={d.slug} slug={d.slug} name={d.name} durationShort={d.durationShort} photo={d.photo} code={d.code} fare={fare(d.priceFrom)} />
            ))}
          </div>
          <p className="fare-footnote">From prices are group rates. Prices updated {PRICES_UPDATED}.</p>
        </div>
      </section>

      {/* How it works, short */}
      <section className="section">
        <div className="container">
          <SectionHead title="Booking a trip with IRL is simple." />
          <div className="grid-3">
            {howItWorksShort.map((step, i) => (
              <div key={step.title} className="note" style={{ transform: `rotate(${[-0.8, 0.6, -0.5][i]}deg)` }}>
                <i className="tape" aria-hidden="true" />
                <p className="hand" style={{ color: 'var(--kumkum-deep)', fontWeight: 700, fontSize: '1.05rem' }}>
                  Step {i + 1}
                </p>
                <h3 style={{ margin: '0.25rem 0 0.5rem' }}>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link className="btn btn-primary" href="/plan-my-trip/">
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal strip */}
      <section className="section">
        <div className="container">
          <SectionHead title="Where to go this season" />
          <SeasonNow seasons={seasons} />
        </div>
      </section>

      {/* Why families trust IRL */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <SectionHead title="Why families trust IRL" />
            <ul className="list-plain" style={{ maxWidth: '46rem' }}>
              {whyTrust.map((line) => (
                <li key={line} style={{ paddingBlock: '0.45rem' }}>
                  <IconCheck color="var(--marigold)" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '1rem' }}>
              <Link href="/why-us/">Read all seven reasons</Link>
            </p>
          </div>
          <PhotoPrint
            src="/photos/kashmir.jpg"
            alt="A shikara resting among lotus leaves on Dal Lake"
            caption="Dal Lake. Somebody's first shikara ride."
            rotate={1.5}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Reviews sample */}
      <section className="section">
        <div className="container">
          <SectionHead title="What our travellers say" lead="Real guests, in their own words." />
          <div className="grid-3">
            {guestReviews.map((r, i) => (
              <figure key={r.name} className="note" style={{ transform: `rotate(${[-0.6, 0.7, -0.4][i]}deg)` }}>
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
          <p style={{ marginTop: '1.75rem' }}>
            <Link className="btn btn-ghost" href="/reviews/">
              Read All Reviews
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="note" style={{ maxWidth: '44rem', marginInline: 'auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <i className="tape" aria-hidden="true" />
            <h2>Your next trip starts with one message.</h2>
            <p style={{ margin: '0.75rem auto 1.5rem' }}>Tell us where you want to go. We will do the rest.</p>
            <PlanTripButton />
          </div>
        </div>
      </section>
    </>
  );
}
