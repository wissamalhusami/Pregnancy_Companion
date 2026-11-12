import type { Category, SectionId } from './types';
import { t } from './types';
import type { IconName } from '../components/Icon';

export interface SectionMeta {
  id: SectionId;
  icon: IconName;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  intro: { ar: string; en: string };
}

export const sections: SectionMeta[] = [
  {
    id: 'preconception',
    icon: 'leaf',
    title: t('العناية قبل الحمل', 'Preconception Care'),
    subtitle: t('استعدي لحمل صحي قبل أن يبدأ', 'Preparing for a healthy pregnancy'),
    intro: t(
      'معلومات عن الاستعداد للحمل: الخصوبة والإباضة، الدورة الشهرية، الفحوصات، حمض الفوليك، الأمراض المزمنة ومراجعة الأدوية. لا تحتاجين إلى إدخال أي بيانات لقراءتها.',
      'Evidence-based preparation for pregnancy: fertility and ovulation, the menstrual cycle, preconception check-ups, folic acid, chronic conditions and medication review. No personal data is needed to read it.',
    ),
  },
  {
    id: 'pregnancy',
    icon: 'fetus',
    title: t('العناية أثناء الحمل', 'Pregnancy Care'),
    subtitle: t('ثلاثة فصول، أسبوع بأسبوع', 'Three trimesters, week by week'),
    intro: t(
      'تطور الجنين والتغيرات الفسيولوجية، الفحوصات والتحاليل والسونار، رعاية الحمل، التغذية والنشاط الآمن، الاضطرابات الشائعة وعلامات الخطر والصحة النفسية.',
      'Fetal development and maternal physiology, tests and ultrasound, antenatal care, nutrition and safe activity, common discomforts, danger signs and mental health.',
    ),
  },
  {
    id: 'labor',
    icon: 'hospital',
    title: t('المخاض والولادة', 'Labor & Delivery'),
    subtitle: t('ما يحدث، وما يمكن توقعه', 'What happens, and what to expect'),
    intro: t(
      'علامات بداية المخاض، مراحل الولادة، الولادة الطبيعية والقيصرية، تسكين الألم، التحضير للولادة، مضاعفات المخاض والرعاية الفورية بعد الولادة.',
      'Signs that labour has begun, the stages of labour, vaginal and cesarean birth, pain relief, preparation, complications and immediate post-birth care.',
    ),
  },
  {
    id: 'postpartum',
    icon: 'heart',
    title: t('العناية بعد الولادة', 'Postpartum Care'),
    subtitle: t('تعافٍ آمن في الأسابيع الأولى', 'Safe recovery in the first weeks'),
    intro: t(
      'التعافي بعد الولادة الطبيعية والقيصرية، التقييم بعد الولادة، النزيف، العناية بالجرح، التغذية والراحة، الصحة النفسية واكتئاب ما بعد الولادة، مواعيد المتابعة وتنظيم الأسرة.',
      'Recovery after vaginal and cesarean birth, postpartum assessment, bleeding, wound care, nutrition and rest, mental health and postpartum depression, follow-up and family planning.',
    ),
  },
  {
    id: 'newborn',
    icon: 'newborn',
    title: t('رعاية المولود', 'Newborn Care'),
    subtitle: t('الأسابيع الأولى والأكثر حساسية', 'The first weeks of life'),
    intro: t(
      'تقييم المولود ومقياس أبغار، العناية بالحبل السري، الاستحمام وتغيير الحفاض، اليرقان، تنظيم الحرارة، النوم الآمن، علامات الخطر، التطعيمات ومتابعة النمو ورعاية الخدج.',
      'Newborn assessment and the Apgar score, cord care, bathing and nappy changes, jaundice, temperature control, safe sleep, danger signs, vaccinations, growth follow-up and preterm care.',
    ),
  },
  {
    id: 'feeding',
    icon: 'breastfeeding',
    title: t('الرضاعة وتغذية الرضيع', 'Breastfeeding & Infant Feeding'),
    subtitle: t('من الرضاعة الأولى إلى الطعام', 'From the first feed to family food'),
    intro: t(
      'أساسيات الرضاعة الطبيعية، الإمساك والإرضاع، مشكلات الرضاعة، شفط الحليب وتخزينه، الحليب الصناعي، التغذية التكميلية وتغذية الأم المرضعة.',
      'Breastfeeding basics, latch and positioning, common problems, expressing and storing milk, formula feeding, complementary feeding and the nursing mother’s diet.',
    ),
  },
];

