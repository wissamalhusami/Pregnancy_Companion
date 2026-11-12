import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { getSection, SECTIONS } from "../data/sections";
import { getArticlesBySection, getArticlesByCategory } from "../data/articles";
import { Breadcrumbs } from "../components/Breadcrumbs";
import type { SectionId } from "../types";



export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { lang, t } = useLang();
  const section = sectionId ? getSection(sectionId) : undefined;

  if (!section) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-neutral-500">{t("common.empty")}</p>
        <Link to="/" className="btn-primary mt-4">{t("nav.home")}</Link>
      </div>
    );
  }

  const sectionArticles = getArticlesBySection(section.id);
  const sectionTitle = t(`section.${section.id === "womens-health" ? "womensHealth" : section.id === "medical-library" ? "library" : section.id}`);

  return (
    <div className="container-app py-6">
      <Breadcrumbs items={[{ label: sectionTitle }]} />

      <div className="mt-4">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{sectionTitle}</h1>
        <p className="mt-2 text-neutral-600 leading-relaxed max-w-2xl">{section.description[lang]}</p>
      </div>

      <div className="mt-8 space-y-10">
        {section.categories.map((cat) => {
          const catArticles = section.id === "medical-library"
            ? getArticlesByCategory(cat.id)
            : getArticlesByCategory(cat.id);
          if (catArticles.length === 0) return (
            <div key={cat.id}>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">{cat.title[lang]}</h2>
              <div className="rounded-xl border border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-400">
                {lang === "ar" ? "المحتوى قيد الإضافة" : "Content coming soon"}
              </div>
            </div>
          );
          return (
            <div key={cat.id}>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">{cat.title[lang]}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catArticles.map((a) => (
                  <Link
                    key={a.id}
                    to={`/library/${a.slug}`}
                    className="card card-hover p-4 group"
                  >
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700 text-sm">
                      {a.title[lang]}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 leading-relaxed line-clamp-2">
                      {a.description[lang]}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-primary-600">
                      {t("article.definition")}
                      <ChevronRight className="h-3 w-3 rtl:rotate-180" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
