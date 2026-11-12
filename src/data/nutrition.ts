import type { Bi } from '../lib/types';

export interface Nutrient {
  id: string;
  name: Bi;
  why: Bi;
  amount: Bi;
  sources: Bi;
}

export const nutrients: Nutrient[] = [
  {
    id: 'folate',
    name: { ar: 'حمض الفوليك (الفولات)', en: 'Folic acid (folate)' },
    why: {
      ar: 'يساعد على الوقاية من عيوب الأنبوب العصبي (مثل السنسنة المشقوقة) في الجنين.',
      en: 'Helps prevent neural tube defects such as spina bifida in the baby.',
    },
    amount: { ar: '400 ميكروغرام يومياً قبل الحمل وخلال الثلث الأول', en: '400 µg daily before conception and through the first trimester' },
    sources: {
      ar: 'الخضروات الورقية الخضراء، العدس والبقوليات، الحمضيات، الحبوب المدعمة',
      en: 'Leafy green vegetables, lentils and legumes, citrus fruit, fortified cereals',
    },
  },
  {
    id: 'iron',
    name: { ar: 'الحديد', en: 'Iron' },
    why: {
      ar: 'يزداد حجم الدم في الحمل، والحديد ضروري لصنع الهيموغلوبين والوقاية من فقر الدم.',
      en: 'Blood volume rises in pregnancy; iron is needed to make haemoglobin and prevent anaemia.',
    },
    amount: { ar: 'غالباً 30–60 ملغ مكملات يومياً حسب توصية الطبيب', en: 'Often 30–60 mg supplemental iron daily as advised by your clinician' },
    sources: {
      ar: 'اللحم الأحمر المطهو جيداً، العدس، السبانخ، البقوليات، مع فيتامين C لتحسين الامتصاص',
      en: 'Well-cooked red meat, lentils, spinach, legumes, paired with vitamin C to improve absorption',
    },
  },
  {
    id: 'calcium',
    name: { ar: 'الكالسيوم', en: 'Calcium' },
    why: {
      ar: 'ضروري لبناء عظام الجنين وأسنانه، ويقلل خطر تسمم الحمل عند نقص المدخول.',
      en: 'Needed for the baby’s bones and teeth, and reduces pre-eclampsia risk where intake is low.',
    },
    amount: { ar: 'حوالي 1000 ملغ يومياً (1.5–2 غ في حالات النقص حسب توصية WHO)', en: 'About 1000 mg daily (1.5–2 g in deficiency as per WHO guidance)' },
    sources: {
      ar: 'الحليب واللبن المبستر، الجبن المبستر، السمسم، اللوز، الخضروات الخضراء',
      en: 'Pasteurised milk and yoghurt, pasteurised cheese, sesame, almonds, green vegetables',
    },
  },
  {
    id: 'vitd',
    name: { ar: 'فيتامين د', en: 'Vitamin D' },
    why: {
      ar: 'يساعد على امتصاص الكالسيوم ونمو عظام الجنين.',
      en: 'Helps absorb calcium and supports the baby’s bone growth.',
    },
    amount: { ar: 'عادةً 400 وحدة دولية يومياً (قد تحتاجين جرعة أعلى حسب التحليل)', en: 'Usually 400 IU daily (a higher dose may be advised based on blood levels)' },
    sources: {
      ar: 'التعرض للشمس، الأسماك الدهنية، البيض، الحليب المدعم',
      en: 'Sunlight exposure, oily fish, eggs, fortified milk',
    },
  },
  {
    id: 'protein',
    name: { ar: 'البروتين', en: 'Protein' },
    why: {
      ar: 'لبناء أنسجة الجنين والمشيمة والرحم، ودعم نمو الثدي.',
      en: 'Builds fetal tissue, the placenta and the uterus, and supports breast growth.',
    },
    amount: { ar: 'نحو 70 غراماً يومياً (أكثر قليلاً في الثلث الثالث)', en: 'Around 70 g daily, slightly more in the third trimester' },
    sources: {
      ar: 'البيض المطهو جيداً، الدجاج، السمك قليل الزئبق، العدس، الحمص، التوفو',
      en: 'Well-cooked eggs, chicken, low-mercury fish, lentils, chickpeas, tofu',
    },
  },
  {
    id: 'omega',
    name: { ar: 'أوميغا 3 (DHA)', en: 'Omega-3 (DHA)' },
    why: {
      ar: 'يدعم تطور دماغ الجنين وشبكية العين.',
      en: 'Supports fetal brain and retinal development.',
    },
    amount: { ar: 'حصة إلى حصتين من السمك قليل الزئبق أسبوعياً', en: 'One to two portions of low-mercury fish per week' },
    sources: {
      ar: 'السلمون، السردين، الماكريل، بذور الكتان، الجوز',
      en: 'Salmon, sardines, mackerel, flaxseed, walnuts',
    },
  },
  {
    id: 'iodine',
    name: { ar: 'اليود', en: 'Iodine' },
    why: {
      ar: 'ضروري لعمل الغدة الدرقية وتطور الدماغ والجهاز العصبي.',
      en: 'Needed for thyroid function and brain and nervous system development.',
    },
    amount: { ar: 'حوالي 220–250 ميكروغرام يومياً', en: 'About 220–250 µg daily' },
    sources: {
      ar: 'الملح المدعم باليود، الأسماك البحرية، منتجات الألبان',
      en: 'Iodised salt, seafood, dairy products',
    },
  },
  {
    id: 'fiber',
    name: { ar: 'الألياف وفيتامين C', en: 'Fibre and vitamin C' },
    why: {
      ar: 'تقلل الإمساك الشائع في الحمل، وفيتامين C يزيد امتصاص الحديد.',
      en: 'Reduce the constipation common in pregnancy, and vitamin C improves iron absorption.',
    },
    amount: { ar: '25–30 غراماً ألياف يومياً مع 5 حصص فاكهة وخضار', en: '25–30 g fibre daily with 5 portions of fruit and vegetables' },
    sources: {
      ar: 'الحبوب الكاملة، الفواكه الطازجة المغسولة، الخضروات، البقوليات',
      en: 'Whole grains, washed fresh fruit, vegetables, legumes',
    },
  },
];

