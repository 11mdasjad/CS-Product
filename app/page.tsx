import { firm } from "@/content/site";
import { HomePage } from "@/components/site/pages";
import { getArticles } from "@/lib/articles";
import { siteUrl } from "@/lib/site-url";
export const metadata = { alternates: { canonical: "/" } };
export default async function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "VVK & Associates",
    url: siteUrl,
    telephone: firm.phoneInternational,
    email: "vvkindia23@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-21, Front Office, Ground Floor, Sector-6",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomePage articles={await getArticles()} />
    </>
  );
}
