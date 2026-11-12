import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import type { Bi, Lang } from '../lib/types';
import { useStoredState } from '../lib/storage';
import { authStrings } from './authStrings';

/**
 * Bilingual UI dictionary. Every key holds both languages so the two
 * versions can never drift apart; `pick` resolves data-level content.
 */
export const ui: Record<string, Bi> = {
  ...authStrings,
  'app.name': { ar: 'رِفْقَة', en: 'RIFQAH' },
  'app.tagline': {
    ar: 'رحلتكِ نحو أمومة آمنة.',
    en: 'Your Pregnancy Journey, Your Health, Your Safety.',
  },
  'app.project': {
    ar: 'مشروع جامعي – تمريض النساء والتوليد',
    en: 'University project – Gynecology & Maternity Nursing',
  },

  'common.save': { ar: 'حفظ', en: 'Save' },
  'common.cancel': { ar: 'إلغاء', en: 'Cancel' },
  'common.delete': { ar: 'حذف', en: 'Delete' },
  'common.add': { ar: 'إضافة', en: 'Add' },
  'common.close': { ar: 'إغلاق', en: 'Close' },
  'common.back': { ar: 'رجوع', en: 'Back' },
  'common.today': { ar: 'اليوم', en: 'Today' },
  'common.date': { ar: 'التاريخ', en: 'Date' },
  'common.time': { ar: 'الوقت', en: 'Time' },
  'common.notes': { ar: 'ملاحظات', en: 'Notes' },
  'common.optional': { ar: 'اختياري', en: 'Optional' },
  'common.week': { ar: 'أسبوع', en: 'Week' },
  'common.weeks': { ar: 'أسابيع', en: 'weeks' },
  'common.days': { ar: 'أيام', en: 'days' },
  'common.day': { ar: 'يوم', en: 'day' },
  'common.empty': { ar: 'لا توجد بيانات مسجلة بعد', en: 'No records yet' },
  'common.saved': { ar: 'تم الحفظ', en: 'Saved' },
  'common.reset': { ar: 'إعادة تعيين', en: 'Reset' },
  'common.minutes': { ar: 'دقيقة', en: 'minutes' },
  'common.kg': { ar: 'كجم', en: 'kg' },
  'common.cm': { ar: 'سم', en: 'cm' },
  'common.of': { ar: 'من', en: 'of' },
  'common.required': { ar: 'هذا الحقل مطلوب', en: 'This field is required' },
  'common.learnMore': { ar: 'اعرفي المزيد', en: 'Learn more' },
  'common.disclaimer': {
    ar: 'هذا المحتوى تعليمي فقط ولا يُعد تشخيصاً أو بديلاً عن استشارة الطبيب أو القابلة المختصة.',
    en: 'This content is educational only and is not a diagnosis or a substitute for advice from your doctor or midwife.',
  },

  'nav.dashboard': { ar: 'اللوحة الرئيسية', en: 'Dashboard' },
  'nav.tracker': { ar: 'متابعة الحمل', en: 'Week tracker' },
  'nav.anc': { ar: 'رعاية الحمل', en: 'Antenatal care' },
  'nav.nutrition': { ar: 'التغذية', en: 'Nutrition' },
  'nav.danger': { ar: 'علامات الخطر', en: 'Danger signs' },
  'nav.movement': { ar: 'حركة الجنين', en: 'Fetal movement' },
  'nav.labor': { ar: 'التحضير للولادة', en: 'Labor prep' },
  'nav.breastfeeding': { ar: 'الرضاعة الطبيعية', en: 'Breastfeeding' },
  'nav.postpartum': { ar: 'ما بعد الولادة', en: 'Postpartum' },
  'nav.profile': { ar: 'ملفي', en: 'My profile' },

  'dashboard.hello': { ar: 'مرحباً', en: 'Welcome' },
  'dashboard.helloNamed': { ar: 'مرحباً، {name}', en: 'Welcome, {name}' },
  'dashboard.subtitle': {
    ar: 'رفيقتك في كل أسبوع من رحلة الحمل',
    en: 'Your companion through every week of pregnancy',
  },
  'dashboard.weekNow': { ar: 'الأسبوع الحالي', en: 'Current week' },
  'dashboard.gestAge': { ar: 'العمر الحملي', en: 'Gestational age' },
  'dashboard.edd': { ar: 'تاريخ الولادة المتوقع', en: 'Estimated due date' },
  'dashboard.progress': { ar: 'تقدم الحمل', en: 'Pregnancy progress' },
  'dashboard.trimester': { ar: 'الثلث', en: 'Trimester' },
  'dashboard.daysLeft': { ar: 'يوماً متبقياً', en: 'days to go' },
  'dashboard.weekFormat': { ar: 'أسبوع {weeks} + {days} يوم', en: 'Week {weeks} + {days} days' },
  'dashboard.quick': { ar: 'الوصول السريع', en: 'Quick access' },
  'dashboard.nextAppt': { ar: 'الموعد القادم', en: 'Next appointment' },
  'dashboard.noAppt': {
    ar: 'لا يوجد موعد قادم مسجل — أضيفي مواعيد المتابعة',
    en: 'No upcoming appointment recorded — set up your antenatal schedule',
  },
  'dashboard.emergencyTitle': { ar: 'هل تعانين من علامة خطر؟', en: 'Experiencing a danger sign?' },
  'dashboard.emergencyText': {
    ar: 'نزيف، صداع شديد، تشوش في الرؤية، ألم بطن شديد، تسرب سائل، أو قلة حركة الجنين — توجّهي فوراً لأقرب مستشفى.',
    en: 'Bleeding, severe headache, blurred vision, severe abdominal pain, fluid leakage or reduced fetal movement — go to the nearest hospital immediately.',
  },
  'dashboard.emergencyCta': { ar: 'علامات الخطر', en: 'Danger signs' },
  'dashboard.tip': { ar: 'نصيحة هذا الأسبوع', en: "This week's tip" },
  'dashboard.trackers': { ar: 'متابعاتك', en: 'Your trackers' },
  'dashboard.latestBP': { ar: 'آخر ضغط دم', en: 'Latest blood pressure' },
  'dashboard.latestWeight': { ar: 'آخر وزن', en: 'Latest weight' },
  'dashboard.water': { ar: 'ماء اليوم', en: 'Water today' },
  'dashboard.movements': { ar: 'آخر جلسة حركة', en: 'Last movement session' },
  'dashboard.notRecorded': { ar: 'لم يُسجل', en: 'Not recorded' },
  'dashboard.lmpMissing': {
    ar: 'أضيفي تاريخ أول يوم من آخر دورة شهرية لعرض حساب الأسبوع وتاريخ الولادة المتوقع.',
    en: 'Add the first day of your last menstrual period to see your week and estimated due date.',
  },
  'dashboard.setupCta': { ar: 'إعداد ملف الحمل', en: 'Set up pregnancy profile' },
  'dashboard.glassUnit': { ar: 'أكواب', en: 'glasses' },
  'dashboard.movementUnit': { ar: 'حركة', en: 'movements' },

  'setup.title': { ar: 'إعداد ملف الحمل', en: 'Pregnancy profile setup' },
  'setup.subtitle': {
    ar: 'تُحفظ بياناتك على جهازك فقط ولا تُرسل إلى أي خادم.',
    en: 'Your data is stored only on this device and never sent to a server.',
  },
  'setup.name': { ar: 'الاسم', en: 'Name' },
  'setup.lmp': { ar: 'أول يوم من آخر دورة شهرية (LMP)', en: 'First day of last menstrual period (LMP)' },
  'setup.lmpHelp': {
    ar: 'يُحسب العمر الحملي وتاريخ الولادة المتوقع بطريقة 280 يوماً من هذا التاريخ.',
    en: 'Gestational age and the estimated due date are calculated with the 280-day method from this date.',
  },
  'setup.weight': { ar: 'الوزن قبل الحمل (كجم)', en: 'Pre-pregnancy weight (kg)' },
  'setup.height': { ar: 'الطول (سم)', en: 'Height (cm)' },
  'setup.clinic': { ar: 'عيادة / مستشفى المتابعة', en: 'Follow-up clinic / hospital' },
  'setup.submit': { ar: 'حفظ ومتابعة', en: 'Save and continue' },
  'setup.sample': { ar: 'تحميل بيانات تجريبية', en: 'Load sample data' },
  'setup.errorLmp': {
    ar: 'أدخلي تاريخاً صحيحاً ليس في المستقبل.',
    en: 'Please enter a valid date that is not in the future.',
  },
  'setup.errorName': { ar: 'أدخلي الاسم أولاً.', en: 'Please enter your name first.' },
  'setup.privacy': { ar: 'الخصوصية', en: 'Privacy' },
  'setup.privacyText': {
    ar: 'جميع القياسات والملاحظات تُخزَّن محلياً في متصفحك (localStorage) ويمكنك حذفها في أي وقت من صفحة الملف.',
    en: 'All measurements and notes are stored locally in your browser (localStorage) and can be deleted at any time from the profile page.',
  },

  'tracker.title': { ar: 'متابعة الحمل أسبوعاً بأسبوع', en: 'Pregnancy week by week' },
  'tracker.subtitle': {
    ar: 'تطور الجنين والتغيرات التي تشعرين بها في كل أسبوع من الحمل.',
    en: 'Fetal development and the changes you may feel each week of pregnancy.',
  },
  'tracker.fetal': { ar: 'نمو الجنين', en: 'Fetal development' },
  'tracker.maternal': { ar: 'تغيرات الأم', en: 'Maternal changes' },
  'tracker.illustration': { ar: 'رسم توضيحي تعليمي', en: 'Educational illustration' },
  'tracker.prev': { ar: 'الأسبوع السابق', en: 'Previous week' },
  'tracker.next': { ar: 'الأسبوع التالي', en: 'Next week' },
  'tracker.pick': { ar: 'اختاري الأسبوع', en: 'Choose a week' },
  'tracker.current': { ar: 'أسبوعك الحالي', en: 'Your current week' },
  'tracker.lmpUsed': { ar: 'محسوب من آخر دورة: {date}', en: 'Calculated from LMP: {date}' },
  'tracker.method': { ar: 'طريقة 280 يوماً (قاعدة نيجيله)', en: '280-day method (Naegele’s rule)' },
  'tracker.size': { ar: 'الطول والوزن التقريبيان', en: 'Approximate length and weight' },
  'tracker.weekN': { ar: 'الأسبوع {n}', en: 'Week {n}' },
  'tracker.trimesterN': { ar: 'الثلث {n}', en: 'Trimester {n}' },
  'tracker.disclaimer': {
    ar: 'أحجام الجنين تقديرية وتختلف من طفل لآخر؛ وتعتمد التقديرات على متوسطات مرجعية تعليمية.',
    en: 'Fetal sizes are approximate and vary between babies; values follow standard educational reference averages.',
  },

  'anc.title': { ar: 'رعاية الحمل قبل الولادة', en: 'Antenatal care' },
  'anc.subtitle': {
    ar: 'ثماني زيارات متابعة وفق توصيات منظمة الصحة العالمية (2016) مع التحاليل والقياسات الأساسية.',
    en: 'Eight antenatal contacts based on WHO 2016 recommendations, with essential tests and measurements.',
  },
  'anc.schedule': { ar: 'جدول مواعيد المتابعة', en: 'Antenatal appointment schedule' },
  'anc.scheduleNote': {
    ar: 'تُحسب المواعيد من تاريخ آخر دورة؛ ويجب تأكيدها مع عيادتك.',
    en: 'Dates are calculated from your LMP; confirm them with your clinic.',
  },
  'anc.contactN': { ar: 'الزيارة {n}', en: 'Contact {n}' },
  'anc.markDone': { ar: 'تسجيل كمنجزة', en: 'Mark as attended' },
  'anc.done': { ar: 'منجزة', en: 'Attended' },
  'anc.pending': { ar: 'قادمة', en: 'Upcoming' },
  'anc.undo': { ar: 'تراجع', en: 'Undo' },
  'anc.tests': { ar: 'التحاليل المخبرية قبل الولادة', en: 'Prenatal laboratory tests' },
  'anc.testWhen': { ar: 'التوقيت', en: 'Timing' },
  'anc.testWhy': { ar: 'الهدف', en: 'Purpose' },
  'anc.bp': { ar: 'متابعة ضغط الدم', en: 'Blood pressure tracking' },
  'anc.addBP': { ar: 'إضافة قياس', en: 'Add reading' },
  'anc.systolic': { ar: 'الانقباضي', en: 'Systolic' },
  'anc.diastolic': { ar: 'الانبساطي', en: 'Diastolic' },
  'anc.pulse': { ar: 'النبض', en: 'Pulse' },
  'anc.bpNormal': { ar: 'ضمن المدى الطبيعي', en: 'Within the normal range' },
  'anc.bpElevated': { ar: 'مرتفع قليلاً — أبلغي مقدم الرعاية', en: 'Slightly elevated — tell your provider' },
  'anc.bpHigh': { ar: 'مرتفع — راجعي مقدم الرعاية', en: 'High — contact your provider' },
  'anc.bpCrisis': {
    ar: 'مرتفع جداً — اطلبي رعاية عاجلة الآن',
    en: 'Very high — seek urgent care now',
  },
  'anc.bpNote': {
    ar: 'التصنيف تعليمي استناداً إلى عتبات معتمدة (120/80، 130/80، 140/90، 160/110). القياس المتكرر المرتفع يحتاج تقييماً طبياً.',
    en: 'Classification is educational, based on standard thresholds (120/80, 130/80, 140/90, 160/110). Repeated high readings need clinical assessment.',
  },
  'anc.weight': { ar: 'متابعة الوزن', en: 'Weight tracking' },
  'anc.addWeight': { ar: 'إضافة وزن', en: 'Add weight' },
  'anc.gain': { ar: 'الزيادة الحالية', en: 'Current gain' },
  'anc.recommendedGain': { ar: 'الزيادة الكلية الموصى بها', en: 'Recommended total gain' },
  'anc.bmi': { ar: 'مؤشر كتلة الجسم قبل الحمل', en: 'Pre-pregnancy BMI' },
  'anc.weightNote': {
    ar: 'تُقدر الزيادة الموصى بها وفق مؤشر كتلة الجسم قبل الحمل (توصيات IOM/NAM 2009 للحمل الفردي).',
    en: 'Recommended gain is estimated from pre-pregnancy BMI (IOM/NAM 2009 guidance for a singleton pregnancy).',
  },
  'anc.visits': { ar: 'سجل الزيارات الصحية', en: 'Health visit records' },
  'anc.addVisit': { ar: 'إضافة زيارة', en: 'Add visit' },
  'anc.provider': { ar: 'مقدم الرعاية', en: 'Care provider' },
  'anc.reason': { ar: 'سبب الزيارة', en: 'Reason for visit' },
  'anc.reminder': { ar: 'تذكير المواعيد', en: 'Appointment reminders' },
  'anc.reminderNote': {
    ar: 'يظهر أقرب موعد قادم في اللوحة الرئيسية مع عدد الأيام المتبقية، ويمكنك تفعيل تنبيه المتصفح للموعد.',
    en: 'Your next appointment appears on the dashboard with the days remaining, and you can enable a browser reminder.',
  },
  'anc.enableReminder': { ar: 'تفعيل تنبيه المتصفح', en: 'Enable browser reminder' },
  'anc.reminderOn': { ar: 'تنبيه المتصفح مفعّل', en: 'Browser reminder enabled' },
  'anc.reminderDenied': { ar: 'المتصفح لم يمنح الإذن للتنبيهات', en: 'The browser did not grant notification permission' },
  'anc.emptyBP': { ar: 'لم تُسجل قياسات ضغط بعد', en: 'No blood pressure readings yet' },
  'anc.emptyWeight': { ar: 'لم تُسجل أوزان بعد', en: 'No weight entries yet' },
  'anc.emptyVisits': { ar: 'لا توجد زيارات مسجلة', en: 'No visits recorded' },
  'anc.weekOf': { ar: 'الأسبوع {n}', en: 'Week {n}' },

  'nutrition.title': { ar: 'تغذية الحمل', en: 'Pregnancy nutrition' },
  'nutrition.subtitle': {
    ar: 'غذاء متوازن يدعم نمو الجنين وصحة الأم خلال الحمل.',
    en: 'A balanced diet that supports fetal growth and maternal health during pregnancy.',
  },
  'nutrition.plate': { ar: 'طبق صحي متوازن', en: 'A balanced pregnancy plate' },
  'nutrition.nutrients': { ar: 'العناصر الغذائية الأساسية', en: 'Key nutrients' },
  'nutrition.sources': { ar: 'المصادر الغذائية', en: 'Food sources' },
  'nutrition.why': { ar: 'الفائدة', en: 'Why it matters' },
  'nutrition.amount': { ar: 'الكمية اليومية التقريبية', en: 'Approximate daily target' },
  'nutrition.avoid': { ar: 'أطعمة يجب تجنبها', en: 'Foods to avoid' },
  'nutrition.avoidReason': { ar: 'السبب', en: 'Why' },
  'nutrition.avoidNote': {
    ar: 'تُبنى هذه القائمة على توصيات السلامة الغذائية المعتمدة للحد من خطر العدوى (الليستيريا، التوكسوبلازما) والملوثات.',
    en: 'This list follows standard food-safety guidance that reduces the risk of infection (listeria, toxoplasma) and contaminants.',
  },
  'nutrition.hydration': { ar: 'شرب الماء', en: 'Hydration' },
  'nutrition.goal': { ar: 'الهدف اليومي', en: 'Daily goal' },
  'nutrition.addGlass': { ar: 'إضافة كوب', en: 'Add a glass' },
  'nutrition.removeGlass': { ar: 'إزالة كوب', en: 'Remove a glass' },
  'nutrition.glasses': { ar: '{n} من {total} أكواب', en: '{n} of {total} glasses' },
  'nutrition.hydrationNote': {
    ar: 'يزداد الاحتياج للسوائل في الحمل إلى نحو 2.3 لتر يومياً (حوالي 9–10 أكواب)، ويزيد أكثر في الجو الحار أو مع القيء.',
    en: 'Fluid needs rise in pregnancy to about 2.3 L per day (roughly 9–10 glasses), and increase further in hot weather or with vomiting.',
  },
  'nutrition.meals': { ar: 'أفكار وجبات يومية', en: 'Daily meal ideas' },
  'nutrition.breakfast': { ar: 'الفطور', en: 'Breakfast' },
  'nutrition.lunch': { ar: 'الغداء', en: 'Lunch' },
  'nutrition.dinner': { ar: 'العشاء', en: 'Dinner' },
  'nutrition.snack': { ar: 'وجبة خفيفة', en: 'Snack' },
  'nutrition.vegetables': { ar: 'خضروات', en: 'Vegetables' },
  'nutrition.proteinPart': { ar: 'بروتين', en: 'Protein' },
  'nutrition.carbsPart': { ar: 'حبوب كاملة', en: 'Whole grains' },
  'nutrition.fruitPart': { ar: 'فاكهة', en: 'Fruit' },
  'nutrition.dairyPart': { ar: 'ألبان', en: 'Dairy' },

  'danger.title': { ar: 'علامات الخطر في الحمل', en: 'Pregnancy danger signs' },
  'danger.subtitle': {
    ar: 'علامات تستوجب تقييماً طبياً فورياً — لا تنتظري موعد الزيارة القادمة.',
    en: 'Signs that need immediate medical assessment — do not wait for your next appointment.',
  },
  'danger.emergency': { ar: 'حالة طارئة', en: 'Emergency' },
  'danger.emergencyText': {
    ar: 'توجّهي فوراً إلى أقرب مستشفى أو اتصلي بخدمات الطوارئ، وأبلغي قسم الولادة أنك حامل وبأي علامة تعانين منها.',
    en: 'Go to the nearest hospital immediately or call emergency services, and tell the maternity unit that you are pregnant and which sign you have.',
  },
  'danger.signs': { ar: 'العلامات', en: 'The signs' },
  'danger.action': { ar: 'ماذا تفعلين', en: 'What to do' },
  'danger.why': { ar: 'لماذا هي خطيرة', en: 'Why it matters' },
  'danger.when': { ar: 'متى تطلبين المساعدة الفورية', en: 'When to seek help immediately' },
  'danger.note': {
    ar: 'هذه العلامات مأخوذة من التوجيهات المعتمدة لمنظمة الصحة العالمية لرعاية الحمل. الهدف تعليمي وتوعوي ولا يُعد تشخيصاً.',
    en: 'These signs follow WHO guidance on antenatal care. The purpose is education and awareness, not diagnosis.',
  },
  'danger.callNow': { ar: 'اتصلي بالطوارئ', en: 'Call emergency services' },

  'movement.title': { ar: 'حركة الجنين', en: 'Fetal movement' },
  'movement.subtitle': {
    ar: 'معرفة نمط حركة طفلك اليومي تساعد على اكتشاف أي تغير مبكراً.',
    en: 'Knowing your baby’s usual movement pattern helps you notice changes early.',
  },
  'movement.why': { ar: 'لماذا نراقب الحركة؟', en: 'Why monitor movements?' },
  'movement.how': { ar: 'كيف تعدّين الحركات؟', en: 'How to count movements' },
  'movement.when': { ar: 'متى تبدئين؟', en: 'When to start' },
  'movement.record': { ar: 'سجل الحركات', en: 'Movement recorder' },
  'movement.start': { ar: 'ابدئي العد', en: 'Start counting' },
  'movement.stop': { ar: 'إنهاء الجلسة', en: 'Finish session' },
  'movement.count': { ar: 'عدد الحركات', en: 'Movements counted' },
  'movement.tap': { ar: 'اضغطي الزر مع كل حركة', en: 'Tap the button for each movement' },
  'movement.save': { ar: 'حفظ الجلسة', en: 'Save session' },
  'movement.savedMsg': { ar: 'تم حفظ جلسة الحركة', en: 'Movement session saved' },
  'movement.history': { ar: 'الجلسات السابقة', en: 'Previous sessions' },
  'movement.empty': { ar: 'لا توجد جلسات مسجلة بعد', en: 'No sessions recorded yet' },
  'movement.alertTitle': { ar: 'إذا قلّت الحركة أو تغيّر نمطها', en: 'If movements decrease or change pattern' },
  'movement.alertText': {
    ar: 'اتصلي بقسم الولادة أو مقدم الرعاية فوراً — لا تنتظري حتى الصباح، ولا تعتمدي على أجهزة الاستماع المنزلية.',
    en: 'Contact your maternity unit or care provider immediately — do not wait until morning and do not rely on home listening devices.',
  },
  'movement.duration': { ar: 'المدة', en: 'Duration' },
  'movement.noMovement': {
    ar: 'لم تُسجل حركة في هذه الجلسة',
    en: 'No movements recorded in this session',
  },
  'movement.running': { ar: 'الجلسة جارية', en: 'Session running' },
  'movement.needStart': {
    ar: 'ابدئي الجلسة أولاً ثم اضغطي الزر مع كل حركة.',
    en: 'Start a session first, then tap for each movement.',
  },
  'movement.countTarget': {
    ar: 'عادةً 10 حركات في غضون ساعتين أمر مطمئن، لكن المهم هو نمط طفلك المعتاد.',
    en: 'Around 10 movements within 2 hours is usually reassuring, but what matters most is your baby’s own usual pattern.',
  },
  'movement.disclaimer': {
    ar: 'هذا السجل أداة تعليمية لتوثيق الحركة، وليس بديلاً عن تقييم الجنين في المستشفى.',
    en: 'This log is an educational tool to record movements; it does not replace in-hospital fetal assessment.',
  },

  'labor.title': { ar: 'التحضير للولادة', en: 'Labor preparation' },
  'labor.subtitle': {
    ar: 'علامات الولادة، مراحلها، حقيبة المستشفى، وخطة الولادة.',
    en: 'Signs of labor, its stages, your hospital bag and your birth plan.',
  },
  'labor.signs': { ar: 'علامات بدء الولادة', en: 'Signs of labor' },
  'labor.stages': { ar: 'مراحل الولادة الثلاث', en: 'The three stages of labor' },
  'labor.stage': { ar: 'المرحلة {n}', en: 'Stage {n}' },
  'labor.bag': { ar: 'حقيبة الولادة', en: 'Hospital bag checklist' },
  'labor.bagProgress': { ar: '{done} من {total} عناصر', en: '{done} of {total} items' },
  'labor.bagNote': {
    ar: 'جهّزي الحقيبة بين الأسبوع 34 و36 حتى تكون جاهزة في أي وقت.',
    en: 'Pack your bag between weeks 34 and 36 so it is ready at any time.',
  },
  'labor.birthPlan': { ar: 'خطة الولادة', en: 'Birth plan' },
  'labor.birthPlace': { ar: 'مكان الولادة', en: 'Birth place' },
  'labor.support': { ar: 'المرافق / الداعم', en: 'Support person' },
  'labor.pain': { ar: 'تفضيلات تخفيف الألم', en: 'Pain relief preference' },
  'labor.positions': { ar: 'أوضاع مفضلة', en: 'Preferred positions' },
  'labor.feeding': { ar: 'خطة التغذية بعد الولادة', en: 'Feeding plan' },
  'labor.requests': { ar: 'طلبات خاصة', en: 'Special requests' },
  'labor.skinToSkin': { ar: 'تلامس جلدي مباشر بعد الولادة', en: 'Skin-to-skin contact after birth' },
  'labor.cord': { ar: 'تأجيل قطع الحبل السري', en: 'Delayed cord clamping' },
  'labor.savePlan': { ar: 'حفظ خطة الولادة', en: 'Save birth plan' },
  'labor.savedPlan': { ar: 'تم حفظ خطة الولادة', en: 'Birth plan saved' },
  'labor.breathing': { ar: 'تمارين التنفس والاسترخاء', en: 'Breathing and relaxation' },
  'labor.startBreath': { ar: 'ابدئي التمرين', en: 'Start exercise' },
  'labor.stopBreath': { ar: 'إيقاف', en: 'Stop' },
  'labor.inhale': { ar: 'شهيق', en: 'Breathe in' },
  'labor.hold': { ar: 'احتفظي', en: 'Hold' },
  'labor.exhale': { ar: 'زفير', en: 'Breathe out' },
  'labor.round': { ar: 'الجولة {n}', en: 'Round {n}' },
  'labor.breathNote': {
    ar: 'تنفس بطيء: شهيق 4 ثوان، حبس 4، زفير 6. يساعد على الاسترخاء وتخفيف التوتر بين الانقباضات.',
    en: 'Slow breathing: inhale 4 s, hold 4 s, exhale 6 s. It helps you relax and eases tension between contractions.',
  },
  'labor.tip': {
    ar: 'لا تذهبي للمستشفى في كل انقباض مبكر؛ اتصلي بقسم الولادة إذا كانت الانقباضات منتظمة وقوية أو إذا نزل الماء أو حدث نزيف.',
    en: 'Do not rush to hospital with early irregular contractions; call your maternity unit when contractions become regular and strong, or if your waters break or you bleed.',
  },

  'bf.title': { ar: 'الرضاعة الطبيعية', en: 'Breastfeeding' },
  'bf.subtitle': {
    ar: 'الفوائد، الأوضاع الصحيحة، الإمساك الجيد، وحلول المشكلات الشائعة.',
    en: 'Benefits, positions, a good latch and solutions to common problems.',
  },
  'bf.benefits': { ar: 'فوائد الرضاعة الطبيعية', en: 'Benefits of breastfeeding' },
  'bf.positions': { ar: 'أوضاع الرضاعة', en: 'Breastfeeding positions' },
  'bf.latch': { ar: 'الإمساك الصحيح للثدي', en: 'Correct baby latch' },
  'bf.latchSigns': { ar: 'علامات الإمساك الصحيح', en: 'Signs of a good latch' },
  'bf.problems': { ar: 'المشكلات الشائعة وحلولها', en: 'Common problems and solutions' },
  'bf.problem': { ar: 'المشكلة', en: 'Problem' },
  'bf.solution': { ar: 'ما يساعد', en: 'What helps' },
  'bf.whoNote': {
    ar: 'توصي منظمة الصحة العالمية بالرضاعة الطبيعية الحصرية حتى 6 أشهر، ثم إدخال الطعام التكميلي مع استمرار الرضاعة حتى عامين أو أكثر.',
    en: 'WHO recommends exclusive breastfeeding for the first 6 months, then complementary foods with continued breastfeeding up to 2 years or beyond.',
  },

  'pp.title': { ar: 'رعاية ما بعد الولادة', en: 'Postpartum care' },
  'pp.subtitle': {
    ar: 'تعافي الأم، علامات الخطر، دعم الرضاعة، ورعاية المولود الأساسية.',
    en: 'Maternal recovery, danger signs, breastfeeding support and basic newborn care.',
  },
  'pp.recovery': { ar: 'تعافي الأم', en: 'Maternal recovery' },
  'pp.danger': { ar: 'علامات الخطر بعد الولادة', en: 'Postpartum danger signs' },
  'pp.support': { ar: 'دعم الرضاعة الطبيعية', en: 'Breastfeeding support' },
  'pp.newborn': { ar: 'رعاية المولود الأساسية', en: 'Basic newborn care' },
  'pp.when': { ar: 'الوقت', en: 'When' },
  'pp.checkup': {
    ar: 'راجعي مقدم الرعاية خلال 24 ساعة من الولادة، ثم في الأسبوع الأول، ثم بعد 6 أسابيع.',
    en: 'Have a check-up within 24 hours of birth, again in the first week, and at about 6 weeks.',
  },

  'profile.title': { ar: 'ملفي', en: 'My profile' },
  'profile.subtitle': { ar: 'بيانات الحمل والتفضيلات والخصوصية.', en: 'Pregnancy details, preferences and privacy.' },
  'profile.personal': { ar: 'بيانات الحمل', en: 'Pregnancy details' },
  'profile.language': { ar: 'اللغة', en: 'Language' },
  'profile.arabic': { ar: 'العربية', en: 'Arabic' },
  'profile.english': { ar: 'الإنجليزية', en: 'English' },
  'profile.data': { ar: 'البيانات', en: 'Data' },
  'profile.export': { ar: 'تنزيل نسخة من بياناتي', en: 'Download my data' },
  'profile.clear': { ar: 'حذف جميع البيانات', en: 'Delete all data' },
  'profile.clearConfirm': {
    ar: 'سيتم حذف جميع القياسات والملاحظات من هذا المتصفح نهائياً. هل تريدين المتابعة؟',
    en: 'All measurements and notes will be permanently removed from this browser. Continue?',
  },
  'profile.sample': { ar: 'تحميل بيانات تجريبية', en: 'Load sample data' },
  'profile.sampleNote': {
    ar: 'بيانات عرض واقعية لمشروع جامعي: حمل في الأسبوع 24 مع قياسات ومواعيد مسجلة.',
    en: 'Realistic demonstration data for the project: a 24-week pregnancy with recorded measurements and appointments.',
  },
  'profile.privacyText': {
    ar: 'لا يحتوي التطبيق على حسابات أو خوادم: كل البيانات محفوظة محلياً في متصفحك ويمكنك حذفها بنفسك.',
    en: 'The app has no accounts or servers: everything is stored locally in your browser and you can delete it yourself.',
  },
  'profile.about': { ar: 'عن التطبيق', en: 'About' },
  'profile.aboutText': {
    ar: 'رفيقة الحامل تطبيق تعليمي لمشروع جامعي في تمريض النساء والتوليد، يهدف إلى دعم الحامل بالمعلومات والتتبع الذاتي.',
    en: 'Pregnancy Companion is an educational application for a university Gynecology and Maternity Nursing project that supports pregnant women with information and self-tracking.',
  },
  'profile.references': { ar: 'المراجع العلمية', en: 'References' },
  'profile.version': { ar: 'الإصدار', en: 'Version' },
  'profile.updated': { ar: 'تم تحديث بيانات الملف', en: 'Profile updated' },
};

type LangContextValue = {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** UI label lookup with `{param}` interpolation. */
  t: (key: string, params?: Record<string, string | number>) => string;
  /** Resolves bilingual content. */
  pick: (value: Bi) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useStoredState<Lang>('lang', 'ar');

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const entry = ui[key];
      let text = entry ? entry[lang] : key;
      if (params) {
        for (const [name, value] of Object.entries(params)) {
          text = text.split(`{${name}}`).join(String(value));
        }
      }
      return text;
    },
    [lang],
  );

  const pick = useCallback((value: Bi) => (value ? value[lang] : ''), [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isRTL: lang === 'ar',
      setLang,
      toggleLang: () => setLang(lang === 'ar' ? 'en' : 'ar'),
      t,
      pick,
    }),
    [lang, setLang, t, pick],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within LangProvider');
  return context;
}
