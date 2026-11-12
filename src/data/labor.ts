import type { Bi } from '../lib/types';

export interface LaborSign {
  id: string;
  title: Bi;
  detail: Bi;
}

export const laborSigns: LaborSign[] = [
  {
    id: 'contractions',
    title: { ar: 'انقباضات منتظمة ومتزايدة', en: 'Regular, increasing contractions' },
    detail: {
      ar: 'تصلب الرحم مع ألم في الأسفل والظهر، يزداد قوة وتقارباً مع الوقت ولا يخف بالراحة.',
      en: 'A tightening uterus with lower abdominal and back pain that gets stronger and closer together and does not ease with rest.',
    },
  },
  {
    id: 'show',
    title: { ar: 'نزول السدادة المخاطية', en: 'Loss of the mucus plug' },
    detail: {
      ar: 'إفرازات مخاطية سميكة قد تكون مختلطة بخيط دم خفيف؛ قد تسبق الولادة بأيام.',
      en: 'Thick mucus discharge that may be streaked with a little blood; it can precede labor by days.',
    },
  },
  {
    id: 'waters',
    title: { ar: 'نزول السائل الأمنيوسي', en: 'Waters breaking' },
    detail: {
      ar: 'تدفق أو تسرب سائل شفاف من المهبل — اتصلي بقسم الولادة فوراً وسجلي الوقت واللون.',
      en: 'A gush or trickle of clear fluid — call your maternity unit immediately and note the time and colour.',
    },
  },
  {
    id: 'backache',
    title: { ar: 'ألم مستمر أسفل الظهر', en: 'Persistent lower back pain' },
    detail: {
      ar: 'ألم ظهر متواصل مع ضغط في الحوض قد يكون من علامات بدء الولادة.',
      en: 'Continuous backache with pelvic pressure can be a sign that labor is starting.',
    },
  },
  {
    id: 'nesting',
    title: { ar: 'نشاط ورغبة في الترتيب', en: 'A burst of energy or nesting' },
    detail: {
      ar: 'بعض النساء يشعرن بنشاط مفاجئ أو رغبة في ترتيب المنزل قبل الولادة بساعات.',
      en: 'Some women feel a sudden burst of energy or a urge to tidy up hours before labor.',
    },
  },
];

export interface LaborStage {
  number: number;
  name: Bi;
  duration: Bi;
  what: Bi;
  role: Bi;
}

export const laborStages: LaborStage[] = [
  {
    number: 1,
    name: { ar: 'المرحلة الأولى: توسع عنق الرحم', en: 'First stage: cervical dilatation' },
    duration: { ar: 'من ساعات إلى أكثر من 12 ساعة في الحمل الأول', en: 'From hours to more than 12 hours in a first pregnancy' },
    what: {
      ar: 'تبدأ الانقباضات المنتظمة ويتوسع عنق الرحم تدريجياً حتى 10 سم، وتنقسم إلى طور كامن وطور نشط.',
      en: 'Regular contractions begin and the cervix gradually opens to 10 cm, in a latent and then an active phase.',
    },
    role: {
      ar: 'تنفسي ببطء، غيري وضعيتك، اشربي سوائل، واطلبي تخفيف الألم إذا احتجت.',
      en: 'Breathe slowly, change position, sip fluids, and ask for pain relief if you need it.',
    },
  },
  {
    number: 2,
    name: { ar: 'المرحلة الثانية: ولادة الطفل', en: 'Second stage: birth of the baby' },
    duration: { ar: 'غالباً من 30 دقيقة إلى ساعتين في الحمل الأول', en: 'Usually 30 minutes to 2 hours in a first pregnancy' },
    what: {
      ar: 'يكتمل توسع عنق الرحم، وتدفع الأم مع الانقباضات حتى خروج الطفل ثم يُوضع على صدرها.',
      en: 'The cervix is fully open and the mother pushes with contractions until the baby is born and placed on her chest.',
    },
    role: {
      ar: 'اتبعي توجيهات القابلة، ادفعي مع الانقباضة، واستريحي بينها، واطلبي التلامس الجلدي المباشر.',
      en: 'Follow your midwife’s guidance, push with contractions, rest between them, and ask for skin-to-skin contact.',
    },
  },
  {
    number: 3,
    name: { ar: 'المرحلة الثالثة: خروج المشيمة', en: 'Third stage: delivery of the placenta' },
    duration: { ar: 'عادةً 5 إلى 30 دقيقة بعد الولادة', en: 'Usually 5 to 30 minutes after birth' },
    what: {
      ar: 'تنفصل المشيمة وتخرج، ويتحقق الفريق من عدم وجود نزيف غير طبيعي.',
      en: 'The placenta separates and is delivered while the team checks for abnormal bleeding.',
    },
    role: {
      ar: 'ابقَي مرتاحة مع الطفل على صدرك، وأبلغي الفريق فوراً إذا شعرت بنزيف غزير.',
      en: 'Stay comfortable with your baby on your chest, and tell the team immediately about heavy bleeding.',
    },
  },
];

export interface BagItem {
  id: string;
  category: 'documents' | 'mother' | 'baby' | 'comfort';
  name: Bi;
}

