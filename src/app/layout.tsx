import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { BRAND_ASSETS } from "@/lib/brand";
import { rootMetadata } from "@/lib/site-metadata";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...rootMetadata,
  icons: {
    icon: [
      { url: BRAND_ASSETS.favicon32, sizes: "32x32", type: "image/png" },
      { url: BRAND_ASSETS.favicon16, sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: BRAND_ASSETS.appIcon, sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1410",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className="dark">
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased bg-forest-black text-foreground`}
      >
        <SiteAnalytics />
        {children}
      </body>
    </html>
  );
}
