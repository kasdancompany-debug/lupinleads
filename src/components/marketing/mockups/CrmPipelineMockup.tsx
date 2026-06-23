"use client";

import { MockupShell, MockupAvatar } from "./MockupShell";
import { MockupNode, PipelineGrowthRail } from "./MockupBrand";

const COLUMNS = [
  {
    name: "New Lead",
    theme: "new" as const,
    cards: [
      { name: "Sarah M.", project: "Kitchen reno", value: "$28K", status: "hot" as const },
      { name: "James K.", project: "Deck build", value: "$12K", status: "new" as const },
    ],
  },
  {
    name: "Contacted",
    theme: "contact" as const,
    cards: [
      { name: "Marcus T.", project: "Roof replace", value: "$42K", status: "warm" as const },
      { name: "Lisa R.", project: "Siding", value: "$22K", status: "warm" as const },
    ],
  },
  {
    name: "Appt Booked",
    theme: "appt" as const,
    cards: [
      { name: "Chris B.", project: "Bathroom", value: "$15K", status: "neutral" as const },
      { name: "Nina P.", project: "Flooring", value: "$9K", status: "neutral" as const },
    ],
  },
  {
    name: "Won",
    theme: "won" as const,
    cards: [{ name: "David H.", project: "Full reno", value: "$67K", status: "won" as const }],
  },
];

export function CrmPipelineMockup({
  compact = false,
  showcase = false,
  bare = false,
}: {
  compact?: boolean;
  showcase?: boolean;
  bare?: boolean;
}) {
  const large = showcase || !compact;

  return (
    <MockupShell
      title="LUPIN CRM · Pipeline"
      badge="Sample"
      compact={compact && !showcase}
      bare={bare}
    >
      <div className="flex items-center justify-between mb-3">
        <p className={`text-silver-muted ${large ? "text-xs" : "text-[10px]"}`}>
          Sample Contractor · Ontario
        </p>
        <span className={`text-sage-green font-medium ${large ? "text-xs" : "text-[10px]"}`}>
          7 on path
        </span>
      </div>

      <div className="mockup-pipeline">
        <PipelineGrowthRail columns={COLUMNS.length} />
        <div className={`grid gap-2.5 ${large ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"}`}>
          {COLUMNS.map((col) => (
            <div
              key={col.name}
              className={`mockup-pipeline-col mockup-pipeline-col--${col.theme} ${
                large ? "min-h-[11rem]" : compact ? "min-h-[7rem]" : "min-h-[9rem]"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <p
                  className={`uppercase tracking-wider text-silver-dim flex items-center gap-1.5 ${
                    large ? "text-[10px]" : "text-[9px]"
                  }`}
                >
                  <MockupNode
                    variant={
                      col.theme === "won" ? "won" : col.theme === "new" ? "hot" : "warm"
                    }
                  />
                  {col.name}
                </p>
                <span className={`text-silver-dim tabular-nums ${large ? "text-xs" : "text-[9px]"}`}>
                  {col.cards.length}
                </span>
              </div>
              {col.cards.map((card, i) => (
                <div
                  key={card.name}
                  className={`mockup-card !p-2.5 mb-2 last:mb-0 ${
                    i === 0 && col.theme === "new" ? "mockup-card--active" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MockupAvatar name={card.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-medium text-foreground truncate ${
                          large ? "text-sm" : "text-[11px]"
                        }`}
                      >
                        {card.name}
                      </p>
                      <p className={`text-silver-dim truncate ${large ? "text-xs" : "text-[9px]"}`}>
                        {card.project}
                      </p>
                    </div>
                    <MockupNode variant={card.status} />
                  </div>
                  <p
                    className={`text-forest-green-bright font-semibold tabular-nums pl-10 ${
                      large ? "text-sm" : "text-[10px]"
                    }`}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {large && (
        <div className="mt-4 pt-4 border-t border-silver/10 flex items-center justify-between gap-3 text-xs">
          <span className="text-silver-dim">Pipeline value</span>
          <span className="text-foreground font-semibold tabular-nums text-sm">$195,000 CAD</span>
        </div>
      )}
    </MockupShell>
  );
}
