export const SITE = {
  nameAr: "كلينوراكس",
  nameEn: "ClinoraX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinorax.b-code.tech",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+201001234567",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "201001234567",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@clinorax.com",
  city: "القاهرة",
  cityEn: "Cairo",
} as const;

export function whatsappUrl(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsapp}${text}`;
}

export function telUrl() {
  return `tel:${SITE.phone}`;
}
