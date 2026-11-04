import { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Brain, BriefcaseBusiness, Check, ChevronRight, Clock3, Clapperboard, Columns2, Cpu, Download, ExternalLink, Folder, Gamepad2, GraduationCap, Heart, Layers, Palette, Plus, Search, ShieldCheck, Trash2, Upload, Users, Wrench, X, Code2 } from 'lucide-react';
import websites from '../data/websites.json';
import { categories } from '../data/categories';
import type { Collection, LibraryState, Website } from '../types';
import { relatedWebsites, searchWebsites } from '../lib/storage';
import { useStore } from '../lib/store';
import WebsiteCard from '../components/WebsiteCard';
import Favicon from '../components/Favicon';

const allSites = websites as Website[];
const categoryById = (id: string) => categories.find((category) => category.id === id);
const categoryIcons: Record<string, ComponentType<{ size?: number }>> = { brain: Brain, users: Users, gamepad: Gamepad2, code: Code2, 'graduation-cap': GraduationCap, palette: Palette, layers: Layers, clapperboard: Clapperboard, search: Search, wrench: Wrench, briefcase: BriefcaseBusiness, cpu: Cpu };
function CategoryGlyph({ name }: { name: string }) { const Icon = categoryIcons[name] || Search; return <Icon size={16} />; }
const priceLabel: Record<string, string> = { free: 'Free', freemium: 'Freemium', paid: 'Paid', 'usage-based': 'Usage-based', commercial: 'Commercial' };

function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow">{children}</div>; }
function SectionHead({ title, subtitle, to }: { title: string; subtitle?: string; to?: string }) {
  return <div className="section-head"><div><h2>{title}</h2>{subtitle && <div className="section-sub">{subtitle}</div>}</div>{to && <Link className="text-link" to={to}>View all <ArrowUpRight size={13} /></Link>}</div>;
}
function EmptyState({ title, description, to = '/websites', action = 'Explore websites' }: { title: string; description: string; to?: string; action?: string }) {
  return <div className="empty-state"><div className="empty-icon"><Search size={23} /></div><h3>{title}</h3><p>{description}</p><Link className="btn btn-primary" to={to}>{action}</Link></div>;
}

