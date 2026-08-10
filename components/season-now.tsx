'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Season = {
  months: string;
  monthNumbers: number[];
  text: string;
  slugs: string[];
};

// Highlights the season block that matches the visitor's current month.
export function SeasonNow({ seasons }: { seasons: Season[] }) {
  const [month, setMonth] = useState<number | null>(null);

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
  }, []);

  return (
    <div className="grid-3">
      {seasons.map((s, i) => {
        const current = month !== null && s.monthNumbers.includes(month);
        return (
          <div
            key={s.months}
            className="note"
            style={{
              transform: `rotate(${[-0.7, 0.5, -0.4][i]}deg)`,
              outline: current ? '3px solid var(--marigold)' : 'none',
              outlineOffset: '3px',
            }}
          >
            <i className="tape" aria-hidden="true" />
            {current ? <span className="stamp">Now boarding</span> : null}
            <h3 style={{ margin: '0.25rem 0 0.5rem' }}>{s.months}</h3>
            <p>{s.text}</p>
            <p style={{ marginTop: '0.7rem' }}>
              {s.slugs.map((slug, j) => (
                <span key={slug}>
                  {j > 0 ? ' · ' : ''}
                  <Link href={`/trips/${slug}/`} style={{ color: 'var(--kumkum-deep)' }}>
                    {slug
                      .split('-')
                      .map((w) => w[0].toUpperCase() + w.slice(1))
                      .join(' ')}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
}
