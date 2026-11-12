import type { Bi } from '../lib/types';

export interface DangerSign {
  id: string;
  /** Emoji-free icon key rendered by the Icon component. */
  icon: 'bleeding' | 'headache' | 'vision' | 'pain' | 'fluid' | 'movement' | 'convulsion';
  title: Bi;
  detail: Bi;
  why: Bi;
  action: Bi;
}

/**
 * Pregnancy danger signs based on WHO antenatal care guidance.
 * Educational content — never a diagnosis.
 */
export const dangerSigns: DangerSign[] = [
  {
    id: 'bleeding',
    icon: 'bleeding',
    title: { ar: 'نزيف من المهبل', en: 'Vaginal bleeding' },
    detail: {
      ar: 'أي نزيف أثناء الحمل — خفيف أو غزير، مع أو بدون ألم — ليس طبيعياً.',
      en: 'Any vaginal bleeding during pregnancy — light or heavy, with or without pain — is not normal.',
    },
    why: {
      ar: 'قد يشير إلى الإجهاض، الحمل خارج الرحم، المشيمة المنزاحة، أو انفصال المشيمة.',
      en: 'It may indicate miscarriage, ectopic pregnancy, placenta praevia or placental abruption.',
    },
    action: {
      ar: 'توجّهي فوراً إلى أقرب مستشفى ولا تنتظري. لا تستخدمي أي دواء أو فحص منزلي بديلاً.',
      en: 'Go to the nearest hospital immediately and do not wait. Do not use medication or home testing as a substitute.',
    },
  },
  {
    id: 'headache',
    icon: 'headache',
    title: { ar: 'صداع شديد مستمر', en: 'Severe persistent headache' },
    detail: {
      ar: 'صداع قوي لا يخف بالراحة أو الباراسيتامول، خاصة في الثلث الثالث.',
      en: 'A strong headache that does not ease with rest or paracetamol, especially in the third trimester.',
    },
    why: {
      ar: 'قد يكون علامة على ارتفاع ضغط الدم أو تسمم الحمل.',
      en: 'It can be a sign of high blood pressure or pre-eclampsia.',
    },
    action: {
      ar: 'قيسي ضغط الدم إن أمكن، وتوجّهي للطوارئ للتقييم فوراً.',
      en: 'Check your blood pressure if possible, and go to the emergency department for assessment.',
    },
  },
  {
    id: 'vision',
    icon: 'vision',
    title: { ar: 'تشوش أو ضبابية في الرؤية', en: 'Blurred or disturbed vision' },
    detail: {
      ar: 'عدم وضوح الرؤية، رؤية نقاط أو ومضات ضوئية، أو حساسية غير معتادة للضوء.',
      en: 'Blurred vision, seeing spots or flashing lights, or unusual light sensitivity.',
    },
    why: {
      ar: 'من العلامات التحذيرية المهمة لتسمم الحمل (ما قبل الإرجاج).',
      en: 'A key warning sign of pre-eclampsia.',
    },
    action: {
      ar: 'اطلبي رعاية عاجلة الآن؛ لا تنتظري موعد الزيارة القادمة.',
      en: 'Seek urgent care now; do not wait for your next appointment.',
    },
  },
  {
    id: 'pain',
    icon: 'pain',
    title: { ar: 'ألم شديد في البطن', en: 'Severe abdominal pain' },
    detail: {
      ar: 'ألم قوي ومستمر في البطن أو أسفل الظهر، أو ألم تحت الأضلاع.',
      en: 'Strong continuous abdominal or lower back pain, or pain under the ribs.',
    },
    why: {
      ar: 'قد يرتبط بانفصال المشيمة، تسمم الحمل، أو عدوى.',
      en: 'It may relate to placental abruption, pre-eclampsia or infection.',
    },
    action: {
      ar: 'توجّهي إلى المستشفى فوراً، وتجنبي الأكل والشرب حتى التقييم.',
      en: 'Go to hospital immediately and avoid eating or drinking until assessed.',
    },
  },
  {
    id: 'fluid',
    icon: 'fluid',
    title: { ar: 'تسرب السائل الأمنيوسي', en: 'Leakage of amniotic fluid' },
    detail: {
      ar: 'نزول سائل شفاف أو مائل للوردي من المهبل بشكل مستمر — قد يكون قطرات أو تدفقاً.',
      en: 'Continuous clear or pinkish fluid from the vagina — it may be a trickle or a gush.',
    },
    why: {
      ar: 'تمزق الأغشية قبل الولادة يزيد خطر العدوى ويحتاج تقييماً.',
      en: 'Rupture of membranes before labor increases infection risk and needs assessment.',
    },
    action: {
      ar: 'اتصلي بقسم الولادة فوراً، وسجّلي وقت بدء التسرب ولون السائل.',
      en: 'Call your maternity unit immediately, and note the time leakage started and the fluid colour.',
    },
  },
  {
    id: 'movement',
    icon: 'movement',
    title: { ar: 'قلة حركة الجنين أو تغيرها', en: 'Decreased or changed fetal movement' },
    detail: {
      ar: 'إذا قلّت الحركات عن نمط طفلك المعتاد، أو توقفت، خاصة بعد الأسبوع 28.',
      en: 'If movements are fewer than your baby’s usual pattern, or stop, especially after 28 weeks.',
    },
    why: {
      ar: 'قد يكون التغير مؤشراً على عدم راحة الجنين ويحتاج تقييماً سريعاً.',
      en: 'A change can indicate fetal compromise and needs prompt assessment.',
    },
    action: {
      ar: 'اتصلي بقسم الولادة فوراً؛ لا تنتظري حتى صباح اليوم التالي.',
      en: 'Contact your maternity unit immediately; do not wait until the next morning.',
    },
  },
  {
    id: 'convulsion',
    icon: 'convulsion',
    title: { ar: 'تشنجات أو فقدان الوعي', en: 'Convulsions or loss of consciousness' },
    detail: {
      ar: 'اهتزاز في الجسم، تصلب، أو إغماء — وهي حالة إسعافية.',
      en: 'Shaking, stiffness or fainting — this is a medical emergency.',
    },
    why: {
      ar: 'قد تشير إلى الإرجاج (تسمم حمل شديد) أو نقص سكر شديد.',
      en: 'It may indicate eclampsia (severe pre-eclampsia) or severe low blood sugar.',
    },
    action: {
      ar: 'اطلبي الإسعاف فوراً (101/112/999 حسب بلدك)، وضعي المريضة على جانبها وامنعي سقوطها.',
      en: 'Call an ambulance immediately (101/112/999 depending on your country), place her on her side and protect her from injury.',
    },
  },
];