export interface FoodToAvoid {
  id: string;
  name: Bi;
  reason: Bi;
}

export const foodsToAvoid: FoodToAvoid[] = [
  {
    id: 'raw-meat',
    name: { ar: 'اللحوم والدواجن النيئة أو غير المطهوة جيداً', en: 'Raw or undercooked meat and poultry' },
    reason: { ar: 'خطر التوكسوبلازما والليستيريا والعدوى البكتيرية.', en: 'Risk of toxoplasma, listeria and bacterial infection.' },
  },
  {
    id: 'deli',
    name: { ar: 'اللحوم المصنعة الباردة غير المسخنة', en: 'Cold deli and cured meats unless heated' },
    reason: { ar: 'قد تحتوي على الليستيريا التي تعبر المشيمة.', en: 'May carry listeria, which can cross the placenta.' },
  },
  {
    id: 'unpasteurised',
    name: { ar: 'الحليب والأجبان غير المبسترة (مثل الأجبان الطرية)', en: 'Unpasteurised milk and soft cheeses' },
    reason: { ar: 'خطر الليستيريا.', en: 'Risk of listeria.' },
  },
  {
    id: 'raw-eggs',
    name: { ar: 'البيض النيء أو غير المطهو جيداً', en: 'Raw or lightly cooked eggs' },
    reason: { ar: 'خطر السالمونيلا.', en: 'Risk of salmonella.' },
  },
  {
    id: 'mercury',
    name: { ar: 'الأسماك عالية الزئبق (القرش، أبو سيف، الملك ماكريل)', en: 'High-mercury fish (shark, swordfish, king mackerel)' },
    reason: { ar: 'الزئبق يؤثر على تطور الجهاز العصبي للجنين.', en: 'Mercury affects fetal nervous system development.' },
  },
  {
    id: 'raw-fish',
    name: { ar: 'الأسماك والمأكولات البحرية النيئة (السوشي النيء)', en: 'Raw fish and seafood (raw sushi)' },
    reason: { ar: 'خطر الطفيليات والبكتيريا.', en: 'Risk of parasites and bacteria.' },
  },
  {
    id: 'caffeine',
    name: { ar: 'الكافيين الزائد (القهوة والشاي والطاقة)', en: 'Excess caffeine (coffee, tea, energy drinks)' },
    reason: { ar: 'يُنصح بألا يتجاوز 200 ملغ يومياً (نحو كوب قهوة واحد).', en: 'Keep under 200 mg daily (about one cup of coffee).' },
  },
  {
    id: 'alcohol',
    name: { ar: 'الكحول', en: 'Alcohol' },
    reason: { ar: 'لا يوجد مستوى آمن معروف؛ قد يسبب تشوهات ومشكلات في النمو.', en: 'No known safe level; can cause birth defects and growth problems.' },
  },
  {
    id: 'liver',
    name: { ar: 'الكبد ومنتجات فيتامين A العالية', en: 'Liver and high-dose vitamin A products' },
    reason: { ar: 'الجرعة الزائدة من فيتامين A قد تكون سامة للجنين.', en: 'Excess vitamin A can be toxic to the fetus.' },
  },
  {
    id: 'unwashed',
    name: { ar: 'الخضروات والفواكه غير المغسولة جيداً', en: 'Unwashed fruit and vegetables' },
    reason: { ar: 'قد تحمل التوكسوبلازما أو بقايا مبيدات.', en: 'May carry toxoplasma or pesticide residue.' },
  },
];

