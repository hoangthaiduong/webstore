import { Component, type ErrorInfo, type ReactNode } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import { StoreProvider } from './lib/store';
import { CollectionDetailsPage, CollectionsPage, ComparePage, DetailsPage, InfoPage, ListingPage, OverviewPage, SettingsPage } from './pages/Pages';
import './styles/index.css';

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('WEBSTORE rendering error:', error, info); }
  render() {
    if (this.state.hasError) return <main className="content-scroll"><div className="empty-state"><h3>Something went wrong</h3><p>Reload WEBSTORE to continue browsing. Your locally saved library is not affected.</p><button className="btn btn-primary" onClick={() => window.location.reload()}>Reload application</button></div></main>;
    return this.props.children;
  }
}

function AppRoutes() {
  return <Routes>
    <Route element={<AppShell />}>
      <Route index element={<OverviewPage />} />
      <Route path="websites" element={<ListingPage mode="all" />} />
      <Route path="featured" element={<ListingPage mode="featured" />} />
      <Route path="trending" element={<ListingPage mode="trending" />} />
      <Route path="category/:id" element={<ListingPage mode="category" />} />
      <Route path="website/:id" element={<DetailsPage />} />
      <Route path="favorites" element={<ListingPage mode="favorites" />} />
      <Route path="saved" element={<ListingPage mode="saved" />} />
      <Route path="recent" element={<ListingPage mode="recent" />} />
      <Route path="collections" element={<CollectionsPage />} />
      <Route path="collection/:id" element={<CollectionDetailsPage />} />
      <Route path="compare" element={<ComparePage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="about" element={<InfoPage page="about" />} />
      <Route path="privacy" element={<InfoPage page="privacy" />} />
      <Route path="terms" element={<InfoPage page="terms" />} />
      <Route path="disclaimer" element={<InfoPage page="disclaimer" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>;
}

export default function App() {
  return <AppErrorBoundary><StoreProvider><HashRouter><AppRoutes /></HashRouter></StoreProvider></AppErrorBoundary>;
}
