/**
 * Pure authentication helpers: validation, error translation and identity
 * formatting. Kept free of React and Supabase so they can be unit tested.
 */

export const MIN_PASSWORD_LENGTH = 8;

export interface ValidationResult {
  ok: boolean;
  /** i18n key of the first problem, when invalid. */
  errorKey?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

export function normalizeEmail(email: string): string {
  return (email ?? '').trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(normalizeEmail(email));
}

/** 0 (empty) … 4 (strong) — drives the strength meter in the register form. */
export function passwordScore(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= MIN_PASSWORD_LENGTH) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Za-z]/.test(password) && /[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(4, score);
}

export function validateName(name: string): ValidationResult {
  if ((name ?? '').trim().length < 2) return { ok: false, errorKey: 'auth.errorName' };
  return { ok: true };
}

export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) return { ok: false, errorKey: 'auth.errorEmailRequired' };
  if (!isValidEmail(email)) return { ok: false, errorKey: 'auth.errorInvalidEmail' };
  return { ok: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) return { ok: false, errorKey: 'auth.errorPasswordRequired' };
  if (password.length < MIN_PASSWORD_LENGTH) return { ok: false, errorKey: 'auth.errorPasswordShort' };
  if (!/[A-Za-z\u0600-\u06FF]/.test(password) || !/[0-9]/.test(password)) {
    return { ok: false, errorKey: 'auth.errorPasswordWeak' };
  }
  return { ok: true };
}

export function validateLogin(input: { email: string; password: string }): ValidationResult {
  const email = validateEmail(input.email);
  if (!email.ok) return email;
  if (!input.password) return { ok: false, errorKey: 'auth.errorPasswordRequired' };
  return { ok: true };
}

export function validateRegistration(input: {
  name: string;
  email: string;
  password: string;
  confirm: string;
}): ValidationResult {
  const name = validateName(input.name);
  if (!name.ok) return name;
  const email = validateEmail(input.email);
  if (!email.ok) return email;
  const password = validatePassword(input.password);
  if (!password.ok) return password;
  if (input.password !== input.confirm) return { ok: false, errorKey: 'auth.errorPasswordMismatch' };
  return { ok: true };
}

export function validatePasswordReset(input: { password: string; confirm: string }): ValidationResult {
  const password = validatePassword(input.password);
  if (!password.ok) return password;
  if (input.password !== input.confirm) return { ok: false, errorKey: 'auth.errorPasswordMismatch' };
  return { ok: true };
}

/**
 * Maps a Supabase auth message onto a bilingual UI key. Supabase returns
 * human-readable English strings, so matching is substring based and falls
 * back to a generic message rather than leaking raw provider text.
 */
const AUTH_ERROR_KEYS: { match: string; key: string }[] = [
  { match: 'invalid login credentials', key: 'auth.errorInvalidCredentials' },
  { match: 'email not confirmed', key: 'auth.errorEmailNotConfirmed' },
  { match: 'user already registered', key: 'auth.errorEmailInUse' },
  { match: 'already been registered', key: 'auth.errorEmailInUse' },
  { match: 'password should be at least', key: 'auth.errorPasswordShort' },
  { match: 'password is too short', key: 'auth.errorPasswordShort' },
  { match: 'same password', key: 'auth.errorSamePassword' },
  { match: 'rate limit', key: 'auth.errorRateLimited' },
  { match: 'too many requests', key: 'auth.errorRateLimited' },
  { match: 'provider is not enabled', key: 'auth.errorProviderDisabled' },
  { match: 'unsupported provider', key: 'auth.errorProviderDisabled' },
  { match: 'invalid email', key: 'auth.errorInvalidEmail' },
  { match: 'unable to validate email', key: 'auth.errorInvalidEmail' },
  { match: 'signup is disabled', key: 'auth.errorSignupDisabled' },
  { match: 'failed to fetch', key: 'auth.errorNetwork' },
  { match: 'networkerror', key: 'auth.errorNetwork' },
  { match: 'auth session missing', key: 'auth.errorSessionMissing' },
];

export function authErrorKey(message?: string | null): string {
  if (!message) return 'auth.errorGeneric';
  const haystack = message.toLowerCase();
  for (const entry of AUTH_ERROR_KEYS) {
    if (haystack.includes(entry.match)) return entry.key;
  }
  return 'auth.errorGeneric';
}

/** Two-letter monogram used when a provider does not return an avatar. */
export function initialsOf(nameOrEmail: string): string {
  const base = (nameOrEmail ?? '').trim();
  if (!base) return 'R';
  const withoutDomain = base.includes('@') ? base.split('@')[0] : base;
  const words = withoutDomain
    .split(/[\s._-]+/)
    .map((word) => word.trim())
    .filter(Boolean);
  if (words.length === 0) return base.slice(0, 1).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

/** Display name derived from OAuth metadata, falling back to the email local part. */
export function displayNameFrom(
  metadata: Record<string, unknown> | null | undefined,
  email?: string | null,
): string {
  const candidates = ['full_name', 'name', 'preferred_username', 'user_name'];
  for (const field of candidates) {
    const value = metadata?.[field];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  if (email) return email.split('@')[0];
  return '';
}

/** Each signed-in account gets its own local data bucket. */
export function storageScopeFor(userId: string | null | undefined): string {
  return userId ? `user-${userId}` : 'guest';
}

export function dataStorageKey(scope: string): string {
  return scope === 'guest' ? 'data' : `data:${scope}`;
}

/** Friendly provider label for the account card. */
export function providerLabel(provider?: string | null): string {
  switch ((provider ?? '').toLowerCase()) {
    case 'google':
      return 'Google';
    case 'facebook':
      return 'Facebook';
    case 'email':
      return 'Email';
    default:
      return provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : 'Email';
  }
}
