import type { Bi } from '../lib/types';

export type SectionId =
  | 'preconception'
  | 'pregnancy'
  | 'labor'
  | 'postpartum'
  | 'newborn'
  | 'feeding';

export interface Category {
  id: string;
  section: SectionId;
  title: Bi;
}

/**
 * One educational article. Every topic carries the same nine fields, a list of
 * source references and the month it was last reviewed, so the content can be
 * defended academically and audited later.
 */
export interface Topic {
  id: string;
  section: SectionId;
  category: string;
  title: Bi;
  summary: Bi;
  /** 1. Clear definition. */
  definition: Bi;
  /** 2. Simplified medical explanation. */
  explanation: Bi;
  /** 3. Causes and risk factors. */
  causes: Bi;
  /** 4. Signs and symptoms. */
  symptoms: Bi;
  /** 5. Assessment and diagnosis. */
  diagnosis: Bi;
  /** 6. General management. */
  management: Bi;
  /** 7. Nursing role. */
  nursing: Bi;
  /** 8. When to seek medical care. */
  seekCare: Bi;
  /** Reference ids resolved against content/refs.ts. */
  refs: string[];
  /** Last content review, YYYY-MM. */
  updated: string;
  /** Extra search keywords. */
  tags?: string[];
  /** Marks topics that describe an emergency. */
  urgent?: boolean;
}

export const t = (ar: string, en: string): Bi => ({ ar, en });

/** Reference metadata, resolved from the id stored on a topic. */
export interface SourceRef {
  id: string;
  title: string;
  publisher: string;
  year: string;
  url: string;
}
