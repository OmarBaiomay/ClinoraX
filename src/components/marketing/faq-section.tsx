"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTranslations } from "next-intl";

const keys = ["q1", "q2", "q3", "q4", "q5"] as const;

export function FaqSection() {
  const t = useTranslations("faq");
  const items = keys.map((key) => ({
    id: key,
    question: t(`items.${key}.q`),
    answer: t(`items.${key}.a`),
  }));

  return (
    <section id="faq" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion items={items} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
