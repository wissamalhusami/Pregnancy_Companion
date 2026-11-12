import type { Bi } from '../lib/types';

export const bfBenefits: Bi[] = [
  {
    ar: 'يحتوي حليب الأم على أجسام مضادة تحمي الطفل من الالتهابات والإسهال والعدوى التنفسية.',
    en: 'Breast milk contains antibodies that protect the baby from infections, diarrhoea and respiratory illness.',
  },
  {
    ar: 'تركيبته تتغير حسب عمر الطفل واحتياجه، وهو غذاء كامل في الأشهر الستة الأولى.',
    en: 'Its composition adapts to the baby’s age and needs, and it is complete nutrition for the first six months.',
  },
  {
    ar: 'يقلل خطر الربو والحساسية والسمنة والسكري في مراحل لاحقة من العمر.',
    en: 'It lowers the risk of asthma, allergy, obesity and diabetes later in life.',
  },
  {
    ar: 'يساعد الرحم على الانقباض والعودة لحجمه، ويقلل النزيف بعد الولادة.',
    en: 'It helps the uterus contract back to size and reduces bleeding after birth.',
  },
  {
    ar: 'يبني ارتباطاً عاطفياً قوياً بين الأم والطفل ويوفر الراحة والأمان.',
    en: 'It builds a strong emotional bond between mother and baby and provides comfort and security.',
  },
  {
    ar: 'عملي واقتصادي: متوفر دائماً بالحرارة المناسبة دون تجهيز أو تعقيم.',
    en: 'It is practical and economical: always available at the right temperature, with no preparation or sterilising.',
  },
];

export interface BFPosition {
  id: string;
  name: Bi;
  how: Bi;
}

export const bfPositions: BFPosition[] = [
  {
    id: 'cradle',
    name: { ar: 'الحضن (Cradle)', en: 'Cradle hold' },
    how: {
      ar: 'اجلسي مستندة، ضعي رأس الطفل في ثنية مرفقك على نفس الجهة، وبطنه ملاصق لبطنه وأنفه مقابل الحلمة.',
      en: 'Sit supported, rest the baby’s head in the crook of your elbow on the same side, tummy to tummy, nose opposite the nipple.',
    },
  },
  {
    id: 'cross',
    name: { ar: 'الحضن المتقاطع', en: 'Cross-cradle hold' },
    how: {
      ar: 'ادعمي رأس الطفل باليد المعاكسة للثدي، ما يمنحك تحكماً أفضل في توجيه رأسه خاصة في الأسابيع الأولى.',
      en: 'Support the baby’s head with the hand opposite the breast, giving better control of head placement, especially in the first weeks.',
    },
  },
  {
    id: 'football',
    name: { ar: 'وضع كرة القدم (تحت الإبط)', en: 'Football (underarm) hold' },
    how: {
      ar: 'ضعي الطفل تحت ذراعك بجانبك مع دعم رأسه بيدك؛ مفيد بعد العملية القيصرية أو مع التوأم.',
      en: 'Tuck the baby under your arm at your side and support the head with your hand; helpful after a caesarean or with twins.',
    },
  },
  {
    id: 'side',
    name: { ar: 'الاستلقاء على الجانب', en: 'Side-lying position' },
    how: {
      ar: 'استلقي على جانبك والطفل بجانبك وجهاً لوجه؛ مريح للرضاعة الليلية وللتعافي بعد الولادة.',
      en: 'Lie on your side with the baby facing you; comfortable for night feeds and recovery after birth.',
    },
  },
];

export const latchSigns: Bi[] = [
  { ar: 'فم الطفل مفتوح على اتساعه وشفاهه مقلوبة للخارج.', en: 'The baby’s mouth is wide open with lips turned outward.' },
  { ar: 'يُمسك جزءاً كبيراً من الهالة وليس الحلمة فقط.', en: 'The baby takes a large part of the areola, not just the nipple.' },
  { ar: 'الذقن ملاصق للثدي والأنف قريب منه مع إمكانية التنفس.', en: 'The chin touches the breast and the nose is close but able to breathe.' },
  { ar: 'الخدود ممتلئة ولا تُسمع أصوات طقطقة أو مصّ جاف.', en: 'Cheeks are full and there are no clicking or smacking sounds.' },
  { ar: 'البلع مسموع بهدوء، والأم تشعر بشدّ خفيف غير مؤلم.', en: 'Swallowing is audible and the mother feels a gentle, pain-free tug.' },
  { ar: 'الحلمتان لا تتشققان ولا تؤلمان بعد الرضعة.', en: 'Nipples are not cracked or painful after the feed.' },
];

