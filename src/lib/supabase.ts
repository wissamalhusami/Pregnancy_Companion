import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getRuntimeConfig, isAuthConfigured } from './config';

let cached: SupabaseClient | null = null;

/**
 * Single browser client. Only the public anon key is used; the service-role key
 * must never reach the client bundle.
 */
export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  if (!isAuthConfigured()) return null;
  const { supabaseUrl, supabaseAnonKey } = getRuntimeConfig();
  cached = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storageKey: 'rifqah.auth',
    },
  });
  return cached;
}

/** Absolute URL Supabase should return the user to after OAuth / recovery. */
export function authRedirectUrl(path: string): string {
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  return `${origin}${path}`;
}

export function isSupabaseConfigured(): boolean {
  return isAuthConfigured();
}
