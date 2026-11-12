import { useCallback, useEffect, useRef, useState } from 'react';
import { idbRead, idbWrite } from './idb';

export const STORAGE_PREFIX = 'pc:';

export function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    if (parsed === null || parsed === undefined) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    /* Storage can be unavailable (private mode / quota) — the UI keeps working in memory. */
  }
}

export function removeKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    /* ignore */
  }
}

/**
 * useState mirror backed by localStorage. Only used for tiny preferences such
 * as the interface language — user records live in IndexedDB (see
 * `useIndexedState`), never here.
 */
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => loadJSON(key, initial));
  const initialRef = useRef(initial);

  const update = useCallback(
    (next: T | ((previous: T) => T)) => {
      setValue((previous) => {
        const resolved =
          typeof next === 'function' ? (next as (previous: T) => T)(previous) : next;
        saveJSON(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key !== STORAGE_PREFIX + key) return;
      setValue(event.newValue ? (JSON.parse(event.newValue) as T) : initialRef.current);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [value, update] as const;
}

export interface IndexedStateMeta {
  /** False until IndexedDB has been read once; the UI shows a loader meanwhile. */
  ready: boolean;
  /** False when the browser refused IndexedDB — data is memory-only for this tab. */
  persisted: boolean;
  /** i18n key describing a storage problem, if any. */
  error: string | null;
  /** ISO timestamp of the last local write; drives local/remote conflict resolution. */
  updatedAt: string | null;
}

/**
 * Durable per-key state in IndexedDB.
 *
 * - The key is the authenticated user's storage scope, so accounts are isolated.
 * - Records survive refresh, tab close, logout and browser restart.
 * - A legacy localStorage payload is migrated once, then IndexedDB is the source.
 * - Tabs of the same account stay in sync through a BroadcastChannel.
 */
export function useIndexedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [meta, setMeta] = useState<IndexedStateMeta>({
    ready: false,
    persisted: true,
    error: null,
    updatedAt: null,
  });

  const touched = useRef(false);
  const skipNextWrite = useRef(false);
  const channel = useRef<BroadcastChannel | null>(null);
  const metaRef = useRef(meta);
  metaRef.current = meta;

  // Hydrate from IndexedDB, migrating the pre-IndexedDB localStorage payload.
  useEffect(() => {
    let active = true;
    touched.current = false;
    setMeta((previous) => ({ ...previous, ready: false }));

    void (async () => {
      const stored = await idbRead<T>(key);
      if (!active) return;

      if (stored) {
        if (!touched.current) setValue(stored.value);
        setMeta({ ready: true, persisted: true, error: null, updatedAt: stored.updatedAt });
        return;
      }

      const legacy = loadJSON<T | null>(key, null);
      if (legacy) {
        if (!touched.current) setValue(legacy);
        const stamp = new Date().toISOString();
        const ok = await idbWrite(key, legacy, stamp);
        if (!active) return;
        setMeta({
          ready: true,
          persisted: ok,
          error: ok ? null : 'storage.unavailable',
          updatedAt: ok ? stamp : null,
        });
        return;
      }

      setMeta({ ready: true, persisted: true, error: null, updatedAt: null });
    })();

    return () => {
      active = false;
    };
  }, [key]);

  const update = useCallback((next: T | ((previous: T) => T)) => {
    touched.current = true;
    setValue((previous) => (typeof next === 'function' ? (next as (previous: T) => T)(previous) : next));
  }, []);

  // Persist after a short debounce so rapid edits collapse into one write.
  useEffect(() => {
    if (!meta.ready) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const stamp = new Date().toISOString();
      void idbWrite(key, value, stamp).then((ok) => {
        setMeta((previous) =>
          previous.persisted === ok && previous.updatedAt === stamp
            ? previous
            : {
                ...previous,
                persisted: ok,
                error: ok ? null : 'storage.unavailable',
                updatedAt: ok ? stamp : previous.updatedAt,
              },
        );
        if (ok) channel.current?.postMessage({ key, updatedAt: stamp });
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [key, value, meta.ready]);

  // Keep other tabs of the same account in step without re-broadcasting.
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const bus = new BroadcastChannel(`rifqah:${key}`);
    channel.current = bus;

    bus.onmessage = (event: MessageEvent<{ updatedAt?: string }>) => {
      if (event.data?.updatedAt === metaRef.current.updatedAt) return;
      void idbRead<T>(key).then((stored) => {
        if (!stored || stored.updatedAt === metaRef.current.updatedAt) return;
        skipNextWrite.current = true;
        setValue(stored.value);
        setMeta((previous) => ({ ...previous, updatedAt: stored.updatedAt }));
      });
    };

    return () => {
      bus.close();
      channel.current = null;
    };
  }, [key]);

  return [value, update, meta] as const;
}

export function createId(prefix = 'id'): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${random}`;
}
