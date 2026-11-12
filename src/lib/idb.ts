/**
 * Minimal IndexedDB wrapper used as the primary on-device store.
 *
 * Every user record lives under a single key (`data:user-<uuid>`), so records
 * for different accounts can never collide. Reads and writes never throw: a
 * blocked or unavailable database resolves to `null`/`false` and the UI keeps
 * working in memory.
 */

const DB_NAME = 'rifqah';
const DB_VERSION = 1;
const STORE = 'records';

export interface IdbRecord<T> {
  value: T;
  /** ISO timestamp of the last write, used to resolve local/remote conflicts. */
  updatedAt: string;
}

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    let settled = false;
    const finish = (db: IDBDatabase | null) => {
      if (settled) return;
      settled = true;
      resolve(db);
    };

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      request.onsuccess = () => finish(request.result);
      request.onerror = () => finish(null);
      request.onblocked = () => finish(null);
      // A private-mode or locked database must not hang the boot screen.
      setTimeout(() => finish(null), 3000);
    } catch {
      finish(null);
    }
  });

  return dbPromise;
}

export async function idbAvailable(): Promise<boolean> {
  return (await openDb()) !== null;
}

export async function idbRead<T>(key: string): Promise<IdbRecord<T> | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(key);
      request.onsuccess = () => {
        const record = request.result as IdbRecord<T> | undefined;
        resolve(record && typeof record === 'object' && 'value' in record ? record : null);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function idbWrite<T>(
  key: string,
  value: T,
  updatedAt: string = new Date().toISOString(),
): Promise<boolean> {
  const db = await openDb();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put({ value, updatedAt } satisfies IdbRecord<T>, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/** Keys currently stored on this device — used by the diagnostics in Profile. */
export async function idbKeys(): Promise<string[]> {
  const db = await openDb();
  if (!db) return [];
  return new Promise((resolve) => {
    try {
      const request = db.transaction(STORE, 'readonly').objectStore(STORE).getAllKeys();
      request.onsuccess = () => resolve((request.result ?? []).map(String));
      request.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}
