"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  BarChart3,
  BellRing,
  CalendarClock,
  FileText,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { key: "scheduling", icon: CalendarClock },
  { key: "records", icon: FileText },
  { key: "billing", icon: Receipt },
  { key: "reminders", icon: BellRing },
  { key: "analytics", icon: BarChart3 },
  { key: "security", icon: ShieldCheck },
] as const;

export function WhySection() {
  const t = useTranslations("why");

  return (
    <section id="why" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key} delay={index * 0.06}>
                <article
                  data-fade-scroll
                  className="group h-full rounded-3xl border border-border bg-bg-elevated/70 p-6 transition-colors hover:border-accent/30"
                >
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-accent-muted text-accent">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                    {t(`items.${item.key}.desc`)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
