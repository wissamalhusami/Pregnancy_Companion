import { NavLink, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useLang } from '../i18n';
import { useAppState } from '../state/AppState';
import { BrandLockup } from './Logo';
import { Icon, type IconName } from './Icon';
import { educationalDisclaimer } from '../data/references';
import { initialsOf } from '../lib/format';

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

/** Monogram avatar for the single local profile (no account, no photo upload). */
function ProfileAvatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <span className="avatar" style={{ inlineSize: size, blockSize: size }} aria-hidden="true">
      <span className="avatar-initials">{initialsOf(name)}</span>
    </span>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { t, lang, toggleLang, pick } = useLang();
  const { data } = useAppState();
  const location = useLocation();

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
          <span className="chip chip-soft header-mode" title={t('profile.localBody')}>
            <Icon name="shield" size={13} />
            {t('storage.localOnly')}
          </span>

          <button
            type="button"
            className="lang-btn"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Icon name="globe" size={16} />
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>

          <NavLink className="account-trigger" to="/profile" aria-label={t('nav.profile')}>
            <ProfileAvatar name={data.profile.name} />
            <span className="account-trigger-text">
              <span className="account-trigger-name">
                {data.profile.name || t('nav.profile')}
              </span>
              <span className="account-trigger-sub">{t('storage.localOnly')}</span>
            </span>
          </NavLink>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
          <NavGroup label={t('nav.groupMain')} items={primaryNav} />
          <NavGroup label={t('nav.groupSafety')} items={safetyNav} />
          <NavGroup label={t('nav.groupCare')} items={careNav} />
          <NavGroup
            label={t('nav.groupProfile')}
            items={[{ to: '/profile', labelKey: 'nav.profile', icon: 'user' }]}
          />

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
