"use client";

import { useCallback, useEffect, useState } from "react";
import type { ContractorLead } from "@/lib/crm/types";
import type { FollowUpAnalysis } from "@/lib/ai/types";
import { fetchCrmLeads } from "@/lib/crm/api";
import { loadLeads } from "@/lib/crm/utils";
import { getCachedAnalysis } from "@/lib/ai/cache";
import { SCORE_CONFIG } from "@/lib/ai/constants";
import { RECOMMENDATION_CONFIG } from "@/lib/ai/constants";
import { LeadScoreBadge } from "./LeadScoreBadge";
import { AiFollowUpPanel } from "./AiFollowUpPanel";
import { formatCurrency } from "@/lib/dashboard/format";

const SCORE_ORDER = { hot: 0, warm: 1, cold: 2 };

export function AiAssistantDashboard() {
  const [leads, setLeads] = useState<ContractorLead[]>([]);
  const [selected, setSelected] = useState<ContractorLead | null>(null);
  const [scores, setScores] = useState<Record<string, FollowUpAnalysis>>({});
  const [loading, setLoading] = useState(true);
  const [batchLoading, setBatchLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const { leads: remote, source } = await fetchCrmLeads();
      const data = source === "supabase" ? remote : loadLeads();
      setLeads(data.filter((l) => l.stage !== "won" && l.stage !== "lost"));

      const cached: Record<string, FollowUpAnalysis> = {};
      for (const lead of data) {
        const a = getCachedAnalysis(lead.id, lead.updatedAt);
        if (a) cached[lead.id] = a;
      }
      setScores(cached);

      if (data.length > 0) setSelected(data[0]);
      setLoading(false);
    }
    init();
  }, []);

  const handleAnalysis = useCallback((leadId: string, analysis: FollowUpAnalysis) => {
    setScores((prev) => ({ ...prev, [leadId]: analysis }));
  }, []);

  async function analyzeAll() {
    setBatchLoading(true);
    const active = leads.filter((l) => !scores[l.id]);

    for (const lead of active.slice(0, 10)) {
      try {
        const res = await fetch("/api/ai/follow-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead }),
        });
        const data = await res.json();
        if (res.ok) {
          handleAnalysis(lead.id, data.analysis);
        }
      } catch {
        // continue batch
      }
    }
    setBatchLoading(false);
  }

  const sortedLeads = [...leads].sort((a, b) => {
    const scoreA = scores[a.id]?.score ?? "warm";
    const scoreB = scores[b.id]?.score ?? "warm";
    return SCORE_ORDER[scoreA] - SCORE_ORDER[scoreB];
  });

  const hotCount = Object.values(scores).filter((s) => s.score === "hot").length;

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-96 dashboard-card animate-pulse" />
        <div className="lg:col-span-2 h-96 dashboard-card animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
            AI Assistant
          </p>
          <h1 className="text-xl font-medium text-foreground">Lead Follow-Up</h1>
        </div>
        <div className="flex items-center gap-3">
          {hotCount > 0 && (
            <span className="text-[12px] text-orange-300/90 tabular-nums">
              {hotCount} hot lead{hotCount !== 1 ? "s" : ""}
            </span>
          )}
          <button
            type="button"
            onClick={analyzeAll}
            disabled={batchLoading}
            className="px-4 py-2 rounded-md text-[13px] font-medium bg-forest-mid text-foreground hover:bg-forest-light border border-forest-light/30 transition-colors disabled:opacity-50"
          >
            {batchLoading ? "Analyzing..." : "Analyze All"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-silver-dim px-1 mb-2">
            Priority Queue
          </p>
          {sortedLeads.length === 0 ? (
            <p className="text-silver-dim text-sm p-4">No active leads in pipeline</p>
          ) : (
            sortedLeads.map((lead) => {
              const analysis = scores[lead.id];
              const isSelected = selected?.id === lead.id;

              return (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => setSelected(lead)}
                  className={`w-full text-left dashboard-card p-4 transition-colors ${
                    isSelected ? "border-forest-mid/40 bg-forest-mid/5" : "hover:border-silver/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-[13px] font-medium text-foreground">{lead.name}</p>
                    {analysis ? (
                      <LeadScoreBadge score={analysis.score} />
                    ) : (
                      <span className="text-[10px] text-silver-dim">Not scored</span>
                    )}
                  </div>
                  <p className="text-[12px] text-silver-muted truncate">
                    {lead.serviceRequested}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-forest-glow tabular-nums">
                      {formatCurrency(lead.estimatedValue)}
                    </span>
                    {analysis && (
                      <span className="text-[10px] text-silver-dim">
                        {RECOMMENDATION_CONFIG[analysis.recommendation].label}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}

          <div className="dashboard-card p-4 mt-4">
            <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-3">
              Score Legend
            </p>
            <div className="space-y-2">
              {(Object.keys(SCORE_CONFIG) as Array<keyof typeof SCORE_CONFIG>).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <LeadScoreBadge score={key} />
                  <span className="text-[11px] text-silver-dim">
                    {key === "hot" && "High intent — act now"}
                    {key === "warm" && "Interested — nurture"}
                    {key === "cold" && "Low priority — re-engage later"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <AiFollowUpPanel
              lead={selected}
              onAnalysis={(a) => handleAnalysis(selected.id, a)}
            />
          ) : (
            <div className="dashboard-card p-12 text-center text-silver-dim text-sm">
              Select a lead to generate follow-up recommendations
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
