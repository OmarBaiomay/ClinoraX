"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { useTrialModal } from "@/components/providers/trial-modal-provider";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

const plans = ["starter", "growth", "enterprise"] as const;

export function PricingSection() {
  const t = useTranslations("pricing");
  const { openTrial } = useTrialModal();

  return (
    <section id="pricing" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-accent/20 bg-accent-muted px-4 py-3 text-center text-sm text-accent-deep dark:text-accent">
            {t("discount")}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const popular = plan === "growth";
            const features = t.raw(`plans.${plan}.features`) as string[];
            return (
              <Reveal key={plan} delay={i * 0.07}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-7",
                    popular
                      ? "border-accent bg-bg-elevated shadow-[0_20px_60px_rgba(13,148,136,0.15)]"
                      : "border-border bg-bg-elevated/70",
                  )}
                >
                  {popular ? (
                    <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-[var(--btn-primary-bg)] px-3 py-1 text-xs font-semibold text-[var(--btn-primary-fg)] rtl:translate-x-1/2">
                      {t("popular")}
                    </span>
                  ) : null}
                  <h3 className="text-xl font-semibold text-text">
                    {t(`plans.${plan}.name`)}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-text">
                      {t(`plans.${plan}.price`)}
                    </span>
                    <span className="text-sm text-text-muted">
                      {t(`plans.${plan}.currency`)}
                      {t("perMonth")}
                    </span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-text-muted"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton
                    className="mt-8 w-full"
                    variant={popular ? "primary" : "secondary"}
                    onClick={openTrial}
                  >
                    {t("cta")}
                  </MagneticButton>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
