import type { Bi } from '../lib/types';

/**
 * Account, authentication and brand strings.
 *
 * Kept in a dedicated module so the large auth surface stays readable; merged
 * into the main dictionary in `src/i18n/index.tsx`. Every key holds both
 * languages so the bilingual completeness test covers it automatically.
 */
export const authStrings: Record<string, Bi> = {
  /* ---------------------------------------------------------------- brand */
  'brand.name': { ar: 'رِفْقَة', en: 'RIFQAH' },
  'brand.subtitle': {
    ar: 'رحلتكِ نحو أمومة آمنة.',
    en: 'Your Pregnancy Journey, Your Health, Your Safety.',
  },
  'brand.eyebrow': { ar: 'رفقة في كل خطوة', en: 'Companion at every step' },
  'brand.promise': {
    ar: 'معلومات موثوقة، متابعة بسيطة، وأمان لكِ ولطفلك.',
    en: 'Trusted knowledge, simple tracking, and safety for you and your baby.',
  },

  /* ------------------------------------------------------------ navigation */
  'nav.groupMain': { ar: 'الرئيسية', en: 'Overview' },
  'nav.groupSafety': { ar: 'السلامة', en: 'Safety' },
  'nav.groupCare': { ar: 'الرعاية والتحضير', en: 'Care & preparation' },
  'nav.groupAccount': { ar: 'الحساب', en: 'Account' },
  'nav.setup': { ar: 'بيانات الحمل', en: 'Pregnancy details' },
  'nav.signIn': { ar: 'تسجيل الدخول', en: 'Sign in' },
  'nav.signOut': { ar: 'تسجيل الخروج', en: 'Sign out' },
  'nav.account': { ar: 'الحساب', en: 'Account' },
  'nav.guest': { ar: 'وضع محلي', en: 'Local mode' },
  'nav.openMenu': { ar: 'فتح القائمة', en: 'Open menu' },
  'nav.closeMenu': { ar: 'إغلاق القائمة', en: 'Close menu' },

  /* --------------------------------------------------------------- common */
  'common.loading': { ar: 'جارٍ التحميل…', en: 'Loading…' },
  'common.required': { ar: 'مطلوب', en: 'Required' },
  'common.or': { ar: 'أو', en: 'or' },
  'common.continue': { ar: 'متابعة', en: 'Continue' },
  'common.retry': { ar: 'إعادة المحاولة', en: 'Try again' },

  /* ---------------------------------------------------------------- login */
  'auth.loginTitle': { ar: 'أهلاً بعودتكِ', en: 'Welcome back' },
  'auth.loginSubtitle': {
    ar: 'سجّلي الدخول لمتابعة رحلتكِ وحفظ بياناتكِ.',
    en: 'Sign in to continue your journey and keep your records safe.',
  },
  'auth.registerTitle': { ar: 'أنشئي حسابكِ', en: 'Create your account' },
  'auth.registerSubtitle': {
    ar: 'حساب واحد لمتابعة حملكِ على كل أجهزتكِ.',
    en: 'One account to follow your pregnancy on every device.',
  },
  'auth.forgotTitle': { ar: 'استعادة كلمة المرور', en: 'Reset your password' },
  'auth.forgotSubtitle': {
    ar: 'أدخلي بريدكِ الإلكتروني وسنرسل لكِ رابط إعادة التعيين.',
    en: 'Enter your email and we will send you a reset link.',
  },
  'auth.resetTitle': { ar: 'كلمة مرور جديدة', en: 'New password' },
  'auth.resetSubtitle': {
    ar: 'اختاري كلمة مرور قوية لحماية حسابكِ.',
    en: 'Choose a strong password to protect your account.',
  },
  'auth.callbackTitle': { ar: 'جارٍ إكمال تسجيل الدخول', en: 'Completing sign in' },
  'auth.callbackWorking': {
    ar: 'نؤكّد حسابكِ الآن، لحظات من فضلكِ…',
    en: 'Confirming your account, just a moment…',
  },
  'auth.callbackError': {
    ar: 'تعذّر إكمال تسجيل الدخول. حاولي مرة أخرى.',
    en: 'We could not complete the sign in. Please try again.',
  },

  /* ---------------------------------------------------------------- fields */
  'auth.fullName': { ar: 'الاسم الكامل', en: 'Full name' },
  'auth.fullNamePlaceholder': { ar: 'مثال: سارة أحمد', en: 'e.g. Sarah Ahmed' },
  'auth.email': { ar: 'البريد الإلكتروني', en: 'Email address' },
  'auth.emailPlaceholder': { ar: 'name@example.com', en: 'name@example.com' },
  'auth.password': { ar: 'كلمة المرور', en: 'Password' },
  'auth.passwordPlaceholder': { ar: '٨ أحرف على الأقل', en: 'At least 8 characters' },
  'auth.confirmPassword': { ar: 'تأكيد كلمة المرور', en: 'Confirm password' },
  'auth.newPassword': { ar: 'كلمة المرور الجديدة', en: 'New password' },
  'auth.showPassword': { ar: 'إظهار كلمة المرور', en: 'Show password' },
  'auth.hidePassword': { ar: 'إخفاء كلمة المرور', en: 'Hide password' },

  /* --------------------------------------------------------------- actions */
  'auth.signIn': { ar: 'تسجيل الدخول', en: 'Sign in' },
  'auth.signUp': { ar: 'إنشاء حساب', en: 'Create account' },
  'auth.signingIn': { ar: 'جارٍ تسجيل الدخول…', en: 'Signing in…' },
  'auth.creatingAccount': { ar: 'جارٍ إنشاء الحساب…', en: 'Creating account…' },
  'auth.sendingLink': { ar: 'جارٍ الإرسال…', en: 'Sending link…' },
  'auth.saving': { ar: 'جارٍ الحفظ…', en: 'Saving…' },
  'auth.continueGoogle': { ar: 'المتابعة باستخدام Google', en: 'Continue with Google' },
  'auth.continueFacebook': { ar: 'المتابعة باستخدام Facebook', en: 'Continue with Facebook' },
  'auth.orContinueWith': { ar: 'أو المتابعة بالبريد الإلكتروني', en: 'Or continue with email' },
  'auth.noAccount': { ar: 'ليس لديكِ حساب؟', en: 'New to RIFQAH?' },
  'auth.createAccount': { ar: 'إنشاء حساب جديد', en: 'Create an account' },
  'auth.haveAccount': { ar: 'لديكِ حساب بالفعل؟', en: 'Already have an account?' },
  'auth.forgotLink': { ar: 'نسيتِ كلمة المرور؟', en: 'Forgot your password?' },
  'auth.sendReset': { ar: 'إرسال رابط الاستعادة', en: 'Send reset link' },
  'auth.backToLogin': { ar: 'العودة لتسجيل الدخول', en: 'Back to sign in' },
  'auth.updatePassword': { ar: 'تحديث كلمة المرور', en: 'Update password' },
  'auth.resend': { ar: 'إعادة إرسال رسالة التأكيد', en: 'Resend confirmation email' },
  'auth.resent': { ar: 'أُرسلت رسالة التأكيد.', en: 'Confirmation email sent.' },
  'auth.continueGuest': { ar: 'المتابعة بدون حساب', en: 'Continue without an account' },
  'auth.logout': { ar: 'تسجيل الخروج', en: 'Sign out' },
  'auth.logoutConfirm': { ar: 'هل تريدين تسجيل الخروج؟', en: 'Sign out of RIFQAH?' },

  /* --------------------------------------------------------------- notices */
  'auth.resetSent': { ar: 'تفقّدي بريدكِ الإلكتروني', en: 'Check your inbox' },
  'auth.resetSentBody': {
    ar: 'أرسلنا رابط إعادة تعيين كلمة المرور إلى {email}. قد يستغرق وصوله دقيقة.',
    en: 'We sent a password reset link to {email}. It may take a minute to arrive.',
  },
  'auth.confirmEmailTitle': { ar: 'أكّدي بريدكِ الإلكتروني', en: 'Confirm your email' },
  'auth.confirmEmailBody': {
    ar: 'أرسلنا رسالة تأكيد إلى {email}. افتحي الرابط لتأكيد الحساب ثم سجّلي الدخول.',
    en: 'We sent a confirmation message to {email}. Open the link to activate your account, then sign in.',
  },
  'auth.passwordUpdated': { ar: 'تم تحديث كلمة المرور', en: 'Password updated' },
  'auth.passwordUpdatedBody': {
    ar: 'يمكنكِ الآن استخدام كلمة المرور الجديدة.',
    en: 'You can now use your new password.',
  },
  'auth.loggedOut': { ar: 'تم تسجيل الخروج بأمان.', en: 'You have been signed out.' },
  'auth.secureNote': {
    ar: 'بياناتكِ محمية. لا نطّلع على كلمة المرور ولا نشارك بياناتكِ مع أي جهة.',
    en: 'Your data is protected. We never see your password and never share your data.',
  },
  'auth.guestNotice': { ar: 'أنتِ تستخدمين الوضع المحلي', en: 'You are in local mode' },
  'auth.guestNoticeBody': {
    ar: 'بياناتكِ محفوظة على هذا الجهاز فقط. سجّلي الدخول للاحتفاظ بها عبر أجهزتكِ.',
    en: 'Your data is saved on this device only. Sign in to keep it across your devices.',
  },
  'auth.requiredTitle': { ar: 'تسجيل الدخول مطلوب', en: 'Sign in required' },
  'auth.requiredBody': {
    ar: 'هذه الصفحة تحتوي على معلوماتكِ الشخصية. سجّلي الدخول للمتابعة.',
    en: 'This page contains your personal information. Please sign in to continue.',
  },
  'auth.sessionExpired': {
    ar: 'انتهت صلاحية الجلسة. سجّلي الدخول من جديد.',
    en: 'Your session expired. Please sign in again.',
  },
  'auth.checking': { ar: 'نتحقق من جلستكِ…', en: 'Checking your session…' },
  'auth.provider': { ar: 'طريقة الدخول', en: 'Sign-in method' },
  'auth.notConfiguredTitle': { ar: 'لم يتم ربط خدمة الحسابات بعد', en: 'Accounts are not connected yet' },
  'auth.notConfiguredBody': {
    ar: 'يعمل التطبيق حالياً بالوضع المحلي. أضيفي مفاتيح Supabase لتفعيل تسجيل الدخول.',
    en: 'The app is running in local mode. Add your Supabase keys to enable sign-in.',
  },
  'auth.strength': { ar: 'قوة كلمة المرور', en: 'Password strength' },
  'auth.strength1': { ar: 'ضعيفة', en: 'Weak' },
  'auth.strength2': { ar: 'متوسطة', en: 'Fair' },
  'auth.strength3': { ar: 'جيدة', en: 'Good' },
  'auth.strength4': { ar: 'قوية', en: 'Strong' },
  'auth.privacyNote': {
    ar: 'بإنشاء الحساب توافقين على استخدام البيانات لتقديم خدمة المتابعة فقط.',
    en: 'By creating an account you agree that your data is used only to provide this service.',
  },

  /* ---------------------------------------------------------------- errors */
  'auth.errorName': { ar: 'أدخلي الاسم الكامل (حرفان على الأقل).', en: 'Enter your full name (at least 2 characters).' },
  'auth.errorEmailRequired': { ar: 'البريد الإلكتروني مطلوب.', en: 'Email address is required.' },
  'auth.errorInvalidEmail': { ar: 'صيغة البريد الإلكتروني غير صحيحة.', en: 'Enter a valid email address.' },
  'auth.errorPasswordRequired': { ar: 'كلمة المرور مطلوبة.', en: 'Password is required.' },
  'auth.errorPasswordShort': {
    ar: 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل.',
    en: 'Password must be at least 8 characters.',
  },
  'auth.errorPasswordWeak': {
    ar: 'أضيفي حرفاً ورقماً واحداً على الأقل.',
    en: 'Include at least one letter and one number.',
  },
  'auth.errorPasswordMismatch': { ar: 'كلمتا المرور غير متطابقتين.', en: 'Passwords do not match.' },
  'auth.errorInvalidCredentials': {
    ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    en: 'Incorrect email or password.',
  },
  'auth.errorEmailNotConfirmed': {
    ar: 'لم يتم تأكيد البريد الإلكتروني بعد. افتحي رسالة التأكيد أولاً.',
    en: 'Your email is not confirmed yet. Open the confirmation message first.',
  },
  'auth.errorEmailInUse': {
    ar: 'هذا البريد مسجّل مسبقاً. جرّبي تسجيل الدخول.',
    en: 'This email is already registered. Try signing in.',
  },
  'auth.errorSamePassword': {
    ar: 'كلمة المرور الجديدة يجب أن تختلف عن السابقة.',
    en: 'The new password must differ from the previous one.',
  },
  'auth.errorRateLimited': {
    ar: 'محاولات كثيرة. انتظري قليلاً ثم حاولي مرة أخرى.',
    en: 'Too many attempts. Please wait a moment and try again.',
  },
  'auth.errorProviderDisabled': {
    ar: 'طريقة الدخول هذه غير مفعّلة حالياً.',
    en: 'This sign-in method is not enabled yet.',
  },
  'auth.errorSignupDisabled': {
    ar: 'إنشاء الحسابات معطّل حالياً.',
    en: 'Account creation is currently disabled.',
  },
  'auth.errorNetwork': {
    ar: 'تعذّر الاتصال بالخدمة. تحقّقي من الإنترنت وحاولي مرة أخرى.',
    en: 'Could not reach the service. Check your connection and try again.',
  },
  'auth.errorSessionMissing': {
    ar: 'رابط غير صالح أو منتهي. اطلبي رابطاً جديداً.',
    en: 'This link is invalid or expired. Request a new one.',
  },
  'auth.errorGeneric': { ar: 'حدث خطأ غير متوقع. حاولي مرة أخرى.', en: 'Something went wrong. Please try again.' },
  'auth.errorNotConfigured': {
    ar: 'خدمة الحسابات غير مربوطة بعد.',
    en: 'The accounts service is not connected yet.',
  },

  /* --------------------------------------------------------------- profile */
  'profile.account': { ar: 'إعدادات الحساب', en: 'Account settings' },
  'profile.accountSub': {
    ar: 'بياناتكِ الشخصية وطريقة الدخول.',
    en: 'Your personal details and sign-in method.',
  },
  'profile.email': { ar: 'البريد الإلكتروني', en: 'Email' },
  'profile.displayName': { ar: 'الاسم المعروض', en: 'Display name' },
  'profile.provider': { ar: 'طريقة الدخول', en: 'Sign-in method' },
  'profile.memberSince': { ar: 'عضوة منذ', en: 'Member since' },
  'profile.avatar': { ar: 'الصورة الشخصية', en: 'Profile picture' },
  'profile.avatarHint': {
    ar: 'أضيفي رابط صورة شخصية (اختياري).',
    en: 'Add a link to a profile picture (optional).',
  },
  'profile.languagePref': { ar: 'اللغة المفضلة', en: 'Preferred language' },
  'profile.languageHint': {
    ar: 'تُحفظ مع حسابكِ وتُستخدم عند الدخول من أي جهاز.',
    en: 'Saved with your account and applied on any device.',
  },
  'profile.security': { ar: 'الأمان', en: 'Security' },
  'profile.changePassword': { ar: 'تغيير كلمة المرور', en: 'Change password' },
  'profile.sendReset': { ar: 'إرسال رابط تغيير كلمة المرور', en: 'Send password reset link' },
  'profile.resetSent': { ar: 'أرسلنا رابط تغيير كلمة المرور إلى بريدكِ.', en: 'We emailed you a password reset link.' },
  'profile.accountSaved': { ar: 'تم حفظ بيانات الحساب.', en: 'Account details saved.' },
  'profile.signedInAs': { ar: 'مسجّلة الدخول باسم', en: 'Signed in as' },
  'profile.guestTitle': { ar: 'أنتِ في الوضع المحلي', en: 'You are in local mode' },
  'profile.guestBody': {
    ar: 'أنشئي حساباً لحفظ بياناتكِ ومتابعتها من أي جهاز.',
    en: 'Create an account to save your data and continue from any device.',
  },
  'profile.localData': { ar: 'البيانات المحلية', en: 'Local data' },
  'profile.localDataHint': {
    ar: 'تُخزَّن بيانات المتابعة في متصفحكِ فقط، ويُحتفظ لكل حساب بمساحة مستقلة.',
    en: 'Tracking data is stored in your browser only, in a separate space for each account.',
  },
  'profile.dangerZone': { ar: 'إدارة البيانات', en: 'Data management' },
  'profile.signOutHint': {
    ar: 'سيتم إنهاء الجلسة على هذا الجهاز.',
    en: 'This will end the session on this device.',
  },

  /* --------------------------------------------------------------- welcome */
  'welcome.heroTitle': { ar: 'رِفْقَة في كل خطوة من حملكِ', en: 'RIFQAH, with you at every step' },
  'welcome.heroSub': {
    ar: 'متابعة أسبوعية، تذكير بالمواعيد، وتوعية صحية موثوقة — في مكان واحد آمن.',
    en: 'Weekly tracking, appointment reminders and trusted health education — in one safe place.',
  },
  'welcome.point1': { ar: 'متابعة أسبوع الحمل وتطور الجنين', en: 'Week-by-week pregnancy and fetal development' },
  'welcome.point2': { ar: 'تسجيل الضغط والوزن وحركة الجنين', en: 'Blood pressure, weight and fetal movement logs' },
  'welcome.point3': { ar: 'علامات الخطر وتحضير الولادة', en: 'Danger signs and labor preparation' },
  'welcome.start': { ar: 'ابدئي الآن', en: 'Get started' },
  'welcome.explore': { ar: 'استعراض التطبيق', en: 'Explore the app' },
  'welcome.trust': {
    ar: 'محتوى تعليمي مبني على مراجع منظمة الصحة العالمية — لا يُعد تشخيصاً طبياً.',
    en: 'Educational content based on WHO references — not a medical diagnosis.',
  },
};
