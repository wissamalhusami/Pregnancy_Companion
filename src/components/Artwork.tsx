/**
 * Brand artwork.
 *
 * Hand-built SVG so the illustrations stay crisp, themeable and dependency-free:
 * a calm, editorial maternal-health palette rather than clip-art.
 */

const ROSE = '#C97C9B';
const ROSE_DEEP = '#A85C7C';
const LAV = '#C6A8CE';
const BEIGE = '#EFE3D4';

/** Hero illustration: mother silhouette, womb arcs and a gentle pulse line. */
export function HeroArtwork({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 440 440"
      role="img"
      aria-label="RIFQAH maternal care illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-disc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDF7FA" />
          <stop offset="48%" stopColor="#F8E8EF" />
          <stop offset="100%" stopColor="#E7DCEF" />
        </linearGradient>
        <linearGradient id="hero-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#E3A9C1" />
          <stop offset="100%" stopColor="#B9698C" />
        </linearGradient>
        <linearGradient id="hero-arm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EFC3D5" />
          <stop offset="100%" stopColor="#D79BB4" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="220" cy="214" r="176" fill="url(#hero-disc)" />
      <circle cx="220" cy="214" r="176" fill="url(#hero-glow)" />

      {/* orbit + womb arcs */}
      <circle
        cx="220"
        cy="214"
        r="176"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="2"
      />
      <path
        d="M52 268a168 168 0 0 1 336 0"
        fill="none"
        stroke={LAV}
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
      <path
        d="M78 300a142 142 0 0 1 284 0"
        fill="none"
        stroke={ROSE}
        strokeOpacity="0.28"
        strokeWidth="1.4"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />

      {/* botanical accents */}
      <g fill={LAV} opacity="0.55">
        <path d="M96 132c-14-2-25-12-27-27 15 1 25 11 27 27Z" />
        <path d="M362 158c14 2 25 12 27 27-15-1-25-11-27-27Z" />
      </g>
      <g fill={ROSE} opacity="0.4">
        <path d="M344 116c10-8 24-8 33 1-10 8-24 8-33-1Z" />
        <path d="M88 322c-10 8-24 8-33-1 10-8 24-8 33 1Z" />
      </g>

      {/* mother figure */}
      <circle cx="203" cy="132" r="27" fill="url(#hero-body)" />
      <path
        d="M203 162c33 0 53 24 58 60 4 27-1 55-9 78-5 15-16 23-34 23h-31c-19 0-30-9-34-25-8-31-6-64 6-91 11-25 27-45 44-45Z"
        fill="url(#hero-body)"
      />
      {/* belly light */}
      <ellipse cx="232" cy="256" rx="33" ry="37" fill="#FFFFFF" opacity="0.26" />
      {/* supporting arm */}
      <path
        d="M176 212c-17 15-23 35-16 55 5 14 16 22 30 24"
        fill="none"
        stroke="url(#hero-arm)"
        strokeWidth="13"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* heartbeat inside the belly */}
      <path
        d="M232 246c5-8 17-8 22 0 5 8-1 17-11 24-10-7-16-16-11-24Z"
        fill="#FFFFFF"
        opacity="0.92"
      />
      {/* pulse line */}
      <path
        d="M104 344h42l11-21 13 35 10-14h46"
        fill="none"
        stroke={ROSE_DEEP}
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="330" cy="316" r="6" fill={BEIGE} />
      <circle cx="126" cy="196" r="5" fill={ROSE} opacity="0.35" />
    </svg>
  );
}

/** Compact emblem used on the welcome screen and empty states. */
export function CareEmblem({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role="img"
      aria-label="RIFQAH emblem"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="emblem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7B7CA" />
          <stop offset="100%" stopColor="#B9698C" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="#FDF7FA" />
      <circle cx="60" cy="60" r="56" fill="none" stroke={LAV} strokeOpacity="0.5" strokeWidth="1.5" />
      <path
        d="M60 86c-18-11-30-22-30-36a16 16 0 0 1 30-8 16 16 0 0 1 30 8c0 14-12 25-30 36Z"
        fill="url(#emblem)"
        opacity="0.9"
      />
      <path
        d="M60 62c3-5 10-5 13 0 3 5-1 10-7 14-6-4-9-9-6-14Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}

/** Soft decorative band used behind page headers. */
export function HeaderBloom({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bloom" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8E8EF" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#F5F0E8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#DCC9DC" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M0 120c90-46 190 24 300-6s210-52 300-14v100H0Z" fill="url(#bloom)" />
    </svg>
  );
}
