import type { SectionMeta } from "../types";

export const SECTIONS: SectionMeta[] = [
  {
    id: "preconception",
    icon: "Heart",
    title: { ar: "العناية قبل الحمل", en: "Preconception Care" },
    description: {
      ar: "الصحة الإنجابية، التخطيط للحمل، التغذية، ومراجعة ما قبل الحمل.",
      en: "Reproductive health, pregnancy planning, nutrition, and preconception counseling.",
    },
    categories: [
      { id: "reproductive-health", title: { ar: "الصحة الإنجابية", en: "Reproductive Health" } },
      { id: "preparing-pregnancy", title: { ar: "التحضير للحمل", en: "Preparing for Pregnancy" } },
      { id: "fertility", title: { ar: "الخصوبة", en: "Fertility Education" } },
    ],
  },
  {
    id: "pregnancy",
    icon: "Baby",
    title: { ar: "العناية أثناء الحمل", en: "Pregnancy Care" },
    description: {
      ar: "مراحل الحمل، دليل أسبوعي، الرعاية قبل الولادة، ومضاعفات الحمل.",
      en: "Trimesters, week-by-week guide, antenatal care, and pregnancy complications.",
    },
    categories: [
      { id: "first-trimester", title: { ar: "الثلاث الأول", en: "First Trimester" } },
      { id: "second-trimester", title: { ar: "الثلاث الثاني", en: "Second Trimester" } },
      { id: "third-trimester", title: { ar: "الثلاث الثالث", en: "Third Trimester" } },
      { id: "weekly-guide", title: { ar: "دليل أسبوعي", en: "Week-by-Week Guide" } },
      { id: "antenatal-care", title: { ar: "الرعاية قبل الولادة", en: "Antenatal Care" } },
      { id: "pregnancy-complications", title: { ar: "مضاعفات الحمل", en: "Pregnancy Complications" } },
    ],
  },
  {
    id: "labor",
    icon: "Activity",
    title: { ar: "المخاض والولادة", en: "Labor & Delivery" },
    description: {
      ar: "مراحل المخاض، الولادة الطبيعية، القيصرية، والطوارئ التوليدية.",
      en: "Stages of labor, vaginal delivery, cesarean, and obstetric emergencies.",
    },
    categories: [
      { id: "labor-fundamentals", title: { ar: "أساسيات المخاض", en: "Labor Fundamentals" } },
      { id: "vaginal-delivery", title: { ar: "الولادة الطبيعية", en: "Vaginal Delivery" } },
      { id: "operative-delivery", title: { ar: "الولادة الجراحية", en: "Operative Delivery" } },
      { id: "obstetric-emergencies", title: { ar: "طوارئ التوليد", en: "Obstetric Emergencies" } },
      { id: "birth-preparation", title: { ar: "التحضير للولادة", en: "Birth Preparation" } },
    ],
  },
  {
    id: "postpartum",
    icon: "HeartHandshake",
    title: { ar: "العناية بعد الولادة", en: "Postpartum Care" },
    description: {
      ar: "تعافي الأم، الصحة النفسية، تنظيم الأسرة، والمتابعة الطبية.",
      en: "Maternal recovery, mental health, family planning, and follow-up.",
    },
    categories: [
      { id: "maternal-assessment", title: { ar: "تقييم الأم", en: "Maternal Assessment" } },
      { id: "physical-recovery", title: { ar: "التعافي الجسدي", en: "Physical Recovery" } },
      { id: "postpartum-mental", title: { ar: "الصحة النفسية", en: "Postpartum Mental Health" } },
      { id: "family-planning", title: { ar: "تنظيم الأسرة", en: "Family Planning" } },
    ],
  },
  {
    id: "newborn",
    icon: "Baby",
    title: { ar: "رعاية المولود", en: "Newborn Care" },
    description: {
      ar: "تقييم المولود، الرعاية الأساسية، الحالات الشائعة، والتطعيمات.",
      en: "Newborn assessment, essential care, common conditions, and immunization.",
    },
    categories: [
      { id: "newborn-assessment", title: { ar: "تقييم المولود", en: "Newborn Assessment" } },
      { id: "essential-newborn-care", title: { ar: "الرعاية الأساسية", en: "Essential Newborn Care" } },
      { id: "common-newborn-conditions", title: { ar: "حالات شائعة", en: "Common Conditions" } },
      { id: "safe-newborn-care", title: { ar: "رعاية آمنة", en: "Safe Newborn Care" } },
      { id: "newborn-development", title: { ar: "النمو والتطور", en: "Growth & Development" } },
      { id: "immunization", title: { ar: "التطعيمات", en: "Immunization" } },
    ],
  },
  {
    id: "breastfeeding",
    icon: "Baby",
    title: { ar: "الرضاعة وتغذية الطفل", en: "Breastfeeding & Infant Nutrition" },
    description: {
      ar: "أساسيات الرضاعة، المشكلات الشائعة، تخزين الحليب، والغذاء المكمل.",
      en: "Breastfeeding basics, common issues, milk storage, and complementary feeding.",
    },
    categories: [
      { id: "breastfeeding-basics", title: { ar: "أساسيات الرضاعة", en: "Breastfeeding Basics" } },
      { id: "common-breastfeeding-issues", title: { ar: "مشكلات شائعة", en: "Common Issues" } },
      { id: "expressing-storage", title: { ar: "التعبئة والتخزين", en: "Expressing & Storage" } },
      { id: "formula-feeding", title: { ar: "الرضاعة الصناعية", en: "Formula Feeding" } },
      { id: "complementary-feeding", title: { ar: "الغذاء المكمل", en: "Complementary Feeding" } },
    ],
  },
  {
    id: "womens-health",
    icon: "Heart",
    title: { ar: "صحة المرأة", en: "Women's Health" },
    description: {
      ar: "الصحة الإنجابية، الدورة الشهرية، الأمراض الشائعة، والوقاية.",
      en: "Reproductive health, menstrual cycle, common conditions, and prevention.",
    },
    categories: [
      { id: "menstrual-health", title: { ar: "صحة الدورة الشهرية", en: "Menstrual Health" } },
      { id: "common-conditions", title: { ar: "حالات شائعة", en: "Common Conditions" } },
      { id: "preventive-health", title: { ar: "الصحة الوقائية", en: "Preventive Health" } },
    ],
  },
  {
    id: "medical-library",
    icon: "BookOpen",
    title: { ar: "المكتبة الطبية", en: "Medical Library" },
    description: {
      ar: "مكتبة تعليمية شاملة لجميع المواضيع الطبية في المنصة.",
      en: "A comprehensive educational library for all medical topics.",
    },
    categories: [
      { id: "reproductive-health", title: { ar: "الصحة الإنجابية", en: "Reproductive Health" } },
      { id: "common-conditions", title: { ar: "حالات شائعة", en: "Common Conditions" } },
    ],
  },
];

export function getSection(id: string): SectionMeta | undefined {
  return SECTIONS.find((s) => s.id === id);
}
