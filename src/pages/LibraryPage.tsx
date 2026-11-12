import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Clock, BookOpen } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { ARTICLES } from "../data/articles";
import { SECTIONS } from "../data/sections";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function LibraryPage() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<string>("all");

  const sections = SECTIONS.filter((s) => s.id !== "medical-library");

  const filtered = useMemo(() => {
    if (filter === "all") return ARTICLES;
    return ARTICLES.filter((a) => a.section === filter);
  }, [filter]);

  return (
    <div className="container-app py-6">
      <Breadcrumbs items={[{ label: t("nav.library") }]} />

      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{t("section.library")}</h1>
      <p className="mt-2 text-neutral-600">{ARTICLES.length} {lang === "ar" ? "مقال تعليمي" : "educational articles"}</p>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "badge-primary" : "badge-neutral hover:bg-neutral-200"}
        >
          {t("search.all")}
        </button>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={filter === s.id ? "badge-primary" : "badge-neutral hover:bg-neutral-200"}
          >
            {s.title[lang]}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link key={a.id} to={`/library/${a.slug}`} className="card card-hover p-5 group">
            <span className="badge-primary">
              {t(`section.${a.section === "womens-health" ? "womensHealth" : a.section}`)}
            </span>
            <h3 className="mt-2 font-semibold text-neutral-900 group-hover:text-primary-700">
              {a.title[lang]}
            </h3>
            <p className="mt-1 text-sm text-neutral-500 leading-relaxed line-clamp-2">
              {a.description[lang]}
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {a.readingTime} {t("article.readingTime")}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {a.lastReviewed}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 text-center text-neutral-400">{t("common.empty")}</div>
      )}
    </div>
  );
}
