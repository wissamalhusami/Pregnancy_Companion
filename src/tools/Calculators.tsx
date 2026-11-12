import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { TrackerShell } from "../components/TrackerUtils";
import { DisclaimerBox } from "../components/Boxes";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date, lang: string): string {
  return d.toLocaleDateString(lang === "ar" ? "ar" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function parseDate(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  return d;
}

export function DueDateCalculator() {
  const { lang, t } = useLang();
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState<{ dueDate: Date; gestAge: string } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const date = parseDate(lmp);
    if (!date) { setError(lang === "ar" ? "يرجى إدخال تاريخ صحيح" : "Please enter a valid date"); setResult(null); return; }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) { setError(lang === "ar" ? "لا يمكن أن يكون التاريخ في المستقبل" : "Date cannot be in the future"); setResult(null); return; }
    const due = addDays(date, 280);
    const diffMs = today.getTime() - date.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    setResult({
      dueDate: due,
      gestAge: lang === "ar"
        ? `العمر الحملي الحالي: ${weeks} أسبوع و ${remainingDays} يوم`
        : `Current gestational age: ${weeks} weeks and ${remainingDays} days`,
    });
  };

  return (
    <TrackerShell title={t("tool.dueDate")}>
      <div className="card p-5 max-w-md">
        <label className="label" htmlFor="lmp">
          {lang === "ar" ? "أول يوم من آخر دورة شهرية (LMP)" : "First day of last menstrual period (LMP)"}
        </label>
        <input id="lmp" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="input" max={new Date().toISOString().split("T")[0]} />
        {error && <p className="mt-2 text-sm text-danger-600">{error}</p>}
        <button onClick={calculate} className="btn-primary mt-3 w-full">{t("tools.result")}</button>
        {result && (
          <div className="mt-4 rounded-lg bg-primary-50 p-4 space-y-2">
            <p className="font-semibold text-primary-900">
              {lang === "ar" ? "تاريخ الولادة المتوقع:" : "Estimated due date:"}
            </p>
            <p className="text-lg text-primary-700">{formatDate(result.dueDate, lang)}</p>
            <p className="text-sm text-primary-800">{result.gestAge}</p>
          </div>
        )}
      </div>
      <div className="mt-3 max-w-md">
        <DisclaimerBox>
          {lang === "ar"
            ? "هذه计算 تقديرية تعتمد على دورة منتظلة مدتها 28 يوماً. الولادة الفعلية قد تختلف. استشيري طبيبك للتأكيد."
            : "This is an estimate based on a regular 28-day cycle. Actual delivery may vary. Consult your doctor for confirmation."}
        </DisclaimerBox>
      </div>
    </TrackerShell>
  );
}

export function GestationalAgeCalculator() {
  const { lang, t } = useLang();
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const date = parseDate(lmp);
    if (!date) { setError(lang === "ar" ? "يرجى إدخال تاريخ صحيح" : "Please enter a valid date"); setResult(null); return; }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) { setError(lang === "ar" ? "لا يمكن أن يكون التاريخ في المستقبل" : "Date cannot be in the future"); setResult(null); return; }
    const days = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    let trimester = "";
    if (weeks < 13) trimester = lang === "ar" ? "الثلاث الأول" : "First trimester";
    else if (weeks < 28) trimester = lang === "ar" ? "الثلاث الثاني" : "Second trimester";
    else trimester = lang === "ar" ? "الثلاث الثالث" : "Third trimester";
    setResult(lang === "ar"
      ? `${weeks} أسبوع و ${remainingDays} يوم — ${trimester}`
      : `${weeks} weeks and ${remainingDays} days — ${trimester}`);
  };

  return (
    <TrackerShell title={t("tool.gestationalAge")}>
      <div className="card p-5 max-w-md">
        <label className="label" htmlFor="ga-lmp">
          {lang === "ar" ? "أول يوم من آخر دورة شهرية" : "First day of last menstrual period"}
        </label>
        <input id="ga-lmp" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="input" max={new Date().toISOString().split("T")[0]} />
        {error && <p className="mt-2 text-sm text-danger-600">{error}</p>}
        <button onClick={calculate} className="btn-primary mt-3 w-full">{t("tools.result")}</button>
        {result && (
          <div className="mt-4 rounded-lg bg-primary-50 p-4">
            <p className="text-lg font-semibold text-primary-700">{result}</p>
          </div>
        )}
      </div>
    </TrackerShell>
  );
}

export function OvulationCalculator() {
  const { lang, t } = useLang();
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{ ovulation: Date; fertileStart: Date; fertileEnd: Date; nextPeriod: Date } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const date = parseDate(lmp);
    const cycle = parseInt(cycleLength);
    if (!date) { setError(lang === "ar" ? "يرجى إدخال تاريخ صحيح" : "Please enter a valid date"); setResult(null); return; }
    if (!cycle || cycle < 21 || cycle > 35) { setError(lang === "ar" ? "طول الدورة يجب أن يكون بين 21 و 35 يوماً" : "Cycle length must be between 21 and 35 days"); setResult(null); return; }
    const ovulationDay = cycle - 14;
    const ovulation = addDays(date, ovulationDay);
    setResult({
      ovulation,
      fertileStart: addDays(date, ovulationDay - 5),
      fertileEnd: addDays(date, ovulationDay + 1),
      nextPeriod: addDays(date, cycle),
    });
  };

  return (
    <TrackerShell title={t("tool.ovulation")}>
      <div className="card p-5 max-w-md space-y-3">
        <div>
          <label className="label" htmlFor="ov-lmp">
            {lang === "ar" ? "أول يوم من آخر دورة شهرية" : "First day of last menstrual period"}
          </label>
          <input id="ov-lmp" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="input" max={new Date().toISOString().split("T")[0]} />
        </div>
        <div>
          <label className="label" htmlFor="cycle-len">
            {lang === "ar" ? "طول الدورة الشهرية (يوم)" : "Cycle length (days)"}
          </label>
          <input id="cycle-len" type="number" min="21" max="35" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="input" />
        </div>
        {error && <p className="text-sm text-danger-600">{error}</p>}
        <button onClick={calculate} className="btn-primary w-full">{t("tools.result")}</button>
        {result && (
          <div className="rounded-lg bg-primary-50 p-4 space-y-2">
            <div>
              <span className="text-sm text-primary-800">{lang === "ar" ? "موعد الإباضة المتوقع:" : "Estimated ovulation date:"}</span>
              <p className="font-semibold text-primary-700">{formatDate(result.ovulation, lang)}</p>
            </div>
            <div>
              <span className="text-sm text-primary-800">{lang === "ar" ? "النافذة الخصوبة:" : "Fertile window:"}</span>
              <p className="font-semibold text-primary-700">{formatDate(result.fertileStart, lang)} — {formatDate(result.fertileEnd, lang)}</p>
            </div>
            <div>
              <span className="text-sm text-primary-800">{lang === "ar" ? "الدورة القادمة المتوقعة:" : "Next period estimate:"}</span>
              <p className="font-semibold text-primary-700">{formatDate(result.nextPeriod, lang)}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 max-w-md">
        <DisclaimerBox>
          {lang === "ar"
            ? "هذه تقديرات لأغراض تعليمية فقط ولا تضمن حدوث الإباضة في هذا اليوم."
            : "These are educational estimates only and do not guarantee ovulation on this day."}
        </DisclaimerBox>
      </div>
    </TrackerShell>
  );
}
