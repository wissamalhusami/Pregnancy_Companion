/**
 * Pregnancy date and measurement helpers.
 *
 * The gestational age and the estimated date of delivery (EDD) are calculated
 * from the first day of the last menstrual period (LMP) using Naegele's rule:
 * EDD = LMP + 280 days (40 weeks).
 *
 * Educational tool only — actual dating should be confirmed by a clinician,
 * usually with an early ultrasound.
 */

export const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const GESTATION_DAYS = 280;

export interface GestationalAge {
  /** Days since LMP (0 when LMP is in the future). */
  totalDays: number;
  weeks: number;
  days: number;
  /** True when the LMP is today or in the past. */
  valid: boolean;
  /** True when the pregnancy has passed 42 weeks. */
  postTerm: boolean;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Parses `YYYY-MM-DD` into a local-midnight Date, or null when invalid. */
export function parseISODate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/** Formats a Date as `YYYY-MM-DD` using local calendar fields. */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

/** Whole-day difference between two dates (b - a), ignoring time of day. */
export function dayDiff(a: Date, b: Date): number {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / MS_PER_DAY);
}

/** Estimated due date: LMP + 280 days. */
export function dueDateFromLMP(lmp: Date): Date {
  return addDays(startOfDay(lmp), GESTATION_DAYS);
}

/** Gestational age in weeks + days at a given reference date. */
export function gestationalAge(lmp: Date, today: Date = new Date()): GestationalAge {
  const raw = dayDiff(lmp, today);
  const totalDays = Math.max(0, raw);
  return {
    totalDays,
    weeks: Math.floor(totalDays / 7),
    days: totalDays % 7,
    valid: raw >= 0,
    postTerm: totalDays > GESTATION_DAYS + 14,
  };
}

/** 1, 2 or 3 — based on completed gestational weeks. */
export function trimesterOf(weeks: number): 1 | 2 | 3 {
  if (weeks < 14) return 1;
  if (weeks < 28) return 2;
  return 3;
}

/** Pregnancy progress as a 0–100 percentage of the 280-day timeline. */
export function progressPercent(totalDays: number): number {
  const clamped = Math.min(Math.max(totalDays, 0), GESTATION_DAYS);
  return Math.round((clamped / GESTATION_DAYS) * 100);
}

/** Days remaining until the EDD (negative when past the due date). */
export function daysRemaining(totalDays: number): number {
  return GESTATION_DAYS - totalDays;
}

/** Clamps a gestational week into the 1–40 range used by the content set. */
export function clampWeek(week: number): number {
  return Math.min(Math.max(Math.round(week) || 1, 1), 40);
}

export type BPCategory = 'normal' | 'elevated' | 'stage1' | 'stage2' | 'crisis';

/**
 * Educational blood-pressure bands (ACOG-style thresholds).
 * This is not a diagnosis: any repeated high reading needs clinical review.
 */
export function bpCategory(systolic: number, diastolic: number): BPCategory {
  if (systolic >= 160 || diastolic >= 110) return 'crisis';
  if (systolic >= 140 || diastolic >= 90) return 'stage2';
  if (systolic >= 130 || diastolic >= 80) return 'stage1';
  if (systolic >= 120) return 'elevated';
  return 'normal';
}

export interface WeightGuidance {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  /** Recommended total gain for a singleton pregnancy, in kg (IOM/NAM 2009). */
  minGainKg: number;
  maxGainKg: number;
}

/** Recommended total gestational weight gain for a singleton pregnancy. */
export function recommendedWeightGain(
  heightCm: number | null,
  prePregnancyKg: number | null,
): WeightGuidance | null {
  if (!heightCm || !prePregnancyKg || heightCm <= 0 || prePregnancyKg <= 0) return null;
  const metres = heightCm / 100;
  const bmi = prePregnancyKg / (metres * metres);
  if (bmi < 18.5) return { bmi, category: 'underweight', minGainKg: 12.5, maxGainKg: 18 };
  if (bmi < 25) return { bmi, category: 'normal', minGainKg: 11.5, maxGainKg: 16 };
  if (bmi < 30) return { bmi, category: 'overweight', minGainKg: 7, maxGainKg: 11.5 };
  return { bmi, category: 'obese', minGainKg: 5, maxGainKg: 9 };
}

/** Localised, human-readable date (Latin digits for readability in both languages). */
export function formatDate(value: string | Date, lang: 'ar' | 'en'): string {
  const date = typeof value === 'string' ? parseISODate(value) ?? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '—';
  const locale = lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Localised date + time, used for measurement records. */
export function formatDateTime(value: string, lang: 'ar' | 'en'): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const locale = lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** Week label such as "24" for the tracker. */
export function weekOfPregnancy(lmpISO: string, today: Date = new Date()): number {
  const lmp = parseISODate(lmpISO);
  if (!lmp) return 1;
  return clampWeek(Math.floor(gestationalAge(lmp, today).totalDays / 7) || 1);
}
