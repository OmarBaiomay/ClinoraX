import { Container } from "@/components/layout/container";
import { Link } from "@/features/i18n/navigation";
import { SITE } from "@/lib/constants";
import type { ReactNode } from "react";

export type LegalSection = {
  title: string;
  body: ReactNode;
};

type LegalDocumentProps = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  backLabel: string;
  contactLabel: string;
};

export function LegalDocument({
  title,
  updated,
  intro,
  sections,
  backLabel,
  contactLabel,
}: LegalDocumentProps) {
  return (
    <section className="section-pad relative pt-28 md:pt-32">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          {backLabel}
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-text-muted">{updated}</p>
          <p className="mt-5 text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
            {intro}
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight text-text">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-pretty text-base leading-relaxed text-text-muted">
                {section.body}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-8 text-sm text-text-muted">
          {contactLabel}{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-accent hover:underline"
          >
            {SITE.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
