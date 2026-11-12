import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Heart, Baby, Activity, HeartHandshake, BookOpen, Search,
  AlertTriangle, Clock, ArrowRight, Calculator,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { SECTIONS } from "../data/sections";
import { ARTICLES } from "../data/articles";
import { getPreference } from "../lib/storage";
import { DisclaimerBox } from "../components/Boxes";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Baby, Activity, HeartHandshake, BookOpen,
};

const FEATURED_SLUGS = ["menstrual-cycle", "pcos", "folic-acid", "ovulation"];

const POPULAR_TOOLS = [
  { to: "/tools/due-date", icon: Calculator, key: "tool.dueDate" },
  { to: "/tools/ovulation", icon: Calculator, key: "tool.ovulation" },
  { to: "/tools/hospital-bag", icon: Calculator, key: "tool.hospitalBag" },
  { to: "/tools/bp-tracker", icon: Calculator, key: "tool.bpTracker" },
];

export function HomePage() {
  const { lang, t } = useLang();
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const viewed = ((await getPreference("recently-viewed")) as string[] | undefined) ?? [];
      setRecent(viewed);
    })();
  }, []);

  const featured = FEATURED_SLUGS.map((s) => ARTICLES.find((a) => a.slug === s)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a)
  );

  const recentArticles = recent
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white border-b border-neutral-200">
        <div className="container-app py-10 sm:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              {t("home.welcome")}
            </h1>
            <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
              {t("home.intro")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/library" className="btn-primary">
                {t("home.explore")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link to="/tools" className="btn-secondary">
                {t("nav.tools")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-app py-8 space-y-12">
        {/* Search bar */}
        <section>
          <form action={`/search`} method="get" className="relative max-w-2xl">
            <Search className="absolute top-1/2 -translate-y-1/2 text-neutral-400 ltr:left-3 rtl:right-3 h-5 w-5" />
            <input
              type="text"
              name="q"
              placeholder={t("home.search")}
              className="input ltr:pl-10 rtl:pr-10 h-12 text-base"
              aria-label={t("search.title")}
            />
          </form>
        </section>

        {/* Main sections */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t("home.explore")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECTIONS.filter((s) => s.id !== "medical-library").map((s) => {
              const Icon = ICON_MAP[s.icon] ?? Heart;
              return (
                <Link
                  key={s.id}
                  to={`/${s.id}`}
                  className="card card-hover p-5 group"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-semibold text-neutral-900 group-hover:text-primary-700">
                    {s.title[lang]}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {s.description[lang]}
                  </p>
                </Link>
              );
            })}
            <Link to="/library" className="card card-hover p-5 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-semibold text-neutral-900 group-hover:text-primary-700">
                {t("nav.library")}
              </h3>
              <p className="mt-1 text-sm text-neutral-500 leading-relaxed line-clamp-2">
                {t("section.library")}
              </p>
            </Link>
          </div>
        </section>

        {/* Popular tools */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t("home.popularTools")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.to} to={tool.to} className="card card-hover p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100 text-secondary-700 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{t(tool.key)}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured articles */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t("home.featured")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((a) => (
              <Link key={a.id} to={`/library/${a.slug}`} className="card card-hover p-5 group">
                <span className="badge-primary">{t(`section.${a.section === "womens-health" ? "womensHealth" : a.section}`)}</span>
                <h3 className="mt-2 font-semibold text-neutral-900 group-hover:text-primary-700">{a.title[lang]}</h3>
                <p className="mt-1 text-sm text-neutral-500 leading-relaxed line-clamp-2">{a.description[lang]}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.readingTime} {t("article.readingTime")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Warning signs */}
        <section>
          <div className="rounded-xl border border-danger-200 bg-danger-50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-danger-900">
              <AlertTriangle className="h-5 w-5" />
              {t("home.warningSigns")}
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              <li className="text-sm text-danger-800">• {lang === "ar" ? "نزيف مهبلي شديد أثناء الحمل" : "Severe vaginal bleeding during pregnancy"}</li>
              <li className="text-sm text-danger-800">• {lang === "ar" ? "صداع شديد ومستمر مع زغللة في الرؤية" : "Severe persistent headache with vision changes"}</li>
              <li className="text-sm text-danger-800">• {lang === "ar" ? "حركات الجنين تقل أو تتوقف" : "Decreased or stopped fetal movements"}</li>
              <li className="text-sm text-danger-800">• {lang === "ar" ? "ارتفاع ضغط الدم الشديد" : "Severe high blood pressure"}</li>
              <li className="text-sm text-danger-800">• {lang === "ar" ? "حمى بعد الولادة" : "Fever after childbirth"}</li>
              <li className="text-sm text-danger-800">• {lang === "ar" ? "صعوبة تنفس المولود أو رفض الرضاعة" : "Newborn breathing difficulty or refusing feeds"}</li>
            </ul>
            <div className="mt-3">
              <DisclaimerBox>{t("emergency.call")}</DisclaimerBox>
            </div>
          </div>
        </section>

        {/* Recently viewed */}
        {recentArticles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t("home.recentlyViewed")}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {recentArticles.map((a) => (
                <Link key={a.id} to={`/library/${a.slug}`} className="card card-hover p-4">
                  <h3 className="text-sm font-semibold text-neutral-900">{a.title[lang]}</h3>
                  <p className="mt-1 text-xs text-neutral-500 line-clamp-2">{a.description[lang]}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
