/**
 * Small formatting helpers used by the UI. Pure functions, no React and no
 * authentication concepts: the app is a single local profile now.
 */

/** Two-letter monogram for the avatar shown in the header. */
export function initialsOf(name: string): string {
  const base = (name ?? '').trim();
  if (!base) return 'R';
  const words = base
    .split(/[\s._-]+/)
    .map((word) => word.trim())
    .filter(Boolean);
  if (words.length === 0) return base.slice(0, 1).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
