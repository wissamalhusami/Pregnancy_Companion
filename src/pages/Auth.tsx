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

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.3 3.8l-.1.1 3.4 2.6.2.1c2.1-2 3.8-4.9 3.8-8.5Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.8-2.9l-3.7-2.9c-1 .7-2.3 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5l-.1.1-3.4 2.7-.1.1C3.6 21.3 7.5 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.4A7.3 7.3 0 0 1 4.9 12c0-.8.1-1.6.4-2.4l-.1-.2L1.7 6.7l-.1.2A12 12 0 0 0 0 12c0 1.9.5 3.7 1.6 5.1l3.7-2.7Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c2.2 0 3.7.9 4.5 1.7l3.3-3.2C17.9 1.3 15.2 0 12 0 7.5 0 3.6 2.7 1.6 6.7l3.7 2.9C6.2 6.8 8.9 4.7 12 4.7Z"
      />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z"
      />
    </svg>
  );
}

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
    signInWithProvider,
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

  const oauth = async (provider: 'google' | 'facebook') => {
    clearMessages();
    const result = await signInWithProvider(provider);
    if (!result.ok) setErrorKey(result.errorKey ?? 'auth.errorGeneric');
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

          {(isRegister || mode === 'login') && (
            <>
              <div className="social-buttons">
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => void oauth('google')}
                  disabled={disabled}
                >
                  <GoogleMark />
                  {t('auth.continueGoogle')}
                </button>
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => void oauth('facebook')}
                  disabled={disabled}
                >
                  <FacebookMark />
                  {t('auth.continueFacebook')}
                </button>
              </div>
              <div className="auth-divider">
                <span>{t('auth.orContinueWith')}</span>
              </div>
            </>
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
