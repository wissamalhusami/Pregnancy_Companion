import { getSupabase } from './supabase';
import type { AppData } from './types';

/**
 * Supabase synchronisation for the whole user record.
 *
 * One row per user in `public.pregnancy_records` holds the complete payload as
 * JSONB. Row Level Security restricts every operation to `auth.uid() = user_id`,
 * so a signed-in browser can only ever read or write its own row.
 */

export type SyncStatus = 'idle' | 'syncing' | 'saved' | 'offline' | 'error' | 'localOnly';

export interface PullResult {
  ok: boolean;
  data?: AppData | null;
  updatedAt?: string | null;
  errorKey?: string;
}

export interface PushResult {
  ok: boolean;
  updatedAt?: string;
  errorKey?: string;
}

export const RECORDS_TABLE = 'pregnancy_records';

export function isSyncSupported(): boolean {
  return Boolean(getSupabase());
}

/** True once the user has entered anything worth syncing. */
export function hasUserData(data: AppData | null | undefined): boolean {
  if (!data) return false;
  return Boolean(
    data.setupComplete ||
      data.profile?.lmp ||
      data.bp?.length ||
      data.weight?.length ||
      data.visits?.length ||
      data.movements?.length ||
      Object.keys(data.water ?? {}).length ||
      Object.keys(data.bag ?? {}).length,
  );
}

/**
 * Last-write-wins conflict resolution. Kept pure so the decision is unit
 * tested rather than inferred from network timing.
 */
export function decideSync(
  localUpdatedAt: string | null | undefined,
  remoteUpdatedAt: string | null | undefined,
): 'push' | 'pull' | 'none' {
  const local = localUpdatedAt ? Date.parse(localUpdatedAt) : NaN;
  const remote = remoteUpdatedAt ? Date.parse(remoteUpdatedAt) : NaN;
  const hasLocal = Number.isFinite(local);
  const hasRemote = Number.isFinite(remote);

  if (!hasLocal && !hasRemote) return 'none';
  if (!hasRemote) return 'push';
  if (!hasLocal) return 'pull';
  return remote > local ? 'pull' : 'push';
}

/** Maps provider/network failures onto i18n keys. */
export function syncErrorKey(message: string | null | undefined): string {
  const text = (message ?? '').toLowerCase();
  if (!text) return 'sync.errorGeneric';
  if (
    text.includes('failed to fetch') ||
    text.includes('networkerror') ||
    text.includes('network request failed') ||
    text.includes('load failed') ||
    text.includes('timeout')
  ) {
    return 'sync.errorOffline';
  }
  if (text.includes('pgrst205') || text.includes('schema cache') || text.includes('does not exist')) {
    return 'sync.errorNoTable';
  }
  if (text.includes('row-level security') || text.includes('permission denied') || text.includes('jwt')) {
    return 'sync.errorPermission';
  }
  return 'sync.errorGeneric';
}

export async function pullUserData(userId: string): Promise<PullResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, errorKey: 'sync.errorNoClient' };

  try {
    const { data, error } = await supabase
      .from(RECORDS_TABLE)
      .select('payload, updated_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) return { ok: false, errorKey: syncErrorKey(error.message) };
    if (!data) return { ok: true, data: null, updatedAt: null };

    const row = data as { payload?: AppData | null; updated_at?: string | null };
    return { ok: true, data: row.payload ?? null, updatedAt: row.updated_at ?? null };
  } catch (error) {
    return { ok: false, errorKey: syncErrorKey(error instanceof Error ? error.message : '') };
  }
}

export async function pushUserData(userId: string, data: AppData): Promise<PushResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, errorKey: 'sync.errorNoClient' };

  const updatedAt = new Date().toISOString();
  try {
    const { error } = await supabase
      .from(RECORDS_TABLE)
      .upsert({ user_id: userId, payload: data, updated_at: updatedAt }, { onConflict: 'user_id' });

    if (error) return { ok: false, errorKey: syncErrorKey(error.message) };
    return { ok: true, updatedAt };
  } catch (error) {
    return { ok: false, errorKey: syncErrorKey(error instanceof Error ? error.message : '') };
  }
}

/** Derives the Supabase user id from the storage scope used by AppState. */
export function userIdFromScope(scope: string): string | null {
  return scope.startsWith('user-') ? scope.slice('user-'.length) : null;
}
