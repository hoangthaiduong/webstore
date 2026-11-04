import { useNavigate } from 'react-router-dom';
import { Bookmark, Columns2, ExternalLink, Folder, Heart } from 'lucide-react';
import type { Website } from '../types';
import Favicon from './Favicon';
import { useStore } from '../lib/store';
import { categories } from '../data/categories';

const pricingLabel: Record<string, string> = { free: 'Free', freemium: 'Freemium', paid: 'Paid', 'usage-based': 'Usage-based', commercial: 'Commercial' };

export default function WebsiteCard({ site }: { site: Website }) {
  const navigate = useNavigate();
  const { state, toggleFavorite, toggleSaved, toggleCompare, addToCollection } = useStore();
  const favorite = state.favorites.includes(site.id);
  const saved = state.saved.includes(site.id);
  const compared = state.compare.includes(site.id);
  const category = categories.find((item) => item.id === site.category);
  return <article className="website-card card-details" onClick={() => navigate(`/website/${site.id}`)} onKeyDown={(event) => { if (event.key === 'Enter') navigate(`/website/${site.id}`); }} tabIndex={0} role="link" aria-label={`Open ${site.name} details`}>
    <div className="card-top"><Favicon site={site} /><div className="card-title"><strong>{site.name}</strong><span>{site.domain}</span></div><div className="card-actions">
      <button className={`mini-action ${favorite ? 'active' : ''}`} title={favorite ? 'Remove favorite' : 'Add to favorites'} aria-label="Toggle favorite" onClick={(event) => { event.stopPropagation(); toggleFavorite(site.id); }}><Heart size={15} fill={favorite ? 'currentColor' : 'none'} /></button>
      <button className={`mini-action ${saved ? 'saved' : ''}`} title={saved ? 'Unsave website' : 'Save website'} aria-label="Toggle saved" onClick={(event) => { event.stopPropagation(); toggleSaved(site.id); }}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /></button>
    </div></div>
    <p className="card-description">{site.description}</p>
    <div className="tag-row">{site.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
    <div className="card-footer"><div className="badge-row"><span className="badge badge-category">{category?.name || 'Other'}</span><span className="badge badge-price">{pricingLabel[site.pricing] || 'Not stated'}</span></div><div className="card-footer-actions">
      <button className="card-link" title="Add to collection" onClick={(event) => { event.stopPropagation(); addToCollection(site.id); }}><Folder size={13} /></button>
      <button className="card-link" title={compared ? 'Remove from comparison' : 'Compare'} onClick={(event) => { event.stopPropagation(); toggleCompare(site.id); }}><Columns2 size={13} />{compared ? 'Added' : 'Compare'}</button>
      <a className="card-link" href={site.url} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>View <ExternalLink size={13} /></a>
    </div></div>
  </article>;
}
