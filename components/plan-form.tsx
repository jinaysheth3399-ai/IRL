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

export function PlanForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(NOT_SURE);
  const [travelDate, setTravelDate] = useState('');
  const [nights, setNights] = useState('');
  const [pax, setPax] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Set after mount: the build-time date would not match the visitor's today.
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendEnquiryToCrm({
      form: 'plan-my-trip',
      name,
      phone,
      destination,
      travelDate,
      nights: Number(nights) || null,
      pax: Number(pax) || null,
      pageUrl: typeof window === 'undefined' ? null : window.location.href,
      submittedAt: new Date().toISOString(),
    });

    const message =
      `Hi IRL, I want to plan a trip. Name: ${name}. Destination: ${destination}. ` +
      `Travel date: ${formatDate(travelDate)}. Nights: ${nights}. People: ${pax}. ` +
      `My WhatsApp number: ${phone}.`;

    // Opened straight from the click so the browser does not treat it as a popup.
    window.open(waLink(message), '_blank');
    setSubmitted(true);
  }

  return (
    <div className="note" style={{ maxWidth: '40rem', marginInline: 'auto', padding: '2rem 1.75rem 1.75rem' }}>
      <i className="tape" aria-hidden="true" />
      {submitted ? (
        <p role="status" style={{ fontSize: '1.05rem' }}>
          Got it. Our travel expert will message you on WhatsApp within 24 hours. Meanwhile,{' '}
          <Link href="/reviews/" style={{ color: 'var(--kumkum-deep)', textDecorationColor: 'rgba(176, 44, 21, 0.5)' }}>
            see what our travellers say
          </Link>
          .
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="pf-name">Your name</label>
            <input
              id="pf-name"
              type="text"
              required
              maxLength={120}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="pf-phone">Your WhatsApp number</label>
            <input
              id="pf-phone"
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
            <label htmlFor="pf-destination">Where do you want to go?</label>
            <select id="pf-destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
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

          <div className="field">
            <label htmlFor="pf-date">Travel date</label>
            <input
              id="pf-date"
              type="date"
              required
              min={today || undefined}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            />
            <span className="hint">Not fixed yet? Put the date you have in mind.</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
            <div className="field">
              <label htmlFor="pf-nights">Nights</label>
              <input
                id="pf-nights"
                type="number"
                required
                inputMode="numeric"
                min={1}
                max={60}
                placeholder="5"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="pf-pax">People</label>
              <input
                id="pf-pax"
                type="number"
                required
                inputMode="numeric"
                min={1}
                max={50}
                placeholder="2"
                value={pax}
                onChange={(e) => setPax(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-wa" style={{ width: '100%', justifyContent: 'center' }}>
            Send My Trip Request on WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
