'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { site, waLink, defaultWaMessage } from '@/lib/site';
import { IconWhatsApp, IconPhone, IconPlane } from '@/components/ui';

// Route codes read in the ticket voice: every destination departs from KLH.
const navItems = [
  { href: '/', label: 'Home', code: 'KLH' },
  { href: '/india-trips/', label: 'India Trips', code: 'IND' },
  { href: '/world-trips/', label: 'World Trips', code: 'WLD' },
  { href: '/how-it-works/', label: 'How It Works', code: 'PLN' },
  { href: '/reviews/', label: 'Reviews', code: 'REV' },
  { href: '/about/', label: 'About Us', code: 'IRL' },
  { href: '/contact/', label: 'Contact', code: 'TEL' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    drawerRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className={`site-header${open ? ' menu-open' : ''}`}>
      <div className="container">
        <div className="bar">
          <Link className="brand" href="/">
            <img className="brand-mark" src="/brand/irl-mark.png" alt="IRL - In Real Life" width={457} height={203} />
            <span className="tag-line">We plan. You travel.</span>
          </Link>

          <nav className="site-nav" aria-label="Main">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="bar-actions">
            <a
              className="btn btn-wa nav-wa"
              href={waLink(defaultWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp size={18} />
              <span className="nav-wa-label">Chat With Us</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav-toggle-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="nav-scrim" onClick={() => setOpen(false)} aria-hidden="true" />

      <div className="nav-drawer" id="site-menu" ref={drawerRef}>
        <nav className="drawer-nav" aria-label="Main menu">
          {navItems.map((item) => {
            const current = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} aria-current={current ? 'page' : undefined}>
                <span className="drawer-label">{item.label}</span>
                {current ? <IconPlane size={15} /> : null}
                <span className="drawer-code hand">{item.code}</span>
              </Link>
            );
          })}
        </nav>

        <div className="drawer-actions">
          <a className="btn btn-wa" href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} />
            Chat With Us
          </a>
          <a className="drawer-phone" href={site.phoneLink}>
            <IconPhone size={18} />
            {site.phoneDisplay}
          </a>
          <p className="drawer-hours hand">{site.timings}</p>
        </div>
      </div>
    </header>
  );
}
