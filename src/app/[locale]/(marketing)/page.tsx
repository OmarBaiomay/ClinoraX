import { AboutSection } from "@/components/marketing/about-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { FinalCtaSection } from "@/components/marketing/final-cta-section";
import { GallerySection } from "@/components/marketing/gallery-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { ProcessSection } from "@/components/marketing/process-section";
import { ResultsSection } from "@/components/marketing/results-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { WhySection } from "@/components/marketing/why-section";
import {
  buildMetadata,
  courseJsonLd,
  organizationJsonLd,
} from "@/lib/seo";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/features/i18n/routing";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : "ar";
  return buildMetadata(safe);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : "ar";
  setRequestLocale(safe);

  const org = organizationJsonLd(safe);
  const course = courseJsonLd(safe);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }}
      />
      <HeroSection />
      <TrustStrip />
      <WhySection />
      <AboutSection />
      <FeaturesSection />
      <ProcessSection />
      <ResultsSection />
      <TestimonialsSection />
      <GallerySection />
      <FaqSection />
      <PricingSection />
      <FinalCtaSection />
    </>
  );
}
