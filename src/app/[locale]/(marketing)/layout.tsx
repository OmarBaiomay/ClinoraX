import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollEffects } from "@/components/motion/scroll-effects";
import { TrialModalProvider } from "@/components/providers/trial-modal-provider";
import { DeferredTrialFormModal } from "@/features/leads/deferred-trial-form-modal";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function MarketingLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrialModalProvider>
      <ScrollEffects>
        <div className="page-canvas relative min-h-dvh overflow-x-hidden">
          <div className="page-canvas-glow pointer-events-none absolute inset-0" aria-hidden />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <Navbar />
          <main className="relative z-[1]">{children}</main>
          <div className="relative z-[1]">
            <Footer />
          </div>
          <DeferredTrialFormModal />
        </div>
      </ScrollEffects>
    </TrialModalProvider>
  );
}
