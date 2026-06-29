import Script from "next/script";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";

function getPlausibleDomain(): string | null {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  return domain || null;
}

/**
 * Loads analytics when configured.
 * Meta Pixel + Google Analytics are on by default; set env to "disabled" to turn off.
 */
export function SiteAnalytics() {
  const plausibleDomain = getPlausibleDomain();

  return (
    <>
      <MetaPixel />
      <GoogleAnalytics />

      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
