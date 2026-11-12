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

/** Sends first-time visitors to the setup form, keeping the app usable without data. */
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
        <Route path="/danger-signs" element={<DangerSigns />} />
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
        <Route
          path="/profile"
          element={
            <RequireSetup>
              <Profile />
            </RequireSetup>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
