import { useLang } from '../i18n';

/**
 * RIFQAH mark: a soft rose-to-lavender tile holding a mother silhouette with a
 * protective heart. Inline SVG keeps it crisp at every size and mirrors in RTL.
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
        <linearGradient id="rifqahTile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3C9DA" />
          <stop offset="46%" stopColor="#D18FA9" />
          <stop offset="100%" stopColor="#A98BC4" />
        </linearGradient>
        <linearGradient id="rifqahInk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FBEEF4" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="60" height="60" rx="20" fill="url(#rifqahTile)" />
      <rect
        x="4.5"
        y="4.5"
        width="55"
        height="55"
        rx="17.5"
        fill="none"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="1.2"
      />

      {/* head */}
      <circle cx="27.2" cy="18.6" r="4.7" fill="url(#rifqahInk)" />
      {/* body with a curved bump */}
      <path
        d="M18.4 47.4c-1.6-8.9 2.9-15.6 8.6-15.6 3.1 0 5.5 1.9 6.8 4.9 1.9-1.1 4-1.2 5.6-.2 2.9 1.8 3.6 5.8 2.5 10.9"
        fill="none"
        stroke="url(#rifqahInk)"
        strokeWidth="4.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* heart at the womb */}
      <path
        d="M36.4 28.2c1.7-2.4 5.3-2.2 6.6.2 1.4 2.4-.2 4.8-3 6.9-2.6-1.9-4.8-4.4-3.6-7.1Z"
        fill="#FFFFFF"
        opacity="0.96"
      />
      {/* protective spark */}
      <circle cx="46.6" cy="16.4" r="2" fill="#FFFFFF" opacity="0.92" />
      <path
        d="M46.6 11.8v-1.6M51.2 16.4h1.6M42 16.4h-1.6"
        stroke="#FFFFFF"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

/** Header lockup: mark plus the bilingual wordmark. */
export function BrandLockup({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <span className="brand">
      <Logo size={compact ? 36 : 44} className="brand-logo" />
      <span className="brand-text">
        <span className="brand-name">{t('app.name')}</span>
        {!compact && <span className="brand-tag">{t('app.tagline')}</span>}
      </span>
    </span>
  );
}
