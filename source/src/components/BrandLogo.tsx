import { Link } from 'react-router-dom';

export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="brand" aria-label="WEBSTORE home">
    <img src="./logo.svg" alt="" className="brand-mark" />
    {!compact && <span className="brand-name">WEBSTORE<span className="brand-dot">.</span><small>DISCOVER THE WEB</small></span>}
  </Link>;
}
