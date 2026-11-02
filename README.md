# VVK & Associates website

A complete responsive website based on the supplied Pinterest reference: an ivory canvas, oversized serif headline, expanding photographic panels, navy typography and restrained gold accents.

## Run locally

Requires Node 22.13 or later.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5187
```

The project uses TypeScript, React, Next App Router-compatible routes through Vinext, Tailwind CSS, Lucide icons and Cloudflare Workers/D1. Keep the Sites Vite integration when deploying on Sites.

## Pages and content

- Home, about, services, team, insights, contact and consultation requests.
- Six complete service detail pages, three partner profiles and three editorial articles.
- Privacy, terms, custom 404, sitemap.xml and robots.txt.
- Search/category filters, accessible FAQ details, service dropdown, mobile navigation, profile expansion, WhatsApp, phone, email and directions links.
- No invented appointments. Consultation requests are confirmed personally.

Firm/service/profile content: `content/site.ts`. Site composition: `components/site/pages.tsx`. Interactive components: `components/site/interactive.tsx`. Styling and responsive breakpoints: `app/globals.css`.

## Email delivery

Configure these **server-side** runtime values through Sites environment settings. For local development use ignored `.dev.vars`:

- `RESEND_API_KEY`: Resend API key.
- `RESEND_FROM_EMAIL`: sender using a domain verified in that Resend account.

Destination is fixed to `vvkindia23@gmail.com`. Delivery uses the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email). The form shows acceptance only after the provider returns an email ID. This confirms provider acceptance, not inbox delivery. If settings are absent, the server returns HTTP 503 and the interface clearly says the enquiry was not sent, with a prefilled mailto link and WhatsApp alternative.

Validation runs both in the browser and on the server. The API rejects cross-origin requests, bounds request size, validates field lengths and service choices, uses a honeypot/minimum completion time and applies atomic D1 rate limits. Message content is sent as plain text. Request payloads and provider secrets are not logged. Confidential documents should be exchanged separately.

## Article CMS

Set `CMS_PASSWORD` to a strong random value of at least 24 characters in server environment settings, then open `/admin`. No default password is included. The editor remains locked until configured.

- Login uses an HttpOnly, SameSite cookie (Secure on HTTPS), HMAC-signed with an eight-hour lifetime.
- Login attempts are limited through D1. Writes require authentication and same-origin requests.
- Create/edit articles, choose one of the bundled cover images, save drafts, publish or unpublish.
- Use blank lines for paragraphs and `## Heading` for section headings. Raw HTML is rendered as text.
- Existing article slugs are immutable in the editor to avoid breaking links.
- Bundled articles provide initial editorial content. A saved D1 record overrides the corresponding bundled article; setting it to draft removes it from public listings and article routes.
- The CMS does not provide arbitrary image uploads or multi-user roles.

D1 binding `DB` is declared in `.openai/hosting.json`. Migrations are in `drizzle/`. Sites applies these before publication. For local development, build once and apply each pending migration **once**:

```sh
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_lame_nebula.sql
```

## Deployment

The registered private Site ID is preserved in `.openai/hosting.json`. Use the Sites source workflow to synchronize the exact source commit, build/package, and deploy a saved version. Do not create another Site for this checkout.

For a custom domain, set `SITE_URL` before building so canonical URLs, structured data and sitemap use that domain. Runtime secrets must be configured separately; never commit live credentials. `.env.example` documents the names.

Known old URLs `/about-us/`, `/our-team/`, `/our-services/`, `/contact-us/` and `/blogs/` redirect permanently to the corresponding new pages. Complete the redirect map from an export of the existing WordPress URLs before replacing vvkglobal.com.

## Content and launch notes

Business details come from the supplied brief and the firm's indexed [about](https://vvkglobal.com/about-us/) and [team](https://vvkglobal.com/our-team/) pages. The Gurugram address appears on the existing firm site; confirm office arrangements before visiting. Vikash's B.Com, ACA and ID (IICA) qualifications come from the supplied brief.

The user subsequently supplied the VVK business card. Its CA emblem was extracted with the built-in Imagegen tool and is used in the header, footer and browser icon. The project asset is `public/images/ca-logo.png`. Genuine partner photos were unavailable, so partner cards use initials. Replace these only with authorised genuine portraits. Stock office and desk photography is illustrative, not a claim about the firm's premises or staff.

Article content is original, evergreen introductory reading, dated 2 November 2026. It contains no claimed regulatory deadlines or tax rates. Before making the site publicly accessible on the firm's domain, the firm should review its content and applicable professional-conduct requirements. The current deployment is owner-private.

The existing domain's search results include unrelated `/item/…` commerce pages. The current hosting/WordPress environment needs investigation and a verified URL inventory before removal. This build does not delete or change the existing website.

No advertising or analytics scripts are used. Cookie information explains necessary hosting/security and editor session cookies; an optional-tracking banner is not shown when no optional tracking is enabled.

## Photography sources

- Architecture: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- Office: https://images.unsplash.com/photo-1497366754035-f200968a6e72
- Financial desk: https://images.unsplash.com/photo-1454165804606-c3d57bc86b40

## Verification

TypeScript and production build pass. Browser checks cover desktop (1440px) and mobile (390px), all content routes, 404, sitemap and robots, intact images, one H1 per HTML page, service filtering, dropdown/keyboard close, blog search and no-results state, partner expansion, FAQ expansion, mobile navigation and the unconfigured email fallback. No browser runtime errors were observed. The CMS login, draft persistence, publication, unpublication and logout were verified against the local database with temporary credentials. Live email delivery and production CMS login require the runtime settings above; they are not claimed as connected.

## Logo extraction record

Built-in Imagegen mode; transparent output. Saved project asset: `public/images/ca-logo.png`.

Prompt: Extract only the circular CA emblem from the upper right corner of the supplied VVK & Associates business card. Preserve the navy CA letter shapes, saffron and green angular swooshes, and thin gold circle. Remove card text and decorative waves. Center the complete emblem on a square transparent canvas with clear padding, without redesign, added text or shadows.

## Services redesign

The homepage and services directory share a redesigned service browser: category pills with counts, a navy photographic introduction, six editorial service cards with concise scope highlights, and a consultation link. The feature copy responds to the selected category. Mobile layouts use a compact image-backed introduction and full-width cards. Desktop/mobile/tablet checks verified filtering, links and no horizontal overflow.

## Accounting photography and readability update

Replaced generic architectural imagery in the hero, service feature, about sections, service detail pages and bundled articles with relevant accounting-document photography. These remain illustrative stock images, not portraits of VVK staff.

- Accounting review — Mikhail Nilov, Pexels: https://www.pexels.com/photo/a-person-examining-documents-8296970/ → `public/images/accounting-review.jpg`.
- Financial records — RDNE Stock project, Pexels: https://www.pexels.com/photo/white-papers-on-the-table-7821708/ → `public/images/financial-documents.jpg`.

Both source pages identify the photographs as free to use. Image files are hosted locally. The existing desk-advisory photo remains in the first hero panel. The CMS includes the new covers while retaining existing cover options for older articles.

Body descriptions now use 16px type in the principal sections, with darker navy-grey text. Service titles are 30px, service labels 11–12px, and primary buttons 14px. Dark panels retain light text for contrast. Navigation switches to the mobile menu earlier to make room for larger labels.

WhatsApp brand icon: Simple Icons 14.15.0, https://cdn.jsdelivr.net/npm/simple-icons@14.15.0/icons/whatsapp.svg. Stored locally as `public/images/whatsapp.svg`; the floating button links to the firm’s existing WhatsApp number.
