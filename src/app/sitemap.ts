import type { MetadataRoute } from "next";
import { strains } from "@/data/strains";
import { countries } from "@/data/countries";
import { tools } from "./tools/registry";

const base = "https://weedsfinder.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/strains`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/finder`, priority: 0.9 },
    { url: `${base}/map`, priority: 0.8 },
    { url: `${base}/laws`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tools`, priority: 0.7 },
    { url: `${base}/assistant`, priority: 0.7 },
    ...strains.map((s) => ({ url: `${base}/strains/${s.slug}`, priority: 0.8 })),
    ...countries.map((c) => ({
      url: `${base}/laws/${c.slug}`,
      lastModified: new Date(c.updated),
      priority: 0.8,
    })),
    ...tools.map((t) => ({ url: `${base}/tools/${t.slug}`, priority: 0.6 })),
  ];
}
