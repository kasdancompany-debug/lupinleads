"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CaptureForm, FormField } from "@/lib/forms/types";
import { DEFAULT_FORM_FIELDS } from "@/lib/forms/defaults";
import { FormBuilder } from "./FormBuilder";
import { EmbedCodePanel } from "./EmbedCodePanel";
import { CaptureFormRenderer } from "./CaptureFormRenderer";
import { Button } from "@/components/ui/Button";

interface FormEditorProps {
  form?: CaptureForm;
}

export function FormEditor({ form }: FormEditorProps) {
  const router = useRouter();
  const isNew = !form;

  const [name, setName] = useState(form?.name ?? "");
  const [description, setDescription] = useState(form?.description ?? "");
  const [fields, setFields] = useState<FormField[]>(
    form?.fields ?? DEFAULT_FORM_FIELDS
  );
  const [defaultCampaign, setDefaultCampaign] = useState(form?.defaultCampaign ?? "");
  const [notifyEmail, setNotifyEmail] = useState(form?.notifyEmail ?? "");
  const [successMessage, setSuccessMessage] = useState(
    form?.successMessage ?? "Thank you! We'll be in touch shortly."
  );
  const [isActive, setIsActive] = useState(form?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"builder" | "preview" | "embed">("builder");

  const inputClass =
    "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground focus:outline-none focus:border-forest-mid/50";

  const previewForm: CaptureForm = {
    id: form?.id ?? "preview",
    slug: form?.slug ?? "preview",
    name: name || "Preview",
    description: description || null,
    fields,
    defaultCampaign: defaultCampaign || null,
    notifyEmail: notifyEmail || null,
    successMessage,
    isActive: true,
    createdAt: form?.createdAt ?? new Date().toISOString(),
    updatedAt: form?.updatedAt ?? new Date().toISOString(),
  };

  async function handleSave() {
    if (!name.trim()) {
      setError("Form name is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        fields,
        defaultCampaign: defaultCampaign.trim() || null,
        notifyEmail: notifyEmail.trim() || null,
        successMessage: successMessage.trim(),
        isActive,
      };

      const res = await fetch(isNew ? "/api/forms" : `/api/forms/${form!.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      router.push(`/dashboard/forms/${data.form.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form || !confirm("Delete this form and all submissions?")) return;

    const res = await fetch(`/api/forms/${form.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/dashboard/forms");
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
            {isNew ? "New Form" : "Edit Form"}
          </p>
          <h1 className="text-xl font-medium text-foreground">
            {isNew ? "Create Capture Form" : name}
          </h1>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button size="sm" loading={saving} onClick={handleSave}>
            {isNew ? "Create" : "Save"}
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-red-400/80 text-sm mb-4">{error}</p>
      )}

      <div className="flex gap-2 mb-6">
        {(["builder", "preview", "embed"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            disabled={t === "embed" && isNew}
            className={`px-3 py-1.5 rounded-md text-[12px] capitalize transition-colors disabled:opacity-40 ${
              tab === t
                ? "bg-white/[0.08] text-foreground"
                : "text-silver-muted hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "builder" && (
        <div className="space-y-6">
          <div className="dashboard-card p-5 space-y-4">
            <h2 className="text-sm font-medium text-foreground">Form Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-silver-dim mb-1">Form Name *</label>
                <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-silver-dim mb-1">Description</label>
                <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <label className="block text-[11px] text-silver-dim mb-1">Default Campaign</label>
                <input
                  className={inputClass}
                  value={defaultCampaign}
                  onChange={(e) => setDefaultCampaign(e.target.value)}
                  placeholder="organic"
                />
              </div>
              <div>
                <label className="block text-[11px] text-silver-dim mb-1">Notify Email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="admin@agency.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-silver-dim mb-1">Success Message</label>
                <input className={inputClass} value={successMessage} onChange={(e) => setSuccessMessage(e.target.value)} />
              </div>
              {!isNew && (
                <label className="flex items-center gap-2 text-[13px] text-silver-muted sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  Form is active (accepting submissions)
                </label>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-foreground mb-3">Fields</h2>
            <FormBuilder fields={fields} onChange={setFields} />
          </div>
        </div>
      )}

      {tab === "preview" && (
        <div className="dashboard-card p-6 max-w-md mx-auto">
          <h2 className="text-lg font-medium text-foreground mb-4">{previewForm.name}</h2>
          <CaptureFormRenderer form={previewForm} tracking={{}} compact previewMode />
        </div>
      )}

      {tab === "embed" && form && (
        <EmbedCodePanel slug={form.slug} defaultCampaign={form.defaultCampaign} />
      )}
    </div>
  );
}
