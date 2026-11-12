import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

const distDir = path.join(__dirname, 'dist');

app.disable('x-powered-by');

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'rifqah', time: new Date().toISOString() });
});

/**
 * Public Supabase client configuration for the browser.
 *
 * Only the public anon key is ever returned: it is safe to ship to a browser and
 * Supabase Row Level Security protects the data. The service-role key is never
 * read here, so it can never be exposed through this endpoint.
 */
app.get('/api/config', (_req, res) => {
  const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim();
  const supabaseAnonKey = (
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
  ).trim();
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    supabaseUrl,
    supabaseAnonKey,
    configured: Boolean(supabaseUrl && supabaseAnonKey),
  });
});

app.use(
  express.static(distDir, {
    index: 'index.html',
    setHeaders(res, filePath) {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }),
);

// Single-page application fallback for every client-side route.
app.use((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) res.status(404).send('Application is not built yet. Run "npm run build" first.');
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`RIFQAH server listening on http://0.0.0.0:${PORT}`);
});
