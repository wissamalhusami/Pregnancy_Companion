import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';
import { createId, useIndexedState } from '../lib/storage';
import { initialData } from '../lib/defaults';
import type {
  AppData,
  Appointment,
  BirthPlan,
  BPReading,
  MovementSession,
  Profile,
  VisitRecord,
  WeightEntry,
} from '../lib/types';
import {
  addDays,
  clampWeek,
  daysRemaining,
  dueDateFromLMP,
  gestationalAge,
  parseISODate,
  progressPercent,
  toISODate,
  type GestationalAge,
} from '../lib/pregnancy';

/** WHO 2016 eight-contact antenatal model, expressed as gestational weeks. */
export const ANC_WEEKS = [12, 20, 26, 30, 34, 36, 38, 40] as const;

/**
 * The app has no accounts, so every device holds exactly one record under one
 * fixed IndexedDB key. Nothing is namespaced by user id any more.
 */
export const LOCAL_DATA_KEY = 'data';

export { initialData };

export function buildAppointments(lmpISO: string, existing: Appointment[] = []): Appointment[] {
  const lmp = parseISODate(lmpISO);
  if (!lmp) return existing;
  return ANC_WEEKS.map((week) => {
    const previous = existing.find((item) => item.week === week);
    return {
      id: previous?.id ?? createId(`anc${week}`),
      week,
      date: toISODate(addDays(lmp, week * 7)),
      done: previous?.done ?? false,
      notes: previous?.notes ?? '',
    };
  });
}

interface AppStateValue {
  data: AppData;
  ga: GestationalAge | null;
  eddISO: string | null;
  currentWeek: number;
  progress: number;
  daysLeft: number;
  /** Resolves once the profile is durably stored on this device. */
  updateProfile: (profile: Profile) => Promise<boolean>;
  setBirthPlan: (plan: BirthPlan) => void;
  addBP: (reading: Omit<BPReading, 'id'>) => void;
  removeBP: (id: string) => void;
  addWeight: (entry: Omit<WeightEntry, 'id'>) => void;
  removeWeight: (id: string) => void;
  toggleAppointment: (id: string) => void;
  addVisit: (visit: Omit<VisitRecord, 'id'>) => void;
  removeVisit: (id: string) => void;
  addMovement: (session: Omit<MovementSession, 'id'>) => void;
  removeMovement: (id: string) => void;
  setWater: (dateISO: string, glasses: number) => void;
  toggleBagItem: (id: string) => void;
  resetAll: () => void;
  loadSampleData: () => Promise<boolean>;
  /** Replaces the whole record, used when a backup file is restored. */
  replaceAll: (next: AppData) => Promise<boolean>;
  /** Local device storage (IndexedDB). There is no remote copy. */
  storage: {
    ready: boolean;
    persisted: boolean;
    error: string | null;
    lastSavedAt: string | null;
    flush: () => Promise<boolean>;
  };
}

const AppStateContext = createContext<AppStateValue | null>(null);

