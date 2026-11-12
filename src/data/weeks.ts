import type { Bi } from '../lib/types';

export interface WeekInfo {
  week: number;
  /** Approximate crown–rump / crown–heel length in cm. */
  lengthCm: number;
  /** Approximate fetal weight in grams. */
  weightG: number;
  fetal: Bi;
  maternal: Bi;
  tip: Bi;
}

/**
 * Week-by-week educational content. Sizes follow standard reference averages
 * (weeks 4–19 crown–rump length, weeks 20–40 crown–heel length) and are
 * illustrative; every baby grows at its own pace.
 */
export const weeks: WeekInfo[] = [
  {
    week: 1,
    lengthCm: 0,
    weightG: 0,
    fetal: {
      ar: 'لا يوجد جنين بعد؛ يُحسب الأسبوع الأول من تاريخ أول يوم للدورة الشهرية، أي قبل حدوث الإخصاب.',
      en: 'There is no embryo yet; week 1 is dated from the first day of your period, before fertilisation happens.',
    },
    maternal: {
      ar: 'قد تشعرين بأعراض الدورة المعتادة. هذه الفترة مناسبة لبدء حمض الفوليك 400 ميكروغرام يومياً.',
      en: 'You may notice your usual period symptoms. This is the ideal time to start 400 µg folic acid daily.',
    },
    tip: {
      ar: 'ابدئي حمض الفوليك قبل الحمل إن أمكن، وتجنبي التدخين والكحول.',
      en: 'Start folic acid before conception if possible, and avoid smoking and alcohol.',
    },
  },
  {
    week: 2,
    lengthCm: 0,
    weightG: 0,
    fetal: {
      ar: 'تنضج البويضة في المبيض استعداداً للإباضة، والتي تحدث عادة في منتصف هذه الفترة.',
      en: 'An egg matures in the ovary ready for ovulation, which usually happens around the middle of this period.',
    },
    maternal: {
      ar: 'قد تلاحظين زيادة في الإفرازات المهبلية الشفافة حول وقت الإباضة.',
      en: 'You may notice more clear vaginal discharge around ovulation.',
    },
    tip: {
      ar: 'تناولي طعاماً متوازناً ونامي جيداً؛ صحة ما قبل الحمل تؤثر على بداية الحمل.',
      en: 'Eat a balanced diet and sleep well; pre-pregnancy health shapes early pregnancy.',
    },
  },
  {
    week: 3,
    lengthCm: 0.1,
    weightG: 0,
    fetal: {
      ar: 'تحدث الإخصاب وتنقسم الخلية الأولى عدة مرات أثناء انتقالها إلى الرحم.',
      en: 'Fertilisation occurs and the first cell divides repeatedly while travelling to the uterus.',
    },
    maternal: {
      ar: 'لا تظهر أعراض واضحة بعد؛ قد يكون التعب الخفيف أول ما تلاحظينه.',
      en: 'No clear symptoms yet; mild tiredness may be the first thing you notice.',
    },
    tip: {
      ar: 'تجنبي الأدوية دون استشارة، وأكملي حمض الفوليك يومياً.',
      en: 'Avoid medicines without advice, and keep taking your daily folic acid.',
    },
  },
  {
    week: 4,
    lengthCm: 0.1,
    weightG: 1,
    fetal: {
      ar: 'تنغرس الكيس الجنيني في بطانة الرحم، وتبدأ المشيمة بالتشكل.',
      en: 'The blastocyst implants in the uterine lining and the placenta begins to form.',
    },
    maternal: {
      ar: 'قد تتأخر الدورة، ويظهر تعب أو ألم خفيف في الثدي. اختبار الحمل المنزلي قد يكون إيجابياً.',
      en: 'Your period may be late, with tiredness or breast tenderness. A home pregnancy test may be positive.',
    },
    tip: {
      ar: 'أبلغي عيادتك لبدء ملف المتابعة والتأكد من الحمل.',
      en: 'Contact your clinic to open your antenatal file and confirm the pregnancy.',
    },
  },
  {
    week: 5,
    lengthCm: 0.2,
    weightG: 1,
    fetal: {
      ar: 'يبدأ القلب البدائي بالنبض، وتتشكل بدايات الجهاز العصبي.',
      en: 'The early heart begins to beat and the foundations of the nervous system form.',
    },
    maternal: {
      ar: 'غثيان صباحي محتمل، كثرة تبول، وإرهاق واضح.',
      en: 'Possible morning sickness, more frequent urination and clear fatigue.',
    },
    tip: {
      ar: 'تناولي وجبات صغيرة متكررة لتخفيف الغثيان.',
      en: 'Eat small frequent meals to ease nausea.',
    },
  },
  {
    week: 6,
    lengthCm: 0.5,
    weightG: 1,
    fetal: {
      ar: 'تظهر براعم الأطراف والوجه البدائي، ويمكن رؤية النبض بالموجات فوق الصوتية.',
      en: 'Limb buds and early facial features appear; the heartbeat may be visible on ultrasound.',
    },
    maternal: {
      ar: 'غثيان وحساسية للروائح، وتغيرات مزاجية بسبب الهرمونات.',
      en: 'Nausea, sensitivity to smells and mood changes driven by hormones.',
    },
    tip: {
      ar: 'اشربي سوائل كافية، واستشيري الطبيب إذا كان القيء شديداً.',
      en: 'Keep fluids up, and seek advice if vomiting is severe.',
    },
  },
  {
    week: 7,
    lengthCm: 1,
    weightG: 1,
    fetal: {
      ar: 'ينمو الدماغ بسرعة، وتتشكل بدايات الكلى والكبد.',
      en: 'The brain grows rapidly and the early kidneys and liver form.',
    },
    maternal: {
      ar: 'قد يزداد حجم الثدي وتظهر هالة أغمق، مع تقلب في الشهية.',
      en: 'Your breasts may enlarge with darker areolas, and appetite may fluctuate.',
    },
    tip: {
      ar: 'أكملي حمض الفوليك وتجنبي الأطعمة النيئة.',
      en: 'Continue folic acid and avoid raw foods.',
    },
  },
  {
    week: 8,
    lengthCm: 1.6,
    weightG: 1,
    fetal: {
      ar: 'تتشكل أصابع اليدين والقدمين، ويبدأ الجنين بحركات صغيرة جداً لا تشعرين بها.',
      en: 'Fingers and toes form, and the embryo makes tiny movements you cannot feel yet.',
    },
    maternal: {
      ar: 'رحم بحجم حبة الليمون، وقد تشعرين بانتفاخ وتقلب مزاج.',
      en: 'The uterus is about the size of a lemon; you may feel bloated and emotionally up and down.',
    },
    tip: {
      ar: 'أولي زيارة المتابعة الأولى بين الأسبوع 8 و12 لتأكيد العمر الحملي.',
      en: 'Book your first antenatal visit between weeks 8 and 12 to confirm dating.',
    },
  },
  {
    week: 9,
    lengthCm: 2.3,
    weightG: 2,
    fetal: {
      ar: 'تبدأ الأعضاء الرئيسية بالعمل، ويصبح الشكل أقرب للجنين.',
      en: 'Major organs begin to function and the shape looks more like a fetus.',
    },
    maternal: {
      ar: 'قد تشعرين بدوخة أو تعب؛ يزداد حجم الدم تدريجياً.',
      en: 'You may feel dizzy or tired as blood volume gradually increases.',
    },
    tip: {
      ar: 'قومي ببطء عند الوقوف، واشربي ماءً كافياً.',
      en: 'Stand up slowly and drink enough water.',
    },
  },
  {
    week: 10,
    lengthCm: 3.1,
    weightG: 4,
    fetal: {
      ar: 'تنمو المفاصل والأظافر، ويمكن سماع نبض القلب بالدوبلر.',
      en: 'Joints and nails develop, and the heartbeat can often be heard with a Doppler.',
    },
    maternal: {
      ar: 'قد يخف الغثيان تدريجياً، ويظهر خط داكن على البطن لاحقاً.',
      en: 'Nausea may start to ease, and a dark line on the abdomen may appear later.',
    },
    tip: {
      ar: 'احرصي على 400 ميكروغرام حمض فوليك يومياً حتى نهاية الثلث الأول.',
      en: 'Keep taking 400 µg folic acid daily until the end of the first trimester.',
    },
  },
  {
    week: 11,
    lengthCm: 4.1,
    weightG: 7,
    fetal: {
      ar: 'تكتمل ملامح الوجه تقريباً، وتبدأ الحركات الانعكاسية.',
      en: 'Facial features are nearly complete and reflex movements begin.',
    },
    maternal: {
      ar: 'قد يقل القيء، ويزداد وضوح تغيرات الثدي.',
      en: 'Vomiting may reduce and breast changes become more obvious.',
    },
    tip: {
      ar: 'هذا وقت مناسب لفحص الموجات فوق الصوتية بين 11 و13+6 أسبوعاً.',
      en: 'This is the window for the 11–13+6 week ultrasound scan.',
    },
  },
  {
    week: 12,
    lengthCm: 5.4,
    weightG: 14,
    fetal: {
      ar: 'كل الأعضاء الأساسية موجودة وتستمر بالنضج، والجنين يتحرك بنشاط.',
      en: 'All essential organs are present and maturing; the fetus moves actively.',
    },
    maternal: {
      ar: 'غالباً يخف الغثيان، ويعود الشهية والتعب للتحسن.',
      en: 'Nausea usually eases and appetite and energy begin to improve.',
    },
    tip: {
      ar: 'الزيارة الأولى الموصى بها من منظمة الصحة العالمية تحدث في هذا الأسبوع.',
      en: 'The WHO-recommended first antenatal contact happens around this week.',
    },
  },
  {
    week: 13,
    lengthCm: 7.4,
    weightG: 23,
    fetal: {
      ar: 'تبدأ البصمات بالتشكل، وتظهر الحبال الصوتية.',
      en: 'Fingerprints begin to form and vocal cords appear.',
    },
    maternal: {
      ar: 'نهاية الثلث الأول؛ قد تعود الطاقة تدريجياً ويقل التبول.',
      en: 'End of the first trimester; energy may return and urination reduces.',
    },
    tip: {
      ar: 'أضيفي تمارين خفيفة مثل المشي 20–30 دقيقة يومياً.',
      en: 'Add light activity such as a 20–30 minute daily walk.',
    },
  },
  {
    week: 14,
    lengthCm: 8.7,
    weightG: 43,
    fetal: {
      ar: 'يستطيع الجنين تحريك عينيه وتعبيرات وجهه، وتنمو العظام.',
      en: 'The fetus can move its eyes and make facial expressions; bones grow.',
    },
    maternal: {
      ar: 'قد يظهر خط البطن الداكن، ويزداد حجم الرحم فوق عظمة الحوض.',
      en: 'A dark abdominal line may appear and the uterus rises above the pelvis.',
    },
    tip: {
      ar: 'ابدئي النوم على الجانب مع وسادة بين الركبتين للراحة.',
      en: 'Try side-sleeping with a pillow between your knees for comfort.',
    },
  },
  {
    week: 15,
    lengthCm: 10.1,
    weightG: 70,
    fetal: {
      ar: 'تتكون حاسة السمع، وقد يبدأ الجنين بالتفاعل مع الأصوات.',
      en: 'Hearing develops and the fetus may begin responding to sound.',
    },
    maternal: {
      ar: 'قد تشعرين بانسداد أنفي خفيف وتغيرات في اللثة.',
      en: 'You may notice mild nasal stuffiness and gum changes.',
    },
    tip: {
      ar: 'حافظي على نظافة الأسنان وزيارة طبيب الأسنان إن لزم.',
      en: 'Keep up dental hygiene and see a dentist if needed.',
    },
  },
  {
    week: 16,
    lengthCm: 11.6,
    weightG: 100,
    fetal: {
      ar: 'تتحرك العينان ببطء، وتظهر حركات مصّ وبلع.',
      en: 'The eyes move slowly and sucking and swallowing movements appear.',
    },
    maternal: {
      ar: 'قد تشعرين بأول حركات خفيفة (رفرفة) خاصة في الحمل الثاني.',
      en: 'You may feel the first fluttering movements, especially in a second pregnancy.',
    },
    tip: {
      ar: 'الزيارة الثانية الموصى بها من منظمة الصحة العالمية حول الأسبوع 20.',
      en: 'The second WHO antenatal contact is around week 20.',
    },
  },
  {
    week: 17,
    lengthCm: 13,
    weightG: 140,
    fetal: {
      ar: 'تترسب الدهون تحت الجلد، وتبدأ طبقة الحماية (الطلاء الدهني) بتغطية الجلد.',
      en: 'Fat is deposited under the skin and the protective vernix begins to cover it.',
    },
    maternal: {
      ar: 'قد تشعرين بألم في أسفل الظهر بسبب تغير مركز الثقل.',
      en: 'Lower back pain may appear as your centre of gravity shifts.',
    },
    tip: {
      ar: 'استخدمي وسادة دعم أثناء الجلوس وتجنبي الوقوف الطويل.',
      en: 'Use back support when sitting and avoid long periods of standing.',
    },
  },
  {
    week: 18,
    lengthCm: 14.2,
    weightG: 190,
    fetal: {
      ar: 'يبدأ الجنين بالسماع بوضوح، وتنمو الأعضاء التناسلية بشكل واضح.',
      en: 'The fetus hears clearly and the genital organs are well developed.',
    },
    maternal: {
      ar: 'قد تعانين من حرقة المعدة أو الإمساك؛ الرحم يضغط على الأمعاء.',
      en: 'Heartburn or constipation may occur as the uterus presses on the bowel.',
    },
    tip: {
      ar: 'أكثري من الألياف والسوائل، وتجنبي الوجبات الكبيرة.',
      en: 'Increase fibre and fluids and avoid large meals.',
    },
  },
  {
    week: 19,
    lengthCm: 15.3,
    weightG: 240,
    fetal: {
      ar: 'تتكون مادة الميالين حول الأعصاب، وتزداد قوة الحركات.',
      en: 'Myelin forms around the nerves and movements become stronger.',
    },
    maternal: {
      ar: 'قد يظهر شد عضلي في الساقين، خاصة في الليل.',
      en: 'Leg cramps may appear, especially at night.',
    },
    tip: {
      ar: 'مدّي عضلة الساق بلطف عند الشد، وتأكدي من كفاية الكالسيوم.',
      en: 'Gently stretch the calf when it cramps, and make sure calcium intake is adequate.',
    },
  },
  {
    week: 20,
    lengthCm: 25.6,
    weightG: 300,
    fetal: {
      ar: 'منتصف الحمل؛ يزداد نشاط الجنين ويُسمع نبض قلبه بوضوح.',
      en: 'Halfway through pregnancy; the fetus is more active and the heartbeat is clearly heard.',
    },
    maternal: {
      ar: 'يصل الرحم إلى مستوى السرة تقريباً، وتصبح الحركات أوضح.',
      en: 'The uterus reaches about navel level and movements feel clearer.',
    },
    tip: {
      ar: 'هذا موعد الفحص بالموجات فوق الصوتية التفصيلي في كثير من البلدان.',
      en: 'This is the usual timing for the detailed anomaly ultrasound scan.',
    },
  },
  {
    week: 21,
    lengthCm: 26.7,
    weightG: 360,
    fetal: {
      ar: 'يبدأ الجنين بدورة نوم واستيقاظ منتظمة، ويبتلع السائل الأمنيوسي.',
      en: 'Sleep–wake cycles become regular and the fetus swallows amniotic fluid.',
    },
    maternal: {
      ar: 'قد تزداد الشهية، وتظهر زيادة واضحة في الوزن.',
      en: 'Appetite may increase and weight gain becomes noticeable.',
    },
    tip: {
      ar: 'تابعي زيادة الوزن شهرياً وسجلي القياسات في التطبيق.',
      en: 'Track weight monthly and record the measurements in the app.',
    },
  },
  {
    week: 22,
    lengthCm: 27.8,
    weightG: 430,
    fetal: {
      ar: 'تتطور حاسة اللمس، ويستجيب الجنين للمس البطن.',
      en: 'The sense of touch develops and the fetus responds to touch on your abdomen.',
    },
    maternal: {
      ar: 'قد يظهر تورم خفيف في القدمين في نهاية اليوم.',
      en: 'Mild swelling of the feet may appear by the end of the day.',
    },
    tip: {
      ar: 'ارفعي قدميك عند الراحة، وأبلغي الطبيب إذا كان التورم مفاجئاً أو شديداً.',
      en: 'Elevate your feet when resting, and report sudden or severe swelling.',
    },
  },
  {
    week: 23,
    lengthCm: 28.9,
    weightG: 501,
    fetal: {
      ar: 'يبدأ الجنين بالشعور بالألم، وتزداد حركة الأطراف قوة.',
      en: 'The fetus begins to sense pain and limb movements become stronger.',
    },
    maternal: {
      ar: 'قد تشعرين بتقلصات خفيفة غير منتظمة (براكستون هيكس).',
      en: 'You may feel mild irregular tightenings (Braxton Hicks).',
    },
    tip: {
      ar: 'التقلصات المنتظمة أو المؤلمة تحتاج تقييماً طبياً.',
      en: 'Regular or painful contractions need medical assessment.',
    },
  },
  {
    week: 24,
    lengthCm: 30,
    weightG: 600,
    fetal: {
      ar: 'تبدأ الرئتان بالتشكل الهيكلي، وتظهر بصمات واضحة.',
      en: 'The lungs develop structurally and fingerprints are distinct.',
    },
    maternal: {
      ar: 'قد تعانين من حرقة معدة أو صعوبة في النوم.',
      en: 'You may have heartburn or difficulty sleeping.',
    },
    tip: {
      ar: 'هذا موعد فحص سكري الحمل (GTT) بين 24 و28 أسبوعاً.',
      en: 'This is the window for the gestational diabetes test (GTT) at 24–28 weeks.',
    },
  },
  {
    week: 25,
    lengthCm: 34.6,
    weightG: 660,
    fetal: {
      ar: 'يستجيب الجنين للصوت بالحركة، ويبدأ بتطوير حاسة الشم.',
      en: 'The fetus responds to sound with movement and begins developing smell.',
    },
    maternal: {
      ar: 'قد يزداد إفراز اللعاب أو يظهر تنميل في اليدين.',
      en: 'Saliva may increase or you may feel tingling in the hands.',
    },
    tip: {
      ar: 'أبلغي الطبيب عن أي تنميل أو خدر مستمر في اليدين.',
      en: 'Report any persistent tingling or numbness in your hands.',
    },
  },
  {
    week: 26,
    lengthCm: 35.6,
    weightG: 760,
    fetal: {
      ar: 'تفتح العينان، ويبدأ الجنين بالاستجابة للضوء.',
      en: 'The eyes open and the fetus begins to respond to light.',
    },
    maternal: {
      ar: 'قد تزداد آلام الظهر وتظهر علامات تمدد الجلد.',
      en: 'Backache may increase and stretch marks may appear.',
    },
    tip: {
      ar: 'استخدمي كريماً مرطباً، وراقبي حركة الجنين يومياً من هذا الأسبوع.',
      en: 'Use a moisturiser, and start noticing daily movements from this week.',
    },
  },
  {
    week: 27,
    lengthCm: 36.6,
    weightG: 875,
    fetal: {
      ar: 'يكتمل تطور الدماغ بشكل كبير، وتزداد فرص البقاء إذا وُلد مبكراً برعاية.',
      en: 'Brain development advances greatly and survival chances with neonatal care improve.',
    },
    maternal: {
      ar: 'نهاية الثلث الثاني؛ قد تشعرين بضيق نفس خفيف.',
      en: 'End of the second trimester; you may feel mildly short of breath.',
    },
    tip: {
      ar: 'احضري زجاجة ماء معك دائماً وتجنبي الإجهاد.',
      en: 'Carry a water bottle and avoid overexertion.',
    },
  },
  {
    week: 28,
    lengthCm: 37.6,
    weightG: 1005,
    fetal: {
      ar: 'يبدأ الجنين بدورة نوم منتظمة ويفتح عينيه ويحركها.',
      en: 'The fetus settles into regular sleep cycles and moves its eyes.',
    },
    maternal: {
      ar: 'بداية الثلث الثالث؛ تزداد الحاجة للراحة والتبول.',
      en: 'Start of the third trimester; you need more rest and urinate more often.',
    },
    tip: {
      ar: 'من الآن، إذا قلّت الحركات عن المعتاد اتصلي بقسم الولادة فوراً.',
      en: 'From now on, contact your maternity unit promptly if movements reduce.',
    },
  },
  {
    week: 29,
    lengthCm: 38.6,
    weightG: 1153,
    fetal: {
      ar: 'تنمو العضلات والرئتان بسرعة، ويتراكم الدهن الأبيض.',
      en: 'Muscles and lungs grow quickly and fat stores increase.',
    },
    maternal: {
      ar: 'قد تشعرين بحرقة معدة وصعوبة في النوم على الظهر.',
      en: 'You may have heartburn and difficulty lying flat on your back.',
    },
    tip: {
      ar: 'نامي على الجانب الأيسر إن أمكن لتحسين تدفق الدم.',
      en: 'Sleep on your left side when possible to improve blood flow.',
    },
  },
  {
    week: 30,
    lengthCm: 39.9,
    weightG: 1319,
    fetal: {
      ar: 'يبدأ الجنين بتخزين الحديد والكالسيوم، ويستجيب للمس والضوء.',
      en: 'The fetus stores iron and calcium and responds to touch and light.',
    },
    maternal: {
      ar: 'قد تزداد التقلصات الخفيفة وتظهر زيادة في الإفرازات.',
      en: 'Mild contractions may increase and discharge may increase.',
    },
    tip: {
      ar: 'هذا موعد الزيارة الموصى بها حول الأسبوع 30 — تحقق من وضعية الجنين.',
      en: 'This is the recommended contact around week 30 — your baby’s position is checked.',
    },
  },
  {
    week: 31,
    lengthCm: 41.1,
    weightG: 1502,
    fetal: {
      ar: 'تتحسن وظيفة الرئتين تدريجياً، ويزداد وزن الجنين بسرعة.',
      en: 'Lung function improves steadily and the fetus gains weight quickly.',
    },
    maternal: {
      ar: 'قد يظهر ضيق نفس أكبر مع نمو الرحم تحت الحجاب الحاجز.',
      en: 'Breathlessness may increase as the uterus grows under the diaphragm.',
    },
    tip: {
      ar: 'جهّزي قائمة حقيبة الولادة وابدئي تجهيزها.',
      en: 'Start your hospital bag checklist and pack early items.',
    },
  },
  {
    week: 32,
    lengthCm: 42.4,
    weightG: 1702,
    fetal: {
      ar: 'يكتمل نضج الأعضاء تقريباً، وغالباً يستقر الجنين برأسه للأسفل.',
      en: 'Organs are nearly mature and the baby often settles head-down.',
    },
    maternal: {
      ar: 'قد تشعرين بتعب أكبر وألم في الحوض.',
      en: 'You may feel more tired with pelvic discomfort.',
    },
    tip: {
      ar: 'راجعي عيادتك كل أسبوعين من الآن حتى الأسبوع 36.',
      en: 'Antenatal visits are usually every two weeks until week 36.',
    },
  },
  {
    week: 33,
    lengthCm: 43.7,
    weightG: 1918,
    fetal: {
      ar: 'تنمو العظام وتصبح أقوى، ويبدأ الجنين بالاستعداد للولادة.',
      en: 'Bones grow stronger and the baby prepares for birth.',
    },
    maternal: {
      ar: 'قد تشعرين بتصلب الرحم بشكل متكرر غير منتظم.',
      en: 'You may notice frequent irregular uterine tightenings.',
    },
    tip: {
      ar: 'تعلمي تمارين التنفس والاسترخاء في صفحة التحضير للولادة.',
      en: 'Practise breathing and relaxation on the labor preparation page.',
    },
  },
  {
    week: 34,
    lengthCm: 45,
    weightG: 2146,
    fetal: {
      ar: 'تتطور الرئتان للتنفس بعد الولادة، ويزداد الجنين امتلاءً.',
      en: 'The lungs mature for breathing after birth and the baby fills out.',
    },
    maternal: {
      ar: 'قد تزداد الإفرازات المهبلية وتظهر بوادر انقباضات.',
      en: 'Vaginal discharge may increase and early contractions may appear.',
    },
    tip: {
      ar: 'أكملي حقيبة الولادة وحددي مكان الولادة والمرافق.',
      en: 'Finish your hospital bag and confirm your birth place and support person.',
    },
  },
  {
    week: 35,
    lengthCm: 46.2,
    weightG: 2383,
    fetal: {
      ar: 'تكتمل الكلى وتعمل، ويزداد مخزون الدهن تحت الجلد.',
      en: 'The kidneys are mature and working, and fat stores increase.',
    },
    maternal: {
      ar: 'قد تشعرين بضغط أسفل الحوض وصعوبة في المشي.',
      en: 'You may feel pressure in the pelvis and difficulty walking.',
    },
    tip: {
      ar: 'هذا موعد فحص بكتيريا المكورات العقدية (GBS) بين 35 و37 أسبوعاً.',
      en: 'The group B streptococcus (GBS) screening is usually at 35–37 weeks.',
    },
  },
  {
    week: 36,
    lengthCm: 47.4,
    weightG: 2622,
    fetal: {
      ar: 'غالباً يتحرك الجنين إلى وضعية الرأس، ويقترب من حجم الولادة.',
      en: 'The baby usually moves head-down and is close to birth size.',
    },
    maternal: {
      ar: 'قد يخف ضيق النفس عند نزول الجنين للحوض.',
      en: 'Breathlessness may ease as the baby moves down into the pelvis.',
    },
    tip: {
      ar: 'من الأسبوع 36 تُنصح الزيارات أسبوعياً؛ جهّزي خطة الولادة.',
      en: 'Weekly visits usually start at week 36; write your birth plan.',
    },
  },
  {
    week: 37,
    lengthCm: 48.6,
    weightG: 2859,
    fetal: {
      ar: 'يُعد الحمل مكتملاً مبكراً؛ الجنين قادر على التنفس والرضاعة.',
      en: 'The pregnancy is now early-term; the baby can breathe and feed.',
    },
    maternal: {
      ar: 'قد تشعرين بزيادة في تقلصات الرحم وضغط الحوض.',
      en: 'Uterine tightenings and pelvic pressure may increase.',
    },
    tip: {
      ar: 'احملي معك دائماً بطاقة الحمل والوثائق الأساسية.',
      en: 'Keep your antenatal card and essential documents with you.',
    },
  },
  {
    week: 38,
    lengthCm: 49.8,
    weightG: 3083,
    fetal: {
      ar: 'يزداد وزن الجنين، والرئتان جاهزتان تقريباً للعمل الكامل.',
      en: 'The baby keeps gaining weight and the lungs are nearly fully ready.',
    },
    maternal: {
      ar: 'قد تظهر علامات مبكرة للولادة مثل نزول جزء من السدادة المخاطية.',
      en: 'Early labor signs such as loss of the mucus plug may appear.',
    },
    tip: {
      ar: 'إذا نزل السائل الأمنيوسي أو حدث نزيف، توجّهي للمستشفى فوراً.',
      en: 'If your waters break or you bleed, go to hospital immediately.',
    },
  },
  {
    week: 39,
    lengthCm: 50.7,
    weightG: 3288,
    fetal: {
      ar: 'الحمل مكتمل؛ الجنين يكتسب دهوناً إضافية ويستعد للولادة.',
      en: 'The pregnancy is full-term; the baby adds fat and prepares for birth.',
    },
    maternal: {
      ar: 'قد تشعرين بانقباضات منتظمة أو تقلصات قوية متزايدة.',
      en: 'You may feel regular contractions or increasingly strong tightenings.',
    },
    tip: {
      ar: 'احسبي وقت الانقباضات: كل 5 دقائق لمدة ساعة يعني الاتصال بقسم الولادة.',
      en: 'Time contractions: every 5 minutes for an hour means calling your maternity unit.',
    },
  },
  {
    week: 40,
    lengthCm: 51.2,
    weightG: 3462,
    fetal: {
      ar: 'تاريخ الولادة المتوقع؛ الجنين جاهز للولادة في أي وقت.',
      en: 'The estimated due date; the baby is ready to be born at any time.',
    },
    maternal: {
      ar: 'ترقبي علامات الولادة، وكوني على تواصل مع عيادتك.',
      en: 'Watch for signs of labor and stay in contact with your clinic.',
    },
    tip: {
      ar: 'فقط 5% من الأطفال يولدون في التاريخ المتوقع؛ لا تقلقي إذا تأخر قليلاً.',
      en: 'Only about 5% of babies arrive exactly on the due date; a small delay is normal.',
    },
  },
];
