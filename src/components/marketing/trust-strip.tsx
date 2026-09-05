"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Building2, HeartHandshake, ShieldCheck, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { value: "500+", key: "clinics", icon: Building2 },
  { value: "10+", key: "years", icon: Workflow },
  { value: "98%", key: "satisfaction", icon: HeartHandshake },
  { value: "99.9%", key: "uptime", icon: ShieldCheck },
] as const;

export function TrustStrip() {
  const t = useTranslations("trust");

  return (
    <section
      aria-label="Trust metrics"
      className="relative z-10 -mt-16 pb-6 sm:-mt-20 sm:pb-8 md:-mt-24"
    >
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface-strong/95 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <div
              className="pointer-events-none absolute -start-6 -top-8 size-28 rounded-full border border-accent/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -end-4 bottom-[-2rem] size-24 rotate-12 border border-accent/15"
              aria-hidden
              style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-accent/50 to-transparent"
              aria-hidden
            />

            <ul className="relative grid grid-cols-2 md:grid-cols-4">
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.key}
                    className="group relative flex flex-col items-center gap-3 px-4 py-8 text-center sm:px-6"
                  >
                    {i > 0 ? (
                      <span
                        className="pointer-events-none absolute inset-y-6 start-0 hidden w-px bg-border md:block"
                        aria-hidden
                      />
                    ) : null}
                    {i % 2 === 1 ? (
                      <span
                        className="pointer-events-none absolute inset-y-6 start-0 w-px bg-border md:hidden"
                        aria-hidden
                      />
                    ) : null}

                    <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <p className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                      <span className="text-accent">{item.value}</span>
                    </p>
                    <p className="max-w-[12rem] text-sm font-medium leading-snug text-text-muted sm:text-[0.95rem]">
                      {t(item.key)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
