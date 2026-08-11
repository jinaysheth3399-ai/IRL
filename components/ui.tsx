import Link from 'next/link';
import type { ReactNode } from 'react';
import { site, waLink } from '@/lib/site';

/* Small icon set drawn in one grammar: 1.8 stroke, round caps. */

export function IconWhatsApp({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.6a8.4 8.4 0 0 0-7.25 12.66L3.6 20.4l4.28-1.12A8.4 8.4 0 1 0 12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 8.7c-.3.9-.15 2.1 1.05 3.45 1.2 1.35 2.55 2.1 3.6 2.25.6.08 1.2-.15 1.5-.75l.3-.6c.15-.3 0-.65-.3-.8l-1.35-.6c-.25-.11-.55-.04-.72.18l-.33.42c-.6-.15-1.95-1.05-2.4-2.1l.36-.39a.62.62 0 0 0 .09-.73l-.75-1.28c-.18-.3-.57-.38-.85-.17l-.6.42c-.27.2-.5.45-.6.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconCheck({ color = '#2c7a3f' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 12.5 10 18 19.5 6.5" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMinus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="#b02c15" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconPhone({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5.5 4.5 8 4l1.7 3.4-1.6 1.6a11.7 11.7 0 0 0 5 5l1.6-1.6L18 14l-.5 2.5c-.1.6-.6 1-1.2 1C10 17.2 5.9 13 5.5 6.7c0-.9 0-1.8 0-2.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPlane({ size = 20, color = 'var(--lime)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.6 11.2 21 3.4 14.1 21l-3-6.8-8.5-3Z" fill={color} />
      <path d="m11.1 14.2 4.6-6" stroke="#0b0d09" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevron() {
  return (
    <svg className="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5.5 15.5 12 9 18.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Photo print: white-bordered photograph held by gold corners, handwritten caption. */

export function PhotoPrint({
  src,
  alt,
  caption,
  ratio = '4 / 3',
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number; // accepted for compatibility; Night Flight frames sit straight
  ratio?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="print">
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />
      <div className="frame" style={{ aspectRatio: ratio }}>
        {/* Static export: plain img keeps hosting simple */}
        <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} sizes={sizes} />
      </div>
      {caption ? <figcaption className="caption">{caption}</figcaption> : null}
    </figure>
  );
}

export function WaButton({ message, children, className = 'btn btn-wa' }: { message: string; children: ReactNode; className?: string }) {
  return (
    <a className={className} href={waLink(message)} target="_blank" rel="noopener noreferrer">
      <IconWhatsApp />
      {children}
    </a>
  );
}

/**
 * Starts a trip enquiry. Sends the visitor to the form rather than straight to
 * WhatsApp, so the lead reaches the CRM as a complete record; the form still
 * hands off to WhatsApp on submit. Lime, not WhatsApp green: this is a brand
 * action, and only real WhatsApp actions wear the green.
 */
export function PlanTripButton({
  destination,
  children = 'Plan My Trip',
  className = 'btn btn-primary',
}: {
  destination?: string;
  children?: ReactNode;
  className?: string;
}) {
  const href = destination ? `/plan-my-trip/?destination=${encodeURIComponent(destination)}` : '/plan-my-trip/';
  return (
    <Link className={className} href={href}>
      <IconPlane size={18} color="currentColor" />
      {children}
    </Link>
  );
}

export function SectionHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
      <div className="rule" aria-hidden="true" />
    </div>
  );
}

export function TripCard({
  slug,
  name,
  durationShort,
  photo,
  code,
}: {
  slug: string;
  name: string;
  durationShort: string;
  photo: string;
  caption?: string;
  rotate?: number; // accepted for compatibility; boarding passes sit straight
  code?: string;
}) {
  return (
    <Link className="print-link" href={`/trips/${slug}/`}>
      <span className="sr-only">{name} trip details</span>
      <span aria-hidden="true">
        <span className="print pass" style={{ display: 'block' }}>
          <i className="corner tl" />
          <i className="corner tr" />
          <span className="frame" style={{ display: 'block', aspectRatio: '4 / 3' }}>
            <img src={photo} alt="" loading="lazy" sizes="(max-width: 980px) 50vw, 25vw" />
          </span>
          <span className="pass-meta">
            <span className="pass-route hand">
              KLH <IconPlane size={13} color="var(--leaf)" /> {code ?? 'TRIP'}
            </span>
            <span className="pass-name">{name}</span>
            <span className="pass-duration hand">{durationShort}</span>
          </span>
        </span>
      </span>
    </Link>
  );
}

export function PhoneLine() {
  return (
    <a className="footer-phone" href={site.phoneLink}>
      <IconPhone size={22} /> {site.phoneDisplay}
    </a>
  );
}
