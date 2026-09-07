'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { waLink } from '@/lib/site';
import { helpsPlanOptions, heardAboutOptions } from '@/lib/franchise';

/**
 * Digital Franchise enquiry. Deliberately does NOT post to the CRM lead intake:
 * that endpoint creates travel Leads and requires a destination, nights and a
 * travel date, so a partnership enquiry would land in the sales pipeline as a
 * malformed trip. It hands off to WhatsApp, which is what the brochure promises.
 */
export function FranchiseForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [work, setWork] = useState('');
  const [helpsPlan, setHelpsPlan] = useState(helpsPlanOptions[0]);
  const [heard, setHeard] = useState(heardAboutOptions[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Record<string, string> {
    const found: Record<string, string> = {};
    if (!name.trim()) found.name = 'Please tell us your name.';
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) {
      found.phone = 'Enter a 10 digit mobile number starting with 6, 7, 8 or 9.';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      found.email = 'That email address does not look right.';
    }
    return found;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const lines = [
      'Hi IRL, I want to know more about the Digital Franchise Partner opportunity.',
      `Name: ${name}.`,
      `Mobile: ${phone}.`,
      email.trim() ? `Email: ${email}.` : '',
      city.trim() ? `City: ${city}.` : '',
      work.trim() ? `Work: ${work}.` : '',
      `Do I help people plan holidays: ${helpsPlan}.`,
      `Heard about IRL from: ${heard}.`,
      message.trim() ? `My question: ${message}` : '',
    ].filter(Boolean);

    window.open(waLink(lines.join(' ')), '_blank');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p role="status" style={{ fontSize: '1.05rem' }}>
        Got it. An IRL representative will contact you to walk you through the model, the support you get and how to
        start. If your WhatsApp did not open, call us on 93246 01955.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="fr-name">Full name</label>
        <input
          id="fr-name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </div>

      <div className="field">
        <label htmlFor="fr-phone">Mobile number</label>
        <input
          id="fr-phone"
          type="tel"
          required
          inputMode="numeric"
          maxLength={10}
          placeholder="10 digit number"
          autoComplete="tel-national"
          aria-invalid={errors.phone ? true : undefined}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
      </div>

      <div className="field">
        <label htmlFor="fr-email">Email address</label>
        <input
          id="fr-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </div>

      <div className="field-pair">
        <div className="field">
          <label htmlFor="fr-city">City</label>
          <input
            id="fr-city"
            type="text"
            maxLength={80}
            autoComplete="address-level2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="fr-work">Profession or business</label>
          <input id="fr-work" type="text" maxLength={120} value={work} onChange={(e) => setWork(e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="fr-helps">Do you currently help people plan holidays?</label>
        <select id="fr-helps" value={helpsPlan} onChange={(e) => setHelpsPlan(e.target.value)}>
          {helpsPlanOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="fr-heard">How did you hear about IRL?</label>
        <select id="fr-heard" value={heard} onChange={(e) => setHeard(e.target.value)}>
          {heardAboutOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="fr-message">Anything you would like to know?</label>
        <textarea id="fr-message" rows={4} maxLength={1000} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-wa" style={{ width: '100%', justifyContent: 'center' }}>
        I am interested. Tell me more.
      </button>

      <p className="hint" style={{ marginTop: '0.9rem' }}>
        By sending this, you agree to be contacted by the IRL team about the Digital Franchise opportunity.
      </p>
    </form>
  );
}
