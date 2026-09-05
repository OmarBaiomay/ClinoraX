import { LegalDocument } from "@/components/marketing/legal-document";
import { routing } from "@/features/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

const SECTION_KEYS = [
  "acceptance",
  "services",
  "accounts",
  "payments",
  "conduct",
  "ip",
  "liability",
  "law",
  "changes",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : "ar";
  const t = await getTranslations({ locale: safe, namespace: "termsPage" });
  return buildPageMetadata(safe, "/terms", t("title"), t("metaDescription"));
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : "ar";
  setRequestLocale(safe);
  const t = await getTranslations("termsPage");

  return (
    <LegalDocument
      title={t("title")}
      updated={t("updated")}
      intro={t("intro")}
      backLabel={t("back")}
      contactLabel={t("contact")}
      sections={SECTION_KEYS.map((key) => ({
        title: t(`sections.${key}.title`),
        body: <p>{t(`sections.${key}.body`)}</p>,
      }))}
    />
  );
}
