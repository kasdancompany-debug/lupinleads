import type { LeadTemperature } from "@/lib/ai/types";
import { SCORE_CONFIG } from "@/lib/ai/constants";

interface LeadScoreBadgeProps {
  score: LeadTemperature;
  size?: "sm" | "md";
}

export function LeadScoreBadge({ score, size = "sm" }: LeadScoreBadgeProps) {
  const config = SCORE_CONFIG[score];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded border font-medium
        ${config.accent} ${config.color}
        ${size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-[12px] px-2 py-1"}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
