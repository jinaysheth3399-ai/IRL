'use client';

import { useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'irl-loader-seen';
const FADE_MS = 550;
// Backstop only: the clip runs ~4.5s, so this covers a stalled decode without
// ever holding a visitor behind a blank screen.
const FALLBACK_MS = 6000;

// Plays the IRL logo-motion once per browser session, then fades to reveal the site.
// Skips entirely on repeat visits within a session and for prefers-reduced-motion.
export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setFading(true);
      window.setTimeout(() => setVisible(false), FADE_MS);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = sessionStorage.getItem(SEEN_KEY);

    if (alreadySeen || reduceMotion) {
      doneRef.current = true;
      setVisible(false);
      return;
    }

    sessionStorage.setItem(SEEN_KEY, '1');
    document.documentElement.style.overflow = 'hidden';
    const fallback = window.setTimeout(finish, FALLBACK_MS);
    const video = videoRef.current;
    video?.addEventListener('ended', finish);
    video?.addEventListener('error', finish);
    video?.play().catch(finish);

    return () => {
      window.clearTimeout(fallback);
      video?.removeEventListener('ended', finish);
      video?.removeEventListener('error', finish);
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = '';
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`site-loader${fading ? ' is-fading' : ''}`} role="presentation" aria-hidden="true">
      <video ref={videoRef} className="site-loader-video" src="/irl-loader.mp4" muted playsInline preload="auto" />
    </div>
  );
}
