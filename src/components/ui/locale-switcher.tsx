"use client";

import { usePathname, useRouter } from "@/features/i18n/navigation";
import { cn } from "@/lib/cn";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const next = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      disabled={pending}
      className={cn(
        "inline-flex h-10 items-center rounded-xl border border-border bg-bg-elevated px-3 text-sm font-semibold text-text transition-colors hover:border-accent/40 hover:bg-accent-muted",
        className,
      )}
      onClick={() => {
        startTransition(() => {
          router.replace(pathname, { locale: next });
        });
      }}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      {locale === "ar" ? "EN" : "عربي"}
    </button>
  );
}
