import { NavLink, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useLang } from '../i18n';
import { BrandLockup } from './Logo';
import { Icon, type IconName } from './Icon';
import { educationalDisclaimer } from '../data/references';

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

export function Layout({ children }: { children: ReactNode }) {
  const { t, lang, toggleLang, pick } = useLang();
  const location = useLocation();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {lang === 'ar' ? 'تجاوز إلى المحتوى' : 'Skip to content'}
      </a>

      <header className="app-header">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <BrandLockup />
        </NavLink>

        <div className="header-actions">
          <button
            type="button"
            className="lang-btn"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Icon name="globe" size={16} />
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <NavLink
            to="/profile"
            className={({ isActive }) => `btn btn-ghost btn-icon${isActive ? ' active' : ''}`}
            aria-label={t('nav.profile')}
            title={t('nav.profile')}
          >
            <Icon name="user" size={18} />
          </NavLink>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
          <NavGroup label={t('app.name')} items={primaryNav} />
          <NavGroup label={lang === 'ar' ? 'السلامة' : 'Safety'} items={safetyNav} />
          <NavGroup label={lang === 'ar' ? 'الرعاية' : 'Care'} items={careNav} />
          <NavGroup label={t('nav.profile')} items={[{ to: '/profile', labelKey: 'nav.profile', icon: 'user' }]} />
          <p className="tiny muted" style={{ padding: '14px 12px 0', lineHeight: 1.7 }}>
            {pick(educationalDisclaimer)}
          </p>
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
