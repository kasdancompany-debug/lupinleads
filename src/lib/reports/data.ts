import type { ExecutiveReport } from "./types";
import {
  buildExecutiveReportFromCrm,
  getAvailableMonthsFromCrm,
  getReportClientList,
} from "./crm-metrics";

export async function getAvailableMonths(
  clientId: string
): Promise<{ month: string; label: string }[]> {
  return getAvailableMonthsFromCrm(clientId);
}

export async function getClientIds(): Promise<{ id: string; name: string }[]> {
  return getReportClientList();
}

export async function buildExecutiveReport(
  clientId: string,
  reportMonth?: string,
  brandingOverride?: Partial<import("./types").ClientBranding>
): Promise<ExecutiveReport> {
  return buildExecutiveReportFromCrm(clientId, reportMonth, brandingOverride);
}
