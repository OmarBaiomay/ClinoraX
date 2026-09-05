import { Container } from "@/components/layout/container";
import { Link } from "@/features/i18n/navigation";
import { SITE } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

const quick = [
  { href: "/#why", key: "why" },
  { href: "/#about", key: "about" },
  { href: "/#features", key: "features" },
  { href: "/#pricing", key: "pricing" },
  { href: "/#faq", key: "faq" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const brand = await getTranslations("meta");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-transparent">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-[var(--bg)]/40"
        aria-hidden
      />
      <Container className="section-pad !py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-text">{brand("brand")}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">
              {t("blurb")}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{t("links")}</p>
            <ul className="mt-3 space-y-2">
              {quick.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{t("contact")}</p>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-accent">
                  {SITE.phone}
                </a>
              </li>
              <li>
                {SITE.city} · {SITE.cityEn}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand("brand")}. {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-accent"
            >
              {t("privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent">
              {t("terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
