import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LangProvider } from './i18n';
import { AppStateProvider } from './state/AppState';
import { AuthProvider, useAuth } from './state/AuthContext';
import { loadRuntimeConfig } from './lib/config';
import { storageScopeFor } from './lib/auth';
import './styles/global.css';
import './styles/rifqah.css';

/** Waits for the session check so a protected page never flashes the wrong state. */
function AppStateGate({ children }: { children: React.ReactNode }) {
  const { ready, user } = useAuth();
  const scope = storageScopeFor(user?.id ?? null);

  if (!ready) {
    return (
      <div className="boot-screen" role="status" aria-live="polite">
        <div className="boot-mark" aria-hidden="true" />
        <p className="boot-text">RIFQAH · رِفْقَة</p>
      </div>
    );
  }

  return (
    <AppStateProvider key={scope} scope={scope}>
      {children}
    </AppStateProvider>
  );
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

/**
 * Configuration is resolved before the first render: the Supabase client is
 * created from it, so mounting first would race the auth state listener.
 */
async function bootstrap() {
  await loadRuntimeConfig();

  createRoot(container as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <LangProvider>
          <AuthProvider>
            <AppStateGate>
              <App />
            </AppStateGate>
          </AuthProvider>
        </LangProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}

void bootstrap();
