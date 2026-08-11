'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { waLink } from '@/lib/site';
import { destinations } from '@/lib/destinations';
import { sendEnquiryToCrm } from '@/lib/crm';

const NOT_SURE = 'Not sure, suggest me';

const indiaDestinations = destinations.filter((d) => d.region === 'india');
const worldDestinations = destinations.filter((d) => d.region === 'world');

// The CRM and the rest of the site both speak DD/MM/YYYY.
function formatDate(value: string): string {
  const [y, m, d] = value.split('-');
  return y && m && d ? `${d}/${m}/${y}` : value;
}

/**
 * The one enquiry form. Plan My Trip and Contact both render this so the fields,
 * the WhatsApp message, and the CRM payload can never drift apart. `source` only
 * tags which page the lead came from. Each page supplies its own surrounding
 * paper note and heading.
 */
export function EnquiryForm({ source }: { source: 'plan-my-trip' | 'contact' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(NOT_SURE);
  const [dateMode, setDateMode] = useState<'flexible' | 'fixed'>('flexible');
  const [travelDate, setTravelDate] = useState('');
  const [nights, setNights] = useState('');
  const [pax, setPax] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Set after mount: the build-time date would not match the visitor's today.
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));

    // Arriving from a destination page ("Get My Kashmir Price") preselects it,
    // so nobody re-picks something they already chose. Read from the URL rather
    // than useSearchParams: this is a static export and the value is optional.
    const wanted = new URLSearchParams(window.location.search).get('destination');
    if (wanted && destinations.some((d) => d.name === wanted)) setDestination(wanted);
  }, []);

  const id = (field: string) => `${source}-${field}`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fixed = dateMode === 'fixed';

    sendEnquiryToCrm({
      form: source,
      name,
      phone,
      destination,
      travelDate: fixed ? travelDate : null,
      flexibleDates: !fixed,
      nights: Number(nights) || null,
      pax: Number(pax) || null,
      pageUrl: typeof window === 'undefined' ? null : window.location.href,
      submittedAt: new Date().toISOString(),
    });

    const when = fixed ? formatDate(travelDate) : 'Flexible';
    const message =
      `Hi IRL, I want to plan a trip. Name: ${name}. Destination: ${destination}. ` +
      `Travel date: ${when}. Nights: ${nights}. Travellers: ${pax}. ` +
      `My WhatsApp number: ${phone}.`;

    // Opened straight from the click so the browser does not treat it as a popup.
    window.open(waLink(message), '_blank');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" style={{ fontSize: '1.05rem' }}>
        Got it. Our travel expert will message you on WhatsApp within 24 hours. Meanwhile,{' '}
        <Link href="/reviews/" style={{ color: 'var(--kumkum-deep)', textDecorationColor: 'rgba(176, 44, 21, 0.5)' }}>
          see what our travellers say
        </Link>
        .
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor={id('name')}>Your name</label>
        <input
          id={id('name')}
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor={id('phone')}>Your WhatsApp number</label>
        <input
          id={id('phone')}
          type="tel"
          required
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="10 digit number"
          title="10 digit mobile number"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor={id('destination')}>Where do you want to go?</label>
        <select id={id('destination')} value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option>{NOT_SURE}</option>
          <optgroup label="India">
            {indiaDestinations.map((d) => (
              <option key={d.slug}>{d.name}</option>
            ))}
          </optgroup>
          <optgroup label="World">
            {worldDestinations.map((d) => (
              <option key={d.slug}>{d.name}</option>
            ))}
          </optgroup>
        </select>
      </div>

      <fieldset className="field" style={{ border: 'none', padding: 0 }}>
        <legend style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.98rem', marginBottom: '0.4rem' }}>
          When do you want to travel?
        </legend>
        <div className="choice-row">
          <label className={`choice${dateMode === 'flexible' ? ' is-on' : ''}`}>
            <input
              type="radio"
              name={id('dateMode')}
              checked={dateMode === 'flexible'}
              onChange={() => setDateMode('flexible')}
            />
            Dates not fixed
          </label>
          <label className={`choice${dateMode === 'fixed' ? ' is-on' : ''}`}>
            <input
              type="radio"
              name={id('dateMode')}
              checked={dateMode === 'fixed'}
              onChange={() => setDateMode('fixed')}
            />
            I know my dates
          </label>
        </div>
      </fieldset>

      {/* The calendar only appears once there is a date to put in it. */}
      {dateMode === 'fixed' ? (
        <div className="field">
          <label htmlFor={id('date')}>Travel date</label>
          <input
            id={id('date')}
            type="date"
            required
            min={today || undefined}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
        <div className="field">
          <label htmlFor={id('nights')}>Nights</label>
          <input
            id={id('nights')}
            type="number"
            required
            inputMode="numeric"
            min={1}
            max={60}
            placeholder="e.g. 5"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={id('pax')}>Number of travellers</label>
          <input
            id={id('pax')}
            type="number"
            required
            inputMode="numeric"
            min={1}
            max={50}
            placeholder="e.g. 4"
            value={pax}
            onChange={(e) => setPax(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-wa" style={{ width: '100%', justifyContent: 'center' }}>
        Send My Trip Request on WhatsApp
      </button>
    </form>
  );
}
