'use client';

import { useEffect, useState } from 'react';
import { site, waLink, defaultWaMessage } from '@/lib/site';
import { IconWhatsApp } from '@/components/ui';

// Floats only after the header (with its own Chat With Us button) scrolls away,
// so the page never shows two identical WhatsApp pills at once.
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (!header) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0 });
    io.observe(header);
    return () => io.disconnect();
  }, []);

  return (
    <a
      className="float-wa"
      style={show ? undefined : { opacity: 0, pointerEvents: 'none', transform: 'translateY(12px)' }}
      href={waLink(defaultWaMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      aria-hidden={show ? undefined : true}
      tabIndex={show ? undefined : -1}
    >
      <IconWhatsApp />
      <span className="label">Chat With Us</span>
    </a>
  );
}
