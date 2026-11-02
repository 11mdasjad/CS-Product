"use client";
import { useState, useEffect } from "react";
import { type Article } from "@/content/site";
const blank = (): Article => ({
  slug: "",
  title: "",
  category: "Business",
  excerpt: "",
  image: "/images/accounting-review.jpg",
  date: new Date().toISOString().slice(0, 10),
  author: "VVK Editorial",
  body: "",
  status: "draft",
});
export function ContentEditor() {
  const [items, setItems] = useState<Article[]>([]);
  const [article, setArticle] = useState<Article>(blank);
  const [state, setState] = useState("loading");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      const r = await fetch("/api/cms");
      const d = (await r.json()) as { articles: Article[]; message: string };
      if (r.ok) {
        setItems(d.articles);
        setState("ready");
      } else {
        setState(r.status === 503 ? "unconfigured" : "login");
        setMessage(d.message);
      }
    } catch {
      setState("login");
      setMessage("Could not reach the editor. Please try again.");
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: new FormData(e.currentTarget).get("password"),
        }),
      });
      const d = (await r.json()) as { articles: Article[]; message: string };
      if (r.ok) {
        setMessage("");
        await load();
      } else setMessage(d.message);
    } catch {
      setMessage("Could not sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      const d = (await r.json()) as { articles: Article[]; message: string };
      setMessage(
        r.ok
          ? article.status === "published"
            ? "Article published."
            : "Draft saved."
          : d.message,
      );
      if (r.ok) await load();
    } catch {
      setMessage("Could not save. Your changes remain in this editor.");
    } finally {
      setBusy(false);
    }
  }
  function update(key: keyof Article, value: string) {
    setArticle({ ...article, [key]: value });
  }
  return (
    <section className="cms">
      <span className="eyebrow">VVK & ASSOCIATES</span>
      <h1>Insights editor.</h1>
      <p>
        Create, update and publish articles. Body text supports paragraphs and
        headings beginning with ##.
      </p>
      {message && (
        <div className="cms-status" role="status">
          {message}
        </div>
      )}
      {state === "loading" && <p>Loading editor…</p>}
      {state === "login" && (
        <form onSubmit={login}>
          <label>
            Editor password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </label>
          <button className="button" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}
      {state === "ready" && (
        <>
          <div className="cms-toolbar">
            <button
              className="button outline"
              onClick={() => {
                setArticle(blank());
                setMessage("");
              }}
            >
              New article
            </button>
            <button
              className="button outline"
              onClick={async () => {
                try {
                  await fetch("/api/cms", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "logout" }),
                  });
                  setState("login");
                  setMessage("Signed out.");
                } catch {
                  setMessage("Could not sign out. Please retry.");
                }
              }}
            >
              Sign out
            </button>
          </div>
          <div className="cms-layout">
            <aside className="cms-sidebar">
              {items.map((a) => (
                <button
                  key={a.slug}
                  onClick={() => {
                    setArticle(a);
                    setMessage("");
                  }}
                >
                  {a.title}
                  <small style={{ display: "block" }}>{a.status}</small>
                </button>
              ))}
            </aside>
            <form onSubmit={save}>
              {(
                [
                  "title",
                  "slug",
                  "category",
                  "author",
                  "date",
                  "excerpt",
                ] as const
              ).map((k) => (
                <label key={k}>
                  {k[0].toUpperCase() + k.slice(1)}
                  <input
                    type={k === "date" ? "date" : "text"}
                    required
                    value={article[k]}
                    readOnly={
                      k === "slug" && items.some((x) => x.slug === article.slug)
                    }
                    onChange={(e) => update(k, e.target.value)}
                  />
                </label>
              ))}
              <label>
                Cover image
                <select
                  value={article.image}
                  onChange={(e) => update("image", e.target.value)}
                >
                  <option value="/images/accounting-review.jpg">
                    Accounting review
                  </option>
                  <option value="/images/financial-documents.jpg">
                    Financial records
                  </option>
                  <option value="/images/office.jpg">Office</option>
                  <option value="/images/building.jpg">Architecture</option>
                  <option value="/images/desk.jpg">Financial desk</option>
                </select>
              </label>
              <label>
                Body
                <textarea
                  rows={18}
                  required
                  minLength={30}
                  value={article.body}
                  onChange={(e) => update("body", e.target.value)}
                />
              </label>
              <label>
                Status
                <select
                  value={article.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  <option value="draft">Draft — hidden from readers</option>
                  <option value="published">
                    Published — visible to readers
                  </option>
                </select>
              </label>
              <button className="button" disabled={busy}>
                {busy
                  ? "Saving…"
                  : article.status === "published"
                    ? "Save and publish"
                    : "Save draft"}
              </button>
              {article.slug && article.status === "published" && (
                <a
                  className="text-link"
                  href={"/insights/" + article.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open article ↗
                </a>
              )}
            </form>
          </div>
        </>
      )}
    </section>
  );
}
