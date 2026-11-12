import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import { toISODate } from '../lib/pregnancy';
import { Card, Disclaimer } from '../components/ui';
import { Icon } from '../components/Icon';

export function Setup() {
  const { t } = useLang();
  const navigate = useNavigate();
  const { data, updateProfile, loadSampleData } = useAppState();

  const [name, setName] = useState(data.profile.name);
  const [lmp, setLmp] = useState(data.profile.lmp);
  const [weight, setWeight] = useState(
    data.profile.prePregnancyWeightKg ? String(data.profile.prePregnancyWeightKg) : '',
  );
  const [height, setHeight] = useState(data.profile.heightCm ? String(data.profile.heightCm) : '');
  const [clinic, setClinic] = useState(data.profile.clinic);
  const [error, setError] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError(t('setup.errorName'));
      return;
    }
    if (!lmp || lmp > toISODate(new Date())) {
      setError(t('setup.errorLmp'));
      return;
    }
    setError('');
    updateProfile({
      name: name.trim(),
      lmp,
      prePregnancyWeightKg: weight ? Number(weight) : null,
      heightCm: height ? Number(height) : null,
      clinic: clinic.trim(),
    });
    navigate('/');
  };

  const useSample = () => {
    loadSampleData();
    navigate('/');
  };

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('setup.title')}</h1>
          <p className="page-sub">{t('setup.subtitle')}</p>
        </div>
      </header>

      <div className="split">
        <Card title={t('profile.personal')} icon="user">
          <form onSubmit={submit} className="form-grid">
            <div className="field span-2">
              <label htmlFor="name">{t('setup.name')}</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="field span-2">
              <label htmlFor="lmp">{t('setup.lmp')}</label>
              <input
                id="lmp"
                type="date"
                value={lmp}
                max={toISODate(new Date())}
                onChange={(event) => setLmp(event.target.value)}
                required
              />
              <span className="hint">{t('setup.lmpHelp')}</span>
            </div>
            <div className="field">
              <label htmlFor="weight">{t('setup.weight')}</label>
              <input
                id="weight"
                type="number"
                step="0.1"
                min={30}
                max={250}
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="height">{t('setup.height')}</label>
              <input
                id="height"
                type="number"
                min={100}
                max={220}
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
            <div className="field span-2">
              <label htmlFor="clinic">{t('setup.clinic')}</label>
              <input
                id="clinic"
                type="text"
                value={clinic}
                onChange={(event) => setClinic(event.target.value)}
                placeholder={t('common.optional')}
              />
            </div>
            {error && (
              <p className="form-error span-2" role="alert">
                {error}
              </p>
            )}
            <div className="span-2 row-actions">
              <button type="submit" className="btn">
                <Icon name="check" size={16} />
                {t('setup.submit')}
              </button>
              <button type="button" className="btn btn-ghost" onClick={useSample}>
                <Icon name="sparkles" size={16} />
                {t('setup.sample')}
              </button>
            </div>
          </form>
        </Card>

        <Card title={t('profile.privacyText')} icon="shield">
          <p className="small">{t('setup.privacyText')}</p>
          <div className="alert" style={{ marginBlockStart: 12 }}>
            <span className="alert-icon">
              <Icon name="shield" size={17} />
            </span>
            <div>{t('setup.privacy')}</div>
          </div>
          <p className="tiny muted" style={{ marginBlockStart: 12 }}>
            {t('tracker.method')}
          </p>
        </Card>
      </div>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
