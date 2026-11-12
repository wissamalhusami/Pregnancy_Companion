import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import { references } from '../data/references';
import { formatDate, toISODate } from '../lib/pregnancy';
import { Card, Disclaimer } from '../components/ui';
import { Icon } from '../components/Icon';

export function Profile() {
  const { t, lang, setLang } = useLang();
  const navigate = useNavigate();
  const { data, updateProfile, resetAll, loadSampleData } = useAppState();

  const [name, setName] = useState(data.profile.name);
  const [lmp, setLmp] = useState(data.profile.lmp);
  const [weight, setWeight] = useState(
    data.profile.prePregnancyWeightKg ? String(data.profile.prePregnancyWeightKg) : '',
  );
  const [height, setHeight] = useState(data.profile.heightCm ? String(data.profile.heightCm) : '');
  const [clinic, setClinic] = useState(data.profile.clinic);
  const [confirmClear, setConfirmClear] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile({
      name: name.trim(),
      lmp,
      prePregnancyWeightKg: weight ? Number(weight) : null,
      heightCm: height ? Number(height) : null,
      clinic: clinic.trim(),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pregnancy-companion-${toISODate(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    resetAll();
    setConfirmClear(false);
    navigate('/setup');
  };

  return (
    <div>
      <header className="page-head">
        <div>
          <h1 className="page-title">{t('profile.title')}</h1>
          <p className="page-sub">{t('profile.subtitle')}</p>
        </div>
      </header>

      <div className="split">
        <Card title={t('profile.personal')} icon="user">
          <form onSubmit={save} className="form-grid">
            <div className="field span-2">
              <label htmlFor="p-name">{t('setup.name')}</label>
              <input
                id="p-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="field span-2">
              <label htmlFor="p-lmp">{t('setup.lmp')}</label>
              <input
                id="p-lmp"
                type="date"
                value={lmp}
                max={toISODate(new Date())}
                onChange={(event) => setLmp(event.target.value)}
                required
              />
              <span className="hint">{t('setup.lmpHelp')}</span>
            </div>
            <div className="field">
              <label htmlFor="p-weight">{t('setup.weight')}</label>
              <input
                id="p-weight"
                type="number"
                step="0.1"
                min={30}
                max={250}
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="p-height">{t('setup.height')}</label>
              <input
                id="p-height"
                type="number"
                min={100}
                max={220}
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
            <div className="field span-2">
              <label htmlFor="p-clinic">{t('setup.clinic')}</label>
              <input
                id="p-clinic"
                type="text"
                value={clinic}
                onChange={(event) => setClinic(event.target.value)}
                placeholder={t('common.optional')}
              />
            </div>
            <div className="span-2 row-actions">
              <button type="submit" className="btn">
                <Icon name="check" size={16} />
                {t('common.save')}
              </button>
              {saved && (
                <span className="chip ok" role="status">
                  {t('common.saved')}
                </span>
              )}
            </div>
          </form>
        </Card>

        <div style={{ display: 'grid', gap: 16 }}>
          <Card title={t('profile.language')} icon="globe">
            <div className="row-actions">
              <button
                type="button"
                className={`btn ${lang === 'ar' ? '' : 'btn-ghost'}`}
                onClick={() => setLang('ar')}
              >
                {t('profile.arabic')}
              </button>
              <button
                type="button"
                className={`btn ${lang === 'en' ? '' : 'btn-ghost'}`}
                onClick={() => setLang('en')}
              >
                {t('profile.english')}
              </button>
            </div>
          </Card>

          <Card title={t('profile.data')} icon="download">
            <p className="small muted">{t('profile.sampleNote')}</p>
            <div className="row-actions" style={{ marginBlockStart: 10 }}>
              <button type="button" className="btn btn-ghost" onClick={exportData}>
                <Icon name="download" size={16} />
                {t('profile.export')}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  loadSampleData();
                  setName(data.profile.name);
                }}
              >
                <Icon name="sparkles" size={16} />
                {t('profile.sample')}
              </button>
            </div>
            <div style={{ marginBlockStart: 12 }}>
              {confirmClear ? (
                <div className="alert alert-danger">
                  <span className="alert-icon">
                    <Icon name="alert" size={17} />
                  </span>
                  <div>
                    <p className="small" style={{ margin: 0 }}>
                      {t('profile.clearConfirm')}
                    </p>
                    <div className="row-actions" style={{ marginBlockStart: 8 }}>
                      <button type="button" className="btn btn-danger" onClick={clearAll}>
                        {t('common.delete')}
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setConfirmClear(false)}
                      >
                        {t('common.cancel')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setConfirmClear(true)}
                >
                  <Icon name="trash" size={16} />
                  {t('profile.clear')}
                </button>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Card title={t('profile.privacyText')} icon="shield">
        <p className="small">{t('profile.privacyText')}</p>
        <p className="tiny muted" style={{ marginBlockStart: 8 }}>
          {t('setup.privacyText')}
        </p>
      </Card>

      <Card title={t('profile.references')} icon="book">
        <ol className="ref-list">
          {references.map((reference) => (
            <li key={reference.id}>
              <span>{reference.title}</span>
              <span className="tiny muted">
                {reference.publisher}, {reference.year}
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <Card title={t('profile.about')} icon="info">
        <p className="small">{t('profile.aboutText')}</p>
        <p className="tiny muted" style={{ marginBlockStart: 8 }}>
          {t('profile.version')}: 1.0.0 · {t('profile.updated')}:{' '}
          {formatDate(new Date(), lang)}
        </p>
      </Card>

      <Disclaimer>{t('common.disclaimer')}</Disclaimer>
    </div>
  );
}
