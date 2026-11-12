import { useMemo, useState } from 'react';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import { antenatalContacts, labTests, routineChecks } from '../data/antenatal';
import {
  bpCategory,
  formatDate,
  formatDateTime,
  recommendedWeightGain,
  toISODate,
} from '../lib/pregnancy';
import { Card, Disclaimer, Empty, ProgressBar } from '../components/ui';
import { Icon } from '../components/Icon';

const bpLabelKey: Record<string, string> = {
  normal: 'anc.bpNormal',
  elevated: 'anc.bpElevated',
  stage1: 'anc.bpHigh',
  stage2: 'anc.bpHigh',
  crisis: 'anc.bpCrisis',
};

export function Antenatal() {
  const { t, pick, lang } = useLang();
  const {
    data,
    currentWeek,
    addBP,
    removeBP,
    addWeight,
    removeWeight,
    toggleAppointment,
    addVisit,
    removeVisit,
  } = useAppState();

  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [note, setNote] = useState('');
  const [bpError, setBpError] = useState('');

  const [weightKg, setWeightKg] = useState('');
  const [weightError, setWeightError] = useState('');

  const [visitDate, setVisitDate] = useState(toISODate(new Date()));
  const [provider, setProvider] = useState('');
  const [reason, setReason] = useState('');
  const [visitNotes, setVisitNotes] = useState('');
  const [visitError, setVisitError] = useState('');

  const [reminder, setReminder] = useState<'idle' | 'on' | 'denied'>('idle');

  const appointments = useMemo(
    () => [...data.appointments].sort((a, b) => a.week - b.week),
    [data.appointments],
  );
  const doneCount = appointments.filter((item) => item.done).length;

  const guidance = recommendedWeightGain(data.profile.heightCm, data.profile.prePregnancyWeightKg);
  const latestWeight = data.weight[0];
  const gain =
    latestWeight && data.profile.prePregnancyWeightKg
      ? latestWeight.kg - data.profile.prePregnancyWeightKg
      : null;

  const submitBP = (event: React.FormEvent) => {
    event.preventDefault();
    const sys = Number(systolic);
    const dia = Number(diastolic);
    if (!sys || !dia || sys < 60 || sys > 260 || dia < 30 || dia > 160) {
      setBpError(t('anc.bpNote'));
      return;
    }
    setBpError('');
    addBP({
      date: new Date().toISOString(),
      systolic: sys,
      diastolic: dia,
      pulse: pulse ? Number(pulse) : null,
      note: note.trim(),
    });
    setSystolic('');
    setDiastolic('');
    setPulse('');
    setNote('');
  };

  const submitWeight = (event: React.FormEvent) => {
    event.preventDefault();
    const kg = Number(weightKg);
    if (!kg || kg < 30 || kg > 250) {
      setWeightError(t('anc.weightNote'));
      return;
    }
    setWeightError('');
    addWeight({ date: toISODate(new Date()), kg });
    setWeightKg('');
  };

  const submitVisit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!provider.trim() || !reason.trim()) {
      setVisitError(t('common.required'));
      return;
    }
    setVisitError('');
    addVisit({
      date: visitDate,
      provider: provider.trim(),
      reason: reason.trim(),
      bp: data.bp[0] ? `${data.bp[0].systolic}/${data.bp[0].diastolic}` : '',
      weightKg: latestWeight ? latestWeight.kg : null,
      notes: visitNotes.trim(),
    });
    setProvider('');
    setReason('');
    setVisitNotes('');
  };

  const enableReminder = async () => {
    if (typeof Notification === 'undefined') {
      setReminder('denied');
      return;
    }
    try {
      const result = await Notification.requestPermission();
      if (result === 'granted') {
        setReminder('on');
        const next = appointments.find((item) => !item.done);
        if (next) {
          new Notification(t('anc.reminderOn'), {
            body: `${t('anc.weekOf', { week: next.week })} — ${formatDate(next.date, lang)}`,
          });
        }
      } else {
        setReminder('denied');
      }
    } catch {
      setReminder('denied');
    }
  };

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('anc.title')}</h1>
          <p className="page-sub">{t('anc.subtitle')}</p>
        </div>
      </header>

      <Card
        title={t('anc.schedule')}
        icon="calendar"
        action={
          <span className="chip">
            {doneCount}/{appointments.length}
          </span>
        }
      >
        <p className="small muted" style={{ marginBlockEnd: 12 }}>
          {t('anc.scheduleNote')}
        </p>
        <ProgressBar percent={(doneCount / Math.max(1, appointments.length)) * 100} />
        <ul className="stack-list" style={{ marginBlockStart: 14 }}>
          {appointments.map((item) => {
            const contact = antenatalContacts.find((entry) => entry.week === item.week);
            const isPast = item.date < toISODate(new Date());
            return (
              <li key={item.id} className={`list-item${item.done ? ' done' : ''}`}>
                <span className="bullet">
                  <Icon name={item.done ? 'check' : 'calendar'} size={13} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700 }}>
                    {t('anc.contactN', { n: item.week })} · {formatDate(item.date, lang)}
                    {item.week === currentWeek && (
                      <span className="chip rose" style={{ marginInlineStart: 8 }}>
                        {t('tracker.current')}
                      </span>
                    )}
                    {!item.done && isPast && (
                      <span className="chip warn" style={{ marginInlineStart: 8 }}>
                        {t('anc.pending')}
                      </span>
                    )}
                  </div>
                  {contact && <div className="tiny muted">{pick(contact.focus)}</div>}
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => toggleAppointment(item.id)}
                >
                  {item.done ? t('anc.undo') : t('anc.markDone')}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="alert" style={{ marginBlockStart: 12 }}>
          <span className="alert-icon">
            <Icon name="clock" size={17} />
          </span>
          <div>
            <div className="alert-title">{t('anc.reminder')}</div>
            {t('anc.reminderNote')}
            <div style={{ marginBlockStart: 8 }}>
              <button type="button" className="btn btn-sm" onClick={enableReminder}>
                <Icon name="clock" size={15} />
                {reminder === 'on' ? t('anc.reminderOn') : t('anc.enableReminder')}
              </button>
              {reminder === 'denied' && (
                <span className="tiny muted" style={{ marginInlineStart: 8 }}>
                  {t('anc.reminderDenied')}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="split" style={{ marginBlockStart: 16 }}>
        <Card title={t('anc.bp')} icon="activity">
          <form onSubmit={submitBP} className="form-grid">
            <div className="field">
              <label htmlFor="sys">{t('anc.systolic')}</label>
              <input
                id="sys"
                type="number"
                inputMode="numeric"
                min={60}
                max={260}
                value={systolic}
                onChange={(event) => setSystolic(event.target.value)}
                placeholder="120"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="dia">{t('anc.diastolic')}</label>
              <input
                id="dia"
                type="number"
                inputMode="numeric"
                min={30}
                max={160}
                value={diastolic}
                onChange={(event) => setDiastolic(event.target.value)}
                placeholder="80"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="pulse">{t('anc.pulse')}</label>
              <input
                id="pulse"
                type="number"
                inputMode="numeric"
                min={30}
                max={200}
                value={pulse}
                onChange={(event) => setPulse(event.target.value)}
                placeholder="76"
              />
            </div>
            <div className="field span-2">
              <label htmlFor="bpnote">{t('common.notes')}</label>
              <input
                id="bpnote"
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={t('common.optional')}
              />
            </div>
            {bpError && (
              <p className="form-error span-2" role="alert">
                {bpError}
              </p>
            )}
            <div className="span-2">
              <button type="submit" className="btn">
                <Icon name="plus" size={16} />
                {t('anc.addBP')}
              </button>
            </div>
          </form>

          <p className="tiny muted" style={{ marginBlock: 12 }}>
            {t('anc.bpNote')}
          </p>

          {data.bp.length === 0 ? (
            <Empty text={t('anc.emptyBP')} />
          ) : (
            <ul className="stack-list">
              {data.bp.slice(0, 8).map((reading) => {
                const category = bpCategory(reading.systolic, reading.diastolic);
                return (
                  <li key={reading.id} className="list-item">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700 }}>
                        {reading.systolic}/{reading.diastolic} mmHg
                        <span
                          className={`chip ${
                            category === 'normal'
                              ? 'ok'
                              : category === 'elevated'
                                ? 'warn'
                                : 'danger'
                          }`}
                          style={{ marginInlineStart: 8 }}
                        >
                          {t(bpLabelKey[category])}
                        </span>
                      </div>
                      <div className="tiny muted">{formatDateTime(reading.date, lang)}</div>
                      {reading.note && <div className="tiny muted">{reading.note}</div>}
                    </div>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => removeBP(reading.id)}
                      aria-label={t('common.delete')}
                    >
                      <Icon name="trash" size={15} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card title={t('anc.weight')} icon="scale">
          <form onSubmit={submitWeight} className="form-grid">
            <div className="field span-2">
              <label htmlFor="kg">{t('anc.addWeight')}</label>
              <input
                id="kg"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={30}
                max={250}
                value={weightKg}
                onChange={(event) => setWeightKg(event.target.value)}
                placeholder="68.5"
                required
              />
            </div>
            {weightError && (
              <p className="form-error span-2" role="alert">
                {weightError}
              </p>
            )}
            <div className="span-2">
              <button type="submit" className="btn">
                <Icon name="plus" size={16} />
                {t('common.add')}
              </button>
            </div>
          </form>

          {guidance ? (
            <div className="alert" style={{ marginBlockStart: 12 }}>
              <span className="alert-icon">
                <Icon name="info" size={17} />
              </span>
              <div>
                <div className="alert-title">
                  {t('anc.bmi')}: {guidance.bmi.toFixed(1)}
                </div>
                {t('anc.recommendedGain')}: {guidance.minGainKg}–{guidance.maxGainKg} {t('common.kg')}
                {gain !== null && (
                  <div style={{ marginBlockStart: 4, fontWeight: 700 }}>
                    {t('anc.gain')}: {gain >= 0 ? '+' : ''}
                    {gain.toFixed(1)} {t('common.kg')}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="tiny muted" style={{ marginBlockStart: 12 }}>
              {t('anc.weightNote')}
            </p>
          )}

          {data.weight.length === 0 ? (
            <Empty text={t('anc.emptyWeight')} />
          ) : (
            <ul className="stack-list" style={{ marginBlockStart: 12 }}>
              {data.weight.slice(0, 8).map((entry) => (
                <li key={entry.id} className="list-item">
                  <span className="bullet">
                    <Icon name="scale" size={13} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <strong>
                      {entry.kg} {t('common.kg')}
                    </strong>
                    <div className="tiny muted">{formatDate(entry.date, lang)}</div>
                  </div>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => removeWeight(entry.id)}
                    aria-label={t('common.delete')}
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card title={t('anc.tests')} icon="stethoscope">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>{t('anc.tests')}</th>
                <th>{t('anc.testWhen')}</th>
                <th>{t('anc.testWhy')}</th>
              </tr>
            </thead>
            <tbody>
              {labTests.map((test) => (
                <tr key={test.id}>
                  <td style={{ fontWeight: 700 }}>{pick(test.name)}</td>
                  <td className="small muted">{pick(test.timing)}</td>
                  <td className="small muted">{pick(test.purpose)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="check-list" style={{ marginBlockStart: 14 }}>
          {routineChecks.map((check, index) => (
            <li key={index}>
              <Icon name="check" size={15} />
              <span>{pick(check)}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('anc.visits')} icon="book">
        <form onSubmit={submitVisit} className="form-grid">
          <div className="field">
            <label htmlFor="vdate">{t('common.date')}</label>
            <input
              id="vdate"
              type="date"
              value={visitDate}
              onChange={(event) => setVisitDate(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="vprovider">{t('anc.provider')}</label>
            <input
              id="vprovider"
              type="text"
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
              placeholder={lang === 'ar' ? 'د. سارة' : 'Dr. Sara'}
              required
            />
          </div>
          <div className="field span-2">
            <label htmlFor="vreason">{t('anc.reason')}</label>
            <input
              id="vreason"
              type="text"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              required
            />
          </div>
          <div className="field span-2">
            <label htmlFor="vnotes">{t('common.notes')}</label>
            <input
              id="vnotes"
              type="text"
              value={visitNotes}
              onChange={(event) => setVisitNotes(event.target.value)}
              placeholder={t('common.optional')}
            />
          </div>
          {visitError && (
            <p className="form-error span-2" role="alert">
              {visitError}
            </p>
          )}
          <div className="span-2">
            <button type="submit" className="btn">
              <Icon name="plus" size={16} />
              {t('anc.addVisit')}
            </button>
          </div>
        </form>

        {data.visits.length === 0 ? (
          <Empty text={t('anc.emptyVisits')} />
        ) : (
          <ul className="stack-list" style={{ marginBlockStart: 12 }}>
            {data.visits.map((visit) => (
              <li key={visit.id} className="list-item">
                <span className="bullet">
                  <Icon name="stethoscope" size={13} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700 }}>
                    {visit.provider} · {formatDate(visit.date, lang)}
                  </div>
                  <div className="tiny muted">{visit.reason}</div>
                  <div className="tiny muted">
                    {visit.bp && `BP ${visit.bp}`}
                    {visit.weightKg ? ` · ${visit.weightKg} ${t('common.kg')}` : ''}
                  </div>
                  {visit.notes && <div className="tiny muted">{visit.notes}</div>}
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => removeVisit(visit.id)}
                  aria-label={t('common.delete')}
                >
                  <Icon name="trash" size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
