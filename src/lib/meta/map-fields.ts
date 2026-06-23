import type { MetaFieldData } from "./types";

const NAME_KEYS = ["full_name", "name", "first_name"];
const EMAIL_KEYS = ["email", "work_email"];
const PHONE_KEYS = ["phone_number", "phone", "mobile_phone"];
const SERVICE_KEYS = [
  "service_requested",
  "project_type",
  "what_service_do_you_need?",
  "what_are_you_looking_for?",
];
const CITY_KEYS = ["city", "town/city"];

function pickField(
  fieldData: MetaFieldData[],
  keys: string[]
): string {
  const lowerMap = new Map(
    fieldData.map((f) => [f.name.toLowerCase(), f.values?.[0]?.trim() ?? ""])
  );

  for (const key of keys) {
    const value = lowerMap.get(key.toLowerCase());
    if (value) return value;
  }
  return "";
}

function buildNotes(fieldData: MetaFieldData[], extras: Record<string, string | undefined>): string {
  const used = new Set(
    [...NAME_KEYS, ...EMAIL_KEYS, ...PHONE_KEYS, ...SERVICE_KEYS, ...CITY_KEYS].map((k) =>
      k.toLowerCase()
    )
  );

  const lines: string[] = [];

  for (const field of fieldData) {
    const key = field.name.toLowerCase();
    if (used.has(key)) continue;
    const value = field.values?.filter(Boolean).join(", ");
    if (value) lines.push(`${field.name}: ${value}`);
  }

  if (extras.adId) lines.push(`Meta ad ID: ${extras.adId}`);
  if (extras.formId) lines.push(`Meta form ID: ${extras.formId}`);
  if (extras.pageId) lines.push(`Meta page ID: ${extras.pageId}`);

  return lines.join("\n");
}

export function mapMetaFieldDataToLead(
  fieldData: MetaFieldData[],
  meta: { adId?: string; formId?: string; pageId?: string }
): {
  name: string;
  email: string;
  phone: string;
  serviceRequested: string;
  notes: string;
} {
  const firstName = pickField(fieldData, ["first_name"]);
  const lastName = pickField(fieldData, ["last_name"]);
  let name = pickField(fieldData, NAME_KEYS);
  if (!name && (firstName || lastName)) {
    name = [firstName, lastName].filter(Boolean).join(" ");
  }

  const email = pickField(fieldData, EMAIL_KEYS);
  const phone = pickField(fieldData, PHONE_KEYS);
  const city = pickField(fieldData, CITY_KEYS);
  let serviceRequested = pickField(fieldData, SERVICE_KEYS);
  if (!serviceRequested && city) {
    serviceRequested = `Service area: ${city}`;
  }

  const notes = buildNotes(fieldData, {
    adId: meta.adId,
    formId: meta.formId,
    pageId: meta.pageId,
  });

  return {
    name: name || "Meta Lead",
    email,
    phone,
    serviceRequested: serviceRequested || "Facebook lead form",
    notes,
  };
}
