import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { ARTICLES } from "../data/articles";
import { SECTIONS } from "../data/sections";
import { Breadcrumbs } from "../components/Breadcrumbs";

const TOOLS_INDEX = [
  { slug: "due-date", title: { ar: "حاسبة تاريخ الولادة", en: "Due Date Calculator" }, link: "/tools/due-date" },
  { slug: "gestational-age", title: { ar: "حاسبة العمر الحملي", en: "Gestational Age Calculator" }, link: "/tools/gestational-age" },
  { slug: "ovulation", title: { ar: "حاسبة التبويض", en: "Ovulation Calculator" }, link: "/tools/ovulation" },
  { slug: "hospital-bag", title: { ar: "قائمة مستلزمات المستشفى", en: "Hospital Bag Checklist" }, link: "/tools/hospital-bag" },
  { slug: "bp-tracker", title: { ar: "سجل ضغط الدم", en: "Blood Pressure Log" }, link: "/tools/bp-tracker" },
  { slug: "glucose-tracker", title: { ar: "سجل سكر الدم", en: "Blood Glucose Log" }, link: "/tools/glucose-tracker" },
  { slug: "symptom-journal", title: { ar: "مذكرات الأعراض", en: "Symptom Journal" }, link: "/tools/symptom-journal" },
  { slug: "appointment-tracker", title: { ar: "متتبع المواعيد", en: "Appointment Tracker" }, link: "/tools/appointment-tracker" },
  { slug: "baby-growth", title: { ar: "متتبع نمو الطفل", en: "Baby Growth Tracker" }, link: "/tools/baby-growth" },
  { slug: "vaccination", title: { ar: "متتبع التطعيمات", en: "Vaccination Tracker" }, link: "/tools/vaccination" },
  { slug: "breastfeeding-tracker", title: { ar: "متتبع الرضاعة", en: "Breastfeeding Tracker" }, link: "/tools/breastfeeding-tracker" },
  { slug: "sleep-tracker", title: { ar: "متتبع النوم", en: "Sleep Tracker" }, link: "/tools/sleep-tracker" },
  { slug: "diaper-tracker", title: { ar: "متتبع الحفاضات", en: "Diaper Tracker" }, link: "/tools/diaper-tracker" },
  { slug: "newborn-essentials", title: { ar: "مستلزمات المولود", en: "Newborn Essentials" }, link: "/tools/newborn-essentials" },
  { slug: "medication-reminder", title: { ar: "تذكير الأدوية", en: "Medication Reminder" }, link: "/tools/medication-reminder" },
];

export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const { lang, t } = useLang();

  const results = useMemo(() => {
    if (!q.trim()) return { articles: [], tools: [], sections: [] };
    const query = q.trim().toLowerCase();
    return {
      articles: ARTICLES.filter((a) =>
        a.title.ar.toLowerCase().includes(query) ||
        a.title.en.toLowerCase().includes(query) ||
        a.description.ar.toLowerCase().includes(query) ||
        a.description.en.toLowerCase().includes(query)
      ),
      tools: TOOLS_INDEX.filter((tool) =>
        tool.title.ar.toLowerCase().includes(query) ||
        tool.title.en.toLowerCase().includes(query)
      ),
      sections: SECTIONS.filter((s) =>
        s.title.ar.toLowerCase().includes(query) ||
        s.title.en.toLowerCase().includes(query) ||
        s.description.ar.toLowerCase().includes(query) ||
        s.description.en.toLowerCase().includes(query)
      ),
    };
  }, [q]);

  const total = results.articles.length + results.tools.length + results.sections.length;

  return (
    <div className="container-app py-6">
      <Breadcrumbs items={[{ label: t("search.title") }]} />

      <h1 className="mt-4 text-2xl font-bold text-neutral-900">
        {t("search.results")}: "{q}"
      </h1>
      <p className="mt-1 text-sm text-neutral-500">{total} {t("search.count")}</p>

      {total === 0 ? (
        <div className="mt-12 text-center">
          <SearchIcon className="mx-auto h-12 w-12 text-neutral-300" />
          <p className="mt-4 text-neutral-500">{t("search.noResults")}</p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {results.sections.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">{t("nav.home")}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.sections.map((s) => (
                  <Link key={s.id} to={`/${s.id}`} className="card card-hover p-4">
                    <h3 className="font-semibold text-neutral-900 text-sm">{s.title[lang]}</h3>
                    <p className="mt-1 text-xs text-neutral-500 line-clamp-2">{s.description[lang]}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.articles.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">{t("search.articles")}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.articles.map((a) => (
                  <Link key={a.id} to={`/library/${a.slug}`} className="card card-hover p-4">
                    <span className="badge-primary">{t(`section.${a.section === "womens-health" ? "womensHealth" : a.section}`)}</span>
                    <h3 className="mt-2 font-semibold text-neutral-900 text-sm">{a.title[lang]}</h3>
                    <p className="mt-1 text-xs text-neutral-500 line-clamp-2">{a.description[lang]}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.tools.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">{t("search.tools")}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.tools.map((tool) => (
                  <Link key={tool.slug} to={tool.link} className="card card-hover p-4">
                    <h3 className="font-semibold text-neutral-900 text-sm">{tool.title[lang]}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
