import { describe, expect, it } from 'vitest';
import {
  MIN_PASSWORD_LENGTH,
  authErrorKey,
  dataStorageKey,
  displayNameFrom,
  initialsOf,
  isValidEmail,
  normalizeEmail,
  providerLabel,
  storageScopeFor,
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePasswordReset,
  validateRegistration,
} from './auth';

describe('normalizeEmail / isValidEmail', () => {
  it('trims and lowercases so one account is not duplicated by casing', () => {
    expect(normalizeEmail('  Sara@Example.COM ')).toBe('sara@example.com');
  });

  it('accepts normal addresses and rejects malformed ones', () => {
    expect(isValidEmail('sara@example.com')).toBe(true);
    expect(isValidEmail('sara@example')).toBe(false);
    expect(isValidEmail('sara example.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('validateName', () => {
  it('requires at least two characters', () => {
    expect(validateName('').ok).toBe(false);
    expect(validateName('  a  ').ok).toBe(false);
    expect(validateName('سارة').ok).toBe(true);
    expect(validateName('Sara').ok).toBe(true);
  });
});

describe('validateEmail', () => {
  it('distinguishes missing from invalid input', () => {
    expect(validateEmail('').errorKey).toBe('auth.errorEmailRequired');
    expect(validateEmail('nope').errorKey).toBe('auth.errorInvalidEmail');
    expect(validateEmail('a@b.co').ok).toBe(true);
  });
});

describe('validatePassword', () => {
  it('enforces the documented minimum length', () => {
    expect(validatePassword('').errorKey).toBe('auth.errorPasswordRequired');
    // Has both a letter and a digit but is exactly one character too short.
    const justUnder = `a1${'x'.repeat(MIN_PASSWORD_LENGTH - 3)}`;
    expect(justUnder).toHaveLength(MIN_PASSWORD_LENGTH - 1);
    expect(validatePassword(justUnder).errorKey).toBe('auth.errorPasswordShort');
    expect(validatePassword(`a1${'x'.repeat(MIN_PASSWORD_LENGTH - 2)}`).ok).toBe(true);
  });

  it('requires a letter (Arabic or Latin) and a digit', () => {
    expect(validatePassword('12345678').errorKey).toBe('auth.errorPasswordWeak');
    expect(validatePassword('password').errorKey).toBe('auth.errorPasswordWeak');
    expect(validatePassword('secret123').ok).toBe(true);
    expect(validatePassword('كلمة1234').ok).toBe(true);
  });
});

describe('validateRegistration', () => {
  const valid = {
    name: 'Sara Ali',
    email: 'sara@example.com',
    password: 'secret123',
    confirm: 'secret123',
  };

  it('accepts a complete registration', () => {
    expect(validateRegistration(valid).ok).toBe(true);
  });

  it('reports the first problem in field order', () => {
    expect(validateRegistration({ ...valid, name: '' }).errorKey).toBe('auth.errorName');
    expect(validateRegistration({ ...valid, email: 'bad' }).errorKey).toBe(
      'auth.errorInvalidEmail',
    );
    expect(validateRegistration({ ...valid, password: 'short' }).errorKey).toBe(
      'auth.errorPasswordShort',
    );
    expect(validateRegistration({ ...valid, confirm: 'different123' }).errorKey).toBe(
      'auth.errorPasswordMismatch',
    );
  });
});

describe('validateLogin', () => {
  it('requires an email and a password but does not judge password strength', () => {
    expect(validateLogin({ email: 'a@b.co', password: 'x' }).ok).toBe(true);
    expect(validateLogin({ email: '', password: 'x' }).errorKey).toBe(
      'auth.errorEmailRequired',
    );
    expect(validateLogin({ email: 'a@b.co', password: '' }).errorKey).toBe(
      'auth.errorPasswordRequired',
    );
  });
});

describe('validatePasswordReset', () => {
  it('reuses password rules and requires matching confirmation', () => {
    expect(validatePasswordReset({ password: 'secret123', confirm: 'secret123' }).ok).toBe(true);
    expect(validatePasswordReset({ password: 'secret123', confirm: 'x' }).errorKey).toBe(
      'auth.errorPasswordMismatch',
    );
  });
});

describe('authErrorKey', () => {
  it('maps provider messages onto bilingual keys', () => {
    expect(authErrorKey('Invalid login credentials')).toBe('auth.errorInvalidCredentials');
    expect(authErrorKey('Email not confirmed')).toBe('auth.errorEmailNotConfirmed');
    expect(authErrorKey('User already registered')).toBe('auth.errorEmailInUse');
    expect(authErrorKey('Failed to fetch')).toBe('auth.errorNetwork');
  });

  it('never echoes raw provider text', () => {
    expect(authErrorKey('some unexpected internal detail')).toBe('auth.errorGeneric');
    expect(authErrorKey(null)).toBe('auth.errorGeneric');
    expect(authErrorKey(undefined)).toBe('auth.errorGeneric');
  });
});

describe('initialsOf', () => {
  it('builds a two-letter monogram', () => {
    expect(initialsOf('Sara Ali')).toBe('SA');
    expect(initialsOf('sara')).toBe('SA');
    expect(initialsOf('sara@example.com')).toBe('SA');
    expect(initialsOf('')).toBe('R');
  });
});

describe('displayNameFrom', () => {
  it('prefers full name, then name, then the email local part', () => {
    expect(displayNameFrom({ full_name: 'Sara Ali', name: 'S' })).toBe('Sara Ali');
    expect(displayNameFrom({ name: 'Sara' })).toBe('Sara');
    expect(displayNameFrom({}, 'sara@example.com')).toBe('sara');
    expect(displayNameFrom(null)).toBe('');
  });
});

describe('per-account data scoping', () => {
  it('separates guest and signed-in storage buckets', () => {
    expect(storageScopeFor(null)).toBe('guest');
    expect(storageScopeFor(undefined)).toBe('guest');
    expect(storageScopeFor('abc-123')).toBe('user-abc-123');
  });

  it('keeps the legacy guest key so existing demo data still loads', () => {
    expect(dataStorageKey('guest')).toBe('data');
    expect(dataStorageKey('user-abc-123')).toBe('data:user-abc-123');
  });

  it('gives different accounts different keys', () => {
    expect(dataStorageKey(storageScopeFor('a'))).not.toBe(dataStorageKey(storageScopeFor('b')));
  });
});

describe('providerLabel', () => {
  it('labels known providers and falls back gracefully', () => {
    expect(providerLabel('google')).toBe('Google');
    expect(providerLabel('facebook')).toBe('Facebook');
    expect(providerLabel('email')).toBe('Email');
    expect(providerLabel(null)).toBe('Email');
    expect(providerLabel('github')).toBe('Github');
  });
});