export function OverviewPage() {
  const { state } = useStore();
  const featured = allSites.filter((site) => site.featured).slice(0, 6);
  const trending = ['chatgpt', 'figma', 'perplexity', 'github', 'canva', 'spotify'].map((id) => allSites.find((site) => site.id === id)).filter((site): site is Website => Boolean(site));
  const recent = allSites.slice(-6).reverse();
  const favoriteCategories = [...new Set(state.favorites.map((id) => allSites.find((site) => site.id === id)?.category).filter((value): value is string => Boolean(value)))];
  const recommended = (favoriteCategories.length ? allSites.filter((site) => favoriteCategories.includes(site.category) && !state.favorites.includes(site.id)) : ['claude', 'duolingo', 'photopea', 'spotify', 'github', 'khan-academy'].map((id) => allSites.find((site) => site.id === id)).filter((site): site is Website => Boolean(site))).slice(0, 6);
  return <div className="page-content">
    <section className="hero"><div className="hero-orbit" /><div className="hero-content"><Eyebrow>A better way to explore the internet</Eyebrow><h1>Discover your next<br /><span>favorite website.</span></h1><p className="lead">Explore useful tools, creative platforms and digital resources from across the Internet — thoughtfully organized in one place.</p><div className="hero-actions"><Link to="/websites" className="btn btn-primary">Explore library <ArrowUpRight size={15} /></Link><button type="button" className="btn" onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>Discover categories</button></div></div></section>
    <div className="stat-row"><div className="stat-card"><div className="stat-icon"><Columns2 size={18} /></div><div className="stat-text"><strong>300</strong><span>Curated websites</span></div></div><div className="stat-card"><div className="stat-icon"><Folder size={18} /></div><div className="stat-text"><strong>12</strong><span>Discovery categories</span></div></div><div className="stat-card"><div className="stat-icon"><Bookmark size={18} /></div><div className="stat-text"><strong>{state.saved.length}</strong><span>Saved by you</span></div></div><div className="stat-card"><div className="stat-icon"><Heart size={18} /></div><div className="stat-text"><strong>{state.favorites.length}</strong><span>Your favorites</span></div></div></div>
    <section className="section-block" id="categories"><SectionHead title="Explore categories" subtitle="Find the right starting point for whatever you want to do." to="/websites" /><div className="category-grid">{categories.map((category) => <Link key={category.id} to={`/category/${category.id}`} className="category-tile"><div className="tile-icon" style={{ background: `${category.color}18`, color: category.color }}><CategoryGlyph name={category.icon} /></div><strong>{category.name}</strong><small>{allSites.filter((site) => site.category === category.id).length} websites</small></Link>)}</div></section>
    <section className="section-block"><SectionHead title="Featured websites" subtitle="A hand-picked selection worth exploring." to="/featured" /><div className="website-grid">{featured.map((site) => <WebsiteCard key={site.id} site={site} />)}</div></section>
    <section className="section-block"><SectionHead title="Trending discoveries" subtitle="Curated picks from this directory — not live popularity rankings." to="/trending" /><div className="website-grid">{trending.map((site) => <WebsiteCard key={site.id} site={site} />)}</div></section>
    <section className="section-block"><SectionHead title="Recently added" subtitle="The latest entries in the WEBSTORE directory." to="/websites" /><div className="website-grid">{recent.map((site) => <WebsiteCard key={site.id} site={site} />)}</div></section>
    <section className="section-block"><SectionHead title="Recommended websites" subtitle="A deterministic selection based on your saved interests." /><div className="website-grid">{recommended.map((site) => <WebsiteCard key={site.id} site={site} />)}</div></section>
    <section className="section-block"><SectionHead title="Your personal library" subtitle="Keep useful places close at hand." /><div className="category-grid"><Link className="category-tile" to="/favorites"><div className="tile-icon" style={{ background: '#fff0f2', color: '#d75b75' }}><Heart size={16} /></div><strong>Favorites</strong><small>{state.favorites.length} websites</small></Link><Link className="category-tile" to="/saved"><div className="tile-icon" style={{ background: '#edf2ff', color: '#526ed1' }}><Bookmark size={16} /></div><strong>Saved websites</strong><small>{state.saved.length} websites</small></Link><Link className="category-tile" to="/collections"><div className="tile-icon" style={{ background: '#f2edff', color: '#8a69ce' }}><Folder size={16} /></div><strong>Collections</strong><small>{state.collections.length} collections</small></Link><Link className="category-tile" to="/compare"><div className="tile-icon" style={{ background: '#eef7f3', color: '#43866c' }}><Columns2 size={16} /></div><strong>Compare</strong><small>{state.compare.length} selected</small></Link></div></section>
  </div>;
}

