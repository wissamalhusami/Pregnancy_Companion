import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import {
  bagCategories,
  bagItems,
  breathingTechniques,
  laborSigns,
  laborStages,
  laborTip,
} from '../data/labor';
import { Card, Disclaimer, ProgressBar } from '../components/ui';
import { Icon } from '../components/Icon';

type Phase = 'inhale' | 'hold' | 'exhale';

export function Labor() {
  const { t, pick } = useLang();
  const { data, toggleBagItem, setBirthPlan } = useAppState();

  const [techId, setTechId] = useState(breathingTechniques[0]?.id ?? '');
  const technique =
    breathingTechniques.find((item) => item.id === techId) ?? breathingTechniques[0];

  const [breathing, setBreathing] = useState(false);
  const [tick, setTick] = useState(0);

  const [plan, setPlan] = useState(data.birthPlan);
  const [planSaved, setPlanSaved] = useState(false);

  const cycle = technique ? technique.inhale + technique.hold + technique.exhale : 8;

  useEffect(() => {
    if (!breathing) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [breathing]);

  const phase: Phase = useMemo(() => {
    if (!technique) return 'inhale';
    const position = tick % cycle;
    if (position < technique.inhale) return 'inhale';
    if (position < technique.inhale + technique.hold) return 'hold';
    return 'exhale';
  }, [tick, cycle, technique]);

  const remaining = useMemo(() => {
    if (!technique) return 0;
    const position = tick % cycle;
    if (position < technique.inhale) return technique.inhale - position;
    if (position < technique.inhale + technique.hold)
      return technique.inhale + technique.hold - position;
    return cycle - position;
  }, [tick, cycle, technique]);

  const round = Math.floor(tick / cycle) + (breathing ? 1 : 0);

  const checkedCount = bagItems.filter((item) => data.bag[item.id]).length;
  const bagPercent = (checkedCount / bagItems.length) * 100;

  const savePlan = (event: React.FormEvent) => {
    event.preventDefault();
    setBirthPlan(plan);
    setPlanSaved(true);
    window.setTimeout(() => setPlanSaved(false), 3000);
  };

  const phaseLabel =
    phase === 'inhale' ? t('labor.inhale') : phase === 'hold' ? t('labor.hold') : t('labor.exhale');

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('labor.title')}</h1>
          <p className="page-sub">{t('labor.subtitle')}</p>
        </div>
      </header>

      <Card title={t('labor.signs')} icon="clock">
        <div className="grid grid-2">
          {laborSigns.map((sign) => (
            <article key={sign.id} className="info-card">
              <h3>{pick(sign.title)}</h3>
              <p className="small muted">{pick(sign.detail)}</p>
            </article>
          ))}
        </div>
        <div className="alert alert-warn" style={{ marginBlockStart: 12 }}>
          <span className="alert-icon">
            <Icon name="alert" size={17} />
          </span>
          <div>{pick(laborTip)}</div>
        </div>
      </Card>

      <Card title={t('labor.stages')} icon="heart">
        <ol className="timeline">
          {laborStages.map((stage) => (
            <li key={stage.number}>
              <span className="timeline-dot">{stage.number}</span>
              <div>
                <div className="timeline-when">
                  {pick(stage.name)} · <span className="muted">{pick(stage.duration)}</span>
                </div>
                <p className="small">{pick(stage.what)}</p>
                <p className="tiny muted">
                  <strong>{t('labor.stage')}:</strong> {pick(stage.role)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <div className="split" style={{ marginBlockStart: 16 }}>
        <Card
          title={t('labor.bag')}
          icon="bag"
          action={<span className="chip">{`${checkedCount}/${bagItems.length}`}</span>}
        >
          <ProgressBar percent={bagPercent} />
          <p className="tiny muted" style={{ marginBlock: 10 }}>
            {t('labor.bagNote')}
          </p>
          {bagCategories.map((category) => {
            const items = bagItems.filter((item) => item.category === category.id);
            return (
              <div key={category.id} style={{ marginBlockEnd: 12 }}>
                <h4 style={{ fontSize: '0.9rem', marginBlockEnd: 6, color: 'var(--lav-600)' }}>
                  {pick(category.name)}
                </h4>
                <ul className="check-list">
                  {items.map((item) => (
                    <li key={item.id}>
                      <label className="check-row">
                        <input
                          type="checkbox"
                          checked={Boolean(data.bag[item.id])}
                          onChange={() => toggleBagItem(item.id)}
                        />
                        <span>{pick(item.name)}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Card>

        <Card title={t('labor.breathing')} icon="activity">
          <div className="breath-box">
            <div className={`breath-circle ${breathing ? phase : ''}`} aria-live="polite">
              <span className="breath-phase">{breathing ? phaseLabel : t('labor.breathing')}</span>
              <span className="breath-count">{breathing ? remaining : technique?.inhale ?? 4}</span>
            </div>

            <div className="field" style={{ marginBlockStart: 12, width: '100%' }}>
              <label htmlFor="tech">{t('labor.breathing')}</label>
              <select
                id="tech"
                value={techId}
                onChange={(event) => {
                  setTechId(event.target.value);
                  setTick(0);
                  setBreathing(false);
                }}
              >
                {breathingTechniques.map((item) => (
                  <option key={item.id} value={item.id}>
                    {pick(item.name)}
                  </option>
                ))}
              </select>
            </div>

            <p className="tiny muted" style={{ marginBlock: 8, textAlign: 'center' }}>
              {technique ? pick(technique.instruction) : ''}
            </p>

            <div className="row-actions" style={{ justifyContent: 'center' }}>
              {breathing ? (
                <button type="button" className="btn btn-ghost" onClick={() => setBreathing(false)}>
                  <Icon name="stop" size={16} />
                  {t('labor.stopBreath')}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setTick(0);
                    setBreathing(true);
                  }}
                >
                  <Icon name="play" size={16} />
                  {t('labor.startBreath')}
                </button>
              )}
            </div>

            <p className="tiny muted" style={{ textAlign: 'center', marginBlockStart: 8 }}>
              {t('labor.round')}: {breathing ? round : 0} · {t('labor.inhale')} {technique?.inhale ?? 4}s ·{' '}
              {t('labor.hold')} {technique?.hold ?? 0}s · {t('labor.exhale')} {technique?.exhale ?? 6}s
            </p>
          </div>
          <p className="tiny muted" style={{ marginBlockStart: 10 }}>
            {t('labor.breathNote')}
          </p>
        </Card>
      </div>

      <Card title={t('labor.birthPlan')} icon="book">
        <form onSubmit={savePlan} className="form-grid">
          <div className="field">
            <label htmlFor="place">{t('labor.birthPlace')}</label>
            <input
              id="place"
              type="text"
              value={plan.birthPlace}
              onChange={(event) => setPlan({ ...plan, birthPlace: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="support">{t('labor.support')}</label>
            <input
              id="support"
              type="text"
              value={plan.supportPerson}
              onChange={(event) => setPlan({ ...plan, supportPerson: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="pain">{t('labor.pain')}</label>
            <input
              id="pain"
              type="text"
              value={plan.painRelief}
              onChange={(event) => setPlan({ ...plan, painRelief: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="positions">{t('labor.positions')}</label>
            <input
              id="positions"
              type="text"
              value={plan.positions}
              onChange={(event) => setPlan({ ...plan, positions: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="feeding">{t('labor.feeding')}</label>
            <input
              id="feeding"
              type="text"
              value={plan.feedingPlan}
              onChange={(event) => setPlan({ ...plan, feedingPlan: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="requests">{t('labor.requests')}</label>
            <input
              id="requests"
              type="text"
              value={plan.specialRequests}
              onChange={(event) => setPlan({ ...plan, specialRequests: event.target.value })}
            />
          </div>
          <div className="field span-2">
            <label className="check-row">
              <input
                type="checkbox"
                checked={plan.skinToSkin}
                onChange={(event) => setPlan({ ...plan, skinToSkin: event.target.checked })}
              />
              <span>{t('labor.skinToSkin')}</span>
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={plan.cordClamping}
                onChange={(event) => setPlan({ ...plan, cordClamping: event.target.checked })}
              />
              <span>{t('labor.cord')}</span>
            </label>
          </div>
          <div className="span-2 row-actions">
            <button type="submit" className="btn">
              <Icon name="check" size={16} />
              {t('labor.savePlan')}
            </button>
            {planSaved && (
              <span className="chip ok" role="status">
                {t('labor.savedPlan')}
              </span>
            )}
          </div>
        </form>
      </Card>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