function sampleData(): AppData {
  const today = new Date();
  // A realistic mid-pregnancy scenario: 24 weeks + 2 days.
  const lmp = addDays(today, -170);
  const lmpISO = toISODate(lmp);

  const bp: BPReading[] = [
    { id: createId('bp'), date: `${toISODate(addDays(today, -84))}T09:15:00`, systolic: 112, diastolic: 70, pulse: 78, note: '' },
    { id: createId('bp'), date: `${toISODate(addDays(today, -56))}T10:05:00`, systolic: 118, diastolic: 74, pulse: 82, note: '' },
    { id: createId('bp'), date: `${toISODate(addDays(today, -28))}T09:40:00`, systolic: 122, diastolic: 76, pulse: 80, note: '' },
    { id: createId('bp'), date: `${toISODate(addDays(today, -3))}T11:20:00`, systolic: 116, diastolic: 72, pulse: 84, note: '' },
  ];

  const weight: WeightEntry[] = [
    { id: createId('w'), date: toISODate(addDays(today, -140)), kg: 61.5 },
    { id: createId('w'), date: toISODate(addDays(today, -98)), kg: 63.2 },
    { id: createId('w'), date: toISODate(addDays(today, -56)), kg: 66.0 },
    { id: createId('w'), date: toISODate(addDays(today, -14)), kg: 68.4 },
  ];

  const visits: VisitRecord[] = [
    {
      id: createId('v'),
      date: toISODate(addDays(today, -28)),
      provider: 'Dr. Layla Hassan – Antenatal clinic',
      reason: 'Routine antenatal visit',
      bp: '122/76',
      weightKg: 66,
      notes: 'Fundal height consistent with dates. Fetal heart heard. Iron and folic acid continued.',
    },
  ];

  const movements: MovementSession[] = [
    { id: createId('m'), startedAt: `${toISODate(addDays(today, -2))}T20:30:00`, durationMin: 42, count: 10 },
    { id: createId('m'), startedAt: `${toISODate(addDays(today, -1))}T21:10:00`, durationMin: 55, count: 10 },
  ];

  const appointments = buildAppointments(lmpISO).map((item) => ({
    ...item,
    done: item.week <= 20,
  }));

  return {
    profile: {
      name: 'مريم / Maryam',
      lmp: lmpISO,
      prePregnancyWeightKg: 61.5,
      heightCm: 163,
      clinic: 'Al-Amal Maternity Hospital',
    },
    bp,
    weight,
    visits,
    movements,
    appointments,
    water: { [toISODate(today)]: 4 },
    bag: { 'bag-1': true, 'bag-2': true, 'bag-5': true, 'bag-9': true, 'bag-14': true },
    birthPlan: {
      ...initialData.birthPlan,
      birthPlace: 'Al-Amal Maternity Hospital',
      supportPerson: 'Husband',
      painRelief: 'Breathing techniques, then epidural if needed',
      feedingPlan: 'Exclusive breastfeeding',
    },
    setupComplete: true,
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [data, setData, meta, flushStorage] = useIndexedState<AppData>(LOCAL_DATA_KEY, initialData);

  // Mutations build the next record from the newest value and flush it straight
  // away, so a reload right after a save can never lose the change.
  const dataRef = useRef(data);
  dataRef.current = data;

  const commit = useCallback(
    (next: AppData) => {
      setData(next);
      void flushStorage(next);
    },
    [setData, flushStorage],
  );

  const replaceAll = useCallback(
    (next: AppData) => {
      setData(next);
      return flushStorage(next);
    },
    [setData, flushStorage],
  );

  const updateProfile = useCallback(
    (profile: Profile) => {
      const next: AppData = {
        ...dataRef.current,
        profile,
        appointments: buildAppointments(profile.lmp, dataRef.current.appointments),
        setupComplete: Boolean(profile.lmp),
      };
      setData(next);
      return flushStorage(next);
    },
    [setData, flushStorage],
  );

  const loadSampleData = useCallback(() => {
    const sample = sampleData();
    setData(sample);
    return flushStorage(sample);
  }, [setData, flushStorage]);

  const ga = useMemo(() => {
    const lmp = parseISODate(data.profile.lmp);
    return lmp ? gestationalAge(lmp) : null;
  }, [data.profile.lmp]);

  const eddISO = useMemo(() => {
    const lmp = parseISODate(data.profile.lmp);
    return lmp ? toISODate(dueDateFromLMP(lmp)) : null;
  }, [data.profile.lmp]);

  const value = useMemo<AppStateValue>(() => {
    const currentWeek = ga ? clampWeek(ga.weeks) : 0;
    return {
      data,
      ga,
      eddISO,
      currentWeek,
      progress: ga ? progressPercent(ga.totalDays) : 0,
      daysLeft: ga ? daysRemaining(ga.totalDays) : 0,
      updateProfile,
      replaceAll,
      setBirthPlan: (plan) => commit({ ...dataRef.current, birthPlan: plan }),
      addBP: (reading) =>
        commit({
          ...dataRef.current,
          bp: [{ id: createId('bp'), ...reading }, ...dataRef.current.bp],
        }),
      removeBP: (id) =>
        commit({ ...dataRef.current, bp: dataRef.current.bp.filter((item) => item.id !== id) }),
      addWeight: (entry) =>
        commit({
          ...dataRef.current,
          weight: [{ id: createId('w'), ...entry }, ...dataRef.current.weight],
        }),
      removeWeight: (id) =>
        commit({
          ...dataRef.current,
          weight: dataRef.current.weight.filter((item) => item.id !== id),
        }),
      toggleAppointment: (id) =>
        commit({
          ...dataRef.current,
          appointments: dataRef.current.appointments.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item,
          ),
        }),
      addVisit: (visit) =>
        commit({
          ...dataRef.current,
          visits: [{ id: createId('v'), ...visit }, ...dataRef.current.visits],
        }),
      removeVisit: (id) =>
        commit({
          ...dataRef.current,
          visits: dataRef.current.visits.filter((item) => item.id !== id),
        }),
      addMovement: (session) =>
        commit({
          ...dataRef.current,
          movements: [{ id: createId('m'), ...session }, ...dataRef.current.movements],
        }),
      removeMovement: (id) =>
        commit({
          ...dataRef.current,
          movements: dataRef.current.movements.filter((item) => item.id !== id),
        }),
      setWater: (dateISO, glasses) =>
        commit({
          ...dataRef.current,
          water: {
            ...dataRef.current.water,
            [dateISO]: Math.max(0, Math.min(40, Math.round(glasses))),
          },
        }),
      toggleBagItem: (id) =>
        commit({
          ...dataRef.current,
          bag: { ...dataRef.current.bag, [id]: !dataRef.current.bag[id] },
        }),
      resetAll: () => commit(initialData),
      loadSampleData,
      storage: {
        ready: meta.ready,
        persisted: meta.persisted,
        error: meta.error,
        lastSavedAt: meta.updatedAt,
        flush: () => flushStorage(),
      },
    };
  }, [data, ga, eddISO, commit, updateProfile, replaceAll, loadSampleData, flushStorage, meta.ready, meta.persisted, meta.error, meta.updatedAt]);

  // Wait for the IndexedDB read before rendering, otherwise a returning visitor
  // would briefly see the setup screen instead of their saved record.
  if (!meta.ready) {
    return (
      <div className="boot-screen" role="status" aria-live="polite">
        <div className="boot-mark" aria-hidden="true" />
        <p className="boot-text">RIFQAH · رِفْقَة</p>
      </div>
    );
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return context;
}
