import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "../types";
import { setLang, getLang, dir, t as translate } from "../i18n";
import { setPreference, getPreference } from "../lib/storage";

interface LangContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  toggle: () => void;
  set: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    (async () => {
      const stored = (await getPreference("lang")) as Lang | undefined;
      if (stored === "ar" || stored === "en") {
        setLangState(stored);
      }
    })();
  }, []);

  useEffect(() => {
    setLang(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir();
    setPreference("lang", lang);
  }, [lang]);

  const value: LangContextValue = {
    lang,
    dir: dir(),
    t: translate,
    toggle: () => setLangState((prev) => (prev === "ar" ? "en" : "ar")),
    set: setLangState,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
