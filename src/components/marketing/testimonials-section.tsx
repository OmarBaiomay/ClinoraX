"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

const items = ["t1", "t2", "t3"] as const;
const videos = ["t1", "t2"] as const;

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimonials" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item} delay={i * 0.07}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-bg/70 p-6">
                <blockquote className="flex-1 text-base leading-relaxed text-text">
                  “{t(`items.${item}.quote`)}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-muted text-sm font-semibold text-accent">
                    {t(`items.${item}.name`).charAt(0)}
                  </span>
                  <span>
                    <p className="font-semibold text-text">
                      {t(`items.${item}.name`)}
                    </p>
                    <p className="text-sm text-text-muted">
                      {t(`items.${item}.role`)}
                    </p>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {videos.map((key) => (
              <div
                key={key}
                className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-bg-elevated to-bg-elevated"
              >
                <div className="relative z-10 flex flex-col items-center gap-2 text-text">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <Play className="size-5 ms-0.5" />
                  </span>
                  <span className="text-sm font-medium text-text-muted">
                    {t("videoLabel")} · {t("videoSoon")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
