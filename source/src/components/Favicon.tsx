import { useState } from 'react';
import type { Website } from '../types';

export default function Favicon({ site, large = false }: { site: Website; large?: boolean }) {
  const sources = [
    `https://${site.domain}/favicon.ico`,
    `https://icons.duckduckgo.com/ip3/${encodeURIComponent(site.domain)}.ico`,
    `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${site.domain}`)}&sz=128`,
  ];
  const [sourceIndex, setSourceIndex] = useState(0);
  const initials = (site.name.trim()[0] || site.domain.trim()[0] || 'W').toUpperCase();

  return <div className={`favicon-box${large ? ' favicon-box-large' : ''}`}>
    {sourceIndex < sources.length ? (
      <img
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        src={sources[sourceIndex]}
        alt=""
        onError={() => setSourceIndex((current) => current + 1)}
      />
    ) : <span className="favicon-fallback favicon-initial" aria-hidden="true">{initials}</span>}
  </div>;
}
