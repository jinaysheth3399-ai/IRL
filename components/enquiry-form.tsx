'use client';

import { useEffect, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import Link from 'next/link';
import { waLink } from '@/lib/site';
import { destinations } from '@/lib/destinations';
import { submitEnquiry } from '@/lib/submit-enquiry';

const NOT_SURE = 'Not sure, suggest me';

const indiaDestinations = destinations.filter((d) => d.region === 'india');
const worldDestinations = destinations.filter((d) => d.region === 'world');

/** Today in the visitor's own timezone. toISOString would give UTC, which is a
 *  day behind IST late at night and would let a past date through. */
function localToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Browsers only open the date picker from its small indicator icon, which is a
 * poor target on a phone. This opens it from anywhere in the field. showPicker
 * throws unless it is a genuine user gesture, and older browsers lack it
 * entirely, so failure just leaves the normal typing behaviour intact.
 */
function openPicker(e: MouseEvent<HTMLInputElement>) {
  const el = e.currentTarget;
  if (typeof el.showPicker !== 'function') return;
  try {
    el.showPicker();
  } catch {
    // Not user-activated, or unsupported: the field still works by typing.
  }
}

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

  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [deduped, setDeduped] = useState(false);

  // Set after mount: the build-time date would not match the visitor's today.
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(localToday());

    // Arriving from a destination page ("Get My Kashmir Price") preselects it,
    // so nobody re-picks something they already chose. Read from the URL rather
    // than useSearchParams: this is a static export and the value is optional.
    const wanted = new URLSearchParams(window.location.search).get('destination');
    if (wanted && destinations.some((d) => d.name === wanted)) setDestination(wanted);
  }, []);

  const id = (field: string) => `${source}-${field}`;

  /** Mirrors the CRM's own rules so a valid form never round-trips to a 400. */
  function validate(): Record<string, string> {
    const found: Record<string, string> = {};
    if (!name.trim()) found.name = 'Please tell us your name.';
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) {
      found.phone = 'Enter a 10 digit mobile number starting with 6, 7, 8 or 9.';
    }
    if (dateMode === 'fixed') {
      if (!travelDate) found.travelDate = 'Pick your travel date.';
      else if (travelDate < localToday()) found.travelDate = 'Please pick a date that has not passed.';
    }
    return found;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const fixed = dateMode === 'fixed';
    const when = fixed ? formatDate(travelDate) : 'Flexible';
    const message =
      `Hi IRL, I want to plan a trip. Name: ${name}. Destination: ${destination}. ` +
      `Travel date: ${when}. Nights: ${nights}. Travellers: ${pax}. ` +
      `My WhatsApp number: ${phone}.`;

    // Opened before awaiting anything: a popup blocked because the click's user
    // gesture expired mid-request would cost us the conversation, which matters
    // more than the CRM record.
    window.open(waLink(message), '_blank');

    setPending(true);
    const result = await submitEnquiry(
      {
        name,
        whatsapp: phone,
        destination,
        datesNotFixed: !fixed,
        date: fixed ? travelDate : undefined,
        nights: Number(nights) || undefined,
        travellers: Number(pax) || undefined,
      },
      source,
    );
    setPending(false);

    if (!result.ok && result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
      setErrors(result.fieldErrors);
      return;
    }

    // WhatsApp is already open, so the enquiry has reached us either way. Any
    // remaining failure is ours to fix, not something to alarm the visitor with.
    setDeduped(result.ok ? result.deduped : false);
    setNotice(result.ok ? '' : (result.message ?? ''));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status">
        <p style={{ fontSize: '1.05rem' }}>
          {deduped
            ? 'We already have your enquiry. Our travel expert will message you on WhatsApp within 24 hours.'
            : 'Got it. Our travel expert will message you on WhatsApp within 24 hours.'}{' '}
          Meanwhile,{' '}
          <Link href="/reviews/" style={{ color: 'var(--kumkum-deep)', textDecorationColor: 'rgba(176, 44, 21, 0.5)' }}>
            see what our travellers say
          </Link>
          .
        </p>
        {notice ? (
          <p className="hint" style={{ marginTop: '0.6rem' }}>
            {notice} Sending the WhatsApp message still reaches us.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor={id('name')}>Your name</label>
        <input
          id={id('name')}
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? id('name-err') : undefined}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name ? (
          <span className="field-error" id={id('name-err')}>
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor={id('phone')}>Your WhatsApp number</label>
        <input
          id={id('phone')}
          type="tel"
          required
          inputMode="numeric"
          maxLength={10}
          placeholder="10 digit number"
          autoComplete="tel-national"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? id('phone-err') : undefined}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone ? (
          <span className="field-error" id={id('phone-err')}>
            {errors.phone}
          </span>
        ) : null}
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
            aria-invalid={errors.travelDate ? true : undefined}
            aria-describedby={errors.travelDate ? id('date-err') : undefined}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            onClick={openPicker}
          />
          {errors.travelDate ? (
            <span className="field-error" id={id('date-err')}>
              {errors.travelDate}
            </span>
          ) : null}
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

      <button
        type="submit"
        className="btn btn-wa"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={pending}
      >
        {pending ? 'Sending...' : 'Send My Trip Request on WhatsApp'}
      </button>
    </form>
  );
}
