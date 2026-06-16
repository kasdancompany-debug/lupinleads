"use client";

import { MockupShell, MockupAvatar } from "./MockupShell";

const COLUMNS = [
  {
    name: "New Lead",
    accent: "border-blue-400/30 bg-blue-400/5",
    cards: [
      { name: "Sarah M.", project: "Kitchen reno", value: "$28K" },
      { name: "James K.", project: "Deck build", value: "$12K" },
      { name: "Priya S.", project: "Windows", value: "$18K" },
    ],
  },
  {
    name: "Contacted",
    accent: "border-amber-400/30 bg-amber-400/5",
    cards: [
      { name: "Marcus T.", project: "Roof replace", value: "$42K" },
      { name: "Lisa R.", project: "Siding", value: "$22K" },
    ],
  },
  {
    name: "Appt Booked",
    accent: "border-purple-400/30 bg-purple-400/5",
    cards: [
      { name: "Chris B.", project: "Bathroom", value: "$15K" },
      { name: "Nina P.", project: "Flooring", value: "$9K" },
    ],
  },
  {
    name: "Won",
    accent: "border-forest-glow/40 bg-forest-mid/12",
    cards: [{ name: "David H.", project: "Full reno", value: "$67K" }],
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
      badge="Example"
      compact={compact && !showcase}
      bare={bare}
    >
      <div className="flex items-center justify-between mb-4">
        <p className={`text-silver-dim ${large ? "text-xs" : "text-[10px]"}`}>
          Sample Contractor · Ontario
        </p>
        <span className={`text-forest-glow font-medium ${large ? "text-xs" : "text-[10px]"}`}>
          8 active leads
        </span>
      </div>

      <div className={`grid gap-3 ${large ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"}`}>
        {COLUMNS.map((col) => (
          <div
            key={col.name}
            className={`rounded-xl border p-3 ${col.accent} ${
              large ? "min-h-[200px]" : compact ? "min-h-[120px]" : "min-h-[160px]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className={`uppercase tracking-wider text-silver-dim ${large ? "text-[10px]" : "text-[9px]"}`}>
                {col.name}
              </p>
              <span className={`text-silver-dim tabular-nums ${large ? "text-xs" : "text-[9px]"}`}>
                {col.cards.length}
              </span>
            </div>
            {col.cards.map((card, i) => (
              <div
                key={card.name}
                className={`mb-2 rounded-lg bg-charcoal/90 border border-silver/10 px-3 py-2.5 hover:border-forest-mid/20 transition-colors ${
                  i === 0 && col.name === "New Lead" ? "ring-1 ring-forest-glow/30" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <MockupAvatar name={card.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium text-foreground truncate ${large ? "text-sm" : "text-[11px]"}`}>
                      {card.name}
                    </p>
                    <p className={`text-silver-dim truncate ${large ? "text-xs" : "text-[9px]"}`}>
                      {card.project}
                    </p>
                  </div>
                </div>
                <p className={`text-forest-glow font-semibold tabular-nums ${large ? "text-sm" : "text-[10px]"}`}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {large && (
        <div className="mt-4 pt-4 border-t border-silver/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-silver-dim">Pipeline value</span>
          <span className="text-foreground font-semibold tabular-nums text-sm">$213,000 CAD</span>
        </div>
      )}
    </MockupShell>
  );
}
