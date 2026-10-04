import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Wishly — Birthday Wishes & Personalized Messages",
    template: "%s | Wishly",
  },
  description: "Find beautiful birthday wishes for Mom, Dad, friends, partners, colleagues and more. Personalize, copy and share birthday messages in seconds.",
  keywords: ["birthday wishes", "happy birthday wishes", "birthday messages", "birthday wishes for mom", "funny birthday wishes", "romantic birthday wishes"],
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: {
    title: "Wishly — Birthday Wishes & Personalized Messages",
    description: "Find, personalize and share the perfect birthday message.",
    type: "website",
    siteName: "Wishly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wishly — Birthday Wishes & Personalized Messages",
    description: "Find, personalize and share the perfect birthday message.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