export const bagItems: BagItem[] = [
  { id: 'bag-1', category: 'documents', name: { ar: 'بطاقة الحمل وسجل المتابعة', en: 'Antenatal card and follow-up record' } },
  { id: 'bag-2', category: 'documents', name: { ar: 'الهوية / جواز السفر', en: 'ID / passport' } },
  { id: 'bag-3', category: 'documents', name: { ar: 'تأمين صحي أو وثائق الدفع', en: 'Health insurance or payment documents' } },
  { id: 'bag-4', category: 'documents', name: { ar: 'خطة الولادة مطبوعة', en: 'Printed birth plan' } },
  { id: 'bag-5', category: 'mother', name: { ar: 'قميصان للولادة مريحان', en: 'Two comfortable birthing gowns' } },
  { id: 'bag-6', category: 'mother', name: { ar: 'ملابس قطنية بعد الولادة', en: 'Cotton clothing for after birth' } },
  { id: 'bag-7', category: 'mother', name: { ar: 'فوط صحية كبيرة (ما بعد الولادة)', en: 'Large maternity pads' } },
  { id: 'bag-8', category: 'mother', name: { ar: 'حمالات صدر للرضاعة', en: 'Breastfeeding bras' } },
  { id: 'bag-9', category: 'mother', name: { ar: 'مستلزمات النظافة الشخصية', en: 'Personal hygiene items' } },
  { id: 'bag-10', category: 'mother', name: { ar: 'شبشب وروب', en: 'Slippers and a robe' } },
  { id: 'bag-11', category: 'mother', name: { ar: 'أدوية موصوفة (حديد، فيتامينات)', en: 'Prescribed medicines (iron, vitamins)' } },
  { id: 'bag-12', category: 'baby', name: { ar: 'ملابس قطنية للمولود', en: 'Cotton baby clothes' } },
  { id: 'bag-13', category: 'baby', name: { ar: 'حفاضات للمولود', en: 'Newborn nappies' } },
  { id: 'bag-14', category: 'baby', name: { ar: 'بطانية خفيفة', en: 'Light blanket' } },
  { id: 'bag-15', category: 'baby', name: { ar: 'قبعة وجوارب صغيرة', en: 'Small hat and socks' } },
  { id: 'bag-16', category: 'baby', name: { ar: 'مناديل قطنية ومرهم حماية', en: 'Cotton wipes and barrier cream' } },
  { id: 'bag-17', category: 'baby', name: { ar: 'كرسي سيارة للمولود', en: 'Infant car seat' } },
  { id: 'bag-18', category: 'comfort', name: { ar: 'زجاجة ماء ووجبات خفيفة', en: 'Water bottle and snacks' } },
  { id: 'bag-19', category: 'comfort', name: { ar: 'شاحن هاتف وبطارية إضافية', en: 'Phone charger and power bank' } },
  { id: 'bag-20', category: 'comfort', name: { ar: 'وسادة مريحة', en: 'Comfortable pillow' } },
  { id: 'bag-21', category: 'comfort', name: { ar: 'كريم شفاه ومرطب', en: 'Lip balm and moisturiser' } },
  { id: 'bag-22', category: 'comfort', name: { ar: 'موسيقى أو كتاب للاسترخاء', en: 'Music or a book to relax' } },
  { id: 'bag-23', category: 'comfort', name: { ar: 'ملاحظات ودفتر صغير', en: 'Notepad for questions' } },
  { id: 'bag-24', category: 'comfort', name: { ar: 'جوارب دافئة', en: 'Warm socks' } },
];

export const bagCategories: { id: BagItem['category']; name: Bi }[] = [
  { id: 'documents', name: { ar: 'الوثائق', en: 'Documents' } },
  { id: 'mother', name: { ar: 'للأم', en: 'For mother' } },
  { id: 'baby', name: { ar: 'للمولود', en: 'For baby' } },
  { id: 'comfort', name: { ar: 'الراحة', en: 'Comfort' } },
];

export interface BreathingTechnique {
  id: string;
  name: Bi;
  instruction: Bi;
  inhale: number;
  hold: number;
  exhale: number;
}

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: 'slow',
    name: { ar: 'تنفس بطيء هادئ', en: 'Slow calm breathing' },
    instruction: {
      ar: 'شهيق من الأنف 4 ثوان، حبس خفيف 4 ثوان، زفير طويل من الفم 6 ثوان. كرري بين الانقباضات.',
      en: 'Inhale through the nose for 4 s, hold gently for 4 s, exhale long through the mouth for 6 s. Repeat between contractions.',
    },
    inhale: 4,
    hold: 4,
    exhale: 6,
  },
  {
    id: 'pattern',
    name: { ar: 'تنفس 4–7–8', en: '4–7–8 breathing' },
    instruction: {
      ar: 'شهيق 4 ثوان، حبس 7 ثوان، زفير 8 ثوان. مفيد لتخفيف التوتر والقلق.',
      en: 'Inhale 4 s, hold 7 s, exhale 8 s. Useful for easing tension and anxiety.',
    },
    inhale: 4,
    hold: 7,
    exhale: 8,
  },
  {
    id: 'paced',
    name: { ar: 'تنفس مع الانقباضة', en: 'Breathing with a contraction' },
    instruction: {
      ar: 'شهيق 4 ثوان ثم زفير 4 ثوان بانتظام مع التركيز على نقطة واحدة في الغرفة.',
      en: 'Inhale 4 s and exhale 4 s evenly while focusing on one point in the room.',
    },
    inhale: 4,
    hold: 0,
    exhale: 4,
  },
];

export const laborTip: Bi = {
  ar: 'اتصلي بقسم الولادة إذا كانت الانقباضات منتظمة كل 5 دقائق لمدة ساعة، أو إذا نزل السائل الأمنيوسي، أو حدث نزيف، أو قلّت حركة الجنين.',
  en: 'Call your maternity unit when contractions are regular every 5 minutes for an hour, or if your waters break, you bleed, or movements reduce.',
};
