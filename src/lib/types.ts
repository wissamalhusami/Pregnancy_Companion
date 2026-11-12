export type Lang = 'ar' | 'en';

/** A bilingual string used across the education content. */
export type Bi = { ar: string; en: string };

/**
 * Optional personal information. Nothing here is required and nothing is
 * pre-filled: the app never assumes that a visitor is pregnant.
 */
export interface Profile {
  /** Display name, only used if the visitor types one. */
  name: string;
  /** First day of the last menstrual period, ISO date (YYYY-MM-DD). */
  lmp: string;
  prePregnancyWeightKg: number | null;
  heightCm: number | null;
  /** Maternity clinic / hospital the visitor chooses to record. */
  clinic: string;
}

export interface BPReading {
  id: string;
  /** ISO date-time of the measurement. */
  date: string;
  systolic: number;
  diastolic: number;
  pulse: number | null;
  note: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  kg: number;
}

export interface Appointment {
  id: string;
  /** Gestational week of the scheduled contact. */
  week: number;
  /** ISO date of the appointment. */
  date: string;
  done: boolean;
  notes: string;
}

export interface VisitRecord {
  id: string;
  date: string;
  provider: string;
  reason: string;
  bp: string;
  weightKg: number | null;
  notes: string;
}

export interface MovementSession {
  id: string;
  /** ISO date-time when the counting session started. */
  startedAt: string;
  durationMin: number;
  count: number;
}

export interface BirthPlan {
  birthPlace: string;
  supportPerson: string;
  painRelief: string;
  positions: string;
  feedingPlan: string;
  specialRequests: string;
  skinToSkin: boolean;
  cordClamping: boolean;
  notes: string;
}

/** Reading history, so a visitor can resume an article without an account. */
export interface ReadingState {
  lastTopicId: string;
  /** Most recent first, capped by the state layer. */
  recent: string[];
  bookmarks: string[];
}

/** One entry inside a generic tool log (blood glucose, baby sleep, ...). */
export interface ToolEntry {
  id: string;
  date: string;
  values: Record<string, string | number | boolean>;
  note: string;
}

/**
 * Everything a visitor chose to keep on this device. Every field is optional
 * in practice: an untouched record contains no health information at all.
 */
export interface AppData {
  version: 2;
  profile: Profile;
  /** Trackers kept from the earlier releases of the app. */
  bp: BPReading[];
  weight: WeightEntry[];
  appointments: Appointment[];
  visits: VisitRecord[];
  movements: MovementSession[];
  /** ISO date -> number of glasses of water. */
  water: Record<string, number>;
  bag: Record<string, boolean>;
  birthPlan: BirthPlan;
  reading: ReadingState;
  /** Generic payloads for the tools section, keyed by tool id. */
  tools: Record<string, unknown>;
}

export type { ToolEntry as GenericToolEntry };
