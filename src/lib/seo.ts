import type { Metadata } from "next";
import { SITE } from "./constants";

type Locale = "ar" | "en";

const meta = {
  ar: {
    title: "كلينوراكس | منصة إدارة العيادات الأولى",
    description:
      "منصة كلينوراكس لإدارة العيادات في السعودية: مواعيد، سجلات مرضى، فوترة، وتقارير في مكان واحد. احجز عرضًا توضيحيًا مجانيًا.",
    ogLocale: "ar_SA",
  },
  en: {
    title: "ClinoraX | The Clinic Management Platform",
    description:
      "ClinoraX unifies appointments, patient records, billing, and reporting for clinics in Saudi Arabia. Book a free demo today.",
    ogLocale: "en_US",
  },
} as const;

export function buildMetadata(locale: Locale): Metadata {
  const m = meta[locale];
  const url = `${SITE.url}/${locale}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: m.title,
      template: locale === "ar" ? `%s | كلينوراكس` : `%s | ClinoraX`,
    },
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        ar: `${SITE.url}/ar`,
        en: `${SITE.url}/en`,
        "x-default": `${SITE.url}/ar`,
      },
    },
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      url,
      siteName: locale === "ar" ? SITE.nameAr : SITE.nameEn,
      title: m.title,
      description: m.description,
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildPageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const m = meta[locale];
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE.url}/${locale}${normalized}`;
  const arUrl = `${SITE.url}/ar${normalized}`;
  const enUrl = `${SITE.url}/en${normalized}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ar: arUrl,
        en: enUrl,
        "x-default": arUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      url,
      siteName: locale === "ar" ? SITE.nameAr : SITE.nameEn,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  const name = locale === "ar" ? SITE.nameAr : SITE.nameEn;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ar" ? SITE.city : SITE.cityEn,
      addressCountry: "SA",
    },
    sameAs: [whatsappSameAs()],
  };
}

function whatsappSameAs() {
  return `https://wa.me/${SITE.whatsapp}`;
}

export function courseJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: locale === "ar" ? "منصة كلينوراكس لإدارة العيادات" : "ClinoraX Clinic Management Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      locale === "ar"
        ? "منصة سحابية لإدارة المواعيد وسجلات المرضى والفوترة والتقارير للعيادات."
        : "A cloud platform for appointments, patient records, billing, and reporting for clinics.",
    provider: {
      "@type": "Organization",
      name: locale === "ar" ? SITE.nameAr : SITE.nameEn,
      sameAs: SITE.url,
    },
    inLanguage: locale === "ar" ? "ar-SA" : "en",
  };
}
