import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LangProvider } from './i18n';
import { AppStateProvider } from './state/AppState';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

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
