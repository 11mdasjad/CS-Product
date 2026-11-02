import { env } from "cloudflare:workers";
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !!origin && origin === new URL(request.url).origin;
}
export async function readJson(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new Error("CONTENT");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("BODY");
  let length = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > 48000) {
      await reader.cancel();
      throw new Error("SIZE");
    }
    chunks.push(value);
  }
  const all = new Uint8Array(length);
  let at = 0;
  for (const c of chunks) {
    all.set(c, at);
    at += c.length;
  }
  return JSON.parse(new TextDecoder().decode(all));
}
export async function rateLimit(request: Request, scope: string, max: number) {
  if (!env.DB) return false;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const windowId = Math.floor(now / windowMs);
  const ip = request.headers.get("cf-connecting-ip") || "local";
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip),
  );
  const key =
    scope +
    ":" +
    windowId +
    ":" +
    Array.from(new Uint8Array(hash))
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  await env.DB.prepare("DELETE FROM request_limits WHERE expires < ?")
    .bind(now)
    .run();
  const row = await env.DB.prepare(
    "INSERT INTO request_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
  )
    .bind(key, (windowId + 1) * windowMs)
    .first<{ count: number }>();
  return !!row && row.count <= max;
}
export function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
