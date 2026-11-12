import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Tracker } from './pages/Tracker';
import { Antenatal } from './pages/Antenatal';
import { Nutrition } from './pages/Nutrition';
import { DangerSigns } from './pages/DangerSigns';
import { Movement } from './pages/Movement';
import { Labor } from './pages/Labor';
import { Breastfeeding } from './pages/Breastfeeding';
import { Postpartum } from './pages/Postpartum';
import { Profile } from './pages/Profile';
import { Setup } from './pages/Setup';
import { Welcome } from './pages/Welcome';
import { AuthPage, AuthCallbackPage } from './pages/Auth';
import { useAppState } from './state/AppState';
import { useAuth } from './state/AuthContext';

/** Sends first-time visitors to the setup form, keeping the app usable without data. */
function RequireSetup({ children }: { children: ReactNode }) {
  const { data } = useAppState();
  const location = useLocation();
  if (!data.setupComplete && location.pathname !== '/setup') {
    return <Navigate to="/setup" replace />;
  }
  return <>{children}</>;
}

/**
 * Guards personal pages. When no Supabase project is connected the app runs in
 * local mode, so the pages stay reachable instead of dead-ending at a login
 * screen that cannot work.
 */
function Protected({ children }: { children: ReactNode }) {
  const { ready, configured, user } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="boot-screen" role="status" aria-live="polite">
        <div className="boot-mark" aria-hidden="true" />
        <p className="boot-text">RIFQAH</p>
      </div>
    );
  }

  if (configured && !user) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/auth/login?next=${next}`} replace />;
  }

  return <>{children}</>;
}

function Shell() {
  return (
    <Layout>
      <Routes>
        <Route path="/setup" element={<Setup />} />
        <Route
          path="/"
          element={
            <Protected>
              <RequireSetup>
                <Dashboard />
              </RequireSetup>
            </Protected>
          }
        />
        <Route
          path="/tracker"
          element={
            <Protected>
              <RequireSetup>
                <Tracker />
              </RequireSetup>
            </Protected>
          }
        />
        <Route
          path="/antenatal"
          element={
            <Protected>
              <RequireSetup>
                <Antenatal />
              </RequireSetup>
            </Protected>
          }
        />
        <Route
          path="/nutrition"
          element={
            <Protected>
              <RequireSetup>
                <Nutrition />
              </RequireSetup>
            </Protected>
          }
        />
        {/* Safety information stays public: a woman must never be blocked
            from danger-sign guidance by a login screen. */}
        <Route path="/danger-signs" element={<DangerSigns />} />
        <Route
          path="/movement"
          element={
            <Protected>
              <RequireSetup>
                <Movement />
              </RequireSetup>
            </Protected>
          }
        />
        <Route
          path="/labor"
          element={
            <Protected>
              <RequireSetup>
                <Labor />
              </RequireSetup>
            </Protected>
          }
        />
        <Route
          path="/breastfeeding"
          element={
            <Protected>
              <RequireSetup>
                <Breastfeeding />
              </RequireSetup>
            </Protected>
          }
        />
        <Route
          path="/postpartum"
          element={
            <Protected>
              <RequireSetup>
                <Postpartum />
              </RequireSetup>
            </Protected>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth/login" element={<AuthPage mode="login" />} />
      <Route path="/auth/register" element={<AuthPage mode="register" />} />
      <Route path="/auth/forgot" element={<AuthPage mode="forgot" />} />
      <Route path="/auth/reset" element={<AuthPage mode="reset" />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="*" element={<Shell />} />
    </Routes>
  );
}
