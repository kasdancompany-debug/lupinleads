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
import { CrmHeader } from "./CrmHeader";
import { PipelineColumn } from "./PipelineColumn";
import { LeadCardOverlay } from "./LeadCard";
import { LeadModal } from "./LeadModal";
import { NewLeadModal } from "./NewLeadModal";

export function PipelineBoard() {
  const [leads, setLeads] = useState<ContractorLead[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<ContractorLead | null>(null);
  const [showNewLead, setShowNewLead] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [useRemote, setUseRemote] = useState(false);
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
      const { leads: remoteLeads, source } = await fetchCrmLeads();
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
  }, []);

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
    updateLeads((prev) => prev.filter((l) => l.id !== id));
    if (useRemote && isRemoteLead(id)) {
      await deleteCrmLeadApi(id);
    }
  }

  async function handleCreateLead(input: NewLeadInput) {
    if (useRemote) {
      const created = await createCrmLeadApi(input);
      if (created) {
        updateLeads((prev) => [created, ...prev]);
        return;
      }
    }

    const now = new Date().toISOString();
    const stage: PipelineStage = "new_lead";
    const newLead: ContractorLead = {
      ...input,
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
      <div className="px-6 py-8 lg:px-10">
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
    <div className="px-6 py-8 lg:px-10 h-full flex flex-col">
      <CrmHeader
        totalLeads={activeLeads.length}
        pipelineValue={getPipelineValue(leads)}
        wonValue={getWonValue(leads)}
        onAddLead={() => setShowNewLead(true)}
      />

      {useRemote && (
        <p className="text-[11px] text-forest-glow/70 mb-4 -mt-2">
          Synced with Supabase — form submissions appear here automatically
        </p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-6 crm-board-scroll flex-1">
          {PIPELINE_STAGES.map((stage) => (
            <PipelineColumn
              key={stage}
              stage={stage}
              leads={getLeadsByStage(leads, stage)}
              onLeadClick={setSelectedLead}
              leadScores={leadScores}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{ duration: 200, easing: "ease" }}>
          {activeLead ? <LeadCardOverlay lead={activeLead} /> : null}
        </DragOverlay>
      </DndContext>

      <LeadModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleSaveLead}
        onDelete={handleDeleteLead}
      />

      <NewLeadModal
        open={showNewLead}
        onClose={() => setShowNewLead(false)}
        onCreate={handleCreateLead}
      />
    </div>
  );
}
