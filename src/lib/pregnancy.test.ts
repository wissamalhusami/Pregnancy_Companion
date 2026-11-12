import { describe, expect, it } from 'vitest';
import {
  GESTATION_DAYS,
  bpCategory,
  clampWeek,
  daysRemaining,
  dueDateFromLMP,
  formatDate,
  gestationalAge,
  parseISODate,
  progressPercent,
  recommendedWeightGain,
  toISODate,
  trimesterOf,
  weekOfPregnancy,
} from './pregnancy';

describe('date parsing', () => {
  it('parses valid ISO dates and rejects invalid ones', () => {
    expect(toISODate(parseISODate('2026-01-01')!)).toBe('2026-01-01');
    expect(parseISODate('2026-02-30')).toBeNull();
    expect(parseISODate('')).toBeNull();
    expect(parseISODate('01-01-2026')).toBeNull();
  });
});

describe('estimated due date (280-day method)', () => {
  it('adds 280 days to the LMP', () => {
    const edd = dueDateFromLMP(parseISODate('2026-01-01')!);
    expect(toISODate(edd)).toBe('2026-10-08');
    expect(GESTATION_DAYS).toBe(280);
  });

  it('handles a leap year LMP', () => {
    const edd = dueDateFromLMP(parseISODate('2024-02-29')!);
    // 2024-02-29 + 280 days = 2024-12-05
    expect(toISODate(edd)).toBe('2024-12-05');
  });
});

describe('gestational age', () => {
  const lmp = parseISODate('2026-01-01')!;

  it('splits total days into weeks and days', () => {
    const ga = gestationalAge(lmp, parseISODate('2026-03-01')!);
    expect(ga.totalDays).toBe(59);
    expect(ga.weeks).toBe(8);
    expect(ga.days).toBe(3);
    expect(ga.valid).toBe(true);
    expect(ga.postTerm).toBe(false);
  });

  it('flags a future LMP as invalid and clamps to zero', () => {
    const ga = gestationalAge(lmp, parseISODate('2025-12-01')!);
    expect(ga.valid).toBe(false);
    expect(ga.totalDays).toBe(0);
    expect(ga.weeks).toBe(0);
  });

  it('flags post-term pregnancies after 42 weeks', () => {
    // LMP 2026-01-01 + 294 days = 2026-10-22, so use a clearly later date.
    const ga = gestationalAge(lmp, parseISODate('2026-10-30')!);
    expect(ga.totalDays).toBe(302);
    expect(ga.totalDays).toBeGreaterThan(GESTATION_DAYS + 14);
    expect(ga.postTerm).toBe(true);
  });

  it('does not flag 42 weeks exactly as post-term', () => {
    const ga = gestationalAge(lmp, parseISODate('2026-10-22')!);
    expect(ga.totalDays).toBe(294);
    expect(ga.postTerm).toBe(false);
  });
});

describe('progress and remaining days', () => {
  it('maps the 280-day timeline to 0–100 %', () => {
    expect(progressPercent(0)).toBe(0);
    expect(progressPercent(140)).toBe(50);
    expect(progressPercent(280)).toBe(100);
    expect(progressPercent(400)).toBe(100);
    expect(progressPercent(-10)).toBe(0);
  });

  it('counts down to the due date', () => {
    expect(daysRemaining(0)).toBe(280);
    expect(daysRemaining(280)).toBe(0);
    expect(daysRemaining(290)).toBe(-10);
  });
});

describe('trimester and week helpers', () => {
  it('assigns trimesters at the standard boundaries', () => {
    expect(trimesterOf(5)).toBe(1);
    expect(trimesterOf(13)).toBe(1);
    expect(trimesterOf(14)).toBe(2);
    expect(trimesterOf(27)).toBe(2);
    expect(trimesterOf(28)).toBe(3);
    expect(trimesterOf(40)).toBe(3);
  });

  it('clamps weeks into the 1–40 content range', () => {
    expect(clampWeek(0)).toBe(1);
    expect(clampWeek(-3)).toBe(1);
    expect(clampWeek(22.4)).toBe(22);
    expect(clampWeek(41)).toBe(40);
  });

  it('derives the current week from an LMP string', () => {
    expect(weekOfPregnancy('2026-01-01', parseISODate('2026-03-01')!)).toBe(8);
    expect(weekOfPregnancy('not-a-date', parseISODate('2026-03-01')!)).toBe(1);
  });
});

describe('blood pressure categories', () => {
  it('applies educational ACOG-style bands', () => {
    expect(bpCategory(110, 70)).toBe('normal');
    expect(bpCategory(122, 78)).toBe('elevated');
    expect(bpCategory(132, 84)).toBe('stage1');
    expect(bpCategory(145, 92)).toBe('stage2');
    expect(bpCategory(165, 112)).toBe('crisis');
    expect(bpCategory(118, 95)).toBe('stage2');
  });
});

describe('recommended gestational weight gain', () => {
  it('uses pre-pregnancy BMI categories', () => {
    expect(recommendedWeightGain(165, 60)?.category).toBe('normal');
    expect(recommendedWeightGain(165, 60)?.minGainKg).toBe(11.5);
    expect(recommendedWeightGain(165, 60)?.maxGainKg).toBe(16);
    expect(recommendedWeightGain(165, 48)?.category).toBe('underweight');
    expect(recommendedWeightGain(165, 75)?.category).toBe('overweight');
    expect(recommendedWeightGain(165, 95)?.category).toBe('obese');
  });

  it('returns null when inputs are missing', () => {
    expect(recommendedWeightGain(null, 60)).toBeNull();
    expect(recommendedWeightGain(165, null)).toBeNull();
    expect(recommendedWeightGain(0, 60)).toBeNull();
  });
});

describe('formatting', () => {
  it('formats dates in both languages without throwing', () => {
    expect(formatDate('2026-10-08', 'en')).toContain('2026');
    expect(formatDate('2026-10-08', 'ar').length).toBeGreaterThan(0);
    expect(formatDate('bogus', 'en')).toBe('—');
  });
});
