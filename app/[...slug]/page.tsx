import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, partners } from "@/content/site";
import { getArticles } from "@/lib/articles";
import { siteUrl } from "@/lib/site-url";
import {
  AboutPage,
  ServicesPage,
  ServicePage,
  TeamPage,
  PartnerPage,
  InsightsPage,
  ArticlePage,
  ContactPage,
  LegalPage,
} from "@/components/site/pages";
type Props = { params: Promise<{ slug: string[] }> };
const meta: Record<string, [string, string]> = {
  about: [
    "About Our Firm",
    "Meet VVK & Associates: partner-led audit, tax, accounting and advisory services in Noida and Gurugram.",
  ],
  services: [
    "Our Professional Services",
    "Explore startup advisory, taxation, audit, international bookkeeping, Virtual CFO and business incorporation services.",
  ],
  team: [
    "Our Partners",
    "Meet CA Vikash Kumar, Founder, and founding partners CA Kapil Arora and CA Veer Singh of VVK & Associates.",
  ],
  insights: [
    "Insights & Blogs",
    "Practical reading on financial organisation, audit preparation and business planning.",
  ],
  contact: [
    "Contact Us",
    "Contact VVK & Associates in Noida and Gurugram by phone, email or WhatsApp.",
  ],
  consultation: [
    "Request a Consultation",
    "Discuss your financial, tax or business requirements with our professionals. Request a consultation with VVK & Associates.",
  ],
  privacy: [
    "Privacy Policy",
    "How VVK & Associates handles website enquiries and personal information.",
  ],
  terms: [
    "Terms of Use",
    "Information about using the VVK & Associates website and requesting professional services.",
  ],
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => slug[0] === "services" && slug[1] === x.slug);
  const p = partners.find((x) => slug[0] === "team" && slug[1] === x.slug);
  const a =
    slug[0] === "insights" && slug[1]
      ? (await getArticles()).find((x) => x.slug === slug[1])
      : undefined;
  const m = s
    ? [s.full, s.desc]
    : p
      ? [p.name, p.bio]
      : a
        ? [a.title, a.excerpt]
        : meta[slug[0]];
  return {
    title: m?.[0] || "Page not found",
    description: m?.[1],
    alternates: { canonical: "/" + slug.join("/") },
    ...(a
      ? {
          openGraph: {
            type: "article",
            title: a.title,
            description: a.excerpt,
            publishedTime: a.date,
            images: [a.image],
          },
        }
      : {}),
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  let page: React.ReactNode;
  let article;
  let person;
  if (slug.length === 1) {
    switch (slug[0]) {
      case "about":
        page = <AboutPage />;
        break;
      case "services":
        page = <ServicesPage />;
        break;
      case "team":
        page = <TeamPage />;
        break;
      case "insights":
        page = <InsightsPage articles={await getArticles()} />;
        break;
      case "contact":
        page = <ContactPage />;
        break;
      case "consultation":
        page = <ContactPage consultation />;
        break;
      case "privacy":
        page = <LegalPage kind="privacy" />;
        break;
      case "terms":
        page = <LegalPage kind="terms" />;
        break;
      default:
        notFound();
    }
  } else if (
    slug.length === 2 &&
    slug[0] === "services" &&
    services.some((x) => x.slug === slug[1])
  )
    page = <ServicePage slug={slug[1]} />;
  else if (
    slug.length === 2 &&
    slug[0] === "team" &&
    (person = partners.find((x) => x.slug === slug[1]))
  )
    page = <PartnerPage slug={slug[1]} />;
  else if (slug.length === 2 && slug[0] === "insights") {
    const all = await getArticles();
    article = all.find((x) => x.slug === slug[1]);
    if (!article) notFound();
    page = <ArticlePage article={article} articles={all} />;
  } else notFound();
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        ...slug.map((s, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: s.replaceAll("-", " "),
          item: siteUrl + "/" + slug.slice(0, i + 1).join("/"),
        })),
      ],
    },
  ];
  if (article)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      datePublished: article.date,
      author: { "@type": "Organization", name: article.author },
      publisher: { "@type": "Organization", name: "VVK & Associates" },
      image: siteUrl + article.image,
      mainEntityOfPage: siteUrl + "/insights/" + article.slug,
    });
  if (person)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
      worksFor: { "@type": "Organization", name: "VVK & Associates" },
    });
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      {page}
    </>
  );
}
