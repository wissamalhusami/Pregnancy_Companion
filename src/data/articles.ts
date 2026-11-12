import type { Article } from "../types";

export const ARTICLES: Article[] = [
  {
    id: "menstrual-cycle",
    slug: "menstrual-cycle",
    section: "preconception",
    category: "reproductive-health",
    title: { ar: "الدورة الشهرية", en: "The Menstrual Cycle" },
    description: {
      ar: "فهم مراحل الدورة الشهرية والتغيرات الهرمونية المرتبطة بها.",
      en: "Understanding the phases of the menstrual cycle and associated hormonal changes.",
    },
    content: {
      ar: {
        definition:
          "الدورة الشهرية هي سلسلة من التغيرات الفسيولوجية التي تحدث في جسم المرأة للتحضير للحمل المحتمل، ويبلغ متوسط طولها 28 يوماً مع تفاوت طبيعي بين 21 و35 يوماً.",
        sections: [
          {
            heading: "مراحل الدورة الشهرية",
            body: [
              "المرحلة الطمثية (اليوم 1–5): تنزلق بطانة الرحم مسببةً نزيف الطمث.",
              "المرحلة الجُريبية (اليوم 1–13): يحفز هرمون FSH نمو جُريبات المبيض، وتنتج الجُريبات هرمون الإستروجين الذي يعيد بناء بطانة الرحم.",
              "الإباضة (حوالي اليوم 14): يرتفع هرمون LH مؤدياً إلى تحرير البويضة الناضجة من المبيض.",
              "المرحلة الأصفرية (اليوم 15–28): يكوّن الجريب المنفجر الجسم الأصفر الذي يفرز البروجسترون للحفاظ على بطانة الرحم. إن لم يحدث حمل، يتراجع الجسم الأصفر وتنخفض الهرمونات ويبدأ الطمث.",
            ],
          },
          {
            heading: "التغيرات الهرمونية",
            body: [
              "FSH (هرمون حفاز الجُريبات): يحفز نمو البويضات في بداية الدورة.",
              "الإستروجين: يرتفع في المرحلة الجُريبية ويعزز سماكة بطانة الرحم.",
              "LH (هرمون التبويض): يرتفع فجأة (ارتفاع LH) قبل الإباضة مباشرة.",
              "البروجسترون: يهيمن في المرحلة الأصفرية ويحافظ على بطانة الرحم للحمل المحتمل.",
            ],
          },
        ],
        warningSigns: [
          "دورات أقصر من 21 يوماً أو أطول من 35 يوماً.",
          "نزيف غزير جداً أو يستمر أكثر من 7 أيام.",
          "انقطاع الطمث لعدة أشهر (بعد استبعاد الحمل).",
          "ألم شديد غير معتاد مع الطمث.",
        ],
        whenToSeekCare: [
          "عند حدوث تغيّر مفاجئ في انتظام الدورة أو كمية النزيف.",
          "عند وجود أعراض إضافية مثل حمى أو إفرازات غير طبيعية.",
        ],
      },
      en: {
        definition:
          "The menstrual cycle is a series of physiological changes in a woman's body preparing for potential pregnancy. It averages 28 days with a normal range of 21–35 days.",
        sections: [
          {
            heading: "Phases of the Menstrual Cycle",
            body: [
              "Menstrual phase (Day 1–5): The uterine lining sheds, causing menstrual bleeding.",
              "Follicular phase (Day 1–13): FSH stimulates ovarian follicle growth; follicles produce estrogen which rebuilds the uterine lining.",
              "Ovulation (~Day 14): An LH surge triggers release of a mature egg from the ovary.",
              "Luteal phase (Day 15–28): The ruptured follicle forms the corpus luteum which secretes progesterone to maintain the uterine lining. If no pregnancy occurs, the corpus luteum regresses, hormones drop, and menstruation begins.",
            ],
          },
          {
            heading: "Hormonal Changes",
            body: [
              "FSH (Follicle-Stimulating Hormone): Stimulates egg growth early in the cycle.",
              "Estrogen: Rises during the follicular phase and thickens the uterine lining.",
              "LH (Luteinizing Hormone): Surges just before ovulation.",
              "Progesterone: Dominates the luteal phase and maintains the uterine lining for potential pregnancy.",
            ],
          },
        ],
        warningSigns: [
          "Cycles shorter than 21 days or longer than 35 days.",
          "Very heavy bleeding or bleeding lasting more than 7 days.",
          "Absent periods for several months (after pregnancy is ruled out).",
          "Severe or unusual menstrual pain.",
        ],
        whenToSeekCare: [
          "Sudden change in cycle regularity or bleeding amount.",
          "Additional symptoms such as fever or abnormal discharge.",
        ],
      },
    },
    references: [
      "ACOG. Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign. Committee Opinion No. 651.",
      "WHO. Medical Eligibility Criteria for Contraceptive Use.",
    ],
    lastReviewed: "2026-01-15",
    readingTime: 5,
    related: ["ovulation", "pcos"],
  },
  {
    id: "ovulation",
    slug: "ovulation",
    section: "preconception",
    category: "fertility",
    title: { ar: "الإباضة", en: "Ovulation" },
    description: {
      ar: "ما هي الإباضة، متى تحدث، وكيف يمكن تقدير النافذة الخصوبة.",
      en: "What ovulation is, when it occurs, and how to estimate the fertile window.",
    },
    content: {
      ar: {
        definition:
          "الإباضة هي تحرير بويضة ناضجة من المبيض لتنتقل إلى قناة فالوب حيث يمكن تخصيبها. تحدث عادةً حوالي اليوم 14 من دورة مدتها 28 يوماً.",
        sections: [
          {
            heading: "علامات الإباضة",
            body: [
              "تغيّر في إفرازات عنق الرحم لتصبح شفافة ومطاطية تشبه بياض البيض.",
              "ارتفاع طفيف في درجة حرارة الجسم القاعدية بعد الإباضة.",
              "ألم خفيف على جانب واحد من أسفل البطن (ألم الإباضة).",
              "زيادة الرغبة الجنسية لدى بعض النساء.",
            ],
          },
          {
            heading: "النافذة الخصوبة",
            body: [
              "النافذة الخصوبة تمتد تقريباً 5 أيام قبل الإباضة ويوم الإباضة نفسه.",
              "الحيوانات المنوية يمكن أن تعيش حتى 5 أيام داخل الجهاز التناسلي للمرأة.",
              "البويضة تعيش حوالي 12–24 ساعة بعد الإباضة.",
              "أعلى احتمال للحمل يحدث في اليومين preceding الإباضة ويوم الإباضة.",
            ],
          },
        ],
        warningSigns: [
          "انعدام الإباضة المترافق مع دورات غير منتظمة أو غائبة.",
          "نزيف غير طبيعي بين الدورات.",
        ],
        whenToSeekCare: [
          "إذا لم يحدث حمل بعد 12 شهراً من المحاولة (أو 6 أشهر إذا كان عمر المرأة فوق 35).",
        ],
      },
      en: {
        definition:
          "Ovulation is the release of a mature egg from the ovary into the fallopian tube where it can be fertilized. It typically occurs around day 14 of a 28-day cycle.",
        sections: [
          {
            heading: "Signs of Ovulation",
            body: [
              "Cervical mucus becomes clear, slippery, and stretchy like egg whites.",
              "A slight rise in basal body temperature after ovulation.",
              "Mild one-sided lower abdominal pain (mittelschmerz).",
              "Increased libido in some women.",
            ],
          },
          {
            heading: "The Fertile Window",
            body: [
              "The fertile window spans approximately 5 days before ovulation plus the day of ovulation.",
              "Sperm can survive up to 5 days inside the female reproductive tract.",
              "The egg lives about 12–24 hours after ovulation.",
              "The highest chance of pregnancy is in the 2 days before ovulation and the day of ovulation.",
            ],
          },
        ],
        warningSigns: [
          "Anovulation associated with irregular or absent cycles.",
          "Abnormal intermenstrual bleeding.",
        ],
        whenToSeekCare: [
          "If pregnancy has not occurred after 12 months of trying (or 6 months if over age 35).",
        ],
      },
    },
    references: [
      "ACOG. Fertility Awareness-Based Methods of Family Planning. Committee Opinion.",
      "WHO. Family Planning: A Global Handbook for Providers.",
    ],
    lastReviewed: "2026-01-15",
    readingTime: 4,
    related: ["menstrual-cycle", "pcos"],
  },
  {
    id: "pcos",
    slug: "polycystic-ovary-syndrome",
    section: "preconception",
    category: "reproductive-health",
    title: { ar: "متلازمة تكيس المبايض", en: "Polycystic Ovary Syndrome (PCOS)" },
    description: {
      ar: "اضطراب هرموني شائع يؤثر على الدورة الشهرية والخصوبة.",
      en: "A common hormonal disorder affecting the menstrual cycle and fertility.",
    },
    content: {
      ar: {
        definition:
          "متلازمة تكيس المبايض (PCOS) هي اضطراب هرموني شائع لدى نساء سن الإنجاب، يتميز بفرط الأندروجينات واضطراب الإباضة وقد يظهر تكيّسات في المبايض.",
        causes: [
          "السبب الدقيق غير معروف، لكن يُعتقد أن مقاومة الأنسولين والالتهاب المزمن يلعبان دوراً.",
          "عوامل وراثية وميل عائلي.",
        ],
        riskFactors: [
          "تاريخ عائلي للإصابة.",
          "زيادة الوزن أو السمنة.",
          "مقاومة الأنسولين.",
        ],
        symptoms: [
          "دورات شهرية غير منتظمة أو غائبة.",
          "زيادة نمو الشعر في الوجه والجسم (الشعرانية).",
          "حب الشباب.",
          "تساقط الشعر بصفة ذكرية.",
          "صعوبة في الحمل.",
        ],
        assessment: [
          "تاريخ طبي وفحص سريري شامل.",
          "تقييم مؤشر كتلة الجسم.",
          "فحص الحوض.",
        ],
        investigations: [
          "قياس مستويات الهرمونات (FSH, LH, Testosterone, DHEA-S).",
          "صورة إيكو للحوض لتقييم المبايض.",
          "اختبار تحمل الجلوكوز وقياس الأنسولين.",
          "فحص الدهون في الدم.",
        ],
        management: [
          "تعديل نمط الحياة: التغذية الصحية والنشاط البدني المنتظم.",
          "تنظيم الدورة الشهرية بالأدوية التي يصفها الطبيب.",
          "علاج فرط الأندروجين عند الحاجة.",
          "دعم الخصوبة عند الرغبة في الحمل تحت إشراف طبي.",
        ],
        nursingConsiderations: [
          "تثقيف المريضة عن الحالة وأهمية تعديل نمط الحياة.",
          "دعم الالتزام بالمتابعة الطبية المنتظمة.",
          "مراقبة علامات مقاومة الأنسولين وعوامل خطر القلب والأوعية.",
        ],
        warningSigns: [
          "نزيف رحمي غزير أو متواصل.",
          "عدم استجابة للأعراض رغم العلاج.",
          "أعراض تدل على مرض سكري (عطش، تبول متكرر).",
        ],
        whenToSeekCare: [
          "عند استمرار الدورات غير المنتظمة رغم نمط حياة صحي.",
          "عند صعوبة الحمل لأكثر من 6–12 شهراً.",
        ],
      },
      en: {
        definition:
          "Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder of reproductive-age women, characterized by hyperandrogenism, ovulatory dysfunction, and possibly polycystic ovaries.",
        causes: [
          "The exact cause is unknown; insulin resistance and chronic inflammation are believed to play a role.",
          "Genetic and familial factors.",
        ],
        riskFactors: [
          "Family history of PCOS.",
          "Overweight or obesity.",
          "Insulin resistance.",
        ],
        symptoms: [
          "Irregular or absent menstrual periods.",
          "Excess facial and body hair (hirsutism).",
          "Acne.",
          "Male-pattern hair loss.",
          "Difficulty conceiving.",
        ],
        assessment: [
          "Comprehensive medical history and physical exam.",
          "BMI assessment.",
          "Pelvic examination.",
        ],
        investigations: [
          "Hormone levels (FSH, LH, Testosterone, DHEA-S).",
          "Pelvic ultrasound to assess ovaries.",
          "Glucose tolerance test and insulin levels.",
          "Lipid panel.",
        ],
        management: [
          "Lifestyle modification: healthy nutrition and regular physical activity.",
          "Menstrual cycle regulation with physician-prescribed medications.",
          "Treatment of hyperandrogenism when needed.",
          "Fertility support when pregnancy is desired, under medical supervision.",
        ],
        nursingConsiderations: [
          "Educate the patient about the condition and importance of lifestyle modification.",
          "Support adherence to regular medical follow-up.",
          "Monitor for signs of insulin resistance and cardiovascular risk factors.",
        ],
        warningSigns: [
          "Heavy or continuous uterine bleeding.",
          "Lack of symptom response despite treatment.",
          "Symptoms suggesting diabetes (thirst, frequent urination).",
        ],
        whenToSeekCare: [
          "Persistent irregular cycles despite a healthy lifestyle.",
          "Difficulty conceiving for more than 6–12 months.",
        ],
      },
    },
    references: [
      "WHO. Polycystic Ovary Syndrome (PCOS) — Technical Brief.",
      "ACOG. Polycystic Ovary Syndrome. Practice Bulletin No. 194.",
    ],
    lastReviewed: "2026-01-20",
    readingTime: 7,
    related: ["menstrual-cycle", "ovulation", "endometriosis"],
  },
  {
    id: "endometriosis",
    slug: "endometriosis",
    section: "preconception",
    category: "reproductive-health",
    title: { ar: "الانتباذ البطاني الرحمي", en: "Endometriosis" },
    description: {
      ar: "نمو نسيج بطانة الرحم خارج موضعه الطبيعي مسبباً ألماً واحتمال العقم.",
      en: "Growth of endometrial-like tissue outside the uterus causing pain and possible infertility.",
    },
    content: {
      ar: {
        definition:
          "الانتباذ البطاني الرحمي هو وجود نسيج يشبه بطانة الرحم خارج التجويف الرحمي، عادةً على المبايض أو قنوات فالوب أو الأنسجة المحيطة.",
        causes: [
          "السبب غير معروف تماماً. تشمل النظريات الارتداد الطمثي والتطور الجنيني والاضطرابات المناعية.",
        ],
        riskFactors: [
          "تاريخ عائلي للحالة.",
          "بدء الطمث المبكر.",
          "دورات قصيرة وغزيرة.",
        ],
        symptoms: [
          "عسر الطمث (ألم الطمث الشديد).",
          "ألم مزمن في الحوض.",
          "ألم أثناء العلاقة الزوجية.",
          "صعوبة في الحمل.",
          "ألم أثناء التبرز أو التبول أثناء الطمث.",
        ],
        investigations: [
          "فحص سريري وتاريخ طبي دقيق.",
          "صورة إيكو للحوض.",
          "التصوير بالرنين المغناطيسي لتقييم الإنتشار.",
          "تنظير البطن للتشخيص النهائي.",
        ],
        management: [
          "مسكنات الألم.",
          "العلاج الهرموني لتنظيم الدورة وتقليل نمو الانتباذ.",
          "الجراحة لاستئصال الآفات في حالات معينة.",
          "دعم الخصوبة عند الرغبة في الحمل.",
        ],
        warningSigns: [
          "ألم حاد مفاجئ في الحوض.",
          "نزيف غزير غير معتاد.",
        ],
        whenToSeekCare: [
          "عند ألم الطمث الذي يعوق الحياة اليومية.",
          "عند صعوبة الحمل.",
        ],
      },
      en: {
        definition:
          "Endometriosis is the presence of endometrial-like tissue outside the uterine cavity, typically on the ovaries, fallopian tubes, or surrounding tissues.",
        causes: [
          "The exact cause is unknown. Theories include retrograde menstruation, embryonic development, and immune disorders.",
        ],
        riskFactors: [
          "Family history of the condition.",
          "Early menarche.",
          "Short, heavy cycles.",
        ],
        symptoms: [
          "Severe dysmenorrhea (painful periods).",
          "Chronic pelvic pain.",
          "Pain during intercourse.",
          "Difficulty conceiving.",
          "Painful bowel or urination during menstruation.",
        ],
        investigations: [
          "Clinical examination and thorough medical history.",
          "Pelvic ultrasound.",
          "MRI to assess extent.",
          "Laparoscopy for definitive diagnosis.",
        ],
        management: [
          "Pain management with analgesics.",
          "Hormonal therapy to regulate cycles and reduce lesion growth.",
          "Surgery to excise lesions in selected cases.",
          "Fertility support when pregnancy is desired.",
        ],
        warningSigns: [
          "Sudden severe pelvic pain.",
          "Unusually heavy bleeding.",
        ],
        whenToSeekCare: [
          "When menstrual pain interferes with daily life.",
          "When experiencing difficulty conceiving.",
        ],
      },
    },
    references: [
      "WHO. Endometriosis Fact Sheet.",
      "ACOG. Management of Endometriosis. Practice Bulletin No. 114.",
    ],
    lastReviewed: "2026-01-20",
    readingTime: 6,
    related: ["pcos", "menstrual-cycle"],
  },
  {
    id: "folic-acid",
    slug: "folic-acid-education",
    section: "preconception",
    category: "preparing-pregnancy",
    title: { ar: "تعليم حمض الفوليك", en: "Folic Acid Education" },
    description: {
      ar: "أهمية حمض الفوليك قبل الحمل وخلاله للوقاية من عيوب الأنبوب العصبي.",
      en: "The importance of folic acid before and during pregnancy for preventing neural tube defects.",
    },
    content: {
      ar: {
        definition:
          "حمض الفوليك هو فيتامين B9 الاصطناعي، ضروري لتطور الأنبوب العصبي للجنين في الأسابيع الأولى من الحمل.",
        sections: [
          {
            heading: "التوصيات",
            body: [
              "ينصح بتناول 400 ميكروغرام يومياً من حمض الفوليك لجميع نساء سن الإنجاب القادرات على الحمل، بدءاً من شهر واحد قبل الحمل على الأقل.",
              "الجرعات الأعلى قد تُوصى بها للحالات عالية الخطر ويحددها الطبيب.",
              "المصادر الغذائية تشمل الخضروات الورقية الداكنة والبقوليات والحبوب المدعّمة.",
            ],
          },
          {
            heading: "لماذا قبل الحمل؟",
            body: [
              "الأنبوب العصبي يغلق خلال الأسابيع 3–4 من الحمل، غالباً قبل علم المرأة بحملها.",
              "لذلك فإن تناول حمض الفوليك قبل الحمل أساسي للوقاية.",
            ],
          },
        ],
        warningSigns: [
          "يجب استشارة الطبيب قبل تناول جرعات أعلى من 400 ميكروغرام يومياً.",
        ],
        whenToSeekCare: [
          "قبل التخطيط للحمل لإجراء تقييم ما قبل الحمل.",
        ],
      },
      en: {
        definition:
          "Folic acid is the synthetic form of vitamin B9, essential for fetal neural tube development in early pregnancy.",
        sections: [
          {
            heading: "Recommendations",
            body: [
              "All women of childbearing age capable of pregnancy are advised to take 400 micrograms of folic acid daily, starting at least one month before pregnancy.",
              "Higher doses may be recommended for high-risk cases and are determined by a physician.",
              "Dietary sources include dark leafy greens, legumes, and fortified grains.",
            ],
          },
          {
            heading: "Why Before Pregnancy?",
            body: [
              "The neural tube closes during weeks 3–4 of pregnancy, often before a woman knows she is pregnant.",
              "Therefore, preconception folic acid is essential for prevention.",
            ],
          },
        ],
        warningSigns: [
          "Consult a physician before taking doses higher than 400 micrograms daily.",
        ],
        whenToSeekCare: [
          "Before planning pregnancy for a preconception assessment.",
        ],
      },
    },
    references: [
      "WHO. Folic Acid Supplementation in Periconceptional Period.",
      "CDC. Folic Acid: Recommendations.",
      "ACOG. Neural Tube Defects. Practice Bulletin.",
    ],
    lastReviewed: "2026-01-10",
    readingTime: 4,
    related: ["preconception-nutrition"],
  },
  {
    id: "preconception-nutrition",
    slug: "preconception-nutrition",
    section: "preconception",
    category: "preparing-pregnancy",
    title: { ar: "التغذية قبل الحمل", en: "Preconception Nutrition" },
    description: {
      ar: "إرشادات غذائية لتحضير الجسم للحمل الصحي.",
      en: "Nutritional guidelines to prepare the body for a healthy pregnancy.",
    },
    content: {
      ar: {
        definition:
          "التغذية قبل الحمل هي اتباع نظام غذائي متوازن قبل الحمل لتعزيز صحة الأم والجنين.",
        sections: [
          {
            heading: "العناصر الغذائية الأساسية",
            body: [
              "حمض الفوليك: 400 ميكروغرام يومياً.",
              "الحديد: لدعم مخزون الحديد قبل الحمل.",
              "الكالسيوم وفيتامين D: لصحة العظام.",
              "اليود: مهماً لوظيفة الغدة الدرقية ونمو دماغ الجنين.",
              "أحماض أوميغا-3 الدهنية: تدعم نمو الجنين.",
            ],
          },
          {
            heading: "نصائح عامة",
            body: [
              "تنويع الطعام من جميع المجموعات الغذائية.",
              "الحد من الكافيين والسكريات المضافة.",
              "تجنب الكحول والتدخين.",
              "الحفاظ على وزن صحي.",
            ],
          },
        ],
        whenToSeekCare: [
          "استشارة أخصائي تغذية أو طبيب قبل الحمل لخطة غذائية فردية.",
        ],
      },
      en: {
        definition:
          "Preconception nutrition involves following a balanced diet before pregnancy to optimize maternal and fetal health.",
        sections: [
          {
            heading: "Key Nutrients",
            body: [
              "Folic acid: 400 micrograms daily.",
              "Iron: to support iron stores before pregnancy.",
              "Calcium and vitamin D: for bone health.",
              "Iodine: important for thyroid function and fetal brain development.",
              "Omega-3 fatty acids: support fetal development.",
            ],
          },
          {
            heading: "General Tips",
            body: [
              "Eat a variety of foods from all food groups.",
              "Limit caffeine and added sugars.",
              "Avoid alcohol and smoking.",
              "Maintain a healthy weight.",
            ],
          },
        ],
        whenToSeekCare: [
          "Consult a dietitian or physician before pregnancy for an individualized nutrition plan.",
        ],
      },
    },
    references: [
      "WHO. Nutrient Requirements for Pregnancy.",
      "ACOG. Nutrition During Pregnancy. Committee Opinion.",
    ],
    lastReviewed: "2026-01-10",
    readingTime: 4,
    related: ["folic-acid"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesBySection(section: string): Article[] {
  return ARTICLES.filter((a) => a.section === section);
}

export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}
