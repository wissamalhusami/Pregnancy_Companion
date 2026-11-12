import type { Lang } from "../types";

type Dict = Record<string, { ar: string; en: string }>;

const dict: Dict = {
  "app.name": { ar: "رفقة", en: "RIFQAH" },
  "app.tagline": {
    ar: "صحة المرأة والأمومة في كل مرحلة",
    en: "Women's health & motherhood, every step",
  },

  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.preconception": { ar: "قبل الحمل", en: "Preconception" },
  "nav.pregnancy": { ar: "الحمل", en: "Pregnancy" },
  "nav.labor": { ar: "الولادة", en: "Labor & Delivery" },
  "nav.postpartum": { ar: "بعد الولادة", en: "Postpartum" },
  "nav.newborn": { ar: "المولود", en: "Newborn" },
  "nav.breastfeeding": { ar: "الرضاعة", en: "Breastfeeding" },
  "nav.womensHealth": { ar: "صحة المرأة", en: "Women's Health" },
  "nav.library": { ar: "المكتبة الطبية", en: "Medical Library" },
  "nav.tools": { ar: "الأدوات", en: "Tools" },
  "nav.about": { ar: "عن رفقة", en: "About" },

  "home.welcome": { ar: "مرحباً بك في رفقة", en: "Welcome to RIFQAH" },
  "home.intro": {
    ar: "منصة شاملة لصحة المرأة والأمومة — من التخطيط للحمل حتى رعاية المولود والرضاعة. تصفّح المحتوى التعليمي، استخدم الأدوات التفاعلية، وتابع رحلتك في كل مرحلة.",
    en: "A comprehensive maternal and women's health platform — from planning pregnancy through newborn care and breastfeeding. Browse educational content, use interactive tools, and track your journey at every stage.",
  },
  "home.explore": { ar: "استكشف الأقسام", en: "Explore Sections" },
  "home.popularTools": { ar: "أدوات شائعة", en: "Popular Tools" },
  "home.featured": { ar: "مقالات مميزة", en: "Featured Articles" },
  "home.warningSigns": { ar: "علامات تستدعي الانتباه", en: "Warning Signs to Know" },
  "home.search": { ar: "ابحث عن موضوع، حالة، أو أداة…", en: "Search a topic, condition, or tool…" },
  "home.searchBtn": { ar: "بحث", en: "Search" },
  "home.recentlyViewed": { ar: "طُلع حديثاً", en: "Recently Viewed" },
  "home.noRecent": { ar: "لا يوجد مقالات مشاهدة بعد. تصفّح المكتبة الطبية للبدء.", en: "No articles viewed yet. Browse the medical library to get started." },

  "search.title": { ar: "البحث", en: "Search" },
  "search.placeholder": { ar: "ابحث…", en: "Search…" },
  "search.results": { ar: "نتائج البحث", en: "Search Results" },
  "search.noResults": { ar: "لا توجد نتائج. جرّب كلمات أخرى.", en: "No results found. Try different keywords." },
  "search.all": { ar: "الكل", en: "All" },
  "search.articles": { ar: "مقالات", en: "Articles" },
  "search.tools": { ar: "أدوات", en: "Tools" },
  "search.count": { ar: "نتيجة", en: "results" },

  "article.definition": { ar: "التعريف", en: "Definition" },
  "article.causes": { ar: "الأسباب", en: "Causes" },
  "article.riskFactors": { ar: "عوامل الخطر", en: "Risk Factors" },
  "article.symptoms": { ar: "العلامات والأعراض", en: "Signs & Symptoms" },
  "article.assessment": { ar: "التقييم", en: "Assessment" },
  "article.investigations": { ar: "الفحوصات", en: "Investigations" },
  "article.management": { ar: "الإدارة الطبية", en: "Management" },
  "article.nursing": { ar: "اعتبارات التمريض", en: "Nursing Considerations" },
  "article.warningSigns": { ar: "علامات الخطر", en: "Warning Signs" },
  "article.whenToSeekCare": { ar: "متى تتطلبين الرعاية الطبية", en: "When to Seek Medical Care" },
  "article.references": { ar: "المراجع", en: "References" },
  "article.lastReviewed": { ar: "آخر مراجعة", en: "Last reviewed" },
  "article.related": { ar: "مقالات ذات صلة", en: "Related Articles" },
  "article.readingTime": { ar: "دقائق قراءة", en: "min read" },
  "article.contents": { ar: "المحتويات", en: "Contents" },
  "article.back": { ar: "رجوع", en: "Back" },

  "tools.title": { ar: "مركز الأدوات", en: "Tools Center" },
  "tools.intro": {
    ar: "أدوات تفاعلية لمساعدتك في رحلتك — كلها تعمل على جهازك ولا تتطلب إنشاء حساب.",
    en: "Interactive tools to help you on your journey — all run on your device and require no account.",
  },
  "tools.pregnancy": { ar: "أدوات الحمل", en: "Pregnancy Tools" },
  "tools.womens": { ar: "أدوات صحة المرأة", en: "Women's Health Tools" },
  "tools.maternal": { ar: "أدوات الصحة الأمومية", en: "Maternal Health Tools" },
  "tools.newborn": { ar: "أدوات المولود", en: "Newborn Tools" },
  "tools.checklists": { ar: "قوائم تحقق", en: "Checklists" },
  "tools.save": { ar: "حفظ", en: "Save" },
  "tools.saved": { ar: "تم الحفظ", en: "Saved" },
  "tools.clear": { ar: "مسح", en: "Clear" },
  "tools.export": { ar: "تصدير نسخة احتياطية", en: "Export Backup" },
  "tools.import": { ar: "استيراد نسخة", en: "Import Backup" },
  "tools.deleteAll": { ar: "حذف كل البيانات", en: "Delete All Data" },
  "tools.result": { ar: "النتيجة", en: "Result" },
  "tools.disclaimer": {
    ar: "هذه الأداة لأغراض تعليمية فقط وليست بديلاً عن الاستشارة الطبية.",
    en: "This tool is for educational purposes only and is not a substitute for medical consultation.",
  },

  "tool.dueDate": { ar: "حاسبة تاريخ الولادة", en: "Due Date Calculator" },
  "tool.gestationalAge": { ar: "حاسبة العمر الحملي", en: "Gestational Age Calculator" },
  "tool.ovulation": { ar: "حاسبة التبويض", en: "Ovulation Calculator" },
  "tool.appointmentTracker": { ar: "متتبع المواعيد", en: "Appointment Tracker" },
  "tool.symptomJournal": { ar: "مذكرات الأعراض", en: "Symptom Journal" },
  "tool.bpTracker": { ar: "سجل ضغط الدم", en: "Blood Pressure Log" },
  "tool.glucoseTracker": { ar: "سجل سكر الدم", en: "Blood Glucose Log" },
  "tool.medicationReminder": { ar: "تذكير الأدوية", en: "Medication Reminder" },
  "tool.babyGrowth": { ar: "متتبع نمو الطفل", en: "Baby Growth Tracker" },
  "tool.vaccination": { ar: "متتبع التطعيمات", en: "Vaccination Tracker" },
  "tool.breastfeedingTracker": { ar: "متتبع الرضاعة", en: "Breastfeeding Tracker" },
  "tool.sleepTracker": { ar: "متتبع النوم", en: "Sleep Tracker" },
  "tool.diaperTracker": { ar: "متتبع الحفاضات", en: "Diaper Tracker" },
  "tool.hospitalBag": { ar: "قائمة مستلزمات المستشفى", en: "Hospital Bag Checklist" },
  "tool.newbornEssentials": { ar: "مستلزمات المولود", en: "Newborn Essentials Checklist" },

  "common.optional": { ar: "اختياري", en: "Optional" },
  "common.required": { ar: "مطلوب", en: "Required" },
  "common.cancel": { ar: "إلغاء", en: "Cancel" },
  "common.add": { ar: "إضافة", en: "Add" },
  "common.delete": { ar: "حذف", en: "Delete" },
  "common.edit": { ar: "تعديل", en: "Edit" },
  "common.save": { ar: "حفظ", en: "Save" },
  "common.date": { ar: "التاريخ", en: "Date" },
  "common.notes": { ar: "ملاحظات", en: "Notes" },
  "common.loading": { ar: "جارٍ التحميل…", en: "Loading…" },
  "common.empty": { ar: "لا توجد بيانات بعد.", en: "No data yet." },
  "common.confirm": { ar: "تأكيد", en: "Confirm" },
  "common.close": { ar: "إغلاق", en: "Close" },
  "common.yes": { ar: "نعم", en: "Yes" },
  "common.no": { ar: "لا", en: "No" },

  "emergency.title": { ar: "تحذير طبي", en: "Medical Warning" },
  "emergency.call": { ar: "في حالة الطوارئ اتصل بالطوارئ فوراً", en: "In emergencies, call emergency services immediately" },
  "disclaimer.general": {
    ar: "هذه المعلومات لأغراض تعليمية فقط ولا تغني عن الاستشارة الطبية المهنية.",
    en: "This information is for educational purposes only and does not replace professional medical advice.",
  },

  "about.title": { ar: "عن رفقة", en: "About RIFQAH" },
  "about.mission": { ar: "رسالتنا", en: "Our Mission" },
  "about.disclaimer": { ar: "إخلاء المسؤولية", en: "Disclaimer" },

  "footer.rights": { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  "footer.disclaimer": {
    ar: "المعلومات في رفقة تعليمية وليست بديلاً عن الاستشارة الطبية.",
    en: "Information on RIFQAH is educational and not a substitute for medical advice.",
  },

  "lang.switch": { ar: "English", en: "العربية" },

  "section.preconception": { ar: "العناية قبل الحمل", en: "Preconception Care" },
  "section.pregnancy": { ar: "العناية أثناء الحمل", en: "Pregnancy Care" },
  "section.labor": { ar: "المخاض والولادة", en: "Labor & Delivery" },
  "section.postpartum": { ar: "العناية بعد الولادة", en: "Postpartum Care" },
  "section.newborn": { ar: "رعاية المولود", en: "Newborn Care" },
  "section.breastfeeding": { ar: "الرضاعة وتغذية الطفل", en: "Breastfeeding & Infant Nutrition" },
  "section.womensHealth": { ar: "صحة المرأة", en: "Women's Health" },
  "section.library": { ar: "المكتبة الطبية", en: "Medical Library" },
};

let currentLang: Lang = "ar";

export function setLang(lang: Lang) {
  currentLang = lang;
}

export function getLang(): Lang {
  return currentLang;
}

export function t(key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[currentLang] ?? entry.en ?? key;
}

export function dir(): "rtl" | "ltr" {
  return currentLang === "ar" ? "rtl" : "ltr";
}
