import { useState } from 'react';
import { useLang } from '../i18n';
import { dangerSigns, emergencyNote, emergencySteps } from '../data/dangerSigns';
import { Card, Disclaimer } from '../components/ui';
import { Icon } from '../components/Icon';

export function DangerSigns() {
  const { t, pick, lang } = useLang();
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('danger.title')}</h1>
          <p className="page-sub">{t('danger.subtitle')}</p>
        </div>
      </header>

      <section className="emergency-banner emergency-strong" role="alert">
        <Icon name="alert" size={30} />
        <div style={{ minWidth: 0 }}>
          <h3>{t('danger.emergency')}</h3>
          <p>{t('danger.emergencyText')}</p>
          <p className="tiny" style={{ marginBlockStart: 6, opacity: 0.95 }}>
            {pick(emergencyNote)}
          </p>
        </div>
        <button type="button" className="btn btn-emergency" onClick={() => setShowSteps((value) => !value)}>
          <Icon name="phone" size={17} />
          {showSteps ? t('common.close') : t('danger.callNow')}
        </button>
      </section>

      {showSteps && (
        <Card title={t('danger.when')} icon="phone" className="danger-card">
          <ol className="step-list">
            {emergencySteps.map((step, index) => (
              <li key={index}>
                <span className="step-num">{index + 1}</span>
                <span>{pick(step)}</span>
              </li>
            ))}
          </ol>
          <p className="tiny muted" style={{ marginBlockStart: 10 }}>
            {lang === 'ar'
              ? 'احتفظي برقم الطوارئ ورقم قسم الولادة في هاتفك وجهّزي وسيلة انتقال مسبقاً.'
              : 'Save your local emergency number and maternity unit number in your phone, and plan transport in advance.'}
          </p>
        </Card>
      )}

      <div className="danger-grid" style={{ marginBlockStart: 16 }}>
        {dangerSigns.map((sign) => (
          <article key={sign.id} className="danger-item">
            <span className="danger-icon">
              <Icon name={sign.icon} size={22} />
            </span>
            <div>
              <h3>{pick(sign.title)}</h3>
              <p className="small">{pick(sign.detail)}</p>
              <p className="tiny muted" style={{ marginBlockStart: 6 }}>
                <strong>{t('danger.why')}:</strong> {pick(sign.why)}
              </p>
              <p className="tiny" style={{ marginBlockStart: 6, color: 'var(--danger)' }}>
                <strong>{t('danger.action')}:</strong> {pick(sign.action)}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Card title={t('danger.when')} icon="hospital">
        <ul className="check-list">
          <li>
            <Icon name="alert" size={15} />
            <span>
              {lang === 'ar'
                ? 'أي علامة من العلامات أعلاه تعني ضرورة التقييم الطبي الفوري في مستشفى أو مركز ولادة، ولا تنتظري الزيارة القادمة.'
                : 'Any of the signs above means immediate assessment at a hospital or maternity unit — do not wait for your next appointment.'}
            </span>
          </li>
          <li>
            <Icon name="alert" size={15} />
            <span>
              {lang === 'ar'
                ? 'إذا تكرر ارتفاع ضغط الدم أو ظهر صداع شديد أو زغللة في العينين، فقد يكون ذلك علامة على تسمم الحمل ويحتاج تقييماً عاجلاً.'
                : 'Repeated high blood pressure with severe headache or visual disturbance may indicate pre-eclampsia and needs urgent assessment.'}
            </span>
          </li>
          <li>
            <Icon name="alert" size={15} />
            <span>
              {lang === 'ar'
                ? 'قلّة حركة الجنين أو تغيّر نمطها المعتاد سبب كافٍ للاتصال بمركز الرعاية في نفس اليوم.'
                : 'Reduced or changed fetal movement is reason enough to contact your maternity unit the same day.'
            </span>
          </li>
        </ul>
        <p className="tiny muted" style={{ marginBlockStart: 10 }}>
          {t('danger.note')}
        </p>
      </Card>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
