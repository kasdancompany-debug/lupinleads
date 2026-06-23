import type { PipelineStage } from "./types";
import { PIPELINE_STAGES } from "./types";

export type PortalLeadUpdateInput = {
  stage?: PipelineStage;
  notes?: string;
  estimatedValue?: number;
};

export function isPipelineStage(value: unknown): value is PipelineStage {
  return (
    typeof value === "string" &&
    (PIPELINE_STAGES as readonly string[]).includes(value)
  );
}

export function parsePortalLeadUpdate(body: unknown): PortalLeadUpdateInput {
  if (!body || typeof body !== "object") {
    return {};
  }

  const record = body as Record<string, unknown>;
  const update: PortalLeadUpdateInput = {};

  if (isPipelineStage(record.stage)) {
    update.stage = record.stage;
  }

  if (typeof record.notes === "string") {
    update.notes = record.notes;
  }

  if (typeof record.estimatedValue === "number" && Number.isFinite(record.estimatedValue)) {
    update.estimatedValue = Math.max(0, record.estimatedValue);
  } else if (typeof record.estimatedValue === "string" && record.estimatedValue.trim() !== "") {
    const parsed = Number(record.estimatedValue);
    if (Number.isFinite(parsed)) {
      update.estimatedValue = Math.max(0, parsed);
    }
  }

  return update;
}
