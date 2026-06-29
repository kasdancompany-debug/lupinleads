import Script from "next/script";
import { GaPageViews } from "@/components/analytics/GaPageViews";

const DEFAULT_GA_MEASUREMENT_ID = "G-N7T74GQ6JB";

export function getGaMeasurementId(): string | null {
  const configured = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (configured === "false" || configured === "0" || configured === "disabled") {
    return null;
  }
  const id = configured || DEFAULT_GA_MEASUREMENT_ID;
  return id.startsWith("G-") ? id : null;
}

export function GoogleAnalytics() {
  const gaId = getGaMeasurementId();
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
      <GaPageViews />
    </>
  );
}
