"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CalendarClock, CheckCircle2, FileText, Receipt } from "lucide-react";
import { useTranslations } from "next-intl";

const modules = [
  { key: "appointments", icon: CalendarClock },
  { key: "records", icon: FileText },
  { key: "billing", icon: Receipt },
] as const;
const extras = ["cloud", "mobile", "bilingual"] as const;

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <Reveal key={mod.key} delay={i * 0.08}>
                <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-bg-elevated p-7">
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-accent-muted text-accent">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-text">
                    {t(`modules.${mod.key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                    {t(`modules.${mod.key}.desc`)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.12}>
          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {extras.map((extra) => (
              <li
                key={extra}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/80 px-4 py-2 text-sm text-text"
              >
                <CheckCircle2 className="size-4 text-accent" />
                {t(`extras.${extra}`)}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
