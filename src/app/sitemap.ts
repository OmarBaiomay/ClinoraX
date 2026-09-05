import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const paths = ["", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const ar = `${SITE.url}/ar${path}`;
    const en = `${SITE.url}/en${path}`;
    const isHome = path === "";

    return [
      {
        url: ar,
        lastModified,
        changeFrequency: isHome ? "weekly" : "monthly",
        priority: isHome ? 1 : 0.4,
        alternates: {
          languages: { ar, en },
        },
      },
      {
        url: en,
        lastModified,
        changeFrequency: isHome ? "weekly" : "monthly",
        priority: isHome ? 0.9 : 0.4,
        alternates: {
          languages: { ar, en },
        },
      },
    ];
  });
}
