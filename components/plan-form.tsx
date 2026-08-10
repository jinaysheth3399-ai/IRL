'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { waLink } from '@/lib/site';
import { destinations } from '@/lib/destinations';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const adultOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10 or more'];
const childOptions = ['0', '1', '2', '3', '4', '5', '6 or more'];
const budgetOptions = ['Under Rs 25,000', 'Rs 25,000 to 50,000', 'Rs 50,000 to 1 lakh', 'Above 1 lakh', 'Suggest me'];

export function PlanForm() {
  const [destination, setDestination] = useState('Not sure, suggest me');
  const [month, setMonth] = useState('Flexible');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [budget, setBudget] = useState('Suggest me');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = `Hi IRL, I want to plan a trip. Destination: ${destination}. Month: ${month}. People: ${adults} adults, ${children} children. Budget per person: ${budget}. My WhatsApp number: ${phone}.`;
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
            <label htmlFor="pf-destination">Where do you want to go?</label>
            <select id="pf-destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option>Not sure, suggest me</option>
              {destinations.map((d) => (
                <option key={d.slug}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="pf-month">When?</label>
            <select id="pf-month" value={month} onChange={(e) => setMonth(e.target.value)}>
              <option>Flexible</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <fieldset className="field" style={{ border: 'none' }}>
            <legend style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.98rem', marginBottom: '0.4rem' }}>
              How many people?
            </legend>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              <label style={{ display: 'grid', gap: '0.4rem' }}>
                <span className="hint">Adults</span>
                <select value={adults} onChange={(e) => setAdults(e.target.value)}>
                  {adultOptions.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gap: '0.4rem' }}>
                <span className="hint">Children</span>
                <select value={children} onChange={(e) => setChildren(e.target.value)}>
                  {childOptions.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="pf-budget">Budget per person</label>
            <select id="pf-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
              {budgetOptions.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
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

          <button type="submit" className="btn btn-wa" style={{ width: '100%', justifyContent: 'center' }}>
            Send My Trip Request on WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
