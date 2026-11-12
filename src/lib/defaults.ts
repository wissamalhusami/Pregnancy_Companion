import type { AppData, BirthPlan, Profile } from './types';

/**
 * A brand-new record. It deliberately contains no name, no pregnancy dates and
 * no sample measurements: the visitor decides what to add.
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

export function createEmptyData(): AppData {
  return {
    version: 2,
    profile: { ...emptyProfile },
    bp: [],
    weight: [],
    appointments: [],
    visits: [],
    movements: [],
    water: {},
    bag: {},
    birthPlan: { ...emptyBirthPlan },
    reading: { lastTopicId: '', recent: [], bookmarks: [] },
    tools: {},
  };
}

export const initialData: AppData = createEmptyData();

/** True when the visitor has not stored any personal information yet. */
export function isDataEmpty(data: AppData): boolean {
  return (
    !data.profile.name &&
    !data.profile.lmp &&
    !data.profile.clinic &&
    data.profile.heightCm === null &&
    data.profile.prePregnancyWeightKg === null &&
    data.bp.length === 0 &&
    data.weight.length === 0 &&
    data.appointments.length === 0 &&
    data.visits.length === 0 &&
    data.movements.length === 0 &&
    Object.keys(data.water).length === 0 &&
    Object.keys(data.bag).length === 0 &&
    data.reading.recent.length === 0 &&
    data.reading.bookmarks.length === 0 &&
    Object.keys(data.tools).length === 0
  );
}
