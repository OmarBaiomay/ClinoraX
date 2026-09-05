"use client";

import dynamic from "next/dynamic";

const TrialFormModal = dynamic(
  () =>
    import("@/features/leads/trial-form-modal").then((m) => m.TrialFormModal),
  { ssr: false },
);

export function DeferredTrialFormModal() {
  return <TrialFormModal />;
}
