import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PhotoPrint, PlanTripButton, SectionHead, TripCard, IconCheck, IconMinus, IconChevron } from '@/components/ui';
import { destinations, getDestination, indiaTrips, worldTrips, waMessageFor } from '@/lib/destinations';
import { fare, GROUP_NOTE, PRICES_UPDATED } from '@/lib/price';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: { absolute: `${d.name} Tour Package from Kolhapur | ${d.durationShort} | IRL` },
    description: `${d.heroLine} Planned person to person from Kolhapur. Get your exact price on WhatsApp.`,
  };
}

const cardRotations = [-0.8, 0.6, -0.5, 0.7];
const moreRotations = [-1.5, 1.2, -0.8];

function splitDay(line: string) {
  const i = line.indexOf(':');
  if (i === -1) return { label: '', rest: line };
  return { label: line.slice(0, i), rest: line.slice(i + 1).trim() };
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const pool = d.region === 'india' ? indiaTrips : worldTrips;
  const idx = pool.findIndex((x) => x.slug === d.slug);
  const more = [1, 2, 3].map((o) => pool[(idx + o) % pool.length]);

  const f = fare(d.priceFrom);

  /* Kashmir's groupNote IS the shared caveat, verbatim. The CTA now carries it
     against the number, so Trip options must not print the same sentence twice.
     Every other destination keeps its own note where it renders today: Kerala's
     is a honeymoon offer and Dubai's is about visas, so neither belongs under a
     price. */
  const ownNote = d.groupNote === GROUP_NOTE ? undefined : d.groupNote;

  /* Bound to the price, not to groupNote. Eight of the thirteen priced
     destinations have no groupNote, and a from-price without this line
     misleads a couple by roughly 25 percent. */
  const fareCaveat = f ? GROUP_NOTE : null;

  const planNote =
    ownNote ??
    d.daysSummary ??
    `${d.duration}. Tell us your group size and month, and we send the full day-wise plan on WhatsApp.`;

  return (
    <>
      {/* Opening spread: the album page for this trip */}
      <section className="section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="container grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div>
            <h1>{d.name}</h1>
            <p style={{ marginTop: '1rem', color: 'var(--cream-soft)', fontSize: '1.15rem' }}>{d.heroLine}</p>
            <span className="sr-only">Good for:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }}>
              {d.goodFor.map((g) => (
                <span key={g} className="tag">
                  {g}
                </span>
              ))}
            </div>
          </div>
          <PhotoPrint
            src={d.photo}
            alt={`A scene from ${d.name}`}
            caption={d.caption}
            rotate={-1.5}
            ratio="4 / 3"
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Facts as ticket stubs, then the intro */}
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          {/* Two facts without a price, three with. The unpriced layout is the
              shipping default, not a fallback. */}
          <div className={f ? 'grid-3' : 'grid-2'} style={{ gap: '1rem' }}>
            <p className="stub" style={{ transform: 'rotate(-0.6deg)', margin: 0 }}>
              <span className="stub-label">Best time to go</span>
              {d.bestTime}
            </p>
            <p className="stub" style={{ transform: 'rotate(0.8deg)', margin: 0 }}>
              <span className="stub-label">Duration</span>
              {d.duration}
              {d.altDuration ? (
                <>
                  <br />
                  {d.altDuration}
                </>
              ) : null}
            </p>
            {f ? (
              <p className="stub stub-fare" style={{ transform: 'rotate(-0.4deg)', margin: 0 }}>
                <span className="stub-label">From</span>
                <span className="fare-amount">
                  <span className="fare-cur">{f.currency}</span>
                  <span className="fare-num">{f.amount}</span>
                  <span className="fare-unit">{f.unit}</span>
                </span>
                <span className="fare-basis">Based on {f.basis}</span>
                <span className="fare-excl">
                  <IconMinus />
                  <span>Flights not included</span>
                </span>
                <span className="fare-stamp">Prices updated {PRICES_UPDATED}</span>
              </p>
            ) : null}
          </div>
          <p style={{ marginTop: '1.75rem', fontSize: '1.1rem' }}>{d.intro}</p>
        </div>
      </section>

      {/* Trip options */}
      <section className="section">
        <div className="container">
          <SectionHead title="Trip options" lead="Every trip is planned for your group. The exact price comes on WhatsApp." />
          {d.tiers.length > 0 ? (
            <div className="grid-3">
              {d.tiers.map((t, i) => (
                <div key={t.name} className="note" style={{ transform: `rotate(${cardRotations[i % cardRotations.length]}deg)` }}>
                  <i className="tape" aria-hidden="true" />
                  <h3>{t.name}</h3>
                  <p style={{ marginTop: '0.5rem' }}>{t.note}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="note" style={{ maxWidth: '44rem', transform: 'rotate(-0.5deg)' }}>
              <i className="tape" aria-hidden="true" />
              <h3>Your plan</h3>
              <p style={{ marginTop: '0.5rem' }}>{planNote}</p>
            </div>
          )}
          {d.tiers.length > 0 && ownNote ? (
            <p className="hand" style={{ color: 'var(--marigold)', fontSize: '1.15rem', marginTop: '1.5rem' }}>{ownNote}</p>
          ) : null}
          <div style={{ marginTop: '1.75rem' }}>
            <PlanTripButton destination={d.name}>Get My {d.name} Price</PlanTripButton>
          </div>
        </div>
      </section>

      {/* Day-wise plan */}
      {d.days ? (
        <section className="section">
          <div className="container">
            <div className="note" style={{ maxWidth: '56rem' }}>
              <i className="tape" aria-hidden="true" />
              <details className="fold" open>
                <summary>
                  <h3 style={{ fontSize: '1.25rem' }}>{d.daysTitle}</h3>
                  <IconChevron />
                </summary>
                <ul className="diary" style={{ marginTop: '0.75rem' }}>
                  {d.days.map((line) => {
                    const { label, rest } = splitDay(line);
                    return (
                      <li key={line}>
                        {label ? <span className="d">{label}</span> : null}
                        <span>{rest}</span>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </div>
          </div>
        </section>
      ) : d.daysSummary ? (
        <section className="section">
          <div className="container">
            <div className="note" style={{ maxWidth: '56rem' }}>
              <i className="tape" aria-hidden="true" />
              <h3>Your days, in short</h3>
              <p style={{ marginTop: '0.5rem' }}>{d.daysSummary}</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Included and not included */}
      <section className="section">
        <div className="container grid-2">
          <div className="note" style={{ transform: 'rotate(-0.4deg)' }}>
            <h3>What is included</h3>
            <ul className="list-plain" style={{ marginTop: '0.6rem' }}>
              {d.included.map((item) => (
                <li key={item}>
                  <IconCheck />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="note" style={{ transform: 'rotate(0.5deg)' }}>
            <h3>What is not included</h3>
            <ul className="list-plain" style={{ marginTop: '0.6rem' }}>
              {d.notIncluded.map((item) => (
                <li key={item}>
                  <IconMinus />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Things to know */}
      <section className="section">
        <div className="container">
          <div className="note" style={{ maxWidth: '56rem' }}>
            <i className="tape" aria-hidden="true" />
            <h3 className="hand" style={{ color: 'var(--kumkum-deep)', fontWeight: 700, fontSize: '1.15rem' }}>
              Things to know
            </h3>
            {d.thingsToKnow.map((item) => (
              <p key={item} style={{ marginTop: '0.6rem' }}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* More pages from this album */}
      <section className="section">
        <div className="container">
          <SectionHead title="More trips like this" />
          <div className="grid-3">
            {more.map((m, i) => (
              <TripCard
                key={m.slug}
                slug={m.slug}
                name={m.name}
                durationShort={m.durationShort}
                photo={m.photo}
                code={m.code}
                fare={fare(m.priceFrom)}
                rotate={moreRotations[i % moreRotations.length]}
              />
            ))}
          </div>
          <p className="fare-footnote">From prices are group rates. Prices updated {PRICES_UPDATED}.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="note" style={{ maxWidth: '44rem', marginInline: 'auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <i className="tape" aria-hidden="true" />
            <h2>Get your exact price in one message.</h2>
            {f ? (
              <>
                <p className="fare-recall hand">
                  From {f.currency} {f.amount} {f.unit}, {f.basis}. Flights extra.
                </p>
                <div className="fare-rule" aria-hidden="true" />
              </>
            ) : null}
            {fareCaveat ? <p className="fare-caveat">{fareCaveat}</p> : null}
            <p style={{ margin: '0.75rem auto 1.5rem' }}>Tell us your month and group size. We send the full plan on WhatsApp.</p>
            <PlanTripButton destination={d.name}>Get My {d.name} Price</PlanTripButton>
          </div>
        </div>
      </section>
    </>
  );
}
