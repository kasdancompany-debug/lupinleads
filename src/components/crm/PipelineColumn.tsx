"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ContractorLead, PipelineStage } from "@/lib/crm/types";
import type { LeadTemperature } from "@/lib/ai/types";
import { STAGE_CONFIG } from "@/lib/crm/constants";
import { PORTAL_STAGE_LABELS } from "@/lib/portal/constants";
import { formatCurrency } from "@/lib/dashboard/format";
import { LeadCard } from "./LeadCard";

interface PipelineColumnProps {
  stage: PipelineStage;
  leads: ContractorLead[];
  onLeadClick: (lead: ContractorLead) => void;
  leadScores?: Record<string, LeadTemperature>;
  variant?: "agency" | "portal";
}

export function PipelineColumn({
  stage,
  leads,
  onLeadClick,
  leadScores,
  variant = "agency",
}: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const config = STAGE_CONFIG[stage];
  const label = variant === "portal" ? PORTAL_STAGE_LABELS[stage] : config.label;
  const columnValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0);

  return (
    <div
      className={`
        flex flex-col w-[min(85vw,300px)] shrink-0 rounded-lg
        bg-black-elevated/50 border transition-colors duration-200
        ${isOver ? "border-forest-glow/40 bg-forest-mid/5" : "border-silver/8"}
      `}
    >
      <div className="px-4 py-3 border-b border-silver/8">
        <div className="flex items-center justify-between mb-1">
          <h2 className={`text-[12px] font-medium uppercase tracking-wider ${config.color}`}>
            {label}
          </h2>
          <span className="text-[11px] text-silver-dim tabular-nums bg-black/40 px-1.5 py-0.5 rounded">
            {leads.length}
          </span>
        </div>
        {leads.length > 0 && (
          <p className="text-[11px] text-silver-dim tabular-nums">
            {formatCurrency(columnValue)}
          </p>
        )}
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 p-3 space-y-3 min-h-[200px] max-h-[calc(100vh-280px)] overflow-y-auto crm-column-scroll"
      >
        <SortableContext
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={onLeadClick}
              score={leadScores?.[lead.id]}
            />
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <div
            className={`
              flex items-center justify-center h-24 rounded-md border border-dashed
              text-[11px] text-silver-dim
              ${isOver ? "border-forest-glow/30 text-forest-glow/60" : "border-silver/10"}
            `}
          >
            Drop leads here
          </div>
        )}
      </div>
    </div>
  );
}
