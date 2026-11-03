import type { Metadata } from "next";
import { Header, Footer, FloatingActions } from "@/components/site/interactive";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VVK & Associates | Chartered Accountants in Noida",
    template: "%s | VVK & Associates",
  },
  description:
    "Partner-led audit, taxation, bookkeeping and financial advisory for businesses and individuals. VVK & Associates, Chartered Accountants, Noida.",
  icons: { icon: "/images/ca-logo-no-circle.png", apple: "/images/ca-logo-no-circle.png" },
  openGraph: {
    type: "website",
    siteName: "VVK & Associates",
    images: [
      { url: "/images/financial-documents.jpg", width: 1400, height: 933 },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="site-frame">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <FloatingActions />
      </body>
    </html>
  );
}
