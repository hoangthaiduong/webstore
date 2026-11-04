import { createContext, useCallback, useContext, useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { readState, saveState } from './storage';
import type { LibraryState } from '../types';

type StoreValue = {
  state: LibraryState;
  setState: Dispatch<SetStateAction<LibraryState>>;
  notify: (message: string, error?: boolean) => void;
  toggleFavorite: (id: string) => void;
  toggleSaved: (id: string) => void;
  toggleCompare: (id: string) => void;
  addToCollection: (id: string) => void;
};
const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LibraryState>(() => readState());
  const [toast, setToast] = useState<{ message: string; error: boolean } | null>(null);
  useEffect(() => { saveState(state); }, [state]);
  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const dark = state.theme === 'dark' || (state.theme === 'system' && systemDark);
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
  }, [state.theme]);
  useEffect(() => { document.body.dataset.density = state.density; }, [state.density]);
  const notify = useCallback((message: string, error = false) => {
    setToast({ message, error });
    window.setTimeout(() => setToast(null), 2800);
  }, []);
  const toggleFavorite = useCallback((id: string) => setState((old) => ({ ...old, favorites: old.favorites.includes(id) ? old.favorites.filter((x) => x !== id) : [...old.favorites, id] })), []);
  const toggleSaved = useCallback((id: string) => setState((old) => ({ ...old, saved: old.saved.includes(id) ? old.saved.filter((x) => x !== id) : [...old.saved, id] })), []);
  const toggleCompare = useCallback((id: string) => setState((old) => {
    if (old.compare.includes(id)) { notify('Removed from comparison.'); return { ...old, compare: old.compare.filter((x) => x !== id) }; }
    if (old.compare.length >= 3) { notify('You can compare up to 3 websites.', true); return old; }
    notify('Added to comparison.'); return { ...old, compare: [...old.compare, id] };
  }), [notify]);
  const addToCollection = useCallback((id: string) => setState((old) => {
    if (!old.collections.length) {
      const name = window.prompt('Create your first collection:', 'My collection');
      if (!name?.trim()) return old;
      notify('Collection created and website added.');
      return { ...old, collections: [...old.collections, { id: `c-${Date.now().toString(36)}`, name: name.trim(), items: [id] }] };
    }
    const names = old.collections.map((c, i) => `${i + 1}. ${c.name}`).join('\n');
    const choice = window.prompt(`Choose a collection by number:\n${names}`, '1');
    const index = Number(choice) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= old.collections.length) return old;
    const next = [...old.collections];
    if (!next[index].items.includes(id)) next[index] = { ...next[index], items: [...next[index].items, id] };
    notify('Added to collection.');
    return { ...old, collections: next };
  }), [notify]);
  const value = useMemo(() => ({ state, setState, notify, toggleFavorite, toggleSaved, toggleCompare, addToCollection }), [state, notify, toggleFavorite, toggleSaved, toggleCompare, addToCollection]);
  return <StoreContext.Provider value={value}>{children}{toast && <div className={`toast-region`}><div className={`toast ${toast.error ? 'error' : ''}`}>{toast.message}</div></div>}</StoreContext.Provider>;
}
export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside StoreProvider');
  return value;
}
export function resetPersonalData() { saveState(defaultState); }
