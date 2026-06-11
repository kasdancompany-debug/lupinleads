import type { CampaignTracking } from "./types";

export function parseCampaignTracking(searchParams: URLSearchParams): CampaignTracking {
  return {
    campaign: searchParams.get("campaign") ?? undefined,
    utmSource: searchParams.get("utm_source") ?? undefined,
    utmMedium: searchParams.get("utm_medium") ?? undefined,
    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    utmContent: searchParams.get("utm_content") ?? undefined,
    utmTerm: searchParams.get("utm_term") ?? undefined,
  };
}

export function getReferrer(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.referrer || undefined;
}

export function buildTrackingPayload(
  searchParams: URLSearchParams
): CampaignTracking {
  return {
    ...parseCampaignTracking(searchParams),
    referrer: getReferrer(),
  };
}
