import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Languages, ChevronDown, Heart } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { SECTIONS } from "../data/sections";
import { ARTICLES } from "../data/articles";
import type { Lang } from "../types";

interface NavItem {
  to: string;
  labelKey: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", labelKey: "nav.home" },
  { to: "/preconception", labelKey: "nav.preconception" },
  { to: "/pregnancy", labelKey: "nav.pregnancy" },
  { to: "/labor", labelKey: "nav.labor" },
  { to: "/postpartum", labelKey: "nav.postpartum" },
  { to: "/newborn", labelKey: "nav.newborn" },
  { to: "/breastfeeding", labelKey: "nav.breastfeeding" },
  { to: "/womens-health", labelKey: "nav.womensHealth" },
  { to: "/library", labelKey: "nav.library" },
  { to: "/tools", labelKey: "nav.tools" },
  { to: "/about", labelKey: "nav.about" },
];

interface SearchResult {
  type: "article" | "tool" | "section";
  title: { ar: string; en: string };
  link: string;
}

const TOOLS_INDEX: { slug: string; title: { ar: string; en: string }; link: string }[] = [
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

function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  for (const a of ARTICLES) {
    if (a.title.ar.toLowerCase().includes(q) || a.title.en.toLowerCase().includes(q) ||
        a.description.ar.toLowerCase().includes(q) || a.description.en.toLowerCase().includes(q)) {
      results.push({ type: "article", title: a.title, link: `/library/${a.slug}` });
    }
  }

  for (const t of TOOLS_INDEX) {
    if (t.title.ar.toLowerCase().includes(q) || t.title.en.toLowerCase().includes(q)) {
      results.push({ type: "tool", title: t.title, link: t.link });
    }
  }

  for (const s of SECTIONS) {
    if (s.title.ar.toLowerCase().includes(q) || s.title.en.toLowerCase().includes(q) ||
        s.description.ar.toLowerCase().includes(q) || s.description.en.toLowerCase().includes(q)) {
      results.push({ type: "section", title: s.title, link: `/${s.id}` });
    }
  }

  return results.slice(0, 8);
}

export function Header() {
  const { lang, t, toggle } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setSearchResults(searchAll(searchQuery));
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-bold text-primary-700">{t("app.name")}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
              aria-label={t("search.title")}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggle}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
              aria-label={t("lang.switch")}
            >
              <Languages className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="absolute inset-x-0 top-16 border-b border-neutral-200 bg-white shadow-lg">
            <div className="container-app py-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute top-1/2 -translate-y-1/2 text-neutral-400 ltr:left-3 rtl:right-3 h-5 w-5" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("home.search")}
                    className="input ltr:pl-10 rtl:pr-10"
                  />
                </div>
              </form>
              {searchResults.length > 0 && (
                <div className="mt-3 space-y-1">
                  {searchResults.map((r, i) => (
                    <Link
                      key={i}
                      to={r.link}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      <span className="badge-neutral">{r.type === "article" ? t("search.articles") : r.type === "tool" ? t("search.tools") : t("nav.home")}</span>
                      <span>{r.title[lang]}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-neutral-200 py-3">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block nav-link text-base ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="container-app py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                <Heart className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-base font-bold text-primary-700">{t("app.name")}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">{t("app.tagline")}</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-neutral-900">{t("nav.home")}</h3>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.slice(1, 6).map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-neutral-500 hover:text-primary-600">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-neutral-900">{t("nav.tools")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools" className="text-neutral-500 hover:text-primary-600">{t("tools.title")}</Link></li>
              <li><Link to="/library" className="text-neutral-500 hover:text-primary-600">{t("nav.library")}</Link></li>
              <li><Link to="/about" className="text-neutral-500 hover:text-primary-600">{t("nav.about")}</Link></li>
            </ul>
          </div>
          <div>
            <div className="rounded-lg bg-warning-50 p-3 text-xs text-warning-800">
              {t("footer.disclaimer")}
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-neutral-200 pt-4 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} {t("app.name")} — {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
