import type {MetadataRoute} from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: base ? `${base}/sitemap.xml` : undefined,
  };
}
