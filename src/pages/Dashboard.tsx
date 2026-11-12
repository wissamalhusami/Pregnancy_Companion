import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import { weeks } from '../data/weeks';
import { formatDate, trimesterOf, bpCategory } from '../lib/pregnancy';
import { Card, ProgressBar, ProgressRing, Stat } from '../components/ui';
import { Icon, type IconName } from '../components/Icon';
import { GLASS_ML } from '../data/nutrition';
import { toISODate } from '../lib/pregnancy';

const quickLinks: { to: string; key: string; icon: IconName; danger?: boolean }[] = [
  { to: '/tracker', key: 'nav.tracker', icon: 'calendar' },
  { to: '/antenatal', key: 'nav.anc', icon: 'stethoscope' },
  { to: '/nutrition', key: 'nav.nutrition', icon: 'apple' },
  { to: '/danger-signs', key: 'nav.danger', icon: 'alert', danger: true },
  { to: '/movement', key: 'nav.movement', icon: 'movement' },
  { to: '/labor', key: 'nav.labor', icon: 'bag' },
  { to: '/breastfeeding', key: 'nav.breastfeeding', icon: 'breastfeeding' },
  { to: '/postpartum', key: 'nav.postpartum', icon: 'heart' },
];

export function Dashboard() {
  const { t, pick, lang } = useLang();
  const { data, ga, eddISO, currentWeek, progress, daysLeft } = useAppState();

  const weekInfo = weeks.find((item) => item.week === currentWeek) ?? weeks[0];
  const trimester = trimesterOf(currentWeek);
  const latestBP = data.bp[0];
  const latestWeight = data.weight[0];
  const todayGlasses = data.water[toISODate(new Date())] ?? 0;
  const latestMovement = data.movements[0];
  const nextAppointment = [...data.appointments]
    .filter((item) => !item.done)
    .sort((a, b) => (a.date < b.date ? -1 : 1))[0];
  const displayName = data.profile.name.trim();
  const hasDates = Boolean(ga && eddISO);

  return (
    <div>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="hero-badge">
              <Icon name="sparkles" size={15} />
              {t('app.project')}
            </span>
            <h1>
              {displayName
                ? t('dashboard.helloNamed', { name: displayName })
                : t('dashboard.hello')}
            </h1>
            <p>{t('dashboard.subtitle')}</p>

            {hasDates ? (
              <>
                <div className="chip-row" style={{ marginBlockStart: 14 }}>
                  <span className="chip rose">
                    <Icon name="calendar" size={14} />
                    {t('dashboard.weekFormat', {
                      week: currentWeek,
                      days: ga ? ga.days : 0,
                    })}
                  </span>
                  <span className="chip">
                    <Icon name="sparkles" size={14} />
                    {t('dashboard.trimester', { n: trimester })}
                  </span>
                  <span className="chip ok">
                    <Icon name="heart" size={14} />
                    {t('dashboard.edd')}: {formatDate(eddISO as string, lang)}
                  </span>
                </div>
                <div style={{ marginBlockStart: 16, maxWidth: 420 }}>
                  <ProgressBar percent={progress} />
                  <p className="tiny muted" style={{ marginBlockStart: 6 }}>
                    {t('dashboard.progress')} · {Math.round(progress)}% ·{' '}
                    {t('dashboard.daysLeft', { days: Math.max(0, daysLeft) })}
                  </p>
                </div>
              </>
            ) : (
              <div style={{ marginBlockStart: 16 }}>
                <Link className="btn" to="/setup">
                  <Icon name="plus" size={17} />
                  {t('dashboard.setupCta')}
                </Link>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', placeItems: 'center', gap: 10 }}>
            <ProgressRing
              percent={hasDates ? progress : 0}
              label={t('dashboard.progress')}
              caption={hasDates ? `${currentWeek}/40` : '—'}
            />
            <span className="tiny muted" style={{ textAlign: 'center' }}>
              {hasDates ? t('dashboard.weekNow') : t('dashboard.lmpMissing')}
            </span>
          </div>
        </div>
      </section>

      {!hasDates && (
        <div className="alert alert-warn" style={{ marginBlockStart: 16 }} role="status">
          <span className="alert-icon">
            <Icon name="info" size={17} />
          </span>
          <div>
            <div className="alert-title">{t('dashboard.lmpMissing')}</div>
            <Link className="section-link" to="/setup">
              {t('dashboard.setupCta')} <Icon name={lang === 'ar' ? 'chevronLeft' : 'chevronRight'} size={14} />
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-4" style={{ marginBlockStart: 16 }}>
        <Stat
          icon="calendar"
          label={t('dashboard.weekNow')}
          value={hasDates ? `${currentWeek}` : '—'}
          hint={hasDates ? t('dashboard.gestAge', { weeks: currentWeek, days: ga?.days ?? 0 }) : t('dashboard.lmpMissing')}
          tone="rose"
        />
        <Stat
          icon="heart"
          label={t('dashboard.edd')}
          value={hasDates ? formatDate(eddISO as string, lang) : '—'}
          hint={t('tracker.method')}
        />
        <Stat
          icon="sparkles"
          label={t('dashboard.trimester')}
          value={hasDates ? `${trimester}` : '—'}
          hint={hasDates ? t('dashboard.progress') : undefined}
          tone="lav"
        />
        <Stat
          icon="clock"
          label={t('dashboard.daysLeft')}
          value={hasDates ? Math.max(0, daysLeft) : '—'}
          hint={hasDates ? t('dashboard.progress') : undefined}
        />
      </div>

      <div className="grid grid-2" style={{ marginBlockStart: 16 }}>
        <Card title={t('dashboard.quick')} icon="sparkles">
          <div className="quick-grid">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`quick-tile${link.danger ? ' danger' : ''}`}>
                <span className="qi">
                  <Icon name={link.icon} size={18} />
                </span>
                {t(link.key)}
              </Link>
            ))}
          </div>
        </Card>

        <div style={{ display: 'grid', gap: 16 }}>
          <Card title={t('dashboard.nextAppt')} icon="calendar">
            {nextAppointment ? (
              <div>
                <p style={{ fontWeight: 700, color: 'var(--rose-700)' }}>
                  {t('anc.weekOf', { week: nextAppointment.week })}
                </p>
                <p className="muted small">
                  {formatDate(nextAppointment.date, lang)} · {t('anc.contactN', { n: nextAppointment.week })}
                </p>
                {data.profile.clinic && (
                  <p className="tiny muted" style={{ marginBlockStart: 4 }}>
                    {data.profile.clinic}
                  </p>
                )}
                <Link className="section-link" to="/antenatal" style={{ marginBlockStart: 10, display: 'inline-flex' }}>
                  {t('nav.anc')} <Icon name={lang === 'ar' ? 'chevronLeft' : 'chevronRight'} size={14} />
                </Link>
              </div>
            ) : (
              <p className="muted small">{t('dashboard.noAppt')}</p>
            )}
          </Card>

          <Card title={t('dashboard.trackers')} icon="activity">
            <div className="grid" style={{ gap: 10 }}>
              <div className="list-item rose">
                <span className="bullet">
                  <Icon name="activity" size={13} />
                </span>
                <span>
                  <strong>{t('dashboard.latestBP')}:</strong>{' '}
                  {latestBP
                    ? `${latestBP.systolic}/${latestBP.diastolic} mmHg`
                    : t('dashboard.notRecorded')}
                  {latestBP && (
                    <span className={`chip ${bpCategory(latestBP.systolic, latestBP.diastolic) === 'normal' ? 'ok' : 'warn'}`} style={{ marginInlineStart: 8 }}>
                      {t(`anc.bp${bpCategory(latestBP.systolic, latestBP.diastolic) === 'normal' ? 'Normal' : bpCategory(latestBP.systolic, latestBP.diastolic) === 'elevated' ? 'Elevated' : bpCategory(latestBP.systolic, latestBP.diastolic) === 'crisis' ? 'Crisis' : 'High'}`)}
                    </span>
                  )}
                </span>
              </div>
              <div className="list-item lav">
                <span className="bullet">
                  <Icon name="scale" size={13} />
                </span>
                <span>
                  <strong>{t('dashboard.latestWeight')}:</strong>{' '}
                  {latestWeight ? `${latestWeight.kg} ${t('common.kg')}` : t('dashboard.notRecorded')}
                </span>
              </div>
              <div className="list-item">
                <span className="bullet">
                  <Icon name="drop" size={13} />
                </span>
                <span>
                  <strong>{t('dashboard.water')}:</strong> {todayGlasses} {t('dashboard.glassUnit')} ·{' '}
                  {todayGlasses * GLASS_ML} ml
                </span>
              </div>
              <div className="list-item">
                <span className="bullet">
                  <Icon name="movement" size={13} />
                </span>
                <span>
                  <strong>{t('dashboard.movements')}:</strong>{' '}
                  {latestMovement
                    ? `${latestMovement.count} ${t('dashboard.movementUnit')}`
                    : t('dashboard.notRecorded')}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {hasDates && weekInfo && (
        <Card
          title={t('dashboard.tip')}
          icon="book"
          className=""
          action={
            <Link className="section-link" to="/tracker">
              {t('common.learnMore')} <Icon name={lang === 'ar' ? 'chevronLeft' : 'chevronRight'} size={14} />
            </Link>
          }
        >
          <p style={{ fontWeight: 600, color: 'var(--lav-600)', marginBlockEnd: 6 }}>
            {t('tracker.weekN', { week: weekInfo.week })} — {pick(weekInfo.tip)}
          </p>
          <p className="small muted">{pick(weekInfo.fetal)}</p>
        </Card>
      )}

      <section className="emergency-banner" style={{ marginBlockStart: 18 }}>
        <Icon name="alert" size={26} />
        <div style={{ minWidth: 0 }}>
          <h3>{t('dashboard.emergencyTitle')}</h3>
          <p>{t('dashboard.emergencyText')}</p>
        </div>
        <Link className="btn" to="/danger-signs">
          {t('dashboard.emergencyCta')}
        </Link>
      </section>
    </div>
  );
}
