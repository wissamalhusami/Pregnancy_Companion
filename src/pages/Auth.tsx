import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../i18n';
import { useAuth } from '../state/AuthContext';
import {
  passwordScore,
  validateEmail,
  validateLogin,
  validatePasswordReset,
  validateRegistration,
} from '../lib/auth';
import { BrandLockup } from '../components/Logo';
import { HeroArtwork } from '../components/Artwork';

export type AuthMode = 'login' | 'register' | 'forgot' | 'reset';

const strengthKeys = ['', 'auth.strength1', 'auth.strength2', 'auth.strength3', 'auth.strength4'];

/** Reads an OAuth error passed back in the hash or query string. */
function oauthErrorFrom(url: string): string | null {
  const hash = url.includes('#') ? url.slice(url.indexOf('#') + 1) : '';
  for (const part of [hash, url.split('?')[1] ?? '']) {
    const params = new URLSearchParams(part);
    const code = params.get('error_code') ?? params.get('error');
    if (code) {
      const description = params.get('error_description') ?? '';
      if (code === 'access_denied') return 'auth.errorGeneric';
      return description.toLowerCase().includes('provider')
        ? 'auth.errorProviderDisabled'
        : 'auth.errorGeneric';
    }
  }
  return null;
}

export function AuthCallbackPage() {
  const { t } = useLang();
  const { ready, user, configured } = useAuth();
  const navigate = useNavigate();
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    const fromUrl = oauthErrorFrom(window.location.href);
    if (fromUrl) setErrorKey(fromUrl);
    const timer = window.setTimeout(() => setElapsed(true), 9000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && user) navigate('/', { replace: true });
  }, [ready, user, navigate]);

  const failed = errorKey ?? (elapsed && !user ? 'auth.callbackError' : null);

  return (
    <div className="auth-shell auth-shell--center">
      <div className="auth-card auth-card--narrow" role="status" aria-live="polite">
        <div className="auth-card-head">
          <BrandLockup />
          <h1>{t('auth.callbackTitle')}</h1>
          {!failed && <p className="muted">{t('auth.callbackWorking')}</p>}
        </div>

        {!failed ? (
          <div className="callback-loader" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        ) : (
          <>
            <div className="form-error" role="alert">
              {t(failed)}
            </div>
            {!configured && <p className="form-hint">{t('auth.notConfiguredBody')}</p>}
            <div className="auth-alt">
              <Link className="btn btn-block" to="/auth/login">
                {t('auth.backToLogin')}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function AuthPage({ mode }: { mode: AuthMode }) {
  const { t } = useLang();
  const {
    ready,
    configured,
    user,
    busy,
    signIn,
    signUp,
    sendReset,
    updatePassword,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get('next') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ key: string; email?: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);

  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const isReset = mode === 'reset';

  // A recovery link signs the user in; without that session the form cannot work.
  const resetLinkInvalid = isReset && ready && configured && !user;

  useEffect(() => {
    if (ready && user && mode !== 'reset') navigate(next, { replace: true });
  }, [ready, user, mode, next, navigate]);

  const clearMessages = () => {
    setErrorKey(null);
    setNotice(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearMessages();

    if (mode === 'login') {
      const check = validateLogin({ email, password });
      if (!check.ok) return setErrorKey(check.errorKey ?? 'auth.errorGeneric');
      setPending(true);
      const result = await signIn(email, password);
      setPending(false);
      if (!result.ok) return setErrorKey(result.errorKey ?? 'auth.errorGeneric');
      navigate(next, { replace: true });
      return;
    }

    if (isRegister) {
      const check = validateRegistration({ name, email, password, confirm });
      if (!check.ok) return setErrorKey(check.errorKey ?? 'auth.errorGeneric');
      setPending(true);
      const result = await signUp({ name, email, password });
      setPending(false);
      if (!result.ok) return setErrorKey(result.errorKey ?? 'auth.errorGeneric');
      if (result.needsConfirmation) {
        setAwaitingConfirm(true);
        return;
      }
      navigate(next, { replace: true });
      return;
    }

    if (isForgot) {
      const check = validateEmail(email);
      if (!check.ok) return setErrorKey(check.errorKey ?? 'auth.errorGeneric');
      setPending(true);
      const result = await sendReset(email);
      setPending(false);
      if (!result.ok) return setErrorKey(result.errorKey ?? 'auth.errorGeneric');
      setNotice({ key: 'auth.resetSent', email: email.trim() });
      return;
    }

    const check = validatePasswordReset({ password, confirm });
    if (!check.ok) return setErrorKey(check.errorKey ?? 'auth.errorGeneric');
    setPending(true);
    const result = await updatePassword(password);
    setPending(false);
    if (!result.ok) return setErrorKey(result.errorKey ?? 'auth.errorGeneric');
    setNotice({ key: 'auth.passwordUpdated' });
    setPassword('');
    setConfirm('');
  };

  const title = isRegister
    ? t('auth.registerTitle')
    : isForgot
      ? t('auth.forgotTitle')
      : isReset
        ? t('auth.resetTitle')
        : t('auth.loginTitle');

  const subtitle = isRegister
    ? t('auth.registerSubtitle')
    : isForgot
      ? t('auth.forgotSubtitle')
      : isReset
        ? t('auth.resetSubtitle')
        : t('auth.loginSubtitle');

  const score = passwordScore(password);
  const disabled = pending || busy || !configured;

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <div className="auth-aside-top">
          <BrandLockup />
        </div>
        <div className="auth-aside-body">
          <span className="eyebrow">{t('brand.eyebrow')}</span>
          <h2>{t('welcome.heroTitle')}</h2>
          <p>{t('welcome.heroSub')}</p>
          <ul className="auth-points">
            <li>{t('welcome.point1')}</li>
            <li>{t('welcome.point2')}</li>
            <li>{t('welcome.point3')}</li>
          </ul>
        </div>
        <HeroArtwork className="auth-art" />
        <p className="auth-aside-note">{t('welcome.trust')}</p>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-head">
            <h1>{title}</h1>
            <p className="muted">{subtitle}</p>
          </div>

          {!configured && (
            <div className="form-notice" role="status">
              <strong>{t('auth.notConfiguredTitle')}</strong>
              <p>{t('auth.notConfiguredBody')}</p>
            </div>
          )}

          {awaitingConfirm ? (
            <div className="form-notice ok" role="status">
              <strong>{t('auth.confirmEmailTitle')}</strong>
              <p>{t('auth.confirmEmailBody', { email: email.trim() })}</p>
              <Link className="btn btn-ghost" to="/auth/login">
                {t('auth.backToLogin')}
              </Link>
            </div>
          ) : resetLinkInvalid ? (
            <div className="form-error" role="alert">
              {t('auth.errorSessionMissing')}
              <div className="auth-alt">
                <Link className="btn btn-ghost" to="/auth/forgot">
                  {t('auth.sendReset')}
                </Link>
              </div>
            </div>
          ) : (
            <form className="auth-form" onSubmit={submit} noValidate>
              {isRegister && (
                <div className="form-field">
                  <label htmlFor="auth-name">{t('auth.fullName')}</label>
                  <input
                    id="auth-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    placeholder={t('auth.fullNamePlaceholder')}
                    onChange={(event) => {
                      setName(event.target.value);
                      clearMessages();
                    }}
                    required
                  />
                </div>
              )}

              {!isReset && (
                <div className="form-field">
                  <label htmlFor="auth-email">{t('auth.email')}</label>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    dir="ltr"
                    autoComplete="email"
                    value={email}
                    placeholder={t('auth.emailPlaceholder')}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearMessages();
                    }}
                    required
                  />
                </div>
              )}

              {!isForgot && (
                <div className="form-field">
                  <label htmlFor="auth-password">
                    {isReset ? t('auth.newPassword') : t('auth.password')}
                  </label>
                  <div className="password-wrap">
                    <input
                      id="auth-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      dir="ltr"
                      autoComplete={isRegister || isReset ? 'new-password' : 'current-password'}
                      value={password}
                      placeholder={t('auth.passwordPlaceholder')}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        clearMessages();
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    >
                      {showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    </button>
                  </div>
                  {(isRegister || isReset) && password.length > 0 && (
                    <div className="strength" data-score={score}>
                      <span className="strength-track">
                        <span className="strength-bar" style={{ inlineSize: `${score * 25}%` }} />
                      </span>
                      <span className="strength-label">
                        {t('auth.strength')}: {t(strengthKeys[Math.max(1, score)])}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {(isRegister || isReset) && (
                <div className="form-field">
                  <label htmlFor="auth-confirm">{t('auth.confirmPassword')}</label>
                  <input
                    id="auth-confirm"
                    name="confirm"
                    type={showPassword ? 'text' : 'password'}
                    dir="ltr"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(event) => {
                      setConfirm(event.target.value);
                      clearMessages();
                    }}
                    required
                  />
                </div>
              )}

              {errorKey && (
                <div className="form-error" role="alert">
                  {t(errorKey)}
                </div>
              )}

              {notice && (
                <div className="form-notice ok" role="status">
                  <strong>{t(notice.key)}</strong>
                  {notice.key === 'auth.resetSent' && notice.email && (
                    <p>{t('auth.resetSentBody', { email: notice.email })}</p>
                  )}
                  {notice.key === 'auth.passwordUpdated' && <p>{t('auth.passwordUpdatedBody')}</p>}
                  {notice.key === 'auth.passwordUpdated' && (
                    <Link className="btn btn-ghost" to="/">
                      {t('common.continue')}
                    </Link>
                  )}
                </div>
              )}

              <button type="submit" className="btn btn-block" disabled={disabled}>
                {pending ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    {isRegister
                      ? t('auth.creatingAccount')
                      : isForgot
                        ? t('auth.sendingLink')
                        : isReset
                          ? t('auth.saving')
                          : t('auth.signingIn')}
                  </>
                ) : isRegister ? (
                  t('auth.signUp')
                ) : isForgot ? (
                  t('auth.sendReset')
                ) : isReset ? (
                  t('auth.updatePassword')
                ) : (
                  t('auth.signIn')
                )}
              </button>

              {mode === 'login' && (
                <div className="auth-links">
                  <Link to="/auth/forgot">{t('auth.forgotLink')}</Link>
                </div>
              )}

              <p className="auth-switch">
                {isRegister ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
                <Link to={isRegister ? '/auth/login' : '/auth/register'}>
                  {isRegister ? t('auth.signIn') : t('auth.createAccount')}
                </Link>
              </p>
            </form>
          )}

          <p className="auth-privacy">{isRegister ? t('auth.privacyNote') : t('auth.secureNote')}</p>

          <div className="auth-alt">
            <Link className="link-quiet" to="/danger-signs">
              {t('nav.danger')}
            </Link>
            <Link className="link-quiet" to="/">
              {t('auth.continueGuest')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
