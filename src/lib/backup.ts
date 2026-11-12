import { emptyBirthPlan, initialData } from './defaults';
import { parseISODate } from './pregnancy';
import type {
  AppData,
  Appointment,
  BPReading,
  BirthPlan,
  MovementSession,
  Profile,
  VisitRecord,
  WeightEntry,
} from './types';

/**
 * Versioned local backup file.
 *
 * The app stores everything in IndexedDB on this device only, so the backup
 * file is the single way to move a record to another device. Reading a file is
 * untrusted input: every field is validated and rebuilt here instead of being
 * trusted, so a corrupted or hand-edited file cannot break the app.
 */

export const BACKUP_FORMAT = 'rifqah-backup';
export const BACKUP_VERSION = 1;
export const APP_VERSION = '1.0.0';

/** Upper bound per list, so a pathological file cannot exhaust memory. */
const MAX_ITEMS = 5000;

export interface BackupFile {
  format: string;
  version: number;
  app: string;
  appVersion: string;
  exportedAt: string;
  data: AppData;
}

export type BackupParseResult =
  | { ok: true; data: AppData; exportedAt: string; version: number; legacy: boolean }
  | { ok: false; errorKey: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const str = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const num = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

const bool = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback;

const list = (value: unknown): unknown[] => (Array.isArray(value) ? value.slice(0, MAX_ITEMS) : []);

function sanitizeProfile(raw: Record<string, unknown>): Profile {
  return {
    name: str(raw.name).slice(0, 120),
    lmp: str(raw.lmp).slice(0, 10),
    prePregnancyWeightKg: num(raw.prePregnancyWeightKg),
    heightCm: num(raw.heightCm),
    clinic: str(raw.clinic).slice(0, 160),
  };
}

function sanitizeBP(raw: unknown): BPReading[] {
  const out: BPReading[] = [];
  list(raw).forEach((item, index) => {
    if (!isRecord(item)) return;
    const systolic = num(item.systolic);
    const diastolic = num(item.diastolic);
    if (systolic === null || diastolic === null) return;
    out.push({
      id: str(item.id) || `restored-bp-${index}`,
      date: str(item.date),
      systolic,
      diastolic,
      pulse: num(item.pulse),
      note: str(item.note),
    });
  });
  return out;
}

function sanitizeWeight(raw: unknown): WeightEntry[] {
  const out: WeightEntry[] = [];
  list(raw).forEach((item, index) => {
    if (!isRecord(item)) return;
    const kg = num(item.kg);
    if (kg === null) return;
    out.push({ id: str(item.id) || `restored-w-${index}`, date: str(item.date), kg });
  });
  return out;
}

function sanitizeAppointments(raw: unknown): Appointment[] {
  const out: Appointment[] = [];
  list(raw).forEach((item, index) => {
    if (!isRecord(item)) return;
    const week = num(item.week);
    if (week === null) return;
    out.push({
      id: str(item.id) || `restored-anc-${index}`,
      week,
      date: str(item.date),
      done: bool(item.done, false),
      notes: str(item.notes),
    });
  });
  return out;
}

function sanitizeVisits(raw: unknown): VisitRecord[] {
  const out: VisitRecord[] = [];
  list(raw).forEach((item, index) => {
    if (!isRecord(item)) return;
    out.push({
      id: str(item.id) || `restored-v-${index}`,
      date: str(item.date),
      provider: str(item.provider),
      reason: str(item.reason),
      bp: str(item.bp),
      weightKg: num(item.weightKg),
      notes: str(item.notes),
    });
  });
  return out;
}

function sanitizeMovements(raw: unknown): MovementSession[] {
  const out: MovementSession[] = [];
  list(raw).forEach((item, index) => {
    if (!isRecord(item)) return;
    const count = num(item.count);
    if (count === null) return;
    out.push({
      id: str(item.id) || `restored-m-${index}`,
      startedAt: str(item.startedAt),
      durationMin: num(item.durationMin) ?? 0,
      count,
    });
  });
  return out;
}

function sanitizeWater(raw: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (!isRecord(raw)) return out;
  for (const [key, value] of Object.entries(raw)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
    const glasses = num(value);
    if (glasses === null) continue;
    out[key] = Math.min(40, Math.max(0, Math.round(glasses)));
  }
  return out;
}

function sanitizeBag(raw: unknown): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  if (!isRecord(raw)) return out;
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'boolean') out[key] = value;
  }
  return out;
}

