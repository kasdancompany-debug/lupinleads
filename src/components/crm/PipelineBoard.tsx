"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { ContractorLead, NewLeadInput, PipelineStage } from "@/lib/crm/types";
import type { LeadTemperature } from "@/lib/ai/types";
import { getCachedAnalysis } from "@/lib/ai/cache";
import { PIPELINE_STAGES } from "@/lib/crm/types";
import {
  createLeadId,
  getLeadsByStage,
  getPipelineValue,
  getWonValue,
  loadLeads,
  resolveDropStage,
  saveLeads,
} from "@/lib/crm/utils";
import {
  createCrmLeadApi,
  deleteCrmLeadApi,
  fetchCrmLeads,
  isRemoteLead,
  updateCrmLeadApi,
} from "@/lib/crm/api";
import {
  fetchPortalCrmLeads,
  portalLeadUpdateFromLead,
  updatePortalCrmLeadApi,
} from "@/lib/crm/portal-api";
import { CrmHeader } from "./CrmHeader";
import { PipelineColumn } from "./PipelineColumn";
import { LeadCardOverlay } from "./LeadCard";
import { LeadModal } from "./LeadModal";
import { NewLeadModal } from "./NewLeadModal";
import { PortalEmptyState } from "@/components/portal/PortalEmptyState";

