"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { useTrialModal } from "@/components/providers/trial-modal-provider";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { telUrl, whatsappUrl } from "@/lib/constants";
import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function FinalCtaSection() {
  const t = useTranslations("finalCta");
  const { openTrial } = useTrialModal();

  return (
    <section id="contact" className="section-pad section-blend">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-gradient-to-br from-accent/15 via-bg-elevated to-bg-elevated px-6 py-14 text-center sm:px-12">
            <div
              className="pointer-events-none absolute -start-10 top-0 size-48 rounded-full bg-accent/20 blur-3xl"
              aria-hidden
            />
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-text-muted">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton size="lg" onClick={openTrial}>
                {t("trial")}
              </MagneticButton>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#128C7E] px-6 text-base font-medium text-white transition-colors hover:bg-[#0f766e]"
              >
                <MessageCircle className="size-4" />
                {t("whatsapp")}
              </a>
              <a
                href={telUrl()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-6 text-base font-medium text-text transition-colors hover:bg-accent-muted"
              >
                <Phone className="size-4" />
                {t("call")}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
