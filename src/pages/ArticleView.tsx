import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock, BookOpen, AlertTriangle, Stethoscope, FileText, ChevronRight } from "lucide-react";
import { getArticle, ARTICLES } from "../data/articles";
import { useLang } from "../context/LanguageContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { WarningBox, DisclaimerBox } from "../components/Boxes";
import { setPreference, getPreference } from "../lib/storage";

function SectionBlock({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900">
        <Icon className="h-5 w-5 text-primary-600" />
        {title}
      </h2>
      <ul className="mt-3 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-neutral-700 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CustomSection({ heading, body }: { heading: string; body: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-neutral-900">{heading}</h2>
      <ul className="mt-3 space-y-1.5">
        {body.map((item, i) => (
          <li key={i} className="flex gap-2 text-neutral-700 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const article = slug ? getArticle(slug) : undefined;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;
    (async () => {
      const viewed = ((await getPreference("recently-viewed")) as string[] | undefined) ?? [];
      const updated = [article.slug, ...viewed.filter((s) => s !== article.slug)].slice(0, 10);
      await setPreference("recently-viewed", updated);
    })();
  }, [article]);

  if (!article) return <Navigate to="/library" replace />;

  const c = article.content[lang];

  const relatedArticles = (article.related ?? [])
    .map((id) => ARTICLES.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const sectionMeta = article.section;

  return (
    <div className="container-app py-6">
      <Breadcrumbs
        items={[
          { label: t(`section.${sectionMeta === "womens-health" ? "womensHealth" : sectionMeta === "medical-library" ? "library" : sectionMeta}`), to: `/${sectionMeta}` },
          { label: article.title[lang] },
        ]}
      />

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <article ref={contentRef} className="min-w-0">
          <Link
            to={`/${sectionMeta}`}
            className="mb-4 inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("article.back")}
          </Link>

          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            {article.title[lang]}
          </h1>
          <p className="mt-2 text-neutral-600 leading-relaxed">{article.description[lang]}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} {t("article.readingTime")}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {t("article.lastReviewed")}: {article.lastReviewed}
            </span>
          </div>

          <div className="mt-6">
            <DisclaimerBox>{t("disclaimer.general")}</DisclaimerBox>
          </div>

          <div className="mt-6 prose-medical">
            {c.definition && (
              <section>
                <h2 className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-600" />
                  {t("article.definition")}
                </h2>
                <p>{c.definition}</p>
              </section>
            )}

            {c.sections?.map((s, i) => (
              <CustomSection key={i} heading={s.heading} body={s.body} />
            ))}

            <SectionBlock icon={FileText} title={t("article.causes")} items={c.causes} />
            <SectionBlock icon={AlertTriangle} title={t("article.riskFactors")} items={c.riskFactors} />
            <SectionBlock icon={AlertTriangle} title={t("article.symptoms")} items={c.symptoms} />
            <SectionBlock icon={Stethoscope} title={t("article.assessment")} items={c.assessment} />
            <SectionBlock icon={FileText} title={t("article.investigations")} items={c.investigations} />
            <SectionBlock icon={Stethoscope} title={t("article.management")} items={c.management} />
            <SectionBlock icon={Stethoscope} title={t("article.nursing")} items={c.nursingConsiderations} />
          </div>

          {c.warningSigns && c.warningSigns.length > 0 && (
            <div className="mt-8">
              <WarningBox title={t("article.warningSigns")}>
                <ul className="mt-2 space-y-1">
                  {c.warningSigns.map((w, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-500" />
                      {w}
                    </li>
                  ))}
                </ul>
              </WarningBox>
            </div>
          )}

          {c.whenToSeekCare && c.whenToSeekCare.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-neutral-900">{t("article.whenToSeekCare")}</h2>
              <ul className="mt-2 space-y-1.5">
                {c.whenToSeekCare.map((w, i) => (
                  <li key={i} className="flex gap-2 text-neutral-700">
                    <ChevronRight className="h-4 w-4 shrink-0 text-primary-500 mt-1 rtl:rotate-180" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.references && article.references.length > 0 && (
            <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <h2 className="text-lg font-semibold text-neutral-900">{t("article.references")}</h2>
              <ul className="mt-2 space-y-2">
                {article.references.map((ref, i) => (
                  <li key={i} className="text-sm text-neutral-600 leading-relaxed">
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {relatedArticles.length > 0 && (
            <div className="card p-4">
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">{t("article.related")}</h3>
              <div className="space-y-2">
                {relatedArticles.map((ra) => (
                  <Link
                    key={ra.id}
                    to={`/library/${ra.slug}`}
                    className="block rounded-lg p-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700"
                  >
                    {ra.title[lang]}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
