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

The user subsequently supplied the VVK business card. Its CA emblem was extracted with the built-in Imagegen tool and is used in the header, footer and browser icon. The project asset is `public/images/ca-logo.png`. Vikash Kumar’s user-supplied photograph is used on his homepage/about/team cards and detailed profile. The remaining partner cards use initials until authorised genuine portraits are supplied. Stock office and desk photography is illustrative, not a claim about the firm's premises or staff.

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

CA Vikash Kumar’s designation and complete three-paragraph biography were updated from the user’s supplied text on 2 November 2026. The dedicated profile preserves the full wording; the team page expands the complete biography, and homepage cards use a concise summary.

Vikash portrait: original user-supplied photograph, copied unchanged from `WhatsApp Image 2026-11-02 at 13.50.14.jpeg` to `public/images/vikash.jpg`. Card framing uses CSS; the full photograph is shown on the dedicated profile.

Kapil Arora and Veer Singh portraits: framed directly from the user-supplied team slide (`WhatsApp Image 2026-11-02 at 14.13.04.jpeg`), stored unchanged as `public/images/team-source.jpg`. The shared `PartnerPhoto` component uses SVG viewports to display each original portrait without recreating faces. Used on team cards and individual profiles. Vikash retains his higher-resolution original photograph.

### Full-frame portrait enhancement

The screenshot framing above has been replaced at the user's request. Enhanced portraits now fill cards and profile frames without a blue surround. Original references remain available. Built-in imagegen edit mode produced `public/images/kapil-enhanced.png` and `public/images/veer-enhanced.png` from `public/images/team-source.jpg`.

Shared final prompt: Use case: identity-preserve. Asset type: enhanced original team portrait for a chartered accountants website. Input is an edit target: supplied team slide. Extract only the specified person's original photograph, remove ALL slide layout, blue panels, borders, rounded corners and text. Output one rectangular high-resolution portrait, 4:5 aspect, head and upper torso with ample headroom. Extend only the plain off-white photo background as needed to reach edges. Gently improve sharpness, compression artifacts, exposure and natural detail. Keep the exact person's facial geometry, expression, hairstyle, complexion, age, clothing and pose from the reference; no beautification, no different face, no extra accessories, no text. This is a faithful photo restoration, not a redesign.

Kapil prompt suffix: Subject: ONLY CA Kapil Arora, the middle photo, man with glasses wearing a black blazer and white shirt with crossed arms. Exclude both other men.

Veer prompt suffix: Subject: ONLY CA Veer Singh, the rightmost photo, man with short black hair and trimmed beard wearing a white collared shirt facing camera. Exclude both other men.

The website theme now follows the logo's navy and orange palette: navy `#082653`, orange `#ff6b00`, darker orange `#b74600` for readable text, and light orange `#ffb679` on navy panels. Primary buttons use orange with navy text; gold accents and green-tinted decorative surfaces were replaced with orange and pale blue. Portraits remain full frame. The supplied logo and WhatsApp brand mark keep their original colors.

## Vercel deployment

Vercel builds native Next.js using `npm run build:vercel` (`next build --webpack`) and `.next` output, as specified by `vercel.json`. Node is pinned to the 22.x release line. `npm run build` also selects Next.js when `VERCEL=1`; the existing Sites build and local preview continue to use Vinext/Cloudflare. Use `npm run start:vercel` to smoke-test the native production build locally.

Set `SITE_URL` to the canonical production origin if using a custom domain. Otherwise Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the canonical host. Public pages and bundled insights work on Vercel without Cloudflare bindings. The D1-backed CMS and email rate limiter belong to the Sites runtime: they remain explicitly unconfigured on Vercel until a persistent database integration is added. Contact forms preserve their email/WhatsApp fallback and never report a successful delivery when unconfigured. Email delivery also requires `RESEND_API_KEY` and a verified `RESEND_FROM_EMAIL`; CMS access requires `CMS_PASSWORD` of at least 24 characters. Never commit real credentials.

### Logo without outer circle

Built-in imagegen edit mode removed the golden ring from the original logo. The new transparent asset is `public/images/ca-logo-no-circle.png`, used by the shared header/footer brand and favicon metadata. The footer backing is a small rounded rectangle to keep the navy mark visible on its dark background. Original `ca-logo.png` remains available.

Final prompt: Use case: precise-object-edit. Edit target: the supplied CA logo PNG. Remove ONLY the surrounding thin golden circular ring, including all ring remnants. Preserve the exact navy CA letter shapes, orange and green angular swooshes, proportions and colors. Keep the mark centered and use the same square canvas. All area outside the CA mark must be genuinely transparent. Clean transparent edges. No new enclosing shape, no circle, no background, no shadows, no additional text, no redesign.

Vikash portrait updated on 3 November 2026 to the user's supplied upper-body photograph (`WhatsApp Image 2026-11-03 at 16.04.42-3.jpeg`), copied unchanged to `public/images/vikash-portrait.jpg` (684 × 679). Shared team cards, individual profile and Person metadata use this asset. The former mobile zoom was removed to suit the new framing.

Contact update: the removed number is no longer used in website contact details, telephone metadata or WhatsApp links. The remaining number, +91 89292 95155, is the single contact source in `content/site.ts`. Footer chat, floating WhatsApp button, contact/consultation pages and enquiry fallbacks use `https://wa.me/918929295155`. This is a click-to-chat integration; it opens WhatsApp for the visitor and does not send messages automatically or require WhatsApp Business API credentials.
