"use client";

import { useState } from "react";
import type { ClientBranding } from "@/lib/reports/types";
import { saveBranding } from "@/lib/reports/branding";
import { Button } from "@/components/ui/Button";

interface BrandingPanelProps {
  branding: ClientBranding;
  onSave: (branding: ClientBranding) => void;
}

export function BrandingPanel({ branding, onSave }: BrandingPanelProps) {
  const [form, setForm] = useState<ClientBranding>(branding);
  const [saved, setSaved] = useState(false);

  const inputClass =
    "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground focus:outline-none focus:border-forest-mid/50";

  function update(field: keyof ClientBranding, value: string) {
    setForm((prev) => ({ ...prev, [field]: value || null }));
    setSaved(false);
  }

  function handleSave() {
    saveBranding(form);
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="dashboard-card p-5">
      <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-1">
        Client Branding
      </p>
      <p className="text-sm text-silver-muted mb-4">
        Customize how reports appear for this client
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-[11px] text-silver-dim mb-1">Client Name</label>
          <input
            className={inputClass}
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[11px] text-silver-dim mb-1">Agency Name</label>
          <input
            className={inputClass}
            value={form.agencyName}
            onChange={(e) => update("agencyName", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-silver-dim mb-1">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                className="w-10 h-9 rounded border border-silver/15 cursor-pointer"
              />
              <input
                className={`${inputClass} flex-1`}
                value={form.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-silver-dim mb-1">Accent Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
                className="w-10 h-9 rounded border border-silver/15 cursor-pointer"
              />
              <input
                className={`${inputClass} flex-1`}
                value={form.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-silver-dim mb-1">Logo URL (optional)</label>
          <input
            className={inputClass}
            value={form.logoUrl ?? ""}
            onChange={(e) => update("logoUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-[11px] text-silver-dim mb-1">Report Footer</label>
          <textarea
            rows={2}
            className={`${inputClass} resize-none`}
            value={form.reportFooter}
            onChange={(e) => update("reportFooter", e.target.value)}
          />
        </div>

        <div
          className="rounded-md p-4 border border-silver/10"
          style={{ borderLeftColor: form.primaryColor, borderLeftWidth: 3 }}
        >
          <p className="text-[10px] uppercase tracking-wider text-silver-dim mb-2">
            Preview
          </p>
          <p className="text-sm font-medium" style={{ color: form.primaryColor }}>
            {form.clientName}
          </p>
          <p className="text-[11px] text-silver-dim mt-1">{form.agencyName}</p>
        </div>

        <Button size="sm" onClick={handleSave}>
          {saved ? "Saved!" : "Save Branding"}
        </Button>
      </div>
    </div>
  );
}
