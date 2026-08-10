import Link from 'next/link';
import { site, waLink, defaultWaMessage } from '@/lib/site';
import { announcements } from '@/lib/content';
import { IconPhone } from '@/components/ui';

export function AnnouncementBar() {
  return (
    <div className="announce" role="status">
      <span>{announcements[0]}</span>
      <span>{announcements[1]}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img className="brand-mark brand-mark-footer" src="/brand/irl-mark.png" alt="IRL - In Real Life" width={457} height={203} style={{ marginBottom: '0.6rem' }} />
            <p className="hand" style={{ color: 'var(--cream-soft)', fontSize: '1.1rem' }}>
              We plan. You travel.
            </p>
            <p style={{ marginTop: '0.6rem', color: 'var(--cream-soft)' }}>
              Holiday packages from Kolhapur to all of India and the world.
            </p>
            <a className="footer-phone" href={site.phoneLink}>
              <IconPhone size={20} /> {site.phoneDisplay}
            </a>
            <p>
              <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
              {' · '}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div>
            <h3>Visit us</h3>
            <p>{site.address}</p>
            <p style={{ marginTop: '0.4rem' }}>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(site.mapsQuery)}`} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </p>
            <p style={{ marginTop: '0.4rem' }}>{site.timings}</p>
          </div>
          <div>
            <h3>Quick links</h3>
            <p>
              <Link href="/india-trips/">India Trips</Link>
              <br />
              <Link href="/world-trips/">World Trips</Link>
              <br />
              <Link href="/how-it-works/">How It Works</Link>
              <br />
              <Link href="/reviews/">Reviews</Link>
              <br />
              <Link href="/faq/">FAQ</Link>
              <br />
              <Link href="/contact/">Contact</Link>
            </p>
            <h3 style={{ marginTop: '1.2rem' }}>Follow us</h3>
            <p>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              {' · '}
              <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              {' · '}
              <a href={site.youtube} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </p>
          </div>
        </div>
        <p className="footer-bottom">{site.bottomLine}</p>
      </div>
    </footer>
  );
}
