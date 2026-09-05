"use client";

import dynamic from "next/dynamic";
import { Container } from "@/components/layout/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useTrialModal } from "@/components/providers/trial-modal-provider";
import { Reveal } from "@/components/motion/reveal";
import { HeroClinicShapes } from "@/components/marketing/hero-clinic-shapes";
import { whatsappUrl } from "@/lib/constants";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ClinicScene = dynamic(
  () =>
    import("@/components/three/clinic-scene").then((m) => m.ClinicScene),
  { ssr: false, loading: () => <div className="absolute inset-0" aria-hidden /> },
);

function DeferredClinicScene({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: 2800 });
    } else {
      timeoutId = setTimeout(enable, 2000);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;
  return <ClinicScene className={className} />;
}

export function HeroSection() {
  const t = useTranslations("hero");
  const { openTrial } = useTrialModal();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pb-24 md:pb-32"
    >
      <HeroClinicShapes />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25 md:opacity-35"
        aria-hidden
      >
        <div data-parallax="0.08" className="relative h-full w-full">
          <DeferredClinicScene className="absolute inset-0 start-0 w-full max-w-xl md:max-w-2xl" />
        </div>
      </div>

      {/* Full-bleed gradient wash — sets the clinical teal tone for the hero */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 78% 30%, var(--hero-glow), transparent 60%)",
          }}
        />
        {/* Bottom blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />
      </div>

      {/* Full-width bottom veil so hero + next band share one sky */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-[var(--bg)] to-transparent md:h-52"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-8 pt-28">
        <div className="relative max-w-xl">
          <Reveal>
            <p className="mb-4 text-sm font-semibold tracking-[0.08em] text-accent sm:text-base">
              {t("brand")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-text sm:text-5xl lg:text-6xl">
              {t("headline")}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              {t("description")}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton size="lg" onClick={openTrial}>
                {t("primaryCta")}
              </MagneticButton>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-6 text-base font-medium text-text transition-colors hover:border-accent/40 hover:bg-accent-muted"
              >
                <MessageCircle className="size-4" />
                {t("secondaryCta")}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
