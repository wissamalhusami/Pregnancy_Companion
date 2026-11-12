import { useState, useEffect, useCallback, useRef } from "react";
import { useLang } from "../context/LanguageContext";
import { getAll, put, remove, clearStore, genId, type StoreName } from "../lib/storage";
import { DisclaimerBox } from "../components/Boxes";
import { Trash2, Plus, Download, Upload } from "lucide-react";

interface BaseRecord {
  id: string;
  date: string;
  notes?: string;
}

export function useTracker<T extends BaseRecord>(store: StoreName) {
  const [records, setRecords] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getAll<T>(store);
    data.sort((a, b) => b.date.localeCompare(a.date));
    setRecords(data);
    setLoading(false);
  }, [store]);

  useEffect(() => {
    load();
  }, [load]);

  const add = useCallback(async (record: Omit<T, "id">) => {
    const item = { ...record, id: genId() } as T;
    await put(store, item);
    await load();
  }, [store, load]);

  const removeRecord = useCallback(async (id: string) => {
    await remove(store, id);
    await load();
  }, [store, load]);

  const clearAll = useCallback(async () => {
    await clearStore(store);
    await load();
  }, [store, load]);

  return { records, loading, add, removeRecord, clearAll };
}

interface TrackerShellProps {
  title: string;
  disclaimer?: boolean;
  children: React.ReactNode;
  onExport?: () => void;
  onImport?: (data: string) => void;
  onClearAll?: () => void;
}

export function TrackerShell({ title, disclaimer = true, children, onExport, onImport, onClearAll }: TrackerShellProps) {
  const { t } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImport) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { onImport(reader.result as string); } catch { /* ignore */ }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">{title}</h1>
      {disclaimer && (
        <div className="mt-3">
          <DisclaimerBox>{t("tools.disclaimer")}</DisclaimerBox>
        </div>
      )}
      <div className="mt-4">{children}</div>
      {(onExport || onImport || onClearAll) && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-neutral-200 pt-4">
          {onExport && (
            <button onClick={onExport} className="btn-secondary text-xs">
              <Download className="h-4 w-4" />
              {t("tools.export")}
            </button>
          )}
          {onImport && (
            <>
              <button onClick={() => fileInputRef.current?.click()} className="btn-secondary text-xs">
                <Upload className="h-4 w-4" />
                {t("tools.import")}
              </button>
              <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleFile} />
            </>
          )}
          {onClearAll && (
            <button onClick={() => { if (confirm(t("tools.deleteAll") + "?")) onClearAll(); }} className="btn-ghost text-xs text-danger-600 hover:bg-danger-50">
              <Trash2 className="h-4 w-4" />
              {t("tools.deleteAll")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function RecordList<T extends BaseRecord>({
  records,
  emptyText,
  children,
}: {
  records: T[];
  emptyText: string;
  children: (record: T) => React.ReactNode;
}) {
  if (records.length === 0) {
    return <p className="text-sm text-neutral-400 py-8 text-center">{emptyText}</p>;
  }
  return (
    <div className="space-y-2">
      {records.map((r) => (
        <div key={r.id} className="flex items-start justify-between gap-2 rounded-lg border border-neutral-200 bg-white p-3">
          <div className="min-w-0 flex-1">{children(r)}</div>
        </div>
      ))}
    </div>
  );
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  const { t } = useLang();
  return (
    <button onClick={onClick} className="rounded p-1.5 text-neutral-400 hover:bg-danger-50 hover:text-danger-600" aria-label={t("common.delete")}>
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export { Plus };
