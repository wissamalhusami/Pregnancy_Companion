import type { Bi } from '../lib/types';

export interface AntenatalContact {
  week: number;
  focus: Bi;
  checks: Bi[];
}

/** WHO 2016 eight-contact antenatal care model. */
export const antenatalContacts: AntenatalContact[] = [
  {
    week: 12,
    focus: {
      ar: 'الزيارة الأولى: تأكيد الحمل وتحديد العمر الحملي',
      en: 'First contact: confirm pregnancy and establish gestational age',
    },
    checks: [
      { ar: 'التاريخ الصحي والفحص السريري الكامل', en: 'Full history and clinical examination' },
      { ar: 'قياس ضغط الدم والوزن والطول', en: 'Blood pressure, weight and height' },
      { ar: 'تحاليل الدم الأساسية والبول', en: 'Baseline blood tests and urine analysis' },
      { ar: 'حساب تاريخ الولادة المتوقع', en: 'Calculate the estimated due date' },
      { ar: 'بدء حمض الفوليك ومكملات الحديد', en: 'Start folic acid and iron supplementation' },
    ],
  },
  {
    week: 20,
    focus: { ar: 'متابعة نمو الجنين والفحص التفصيلي', en: 'Fetal growth review and detailed scan' },
    checks: [
      { ar: 'قياس ارتفاع قاع الرحم', en: 'Measure fundal height' },
      { ar: 'سماع نبض الجنين', en: 'Listen to the fetal heartbeat' },
      { ar: 'فحص الموجات فوق الصوتية التفصيلي', en: 'Detailed ultrasound scan' },
      { ar: 'مراجعة التحاليل السابقة', en: 'Review previous results' },
    ],
  },
  {
    week: 26,
    focus: { ar: 'متابعة النمو والتغذية والوزن', en: 'Growth, nutrition and weight review' },
    checks: [
      { ar: 'قياس ضغط الدم والوزن', en: 'Blood pressure and weight' },
      { ar: 'مراجعة الأعراض وحركة الجنين', en: 'Review symptoms and fetal movements' },
      { ar: 'تحليل سكري الحمل (24–28 أسبوعاً)', en: 'Gestational diabetes test (24–28 weeks)' },
      { ar: 'التثقيف حول علامات الخطر', en: 'Education on danger signs' },
    ],
  },
  {
    week: 30,
    focus: { ar: 'تقييم النمو ووضعية الجنين', en: 'Assess growth and fetal position' },
    checks: [
      { ar: 'قياس ضغط الدم والوزن وارتفاع قاع الرحم', en: 'Blood pressure, weight and fundal height' },
      { ar: 'تقييم وضعية الجنين', en: 'Assess the baby’s position' },
      { ar: 'مراجعة تحليل السكري والهيموغلوبين', en: 'Review glucose and haemoglobin results' },
      { ar: 'التخطيط للولادة والمكان المناسب', en: 'Discuss birth planning and place of birth' },
    ],
  },
  {
    week: 34,
    focus: { ar: 'الاستعداد للولادة والرضاعة', en: 'Preparation for birth and breastfeeding' },
    checks: [
      { ar: 'متابعة النمو وضغط الدم', en: 'Growth and blood pressure review' },
      { ar: 'التثقيف حول علامات الولادة', en: 'Education on signs of labor' },
      { ar: 'التخطيط لحقيبة الولادة', en: 'Hospital bag planning' },
      { ar: 'التحضير للرضاعة الطبيعية', en: 'Breastfeeding preparation' },
    ],
  },
  {
    week: 36,
    focus: { ar: 'زيارات أسبوعية ومراجعة خطة الولادة', en: 'Weekly visits and birth plan review' },
    checks: [
      { ar: 'تقييم وضعية الجنين', en: 'Fetal position assessment' },
      { ar: 'فحص GBS بين 35 و37 أسبوعاً', en: 'GBS screening at 35–37 weeks' },
      { ar: 'مراجعة خطة الولادة', en: 'Review the birth plan' },
    ],
  },
  {
    week: 38,
    focus: { ar: 'مراقبة علامات الولادة', en: 'Monitoring for signs of labor' },
    checks: [
      { ar: 'قياس ضغط الدم والوزن', en: 'Blood pressure and weight' },
      { ar: 'تقييم حركة الجنين', en: 'Fetal movement assessment' },
      { ar: 'التأكد من جاهزية المستشفى والمرافق', en: 'Confirm hospital readiness and support person' },
    ],
  },
  {
    week: 40,
    focus: { ar: 'متابعة ما بعد تاريخ الولادة المتوقع', en: 'Follow-up around and beyond the due date' },
    checks: [
      { ar: 'تقييم صحة الأم والجنين', en: 'Assess maternal and fetal wellbeing' },
      { ar: 'مناقشة خيارات تحفيز الولادة إذا لزم', en: 'Discuss induction options if needed' },
      { ar: 'مراجعة علامات الخطر والولادة', en: 'Review danger signs and labor signs' },
    ],
  },
];

export interface LabTest {
  id: string;
  name: Bi;
  timing: Bi;
  purpose: Bi;
}

