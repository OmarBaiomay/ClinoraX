"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  BarChart3,
  CalendarClock,
  FileText,
  MessageCircle,
  Receipt,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { key: "g1", icon: CalendarClock },
  { key: "g2", icon: FileText },
  { key: "g3", icon: Receipt },
  { key: "g4", icon: BarChart3 },
  { key: "g5", icon: MessageCircle },
  { key: "g6", icon: Users },
] as const;

function MockScreen({ label, Icon }: { label: string; Icon: (typeof items)[number]["icon"] }) {
  return (
    <figure className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-3xl border border-border bg-bg-elevated transition-colors group-hover:border-accent/30">
      <div className="flex items-center gap-1.5 border-b border-border bg-bg/60 px-4 py-3">
        <span className="size-2 rounded-full bg-accent/30" />
        <span className="size-2 rounded-full bg-accent/20" />
        <span className="size-2 rounded-full bg-accent/10" />
      </div>
      <div className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-accent/10 via-transparent to-transparent p-6">
        <div className="absolute inset-6 rounded-xl border border-dashed border-accent/20" aria-hidden />
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110">
          <Icon className="size-6" />
        </span>
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-sm font-medium text-text">
        {label}
      </figcaption>
    </figure>
  );
}

export function GallerySection() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="section-pad section-blend">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.05}>
              <MockScreen label={t(`items.${item.key}`)} Icon={item.icon} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
