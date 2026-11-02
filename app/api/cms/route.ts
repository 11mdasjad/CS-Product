import { env } from "@/lib/runtime-env";
import { getDb } from "@/db";
import { articles } from "@/db/schema";
import { getArticles } from "@/lib/articles";
import { authorized, cmsReady, makeToken, matches } from "@/lib/cms-auth";
import { sameOrigin, readJson, rateLimit, json } from "@/lib/server-security";
export async function GET(request: Request) {
  if (!cmsReady())
    return json(
      {
        code: "NOT_CONFIGURED",
        message:
          "The content editor requires a connected database and CMS_PASSWORD (at least 24 characters) in server environment settings.",
      },
      503,
    );
  if (!(await authorized(request)))
    return json({ message: "Please sign in." }, 401);
  return json({ articles: await getArticles(true) });
}
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ message: "Invalid origin." }, 403);
  let d;
  try {
    d = await readJson(request);
  } catch {
    return json({ message: "Invalid request." }, 400);
  }
  if (d?.action === "logout")
    return new Response("{}", {
      headers: {
        "Set-Cookie":
          "vvk_cms=; Path=/api/cms; HttpOnly; SameSite=Strict; Max-Age=0",
        "Cache-Control": "no-store",
      },
    });
  if (!cmsReady())
    return json({ message: "Content editor is not configured." }, 503);
  try {
    if (!(await rateLimit(request, "cms-login", 8)))
      return json(
        { message: "Please wait 15 minutes before trying again." },
        429,
      );
  } catch {
    return json({ message: "The editor database is unavailable." }, 503);
  }
  if (
    typeof d?.password !== "string" ||
    !(await matches(d.password, env.CMS_PASSWORD!))
  )
    return json({ message: "Incorrect password." }, 401);
  return new Response('{"ok":true}', {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Set-Cookie": `vvk_cms=${await makeToken()}; Path=/api/cms; HttpOnly; SameSite=Strict; Max-Age=28800${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`,
    },
  });
}
export async function PUT(request: Request) {
  if (!sameOrigin(request) || !(await authorized(request)))
    return json({ message: "Please sign in again." }, 401);
  let d;
  try {
    d = await readJson(request);
  } catch {
    return json({ message: "Invalid article." }, 400);
  }
  if (
    !d ||
    typeof d !== "object" ||
    ![
      "slug",
      "title",
      "category",
      "excerpt",
      "image",
      "date",
      "author",
      "body",
      "status",
    ].every((k) => typeof d[k] === "string")
  )
    return json({ message: "Complete all article fields." }, 400);
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug) ||
    d.slug.length > 100 ||
    d.title.length < 3 ||
    d.title.length > 180 ||
    d.category.length > 50 ||
    d.author.length > 100 ||
    d.excerpt.length > 500 ||
    d.body.length < 30 ||
    d.body.length > 30000 ||
    !["draft", "published"].includes(d.status) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(d.date) ||
    Number.isNaN(Date.parse(d.date)) ||
    ![
      "/images/office.jpg",
      "/images/building.jpg",
      "/images/desk.jpg",
      "/images/accounting-review.jpg",
      "/images/financial-documents.jpg",
    ].includes(d.image)
  )
    return json(
      {
        message:
          "Check the slug, title, article body, date, cover image and status.",
      },
      400,
    );
  const article = {
    slug: d.slug,
    title: d.title,
    category: d.category,
    excerpt: d.excerpt,
    image: d.image,
    date: d.date,
    author: d.author,
    body: d.body,
    status: d.status,
  };
  try {
    await getDb()
      .insert(articles)
      .values(article)
      .onConflictDoUpdate({ target: articles.slug, set: article });
    return json({ ok: true });
  } catch {
    return json(
      { message: "Changes could not be saved. Please try again." },
      503,
    );
  }
}
