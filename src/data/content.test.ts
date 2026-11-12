import { describe, expect, it } from 'vitest';
import { ui } from '../i18n';
import { weeks } from './weeks';
import { dangerSigns } from './dangerSigns';
import { nutrients } from './nutrition';
import { labTests, antenatalContacts } from './antenatal';
import { laborStages, bagItems } from './labor';
import { bfPositions, bfProblems } from './breastfeeding';
import { postpartumDanger } from './postpartum';
import type { Bi } from '../lib/types';

const filled = (value: Bi) => value.ar.trim().length > 0 && value.en.trim().length > 0;

describe('bilingual UI dictionary', () => {
  it('has a non-empty Arabic and English string for every key', () => {
    const incomplete = Object.entries(ui)
      .filter(([, value]) => !filled(value))
      .map(([key]) => key);
    expect(incomplete).toEqual([]);
  });

  it('contains a meaningful number of keys', () => {
    expect(Object.keys(ui).length).toBeGreaterThan(200);
  });
});

describe('week-by-week content', () => {
  it('covers weeks 4 to 40 without gaps', () => {
    const numbers = weeks.map((entry) => entry.week);
    expect(numbers[0]).toBe(4);
    expect(numbers[numbers.length - 1]).toBe(40);
    for (let week = 4; week <= 40; week += 1) {
      expect(numbers).toContain(week);
    }
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it('has bilingual fetal and maternal text plus plausible measurements', () => {
    for (const entry of weeks) {
      expect(filled(entry.fetal)).toBe(true);
      expect(filled(entry.maternal)).toBe(true);
      expect(filled(entry.tip)).toBe(true);
      expect(entry.lengthCm).toBeGreaterThan(0);
      expect(entry.weightG).toBeGreaterThanOrEqual(0);
    }
  });

  it('grows length and weight monotonically', () => {
    for (let index = 1; index < weeks.length; index += 1) {
      expect(weeks[index].lengthCm).toBeGreaterThanOrEqual(weeks[index - 1].lengthCm);
      expect(weeks[index].weightG).toBeGreaterThanOrEqual(weeks[index - 1].weightG);
    }
  });
});

describe('required educational topics', () => {
  it('documents all seven pregnancy danger signs', () => {
    const ids = dangerSigns.map((sign) => sign.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'bleeding',
        'headache',
        'vision',
        'pain',
        'fluid',
        'movement',
        'convulsion',
      ]),
    );
    for (const sign of dangerSigns) {
      expect(filled(sign.title)).toBe(true);
      expect(filled(sign.action)).toBe(true);
    }
  });

  it('covers the required nutrients', () => {
    const ids = nutrients.map((nutrient) => nutrient.id);
    expect(ids).toEqual(
      expect.arrayContaining(['folate', 'iron', 'calcium', 'vitamin-d', 'protein']),
    );
  });

  it('includes antenatal contacts, lab tests and the WHO eight-contact model', () => {
    expect(antenatalContacts.length).toBeGreaterThanOrEqual(8);
    expect(labTests.length).toBeGreaterThan(0);
  });

  it('includes three labor stages and a hospital bag', () => {
    expect(laborStages).toHaveLength(3);
    expect(bagItems.length).toBeGreaterThan(10);
  });

  it('includes breastfeeding positions and common problems', () => {
    expect(bfPositions.length).toBeGreaterThanOrEqual(3);
    expect(bfProblems.length).toBeGreaterThanOrEqual(4);
  });

  it('includes postpartum danger signs', () => {
    expect(postpartumDanger.length).toBeGreaterThanOrEqual(3);
  });
});
