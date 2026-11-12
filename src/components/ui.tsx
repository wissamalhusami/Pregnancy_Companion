import { useEffect, useId, useState, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

/* ---------------------------------- cards --------------------------------- */

export function Card({
  title,
  icon,
  action,
  children,
  className = '',
  id,
}: {
  title?: ReactNode;
  icon?: IconName;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`card ${className}`} id={id}>
      {(title || action) && (
        <header className="card-head">
          {icon && <Icon name={icon} size={19} />}
          {title && <h2 className="card-title">{title}</h2>}
          {action && <span className="spacer">{action}</span>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon,
  tone,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: IconName;
  tone?: 'rose' | 'lav';
}) {
  return (
    <div className="stat">
      {icon && (
        <span className="stat-icon">
          <Icon name={icon} size={18} />
        </span>
      )}
      <span className="stat-label">{label}</span>
      <span className={`stat-value${tone ? ` ${tone}` : ''}`}>{value}</span>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}

/* -------------------------------- progress -------------------------------- */

export function ProgressRing({
  percent,
  size = 132,
  stroke = 11,
  label,
  caption,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  label: string;
  caption?: string;
}) {
  const gradientId = useId().replace(/:/g, '');
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} role="img" aria-label={`${label}: ${clamped}%`}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e086a5" />
            <stop offset="100%" stopColor="#a68cd2" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#fbe7ee"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="ring-label">
        <span className="ring-value">{Math.round(clamped)}%</span>
        {caption && <span className="ring-caption">{caption}</span>}
      </div>
    </div>
  );
}

export function ProgressBar({ percent, tone = 'rose' }: { percent: number; tone?: 'rose' | 'lav' | 'ok' }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={`progress tone-${tone}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar" style={{ width: `${clamped}%` }} />
    </div>
  );
}

/* -------------------------------- sparkline -------------------------------- */

export function Sparkline({
  values,
  labels,
  height = 68,
  color = '#cf6489',
}: {
  values: number[];
  labels?: string[];
  height?: number;
  color?: string;
}) {
  if (values.length < 2) return null;
  const width = 300;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pad = 8;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * (width - pad * 2) + pad;
    const y = height - pad - ((value - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${path} L${points[points.length - 1][0].toFixed(1)} ${height} L${points[0][0].toFixed(1)} ${height} Z`;

  return (
    <svg
      className="sparkline"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={labels ? labels.join(', ') : undefined}
    >
      <path d={area} fill={color} opacity="0.12" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r="3" fill="#fff" stroke={color} strokeWidth="2" />
      ))}
    </svg>
  );
}

/* --------------------------------- alerts --------------------------------- */

export function Alert({
  tone = 'info',
  title,
  children,
  icon,
}: {
  tone?: 'info' | 'danger' | 'warn' | 'ok';
  title?: string;
  children: ReactNode;
  icon?: IconName;
}) {
  const map: Record<string, { cls: string; icon: IconName }> = {
    info: { cls: 'alert', icon: 'info' },
    danger: { cls: 'alert alert-danger', icon: 'alert' },
    warn: { cls: 'alert alert-warn', icon: 'alert' },
    ok: { cls: 'alert alert-ok', icon: 'check' },
  };
  const conf = map[tone];
  return (
    <div className={conf.cls} role={tone === 'danger' ? 'alert' : undefined}>
      <span className="alert-icon">
        <Icon name={icon ?? conf.icon} size={17} />
      </span>
      <div>
        {title && <div className="alert-title">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="disclaimer">
      <strong>ⓘ </strong>
      {children}
    </p>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}

/** Compact "nothing recorded yet" placeholder used by the tracking tables. */
export function Empty({ text }: { text: string }) {
  return <div className="empty">{text}</div>;
}

/* --------------------------------- modal ---------------------------------- */

export function Modal({
  open,
  title,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="card-head">
          <h2 className="card-title">{title}</h2>
          <span className="spacer">
            <button type="button" className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close">
              <Icon name="close" size={16} />
            </button>
          </span>
        </div>
        {children}
        {footer && <div className="modal-actions">{footer}</div>}
      </div>
    </div>
  );
}

/* --------------------------------- toast ---------------------------------- */

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [message]);

  const node = message ? (
    <div className="toast" role="status" aria-live="polite">
      <div className="toast-inner">{message}</div>
    </div>
  ) : null;

  return { showToast: setMessage, toastNode: node };
}

/* -------------------------------- sections -------------------------------- */

export function BulletList({ items, tone }: { items: ReactNode[]; tone?: 'lav' | 'rose' }) {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={index} className={`list-item${tone ? ` ${tone}` : ''}`}>
          <span className="bullet">{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
