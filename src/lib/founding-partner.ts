import { FOUNDING_PARTNER, FOUNDING_PARTNER_SPOTS, type FoundingPartnerSpot } from "@/lib/constants";

export type { FoundingPartnerSpot };

export function getFoundingPartnerAvailability(
  spots: readonly FoundingPartnerSpot[] = FOUNDING_PARTNER_SPOTS
) {
  const openSpots = spots.filter((spot) => spot.status === "open");
  const claimedSpots = spots.filter((spot) => spot.status === "claimed");
  const slotsRemaining = openSpots.length;
  const slotsTotal = spots.length;

  let slotsLabel: string;
  if (slotsRemaining === 0) {
    slotsLabel = "Founding partner spots are full";
  } else if (slotsRemaining === 1) {
    slotsLabel = "1 founding partner spot left";
  } else {
    slotsLabel = `${slotsRemaining} founding partner spots available`;
  }

  return {
    slotsRemaining,
    slotsTotal,
    slotsLabel,
    introPrice: FOUNDING_PARTNER.introPrice,
    regularPrice: FOUNDING_PARTNER.regularPrice,
    openSpots,
    claimedSpots,
    allSpots: spots,
    hasOpenSpots: slotsRemaining > 0,
  };
}
