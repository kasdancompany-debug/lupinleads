import { FAQ_ITEMS, SITE } from "@/lib/constants";
import { SITE_URL } from "@/lib/site-metadata";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/lupin-mark.png`,
        email: SITE.email,
        description: SITE.description,
        areaServed: {
          "@type": "Country",
          name: "Canada",
        },
        knowsAbout: [
          "Contractor lead generation",
          "Facebook advertising",
          "Instagram advertising",
          "Home services marketing",
        ],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: SITE_URL,
        description: SITE.description,
        inLanguage: "en-CA",
      }}
    />
  );
}

export function FaqJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}
