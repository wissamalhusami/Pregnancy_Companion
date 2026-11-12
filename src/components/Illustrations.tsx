import { useLang } from '../i18n';

/**
 * Educational illustration of the uterus with a fetus whose size and posture
 * change with gestational age. It is schematic (not diagnostic) and labels are
 * bilingual, so it reads correctly in both LTR and RTL layouts.
 */
export function WombIllustration({ week }: { week: number }) {
  const { lang } = useLang();
  const clamped = Math.max(4, Math.min(40, week));
  const t = (clamped - 4) / 36;
  const fetusScale = 0.32 + t * 0.62;
  const headR = 7 + t * 4;

  return (
    <svg
      viewBox="0 0 320 220"
      className="illustration"
      role="img"
      aria-label={
        lang === 'ar'
          ? `رسم توضيحي تعليمي للرحم والجنين في الأسبوع ${clamped}`
          : `Educational illustration of the uterus and fetus at week ${clamped}`
      }
    >
      <defs>
        <linearGradient id="wombBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf4f7" />
          <stop offset="100%" stopColor="#f2ecfa" />
        </linearGradient>
        <linearGradient id="wombWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6d0dd" />
          <stop offset="100%" stopColor="#e5b3c8" />
        </linearGradient>
        <linearGradient id="fetusFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9dfe8" />
          <stop offset="100%" stopColor="#e9c7da" />
        </linearGradient>
        <radialGradient id="sacFill" cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#efe6f8" stopOpacity="0.85" />
        </radialGradient>
      </defs>

      <rect width="320" height="220" rx="18" fill="url(#wombBg)" />

      {/* uterus outline */}
      <path
        d="M160 26c34 0 62 20 62 58 0 42-27 78-62 96-35-18-62-54-62-96 0-38 28-58 62-58Z"
        fill="url(#sacFill)"
        stroke="url(#wombWall)"
        strokeWidth="5"
      />
      {/* amniotic sac */}
      <ellipse cx="160" cy="112" rx={46 + t * 30} ry={50 + t * 26} fill="#ffffff" opacity="0.55" />

      {/* fetus */}
      <g transform={`translate(160 112) scale(${fetusScale}) translate(-160 -112)`}>
        <circle cx="160" cy="86" r={headR} fill="url(#fetusFill)" stroke="#d9aec6" strokeWidth="2" />
        <path
          d="M160 96c10 0 17 8 17 18 0 12-6 20-8 26-2 7-2 12-6 12s-3-6-4-10c-2 6-4 12-8 12s-4-6-4-12c-1-8-4-16-4-28 0-10 7-18 17-18Z"
          fill="url(#fetusFill)"
          stroke="#d9aec6"
          strokeWidth="2"
        />
        <path
          d="M168 108c9 3 13 9 12 15"
          fill="none"
          stroke="#d9aec6"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M150 140c-2 10 1 16 6 18"
          fill="none"
          stroke="#d9aec6"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* umbilical cord */}
        <path
          d="M160 132c8 10 20 16 30 14 8-2 12-8 12-14"
          fill="none"
          stroke="#c9a7c0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 4"
        />
      </g>

      {/* placenta */}
      <path
        d="M204 58c14 4 22 14 20 26-2 10-10 16-20 14-6-1-9-6-8-12 1-8 3-16 8-28Z"
        fill="#eec7d6"
        stroke="#dfb0c4"
        strokeWidth="2"
        opacity="0.9"
      />

      {/* labels */}
      <text x="12" y="206" fontSize="11" fill="#8b8092" fontWeight="700">
        {lang === 'ar' ? `الأسبوع ${clamped}` : `Week ${clamped}`}
      </text>
      <text x="308" y="206" fontSize="10" fill="#a89eb0" textAnchor="end">
        {lang === 'ar' ? 'رسم تعليمي تخطيطي' : 'Schematic educational drawing'}
      </text>
    </svg>
  );
}

/** Small decorative banner used on education pages. */
export function DecorativeWave() {
  return (
    <svg viewBox="0 0 320 60" width="100%" height="60" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 40c40-24 80-24 120 0s80 24 120 0 60-18 80-8v28H0V40Z" fill="#fbe7ee" />
      <path d="M0 48c40-20 80-20 120 0s80 20 120 0 60-14 80-6v18H0V48Z" fill="#ece5f7" opacity="0.7" />
    </svg>
  );
}
