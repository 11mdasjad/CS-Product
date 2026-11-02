import { services, partners } from "@/content/site";
import { getArticles } from "@/lib/articles";
import { siteUrl } from "@/lib/site-url";
export default async function sitemap() {
  return [
    "",
    "/about",
    "/services",
    "/team",
    "/insights",
    "/contact",
    "/consultation",
    "/privacy",
    "/terms",
    ...services.map((s) => "/services/" + s.slug),
    ...partners.map((p) => "/team/" + p.slug),
    ...(await getArticles()).map((a) => "/insights/" + a.slug),
  ].map((path) => ({
    url: siteUrl + path,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