export const labTests: LabTest[] = [
  {
    id: 'cbc',
    name: { ar: 'صورة الدم الكاملة (CBC)', en: 'Complete blood count (CBC)' },
    timing: { ar: 'الزيارة الأولى، وتُعاد في الثلث الثالث', en: 'First visit, repeated in the third trimester' },
    purpose: {
      ar: 'الكشف عن فقر الدم (نقص الهيموغلوبين) ومشكلات الصفائح الدموية.',
      en: 'Detects anaemia (low haemoglobin) and platelet problems.',
    },
  },
  {
    id: 'blood-group',
    name: { ar: 'فصيلة الدم وعامل Rh', en: 'Blood group and Rh factor' },
    timing: { ar: 'الزيارة الأولى', en: 'First visit' },
    purpose: {
      ar: 'لتحديد الحاجة إلى إبرة Anti-D عند الأم السالبة العامل، وللتحضير لأي نقل دم.',
      en: 'Identifies the need for anti-D immunoglobulin in Rh-negative mothers and prepares for transfusion if needed.',
    },
  },
  {
    id: 'glucose',
    name: { ar: 'سكري الحمل (GTT)', en: 'Gestational diabetes test (GTT)' },
    timing: { ar: 'بين 24 و28 أسبوعاً', en: 'Between 24 and 28 weeks' },
    purpose: {
      ar: 'الكشف عن سكري الحمل لتفادي مضاعفات على الأم والجنين.',
      en: 'Screens for gestational diabetes to prevent maternal and fetal complications.',
    },
  },
  {
    id: 'urine',
    name: { ar: 'تحليل ومزرعة البول', en: 'Urine analysis and culture' },
    timing: { ar: 'الزيارة الأولى وكل زيارة', en: 'First visit and each visit' },
    purpose: {
      ar: 'الكشف عن البروتين (تسمم الحمل) والتهاب المسالك البولية.',
      en: 'Detects protein (pre-eclampsia) and urinary tract infection.',
    },
  },
  {
    id: 'hiv',
    name: { ar: 'فحص فيروس نقص المناعة (HIV)', en: 'HIV screening' },
    timing: { ar: 'الزيارة الأولى', en: 'First visit' },
    purpose: {
      ar: 'الوقاية من انتقال الفيروس للطفل عبر العلاج المناسب.',
      en: 'Prevents mother-to-child transmission through appropriate treatment.',
    },
  },
  {
    id: 'hbsag',
    name: { ar: 'التهاب الكبد ب (HBsAg)', en: 'Hepatitis B (HBsAg)' },
    timing: { ar: 'الزيارة الأولى', en: 'First visit' },
    purpose: {
      ar: 'حماية المولود بالتطعيم والغلوبولين المناعي عند الحاجة.',
      en: 'Protects the newborn with vaccination and immunoglobulin when indicated.',
    },
  },
  {
    id: 'syphilis',
    name: { ar: 'فحص الزهري', en: 'Syphilis screening' },
    timing: { ar: 'الزيارة الأولى', en: 'First visit' },
    purpose: {
      ar: 'علاج الأم يمنع انتقال العدوى إلى الجنين.',
      en: 'Treating the mother prevents transmission to the fetus.',
    },
  },
  {
    id: 'rubella',
    name: { ar: 'مناعة الحصبة الألمانية', en: 'Rubella immunity' },
    timing: { ar: 'الزيارة الأولى', en: 'First visit' },
    purpose: {
      ar: 'معرفة الحاجة للتطعيم بعد الولادة لحماية الحمل القادم.',
      en: 'Identifies the need for postpartum vaccination to protect a future pregnancy.',
    },
  },
  {
    id: 'us-first',
    name: { ar: 'موجات فوق صوتية مبكرة', en: 'Early ultrasound' },
    timing: { ar: 'بين 11 و13+6 أسبوعاً', en: 'Between 11 and 13+6 weeks' },
    purpose: {
      ar: 'تأكيد العمر الحملي وعدد الأجنة وتقييم نمو الجنين المبكر.',
      en: 'Confirms dating, number of fetuses and early fetal development.',
    },
  },
  {
    id: 'us-anomaly',
    name: { ar: 'الفحص التفصيلي للجنين', en: 'Detailed anomaly scan' },
    timing: { ar: 'حوالي 20 أسبوعاً', en: 'Around 20 weeks' },
    purpose: {
      ar: 'تقييم أعضاء الجنين ونموه ووضع المشيمة.',
      en: 'Assesses fetal organs, growth and placental position.',
    },
  },
  {
    id: 'gbs',
    name: { ar: 'المكورات العقدية B (GBS)', en: 'Group B streptococcus (GBS)' },
    timing: { ar: 'بين 35 و37 أسبوعاً', en: 'Between 35 and 37 weeks' },
    purpose: {
      ar: 'الوقاية من عدوى المولود أثناء الولادة بمضاد حيوي مناسب.',
      en: 'Prevents newborn infection during birth with appropriate antibiotics.',
    },
  },
  {
    id: 'ferritin',
    name: { ar: 'مخزون الحديد (Ferritin)', en: 'Iron stores (ferritin)' },
    timing: { ar: 'عند الاشتباه بفقر الدم', en: 'When anaemia is suspected' },
    purpose: {
      ar: 'تقييم مخزون الحديد لتحديد الحاجة لمكملات إضافية.',
      en: 'Assesses iron stores to decide on extra supplementation.',
    },
  },
];

/** Routine measurements recorded at every antenatal contact. */
export const routineChecks: Bi[] = [
  { ar: 'ضغط الدم في كل زيارة', en: 'Blood pressure at every visit' },
  { ar: 'الوزن ومؤشر كتلة الجسم', en: 'Weight and body mass index' },
  { ar: 'تحليل البول للبروتين', en: 'Urine test for protein' },
  { ar: 'ارتفاع قاع الرحم بعد الأسبوع 20', en: 'Fundal height from 20 weeks' },
  { ar: 'نبض الجنين بعد الأسبوع 20', en: 'Fetal heartbeat from 20 weeks' },
  { ar: 'مراجعة حركة الجنين من الأسبوع 28', en: 'Fetal movement review from 28 weeks' },
];
