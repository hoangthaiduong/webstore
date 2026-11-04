import type { LibraryState, Website } from '../types';
export const STORAGE_KEY = 'webstore-state';
export const defaultState: LibraryState = {
  favorites: [], saved: [], recent: [], compare: [], collections: [], verification: {},
  theme: 'system', sort: 'featured', density: 'comfortable', historyOn: true,
};
export function readState(): LibraryState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...(JSON.parse(raw) as Partial<LibraryState>) };
  } catch { return defaultState; }
}
export function saveState(state: LibraryState): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* handled in UI */ }
}
export function searchWebsites(websites: Website[], query: string): Website[] {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return websites;
  return websites.filter((site) => [site.name, site.domain, site.description, site.category, site.subcategory, ...site.tags].join(' ').toLocaleLowerCase().includes(term));
}
export function relatedWebsites(websites: Website[], current: Website, limit = 3): Website[] {
  return websites.filter((site) => site.id !== current.id).map((site) => ({
    site, score: (site.category === current.category ? 2 : 0) + (site.subcategory === current.subcategory ? 4 : 0) + site.tags.filter((tag) => current.tags.includes(tag)).length,
  })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.site.name.localeCompare(b.site.name)).slice(0, limit).map(({ site }) => site);
}
