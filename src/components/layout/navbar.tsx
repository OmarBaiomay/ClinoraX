"use client";

import { Container } from "@/components/layout/container";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTrialModal } from "@/components/providers/trial-modal-provider";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const links = [
  { href: "#why", key: "why" },
  { href: "#about", key: "about" },
  { href: "#features", key: "features" },
  { href: "#process", key: "process" },
  { href: "#results", key: "results" },
  { href: "#pricing", key: "pricing" },
  { href: "#faq", key: "faq" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const brand = useTranslations("meta");
  const { openTrial } = useTrialModal();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "py-2" : "py-3",
      )}
    >
      <Container>
        <div className="panel flex items-center justify-between gap-4 rounded-2xl px-3 py-2 sm:px-4">
          <a
            href="#top"
            className="shrink-0 text-sm font-bold tracking-tight text-text sm:text-base"
          >
            {brand("brand")}
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-text/90 transition-colors hover:bg-accent-muted hover:text-accent"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher className="hidden sm:inline-flex" />
            <ThemeToggle className="hidden sm:inline-flex" />
            <MagneticButton
              size="sm"
              className="hidden md:inline-flex"
              onClick={openTrial}
            >
              {t("cta")}
            </MagneticButton>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-bg-elevated text-text lg:hidden"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="panel mt-2 rounded-2xl p-4 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-text hover:bg-accent-muted"
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <MagneticButton
                className="flex-1"
                onClick={() => {
                  setOpen(false);
                  openTrial();
                }}
              >
                {t("cta")}
              </MagneticButton>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
