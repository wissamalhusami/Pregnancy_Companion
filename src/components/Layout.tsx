import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useLang } from '../i18n';
import { useAuth } from '../state/AuthContext';
import { BrandLockup } from './Logo';
import { Icon, type IconName } from './Icon';
import { educationalDisclaimer } from '../data/references';
import { initialsOf } from '../lib/auth';

interface NavItem {
  to: string;
  labelKey: string;
  icon: IconName;
  danger?: boolean;
}

const primaryNav: NavItem[] = [
  { to: '/', labelKey: 'nav.dashboard', icon: 'home' },
  { to: '/tracker', labelKey: 'nav.tracker', icon: 'calendar' },
  { to: '/antenatal', labelKey: 'nav.anc', icon: 'stethoscope' },
  { to: '/nutrition', labelKey: 'nav.nutrition', icon: 'apple' },
];

const safetyNav: NavItem[] = [
  { to: '/danger-signs', labelKey: 'nav.danger', icon: 'alert', danger: true },
  { to: '/movement', labelKey: 'nav.movement', icon: 'movement' },
];

const careNav: NavItem[] = [
  { to: '/labor', labelKey: 'nav.labor', icon: 'bag' },
  { to: '/breastfeeding', labelKey: 'nav.breastfeeding', icon: 'breastfeeding' },
  { to: '/postpartum', labelKey: 'nav.postpartum', icon: 'heart' },
];

const tabNav: NavItem[] = [
  { to: '/', labelKey: 'nav.dashboard', icon: 'home' },
  { to: '/tracker', labelKey: 'nav.tracker', icon: 'calendar' },
  { to: '/danger-signs', labelKey: 'nav.danger', icon: 'alert' },
  { to: '/antenatal', labelKey: 'nav.anc', icon: 'stethoscope' },
  { to: '/profile', labelKey: 'nav.profile', icon: 'user' },
];

function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
  const { t } = useLang();
  return (
    <>
      <div className="nav-group-label">{label}</div>
      <ul className="nav-list">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-link${item.danger ? ' danger-link' : ''}${isActive ? ' active' : ''}`
              }
            >
              <Icon name={item.icon} size={19} className="nav-icon" />
              <span>{t(item.labelKey)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Avatar with provider image fallback to initials. */
function AccountAvatar({ size = 36 }: { size?: number }) {
  const { user } = useAuth();
  const [broken, setBroken] = useState(false);
  const initials = initialsOf(user?.name || user?.email || 'R');
  const showImage = Boolean(user?.avatarUrl) && !broken;

  return (
    <span className="avatar" style={{ inlineSize: size, blockSize: size }} aria-hidden="true">
      {showImage ? (
        <img
          src={user?.avatarUrl ?? ''}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="avatar-initials">{initials}</span>
      )}
    </span>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { t, lang, toggleLang, pick } = useLang();
  const { configured, user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the account menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
    navigate('/welcome', { replace: true });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {lang === 'ar' ? 'تجاوز إلى المحتوى' : 'Skip to content'}
      </a>

      <header className="app-header">
        <NavLink to="/" className="header-brand" aria-label={t('app.name')}>
          <BrandLockup />
        </NavLink>

        <div className="header-actions">
          {!configured && (
            <span className="chip chip-soft header-mode" title={t('auth.guestNoticeBody')}>
              <Icon name="shield" size={13} />
              {t('nav.guest')}
            </span>
          )}

          <button
            type="button"
            className="lang-btn"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Icon name="globe" size={16} />
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>

          {configured && !user && (
            <NavLink className="btn btn-sm header-signin" to="/auth/login">
              {t('nav.signIn')}
            </NavLink>
          )}

          <div className="account-menu">
            <button
              type="button"
              className="account-trigger"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label={t('nav.account')}
            >
              <AccountAvatar />
              <span className="account-trigger-text">
                <span className="account-trigger-name">
                  {user ? user.name || user.email : t('nav.account')}
                </span>
                <span className="account-trigger-sub">
                  {user ? user.email : t('auth.guestNotice')}
                </span>
              </span>
              <Icon name="chevronDown" size={15} className="account-caret" />
            </button>

            {menuOpen && (
              <div className="account-pop" role="menu">
                {user && (
                  <div className="account-pop-head">
                    <AccountAvatar size={40} />
                    <div>
                      <strong>{user.name || user.email}</strong>
                      <span className="tiny muted">{user.email}</span>
                    </div>
                  </div>
                )}
                <NavLink className="account-pop-item" role="menuitem" to="/profile">
                  <Icon name="user" size={16} />
                  {t('nav.profile')}
                </NavLink>
                <NavLink className="account-pop-item" role="menuitem" to="/setup">
                  <Icon name="settings" size={16} />
                  {t('nav.setup')}
                </NavLink>
                {user ? (
                  <button
                    type="button"
                    className="account-pop-item danger"
                    role="menuitem"
                    onClick={() => void handleSignOut()}
                  >
                    <Icon name="logout" size={16} />
                    {t('nav.signOut')}
                  </button>
                ) : (
                  <NavLink className="account-pop-item" role="menuitem" to="/auth/login">
                    <Icon name="user" size={16} />
                    {t('nav.signIn')}
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
          <NavGroup label={t('nav.groupMain')} items={primaryNav} />
          <NavGroup label={t('nav.groupSafety')} items={safetyNav} />
          <NavGroup label={t('nav.groupCare')} items={careNav} />
          <NavGroup
            label={t('nav.groupAccount')}
            items={[{ to: '/profile', labelKey: 'nav.profile', icon: 'user' }]}
          />

          {user && (
            <button type="button" className="sidebar-signout" onClick={() => void handleSignOut()}>
              <Icon name="logout" size={17} />
              {t('nav.signOut')}
            </button>
          )}

          <div className="sidebar-note">
            <Icon name="shield" size={14} />
            <p>{pick(educationalDisclaimer)}</p>
          </div>
        </aside>

        <main className="main" id="main">
          <div className="container">{children}</div>
        </main>
      </div>

      <nav className="tabbar" aria-label={lang === 'ar' ? 'التنقل السريع' : 'Quick navigation'}>
        <ul className="tabbar-list">
          {tabNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}
              >
                <Icon name={item.icon} size={21} />
                <span>{t(item.labelKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <span className="sr-only" data-route={location.pathname} />
    </div>
  );
}
