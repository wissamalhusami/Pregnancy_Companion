import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useLang } from "../context/LanguageContext";

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { lang, t } = useLang();
  const allItems: Crumb[] = [{ label: t("nav.home"), to: "/" }, ...items];

  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm text-neutral-500" aria-label="Breadcrumb">
      {allItems.map((item, i) => {
        const isLast = i === allItems.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i === 0 && <Home className="h-3.5 w-3.5" />}
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-primary-600">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-neutral-900 font-medium" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 opacity-50 rtl:rotate-180" />}
          </span>
        );
      })}
    </nav>
  );
}
