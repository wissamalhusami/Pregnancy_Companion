import { useLang } from '../i18n';

/**
 * Application logo: a rose–lavender shield holding a mother silhouette,
 * a heart and a protective spark. Rendered inline so it scales crisply and
 * adapts to RTL layout without extra requests.
 */
export function Logo({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7cede" />
          <stop offset="52%" stopColor="#e292ae" />
          <stop offset="100%" stopColor="#b193d6" />
        </linearGradient>
        <linearGradient id="logoHeart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fdf1f6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="19" fill="url(#logoBg)" />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="19"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
      />
      {/* mother silhouette */}
      <path
        d="M27.5 22.5a4.6 4.6 0 1 0 0-9.2 4.6 4.6 0 0 0 0 9.2Z"
        fill="url(#logoHeart)"
      />
      <path
        d="M19 47c-1.4-8.6 3.2-14.6 8.5-14.6 3 0 5.4 1.7 6.6 4.6 1.7-1 3.6-1.1 5.1-.2 2.7 1.6 3.4 5.4 2.4 10.2"
        fill="none"
        stroke="url(#logoHeart)"
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      {/* heart over the bump */}
      <path
        d="M37.6 31.6c1.6-2.3 5-2.1 6.3.2 1.3 2.3-.2 4.6-2.9 6.6-2.4-1.8-4.5-4.2-3.4-6.8Z"
        fill="#fff"
        opacity="0.95"
      />
      <circle cx="47.5" cy="17.5" r="2.1" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/** Full lockup used in the header. */
export function BrandLockup({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <span className="brand">
      <Logo size={compact ? 36 : 42} className="brand-logo" />
      <span className="brand-text">
        <span className="brand-name">{t('app.name')}</span>
        {!compact && <span className="brand-tag">{t('app.tagline')}</span>}
      </span>
    </span>
  );
}
