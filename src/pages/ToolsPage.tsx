import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { DisclaimerBox } from "../components/Boxes";
import {
  Calculator, Calendar, Heart, Baby, Activity, ClipboardList,
  Droplet, Moon, Diaper, Syringe, Pill, Scale,
} from "lucide-react";

interface ToolEntry {
  slug: string;
  key: string;
  icon: React.ElementType;
  group: "pregnancy" | "womens" | "maternal" | "newborn" | "checklists";
}

const TOOLS: ToolEntry[] = [
  { slug: "due-date", key: "tool.dueDate", icon: Calculator, group: "pregnancy" },
  { slug: "gestational-age", key: "tool.gestationalAge", icon: Calculator, group: "pregnancy" },
  { slug: "ovulation", key: "tool.ovulation", icon: Calendar, group: "womens" },
  { slug: "appointment-tracker", key: "tool.appointmentTracker", icon: Calendar, group: "pregnancy" },
  { slug: "symptom-journal", key: "tool.symptomJournal", icon: ClipboardList, group: "maternal" },
  { slug: "bp-tracker", key: "tool.bpTracker", icon: Activity, group: "maternal" },
  { slug: "glucose-tracker", key: "tool.glucoseTracker", icon: Droplet, group: "maternal" },
  { slug: "medication-reminder", key: "tool.medicationReminder", icon: Pill, group: "maternal" },
  { slug: "baby-growth", key: "tool.babyGrowth", icon: Scale, group: "newborn" },
  { slug: "vaccination", key: "tool.vaccination", icon: Syringe, group: "newborn" },
  { slug: "breastfeeding-tracker", key: "tool.breastfeedingTracker", icon: Baby, group: "newborn" },
  { slug: "sleep-tracker", key: "tool.sleepTracker", icon: Moon, group: "newborn" },
  { slug: "diaper-tracker", key: "tool.diaperTracker", icon: Diaper, group: "newborn" },
  { slug: "hospital-bag", key: "tool.hospitalBag", icon: ClipboardList, group: "checklists" },
  { slug: "newborn-essentials", key: "tool.newbornEssentials", icon: ClipboardList, group: "checklists" },
];

const GROUPS: { id: ToolEntry["group"]; key: string }[] = [
  { id: "pregnancy", key: "tools.pregnancy" },
  { id: "womens", key: "tools.womens" },
  { id: "maternal", key: "tools.maternal" },
  { id: "newborn", key: "tools.newborn" },
  { id: "checklists", key: "tools.checklists" },
];

export function ToolsPage() {
  const { t } = useLang();

  return (
    <div className="container-app py-6">
      <Breadcrumbs items={[{ label: t("nav.tools") }]} />

      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{t("tools.title")}</h1>
      <p className="mt-2 text-neutral-600 max-w-2xl">{t("tools.intro")}</p>

      <div className="mt-4">
        <DisclaimerBox>{t("tools.disclaimer")}</DisclaimerBox>
      </div>

      <div className="mt-8 space-y-10">
        {GROUPS.map((group) => {
          const groupTools = TOOLS.filter((tool) => tool.group === group.id);
          if (groupTools.length === 0) return null;
          return (
            <section key={group.id}>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">{t(group.key)}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      to={`/tools/${tool.slug}`}
                      className="card card-hover p-4 flex items-center gap-3 group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100 text-secondary-700 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-700">
                        {t(tool.key)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
