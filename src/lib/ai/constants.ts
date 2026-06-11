import type { LeadTemperature, RecommendedAction } from "./types";

export const SCORE_CONFIG: Record<
  LeadTemperature,
  { label: string; color: string; accent: string; dot: string }
> = {
  hot: {
    label: "Hot",
    color: "text-orange-300",
    accent: "border-orange-400/30 bg-orange-400/10",
    dot: "bg-orange-400",
  },
  warm: {
    label: "Warm",
    color: "text-amber-300",
    accent: "border-amber-400/30 bg-amber-400/10",
    dot: "bg-amber-400",
  },
  cold: {
    label: "Cold",
    color: "text-blue-300/90",
    accent: "border-blue-400/30 bg-blue-400/10",
    dot: "bg-blue-400/70",
  },
};

export const RECOMMENDATION_CONFIG: Record<
  RecommendedAction,
  { label: string; description: string; icon: string }
> = {
  call_immediately: {
    label: "Call immediately",
    description: "High intent — reach out now while interest is peak",
    icon: "phone",
  },
  follow_up_tomorrow: {
    label: "Follow up tomorrow",
    description: "Nurture the lead with a timely check-in",
    icon: "calendar",
  },
  send_estimate: {
    label: "Send estimate",
    description: "Ready for pricing — deliver a detailed proposal",
    icon: "document",
  },
};
