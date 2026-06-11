"use client";

import { useEffect, useState } from "react";
import type { ContractorLead, PipelineStage } from "@/lib/crm/types";
import { PIPELINE_STAGES } from "@/lib/crm/types";
import { STAGE_CONFIG, LEAD_SOURCES } from "@/lib/crm/constants";
import { formatCurrency } from "@/lib/dashboard/format";
import { Button } from "@/components/ui/Button";
import { AiFollowUpPanel } from "@/components/ai/AiFollowUpPanel";

interface LeadModalProps {
  lead: ContractorLead | null;
  onClose: () => void;
  onSave: (lead: ContractorLead) => void;
  onDelete: (id: string) => void;
}

type Tab = "details" | "ai";

export function LeadModal({ lead, onClose, onSave, onDelete }: LeadModalProps) {
  const [form, setForm] = useState<ContractorLead | null>(null);
  const [tab, setTab] = useState<Tab>("details");

  useEffect(() => {
    setForm(lead);
    setTab("details");
  }, [lead]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (lead) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lead, onClose]);

  if (!lead || !form) return null;

  function update(field: keyof ContractorLead, value: string | number) {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  function handleStageChange(stage: PipelineStage) {
    setForm((prev) =>
      prev ? { ...prev, stage, status: stage, updatedAt: new Date().toISOString() } : prev
    );
  }

  function handleSave() {
    if (!form) return;
    onSave({ ...form, updatedAt: new Date().toISOString() });
    onClose();
  }

  const inputClass =
    "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground placeholder:text-silver-dim focus:outline-none focus:border-forest-mid/50 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative w-full max-w-2xl dashboard-card shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="shrink-0 bg-black-surface border-b border-silver/10 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-0.5">
                Lead Details
              </p>
              <h2 className="text-lg font-medium text-foreground">{form.name}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-silver-dim hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5L15 15M15 5L5 15" />
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            {(["details", "ai"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-md text-[12px] transition-colors ${
                  tab === t
                    ? "bg-white/[0.08] text-foreground"
                    : "text-silver-muted hover:text-foreground"
                }`}
              >
                {t === "details" ? "Details" : "AI Assistant"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {tab === "details" ? (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name">
                  <input
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </Field>
                <Field label="Estimated Value">
                  <input
                    type="number"
                    className={`${inputClass} tabular-nums`}
                    value={form.estimatedValue}
                    onChange={(e) => update("estimatedValue", Number(e.target.value))}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Phone">
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Service Requested">
                <input
                  className={inputClass}
                  value={form.serviceRequested}
                  onChange={(e) => update("serviceRequested", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Source">
                  <select
                    className={inputClass}
                    value={form.source}
                    onChange={(e) => update("source", e.target.value)}
                  >
                    {LEAD_SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select
                    className={inputClass}
                    value={form.status}
                    onChange={(e) => handleStageChange(e.target.value as PipelineStage)}
                  >
                    {PIPELINE_STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {STAGE_CONFIG[stage].label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Notes">
                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </Field>

              <div className="flex items-center justify-between pt-2 text-[11px] text-silver-dim">
                <span>Pipeline value: {formatCurrency(form.estimatedValue)}</span>
                <span>ID: {form.id}</span>
              </div>
            </div>
          ) : (
            <AiFollowUpPanel lead={form} compact />
          )}
        </div>

        {tab === "details" && (
          <div className="shrink-0 bg-black-surface border-t border-silver/10 px-6 py-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onDelete(form.id);
                onClose();
              }}
              className="text-[13px] text-red-400/70 hover:text-red-400 transition-colors"
            >
              Delete lead
            </button>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
