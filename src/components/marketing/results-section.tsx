"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const stats = ["efficiency", "noShow", "retention", "uptime"] as const;

function AnimatedValue({ value }: { value: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(reduced ? value : "0");
  const numeric = value.replace(/[^\d.]/g, "");
  const suffix = value.replace(/[\d.]/g, "");
  const target = Number(numeric);

  useEffect(() => {
    if (reduced || Number.isNaN(target)) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) return;
        started = true;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplay(`${current}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reduced, suffix, target, value]);

  return <span ref={ref}>{display}</span>;
}

export function ResultsSection() {
  const t = useTranslations("results");

  return (
    <section id="results" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat} delay={i * 0.06}>
              <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-bg-elevated to-bg-elevated p-6 text-center">
                <p className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                  <AnimatedValue value={t(`stats.${stat}.value`)} />
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  {t(`stats.${stat}.label`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
