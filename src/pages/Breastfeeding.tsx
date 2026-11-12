import { useLang } from '../i18n';
import { bfBenefits, bfPositions, bfProblems, bfWhoNote, latchSigns } from '../data/breastfeeding';
import { Card, Disclaimer } from '../components/ui';
import { Icon } from '../components/Icon';

export function Breastfeeding() {
  const { t, pick } = useLang();

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('bf.title')}</h1>
          <p className="page-sub">{t('bf.subtitle')}</p>
        </div>
      </header>

      <Card title={t('bf.benefits')} icon="breastfeeding">
        <div className="grid grid-2">
          {bfBenefits.map((benefit, index) => (
            <div key={index} className="info-card">
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span className="bullet rose">
                  <Icon name="check" size={13} />
                </span>
                <p className="small" style={{ margin: 0 }}>
                  {pick(benefit)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="split" style={{ marginBlockStart: 16 }}>
        <Card title={t('bf.positions')} icon="baby">
          <div className="grid" style={{ gap: 10 }}>
            {bfPositions.map((position) => (
              <article key={position.id} className="info-card">
                <h3>{pick(position.name)}</h3>
                <p className="small muted">{pick(position.how)}</p>
              </article>
            ))}
          </div>
        </Card>

        <div style={{ display: 'grid', gap: 16 }}>
          <Card title={t('bf.latch')} icon="check">
            <ul className="check-list">
              {latchSigns.map((sign, index) => (
                <li key={index}>
                  <Icon name="check" size={15} />
                  <span>{pick(sign)}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title={t('bf.whoNote')} icon="info">
            <p className="small">{pick(bfWhoNote)}</p>
          </Card>
        </div>
      </div>

      <Card title={t('bf.problems')} icon="alert">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>{t('bf.problem')}</th>
                <th>{t('bf.solution')}</th>
              </tr>
            </thead>
            <tbody>
              {bfProblems.map((problem) => (
                <tr key={problem.id}>
                  <td style={{ fontWeight: 700 }}>{pick(problem.problem)}</td>
                  <td className="small muted">{pick(problem.solution)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
