export type Lang = "ar" | "en";

export type SectionId =
  | "preconception"
  | "pregnancy"
  | "labor"
  | "postpartum"
  | "newborn"
  | "breastfeeding"
  | "womens-health"
  | "medical-library";

export type CategoryId =
  | "reproductive-health"
  | "preparing-pregnancy"
  | "fertility"
  | "first-trimester"
  | "second-trimester"
  | "third-trimester"
  | "weekly-guide"
  | "antenatal-care"
  | "pregnancy-complications"
  | "labor-fundamentals"
  | "vaginal-delivery"
  | "operative-delivery"
  | "obstetric-emergencies"
  | "birth-preparation"
  | "maternal-assessment"
  | "physical-recovery"
  | "postpartum-mental"
  | "family-planning"
  | "newborn-assessment"
  | "essential-newborn-care"
  | "common-newborn-conditions"
  | "safe-newborn-care"
  | "newborn-development"
  | "immunization"
  | "breastfeeding-basics"
  | "common-breastfeeding-issues"
  | "expressing-storage"
  | "formula-feeding"
  | "complementary-feeding"
  | "menstrual-health"
  | "common-conditions"
  | "preventive-health";

export interface ArticleContent {
  definition?: string;
  causes?: string[];
  riskFactors?: string[];
  symptoms?: string[];
  assessment?: string[];
  investigations?: string[];
  management?: string[];
  nursingConsiderations?: string[];
  warningSigns?: string[];
  whenToSeekCare?: string[];
  sections?: { heading: string; body: string[] }[];
}

export interface Article {
  id: string;
  slug: string;
  category: CategoryId;
  section: SectionId;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  content: { ar: ArticleContent; en: ArticleContent };
  references?: string[];
  lastReviewed: string;
  readingTime: number;
  related?: string[];
}

export interface SectionMeta {
  id: SectionId;
  icon: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  categories: { id: CategoryId; title: { ar: string; en: string } }[];
}
