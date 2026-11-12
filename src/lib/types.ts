export type Lang = 'ar' | 'en';

/** A bilingual string used across the education content. */
export type Bi = { ar: string; en: string };

export interface Profile {
  /** Mother's display name (local only). */
  name: string;
  /** Last menstrual period, ISO date (YYYY-MM-DD). */
  lmp: string;
  prePregnancyWeightKg: number | null;
  heightCm: number | null;
  /** Maternity clinic / hospital used for reminders. */
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

export interface AppData {
  profile: Profile;
  bp: BPReading[];
  weight: WeightEntry[];
  appointments: Appointment[];
  visits: VisitRecord[];
  movements: MovementSession[];
  /** ISO date -> number of glasses of water. */
  water: Record<string, number>;
  bag: Record<string, boolean>;
  birthPlan: BirthPlan;
  setupComplete: boolean;
}
