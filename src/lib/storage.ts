import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "rifqah-db";
const DB_VERSION = 1;

const STORES = [
  "blood-pressure",
  "blood-glucose",
  "appointments",
  "symptom-journal",
  "medications",
  "baby-growth",
  "vaccinations",
  "breastfeeding",
  "sleep",
  "diaper",
  "checklists",
  "preferences",
  "recently-viewed",
] as const;

export type StoreName = (typeof STORES)[number];

let dbInstance: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbInstance) {
    dbInstance = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        for (const store of STORES) {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: "id" });
          }
        }
      },
    });
  }
  return dbInstance;
}

export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await getDB();
  return db.getAll(store);
}

export async function put<T>(store: StoreName, value: T): Promise<void> {
  const db = await getDB();
  await db.put(store, value);
}

export async function remove(store: StoreName, id: string): Promise<void> {
  const db = await getDB();
  await db.delete(store, id);
}

export async function clearStore(store: StoreName): Promise<void> {
  const db = await getDB();
  await db.clear(store);
}

export async function clearAll(): Promise<void> {
  const db = await getDB();
  for (const store of STORES) {
    await db.clear(store);
  }
}

export async function getPreference(key: string): Promise<unknown> {
  const db = await getDB();
  const entry = await db.get("preferences", key);
  return (entry as { value?: unknown } | undefined)?.value;
}

export async function setPreference(key: string, value: unknown): Promise<void> {
  const db = await getDB();
  await db.put("preferences", { id: key, value });
}

export async function exportBackup(): Promise<string> {
  const data: Record<string, unknown[]> = {};
  for (const store of STORES) {
    data[store] = await getAll(store);
  }
  return JSON.stringify({ version: DB_VERSION, exportedAt: new Date().toISOString(), data }, null, 2);
}

export async function importBackup(json: string): Promise<void> {
  const parsed = JSON.parse(json);
  if (!parsed.data || typeof parsed.data !== "object") {
    throw new Error("Invalid backup format");
  }
  const db = await getDB();
  for (const store of STORES) {
    if (Array.isArray(parsed.data[store])) {
      await db.clear(store);
      for (const item of parsed.data[store]) {
        await db.put(store, item);
      }
    }
  }
}

export function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
