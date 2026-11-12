import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import { weeks } from '../data/weeks';
import { clampWeek, formatDate, trimesterOf } from '../lib/pregnancy';
import { Card, Disclaimer, Stat } from '../components/ui';
import { Icon } from '../components/Icon';
import { WombIllustration } from '../components/Illustrations';

export function Tracker() {
  const { t, pick, lang, isRTL } = useLang();
  const { currentWeek, eddISO, data } = useAppState();
  const [selected, setSelected] = useState(clampWeek(currentWeek));

  useEffect(() => {
    setSelected(clampWeek(currentWeek));
  }, [currentWeek]);

  const info = weeks.find((item) => item.week === selected) ?? weeks[0];
  const trimester = trimesterOf(selected);
  const isCurrent = selected === currentWeek;

  const move = (delta: number) => setSelected((value) => clampWeek(value + delta));

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('tracker.title')}</h1>
          <p className="page-sub">{t('tracker.subtitle')}</p>
        </div>
      </header>

      <Card>
        <div className="week-nav">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => move(-1)}
            disabled={selected <= 1}
            aria-label={t('tracker.prev')}
          >
            <Icon name={isRTL ? 'chevronRight' : 'chevronLeft'} size={16} />
            {t('tracker.prev')}
          </button>

          <div style={{ textAlign: 'center', flex: 1, minWidth: 130 }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--rose-700)' }}>
              {t('tracker.weekN', { week: selected })}
            </div>
            <div className="tiny muted">
              {t('tracker.trimesterN', { n: trimester })}
              {isCurrent ? ` · ${t('tracker.current')}` : ''}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => move(1)}
            disabled={selected >= 40}
            aria-label={t('tracker.next')}
          >
            {t('tracker.next')}
            <Icon name={isRTL ? 'chevronLeft' : 'chevronRight'} size={16} />
          </button>
        </div>

        <div className="week-strip" role="tablist" aria-label={t('tracker.pick')}>
          {weeks.map((item) => (
            <button
              key={item.week}
              type="button"
              role="tab"
              aria-selected={item.week === selected}
              className={`week-pill${item.week === selected ? ' active' : ''}${
                item.week === currentWeek ? ' current' : ''
              }${item.week < currentWeek ? ' done' : ''}`}
              onClick={() => setSelected(item.week)}
            >
              {item.week}
              <small>{item.week === currentWeek ? t('tracker.current') : `W${item.week}`}</small>
            </button>
          ))}
        </div>
      </Card>

      <div className="split" style={{ marginBlockStart: 16 }}>
        <div>
          <Card title={t('tracker.fetal')} icon="baby">
            <p style={{ marginBlockEnd: 14 }}>{pick(info.fetal)}</p>
            <div className="fact-row">
              <div className="fact">
                <div className="fact-value">{info.lengthCm.toFixed(1)}</div>
                <div className="fact-label">{t('tracker.size')} ({t('common.cm')})</div>
              </div>
              <div className="fact">
                <div className="fact-value">
                  {info.weightG >= 1000 ? (info.weightG / 1000).toFixed(1) : info.weightG}
                </div>
                <div className="fact-label">
                  {t('dashboard.latestWeight').split(':')[0]} ({info.weightG >= 1000 ? t('common.kg') : 'g'})
                </div>
              </div>
              <div className="fact">
                <div className="fact-value">{trimester}</div>
                <div className="fact-label">{t('dashboard.trimester')}</div>
              </div>
            </div>
          </Card>

          <Card title={t('tracker.maternal')} icon="heart">
            <p>{pick(info.maternal)}</p>
            <div className="alert" style={{ marginBlockStart: 14 }}>
              <span className="alert-icon">
                <Icon name="sparkles" size={17} />
              </span>
              <div>
                <div className="alert-title">{t('dashboard.tip')}</div>
                {pick(info.tip)}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card title={t('tracker.illustration')} icon="baby">
            <WombIllustration week={selected} />
          </Card>

          <Card title={t('tracker.method')} icon="info">
            <Stat
              label={t('dashboard.gestAge', { weeks: selected, days: 0 })}
              value={t('tracker.weekN', { week: selected })}
              hint={`${t('dashboard.edd')}: ${eddISO ? formatDate(eddISO, lang) : '—'}`}
              tone="lav"
            />
            <p className="small muted" style={{ marginBlockStart: 12 }}>
              {t('tracker.lmpUsed')}: {data.profile.lmp ? formatDate(data.profile.lmp, lang) : '—'}
            </p>
            <Link className="section-link" to="/setup" style={{ marginBlockStart: 8, display: 'inline-flex' }}>
              {t('dashboard.setupCta')} <Icon name={isRTL ? 'chevronLeft' : 'chevronRight'} size={14} />
            </Link>
          </Card>
        </div>
      </div>

      <Disclaimer>{t('tracker.disclaimer')}</Disclaimer>
    </div>
  );
}
