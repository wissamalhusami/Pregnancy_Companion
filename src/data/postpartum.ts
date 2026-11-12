import type { Bi } from '../lib/types';

export interface RecoveryStage {
  id: string;
  when: Bi;
  what: Bi;
}

export const recoveryTimeline: RecoveryStage[] = [
  {
    id: 'first-24h',
    when: { ar: 'أول 24 ساعة', en: 'First 24 hours' },
    what: {
      ar: 'راحة ومراقبة النزيف وانقباض الرحم، وبدء الرضاعة والتلامس الجلدي. يُنصح بالحركة الخفيفة المبكرة.',
      en: 'Rest, monitor bleeding and uterine contractions, and start breastfeeding and skin-to-skin contact. Early gentle movement is encouraged.',
    },
  },
  {
    id: 'first-week',
    when: { ar: 'الأسبوع الأول', en: 'First week' },
    what: {
      ar: 'يتحول النزيف إلى إفرازات وردية ثم بنية، ويتراجع حجم الرحم. راقبي علامات العدوى والحرارة.',
      en: 'Bleeding changes to pink then brown discharge and the uterus shrinks. Watch for signs of infection and fever.',
    },
  },
  {
    id: 'weeks-2-6',
    when: { ar: 'من الأسبوع 2 إلى 6', en: 'Weeks 2 to 6' },
    what: {
      ar: 'يتعافى جرح الولادة أو القيصرية، وتعود الطاقة تدريجياً. استمري في تمارين الحوض الخفيفة.',
      en: 'A birth tear or caesarean wound heals and energy returns gradually. Continue gentle pelvic floor exercises.',
    },
  },
  {
    id: 'after-6w',
    when: { ar: 'بعد 6 أسابيع', en: 'After 6 weeks' },
    what: {
      ar: 'زيارة المتابعة بعد الولادة: فحص الرحم والجرح وضغط الدم والحالة النفسية ومناقشة وسائل تنظيم الأسرة.',
      en: 'Postnatal check-up: review the uterus, wound, blood pressure and emotional wellbeing, and discuss contraception.',
    },
  },
];

export const postpartumDanger: { id: string; title: Bi; detail: Bi }[] = [
  {
    id: 'bleeding',
    title: { ar: 'نزيف غزير بعد الولادة', en: 'Heavy bleeding after birth' },
    detail: {
      ar: 'ت soaking فوطتين في ساعة، أو خروج كتل دموية كبيرة، أو نزيف متجدد — حالة طارئة.',
      en: 'Soaking two pads in an hour, passing large clots or bleeding that restarts is an emergency.',
    },
  },
  {
    id: 'fever',
    title: { ar: 'حرارة مرتفعة أو رعشة', en: 'Fever or chills' },
    detail: {
      ar: 'حرارة 38°م أو أكثر مع ألم أسفل البطن أو إفرازات كريهة قد تعني عدوى تحتاج علاجاً.',
      en: 'A temperature of 38 °C or more with lower abdominal pain or offensive discharge may mean infection needing treatment.',
    },
  },
  {
    id: 'headache',
    title: { ar: 'صداع شديد أو تشوش رؤية', en: 'Severe headache or blurred vision' },
    detail: {
      ar: 'قد يشير إلى ارتفاع ضغط الدم بعد الولادة أو تسمم الحمل — يحتاج تقييماً عاجلاً.',
      en: 'May indicate postpartum high blood pressure or pre-eclampsia — needs urgent assessment.',
    },
  },
  {
    id: 'breath',
    title: { ar: 'ضيق نفس أو ألم في الصدر', en: 'Shortness of breath or chest pain' },
    detail: {
      ar: 'يحتاج تقييماً فورياً لاستبعاد الجلطات أو مضاعفات القلب.',
      en: 'Needs immediate assessment to exclude clots or cardiac complications.',
    },
  },
  {
    id: 'wound',
    title: { ar: 'احمرار أو صديد من جرح الولادة', en: 'Redness or pus from the birth wound' },
    detail: {
      ar: 'علامات عدوى الجرح أو الغرز تحتاج مراجعة سريعة.',
      en: 'Signs of wound or stitch infection need prompt review.',
    },
  },
  {
    id: 'mood',
    title: { ar: 'حزن شديد أو أفكار إيذاء النفس', en: 'Severe low mood or thoughts of self-harm' },
    detail: {
      ar: 'اكتئاب ما بعد الولادة قابل للعلاج؛ اطلبي المساعدة فوراً إذا استمر الحزن أو ازداد.',
      en: 'Postpartum depression is treatable; seek help immediately if low mood persists or worsens.',
    },
  },
];

