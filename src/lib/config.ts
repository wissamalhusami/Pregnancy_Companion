/**
 * Runtime configuration.
 *
 * Supabase credentials are *public* client credentials (the anon key), so they
 * are read either from the build-time Vite environment or from the server's
 * `/api/config` endpoint. Nothing secret is ever shipped to the browser: the
 * service-role key is never referenced by this application.
 */

export interface RuntimeConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  /** Where the values came from — surfaced in the UI so setup is obvious. */
  source: 'env' | 'server' | 'none';
}

const EMPTY: RuntimeConfig = { supabaseUrl: '', supabaseAnonKey: '', source: 'none' };

let current: RuntimeConfig = EMPTY;

type ViteEnv = Record<string, string | undefined>;

function readBuildEnv(): ViteEnv {
  try {
    const meta = import.meta as unknown as { env?: ViteEnv };
    return meta.env ?? {};
  } catch {
    return {};
  }
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Values are accepted from either the VITE_ or the server-side name. */
function fromEnv(): RuntimeConfig {
  const env = readBuildEnv();
  const url = clean(env.VITE_SUPABASE_URL) || clean(env.SUPABASE_URL);
  const key = clean(env.VITE_SUPABASE_ANON_KEY) || clean(env.SUPABASE_ANON_KEY);
  return url && key ? { supabaseUrl: url, supabaseAnonKey: key, source: 'env' } : EMPTY;
}

/**
 * Resolves configuration once at boot. The server endpoint lets a project be
 * connected in Settings without rebuilding the client bundle.
 */
export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  const buildTime = fromEnv();
  if (buildTime.source !== 'none') {
    current = buildTime;
    return current;
  }

  try {
    const response = await fetch('/api/config', { headers: { accept: 'application/json' } });
    if (response.ok) {
      const body = (await response.json()) as Record<string, unknown>;
      const url = clean(body.supabaseUrl);
      const key = clean(body.supabaseAnonKey);
      if (url && key) {
        current = { supabaseUrl: url, supabaseAnonKey: key, source: 'server' };
        return current;
      }
    }
  } catch {
    /* Offline or a static host without the API: fall back to guest mode. */
  }

  current = EMPTY;
  return current;
}

export function getRuntimeConfig(): RuntimeConfig {
  return current;
}

/** The application is fully usable without auth; this only gates account features. */
export function isAuthConfigured(): boolean {
  return Boolean(current.supabaseUrl && current.supabaseAnonKey);
}

export const __testing = { fromEnv, clean };
