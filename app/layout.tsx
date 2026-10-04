import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "BirthdayWishora — Birthday Wishes & Personalized Messages",
    template: "%s | BirthdayWishora",
  },
  description: "BirthdayWishora helps you find, personalize and share the perfect birthday wish for anyone, anywhere in the world.",
  authors: [{ name: "Satpal Swami", email: "satpalswami22742@gmail.com" }],
  creator: "Satpal Swami",
  publisher: "BirthdayWishora",
  keywords: ["birthday wishes", "happy birthday wishes", "birthday messages", "birthday wishes for mom", "funny birthday wishes", "romantic birthday wishes", "personalized birthday wishes"],
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: {
    title: "BirthdayWishora — Birthday Wishes & Personalized Messages",
    description: "Find, personalize and share the perfect birthday message.",
    type: "website",
    siteName: "BirthdayWishora",
    url: siteUrl,
  },
  icons: {
    icon: siteUrl ? `${siteUrl}/icon.svg` : "/icon.svg",
    shortcut: siteUrl ? `${siteUrl}/icon.svg` : "/icon.svg",
    apple: siteUrl ? `${siteUrl}/icon.svg` : "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "BirthdayWishora — Birthday Wishes & Personalized Messages",
    description: "Find, personalize and share the perfect birthday message.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