export const breastfeedingSupport: Bi[] = [
  {
    ar: 'أرضعي عند الطلب، بما لا يقل عن 8 مرات في 24 ساعة في الأسابيع الأولى.',
    en: 'Feed on demand, at least 8 times in 24 hours in the first weeks.',
  },
  {
    ar: 'تأكدي من الإمساك الجيد والبلع المسموع، ومن 6 حفاضات مبللة على الأقل يومياً.',
    en: 'Check for a good latch and audible swallowing, and at least 6 wet nappies a day.',
  },
  {
    ar: 'اشربي سوائل كافية وتناولي وجبات منتظمة؛ لا تحتاجين حمية خاصة للرضاعة.',
    en: 'Drink enough fluids and eat regular meals; no special diet is required for breastfeeding.',
  },
  {
    ar: 'اطلبي مساعدة مختص الرضاعة إذا استمر الألم أو لم يزد وزن الطفل.',
    en: 'Ask a lactation specialist if pain persists or the baby is not gaining weight.',
  },
  {
    ar: 'الرضاعة بالضخ والحفظ ممكنة إذا احتجت للعودة للعمل أو الدارسة.',
    en: 'Expressing and storing milk is possible if you return to work or study.',
  },
];

export const newbornCare: Bi[] = [
  {
    ar: 'حافظي على الحبل السري جافاً ونظيفاً حتى يسقط خلال 1–2 أسبوع.',
    en: 'Keep the umbilical cord dry and clean until it falls off within 1–2 weeks.',
  },
  {
    ar: 'ضعي المولود للنوم على ظهره في سرير ثابت ومرتبة صلبة بدون وسائد أو ألعاب.',
    en: 'Place the baby to sleep on the back on a firm mattress, without pillows or toys.',
  },
  {
    ar: 'الرضاعة عند الطلب: 8–12 مرة يومياً، وعلامات الجوع هي مصّ اليدين والبحث بالفم.',
    en: 'Feed on demand, 8–12 times a day; hunger cues include hand sucking and rooting.',
  },
  {
    ar: 'راجعي الطبيب إذا ظهر اصفرار متزايد، خمول شديد، حرارة، أو قلة تبول.',
    en: 'See a doctor for increasing jaundice, marked sleepiness, fever or reduced urine output.',
  },
  {
    ar: 'تطعيمات المولود حسب جدول التحصين الوطني، مع متابعة الوزن في الأسابيع الأولى.',
    en: 'Follow the national immunisation schedule and attend early weight checks.',
  },
  {
    ar: 'اغسلي يديك قبل التعامل مع المولود ولا تسمحي للمرضى بحمله.',
    en: 'Wash your hands before handling the baby and keep visitors with infections away.',
  },
];

export const postpartumCheckup: Bi = {
  ar: 'راجعي مقدم الرعاية خلال 24 ساعة من الولادة، ثم في الأسبوع الأول، ثم بعد 6 أسابيع — وفق توصيات منظمة الصحة العالمية لرعاية ما بعد الولادة.',
  en: 'Have a check-up within 24 hours of birth, again in the first week, and at about 6 weeks, following WHO postnatal care recommendations.',
};
