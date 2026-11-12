import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import { references } from '../data/references';
import { formatDate } from '../lib/pregnancy';
import { initialsOf } from '../lib/format';
import { backupFileName, backupSummary, parseBackup, serializeBackup } from '../lib/backup';
import { Card, Disclaimer } from '../components/ui';
import { Icon } from '../components/Icon';
import type { AppData } from '../lib/types';

/** Triggers a download of a text file without touching the network. */
function downloadFile(name: string, text: string) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoke on the next tick so the download has started.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Profile() {
  const { t, lang, toggleLang, pick } = useLang();
  const { data, updateProfile, replaceAll, resetAll, loadSampleData, storage, ga, eddISO } =
    useAppState();

  const [name, setName] = useState(data.profile.name);
  const [lmp, setLmp] = useState(data.profile.lmp);
  const [weight, setWeight] = useState(
    data.profile.prePregnancyWeightKg ? String(data.profile.prePregnancyWeightKg) : '',
  );
  const [height, setHeight] = useState(
    data.profile.heightCm ? String(data.profile.heightCm) : '',
  );
  const [clinic, setClinic] = useState(data.profile.clinic);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  // Restoring a backup replaces the whole record, so the form follows it.
  useEffect(() => {
    setName(data.profile.name);
    setLmp(data.profile.lmp);
    setWeight(data.profile.prePregnancyWeightKg ? String(data.profile.prePregnancyWeightKg) : '');
    setHeight(data.profile.heightCm ? String(data.profile.heightCm) : '');
    setClinic(data.profile.clinic);
  }, [data.profile]);

  const [exported, setExported] = useState(false);
  const [importDone, setImportDone] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [pending, setPending] = useState<AppData | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError(t('setup.errorName'));
      return;
    }
    if (!lmp) {
      setError(t('setup.errorLmp'));
      return;
    }
    setError('');
    setSaving(true);
    const ok = await updateProfile({
      ...data.profile,
      name: name.trim(),
      lmp,
      prePregnancyWeightKg: weight ? Number(weight) : null,
      heightCm: height ? Number(height) : null,
      clinic: clinic.trim(),
    });
    setSaving(false);
    if (!ok) {
      setError(t('backup.errorWrite'));
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExport = async () => {
    // Make sure the newest edits are on disk before the file is built.
    await storage.flush();
    downloadFile(backupFileName(), serializeBackup(data));
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    setImportError(null);
    setImportDone(false);
    setPending(null);
    if (!file) return;
    if (file.size > 5_000_000) {
      setImportError('backup.errorTooLarge');
      return;
    }
    try {
      const result = parseBackup(await file.text());
      if (!result.ok) {
        setImportError(result.errorKey);
        return;
      }
      setPending(result.data);
    } catch {
      setImportError('backup.errorRead');
    }
  };

  const confirmImport = async () => {
    if (!pending) return;
    const ok = await replaceAll(pending);
    if (!ok) {
      setImportError('backup.errorWrite');
      return;
    }
    setPending(null);
    setImportDone(true);
    setTimeout(() => setImportDone(false), 4000);
  };

  const summary = pending ? backupSummary(pending) : null;

  return (
    <div className="page">
      <header className="page-head">
        <h1 className="page-title">{t('profile.title')}</h1>
        <p className="page-sub">{t('profile.subtitle')}</p>
      </header>

      <div className="profile-hero">
        <span className="avatar avatar-lg" aria-hidden="true">
          <span className="avatar-initials">{initialsOf(data.profile.name)}</span>
        </span>
        <div>
          <strong className="profile-name">{data.profile.name || t('nav.profile')}</strong>
          <p className="tiny muted">
            {ga ? `${ga.weeks} ${t('common.weeks')} · ${ga.days} ${t('common.days')}` : t('setup.title')}
            {eddISO ? ` · ${t('dashboard.edd')}: ${formatDate(eddISO, lang)}` : ''}
          </p>
        </div>
        <span className="chip chip-soft">
          <Icon name="shield" size={13} />
          {t('storage.localOnly')}
        </span>
      </div>

      <Card title={t('profile.personal')} icon="user">
        <form className="form" onSubmit={submit}>
          <div className="form-row">
            <label htmlFor="name">{t('setup.name')}</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-row">
            <label htmlFor="lmp">{t('setup.lmp')}</label>
            <input
              id="lmp"
              type="date"
              value={lmp}
              onChange={(event) => setLmp(event.target.value)}
            />
            <p className="help">{t('setup.lmpHelp')}</p>
          </div>
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="weight">{t('setup.weight')}</label>
              <input
                id="weight"
                type="number"
                min="30"
                max="200"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="height">{t('setup.height')}</label>
              <input
                id="height"
                type="number"
                min="120"
                max="220"
                step="1"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="clinic">{t('setup.clinic')}</label>
            <input
              id="clinic"
              value={clinic}
              onChange={(event) => setClinic(event.target.value)}
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <Icon name="alert" size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="row-actions">
            <button type="submit" className="btn" disabled={saving} aria-busy={saving}>
              <Icon name="check" size={16} />
              {saving ? t('common.saving') : t('setup.submit')}
            </button>
            {saved && (
              <span className="chip chip-ok" role="status">
                <Icon name="check" size={13} />
                {t('profile.updated')}
              </span>
            )}
            <Link className="btn btn-ghost" to="/setup">
              <Icon name="calendar" size={16} />
              {t('setup.title')}
            </Link>
          </div>
        </form>
      </Card>

      <Card title={t('backup.title')} icon="download">
        <p className="muted">{t('backup.body')}</p>
        <div className="row-actions" style={{ marginBlockStart: 12 }}>
          <button type="button" className="btn" onClick={() => void handleExport()}>
            <Icon name="download" size={16} />
            {t('backup.export')}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => fileInput.current?.click()}
          >
            <Icon name="reset" size={16} />
            {t('backup.import')}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-label={t('backup.import')}
            onChange={(event) => void handleFile(event)}
          />
        </div>

        {exported && (
          <p className="chip chip-ok" role="status">
            <Icon name="check" size={13} />
            {t('backup.exportDone')}
          </p>
        )}

        {importError && (
          <div className="alert alert-danger" role="alert">
            <Icon name="alert" size={16} />
            <span>{t(importError)}</span>
          </div>
        )}

        {pending && summary && (
          <div className="alert alert-info" role="status">
            <Icon name="info" size={16} />
            <div>
              <strong>{t('backup.importReady')}</strong>
              <p className="tiny">
                {pending.profile.name || '—'}
                {pending.profile.lmp ? ` · ${pending.profile.lmp}` : ''}
              </p>
              <p className="tiny muted">
                {t('backup.counts', {
                  anc: String(pending.appointments.length),
                  bp: String(summary.readings),
                  weight: String(summary.weights),
                  visits: String(summary.visits),
                  movement: String(summary.movements),
                })}
              </p>
              <p className="tiny">{t('backup.importNote')}</p>
              <div className="row-actions">
                <button type="button" className="btn btn-sm" onClick={() => void confirmImport()}>
                  <Icon name="check" size={14} />
                  {t('backup.importConfirm')}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => setPending(null)}
                >
                  <Icon name="close" size={14} />
                  {t('backup.importCancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {importDone && (
          <p className="chip chip-ok" role="status">
            <Icon name="check" size={13} />
            {t('backup.importDone')}
          </p>
        )}
      </Card>

      <Card title={t('profile.language')} icon="globe">
        <p className="muted">{t('profile.language')}</p>
        <div className="row-actions">
          <button
            type="button"
            className={`btn btn-sm${lang === 'ar' ? '' : ' btn-ghost'}`}
            aria-pressed={lang === 'ar'}
            onClick={() => {
              if (lang !== 'ar') toggleLang();
            }}
          >
            {t('profile.arabic')}
          </button>
          <button
            type="button"
            className={`btn btn-sm${lang === 'en' ? '' : ' btn-ghost'}`}
            aria-pressed={lang === 'en'}
            onClick={() => {
              if (lang !== 'en') toggleLang();
            }}
          >
            {t('profile.english')}
          </button>
        </div>
      </Card>

      <Card title={t('profile.localTitle')} icon="shield">
        <p className="muted">{t('profile.localBody')}</p>
        <p className="tiny muted">{t('setup.privacyText')}</p>
      </Card>

      <Card title={t('profile.data')} icon="book">
        <div className="row-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => void loadSampleData()}
          >
            <Icon name="sparkles" size={16} />
            {t('profile.sample')}
          </button>
          {confirmClear ? (
            <>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  resetAll();
                  setConfirmClear(false);
                }}
              >
                <Icon name="trash" size={16} />
                {t('profile.clearConfirm')}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setConfirmClear(false)}
              >
                {t('backup.importCancel')}
              </button>
            </>
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
        <p className="tiny muted">{t('profile.sampleNote')}</p>
        {storage.error && (
          <div className="alert alert-danger" role="alert">
            <Icon name="alert" size={16} />
            <span>{t('storage.unavailable')}</span>
          </div>
        )}
      </Card>

      <Card title={t('profile.references')} icon="book">
        <ul className="ref-list">
          {references.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span className="tiny muted">
                {item.publisher} · {item.year}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('profile.about')} icon="info">
        <p className="muted">{t('profile.aboutText')}</p>
        <p className="tiny muted">
          {t('profile.version')}: 1.0.0
        </p>
      </Card>

      <Disclaimer>{pick(educationalDisclaimer)}</Disclaimer>
    </div>
  );
}
