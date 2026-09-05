export const SITE = {
  nameAr: "كلينوراكس",
  nameEn: "ClinoraX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinorax.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+966500000000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "966500000000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@clinorax.com",
  city: "الرياض",
  cityEn: "Riyadh",
} as const;

export function whatsappUrl(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${SITE.whatsapp}${text}`;
}

export function telUrl() {
  return `tel:${SITE.phone}`;
}