export const plateGroups: { id: string; name: Bi; portion: Bi; examples: Bi }[] = [
  {
    id: 'vegetables',
    name: { ar: 'خضروات', en: 'Vegetables' },
    portion: { ar: 'نصف الطبق', en: 'Half the plate' },
    examples: { ar: 'سبانخ، جزر، بروكلي، كوسا، طماطم', en: 'Spinach, carrots, broccoli, courgette, tomato' },
  },
  {
    id: 'protein',
    name: { ar: 'بروتين', en: 'Protein' },
    portion: { ar: 'ربع الطبق', en: 'A quarter of the plate' },
    examples: { ar: 'دجاج أو سمك مطهو، عدس، بيض، حمص', en: 'Cooked chicken or fish, lentils, eggs, chickpeas' },
  },
  {
    id: 'grains',
    name: { ar: 'حبوب كاملة', en: 'Whole grains' },
    portion: { ar: 'ربع الطبق', en: 'A quarter of the plate' },
    examples: { ar: 'أرز بني، خبز أسمر، شوفان، برغل', en: 'Brown rice, wholemeal bread, oats, bulgur' },
  },
  {
    id: 'dairy',
    name: { ar: 'ألبان', en: 'Dairy' },
    portion: { ar: 'حصتان يومياً', en: 'Two portions daily' },
    examples: { ar: 'حليب أو لبن مبستر، جبن مبستر', en: 'Pasteurised milk or yoghurt, pasteurised cheese' },
  },
  {
    id: 'fruit',
    name: { ar: 'فاكهة', en: 'Fruit' },
    portion: { ar: 'حصتان إلى ثلاث يومياً', en: 'Two to three daily' },
    examples: { ar: 'برتقال، تفاح، موز، فراولة مغسولة', en: 'Orange, apple, banana, washed strawberries' },
  },
];

export const mealIdeas: { id: string; label: Bi; items: Bi[] }[] = [
  {
    id: 'breakfast',
    label: { ar: 'الفطور', en: 'Breakfast' },
    items: [
      { ar: 'شوفان بالحليب المبستر مع الموز واللوز', en: 'Oats with pasteurised milk, banana and almonds' },
      { ar: 'بيض مطهو جيداً مع خبز أسمر وطماطم', en: 'Well-cooked egg with wholemeal bread and tomato' },
    ],
  },
  {
    id: 'lunch',
    label: { ar: 'الغداء', en: 'Lunch' },
    items: [
      { ar: 'دجاج مشوي مع أرز بني وسلطة خضراء مغسولة', en: 'Grilled chicken with brown rice and a washed green salad' },
      { ar: 'عدس مطهو مع خبز أسمر وعصير ليمون (فيتامين C)', en: 'Cooked lentils with wholemeal bread and lemon juice (vitamin C)' },
    ],
  },
  {
    id: 'dinner',
    label: { ar: 'العشاء', en: 'Dinner' },
    items: [
      { ar: 'سمك سلمون مشوي مع بطاطا وخضروات مطهوة', en: 'Baked salmon with potato and cooked vegetables' },
      { ar: 'شوربة خضار مع حمص وخبز أسمر', en: 'Vegetable soup with chickpeas and wholemeal bread' },
    ],
  },
  {
    id: 'snack',
    label: { ar: 'وجبة خفيفة', en: 'Snack' },
    items: [
      { ar: 'لبن مبستر مع فواكه مغسولة', en: 'Pasteurised yoghurt with washed fruit' },
      { ar: 'حفنة مكسرات غير مملحة مع تمر', en: 'A handful of unsalted nuts with dates' },
    ],
  },
];

/** Daily water goal in glasses (≈250 ml each) — about 2.3 L per day in pregnancy. */
export const WATER_GOAL_GLASSES = 10;
export const GLASS_ML = 250;
