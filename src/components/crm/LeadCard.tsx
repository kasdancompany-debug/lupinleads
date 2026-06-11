"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ContractorLead } from "@/lib/crm/types";
import type { LeadTemperature } from "@/lib/ai/types";
import { STAGE_CONFIG } from "@/lib/crm/constants";
import { formatCurrency } from "@/lib/dashboard/format";
import { LeadScoreBadge } from "@/components/ai/LeadScoreBadge";

interface LeadCardProps {
  lead: ContractorLead;
  onClick: (lead: ContractorLead) => void;
  isDragging?: boolean;
  score?: LeadTemperature;
}

export function LeadCard({ lead, onClick, isDragging = false, score }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: lead.id, data: { type: "lead", lead } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragging = isDragging || isSortableDragging;
  const stageStyle = STAGE_CONFIG[lead.status];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        dashboard-card p-4 cursor-grab active:cursor-grabbing
        transition-shadow duration-200 group
        ${dragging ? "opacity-50 shadow-lg ring-1 ring-forest-glow/30" : "hover:border-silver/20"}
      `}
      {...attributes}
      {...listeners}
    >
      <button
        type="button"
        className="w-full text-left"
        onClick={(e) => {
          e.stopPropagation();
          onClick(lead);
        }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-[13px] font-medium text-foreground leading-snug">
            {lead.name}
          </h3>
          <span className="text-[12px] font-medium tabular-nums text-forest-glow shrink-0">
            {formatCurrency(lead.estimatedValue)}
          </span>
        </div>

        {score && (
          <div className="mb-2">
            <LeadScoreBadge score={score} />
          </div>
        )}

        <p className="text-[12px] text-silver-muted mb-3 line-clamp-2">
          {lead.serviceRequested}
        </p>

        <div className="space-y-1.5 mb-3">
          <p className="text-[11px] text-silver-dim flex items-center gap-2">
            <PhoneIcon />
            <span className="truncate">{lead.phone}</span>
          </p>
          <p className="text-[11px] text-silver-dim flex items-center gap-2">
            <EmailIcon />
            <span className="truncate">{lead.email}</span>
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-silver/8">
          <span className="text-[10px] text-silver-dim">{lead.source}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded border ${stageStyle.accent} ${stageStyle.color}`}
          >
            {STAGE_CONFIG[lead.status].label}
          </span>
        </div>
      </button>
    </div>
  );
}

export function LeadCardOverlay({ lead }: { lead: ContractorLead }) {
  const stageStyle = STAGE_CONFIG[lead.status];

  return (
    <div className="dashboard-card p-4 w-[280px] shadow-2xl ring-1 ring-forest-glow/40 rotate-1">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-[13px] font-medium text-foreground">{lead.name}</h3>
        <span className="text-[12px] font-medium tabular-nums text-forest-glow">
          {formatCurrency(lead.estimatedValue)}
        </span>
      </div>
      <p className="text-[12px] text-silver-muted mb-3">{lead.serviceRequested}</p>
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded border ${stageStyle.accent} ${stageStyle.color}`}
      >
        {STAGE_CONFIG[lead.status].label}
      </span>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2.5 1.5H4.5L5.5 4.5L4 5.5C4.5 7 6 8.5 7.5 9L8.5 7.5L11.5 8.5V10.5C11.5 11 11 11.5 10.5 11.5C5.5 11.5 1.5 7.5 1.5 2.5C1.5 2 2 1.5 2.5 1.5Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="1" y="2.5" width="10" height="7" rx="0.5" />
      <path d="M1 3.5L6 7L11 3.5" />
    </svg>
  );
}
