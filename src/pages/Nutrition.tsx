import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import {
  GLASS_ML,
  WATER_GOAL_GLASSES,
  foodsToAvoid,
  mealIdeas,
  nutrients,
  plateGroups,
} from '../data/nutrition';
import { toISODate } from '../lib/pregnancy';
import { Card, Disclaimer, ProgressBar } from '../components/ui';
import { Icon } from '../components/Icon';

export function Nutrition() {
  const { t, pick } = useLang();
  const { data, setWater } = useAppState();
  const today = toISODate(new Date());
  const glasses = data.water[today] ?? 0;
  const percent = Math.min(100, (glasses / WATER_GOAL_GLASSES) * 100);

  const changeWater = (delta: number) => {
    const next = Math.min(Math.max(glasses + delta, 0), 20);
    setWater(today, next);
  };

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('nutrition.title')}</h1>
          <p className="page-sub">{t('nutrition.subtitle')}</p>
        </div>
      </header>

      <Card title={t('nutrition.hydration')} icon="drop">
        <div className="split" style={{ alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--lav-600)' }}>
              {glasses} / {WATER_GOAL_GLASSES} {t('nutrition.glasses')}
            </div>
            <p className="small muted" style={{ marginBlock: 6 }}>
              {glasses * GLASS_ML} ml · {t('nutrition.goal')}
            </p>
            <ProgressBar percent={percent} tone="lav" />
            <div style={{ display: 'flex', gap: 8, marginBlockStart: 12, flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-sm" onClick={() => changeWater(1)}>
                <Icon name="plus" size={15} />
                {t('nutrition.addGlass')}
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => changeWater(-1)}
                disabled={glasses === 0}
              >
                {t('nutrition.removeGlass')}
              </button>
            </div>
          </div>
          <div className="glass-grid" aria-hidden="true">
            {Array.from({ length: WATER_GOAL_GLASSES }).map((_, index) => (
              <span key={index} className={`glass${index < glasses ? ' filled' : ''}`}>
                <Icon name="drop" size={14} />
              </span>
            ))}
          </div>
        </div>
        <p className="tiny muted" style={{ marginBlockStart: 10 }}>
          {t('nutrition.hydrationNote')}
        </p>
      </Card>

      <Card title={t('nutrition.nutrients')} icon="apple">
        <div className="grid grid-2">
          {nutrients.map((nutrient) => (
            <article key={nutrient.id} className="info-card">
              <h3>{pick(nutrient.name)}</h3>
              <p className="small">{pick(nutrient.why)}</p>
              <p className="tiny" style={{ marginBlockStart: 6 }}>
                <strong>{t('nutrition.amount')}:</strong> {pick(nutrient.amount)}
              </p>
              <p className="tiny muted">
                <strong>{t('nutrition.sources')}:</strong> {pick(nutrient.sources)}
              </p>
            </article>
          ))}
        </div>
      </Card>

      <Card title={t('nutrition.plate')} icon="book">
        <div className="plate-grid">
          {plateGroups.map((group) => (
            <div key={group.id} className="plate-item">
              <div className="plate-portion">{pick(group.portion)}</div>
              <div style={{ fontWeight: 700 }}>{pick(group.name)}</div>
              <div className="tiny muted">{pick(group.examples)}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-2" style={{ marginBlockStart: 16 }}>
          {mealIdeas.map((meal) => (
            <div key={meal.id} className="info-card">
              <h3>{pick(meal.label)}</h3>
              <ul className="check-list">
                {meal.items.map((item, index) => (
                  <li key={index}>
                    <Icon name="check" size={14} />
                    <span className="small">{pick(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card title={t('nutrition.avoid')} icon="alert">
        <ul className="stack-list">
          {foodsToAvoid.map((food) => (
            <li key={food.id} className="list-item danger">
              <span className="bullet">
                <Icon name="alert" size={13} />
              </span>
              <div>
                <div style={{ fontWeight: 700 }}>{pick(food.name)}</div>
                <div className="tiny muted">{pick(food.reason)}</div>
              </div>
            </li>
          ))}
        </ul>
        <p className="tiny muted" style={{ marginBlockStart: 10 }}>
          {t('nutrition.avoidNote')}
        </p>
      </Card>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
