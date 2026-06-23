import type { ClientBranding, ExecutiveReport } from "./types";
import {
  buildExecutiveReportFromCrm,
  getAvailableMonthsFromCrm,
  getReportClientList,
} from "./crm-metrics";

export type GetReportDataOptions = {
  /** Required to build a report. Omit for agency client-picker bootstrap only. */
  clientSlug?: string;
  month?: string;
  brandingOverride?: Partial<ClientBranding>;
  /** Strip internal QA leads from metrics (client portal). */
  forPortal?: boolean;
};

export type ReportDataResult = {
  report: ExecutiveReport | null;
  months: { month: string; label: string }[];
  clients: { id: string; name: string }[];
  clientId?: string;
  empty: boolean;
};

export async function getReportData(
  options: GetReportDataOptions = {}
): Promise<ReportDataResult> {
  const clients = await getReportClientList();

  if (!options.clientSlug) {
    return {
      report: null,
      months: [],
      clients,
      empty: true,
    };
  }

  const forPortal = options.forPortal ?? false;

  const report = await buildExecutiveReportFromCrm(
    options.clientSlug,
    options.month,
    options.brandingOverride,
    forPortal
  );
  const months = await getAvailableMonthsFromCrm(options.clientSlug, forPortal);

  return {
    report,
    months,
    clients,
    clientId: options.clientSlug,
    empty: false,
  };
}

/** @deprecated Use getReportData */
export async function getAvailableMonths(
  clientId: string
): Promise<{ month: string; label: string }[]> {
  return getAvailableMonthsFromCrm(clientId);
}

/** @deprecated Use getReportData */
export async function getClientIds(): Promise<{ id: string; name: string }[]> {
  return getReportClientList();
}

/** @deprecated Use getReportData */
export async function buildExecutiveReport(
  clientId: string,
  reportMonth?: string,
  brandingOverride?: Partial<ClientBranding>
): Promise<ExecutiveReport> {
  return buildExecutiveReportFromCrm(clientId, reportMonth, brandingOverride);
}
