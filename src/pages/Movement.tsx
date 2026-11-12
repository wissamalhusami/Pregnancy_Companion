import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import {
  movementAlert,
  movementDisclaimer,
  movementHow,
  movementWhen,
  movementWhy,
} from '../data/movement';
import { formatDateTime } from '../lib/pregnancy';
import { Card, Disclaimer, Empty } from '../components/ui';
import { Icon } from '../components/Icon';

export function Movement() {
  const { t, pick, lang } = useLang();
  const { data, addMovement, removeMovement } = useAppState();

  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [saved, setSaved] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      timer.current = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [running]);

  const start = () => {
    setStartedAt(new Date().toISOString());
    setCount(0);
    setElapsed(0);
    setSaved(false);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  const save = () => {
    if (!startedAt) return;
    addMovement({
      startedAt,
      durationMin: Math.max(1, Math.round(elapsed / 60)),
      count,
    });
    setRunning(false);
    setStartedAt(null);
    setCount(0);
    setElapsed(0);
    setSaved(true);
  };

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('movement.title')}</h1>
          <p className="page-sub">{t('movement.subtitle')}</p>
        </div>
      </header>

      <section className="emergency-banner" role="alert">
        <Icon name="alert" size={26} />
        <div style={{ minWidth: 0 }}>
          <h3>{t('movement.alertTitle')}</h3>
          <p>{t('movement.alertText')}</p>
        </div>
        <button type="button" className="btn btn-emergency" onClick={() => setSaved(false)}>
          <Icon name="phone" size={16} />
          {t('danger.callNow')}
        </button>
      </section>

      <div className="split" style={{ marginBlockStart: 16 }}>
        <Card title={t('movement.record')} icon="movement">
          <div className="counter-wrap">
            <div className="counter" aria-live="polite">
              {count}
              <small>{t('movement.count')}</small>
            </div>
            <div className="timer">
              <Icon name="clock" size={16} />
              {minutes}:{seconds}
              <span className="tiny muted" style={{ marginInlineStart: 6 }}>
                {running ? t('movement.running') : t('movement.duration')}
              </span>
            </div>

            <button
              type="button"
              className="btn-tap"
              onClick={() => setCount((value) => value + 1)}
              disabled={!running}
              aria-label={t('movement.tap')}
            >
              <Icon name="movement" size={26} />
              {running ? t('movement.tap') : t('movement.needStart')}
            </button>

            <div className="row-actions">
              {!running ? (
                <button type="button" className="btn" onClick={start}>
                  <Icon name="play" size={16} />
                  {t('movement.start')}
                </button>
              ) : (
                <button type="button" className="btn btn-ghost" onClick={stop}>
                  <Icon name="stop" size={16} />
                  {t('movement.stop')}
                </button>
              )}
              <button
                type="button"
                className="btn btn-lav"
                onClick={save}
                disabled={!startedAt || count === 0}
              >
                <Icon name="check" size={16} />
                {t('movement.save')}
              </button>
            </div>

            {saved && (
              <p className="chip ok" role="status" style={{ marginBlockStart: 12 }}>
                {t('movement.savedMsg')}
              </p>
            )}
            <p className="tiny muted" style={{ marginBlockStart: 10 }}>
              {t('movement.countTarget')}
            </p>
          </div>

          <ul className="check-list" style={{ marginBlockStart: 12 }}>
            {movementHow.map((item, index) => (
              <li key={index}>
                <Icon name="check" size={15} />
                <span>{pick(item)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div style={{ display: 'grid', gap: 16 }}>
          <Card title={t('movement.history')} icon="clock">
            {data.movements.length === 0 ? (
              <Empty text={t('movement.empty')} />
            ) : (
              <ul className="stack-list">
                {data.movements.slice(0, 10).map((session) => (
                  <li key={session.id} className="list-item">
                    <span className="bullet">
                      <Icon name="movement" size={13} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <strong>
                        {session.count} {t('movement.count')}
                      </strong>
                      <div className="tiny muted">
                        {session.durationMin} {t('common.minutes')} ·{' '}
                        {formatDateTime(session.startedAt, lang)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => removeMovement(session.id)}
                      aria-label={t('common.delete')}
                    >
                      <Icon name="trash" size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="tiny muted" style={{ marginBlockStart: 10 }}>
              {pick(movementAlert)}
            </p>
          </Card>

          <Card title={t('movement.when')} icon="info">
            <ul className="check-list">
              {movementWhen.map((item, index) => (
                <li key={index}>
                  <Icon name="clock" size={15} />
                  <span>{pick(item)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card title={t('movement.why')} icon="heart">
        <ul className="check-list">
          {movementWhy.map((item, index) => (
            <li key={index}>
              <Icon name="check" size={15} />
              <span>{pick(item)}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Disclaimer>{pick(movementDisclaimer)}</Disclaimer>
    </div>
  );
}
