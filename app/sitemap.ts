import type { MetadataRoute } from "next";
import { works } from "@/content/works";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...works.map((w) => ({ url: `${siteUrl}/work/${w.id}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
