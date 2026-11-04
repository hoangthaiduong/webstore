import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bookmark, Brain, BriefcaseBusiness, ChevronRight, Clapperboard, Clock3, Code2, Cpu, ExternalLink, Folder, Gamepad2, GraduationCap, Grid2X2, Heart, House, Info, Layers, Menu, Moon, Palette, Search, Settings, Sparkles, Sun, TrendingUp, Users, Wrench, X, type LucideIcon } from 'lucide-react';
import { categories } from '../data/categories';
import websites from '../data/websites.json';
import type { Website } from '../types';
import BrandLogo from './BrandLogo';
import Favicon from './Favicon';
import { useStore } from '../lib/store';

const iconMap: Record<string, LucideIcon> = { brain: Brain, users: Users, gamepad: Gamepad2, code: Code2, 'graduation-cap': GraduationCap, palette: Palette, layers: Layers, clapperboard: Clapperboard, search: Search, wrench: Wrench, briefcase: BriefcaseBusiness, cpu: Cpu };
const discover = [
  { to: '/', label: 'Overview', icon: House }, { to: '/websites', label: 'All websites', icon: Grid2X2 },
  { to: '/featured', label: 'Featured', icon: Sparkles }, { to: '/trending', label: 'Trending', icon: TrendingUp },
];
const library = [
  { to: '/favorites', label: 'Favorites', icon: Heart, count: 'favorites' }, { to: '/saved', label: 'Saved websites', icon: Bookmark, count: 'saved' },
  { to: '/recent', label: 'Recently viewed', icon: Clock3 }, { to: '/collections', label: 'Collections', icon: Folder }, { to: '/compare', label: 'Compare', icon: Layers, count: 'compare' },
];

function SideLink({ to, label, Icon, count }: { to: string; label: string; Icon: LucideIcon; count?: number }) {
  return <NavLink to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icon size={18} strokeWidth={1.7} /><span>{label}</span>{count !== undefined && <span className="nav-count">{count}</span>}</NavLink>;
}

export default function AppShell() {
  const { state, setState } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const list = websites as Website[];
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return list.filter((w) => [w.name, w.domain, w.description, w.category, w.subcategory, ...w.tags].join(' ').toLowerCase().includes(q)).slice(0, 7);
  }, [query, list]);
  const title = useMemo(() => {
    const path = location.pathname.split('/').filter(Boolean);
    if (!path.length) return 'Overview';
    if (path[0] === 'category') return categories.find((c) => c.id === path[1])?.name || 'Category';
    if (path[0] === 'website') return list.find((w) => w.id === path[1])?.name || 'Website details';
    return ({ websites: 'All websites', featured: 'Featured', trending: 'Trending', favorites: 'Favorites', saved: 'Saved websites', recent: 'Recently viewed', collections: 'Collections', collection: 'Collection', compare: 'Compare websites', settings: 'Settings', about: 'About WEBSTORE', privacy: 'Privacy Policy', terms: 'Terms of Use', disclaimer: 'Disclaimer' } as Record<string, string>)[path[0]] || 'Overview';
  }, [location.pathname, list]);

  useEffect(() => setMobileOpen(false), [location.pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchRef.current?.focus(); searchRef.current?.select(); setSearchOpen(true); }
      if (event.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const toggleTheme = () => setState((old) => ({ ...old, theme: old.theme === 'dark' ? 'light' : 'dark' }));
  const selectSearchResult = (id: string) => { navigate(`/website/${id}`); setQuery(''); setSearchOpen(false); };
  const isDark = state.theme === 'dark' || (state.theme === 'system' && (window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false));

  return <div className="app-shell">
    {mobileOpen && <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    <aside id="sidebar" className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand-row"><BrandLogo /><button className="icon-button sidebar-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={17} /></button></div>
      <div className="sidebar-scroll">
        <div className="nav-group"><div className="nav-label">DISCOVER</div>{discover.map((item) => <SideLink key={item.to} to={item.to} label={item.label} Icon={item.icon} count={item.to === '/websites' ? 300 : undefined} />)}</div>
        <div className="nav-group"><div className="nav-label">CATEGORIES</div><div className="category-nav">{categories.map((category) => {
          const Icon = iconMap[category.icon] || Cpu;
          const count = list.filter((site) => site.category === category.id).length;
          return <NavLink key={category.id} to={`/category/${category.id}`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><span className="category-dot" style={{ background: category.color }} /><span>{category.name}</span><span className="nav-count">{count}</span></NavLink>;
        })}</div></div>
        <div className="nav-group"><div className="nav-label">MY LIBRARY</div>{library.map((item) => <SideLink key={item.to} to={item.to} label={item.label} Icon={item.icon} count={item.count === 'favorites' ? state.favorites.length : item.count === 'saved' ? state.saved.length : item.count === 'compare' ? state.compare.length : undefined} />)}</div>
        <div className="nav-group"><div className="nav-label">SYSTEM</div><SideLink to="/settings" label="Settings" Icon={Settings} /><SideLink to="/about" label="About WEBSTORE" Icon={Info} /></div>
      </div>
      <div className="sidebar-bottom"><div className="sidebar-mini-card"><div className="mini-icon"><Sparkles size={16} /></div><div><strong>Your next discovery</strong><span>is one search away.</span></div><span className="mini-arrow">↗</span></div><div className="sidebar-version">WEBSTORE <span>v1.0.0</span></div></div>
    </aside>
    <main className="main-shell">
      <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={18} /></button><div className="breadcrumb"><span>WEBSTORE</span><span className="crumb-slash">/</span><strong>{title}</strong></div></div>
        <div className="topbar-actions"><div className="global-search-wrap"><Search size={16} className="search-icon" /><input ref={searchRef} className="global-search" type="search" placeholder="Search 300 websites..." value={query} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} onFocus={() => query && setSearchOpen(true)} onKeyDown={(event) => { if (event.key === 'Enter' && results[0]) selectSearchResult(results[0].id); }} aria-label="Search websites" /><kbd>⌘ K</kbd>{searchOpen && query && <div className="search-results">{results.length ? results.map((site) => <button key={site.id} className="search-result" onClick={() => selectSearchResult(site.id)}><Favicon site={site} /><span><strong>{site.name}</strong><small>{site.domain}</small></span></button>) : <div className="search-hint">No matching websites found.</div>}<div className="search-hint">Enter to open first result · Esc to close</div></div>}</div>
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label="Toggle light or dark theme" title="Toggle theme">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button><button className="avatar-button" onClick={() => navigate('/settings')} aria-label="Open settings">W</button>
        </div></header>
      <div className="content-scroll" onClick={(event) => { if (!(event.target as HTMLElement).closest('.global-search-wrap')) setSearchOpen(false); }}><Outlet /><footer className="footer-card"><div className="footer-top"><Link className="footer-brand" to="/"><img src="./logo.svg" alt="" /><strong>WEBSTORE</strong></Link><nav className="footer-links"><Link to="/about">About</Link><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Use</Link><Link to="/disclaimer">Disclaimer</Link></nav></div><div className="footer-bottom"><span>© 2026 WEBSTORE. All rights reserved.</span><span>Third-party names and logos belong to their respective owners.</span></div></footer></div>
    </main>
  </div>;
}
