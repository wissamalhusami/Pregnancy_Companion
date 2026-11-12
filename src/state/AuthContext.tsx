import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session } from '@supabase/supabase-js';
import { authRedirectUrl, getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { authErrorKey, displayNameFrom, normalizeEmail } from '../lib/auth';
import type { Lang } from '../lib/types';

export type OAuthProvider = 'google' | 'facebook';

export interface AuthProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  provider: string;
  language: Lang | null;
  lmp: string | null;
  createdAt: string | null;
}

export interface AuthResult {
  ok: boolean;
  /** i18n key describing the failure. */
  errorKey?: string;
  /** Sign-up succeeded but the address must be confirmed first. */
  needsConfirmation?: boolean;
}

export interface ProfilePatch {
  name?: string;
  language?: Lang;
  lmp?: string | null;
  avatarUrl?: string | null;
}

interface AuthValue {
  /** False until the stored session has been restored. */
  ready: boolean;
  /** False when no Supabase project is connected — the app then runs locally. */
  configured: boolean;
  user: AuthProfile | null;
  busy: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (input: { name: string; email: string; password: string }) => Promise<AuthResult>;
  signInWithProvider: (provider: OAuthProvider) => Promise<AuthResult>;
  sendReset: (email: string) => Promise<AuthResult>;
  resendConfirmation: (email: string) => Promise<AuthResult>;
  updatePassword: (password: string) => Promise<AuthResult>;
  updateProfile: (patch: ProfilePatch) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

function profileFromSession(session: Session | null): AuthProfile | null {
  const user = session?.user;
  if (!user) return null;
  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  const language = metadata.preferred_language;
  const lmp = metadata.lmp;
  return {
    id: user.id,
    email: user.email ?? '',
    name: displayNameFrom(metadata, user.email),
    avatarUrl:
      (typeof metadata.avatar_url === 'string' && metadata.avatar_url) ||
      (typeof metadata.picture === 'string' && metadata.picture) ||
      null,
    provider: (user.app_metadata?.provider as string | undefined) ?? 'email',
    language: language === 'ar' || language === 'en' ? language : null,
    lmp: typeof lmp === 'string' && lmp ? lmp : null,
    createdAt: user.created_at ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!configured);
  const [busy, setBusy] = useState(false);

  // Restore the persisted session once, then keep it in sync with Supabase.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setReady(true);
      return;
    }
    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setSession(data.session ?? null);
        setReady(true);
      })
      .catch(() => {
        if (active) setReady(true);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setReady(true);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [configured]);

  const user = useMemo(() => profileFromSession(session), [session]);

  // Merge the optional `profiles` row (display name, language, LMP) over metadata.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !session?.user) return;
    let active = true;
    supabase
      .from('profiles')
      .select('full_name, avatar_url, preferred_language, lmp')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active || error || !data) return;
        const row = data as {
          full_name?: string | null;
          avatar_url?: string | null;
          preferred_language?: string | null;
          lmp?: string | null;
        };
        setSession((previous) => {
          if (!previous?.user) return previous;
          const metadata = { ...(previous.user.user_metadata ?? {}) };
          if (row.full_name) metadata.full_name = row.full_name;
          if (row.avatar_url) metadata.avatar_url = row.avatar_url;
          if (row.preferred_language) metadata.preferred_language = row.preferred_language;
          if (row.lmp) metadata.lmp = row.lmp;
          return { ...previous, user: { ...previous.user, user_metadata: metadata } };
        });
      })
      .catch(() => {
        /* profiles table not provisioned yet — metadata is enough */
      });
    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  const signIn = useCallback<AuthValue['signIn']>(async (email, password) => {
    const supabase = getSupabase();
    if (!supabase) return { ok: false, errorKey: 'auth.errorNotConfigured' };
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizeEmail(email),
        password,
      });
      if (error) return { ok: false, errorKey: authErrorKey(error.message) };
      return { ok: true };
    } catch {
      return { ok: false, errorKey: 'auth.errorNetwork' };
    } finally {
      setBusy(false);
    }
  }, []);

  const signUp = useCallback<AuthValue['signUp']>(async ({ name, email, password }) => {
    const supabase = getSupabase();
    if (!supabase) return { ok: false, errorKey: 'auth.errorNotConfigured' };
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: normalizeEmail(email),
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: authRedirectUrl('/auth/callback'),
        },
      });
      if (error) return { ok: false, errorKey: authErrorKey(error.message) };
      // Supabase returns a user with no session when confirmation is required.
      if (!data.session) return { ok: true, needsConfirmation: true };
      return { ok: true };
    } catch {
      return { ok: false, errorKey: 'auth.errorNetwork' };
    } finally {
      setBusy(false);
    }
  }, []);

  const signInWithProvider = useCallback<AuthValue['signInWithProvider']>(async (provider) => {
    const supabase = getSupabase();
    if (!supabase) return { ok: false, errorKey: 'auth.errorNotConfigured' };
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: authRedirectUrl('/auth/callback'),
          queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined,
        },
      });
      if (error) return { ok: false, errorKey: authErrorKey(error.message) };
      // A successful call redirects the browser to the provider.
      return { ok: true };
    } catch {
      return { ok: false, errorKey: 'auth.errorNetwork' };
    } finally {
      setBusy(false);
    }
  }, []);

  const sendReset = useCallback<AuthValue['sendReset']>(async (email) => {
    const supabase = getSupabase();
    if (!supabase) return { ok: false, errorKey: 'auth.errorNotConfigured' };
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(normalizeEmail(email), {
        redirectTo: authRedirectUrl('/auth/reset'),
      });
      if (error) return { ok: false, errorKey: authErrorKey(error.message) };
      return { ok: true };
    } catch {
      return { ok: false, errorKey: 'auth.errorNetwork' };
    } finally {
      setBusy(false);
    }
  }, []);

  const resendConfirmation = useCallback<AuthValue['resendConfirmation']>(async (email) => {
    const supabase = getSupabase();
    if (!supabase) return { ok: false, errorKey: 'auth.errorNotConfigured' };
    setBusy(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: normalizeEmail(email),
        options: { emailRedirectTo: authRedirectUrl('/auth/callback') },
      });
      if (error) return { ok: false, errorKey: authErrorKey(error.message) };
      return { ok: true };
    } catch {
      return { ok: false, errorKey: 'auth.errorNetwork' };
    } finally {
      setBusy(false);
    }
  }, []);

  const updatePassword = useCallback<AuthValue['updatePassword']>(async (password) => {
    const supabase = getSupabase();
    if (!supabase) return { ok: false, errorKey: 'auth.errorNotConfigured' };
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) return { ok: false, errorKey: authErrorKey(error.message) };
      return { ok: true };
    } catch {
      return { ok: false, errorKey: 'auth.errorNetwork' };
    } finally {
      setBusy(false);
    }
  }, []);

  const updateProfile = useCallback<AuthValue['updateProfile']>(async (patch) => {
    const supabase = getSupabase();
    if (!supabase) return { ok: false, errorKey: 'auth.errorNotConfigured' };
    setBusy(true);
    try {
      const metadata: Record<string, unknown> = {};
      if (patch.name !== undefined) metadata.full_name = patch.name.trim();
      if (patch.language !== undefined) metadata.preferred_language = patch.language;
      if (patch.lmp !== undefined) metadata.lmp = patch.lmp;
      if (patch.avatarUrl !== undefined) metadata.avatar_url = patch.avatarUrl;

      const { data, error } = await supabase.auth.updateUser({ data: metadata });
      if (error) return { ok: false, errorKey: authErrorKey(error.message) };
      if (data.user) {
        setSession((previous) => (previous ? { ...previous, user: data.user } : previous));
      }

      // Best effort mirror into `profiles`; RLS keeps it owner-only.
      const userId = data.user?.id;
      if (userId) {
        await supabase.from('profiles').upsert(
          {
            id: userId,
            full_name: patch.name?.trim() ?? undefined,
            preferred_language: patch.language ?? undefined,
            lmp: patch.lmp ?? undefined,
            avatar_url: patch.avatarUrl ?? undefined,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' },
        );
      }
      return { ok: true };
    } catch {
      return { ok: false, errorKey: 'auth.errorNetwork' };
    } finally {
      setBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    try {
      await supabase.auth.signOut();
      setSession(null);
    } finally {
      setBusy(false);
    }
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      ready,
      configured,
      user,
      busy,
      signIn,
      signUp,
      signInWithProvider,
      sendReset,
      resendConfirmation,
      updatePassword,
      updateProfile,
      signOut,
    }),
    [
      ready,
      configured,
      user,
      busy,
      signIn,
      signUp,
      signInWithProvider,
      sendReset,
      resendConfirmation,
      updatePassword,
      updateProfile,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