export const categories: Category[] = [
  // Preconception
  { id: 'prep', section: 'preconception', title: t('الاستعداد والفحوصات', 'Preparation & check-ups') },
  { id: 'fertility', section: 'preconception', title: t('الخصوبة والإباضة', 'Fertility & ovulation') },
  { id: 'cycle', section: 'preconception', title: t('الدورة الشهرية', 'Menstrual cycle') },
  { id: 'supplements', section: 'preconception', title: t('التغذية والمكملات', 'Nutrition & supplements') },
  { id: 'chronic', section: 'preconception', title: t('الأمراض المزمنة والأدوية', 'Chronic conditions & medicines') },
  { id: 'counseling', section: 'preconception', title: t('الاستشارة والاستعداد النفسي', 'Counselling & wellbeing') },

  // Pregnancy
  { id: 'trimester-1', section: 'pregnancy', title: t('الثلث الأول', 'First trimester') },
  { id: 'trimester-2', section: 'pregnancy', title: t('الثلث الثاني', 'Second trimester') },
  { id: 'trimester-3', section: 'pregnancy', title: t('الثلث الثالث', 'Third trimester') },
  { id: 'development', section: 'pregnancy', title: t('تطور الجنين', 'Fetal development') },
  { id: 'changes', section: 'pregnancy', title: t('تغيرات الأم', 'Maternal changes') },
  { id: 'tests', section: 'pregnancy', title: t('الفحوصات والسونار', 'Tests & ultrasound') },
  { id: 'nutrition', section: 'pregnancy', title: t('التغذية والنشاط', 'Nutrition & activity') },
  { id: 'discomforts', section: 'pregnancy', title: t('الاضطرابات الشائعة', 'Common discomforts') },
  { id: 'safety', section: 'pregnancy', title: t('السلامة وعلامات الخطر', 'Safety & danger signs') },
  { id: 'mental', section: 'pregnancy', title: t('الصحة النفسية', 'Mental health') },

  // Labor
  { id: 'signs', section: 'labor', title: t('علامات المخاض', 'Signs of labour') },
  { id: 'stages', section: 'labor', title: t('مراحل الولادة', 'Stages of labour') },
  { id: 'vaginal', section: 'labor', title: t('الولادة الطبيعية', 'Vaginal birth') },
  { id: 'cesarean', section: 'labor', title: t('الولادة القيصرية', 'Cesarean birth') },
  { id: 'pain', section: 'labor', title: t('تسكين الألم', 'Pain management') },
  { id: 'preparation', section: 'labor', title: t('التحضير للولادة', 'Preparation') },
  { id: 'complications', section: 'labor', title: t('مضاعفات المخاض', 'Complications') },
  { id: 'immediate', section: 'labor', title: t('الرعاية الفورية', 'Immediate care') },

  // Postpartum
  { id: 'recovery', section: 'postpartum', title: t('التعافي', 'Recovery') },
  { id: 'assessment', section: 'postpartum', title: t('التقييم بعد الولادة', 'Postpartum assessment') },
  { id: 'bleeding', section: 'postpartum', title: t('النزيف بعد الولادة', 'Postpartum bleeding') },
  { id: 'wound', section: 'postpartum', title: t('العناية بالجرح', 'Wound care') },
  { id: 'nutrition', section: 'postpartum', title: t('التغذية والراحة', 'Nutrition & rest') },
  { id: 'mental', section: 'postpartum', title: t('الصحة النفسية', 'Mental health') },
  { id: 'followup', section: 'postpartum', title: t('المتابعة وتنظيم الأسرة', 'Follow-up & family planning') },

  // Newborn
  { id: 'assessment', section: 'newborn', title: t('تقييم المولود', 'Newborn assessment') },
  { id: 'cord', section: 'newborn', title: t('الحبل السري والنظافة', 'Cord & hygiene') },
  { id: 'jaundice', section: 'newborn', title: t('اليرقان', 'Jaundice') },
  { id: 'temperature', section: 'newborn', title: t('الحرارة والنوم الآمن', 'Temperature & safe sleep') },
  { id: 'danger', section: 'newborn', title: t('علامات الخطر', 'Danger signs') },
  { id: 'vaccines', section: 'newborn', title: t('التطعيمات والنمو', 'Vaccines & growth') },
  { id: 'preterm', section: 'newborn', title: t('رعاية الخدج', 'Preterm infants') },

  // Feeding
  { id: 'basics', section: 'feeding', title: t('أساسيات الرضاعة', 'Breastfeeding basics') },
  { id: 'latch', section: 'feeding', title: t('الإمساك والإرضاع', 'Latch & positioning') },
  { id: 'problems', section: 'feeding', title: t('مشكلات الرضاعة', 'Breastfeeding problems') },
  { id: 'storage', section: 'feeding', title: t('شفط الحليب وتخزينه', 'Expressing & storage') },
  { id: 'formula', section: 'feeding', title: t('الحليب الصناعي', 'Formula feeding') },
  { id: 'complementary', section: 'feeding', title: t('التغذية التكميلية', 'Complementary feeding') },
  { id: 'maternal-diet', section: 'feeding', title: t('تغذية الأم المرضعة', 'The nursing mother’s diet') },
];

const categoryMap = new Map(categories.map((item) => [item.id, item]));

export function getCategory(id: string): Category | undefined {
  return categoryMap.get(id);
}

export function getSection(id: SectionId): SectionMeta {
  return sections.find((item) => item.id === id) ?? sections[0];
}

export function categoriesOf(section: SectionId): Category[] {
  return categories.filter((item) => item.section === section);
}