export const emergencySteps: Bi[] = [
  {
    ar: 'اتصلي بخدمات الطوارئ أو قسم الولادة في المستشفى فوراً.',
    en: 'Call emergency services or the hospital maternity unit immediately.',
  },
  {
    ar: 'احملي بطاقة الحمل وجواز الهوية وأي أدوية تتناولينها.',
    en: 'Bring your antenatal card, ID and any medicines you take.',
  },
  {
    ar: 'لا تذهبي وحدك؛ اطلبي مرافقة شخص بالغ.',
    en: 'Do not travel alone; ask an adult to accompany you.',
  },
  {
    ar: 'لا تتناولي أدوية مسكنة أو أي علاج ذاتي قبل التقييم.',
    en: 'Do not take painkillers or self-medicate before assessment.',
  },
  {
    ar: 'أبلغي الفريق الطبي بأنك حامل وعدد أسابيع الحمل ووقت بدء العلامة.',
    en: 'Tell the team you are pregnant, your gestational age and when the sign started.',
  },
];

export const emergencyNote: Bi = {
  ar: 'العلامات أعلاه مستندة إلى التوجيهات المعتمدة لمنظمة الصحة العالمية لرعاية الحمل. لا توجد علامة واحدة تعني تشخيصاً مؤكداً، لكن أي منها يستوجب تقييماً طبياً عاجلاً.',
  en: 'These signs follow WHO antenatal care guidance. No single sign is a confirmed diagnosis, but any of them requires urgent medical assessment.',
};
