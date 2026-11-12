import type { AppData, BirthPlan, Profile } from './types';

/**
 * Default (empty) application state.
 *
 * Kept in its own module so the backup importer can merge an incoming file with
 * the same defaults the app starts from, without importing the React provider.
 */
export const emptyProfile: Profile = {
  name: '',
  lmp: '',
  prePregnancyWeightKg: null,
  heightCm: null,
  clinic: '',
};

export const emptyBirthPlan: BirthPlan = {
  birthPlace: '',
  supportPerson: '',
  painRelief: '',
  positions: '',
  feedingPlan: '',
  specialRequests: '',
  skinToSkin: true,
  cordClamping: true,
  notes: '',
};

export const initialData: AppData = {
  profile: emptyProfile,
  bp: [],
  weight: [],
  appointments: [],
  visits: [],
  movements: [],
  water: {},
  bag: {},
  birthPlan: emptyBirthPlan,
  setupComplete: false,
};
