"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TrialModalContextValue = {
  open: boolean;
  openTrial: () => void;
  closeTrial: () => void;
};

const TrialModalContext = createContext<TrialModalContextValue | null>(null);

export function TrialModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openTrial = useCallback(() => setOpen(true), []);
  const closeTrial = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ open, openTrial, closeTrial }),
    [open, openTrial, closeTrial],
  );
  return (
    <TrialModalContext.Provider value={value}>
      {children}
    </TrialModalContext.Provider>
  );
}

export function useTrialModal() {
  const ctx = useContext(TrialModalContext);
  if (!ctx) {
    throw new Error("useTrialModal must be used within TrialModalProvider");
  }
  return ctx;
}
