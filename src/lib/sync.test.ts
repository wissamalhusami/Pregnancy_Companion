import { describe, expect, it } from 'vitest';
import { decideSync, hasUserData, syncErrorKey, userIdFromScope } from './sync';
import type { AppData } from './types';

const blank = (): AppData => ({
  profile: { name: '', lmp: '', prePregnancyWeightKg: null, heightCm: null, clinic: '' },
  bp: [],
  weight: [],
  appointments: [],
  visits: [],
  movements: [],
  water: {},
  bag: {},
  birthPlan: {
    birthPlace: '',
    supportPerson: '',
    painRelief: '',
    positions: '',
    feedingPlan: '',
    specialRequests: '',
    skinToSkin: true,
    cordClamping: true,
    notes: '',
  },
  setupComplete: false,
});

describe('decideSync', () => {
  it('pushes when only the device has data', () => {
    expect(decideSync('2026-01-02T00:00:00.000Z', null)).toBe('push');
  });

  it('pulls when only the cloud has data', () => {
    expect(decideSync(null, '2026-01-02T00:00:00.000Z')).toBe('pull');
  });

  it('pulls when the cloud copy is newer', () => {
    expect(decideSync('2026-01-01T00:00:00.000Z', '2026-01-02T00:00:00.000Z')).toBe('pull');
  });

  it('pushes when the device copy is newer or equal', () => {
    expect(decideSync('2026-01-03T00:00:00.000Z', '2026-01-02T00:00:00.000Z')).toBe('push');
    expect(decideSync('2026-01-02T00:00:00.000Z', '2026-01-02T00:00:00.000Z')).toBe('push');
  });

  it('does nothing without any timestamp', () => {
    expect(decideSync(null, undefined)).toBe('none');
    expect(decideSync('not-a-date', '')).toBe('none');
  });
});

describe('hasUserData', () => {
  it('ignores a blank record', () => {
    expect(hasUserData(blank())).toBe(false);
    expect(hasUserData(null)).toBe(false);
  });

  it('detects entered pregnancy data', () => {
    expect(hasUserData({ ...blank(), setupComplete: true })).toBe(true);
    expect(hasUserData({ ...blank(), water: { '2026-01-01': 2 } })).toBe(true);
    expect(hasUserData({ ...blank(), profile: { ...blank().profile, lmp: '2026-01-01' } })).toBe(true);
  });
});

describe('syncErrorKey', () => {
  it('classifies network failures as offline', () => {
    expect(syncErrorKey('TypeError: Failed to fetch')).toBe('sync.errorOffline');
    expect(syncErrorKey('Load failed')).toBe('sync.errorOffline');
  });

  it('classifies a missing table', () => {
    expect(
      syncErrorKey("Could not find the table 'public.pregnancy_records' in the schema cache"),
    ).toBe('sync.errorNoTable');
  });

  it('classifies policy and token failures', () => {
    expect(syncErrorKey('new row violates row-level security policy')).toBe('sync.errorPermission');
    expect(syncErrorKey('JWT expired')).toBe('sync.errorPermission');
  });

  it('falls back to a generic message', () => {
    expect(syncErrorKey('')).toBe('sync.errorGeneric');
    expect(syncErrorKey('something unexpected')).toBe('sync.errorGeneric');
  });
});

describe('userIdFromScope', () => {
  it('extracts the user id and ignores the guest scope', () => {
    expect(userIdFromScope('user-8f14e45f')).toBe('8f14e45f');
    expect(userIdFromScope('guest')).toBeNull();
  });
});