function sanitizeBirthPlan(raw: unknown): BirthPlan {
  if (!isRecord(raw)) return emptyBirthPlan;
  return {
    birthPlace: str(raw.birthPlace),
    supportPerson: str(raw.supportPerson),
    painRelief: str(raw.painRelief),
    positions: str(raw.positions),
    feedingPlan: str(raw.feedingPlan),
    specialRequests: str(raw.specialRequests),
    skinToSkin: bool(raw.skinToSkin, emptyBirthPlan.skinToSkin),
    cordClamping: bool(raw.cordClamping, emptyBirthPlan.cordClamping),
    notes: str(raw.notes),
  };
}

/**
 * Rebuilds a complete record from untrusted input.
 * Returns null when the payload has no usable pregnancy record (no profile or
 * no valid LMP), because such a file would silently replace real data.
 */
export function normalizeData(raw: unknown): AppData | null {
  if (!isRecord(raw)) return null;
  if (!isRecord(raw.profile)) return null;
  const profile = sanitizeProfile(raw.profile);
  if (!parseISODate(profile.lmp)) return null;

  return {
    profile,
    bp: sanitizeBP(raw.bp),
    weight: sanitizeWeight(raw.weight),
    appointments: sanitizeAppointments(raw.appointments),
    visits: sanitizeVisits(raw.visits),
    movements: sanitizeMovements(raw.movements),
    water: sanitizeWater(raw.water),
    bag: sanitizeBag(raw.bag),
    birthPlan: sanitizeBirthPlan(raw.birthPlan),
    setupComplete: bool(raw.setupComplete, true),
  };
}

export function buildBackup(data: AppData, now: Date = new Date()): BackupFile {
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    app: 'rifqah',
    appVersion: APP_VERSION,
    exportedAt: now.toISOString(),
    data,
  };
}

export function serializeBackup(data: AppData, now: Date = new Date()): string {
  return JSON.stringify(buildBackup(data, now), null, 2);
}

export function backupFileName(now: Date = new Date()): string {
  const iso = now.toISOString().slice(0, 10);
  return `rifqah-backup-${iso}.json`;
}

/**
 * Parses a backup file. Accepts the current versioned wrapper and the plain
 * JSON export produced by earlier releases, so an old backup still restores.
 */
export function parseBackup(text: string): BackupParseResult {
  if (!text || !text.trim()) return { ok: false, errorKey: 'backup.errorEmpty' };

  let raw: unknown;
  try {
    raw = JSON.parse(text) as unknown;
  } catch {
    return { ok: false, errorKey: 'backup.errorInvalid' };
  }
  if (!isRecord(raw)) return { ok: false, errorKey: 'backup.errorInvalid' };

  let payload: unknown = raw;
  let version = 0;
  let legacy = true;
  let exportedAt = '';

  if ('format' in raw || 'data' in raw) {
    if (raw.format !== BACKUP_FORMAT) return { ok: false, errorKey: 'backup.errorFormat' };
    const declared = num(raw.version);
    if (declared === null || declared < 1) return { ok: false, errorKey: 'backup.errorInvalid' };
    if (declared > BACKUP_VERSION) return { ok: false, errorKey: 'backup.errorVersion' };
    version = declared;
    legacy = false;
    exportedAt = str(raw.exportedAt);
    payload = raw.data;
  }

  const data = normalizeData(payload);
  if (!data) return { ok: false, errorKey: 'backup.errorStructure' };

  return { ok: true, data, exportedAt, version, legacy };
}

/** Counts used for the import confirmation summary. */
export function backupSummary(data: AppData): { readings: number; weights: number; visits: number; movements: number } {
  return {
    readings: data.bp.length,
    weights: data.weight.length,
    visits: data.visits.length,
    movements: data.movements.length,
  };
}

export const __testing = { initialData };
