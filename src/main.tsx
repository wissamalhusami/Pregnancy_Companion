import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LangProvider } from './i18n';
import { AppStateProvider } from './state/AppState';
import './styles/global.css';
import './styles/rifqah.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

/**
 * No authentication bootstrap: the app is local-first, so the only startup work
 * is reading the saved record from IndexedDB (AppStateProvider shows the boot
 * screen until that read finishes).
 */
createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
);
