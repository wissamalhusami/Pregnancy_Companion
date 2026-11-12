import { Navigate, Route, Routes } from 'react-router-dom';
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

/**
 * Education and optional tracking are available before users add personal data.
 */
export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/setup" element={<Setup />} />

        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="/tracker"
          element={<Tracker />}
        />
        <Route
          path="/antenatal"
          element={<Antenatal />}
        />
        <Route
          path="/nutrition"
          element={<Nutrition />}
        />
        <Route
          path="/movement"
          element={<Movement />}
        />
        <Route
          path="/labor"
          element={<Labor />}
        />
        <Route
          path="/breastfeeding"
          element={<Breastfeeding />}
        />
        <Route
          path="/postpartum"
          element={<Postpartum />}
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
