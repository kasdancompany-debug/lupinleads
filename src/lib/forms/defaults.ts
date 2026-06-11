import type { FormField } from "./types";

export function createFieldId(): string {
  return `fld_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

export const DEFAULT_FORM_FIELDS: FormField[] = [
  {
    id: "fld_name",
    type: "text",
    label: "Full Name",
    placeholder: "John Smith",
    required: true,
    mapsTo: "name",
  },
  {
    id: "fld_email",
    type: "email",
    label: "Email",
    placeholder: "john@email.com",
    required: true,
    mapsTo: "email",
  },
  {
    id: "fld_phone",
    type: "phone",
    label: "Phone",
    placeholder: "(555) 000-0000",
    required: true,
    mapsTo: "phone",
  },
  {
    id: "fld_service",
    type: "text",
    label: "Service Requested",
    placeholder: "Kitchen remodel, roof repair...",
    required: true,
    mapsTo: "serviceRequested",
  },
  {
    id: "fld_notes",
    type: "textarea",
    label: "Additional Details",
    placeholder: "Tell us about your project...",
    required: false,
    mapsTo: "notes",
  },
];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}
