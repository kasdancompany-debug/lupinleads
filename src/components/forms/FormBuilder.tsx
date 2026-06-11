"use client";

import type { FormField, FormFieldType, CrmFieldMap } from "@/lib/forms/types";
import { FIELD_TYPES } from "@/lib/forms/types";
import { createFieldId } from "@/lib/forms/defaults";
import { Button } from "@/components/ui/Button";

interface FormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

const CRM_MAPS: { value: CrmFieldMap; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "serviceRequested", label: "Service" },
  { value: "notes", label: "Notes" },
  { value: "estimatedValue", label: "Value" },
  { value: "custom", label: "Custom" },
];

export function FormBuilder({ fields, onChange }: FormBuilderProps) {
  function addField() {
    onChange([
      ...fields,
      {
        id: createFieldId(),
        type: "text",
        label: "New Field",
        required: false,
        mapsTo: "custom",
      },
    ]);
  }

  function updateField(index: number, patch: Partial<FormField>) {
    onChange(fields.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  function removeField(index: number) {
    onChange(fields.filter((_, i) => i !== index));
  }

  function moveField(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= fields.length) return;
    const copy = [...fields];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    onChange(copy);
  }

  const inputClass =
    "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground focus:outline-none focus:border-forest-mid/50";

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="dashboard-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-silver-dim uppercase tracking-wider">
              Field {index + 1}
            </span>
            <div className="flex items-center gap-1">
              <IconButton onClick={() => moveField(index, -1)} disabled={index === 0} label="Move up">
                ↑
              </IconButton>
              <IconButton onClick={() => moveField(index, 1)} disabled={index === fields.length - 1} label="Move down">
                ↓
              </IconButton>
              <IconButton onClick={() => removeField(index)} label="Remove">
                ×
              </IconButton>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-silver-dim mb-1">Label</label>
              <input
                className={inputClass}
                value={field.label}
                onChange={(e) => updateField(index, { label: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-silver-dim mb-1">Type</label>
              <select
                className={inputClass}
                value={field.type}
                onChange={(e) =>
                  updateField(index, { type: e.target.value as FormFieldType })
                }
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-silver-dim mb-1">Maps to CRM</label>
              <select
                className={inputClass}
                value={field.mapsTo}
                onChange={(e) =>
                  updateField(index, { mapsTo: e.target.value as CrmFieldMap })
                }
              >
                {CRM_MAPS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-silver-dim mb-1">Placeholder</label>
              <input
                className={inputClass}
                value={field.placeholder ?? ""}
                onChange={(e) => updateField(index, { placeholder: e.target.value })}
              />
            </div>
          </div>

          {field.type === "select" && (
            <div className="mt-3">
              <label className="block text-[11px] text-silver-dim mb-1">
                Options (comma-separated)
              </label>
              <input
                className={inputClass}
                value={field.options?.join(", ") ?? ""}
                onChange={(e) =>
                  updateField(index, {
                    options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Option 1, Option 2"
              />
            </div>
          )}

          <label className="flex items-center gap-2 mt-3 text-[13px] text-silver-muted cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(index, { required: e.target.checked })}
              className="rounded border-silver/30"
            />
            Required field
          </label>
        </div>
      ))}

      <Button type="button" variant="secondary" onClick={addField} className="w-full">
        + Add Field
      </Button>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-7 h-7 rounded text-silver-dim hover:text-foreground hover:bg-white/5 disabled:opacity-30 text-sm"
    >
      {children}
    </button>
  );
}
