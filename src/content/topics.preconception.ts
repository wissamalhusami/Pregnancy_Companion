import type { Topic } from './types';
import { t } from './types';

const reviewed = '2026-11';

/** Preconception Care — العناية قبل الحمل */
export const preconceptionTopics: Topic[] = [
  {
    id: 'preconception-preparation',
    section: 'preconception',
    category: 'prep',
    title: t('الاستعداد للحمل', 'Preparing for pregnancy'),
    summary: t(
      'خطوات عملية قبل الحمل ترفع فرص الحمل الصحي وتقلل المضاعفات.',
      'Practical steps before conception that improve the chance of a healthy pregnancy.',
    ),
    definition: t(
      'الاستعداد للحمل هو مراجعة الحالة الصحية ونمط الحياة قبل حدوث الحمل، وليس بعده.',
      'Preconception preparation is the review of health status and lifestyle before conception rather than after it.',
    ),
    explanation: t(
      'تحدث أهم مراحل نمو أعضاء الجنين في الأسابيع الأولى، غالباً قبل أن تعرف المرأة أنها حامل. لذلك فإن تحسين التغذية، وضبط الأمراض المزمنة، ومراجعة الأدوية قبل الحمل يؤثر مباشرة على نمو الجنين.',
      'The most critical phase of organ development happens in the first weeks, often before a woman knows she is pregnant. Nutrition, control of chronic disease and medication review before conception therefore directly influence fetal development.',
    ),
    causes: t(
      'يزيد خطر المضاعفات مع: العمر فوق 35 أو تحت 18، الوزن المنخفض أو المرتفع جداً، الأمراض المزمنة، التدخين والكحول، ونقص حمض الفوليك.',
      'Risk increases with age over 35 or under 18, very low or very high body weight, chronic disease, smoking and alcohol, and low folate intake.',
    ),
    symptoms: t(
      'لا توجد أعراض، فالحمل لم يحدث بعد؛ الهدف هو تقييم المخاطر قبلها.',
      'There are no symptoms because conception has not occurred; the purpose is to identify risk before it happens.',
    ),
    diagnosis: t(
      'زيارة ما قبل الحمل تشمل التاريخ الطبي والولادي، ضغط الدم، الوزن والطول، فحص الدم، المناعة ضد الحصبة الألمانية، وفيروسات التهاب الكبد، وأحياناً وظائف الغدة الدرقية.',
      'A preconception visit covers medical and obstetric history, blood pressure, weight and height, blood count, rubella immunity, hepatitis viruses and sometimes thyroid function.',
    ),
    management: t(
      'ابدئي حمض الفوليك قبل الحمل، اضبطي السكري والضغط مع طبيبك، توقفي عن التدخين، وحدّثي التطعيمات اللازمة قبل الحمل.',
      'Start folic acid before conception, optimise diabetes and blood pressure with your clinician, stop smoking and update recommended vaccinations before pregnancy.',
    ),
    nursing: t(
      'دور التمريض: شرح أهمية الزيارة قبل الحمل، مراجعة التطعيمات، وتقديم إرشاد مبسط عن التغذية والوزن والتوقف عن التدخين.',
      'Nursing role: explain why a preconception visit matters, check vaccination status and give simple guidance on nutrition, weight and stopping smoking.',
    ),
    seekCare: t(
      'احجزي زيارة قبل الحمل إذا كنتِ تتناولين دواءً منتظماً، أو لديكِ مرض مزمن، أو حمل سابق بمضاعفات، أو عمرك فوق 35.',
      'Book a preconception visit if you take regular medicine, have a chronic condition, a previous pregnancy with complications, or are over 35.',
    ),
    refs: ['acog-preconception', 'who-anc', 'cdc-pregnancy'],
    updated: reviewed,
    tags: ['preconception', 'planning', 'check-up'],
  },
  {
    id: 'fertility-ovulation',
    section: 'preconception',
    category: 'fertility',
    title: t('الخصوبة والإباضة', 'Fertility and ovulation'),
    summary: t(
      'كيف تحدث الإباضة، وما العلامات التي تساعد على معرفة أيام الخصوبة.',
      'How ovulation works and which signs help identify the fertile window.',
    ),
    definition: t(
      'الإباضة هي إطلاق بويضة ناضجة من المبيض، وتحدث عادة قبل الحيض بنحو 14 يوماً في دورة منتظمة.',
      'Ovulation is the release of a mature egg from the ovary, usually about 14 days before the next period in a regular cycle.',
    ),
    explanation: t(
      'تعيش البويضة نحو 12–24 ساعة بعد الإباضة، بينما يبقى الحيوان المنوي قادراً على الإخصاب عدة أيام داخل الجهاز التناسلي. لذلك تمتد نافذة الخصوبة حوالي خمسة أيام قبل الإباضة ويومها.',
      'The egg survives roughly 12–24 hours after ovulation, while sperm can remain capable of fertilising for several days. The fertile window therefore spans about five days before ovulation and the day itself.',
    ),
    causes: t(
      'تتأثر الخصوبة بالعمر (خصوصاً بعد 35)، اضطرابات الغدة الدرقية، متلازمة المبيض المتعدد الكيسات، الانسداد في قنوات فالوب، الوزن، والتدخين.',
      'Fertility is affected by age (especially after 35), thyroid disorders, polycystic ovary syndrome, fallopian tube blockage, weight and smoking.',
    ),
    symptoms: t(
      'قد تلاحظين مخاطاً رقيقاً شفافاً كبياض البيض، وألماً خفيفاً في جانب واحد من الحوض، وارتفاعاً طفيفاً في درجة حرارة الجسم القاعدية بعد الإباضة.',
      'You may notice clear stretchy cervical mucus, mild one-sided pelvic pain and a small rise in basal body temperature after ovulation.',
    ),
    diagnosis: t(
      'يمكن تقدير الإباضة بمخطط الدورة واختبارات الإباضة المنزلية. إذا لم يحدث حمل بعد 12 شهراً (أو 6 أشهر بعد سن 35) يلزم تقييم طبي.',
      'Ovulation can be estimated with cycle tracking and home ovulation tests. If conception has not occurred after 12 months, or 6 months after age 35, medical assessment is needed.',
    ),
    management: t(
      'الجماع المتكرر كل 2–3 أيام خلال نافذة الخصوبة، والوزن الصحي، والإقلاع عن التدخين تدعم الخصوبة. لا تُستخدم أدوية تحفيز الإباضة إلا بإشراف طبي.',
      'Intercourse every 2–3 days during the fertile window, a healthy weight and stopping smoking support fertility. Ovulation-induction medicines are used only under medical supervision.',
    ),
    nursing: t(
      'دور التمريض: تعليم طريقة تسجيل الدورة، وتصحيح المفاهيم الخاطئة، وتوجيه الزوجين إلى التقييم الطبي في الوقت المناسب.',
      'Nursing role: teach cycle charting, correct misconceptions and guide couples to timely medical assessment.',
    ),
    seekCare: t(
      'راجعي الطبيب إذا كانت الدورات غير منتظمة أو غائبة، أو هناك ألم شديد مع الحيض، أو لم يحدث حمل بعد سنة من المحاولة.',
      'Seek care if cycles are irregular or absent, periods are extremely painful, or pregnancy has not occurred after a year of trying.',
    ),
    refs: ['acog-preconception', 'nhs-pregnancy'],
    updated: reviewed,
    tags: ['fertility', 'ovulation', 'conception'],
  },
  {
    id: 'menstrual-cycle',
    section: 'preconception',
    category: 'cycle',
    title: t('الدورة الشهرية', 'The menstrual cycle'),
    summary: t(
      'مراحل الدورة الطبيعية، وما يعتبر نزيفاً غير طبيعي.',
      'The phases of a normal cycle and what counts as abnormal bleeding.',
    ),
    definition: t(
      'الدورة الشهرية هي نزيف دوري من الرحم ينتج عن تغيرات الهرمونات في المبيض وبطانة الرحم، وتتراوح مدتها الطبيعية بين 21 و35 يوماً.',
      'The menstrual cycle is periodic uterine bleeding driven by ovarian hormones and the endometrium; a normal cycle lasts 21–35 days.',
    ),
    explanation: t(
      'تبدأ الدورة بالطور الجريبي حيث ينمو جريب وتزيد الإستروجين فتثخن بطانة الرحم، ثم تحدث الإباضة، ثم الطور الأصفري حيث يفرز الجسم الأصفر البروجسترون. إذا لم يحدث حمل تنفصل البطانة ويحدث الحيض.',
      'The follicular phase builds the endometrium under oestrogen, ovulation releases the egg, and the luteal phase produces progesterone. Without conception the lining breaks down and menstruation begins.',
    ),
    causes: t(
      'تتغير الدورة مع البلوغ، الرضاعة، اقتراب انقطاع الطمث، التوتر، تغير الوزن، تكيس المبايض، واضطرابات الغدة الدرقية.',
      'Cycles change with puberty, breastfeeding, perimenopause, stress, weight change, polycystic ovary syndrome and thyroid disorders.',
    ),
    symptoms: t(
      'نزيف من 3 إلى 7 أيام، تقلصات أسفل البطن، انتفاخ، ألم ثديين وتقلب مزاج قبل الحيض. النزيف الغزير جداً أو بين الدورات غير طبيعي.',
      'Bleeding for 3–7 days, lower abdominal cramps, bloating, breast tenderness and premenstrual mood change. Very heavy or intermenstrual bleeding is not normal.',
    ),
    diagnosis: t(
      'يعتمد التقييم على تقويم الدورة، فحص الحوض، تعداد الدم، وفحوصات الهرمونات والسونار عند الحاجة.',
      'Assessment uses a cycle diary, pelvic examination, blood count and, when needed, hormone tests and ultrasound.',
    ),
    management: t(
      'يمكن تخفيف التقلصات بالحرارة الموضعية والمسكنات البسيطة. تُناقش خيارات تنظيم النزيف الغزير أو الألم الشديد مع الطبيب.',
      'Cramps may be eased with local heat and simple pain relief. Heavy bleeding or severe pain is discussed with a clinician.',
    ),
    nursing: t(
      'دور التمريض: تعليم تسجيل الدورة ومدة النزيف، وتشجيع مراجعة الطبيب عند تغير النمط.',
      'Nursing role: teach cycle and bleeding charting and encourage review when the pattern changes.',
    ),
    seekCare: t(
      'اطلبي الرعاية عند نزيف يملأ وسادة كل ساعة، أو نزيف بعد انقطاع الطمث، أو ألم لا يستجيب للمسكنات، أو غياب الدورة دون حمل.',
      'Seek care for bleeding that soaks a pad every hour, bleeding after menopause, pain unresponsive to painkillers, or a missed period without pregnancy.',
    ),
    refs: ['nhs-pregnancy', 'acog-preconception'],
    updated: reviewed,
    tags: ['cycle', 'period', 'menstruation'],
  },
  {
    id: 'preconception-folic-acid',
    section: 'preconception',
    category: 'supplements',
    title: t('حمض الفوليك', 'Folic acid'),
    summary: t(
      'لماذا يُبدأ حمض الفوليك قبل الحمل، ومن يحتاج جرعة أعلى.',
      'Why folic acid starts before conception, and who needs a higher dose.',
    ),
    definition: t(
      'حمض الفوليك هو فيتامين ب9 المهم لانقسام الخلايا وتكوين الأنبوب العصبي في الجنين.',
      'Folic acid is vitamin B9, needed for cell division and formation of the fetal neural tube.',
    ),
    explanation: t(
      'يتكوّن الأنبوب العصبي بين الأسبوع الثالث والرابع من الحمل، أي غالباً قبل اكتشافه. تبدأ التوصيات بتناول مكمل حمض الفوليك قبل الحمل بشهر على الأقل ويستمر في الثلث الأول.',
      'The neural tube forms in weeks three and four, often before pregnancy is recognised. Guidance is to start a folic acid supplement at least a month before conception and continue through the first trimester.',
    ),
    causes: t(
      'يزيد خطر عيوب الأنبوب العصبي مع نقص الفوليك، السمنة، السكري، بعض الأدوية (مثل مضادات الصرع)، أو وجود طفل سابق بعيب أنبوب عصبي.',
      'Neural tube defect risk rises with low folate, obesity, diabetes, certain medicines (such as some anti-epileptics) and a previous affected child.',
    ),
    symptoms: t(
      'نقص الفوليك قد يسبب فقر دم مع تعب وشحوب، ولا يسبب أعراضاً مبكرة واضحة.',
      'Folate deficiency can cause anaemia with tiredness and pallor and has no clear early symptoms.',
    ),
    diagnosis: t(
      'لا يُشترط تحليل روتيني؛ يُقيَّم مستوى الهيموغلوبين والفوليك عند وجود عوامل خطر أو فقر دم.',
      'Routine testing is not required; haemoglobin and folate are checked when risk factors or anaemia are present.',
    ),
    management: t(
      'الجرعة الوقائية الشائعة 400 ميكروغرام يومياً قبل الحمل وخلال الثلث الأول. الجرعة الأعلى (حول 5 ملغ) تُستخدم فقط بقرار طبي في الحالات عالية الخطورة. لا تُؤخذ جرعات عالية دون استشارة.',
      'The usual preventive dose is 400 micrograms daily before and during the first trimester. A higher dose (around 5 mg) is used only on medical advice in high-risk situations. Do not take high doses unsupervised.',
    ),
    nursing: t(
      'دور التمريض: التأكيد على الالتزام اليومي، وتوضيح أن المكمل لا يعوّض عن الغذاء المتنوع، وتوجيه الحالات عالية الخطورة للطبيب.',
      'Nursing role: reinforce daily adherence, explain that supplements do not replace a varied diet, and refer high-risk women to a clinician.',
    ),
    seekCare: t(
      'استشري الطبيب قبل الجرعات العالية، أو إذا كنتِ تتناولين أدوية للصرع، أو لديكِ طفل سابق بعيب في الأنبوب العصبي.',
      'Ask a clinician before high doses, or if you take anti-epileptic medicines or have a previous child with a neural tube defect.',
    ),
    refs: ['who-folic', 'cdc-pregnancy'],
    updated: reviewed,
    tags: ['folic acid', 'folate', 'supplement', 'neural tube'],
  },
  {
    id: 'preconception-nutrition',
    section: 'preconception',
    category: 'supplements',
    title: t('التغذية والمكملات قبل الحمل', 'Nutrition and supplements before pregnancy'),
    summary: t(
      'نمط غذائي متوازن، والحدود الآمنة للفيتامينات قبل الحمل.',
      'A balanced eating pattern and safe vitamin limits before conception.',
    ),
    definition: t(
      'التغذية قبل الحمل هي اتباع نمط غذائي متنوع يوفر الحديد والكالسيوم والبروتين والفيتامينات قبل حدوث الحمل.',
      'Preconception nutrition means a varied diet supplying iron, calcium, protein and vitamins before pregnancy begins.',
    ),
    explanation: t(
      'تزيد احتياجات الحديد واليود والكالسيوم في الحمل، ومخزون جيد قبل الحمل يقلل خطر فقر الدم ومضاعفات النمو. فيتامين أ بجرعات عالية قد يضر الجنين، لذا تُتجنب مكملات فيتامين أ عالية الجرعة قبل الحمل.',
      'Iron, iodine and calcium needs rise in pregnancy; good stores beforehand reduce anaemia and growth complications. High-dose vitamin A can harm the fetus, so high-dose vitamin A supplements are avoided before conception.',
    ),
    causes: t(
      'يزيد خطر النقص مع النظام النباتي غير المخطط، الحميات المقيدة، اضطرابات الأكل، أمراض الجهاز الهضمي، والحمل المتكرر.',
      'Deficiency risk rises with an unplanned vegan diet, restrictive dieting, eating disorders, gastrointestinal disease and closely spaced pregnancies.',
    ),
    symptoms: t(
      'تعب، شحوب، دوار، تساقط الشعر وضعف الأظافر قد تشير إلى نقص الحديد أو غيره من العناصر.',
      'Tiredness, pallor, dizziness, hair loss and brittle nails may indicate iron or other nutrient deficiency.',
    ),
    diagnosis: t(
      'يُقيَّم الوزن ومؤشر كتلة الجسم وتعداد الدم عند الاشتباه، مع مراجعة النظام الغذائي.',
      'Weight and body mass index are assessed, with a blood count when deficiency is suspected and a review of the diet.',
    ),
    management: t(
      'وجبات تحتوي خضروات ورقية وبروتيناً وبقوليات وحبوباً كاملة ومنتجات ألبان، مع مصدر فيتامين ب12 للنباتيات. تُستخدم المكملات بجرعات موصى بها فقط.',
      'Meals with leafy vegetables, protein, legumes, whole grains and dairy, plus a vitamin B12 source for vegans. Supplements are used only at recommended doses.',
    ),
    nursing: t(
      'دور التمريض: تقديم إرشاد غذائي بسيط ومناسب للثقافة المحلية، وتشجيع الفحص عند علامات النقص.',
      'Nursing role: give simple, culturally appropriate dietary guidance and encourage testing when deficiency signs appear.',
    ),
    seekCare: t(
      'استشري أخصائي تغذية أو الطبيب إذا كنتِ تتبعين نظاماً نباتياً صرفاً، أو لديكِ اضطراب أكل، أو نقص معروف.',
      'Consult a dietitian or clinician if you follow a strict vegan diet, have an eating disorder or a known deficiency.',
    ),
    refs: ['cdc-pregnancy', 'who-anc'],
    updated: reviewed,
    tags: ['nutrition', 'iron', 'vitamin', 'diet'],
  },
  {
    id: 'preconception-chronic',
    section: 'preconception',
    category: 'chronic',
    title: t('الأمراض المزمنة والحمل', 'Chronic conditions and pregnancy'),
    summary: t(
      'ضبط السكري والضغط والغدة الدرقية قبل الحمل يقلل المضاعفات.',
      'Optimising diabetes, hypertension and thyroid disease before conception reduces complications.',
    ),
    definition: t(
      'الأمراض المزمنة هي حالات صحية مستمرة تحتاج متابعة قبل الحمل وأثناءه، مثل السكري والضغط والصرع والغدة الدرقية.',
      'Chronic conditions are ongoing health problems needing review before and during pregnancy, such as diabetes, hypertension, epilepsy and thyroid disease.',
    ),
    explanation: t(
      'الحمل يزيد الحمل على القلب والكلى ويغيّر استجابة الأنسولين. الضبط الجيد قبل الحمل يقلل خطر التشوهات الخلقية، وتسمم الحمل، وولادة طفل صغير أو مبكر.',
      'Pregnancy increases cardiac and renal workload and changes insulin response. Good preconception control lowers the risk of congenital anomalies, pre-eclampsia, and a small or preterm baby.',
    ),
    causes: t(
      'تشمل عوامل الخطر: السمنة، التاريخ العائلي، ارتفاع ضغط مزمن، سكري معروف، وأمراض مناعية أو كُلوية.',
      'Risk factors include obesity, family history, chronic hypertension, known diabetes, and immune or kidney disease.',
    ),
    symptoms: t(
      'قد تكون الحالة بلا أعراض، أو تظهر كصداع، عطش وتبول متكرر، تعب، أو تورم. أي تغير جديد يستدعي تقييماً.',
      'The condition may be silent, or present with headache, thirst and frequent urination, fatigue or swelling. Any new change needs assessment.',
    ),
    diagnosis: t(
      'قياس الضغط، سكر الدم، وظائف الكلى والغدة الدرقية، ومراجعة الأدوية مع الطبيب المختص قبل الحمل.',
      'Blood pressure, blood glucose, kidney and thyroid function, plus medication review with the treating clinician before conception.',
    ),
    management: t(
      'ضبط العلاج قبل الحمل، تعديل الأدوية غير الآمنة للحمل بوصفة طبية، ومتابعة مشتركة بين طبيب الحمل وطبيب الأمراض المزمنة.',
      'Stabilise treatment before conception, change medicines that are unsafe in pregnancy only by prescription, and arrange joint follow-up between maternity and specialist teams.',
    ),
    nursing: t(
      'دور التمريض: متابعة القياسات، تعزيز الالتزام بالعلاج، وتنبيه المريضة إلى أهمية التخطيط للحمل.',
      'Nursing role: support monitoring, reinforce adherence and highlight the importance of planned pregnancy.',
    ),
    seekCare: t(
      'قبل الحمل إذا كان ضغطك أعلى من 140/90، أو سكرك غير مضبوط، أو تحتاجين أدوية مزمنة.',
      'Before pregnancy if blood pressure is above 140/90, glucose is uncontrolled, or you take long-term medicines.',
    ),
    refs: ['acog-preconception', 'who-anc', 'cdc-pregnancy'],
    updated: reviewed,
    tags: ['diabetes', 'hypertension', 'chronic', 'thyroid'],
  },
  {
    id: 'preconception-medication',
    section: 'preconception',
    category: 'chronic',
    title: t('مراجعة الأدوية قبل الحمل', 'Reviewing medicines before pregnancy'),
    summary: t(
      'بعض الأدوية تحتاج تعديلاً قبل الحمل، والقرار دائماً طبي.',
      'Some medicines need adjusting before conception, and that decision is always medical.',
    ),
    definition: t(
      'مراجعة الأدوية هي تقييم كل دواء تتناوله المرأة — بوصفة أو بدونها — قبل الحمل لموازنة الفائدة والخطر.',
      'Medication review means assessing every medicine a woman takes — prescribed or not — before pregnancy to balance benefit and risk.',
    ),
    explanation: t(
      'لا يجوز إيقاف دواء مزمن فجأة؛ فقد يسبب ذلك ضرراً أكبر من الدواء نفسه. الطبيب يختار البديل الأكثر أماناً أو يعدّل الجرعة. المكملات والأعشاب تُذكر أيضاً لأنها قد تتفاعل.',
      'A long-term medicine must never be stopped abruptly, since that can cause more harm than the medicine. The clinician chooses the safest alternative or adjusts the dose. Supplements and herbal products are included because they can interact.',
    ),
    causes: t(
      'الحاجة للمراجعة ترتفع مع أدوية الصرع، مضادات التخثر، أدوية حب الشباب مثل الأيزوتريتينوين، وبعض مسكنات الالتهاب.',
      'Review is especially important with anti-epileptics, anticoagulants, acne medicines such as isotretinoin, and some anti-inflammatory painkillers.',
    ),
    symptoms: t(
      'لا توجد أعراض خاصة؛ المؤشر هو وجود دواء منتظم أو دواء بدأ حديثاً.',
      'There are no specific symptoms; the indication is any regular or recently started medicine.',
    ),
    diagnosis: t(
      'قائمة كاملة بالأدوية والجرعات والمكملات تُراجع مع الطبيب أو الصيدلي قبل الحمل.',
      'A complete list of medicines, doses and supplements is reviewed with a clinician or pharmacist before conception.',
    ),
    management: t(
      'لا تُوقفي أو تغيّري أي دواء من تلقاء نفسك. اطلبي موعداً لمراجعة الأدوية، واستخدمي وسيلة منع حمل موثوقة حتى يكتمل التعديل.',
      'Do not stop or change any medicine yourself. Request a medication review and use reliable contraception until any change is complete.',
    ),
    nursing: t(
      'دور التمريض: تسجيل قائمة الأدوية كاملة، والتأكد من فهم المريضة لتعليمات الطبيب، وتشجيع الصيدلي كشريك في المراجعة.',
      'Nursing role: record the full medicine list, confirm the woman understands instructions and involve the pharmacist in the review.',
    ),
    seekCare: t(
      'قبل الحمل إذا كنتِ تتناولين دواءً منتظماً، أو بدأتِ دواءً جديداً، أو تستخدمين أعشاباً أو مكملاً بجرعة عالية.',
      'Before pregnancy if you take any regular medicine, started a new one, or use herbal products or high-dose supplements.',
    ),
    refs: ['acog-preconception', 'nhs-pregnancy'],
    updated: reviewed,
    tags: ['medication', 'safety', 'prescription'],
  },
  {
    id: 'preconception-counseling',
    section: 'preconception',
    category: 'counseling',
    title: t('الاستشارة الطبية والاستعداد النفسي', 'Counselling and emotional preparation'),
    summary: t(
      'الاستشارة قبل الحمل تجيب عن الأسئلة وتخفف القلق وتحدد الخطة.',
      'Preconception counselling answers questions, reduces anxiety and sets a plan.',
    ),
    definition: t(
      'الاستشارة قبل الحمل هي حوار منظم مع فريق الرعاية حول التوقعات والمخاطر والخيارات قبل محاولة الحمل.',
      'Preconception counselling is a structured conversation with the care team about expectations, risks and options before trying to conceive.',
    ),
    explanation: t(
      'تقلل الاستشارة الشعور بالغموض، وتساعد على اتخاذ قرارات مستنيرة، وتكشف القلق أو تاريخ الاكتئاب أو العنف الأسري الذي يؤثر على الصحة.',
      'Counselling reduces uncertainty, supports informed decisions and identifies anxiety, a history of depression or domestic violence that affects health.',
    ),
    causes: t(
      'تزيد الحاجة للاستشارة مع حمل سابق متعثر، إجهاض متكرر، وفاة مولود، قلق أو اكتئاب، أو ضغوط اجتماعية واقتصادية.',
      'The need rises with a previous difficult pregnancy, recurrent miscarriage, stillbirth, anxiety or depression, or social and financial strain.',
    ),
    symptoms: t(
      'قد تشمل المؤشرات قلقاً مستمراً، اضطراب النوم، خوفاً شديداً من الحمل، أو شعوراً بالحزن معظم الأيام.',
      'Indicators may include persistent anxiety, sleep disturbance, intense fear of pregnancy or low mood most days.',
    ),
    diagnosis: t(
      'يُستخدم حوار مباشر وأحياناً استبيان بسيط للصحة النفسية؛ القرار والتشخيص يبقى للاختصاصي.',
      'A direct conversation and sometimes a short mental-health questionnaire are used; diagnosis remains with the specialist.',
    ),
    management: t(
      'خطة واضحة قبل الحمل، دعم نفسي عند الحاجة، وإشراك الشريك في الزيارة. لا تُستخدم أدوية نفسية أو تُوقف إلا بقرار طبي.',
      'A clear preconception plan, psychological support when needed and involving the partner in the visit. Psychiatric medicines are neither started nor stopped without medical advice.',
    ),
    nursing: t(
      'دور التمريض: الاستماع دون حكم، تقديم معلومات واضحة، وإحالة من تحتاج دعماً نفسياً أو اجتماعياً.',
      'Nursing role: listen without judgement, give clear information and refer those needing psychological or social support.',
    ),
    seekCare: t(
      'اطلبي دعماً نفسياً إذا استمر الحزن أو القلق أسبوعين أو أكثر، أو أثّر على النوم والعمل والعلاقات.',
      'Seek psychological support if low mood or anxiety lasts two weeks or more, or affects sleep, work and relationships.',
    ),
    refs: ['who-ppd', 'acog-preconception', 'nice-ppd'],
    updated: reviewed,
    tags: ['counselling', 'mental health', 'anxiety'],
  },
];
