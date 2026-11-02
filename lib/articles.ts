import { getDb } from "@/db";
import { articles } from "@/db/schema";
import { seedArticles, type Article } from "@/content/site";
export async function getArticles(includeDrafts = false): Promise<Article[]> {
  let stored: Article[] = [];
  try {
    stored = (await getDb().select().from(articles)) as Article[];
  } catch {
    /* Bundled editorial content remains available before database provisioning. */
  }
  const all = new Map(seedArticles.map((a) => [a.slug, a]));
  stored.forEach((a) => all.set(a.slug, a));
  return [...all.values()]
    .filter((a) => includeDrafts || a.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
}
