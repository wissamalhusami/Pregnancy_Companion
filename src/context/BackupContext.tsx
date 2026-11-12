import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react";

interface BackupContextValue {
  trigger: () => void;
  registerHandler: (handler: () => void) => void;
}

const BackupContext = createContext<BackupContextValue | null>(null);

// Simple context to trigger backup operations globally
export function BackupProvider({ children }: { children: ReactNode }) {
  const [handler, setHandler] = useState<(() => void) | null>(null);
  const [triggerCount, setTriggerCount] = useState(0);

  const registerHandler = useCallback((h: () => void) => {
    setHandler(() => h);
  }, []);

  const trigger = useCallback(() => {
    setTriggerCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (handler && triggerCount > 0) {
      handler();
    }
  }, [handler, triggerCount]);

  return (
    <BackupContext.Provider value={{ trigger, registerHandler }}>
      {children}
    </BackupContext.Provider>
  );
}

export function useBackup(): BackupContextValue {
  const ctx = useContext(BackupContext);
  if (!ctx) throw new Error("useBackup must be used within BackupProvider");
  return ctx;
}
