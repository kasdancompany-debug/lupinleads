import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — Contractor Growth System | Meta Ads, CRM & Reporting`,
  description: SITE.description,
  keywords: [
    "contractor growth system",
    "contractor leads",
    "Meta ads for contractors",
    "contractor CRM",
    "AI follow up",
    "lead capture forms",
    "contractor reporting",
    "LUPIN LEADS",
  ],
  openGraph: {
    title: `${SITE.headline} | ${SITE.name}`,
    description: SITE.description,
    type: "website",
    url: "https://lupinleads.com",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://lupinleads.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased bg-forest-black text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
