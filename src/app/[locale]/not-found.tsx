import { routing } from "@/features/i18n/routing";
import { Link } from "@/features/i18n/navigation";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
      <h1 className="text-3xl font-semibold text-text">404</h1>
      <p className="text-text-muted">Page not found</p>
      <Link
        href="/"
        locale={routing.defaultLocale}
        className="rounded-xl bg-[var(--btn-primary-bg)] px-4 py-2 text-sm font-medium text-[var(--btn-primary-fg)]"
      >
        Home
      </Link>
    </main>
  );
}