export function PipelineBoard({
  variant = "agency",
  clientSlug,
}: {
  variant?: "agency" | "portal";
  clientSlug?: string;
  clientName?: string;
}) {
  const isPortal = variant === "portal";
  const [leads, setLeads] = useState<ContractorLead[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<ContractorLead | null>(null);
  const [showNewLead, setShowNewLead] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [useRemote, setUseRemote] = useState(false);
  const [syncError, setSyncError] = useState("");
  const [leadScores, setLeadScores] = useState<Record<string, LeadTemperature>>({});

  function refreshScores(leadList: ContractorLead[]) {
    const scores: Record<string, LeadTemperature> = {};
    for (const l of leadList) {
      const cached = getCachedAnalysis(l.id, l.updatedAt);
      if (cached) scores[l.id] = cached.score;
    }
    setLeadScores(scores);
  }

  useEffect(() => {
    async function init() {
      if (isPortal) {
        const { leads: remoteLeads, source } = await fetchPortalCrmLeads();
        setLeads(remoteLeads);
        setUseRemote(source === "supabase");
        setHydrated(true);
        return;
      }

      const { leads: remoteLeads, source } = await fetchCrmLeads(
        isPortal ? undefined : clientSlug
      );
      if (source === "supabase" && remoteLeads.length > 0) {
        setLeads(remoteLeads);
        setUseRemote(true);
      } else if (source === "supabase") {
        setLeads(remoteLeads);
        setUseRemote(true);
      } else {
        setLeads(loadLeads());
        setUseRemote(false);
      }
      setHydrated(true);
    }
    init();
  }, [isPortal, clientSlug]);

  useEffect(() => {
    if (hydrated) refreshScores(leads);
  }, [leads, hydrated, selectedLead]);

  useEffect(() => {
    if (hydrated && !useRemote) saveLeads(leads);
  }, [leads, hydrated, useRemote]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  const updateLeads = useCallback(
    (updater: (prev: ContractorLead[]) => ContractorLead[]) => {
      setLeads(updater);
    },
    []
  );

  async function syncLead(lead: ContractorLead) {
    if (!useRemote || !isRemoteLead(lead.id)) return;
    if (isPortal) {
      const { lead: saved, error } = await updatePortalCrmLeadApi(
        lead.id,
        portalLeadUpdateFromLead(lead)
      );
      if (saved) {
        updateLeads((prev) => prev.map((l) => (l.id === saved.id ? saved : l)));
        setSyncError("");
      } else if (error) {
        setSyncError(error);
      }
      return;
    }
    await updateCrmLeadApi(lead);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const leadId = active.id as string;
    const newStage = resolveDropStage(over.id as string, leads);
    if (!newStage) return;

    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.stage === newStage) return;

    const updated: ContractorLead = {
      ...lead,
      stage: newStage,
      status: newStage,
      updatedAt: new Date().toISOString(),
    };

    updateLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
    syncLead(updated);
  }

  function handleSaveLead(updated: ContractorLead) {
    updateLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    syncLead(updated);
  }

  async function handleDeleteLead(id: string) {
    if (isPortal) return;
    updateLeads((prev) => prev.filter((l) => l.id !== id));
    if (useRemote && isRemoteLead(id)) {
      await deleteCrmLeadApi(id);
    }
  }

  async function handleCreateLead(input: NewLeadInput) {
    const payload: NewLeadInput = {
      ...input,
      campaign: input.campaign ?? clientSlug ?? null,
    };

    if (useRemote) {
      const created = await createCrmLeadApi(payload);
      if (created) {
        updateLeads((prev) => [created, ...prev]);
        return;
      }
    }

    const now = new Date().toISOString();
    const stage: PipelineStage = "new_lead";
    const newLead: ContractorLead = {
      ...payload,
      id: createLeadId(),
      status: stage,
      stage,
      createdAt: now,
      updatedAt: now,
    };
    updateLeads((prev) => [newLead, ...prev]);
  }

  if (!hydrated) {
    return (
      <div className="px-4 sm:px-6 py-6 sm:py-8 lg:px-10">
        <div className="h-8 w-48 bg-black-surface rounded animate-pulse mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {PIPELINE_STAGES.map((stage) => (
            <div
              key={stage}
              className="w-[300px] h-96 bg-black-surface rounded-lg animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  const activeLeads = leads.filter((l) => l.stage !== "won" && l.stage !== "lost");

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8 lg:px-10 h-full flex flex-col min-h-0">
      <CrmHeader
        totalLeads={activeLeads.length}
        pipelineValue={getPipelineValue(leads)}
        wonValue={getWonValue(leads)}
        onAddLead={isPortal ? undefined : () => setShowNewLead(true)}
        variant={variant}
      />

      {!isPortal && clientSlug ? (
        <p className="text-[12px] text-silver-muted mb-4 -mt-2">
          Showing leads for client{" "}
          <code className="text-forest-glow text-[11px]">{clientSlug}</code>
        </p>
      ) : null}

      {syncError ? (
        <div
          className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13px] text-red-300 flex items-start justify-between gap-3"
          role="alert"
        >
          <span>{syncError}</span>
          <button
            type="button"
            className="shrink-0 text-red-200/80 hover:text-red-100 text-xs uppercase tracking-wide"
            onClick={() => setSyncError("")}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {useRemote && !isPortal && !clientSlug && (
        <p className="text-[11px] text-forest-glow/70 mb-4 -mt-2">
          Synced with Supabase — form submissions appear here automatically
        </p>
      )}

      {isPortal && leads.length === 0 ? (
        <PortalEmptyState
          title="No leads yet"
          description="When someone responds to your Lupin ads, their info lands here. Move them from new lead → estimate → job won as you work the job."
          action={{ label: "Back to overview", href: "/portal" }}
        />
      ) : !isPortal && leads.length === 0 && clientSlug ? (
        <PortalEmptyState
          title="No leads for this client yet"
          description="Add a test lead from the Clients page, connect a Meta form, or wait for the first live submission."
          action={{ label: "Manage clients", href: "/dashboard/clients" }}
          icon="connect"
        />
      ) : (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 sm:pb-6 crm-board-scroll flex-1 -mx-1 px-1">
          {PIPELINE_STAGES.map((stage) => (
            <PipelineColumn
              key={stage}
              stage={stage}
              leads={getLeadsByStage(leads, stage)}
              onLeadClick={setSelectedLead}
              leadScores={leadScores}
              variant={variant}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{ duration: 200, easing: "ease" }}>
          {activeLead ? <LeadCardOverlay lead={activeLead} /> : null}
        </DragOverlay>
      </DndContext>
      )}

      <LeadModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleSaveLead}
        onDelete={handleDeleteLead}
        allowDelete={!isPortal}
        showAiTab={!isPortal}
        variant={variant}
      />

      {!isPortal ? (
        <NewLeadModal
          open={showNewLead}
          onClose={() => setShowNewLead(false)}
          onCreate={handleCreateLead}
          defaultCampaign={clientSlug}
        />
      ) : null}
    </div>
  );
}
