"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTranslations } from "next-intl";

const steps = [
  "demoRequest",
  "setup",
  "migration",
  "training",
  "goLive",
] as const;

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section id="process" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <div className="relative mt-14">
          <div
            className="pointer-events-none absolute start-[1.35rem] top-2 bottom-2 w-px bg-border lg:start-0 lg:end-0 lg:top-8 lg:bottom-auto lg:h-px lg:w-full"
            aria-hidden
          />
          <ol className="grid list-none gap-6 lg:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step} className="relative">
                <Reveal delay={index * 0.05}>
                  <div className="flex gap-4 lg:flex-col lg:gap-4">
                    <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-bg text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-text">
                        {t(`steps.${step}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {t(`steps.${step}.desc`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
