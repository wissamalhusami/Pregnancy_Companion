import { useCallback, useEffect, useRef, useState } from 'react';

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

/** useState mirror backed by localStorage, kept in sync across tabs. */
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

export function createId(prefix = 'id'): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${random}`;
}
