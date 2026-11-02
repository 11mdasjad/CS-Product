import { env } from "@/lib/runtime-env";
import { services } from "@/content/site";
import { sameOrigin, readJson, rateLimit, json } from "@/lib/server-security";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return json(
      {
        message: "This request could not be verified. Please reload the page.",
      },
      403,
    );
  let d;
  try {
    d = await readJson(request);
  } catch {
    return json({ message: "Please send a valid enquiry." }, 400);
  }
  if (!d || typeof d !== "object")
    return json({ message: "Please complete all required fields." }, 400);
  const { name, email, phone, service, message, consent, website, started } = d;
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 120 ||
    typeof email !== "string" ||
    email.length > 200 ||
    !/^\S+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(email) ||
    typeof phone !== "string" ||
    !/^[+0-9 ()-]{7,20}$/.test(phone) ||
    (!services.some((s) => s.full === service) &&
      service !== "General consultation") ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > 4000 ||
    consent !== "yes"
  )
    return json(
      {
        message:
          "Please check your name, email, mobile number, service, message and privacy consent.",
      },
      400,
    );
  if (website || typeof started !== "number" || Date.now() - started < 2500)
    return json({ message: "Please review your enquiry and try again." }, 400);
  if (!env.DB || !env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL)
    return json(
      {
        code: "NOT_CONFIGURED",
        message:
          "Online email delivery is not connected yet. Your enquiry has not been sent. Please use the email option below or contact us on WhatsApp.",
      },
      503,
    );
  try {
    if (!(await rateLimit(request, "enquiry", 5)))
      return json(
        {
          message:
            "Too many requests. Please try again in 15 minutes or call our team.",
        },
        429,
      );
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: ["vvkindia23@gmail.com"],
        reply_to: email,
        subject: `Website ${d.kind === "consultation" ? "consultation request" : "enquiry"}: ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${phone}\nService: ${service}\n\n${message}\n\nConsent: Agreed to contact about this enquiry.`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return json(
        {
          message:
            "Email delivery is temporarily unavailable. Your enquiry has not been confirmed. Please email or call our team.",
        },
        502,
      );
    const result = (await response.json()) as { id?: string };
    if (!result.id)
      return json(
        {
          message:
            "Email delivery could not be confirmed. Please contact us directly.",
        },
        502,
      );
    return json({ ok: true });
  } catch {
    return json(
      {
        message:
          "We could not confirm delivery. Please contact us by email or phone.",
      },
      503,
    );
  }
}
