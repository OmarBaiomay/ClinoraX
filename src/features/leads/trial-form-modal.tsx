"use client";

import { Button } from "@/components/ui/button";
import { useTrialModal } from "@/components/providers/trial-modal-provider";
import { leadSchema } from "@/features/leads/schemas";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useEffect, useId, useState } from "react";

export function TrialFormModal() {
  const { open, closeTrial } = useTrialModal();
  const t = useTranslations("form");
  const locale = useLocale();
  const titleId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTrial();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeTrial]);

  if (!open) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});

    const form = new FormData(event.currentTarget);
    const payload = {
      contactName: String(form.get("contactName") ?? ""),
      clinicName: String(form.get("clinicName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      clinicSize: String(form.get("clinicSize") ?? "unsure"),
      message: String(form.get("message") ?? ""),
      locale: locale === "en" ? "en" : "ar",
      source: "landing-demo",
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0] ?? "form");
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-border bg-input-bg px-3 py-2.5 text-sm text-text placeholder:text-text-muted/70 outline-none transition-shadow focus:border-accent/50 focus:ring-2 focus:ring-[var(--ring)]";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-overlay p-4 sm:items-center"
      role="presentation"
      onClick={closeTrial}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="panel max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id={titleId} className="text-xl font-semibold text-text">
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={closeTrial}
            className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-text-muted hover:bg-accent-muted"
            aria-label={t("close")}
          >
            <X className="size-4" />
          </button>
        </div>

        {status === "success" ? (
          <p className="rounded-2xl bg-accent-muted px-4 py-6 text-center text-sm text-accent-deep dark:text-accent">
            {t("success")}
          </p>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <label className="block text-sm font-medium text-text">
              {t("name")}
              <input name="contactName" required className={fieldClass} />
              {errors.contactName ? (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.contactName}
                </span>
              ) : null}
            </label>
            <label className="block text-sm font-medium text-text">
              {t("clinicName")}
              <input name="clinicName" required className={fieldClass} />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("phone")}
              <input
                name="phone"
                type="tel"
                required
                inputMode="tel"
                className={fieldClass}
              />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("email")}
              <input name="email" type="email" className={fieldClass} />
            </label>
            <label className="block text-sm font-medium text-text">
              {t("level")}
              <select name="clinicSize" className={fieldClass} defaultValue="unsure">
                <option value="solo">{t("levels.beginner")}</option>
                <option value="small">{t("levels.intermediate")}</option>
                <option value="multi">{t("levels.advanced")}</option>
                <option value="unsure">{t("levels.unsure")}</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-text">
              {t("message")}
              <textarea name="message" rows={3} className={cn(fieldClass, "resize-y")} />
            </label>
            {status === "error" && !Object.keys(errors).length ? (
              <p className="text-sm text-red-600">{t("error")}</p>
            ) : null}
            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? t("sending") : t("submit")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
