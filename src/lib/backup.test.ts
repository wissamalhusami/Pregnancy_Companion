import { describe, expect, it } from 'vitest';
import {
  BACKUP_FORMAT,
  BACKUP_VERSION,
  backupFileName,
  buildBackup,
  normalizeData,
  parseBackup,
  serializeBackup,
} from './backup';
import { initialData } from './defaults';
import type { AppData } from './types';

const record: AppData = {
  profile: {
    name: 'مريم',
    lmp: '2026-06-01',
    prePregnancyWeightKg: 61.5,
    heightCm: 163,
    clinic: 'Al-Amal Maternity Hospital',
  },
  bp: [{ id: 'bp-1', date: '2026-07-01T09:00:00', systolic: 118, diastolic: 76, pulse: 80, note: 'صباحاً' }],
  weight: [{ id: 'w-1', date: '2026-07-01', kg: 63.4 }],
  appointments: [{ id: 'anc-12', week: 12, date: '2026-08-24', done: true, notes: 'تحاليل' }],
  visits: [
    {
      id: 'v-1',
      date: '2026-07-02',
      provider: 'Dr. Layla',
      reason: 'زيارة روتينية',
      bp: '118/76',
      weightKg: 63.4,
      notes: 'كل شيء طبيعي',
    },
  ],
  movements: [{ id: 'm-1', startedAt: '2026-07-03T20:00:00', durationMin: 40, count: 10 }],
  water: { '2026-07-03': 5 },
  bag: { 'bag-1': true, 'bag-2': false },
  birthPlan: { ...initialData.birthPlan, birthPlace: 'Al-Amal', supportPerson: 'الزوج' },
  setupComplete: true,
};

describe('backup export', () => {
  it('wraps the record in a versioned envelope', () => {
    const backup = buildBackup(record, new Date('2026-07-10T12:00:00Z'));
    expect(backup.format).toBe(BACKUP_FORMAT);
    expect(backup.version).toBe(BACKUP_VERSION);
    expect(backup.app).toBe('rifqah');
    expect(backup.exportedAt).toBe('2026-07-10T12:00:00.000Z');
    expect(backup.data).toEqual(record);
  });

  it('serialises to readable JSON that round-trips every section', () => {
    const text = serializeBackup(record, new Date('2026-07-10T12:00:00Z'));
    expect(text).toContain('\n  "format"');

    const parsed = parseBackup(text);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.data.profile).toEqual(record.profile);
    expect(parsed.data.bp).toEqual(record.bp);
    expect(parsed.data.weight).toEqual(record.weight);
    expect(parsed.data.appointments).toEqual(record.appointments);
    expect(parsed.data.visits).toEqual(record.visits);
    expect(parsed.data.movements).toEqual(record.movements);
    expect(parsed.data.water).toEqual(record.water);
    expect(parsed.data.bag).toEqual(record.bag);
    expect(parsed.data.birthPlan).toEqual(record.birthPlan);
    expect(parsed.data.setupComplete).toBe(true);
  });

  it('names the file with the export date', () => {
    const name = backupFileName(new Date('2026-07-10T12:00:00Z'));
    expect(name).toBe('rifqah-backup-2026-07-10.json');
  });
});

describe('backup import validation', () => {
  it('rejects an empty file', () => {
    expect(parseBackup('   ')).toEqual({ ok: false, errorKey: 'backup.errorEmpty' });
  });

  it('rejects text that is not JSON', () => {
    expect(parseBackup('<html>oops</html>')).toEqual({ ok: false, errorKey: 'backup.errorInvalid' });
  });

  it('rejects a JSON file from another application', () => {
    const result = parseBackup(JSON.stringify({ format: 'other-app', version: 1, data: {} }));
    expect(result).toEqual({ ok: false, errorKey: 'backup.errorFormat' });
  });

  it('rejects a backup written by a newer app version', () => {
    const result = parseBackup(
      JSON.stringify({ format: BACKUP_FORMAT, version: BACKUP_VERSION + 1, data: record }),
    );
    expect(result).toEqual({ ok: false, errorKey: 'backup.errorVersion' });
  });

  it('rejects a file without a pregnancy profile', () => {
    const result = parseBackup(JSON.stringify({ format: BACKUP_FORMAT, version: 1, data: { bp: [] } }));
    expect(result).toEqual({ ok: false, errorKey: 'backup.errorStructure' });
  });

  it('rejects a profile whose LMP is not a real date', () => {
    const broken = { ...record, profile: { ...record.profile, lmp: '2026-13-45' } };
    const result = parseBackup(JSON.stringify({ format: BACKUP_FORMAT, version: 1, data: broken }));
    expect(result).toEqual({ ok: false, errorKey: 'backup.errorStructure' });
  });

  it('still restores the plain JSON export from earlier releases', () => {
    const parsed = parseBackup(JSON.stringify(record));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.legacy).toBe(true);
    expect(parsed.version).toBe(0);
    expect(parsed.data.profile.lmp).toBe('2026-06-01');
  });

  it('drops unusable rows instead of importing corrupt values', () => {
    const messy = {
      profile: record.profile,
      bp: [{ systolic: '120', diastolic: 80 }, record.bp[0], 'nonsense'],
      weight: [{ kg: 'heavy' }, record.weight[0]],
      water: { '2026-07-03': 6, notADate: 3, '2026-07-04': 'lots' },
      bag: { 'bag-1': true, 'bag-2': 'yes' },
      movements: [{ count: 'ten' }, record.movements[0]],
      setupComplete: true,
    };
    const data = normalizeData(messy);
    expect(data).not.toBeNull();
    if (!data) return;
    expect(data.bp).toHaveLength(1);
    expect(data.weight).toHaveLength(1);
    expect(data.water).toEqual({ '2026-07-03': 6 });
    expect(data.bag).toEqual({ 'bag-1': true });
    expect(data.movements).toHaveLength(1);
    expect(data.appointments).toEqual([]);
    expect(data.visits).toEqual([]);
  });

  it('gives missing identifiers a stable fallback id', () => {
    const data = normalizeData({
      profile: record.profile,
      bp: [{ date: '2026-07-01', systolic: 120, diastolic: 80 }],
    });
    expect(data?.bp[0].id).toBe('restored-bp-0');
  });

  it('clamps water glasses to a sane range', () => {
    const data = normalizeData({
      profile: record.profile,
      water: { '2026-07-03': 900, '2026-07-04': -5 },
    });
    expect(data?.water).toEqual({ '2026-07-03': 40, '2026-07-04': 0 });
  });
});
