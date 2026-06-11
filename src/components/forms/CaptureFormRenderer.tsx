"use client";

import { FormEvent, useState } from "react";
import type { CaptureForm, CampaignTracking } from "@/lib/forms/types";
import { Button } from "@/components/ui/Button";

interface CaptureFormRendererProps {
  form: CaptureForm;
  tracking: CampaignTracking;
  compact?: boolean;
  previewMode?: boolean;
}

export function CaptureFormRenderer({
  form,
  tracking,
  compact = false,
  previewMode = false,
}: CaptureFormRendererProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full bg-black border border-silver/15 rounded-md px-3 py-2.5 text-[13px] text-foreground placeholder:text-silver-dim focus:outline-none focus:border-forest-mid/50 transition-colors";

  function update(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (previewMode) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/forms/submit/${form.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: values, tracking }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={`text-center ${compact ? "py-8" : "py-12"}`}>
        <div className="w-12 h-12 rounded-full border border-forest-glow/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-forest-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12L10 17L20 7" />
          </svg>
        </div>
        <p className="text-foreground font-medium mb-1">Submitted</p>
        <p className="text-silver-muted text-sm">{form.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!compact && form.description && (
        <p className="text-silver-muted text-sm mb-2">{form.description}</p>
      )}

      {form.fields.map((field) => (
        <div key={field.id}>
          <label className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
            {field.label}
            {field.required && <span className="text-forest-glow ml-0.5">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              required={field.required}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder={field.placeholder}
              value={values[field.id] ?? ""}
              onChange={(e) => update(field.id, e.target.value)}
            />
          ) : field.type === "select" ? (
            <select
              required={field.required}
              className={inputClass}
              value={values[field.id] ?? ""}
              onChange={(e) => update(field.id, e.target.value)}
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type === "number" ? "number" : field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text"}
              required={field.required}
              className={inputClass}
              placeholder={field.placeholder}
              value={values[field.id] ?? ""}
              onChange={(e) => update(field.id, e.target.value)}
            />
          )}
        </div>
      ))}

      {tracking.campaign && (
        <p className="text-[10px] text-silver-dim">
          Campaign: {tracking.campaign}
        </p>
      )}

      {error && <p className="text-red-400/80 text-sm">{error}</p>}

      <Button type="submit" className="w-full" loading={loading}>
        Submit
      </Button>

      <p className="text-[10px] text-silver-dim text-center">
        Powered by LUPIN LEADS
      </p>
    </form>
  );
}
