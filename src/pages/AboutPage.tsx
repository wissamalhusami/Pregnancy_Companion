import { useLang } from "../context/LanguageContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { DisclaimerBox } from "../components/Boxes";
import { Heart, BookOpen, Shield, Globe } from "lucide-react";

export function AboutPage() {
  const { lang, t } = useLang();

  return (
    <div className="container-narrow py-6">
      <Breadcrumbs items={[{ label: t("nav.about") }]} />

      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{t("about.title")}</h1>

      <div className="mt-6 space-y-6">
        <section className="card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">{t("app.name")}</h2>
          </div>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            {lang === "ar"
              ? "رفقة هي منصة تعليمية شاملة لصحة المرأة والأمومة، تغطي رحلة الأمومة كاملة: من التخطيط للحمل، مروراً بأثناء الحمل والولادة، وصولاً إلى رعاية المولود والرضاعة. تقدّم رفقة محتوى طبياً موثوقاً وأدوات تفاعلية اختيارية تعمل على جهازك دون الحاجة لإنشاء حساب."
              : "RIFQAH is a comprehensive educational platform for women's health and motherhood, covering the entire motherhood journey: from planning pregnancy, through pregnancy and delivery, to newborn care and breastfeeding. RIFQAH provides trusted medical content and optional interactive tools that run on your device without requiring an account."}
          </p>
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">{t("about.mission")}</h2>
          </div>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            {lang === "ar"
              ? "تمكين النساء والأسر بمعرفة صحية موثوقة في كل مرحلة من رحلة الأمومة، مع احترام الخصوصية وعدم افتراض أي معلومات شخصية."
              : "Empowering women and families with trusted health knowledge at every stage of the motherhood journey, while respecting privacy and not assuming any personal information."}
          </p>
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">{t("about.disclaimer")}</h2>
          </div>
          <div className="mt-3 space-y-3">
            <DisclaimerBox>{t("disclaimer.general")}</DisclaimerBox>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {lang === "ar"
                ? "المعلومات في رفقة مبنية على مصادر طبية موثوقة مثل منظمة الصحة العالمية (WHO)، ومراكز مكافحة الأمراض (CDC)، والكلية الأمريكية لأطباء النساء والتوليد (ACOG)، والخدمة الصحية الوطنية (NHS)، وأكاديمية طب الأطفال الأمريكية (AAP). لا تُستخدم هذه المعلومات كبديل عن الاستشارة الطبية الفردية."
                : "Information on RIFQAH is based on reliable medical sources such as the World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), American College of Obstetricians and Gynecologists (ACOG), National Health Service (NHS), and American Academy of Pediatrics (AAP). This information is not a substitute for individual medical consultation."}
            </p>
          </div>
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {lang === "ar" ? "الخصوصية والبيانات" : "Privacy & Data"}
            </h2>
          </div>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            {lang === "ar"
              ? "لا يتطلب رفقة إنشاء حساب أو إدخال معلومات شخصية. البيانات التي تختارين إدخالها في الأدوات التفاعلية تُحفظ محلياً على جهازك فقط ولا تُرسل إلى أي خادم خارجي. يمكنك تصدير نسخة احتياطية أو حذف جميع البيانات في أي وقت."
              : "RIFQAH does not require creating an account or entering personal information. Data you choose to enter in interactive tools is stored locally on your device only and is not sent to any external server. You can export a backup or delete all data at any time."}
          </p>
        </section>
      </div>
    </div>
  );
}
