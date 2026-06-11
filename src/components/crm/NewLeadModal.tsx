"use client";

import { useEffect, useState } from "react";
import type { NewLeadInput } from "@/lib/crm/types";
import { LEAD_SOURCES } from "@/lib/crm/constants";
import { Button } from "@/components/ui/Button";

interface NewLeadModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (input: NewLeadInput) => void;
}

const EMPTY: NewLeadInput = {
  name: "",
  phone: "",
  email: "",
  serviceRequested: "",
  estimatedValue: 0,
  notes: "",
  source: "Website",
};

export function NewLeadModal({ open, onClose, onCreate }: NewLeadModalProps) {
  const [form, setForm] = useState<NewLeadInput>(EMPTY);

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const inputClass =
    "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground placeholder:text-silver-dim focus:outline-none focus:border-forest-mid/50 transition-colors";

  function update(field: keyof NewLeadInput, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onCreate(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg dashboard-card shadow-2xl"
      >
        <div className="px-6 py-4 border-b border-silver/10">
          <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-0.5">
            New Lead
          </p>
          <h2 className="text-lg font-medium text-foreground">Add to pipeline</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
                Name *
              </label>
              <input
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
                Estimated Value
              </label>
              <input
                type="number"
                className={`${inputClass} tabular-nums`}
                value={form.estimatedValue || ""}
                onChange={(e) => update("estimatedValue", Number(e.target.value))}
                placeholder="15000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
                Phone
              </label>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
                Email
              </label>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="john@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
              Service Requested
            </label>
            <input
              className={inputClass}
              value={form.serviceRequested}
              onChange={(e) => update("serviceRequested", e.target.value)}
              placeholder="Kitchen remodel, roof repair..."
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
              Source
            </label>
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
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
              Notes
            </label>
            <textarea
              rows={2}
              className={`${inputClass} resize-none`}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Additional context..."
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-silver/10 flex justify-end gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Create Lead
          </Button>
        </div>
      </form>
    </div>
  );
}
