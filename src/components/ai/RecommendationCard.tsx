import type { RecommendedAction } from "@/lib/ai/types";
import { RECOMMENDATION_CONFIG } from "@/lib/ai/constants";

interface RecommendationCardProps {
  recommendation: RecommendedAction;
  reason: string;
}

export function RecommendationCard({ recommendation, reason }: RecommendationCardProps) {
  const config = RECOMMENDATION_CONFIG[recommendation];

  return (
    <div className="rounded-md border border-forest-mid/30 bg-forest-mid/10 p-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-md bg-forest-mid/20 border border-forest-mid/30 flex items-center justify-center shrink-0">
          <RecommendationIcon type={config.icon} />
        </div>
        <div>
          <p className="text-[13px] font-medium text-forest-glow">{config.label}</p>
          <p className="text-[12px] text-silver-muted mt-0.5">{reason}</p>
        </div>
      </div>
    </div>
  );
}

function RecommendationIcon({ type }: { type: string }) {
  const className = "w-4 h-4 text-forest-glow";

  if (type === "phone") {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 2.5H5.5L6.5 6L5 7C5.8 8.8 7.2 10.2 9 11L10 9.5L13.5 10.5V13C13.5 13.5 13 14 12.5 14C6.5 14 2 9.5 2 3.5C2 3 2.5 2.5 3 2.5Z" />
      </svg>
    );
  }
  if (type === "document") {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 2H9L12 5V13C12 13.5 11.5 14 11 14H4C3.5 14 3 13.5 3 13V3C3 2.5 3.5 2 4 2Z" />
        <path d="M9 2V5H12" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="12" height="11" rx="1" />
      <path d="M2 6H14M5 1V4M11 1V4" />
    </svg>
  );
}
