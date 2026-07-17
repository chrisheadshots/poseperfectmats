import type { MetadataRoute } from "next";
import { PERSONA_LIST, SITE } from "@/lib/copy/personas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const personas = PERSONA_LIST.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...personas,
    {
      url: `${SITE.url}/video-edition`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/cart`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/trademark`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
