import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birthday Wishes — Find the Perfect Birthday Message",
  description: "Beautiful birthday wishes, personalized messages and greeting cards for everyone."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}