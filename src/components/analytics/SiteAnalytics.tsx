import Script from "next/script";

function getPlausibleDomain(): string | null {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  return domain || null;
}

function getGaMeasurementId(): string | null {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id && id.startsWith("G-") ? id : null;
}

/**
 * Loads privacy-friendly analytics when env vars are set.
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN and/or NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel.
 */
export function SiteAnalytics() {
  const plausibleDomain = getPlausibleDomain();
  const gaId = getGaMeasurementId();

  if (!plausibleDomain && !gaId) {
    return null;
  }

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}

      {gaId ? (
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
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
