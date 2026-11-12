import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createId, useIndexedState } from '../lib/storage';
import { dataStorageKey } from '../lib/auth';
import {
  decideSync,
  hasUserData,
  pullUserData,
  pushUserData,
  userIdFromScope,
  type SyncStatus,
} from '../lib/sync';
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

const emptyProfile: Profile = {
  name: '',
  lmp: '',
  prePregnancyWeightKg: null,
  heightCm: null,
  clinic: '',
};

const emptyBirthPlan: BirthPlan = {
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
  updateProfile: (profile: Profile) => void;
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
  loadSampleData: () => void;
  /** Device storage state (IndexedDB). */
  storage: { ready: boolean; persisted: boolean; error: string | null };
  /** Cloud sync state; local data is always kept when the cloud is unreachable. */
  sync: {
    status: SyncStatus;
    lastSyncedAt: string | null;
    errorKey: string | null;
    restored: boolean;
    retry: () => void;
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
      ...emptyBirthPlan,
      birthPlace: 'Al-Amal Maternity Hospital',
      supportPerson: 'Husband',
      painRelief: 'Breathing techniques, then epidural if needed',
      feedingPlan: 'Exclusive breastfeeding',
    },
    setupComplete: true,
  };
}

export function AppStateProvider({
  children,
  scope = 'guest',
}: {
  children: ReactNode;
  /** Signed-in accounts get their own storage bucket; guests keep the legacy key. */
  scope?: string;
}) {
  const [data, setData, meta] = useIndexedState<AppData>(dataStorageKey(scope), initialData);
  const userId = userIdFromScope(scope);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(userId ? 'idle' : 'localOnly');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [syncErrorKey, setSyncErrorKey] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const dataRef = useRef(data);
  dataRef.current = data;
  const updatedAtRef = useRef<string | null>(meta.updatedAt);
  updatedAtRef.current = meta.updatedAt;
  const syncedJson = useRef<string | null>(null);
  const syncArmed = useRef(false);

  const push = useCallback(
    async (payload: AppData) => {
      if (!userId) return;
      setSyncStatus('syncing');
      setSyncErrorKey(null);
      const result = await pushUserData(userId, payload);
      if (result.ok) {
        syncedJson.current = JSON.stringify(payload);
        setSyncStatus('saved');
        setSyncErrorKey(null);
        setLastSyncedAt(result.updatedAt ?? new Date().toISOString());
      } else {
        setSyncStatus(result.errorKey === 'sync.errorOffline' ? 'offline' : 'error');
        setSyncErrorKey(result.errorKey ?? 'sync.errorGeneric');
      }
    },
    [userId],
  );

  /** Pull the account's saved record, then push whatever is newer locally. */
  const syncNow = useCallback(async () => {
    if (!userId) return;
    setSyncStatus('syncing');
    setSyncErrorKey(null);

    const remote = await pullUserData(userId);
    if (!remote.ok) {
      setSyncStatus(remote.errorKey === 'sync.errorOffline' ? 'offline' : 'error');
      setSyncErrorKey(remote.errorKey ?? 'sync.errorGeneric');
      return;
    }

    if (remote.data && decideSync(updatedAtRef.current, remote.updatedAt) === 'pull') {
      syncedJson.current = JSON.stringify(remote.data);
      setData(remote.data);
      setRestored(true);
      setSyncStatus('saved');
      setLastSyncedAt(remote.updatedAt ?? null);
      return;
    }

    if (!remote.data && !hasUserData(dataRef.current)) {
      setSyncStatus('saved');
      setLastSyncedAt(new Date().toISOString());
      return;
    }

    await push(dataRef.current);
  }, [userId, setData, push]);

  // Restore the account's saved record as soon as local storage is ready.
  useEffect(() => {
    if (!meta.ready) return;
    if (!userId) {
      syncArmed.current = false;
      return;
    }
    let active = true;
    syncArmed.current = false;
    void syncNow().finally(() => {
      if (active) syncArmed.current = true;
    });
    return () => {
      active = false;
    };
  }, [meta.ready, userId, syncNow]);

  // Push local edits shortly after they happen.
  useEffect(() => {
    if (!meta.ready || !userId || !syncArmed.current) return;
    const json = JSON.stringify(data);
    if (json === syncedJson.current) return;
    const timer = setTimeout(() => void push(data), 1200);
    return () => clearTimeout(timer);
  }, [data, meta.ready, userId, push]);

  // Last-chance flush when the tab is hidden or closed.
  useEffect(() => {
    if (!userId) return;
    const flush = () => {
      const json = JSON.stringify(dataRef.current);
      if (json === syncedJson.current) return;
      void pushUserData(userId, dataRef.current);
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [userId]);

  const value = useMemo<AppStateValue>(() => {
    const lmp = parseISODate(data.profile.lmp);
    const ga = lmp ? gestationalAge(lmp) : null;
    const eddISO = lmp ? toISODate(dueDateFromLMP(lmp)) : null;

    return {
      data,
      ga,
      eddISO,
      currentWeek: ga ? clampWeek(Math.floor(ga.totalDays / 7) || 1) : 1,
      progress: ga ? progressPercent(ga.totalDays) : 0,
      daysLeft: ga ? daysRemaining(ga.totalDays) : 0,

      updateProfile: (profile) =>
        setData((previous) => ({
          ...previous,
          profile,
          appointments: buildAppointments(profile.lmp, previous.appointments),
          setupComplete: Boolean(profile.lmp),
        })),

      setBirthPlan: (birthPlan) => setData((previous) => ({ ...previous, birthPlan })),

      addBP: (reading) =>
        setData((previous) => ({
          ...previous,
          bp: [...previous.bp, { ...reading, id: createId('bp') }].sort((a, b) =>
            a.date < b.date ? 1 : -1,
          ),
        })),

      removeBP: (id) =>
        setData((previous) => ({ ...previous, bp: previous.bp.filter((item) => item.id !== id) })),

      addWeight: (entry) =>
        setData((previous) => ({
          ...previous,
          weight: [...previous.weight, { ...entry, id: createId('w') }].sort((a, b) =>
            a.date < b.date ? 1 : -1,
          ),
        })),

      removeWeight: (id) =>
        setData((previous) => ({
          ...previous,
          weight: previous.weight.filter((item) => item.id !== id),
        })),

      toggleAppointment: (id) =>
        setData((previous) => ({
          ...previous,
          appointments: previous.appointments.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item,
          ),
        })),

      addVisit: (visit) =>
        setData((previous) => ({
          ...previous,
          visits: [{ ...visit, id: createId('v') }, ...previous.visits],
        })),

      removeVisit: (id) =>
        setData((previous) => ({
          ...previous,
          visits: previous.visits.filter((item) => item.id !== id),
        })),

      addMovement: (session) =>
        setData((previous) => ({
          ...previous,
          movements: [{ ...session, id: createId('m') }, ...previous.movements],
        })),

      removeMovement: (id) =>
        setData((previous) => ({
          ...previous,
          movements: previous.movements.filter((item) => item.id !== id),
        })),

      setWater: (dateISO, glasses) =>
        setData((previous) => ({
          ...previous,
          water: { ...previous.water, [dateISO]: Math.max(0, glasses) },
        })),

      toggleBagItem: (id) =>
        setData((previous) => ({
          ...previous,
          bag: { ...previous.bag, [id]: !previous.bag[id] },
        })),

      resetAll: () => setData(initialData),

      loadSampleData: () => setData(sampleData()),

      storage: { ready: meta.ready, persisted: meta.persisted, error: meta.error },
      sync: {
        status: syncStatus,
        lastSyncedAt,
        errorKey: syncErrorKey,
        restored,
        retry: () => void syncNow(),
      },
    };
  }, [
    data,
    setData,
    syncStatus,
    lastSyncedAt,
    syncErrorKey,
    restored,
    syncNow,
    meta.ready,
    meta.persisted,
    meta.error,
  ]);

  // Never render a half-hydrated record: it would flash the setup screen.
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
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
