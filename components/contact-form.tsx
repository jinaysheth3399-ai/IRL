'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { waLink } from '@/lib/site';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [trip, setTrip] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(waLink(`Hi IRL, I am ${name} (${phone}). I am thinking about: ${trip}`), '_blank');
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid-2" style={{ gap: '0 1.25rem' }}>
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input
            id="cf-phone"
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
      </div>
      <div className="field">
        <label htmlFor="cf-trip">What trip are you thinking about?</label>
        <input id="cf-trip" type="text" required value={trip} onChange={(e) => setTrip(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-wa">
        Send on WhatsApp
      </button>
      {submitted ? (
        <p role="status" style={{ marginTop: '1rem' }}>
          Got it. We will call or WhatsApp you within 24 hours.
        </p>
      ) : null}
    </form>
  );
}
