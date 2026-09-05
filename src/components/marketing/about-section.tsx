"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Award, BookOpen, Building2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const blocks = [
  { key: "experience", icon: BookOpen },
  { key: "certificates", icon: Award },
  { key: "achievements", icon: Building2 },
  { key: "style", icon: Sparkles },
] as const;

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-pad section-blend">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow={t("eyebrow")}
              title={t("title")}
              className="mx-0 max-w-xl"
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted">
              {t("bio")}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {blocks.map((block) => {
                const Icon = block.icon;
                return (
                  <div
                    key={block.key}
                    className="rounded-2xl border border-border bg-bg/60 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-accent">
                      <Icon className="size-4" />
                      <span className="text-sm font-semibold text-text">
                        {t(`labels.${block.key}`)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {t(block.key)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-md flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-accent/15 via-bg-elevated to-bg-elevated p-8">
              <div
                className="pointer-events-none absolute -end-10 -top-10 size-48 rounded-full bg-accent/15 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -start-8 bottom-[-2rem] size-40 rounded-full bg-accent/10 blur-3xl"
                aria-hidden
              />
              <div className="relative inline-flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                <Building2 className="size-6" />
              </div>
              <div className="relative">
                <p className="text-5xl font-bold tracking-tight text-text">
                  500<span className="text-accent">+</span>
                </p>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-text-muted">
                  {t("achievements")}
                </p>
              </div>
              <div className="relative rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
                <p className="text-sm font-medium text-text/90">{t("eyebrow")}</p>
                <p className="mt-1 text-lg font-semibold text-text">
                  {t("title")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
