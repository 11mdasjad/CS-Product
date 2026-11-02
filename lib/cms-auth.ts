import { env } from "@/lib/runtime-env";
const enc = new TextEncoder();
export const cmsReady = () =>
  !!env.DB && !!env.CMS_PASSWORD && env.CMS_PASSWORD.length >= 24;
async function signature(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(env.CMS_PASSWORD || ""),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return Array.from(
    new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(value))),
  )
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
export async function matches(a: string, b: string) {
  const aa = new Uint8Array(
    await crypto.subtle.digest("SHA-256", enc.encode(a)),
  );
  const bb = new Uint8Array(
    await crypto.subtle.digest("SHA-256", enc.encode(b)),
  );
  let mismatch = 0;
  for (let i = 0; i < aa.length; i++) mismatch |= aa[i] ^ bb[i];
  return mismatch === 0;
}
export async function makeToken() {
  const expiry = String(Date.now() + 8 * 3600000);
  return expiry + "." + (await signature(expiry));
}
export async function authorized(request: Request) {
  if (!cmsReady()) return false;
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith("vvk_cms="))
    ?.slice(8);
  if (!token) return false;
  const [expiry, sig] = token.split(".");
  return (
    !!sig &&
    Number(expiry) > Date.now() &&
    (await matches(sig, await signature(expiry)))
  );
}
