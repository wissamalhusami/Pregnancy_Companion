import { useLang } from '../i18n';
import {
  breastfeedingSupport,
  newbornCare,
  postpartumCheckup,
  postpartumDanger,
  recoveryTimeline,
} from '../data/postpartum';
import { Card, Disclaimer } from '../components/ui';
import { Icon } from '../components/Icon';

export function Postpartum() {
  const { t, pick, lang } = useLang();

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('pp.title')}</h1>
          <p className="page-sub">{t('pp.subtitle')}</p>
        </div>
      </header>

      <Card title={t('pp.recovery')} icon="heart">
        <ol className="timeline">
          {recoveryTimeline.map((stage) => (
            <li key={stage.id}>
              <span className="timeline-dot" />
              <div>
                <div className="timeline-when">{pick(stage.when)}</div>
                <p className="small">{pick(stage.what)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card title={t('pp.danger')} icon="alert" className="danger-card">
        <ul className="stack-list">
          {postpartumDanger.map((sign) => (
            <li key={sign.id} className="list-item danger">
              <span className="bullet">
                <Icon name="alert" size={13} />
              </span>
              <div>
                <div style={{ fontWeight: 700 }}>{pick(sign.title)}</div>
                <div className="tiny muted">{pick(sign.detail)}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="alert alert-danger" style={{ marginBlockStart: 12 }}>
          <span className="alert-icon">
            <Icon name="phone" size={17} />
          </span>
          <div>
            {lang === 'ar'
              ? 'عند وجود أي من هذه العلامات بعد الولادة، اطلبي المساعدة الطبية العاجلة فوراً ولا تنتظري.'
              : 'If any of these signs appear after birth, seek urgent medical help immediately — do not wait.'}
          </div>
        </div>
      </Card>

      <div className="split" style={{ marginBlockStart: 16 }}>
        <Card title={t('pp.support')} icon="breastfeeding">
          <ul className="check-list">
            {breastfeedingSupport.map((item, index) => (
              <li key={index}>
                <Icon name="check" size={15} />
                <span>{pick(item)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={t('pp.newborn')} icon="baby">
          <ul className="check-list">
            {newbornCare.map((item, index) => (
              <li key={index}>
                <Icon name="baby" size={15} />
                <span>{pick(item)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title={t('pp.checkup')} icon="stethoscope">
        <p>{pick(postpartumCheckup)}</p>
        <p className="tiny muted" style={{ marginBlockStart: 8 }}>
          {t('pp.when')}
        </p>
      </Card>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