export function ListingPage({ mode = 'all' }: { mode?: 'all' | 'featured' | 'trending' | 'favorites' | 'saved' | 'recent' | 'category' }) {
  const { id = '' } = useParams();
  const { state, setState } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(mode === 'category' ? id : 'all');
  const [subcategory, setSubcategory] = useState('all');
  const [tag, setTag] = useState('all');
  const [pricing, setPricing] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [sort, setSort] = useState(state.sort);
  const [limit, setLimit] = useState(30);
  useEffect(() => { setCategory(mode === 'category' ? id : 'all'); setSubcategory('all'); setTag('all'); setLimit(30); }, [mode, id]);

  const base = useMemo(() => {
    switch (mode) {
      case 'featured': return allSites.filter((site) => site.featured);
      case 'trending': return ['chatgpt', 'figma', 'perplexity', 'github', 'canva', 'spotify', 'unsplash', 'midjourney'].map((key) => allSites.find((site) => site.id === key)).filter((site): site is Website => Boolean(site));
      case 'favorites': return state.favorites.map((key) => allSites.find((site) => site.id === key)).filter((site): site is Website => Boolean(site));
      case 'saved': return state.saved.map((key) => allSites.find((site) => site.id === key)).filter((site): site is Website => Boolean(site));
      case 'recent': return state.recent.map((entry) => allSites.find((site) => site.id === entry.id)).filter((site): site is Website => Boolean(site));
      case 'category': return allSites.filter((site) => site.category === id);
      default: return allSites;
    }
  }, [mode, id, state.favorites, state.saved, state.recent]);

  const currentCategory = categoryById(mode === 'category' ? id : category);
  const filtered = useMemo(() => {
    let result = searchWebsites(base, query);
    if (category !== 'all') result = result.filter((site) => site.category === category);
    if (subcategory !== 'all') result = result.filter((site) => site.subcategory === subcategory);
    if (tag !== 'all') result = result.filter((site) => site.tags.includes(tag));
    if (pricing !== 'all') result = result.filter((site) => site.pricing === pricing);
    if (platform !== 'all') result = result.filter((site) => site.platform === platform);
    return [...result].sort((a, b) => sort === 'az' ? a.name.localeCompare(b.name) : sort === 'za' ? b.name.localeCompare(a.name) : sort === 'recent' ? b.addedOrder - a.addedOrder : Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
  }, [base, query, category, subcategory, tag, pricing, platform, sort]);
  const visible = filtered.slice(0, limit);
  const scoped = base.filter((site) => category === 'all' || site.category === category);
  const subcategories = [...new Set(scoped.map((site) => site.subcategory))].sort();
  const tags = [...new Set(scoped.flatMap((site) => site.tags))].sort();
  const config = {
    all: ['All websites', 'Explore the complete directory. Search, filter and find your next useful tool.'],
    featured: ['Featured websites', 'A hand-picked selection from across the WEBSTORE library.'],
    trending: ['Trending discoveries', 'Curated picks from the WEBSTORE library — not live popularity rankings.'],
    favorites: ['Favorites', 'The websites you have marked as favorites.'],
    saved: ['Saved websites', 'A personal reading list of useful websites.'],
    recent: ['Recently viewed', 'The latest website profiles you opened on this device.'],
    category: [currentCategory?.name || 'Category', currentCategory?.description || 'Browse websites in this category.'],
  }[mode];
  const clear = () => { setQuery(''); setCategory(mode === 'category' ? id : 'all'); setSubcategory('all'); setTag('all'); setPricing('all'); setPlatform('all'); setSort(state.sort); setLimit(30); };
  return <div className="page-content"><div className="page-heading"><div><Eyebrow>{mode === 'category' ? 'Browse category' : 'Explore the directory'}</Eyebrow><h1>{config[0]}</h1><p className="lead">{config[1]}</p></div><div className="heading-meta">{filtered.length} matching websites</div></div>
    <div className="list-toolbar"><input className="filter-input" placeholder="Search by name, domain, tags or description..." value={query} onChange={(event) => { setQuery(event.target.value); setLimit(30); }} aria-label="Filter websites" /><select className="filter-select" value={category} disabled={mode === 'category'} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select className="filter-select" value={subcategory} onChange={(event) => setSubcategory(event.target.value)}><option value="all">All subcategories</option>{subcategories.map((item) => <option key={item} value={item}>{item}</option>)}</select><select className="filter-select" value={tag} onChange={(event) => setTag(event.target.value)}><option value="all">All tags</option>{tags.map((item) => <option key={item} value={item}>{item}</option>)}</select><select className="filter-select" value={pricing} onChange={(event) => setPricing(event.target.value)}><option value="all">Any pricing</option>{Object.entries(priceLabel).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><select className="filter-select" value={platform} onChange={(event) => setPlatform(event.target.value)}><option value="all">All platforms</option><option value="web">Web</option></select><select className="filter-select" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="featured">Featured first</option><option value="az">A – Z</option><option value="za">Z – A</option><option value="recent">Recently added</option></select><button className="btn btn-sm" onClick={clear}><Wrench size={14} /> Clear</button><span className="results-label">Showing {visible.length} of {filtered.length}</span></div>
    {visible.length ? <><div className="website-grid">{visible.map((site) => <WebsiteCard key={site.id} site={site} />)}</div>{filtered.length > visible.length && <div className="load-more-wrap"><button className="btn" onClick={() => setLimit((old) => old + 30)}>Load more websites</button><div className="pagination-note">Showing {visible.length} of {filtered.length} results</div></div>}</> : <EmptyState title="No websites found" description="Try a different search or remove one of your filters." to={mode === 'favorites' || mode === 'saved' || mode === 'recent' ? '/websites' : '/'} action="Clear filters" />}
  </div>;
}

export function DetailsPage() {
  const { id = '' } = useParams();
  const { state, setState, toggleFavorite, toggleSaved, toggleCompare, addToCollection, notify } = useStore();
  const site = allSites.find((item) => item.id === id);
  const [checking, setChecking] = useState(false);
  useEffect(() => {
    if (site && state.historyOn) setState((old) => ({ ...old, recent: [{ id: site.id, at: Date.now() }, ...old.recent.filter((entry) => entry.id !== site.id)].slice(0, 40) }));
  }, [site?.id, state.historyOn, setState]);
  if (!site) return <EmptyState title="Website not found" description="This entry is not in the current directory." />;
  const category = categoryById(site.category);
  const related = relatedWebsites(allSites, site);
  const verification = state.verification[site.id];
  const verificationStatus = verification?.status || site.status;
  const checkWebsite = async () => {
    setChecking(true);
    try {
      const response = await fetch(site.url, { method: 'HEAD', mode: 'cors', cache: 'no-store' });
      if (response.ok) { setState((old) => ({ ...old, verification: { ...old.verification, [site.id]: { status: 'verified', verifiedAt: new Date().toISOString() } } })); notify('Website marked Verified.'); }
      else if (response.status === 404 || response.status === 410) { setState((old) => ({ ...old, verification: { ...old.verification, [site.id]: { status: 'broken', verifiedAt: new Date().toISOString() } } })); notify('A missing-page response was confirmed.', true); }
      else { notify(`The server responded with ${response.status}; status remains Unchecked.`, true); }
    } catch { notify('The check was inconclusive (often due to browser cross-origin rules). Status remains Unchecked.', true); }
    finally { setChecking(false); }
  };
  return <div className="page-content"><div className="page-heading"><div><Eyebrow>Website profile</Eyebrow><h1>Discover {site.name}</h1><p className="lead">A closer look at this entry in the WEBSTORE directory.</p></div><Link className="text-link" to="/websites">← Back to library</Link></div>
    <section className="detail-hero"><div className="detail-head"><Favicon site={site} large /><div className="detail-title"><h1>{site.name}</h1><p>{site.domain}</p></div><div className="detail-actions"><a className="btn btn-primary" href={site.url} target="_blank" rel="noopener noreferrer">Visit website <ExternalLink size={14} /></a><button className={`btn ${state.favorites.includes(site.id) ? 'btn-blue' : ''}`} onClick={() => toggleFavorite(site.id)}><Heart size={14} /> {state.favorites.includes(site.id) ? 'Favorited' : 'Favorite'}</button><button className={`btn ${state.saved.includes(site.id) ? 'btn-blue' : ''}`} onClick={() => toggleSaved(site.id)}><Bookmark size={14} /> {state.saved.includes(site.id) ? 'Saved' : 'Save'}</button><button className="btn" onClick={() => addToCollection(site.id)}><Folder size={14} /> Add to collection</button></div></div><p className="detail-description">{site.description}</p><div className="tag-row">{site.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="detail-meta"><div className="meta-cell"><span>Category</span><strong>{category?.name}</strong></div><div className="meta-cell"><span>Subcategory</span><strong>{site.subcategory}</strong></div><div className="meta-cell"><span>Pricing model</span><strong>{priceLabel[site.pricing]}</strong></div><div className="meta-cell"><span>Verification</span><strong className={`status ${verificationStatus}`}>{verificationStatus === 'verified' ? 'Verified' : verificationStatus === 'broken' ? 'Broken' : 'Unchecked'}</strong></div><div className="meta-cell"><span>Platform</span><strong>{site.platform}</strong></div><div className="meta-cell"><span>Last checked</span><strong>{verification?.verifiedAt ? new Date(verification.verifiedAt).toLocaleString() : 'Not checked'}</strong></div><div className="meta-cell"><span>Official URL</span><strong><a className="text-link" href={site.url} target="_blank" rel="noopener noreferrer">Open <ExternalLink size={12} /></a></strong></div><div className="meta-cell"><span>Comparison</span><strong><button className="text-link" onClick={() => toggleCompare(site.id)}>{state.compare.includes(site.id) ? 'Remove from comparison' : 'Add to comparison'}</button></strong></div><div className="meta-cell"><span>Verification check</span><strong><button className="text-link" disabled={checking} onClick={checkWebsite}><ShieldCheck size={13} /> {checking ? 'Checking…' : 'Check manually'}</button></strong></div></div></section>
    <section className="section-block"><div className="section-head"><div><h2>Related websites</h2><div className="section-sub">Selected by category, subcategory and shared tags.</div></div></div><div className="related-grid">{related.map((item) => <WebsiteCard key={item.id} site={item} />)}</div></section>
  </div>;
}

export function CollectionsPage() {
  const { state, setState, notify } = useStore();
  const create = () => { const name = window.prompt('Name this collection:'); if (!name?.trim()) return; setState((old) => ({ ...old, collections: [...old.collections, { id: `c-${Date.now().toString(36)}`, name: name.trim(), items: [] }] })); notify('Collection created.'); };
  const rename = (collection: Collection) => { const name = window.prompt('Rename collection:', collection.name); if (!name?.trim()) return; setState((old) => ({ ...old, collections: old.collections.map((c) => c.id === collection.id ? { ...c, name: name.trim() } : c) })); notify('Collection renamed.'); };
  const remove = (collection: Collection) => { if (!window.confirm(`Delete “${collection.name}”?`)) return; setState((old) => ({ ...old, collections: old.collections.filter((c) => c.id !== collection.id) })); notify('Collection deleted.'); };
  return <div className="page-content"><div className="page-heading"><div><Eyebrow>Your private library</Eyebrow><h1>Collections</h1><p className="lead">Group useful websites into personal lists and keep everything organized.</p></div><button className="btn btn-primary" onClick={create}><Plus size={14} /> New collection</button></div>{state.collections.length ? <div className="collection-grid">{state.collections.map((collection) => <div className="collection-card" key={collection.id}><div className="collection-icon"><Folder size={18} /></div><h3>{collection.name}</h3><p>{collection.items.length} saved {collection.items.length === 1 ? 'website' : 'websites'}</p><div className="row-actions"><Link className="btn btn-sm btn-primary" to={`/collection/${collection.id}`}>Open collection</Link><button className="btn btn-sm" onClick={() => rename(collection)}>Rename</button><button className="btn btn-sm btn-quiet" onClick={() => remove(collection)}><Trash2 size={14} /></button></div></div>)}</div> : <EmptyState title="No collections yet" description="Create a collection to organize websites for a project, class or interest." to="/websites" action="Explore websites" />}</div>;
}

export function CollectionDetailsPage() {
  const { id = '' } = useParams();
  const { state, setState, notify } = useStore();
  const collection = state.collections.find((item) => item.id === id);
  if (!collection) return <EmptyState title="Collection not found" description="This collection may have been removed." to="/collections" action="Back to collections" />;
  const items = collection.items.map((key) => allSites.find((site) => site.id === key)).filter((site): site is Website => Boolean(site));
  const remove = (siteId: string) => { setState((old) => ({ ...old, collections: old.collections.map((c) => c.id === id ? { ...c, items: c.items.filter((key) => key !== siteId) } : c) })); notify('Removed from collection.'); };
  return <div className="page-content"><div className="page-heading"><div><Eyebrow>Personal collection</Eyebrow><h1>{collection.name}</h1><p className="lead">{items.length} websites saved in this collection.</p></div><Link to="/collections" className="btn">All collections</Link></div>{items.length ? <div className="website-grid">{items.map((site) => <div key={site.id} style={{ position: 'relative' }}><WebsiteCard site={site} /><button className="card-link" style={{ margin: '7px 0 0 7px' }} onClick={() => remove(site.id)}><Trash2 size={13} /> Remove from collection</button></div>)}</div> : <EmptyState title="This collection is empty" description="Add websites from their detail pages or website cards." />}</div>;
}

export function ComparePage() {
  const { state, setState } = useStore();
  const items = state.compare.map((id) => allSites.find((site) => site.id === id)).filter((site): site is Website => Boolean(site));
  if (!items.length) return <EmptyState title="Nothing to compare" description="Select two or three websites from the directory to compare their details." />;
  const rows: [string, (site: Website) => ReactNode][] = [
    ['Domain', (site) => site.domain], ['Description', (site) => site.description], ['Category', (site) => categoryById(site.category)?.name], ['Subcategory', (site) => site.subcategory], ['Pricing', (site) => priceLabel[site.pricing]], ['Platform', (site) => site.platform], ['Tags', (site) => site.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)], ['Verification', (site) => { const status = state.verification[site.id]?.status || site.status; return <span className={`status ${status}`}>{status}</span>; }], ['Official website', (site) => <a className="text-link" href={site.url} target="_blank" rel="noopener noreferrer">Visit <ExternalLink size={12} /></a>],
  ];
  return <div className="page-content"><div className="page-heading"><div><Eyebrow>Make a clear choice</Eyebrow><h1>Compare websites</h1><p className="lead">Review the details side by side. WEBSTORE does not invent ratings or performance scores.</p></div><button className="btn" onClick={() => setState((old) => ({ ...old, compare: [] }))}>Clear comparison</button></div>{items.length < 2 && <div className="empty-state" style={{ marginBottom: 15, padding: 20 }}><p>Add at least one more website to compare two entries.</p><Link to="/websites" className="text-link">Browse the directory <ArrowUpRight size={13} /></Link></div>}<div className="compare-wrap"><table className="compare-table"><thead><tr><th>Website</th>{items.map((site) => <th key={site.id}><div className="compare-website"><Favicon site={site} /><strong>{site.name}</strong><button className="mini-action" aria-label={`Remove ${site.name}`} onClick={() => setState((old) => ({ ...old, compare: old.compare.filter((id) => id !== site.id) }))}><X size={13} /></button></div></th>)}</tr></thead><tbody>{rows.map(([label, render]) => <tr key={label}><td>{label}</td>{items.map((site) => <td key={site.id}>{render(site)}</td>)}</tr>)}</tbody></table></div></div>;
}

export function SettingsPage() {
  const { state, setState, notify } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const exportBackup = () => {
    const payload = { format: 'webstore-backup', schemaVersion: 1, exportedAt: new Date().toISOString(), data: { favorites: state.favorites, saved: state.saved, recent: state.recent, compare: state.compare, collections: state.collections, verification: state.verification, preferences: { theme: state.theme, sort: state.sort, density: state.density, historyOn: state.historyOn } } };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `webstore-backup-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url); notify('Personal data exported.');
  };
  const importBackup = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as { format?: string; schemaVersion?: number; exportedAt?: string; data?: Partial<LibraryState> & { preferences?: Partial<LibraryState> } };
      const d = parsed.data;
      if (parsed.format !== 'webstore-backup' || parsed.schemaVersion !== 1 || !d) throw new Error('This is not a supported WEBSTORE backup.');
      for (const key of ['favorites', 'saved', 'recent', 'compare', 'collections'] as const) if (d[key] !== undefined && !Array.isArray(d[key])) throw new Error(`Invalid ${key} data.`);
      const ids = [...(d.favorites || []), ...(d.saved || []), ...(d.compare || [])] as string[];
      if (ids.some((key) => typeof key !== 'string' || !allSites.some((site) => site.id === key))) throw new Error('Backup contains an unknown website ID.');
      if ((d.compare || []).length > 3) throw new Error('A comparison backup cannot contain more than 3 websites.');
      if ((d.collections || []).some((item) => !item || typeof item.id !== 'string' || typeof item.name !== 'string' || !Array.isArray(item.items) || item.items.some((key) => !allSites.some((site) => site.id === key)))) throw new Error('Invalid collection data.');
      if (!window.confirm(`Import backup from ${parsed.exportedAt || 'an earlier date'}? This replaces current personal data on this device. The 300 website catalog will not change.`)) return;
      setState((old) => ({ ...old, favorites: d.favorites || [], saved: d.saved || [], recent: d.recent || [], compare: d.compare || [], collections: d.collections || [], verification: d.verification && typeof d.verification === 'object' ? d.verification : {}, theme: d.preferences?.theme || old.theme, sort: d.preferences?.sort || old.sort, density: d.preferences?.density || old.density, historyOn: d.preferences?.historyOn ?? old.historyOn }));
      notify('Backup imported successfully.');
    } catch (error) { notify(error instanceof Error ? error.message : 'Could not read this backup.', true); }
  };
  const reset = () => { if (window.confirm('Reset favorites, saved websites, collections, comparison, history and preferences on this device? The directory catalog will remain unchanged.')) { setState({ favorites: [], saved: [], recent: [], compare: [], collections: [], verification: {}, theme: 'system', sort: 'featured', density: 'comfortable', historyOn: true }); notify('Personal data has been reset.'); } };
  return <div className="page-content"><div className="page-heading"><div><Eyebrow>Make it yours</Eyebrow><h1>Settings</h1><p className="lead">Manage appearance, browsing preferences and personal data.</p></div></div><div className="settings-grid">
    <section className="settings-card"><h3>Appearance</h3><p>Choose how WEBSTORE looks on this device.</p><div className="setting-row"><div><strong>Theme</strong><small>Choose light, dark or follow your system.</small></div><select className="filter-select" value={state.theme} onChange={(event) => setState((old) => ({ ...old, theme: event.target.value as LibraryState['theme'] }))}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div><div className="setting-row"><div><strong>View density</strong><small>Adjust the directory browsing layout.</small></div><select className="filter-select" value={state.density} onChange={(event) => setState((old) => ({ ...old, density: event.target.value as LibraryState['density'] }))}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></div></section>
    <section className="settings-card"><h3>Browsing preferences</h3><p>Control how the directory behaves on this device.</p><div className="setting-row"><div><strong>Default sorting</strong><small>Initial sort order for website lists.</small></div><select className="filter-select" value={state.sort} onChange={(event) => setState((old) => ({ ...old, sort: event.target.value as LibraryState['sort'] }))}><option value="featured">Featured first</option><option value="az">A – Z</option><option value="za">Z – A</option><option value="recent">Recently added</option></select></div><div className="setting-row"><div><strong>Recently viewed history</strong><small>Save a local list of pages you open.</small></div><input className="switch" type="checkbox" checked={state.historyOn} onChange={(event) => setState((old) => ({ ...old, historyOn: event.target.checked }))} /></div></section>
    <section className="settings-card"><h3>Backup & restore</h3><p>Export your personal WEBSTORE library or import a previous backup. The curated website catalog stays separate.</p><div className="row-actions"><button className="btn btn-sm btn-primary" onClick={exportBackup}><Download size={14} /> Export personal data</button><button className="btn btn-sm" onClick={() => fileRef.current?.click()}><Upload size={14} /> Import backup</button><input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => importBackup(event.target.files?.[0])} /></div></section>
    <section className="settings-card"><h3>Manage local data</h3><p>These actions only affect personal information stored in this browser.</p><div className="row-actions"><button className="btn btn-sm" onClick={() => { setState((old) => ({ ...old, recent: [] })); notify('Browsing history cleared.'); }}>Clear history</button><button className="btn btn-sm" onClick={reset}>Reset personal data</button></div></section>
    <section className="settings-card"><h3>About WEBSTORE</h3><p>A curated website discovery library designed to make useful parts of the Internet easier to find.</p><div className="setting-row"><div><strong>Version</strong><small>Current local release</small></div><strong>1.0.0</strong></div><div className="setting-row"><div><strong>Directory size</strong><small>Curated records across 12 categories</small></div><strong>300 websites</strong></div></section>
    <section className="settings-card"><h3>Privacy by design</h3><p>Favorites, saved items, collections, preferences and history stay in this browser. There is no account, backend synchronization or remote personal-data profile.</p><Link className="text-link" to="/privacy">Read the privacy policy <ArrowUpRight size={13} /></Link></section>
  </div></div>;
}

export function InfoPage({ page }: { page: 'about' | 'privacy' | 'terms' | 'disclaimer' }) {
  const content = {
    about: <><Eyebrow>About the platform</Eyebrow><h1>Explore. Discover. Connect.</h1><p>WEBSTORE is an independent directory built to make discovering useful websites feel simple. It brings tools, creative platforms, learning resources and digital services into one organized library.</p><h2>A curated starting point</h2><p>Browse twelve categories, search by name or topic, compare services and build personal collections. Featured and trending areas are editorial selections from this directory — they are not live Internet popularity rankings.</p><h2>Local-first by default</h2><p>Your favorites, saved items, collections, comparison list, preferences and browsing history are stored in your current browser. No account or backend is required for the core experience.</p></>,
    privacy: <><Eyebrow>Your data</Eyebrow><h1>Privacy Policy</h1><p>WEBSTORE is designed as a local-first directory. It does not require an account to use its core discovery features.</p><h2>Data stored on your device</h2><p>Favorites, saved websites, collections, comparison selections, recently viewed entries and preferences are stored in browser local storage. This data is not synchronized to a WEBSTORE server.</p><h2>External websites</h2><p>Opening a listed website takes you to a third-party service. Those websites may collect information under their own privacy policies and terms. Remote favicons may also be requested from a public favicon service when a card is displayed.</p><h2>Backups and deletion</h2><p>You can export personal data as a JSON file, import a prior backup, clear browsing history or reset personal data from Settings. Clearing browser storage also removes locally stored WEBSTORE preferences and library data.</p></>,
    terms: <><Eyebrow>Using the directory</Eyebrow><h1>Terms of Use</h1><p>WEBSTORE is provided as a discovery directory to help users find third-party websites. Use the directory responsibly and review the terms of any external service before using it.</p><h2>Third-party services</h2><p>Each listed website is operated by its respective owner. WEBSTORE does not control external content, account requirements, pricing, availability or policies.</p><h2>Accuracy and availability</h2><p>Descriptions and classifications are provided as a helpful guide and may become outdated. Always confirm important details on the official website.</p><h2>Responsible use</h2><p>Do not use the directory to violate applicable laws, third-party rights or service terms. The directory is provided without guarantees that a third-party service will remain available or unchanged.</p></>,
    disclaimer: <><Eyebrow>Important information</Eyebrow><h1>Disclaimer</h1><p>WEBSTORE is an independent website directory. It is not owned, operated, sponsored or endorsed by the third-party websites listed in its catalog.</p><h2>Trademarks and logos</h2><p>All third-party names, logos and trademarks belong to their respective owners. Favicons are loaded from external sources and are displayed only to help identify listed websites.</p><h2>Information may change</h2><p>Website availability, features, pricing, terms and privacy practices can change at any time. Listing a website does not imply endorsement, certification or a guarantee of quality.</p><h2>Verification status</h2><p>New catalog entries are marked Unchecked. A browser-based check may be inconclusive because of cross-origin restrictions. Only a direct successful response or a clear missing-page response can update a status; inconclusive checks remain Unchecked.</p></>,
  }[page];
  return <div className="page-content"><div className="info-page">{content}</div></div>;
}