export interface BFProblem {
  id: string;
  problem: Bi;
  solution: Bi;
}

export const bfProblems: BFProblem[] = [
  {
    id: 'sore',
    problem: { ar: 'تشقق أو ألم الحلمتين', en: 'Sore or cracked nipples' },
    solution: {
      ar: 'صححي وضع الإمساك أولاً، ابدئي بالثدي الأقل ألماً، وجففي الحلمة بالهواء وضعي قطرات من حليبك عليها.',
      en: 'Correct the latch first, start with the less painful side, air-dry the nipples and apply a few drops of your own milk.',
    },
  },
  {
    id: 'engorgement',
    problem: { ar: 'احتقان الثدي وتصلبه', en: 'Breast engorgement' },
    solution: {
      ar: 'أرضعي بشكل متكرر، استخدمي كمادات دافئة قبل الرضاعة وباردة بعدها، وتأكدي من إفراغ الثدي جيداً.',
      en: 'Feed frequently, use warm compresses before feeds and cold packs afterwards, and make sure the breast empties well.',
    },
  },
  {
    id: 'mastitis',
    problem: { ar: 'التهاب الثدي (ألم مع حرارة واحمرار)', en: 'Mastitis (pain with fever and redness)' },
    solution: {
      ar: 'استمري في الرضاعة، وراجعي مقدم الرعاية خلال 24 ساعة لأن العلاج قد يحتاج مضاداً حيوياً.',
      en: 'Keep breastfeeding and see your provider within 24 hours, as antibiotics may be needed.',
    },
  },
  {
    id: 'low-supply',
    problem: { ar: 'القلق من قلة الحليب', en: 'Worry about low milk supply' },
    solution: {
      ar: 'أرضعي عند الطلب 8–12 مرة يومياً، وتأكدي من البلع والوزن والحفاضات المبللة بدلاً من التقدير بالشعور.',
      en: 'Feed on demand 8–12 times a day and check swallowing, weight and wet nappies rather than judging by feeling.',
    },
  },
  {
    id: 'flat',
    problem: { ar: 'الحلمات المسطحة أو المقلوبة', en: 'Flat or inverted nipples' },
    solution: {
      ar: 'استخدمي شفطاً لطيفاً أو وضعية مختلفة قبل الرضعة، واطلبي مساعدة مختص الرضاعة.',
      en: 'Use gentle suction or a different position before feeds, and ask a lactation specialist for help.',
    },
  },
  {
    id: 'jaundice',
    problem: { ar: 'خمول المولود أو اصفرار (يرقان)', en: 'A sleepy baby or jaundice' },
    solution: {
      ar: 'أيقظي الطفل للرضاعة كل 2–3 ساعات، وراجعي الطبيب فوراً إذا زاد الاصفرار أو قلّ التبول.',
      en: 'Wake the baby to feed every 2–3 hours, and see a doctor promptly if jaundice increases or wet nappies decrease.',
    },
  },
];

export const bfWhoNote: Bi = {
  ar: 'توصي منظمة الصحة العالمية بالرضاعة الطبيعية الحصرية حتى 6 أشهر، ثم إدخال الطعام التكميلي مع استمرار الرضاعة حتى عامين أو أكثر. أي مشكلة في الرضاعة تحتاج دعماً من مقدم الرعاية أو مختص الرضاعة.',
  en: 'WHO recommends exclusive breastfeeding for the first 6 months, then complementary foods alongside continued breastfeeding up to 2 years or beyond. Any feeding difficulty deserves support from your provider or a lactation specialist.',
};
