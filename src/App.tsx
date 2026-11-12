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
import { useAppState } from './state/AppState';

/**
 * Sends a first-time visitor to the pregnancy setup form.
 *
 * This is a data check, not a login gate: there are no accounts in RIFQAH, so
 * the only reason to visit /setup is that no pregnancy record exists yet.
 * Safety and profile pages stay reachable at all times.
 */
function RequireSetup({ children }: { children: ReactNode }) {
  const { data } = useAppState();
  const location = useLocation();

  if (!data.setupComplete && location.pathname !== '/setup') {
    return <Navigate to="/setup" replace />;
  }

  return <>{children}</>;
}

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/setup" element={<Setup />} />

        <Route
          path="/"
          element={
            <RequireSetup>
              <Dashboard />
            </RequireSetup>
          }
        />
        <Route
          path="/tracker"
          element={
            <RequireSetup>
              <Tracker />
            </RequireSetup>
          }
        />
        <Route
          path="/antenatal"
          element={
            <RequireSetup>
              <Antenatal />
            </RequireSetup>
          }
        />
        <Route
          path="/nutrition"
          element={
            <RequireSetup>
              <Nutrition />
            </RequireSetup>
          }
        />
        <Route
          path="/movement"
          element={
            <RequireSetup>
              <Movement />
            </RequireSetup>
          }
        />
        <Route
          path="/labor"
          element={
            <RequireSetup>
              <Labor />
            </RequireSetup>
          }
        />
        <Route
          path="/breastfeeding"
          element={
            <RequireSetup>
              <Breastfeeding />
            </RequireSetup>
          }
        />
        <Route
          path="/postpartum"
          element={
            <RequireSetup>
              <Postpartum />
            </RequireSetup>
          }
        />

        {/* Safety guidance is always available, even before setup. */}
        <Route path="/danger-signs" element={<DangerSigns />} />
        <Route path="/profile" element={<Profile />} />

        {/* Old account links from previous versions now open the app directly. */}
        <Route path="/welcome" element={<Navigate to="/" replace />} />
        <Route path="/auth/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
