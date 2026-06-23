"use client";

import { useCallback, useEffect, useState } from "react";
import type { ExecutiveReport } from "@/lib/reports/types";
import { calculateCloseRate, pctChange } from "@/lib/reports/calculations";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PortalEmptyState } from "@/components/portal/PortalEmptyState";
import { toPortalHighlight } from "@/lib/portal/constants";

const AD_SPEND_PENDING = "—";
const COST_PENDING = "Waiting on ad spend";

type PortalReportResponse = {
  report: ExecutiveReport | null;
  months: { month: string; label: string }[];
  clientId?: string;
  adSpendEntered?: boolean;
  empty?: boolean;
  error?: string;
};

interface PortalReportsDashboardProps {
  clientName?: string;
}

export function PortalReportsDashboard({ clientName }: PortalReportsDashboardProps) {
  const [reportMonth, setReportMonth] = useState("");
  const [report, setReport] = useState<ExecutiveReport | null>(null);
  const [months, setMonths] = useState<{ month: string; label: string }[]>([]);
  const [adSpendEntered, setAdSpendEntered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const loadReport = useCallback(async (month?: string) => {
    setLoading(true);
    setFetchError(false);

    try {
      const params = new URLSearchParams();
      if (month) params.set("month", month);

      const query = params.toString();
      const res = await fetch(query ? `/api/portal/reports/data?${query}` : "/api/portal/reports/data");
      const data: PortalReportResponse = await res.json();

      if (!res.ok || !data.report) {
        setReport(null);
        setMonths(data.months ?? []);
        setAdSpendEntered(false);
        setFetchError(true);
        return;
      }

      setReport(data.report);
      setMonths(data.months);
      setAdSpendEntered(Boolean(data.adSpendEntered));
      if (!month) {
        setReportMonth((prev) => prev || data.report!.reportMonth);
      }
    } catch {
      setReport(null);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReport(reportMonth || undefined);
  }, [reportMonth, loadReport]);

  async function downloadPdf() {
    if (!report) return;
    setDownloading(true);

    try {
      const res = await fetch("/api/portal/reports/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportMonth: report.reportMonth }),
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `monthly-report-${report.reportMonth}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Could not download the PDF. Try again or contact your Lupin team.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading && !report) {
    return (
      <div className="space-y-4">
        <div className="h-12 w-full max-w-xs bg-black-surface rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 dashboard-card animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (fetchError || !report) {
    return (
      <div>
        <PortalReportsHeader
          clientName={clientName ?? "Your company"}
          monthLabel=""
          months={months}
          reportMonth={reportMonth}
          onMonthChange={setReportMonth}
        />
        <PortalEmptyState
          icon="reports"
          title="No report for this month yet"
          description="Reports appear once you have lead activity. Pick another month above, or check back after your campaigns run."
          action={{ label: "View leads", href: "/portal/pipeline" }}
        />
      </div>
    );
  }

  const { current, previous } = report;
  const leadsToEstimates = calculateCloseRate(current.appointments, current.leads);

  const costPerLeadPlaceholder = !adSpendEntered
    ? COST_PENDING
    : current.leads === 0
      ? "No leads this month"
      : undefined;

  const returnOnAdsPlaceholder = !adSpendEntered
    ? COST_PENDING
    : current.revenue === 0
      ? "No closed revenue"
      : undefined;

  const hasMonthActivity =
    current.leads > 0 ||
    current.appointments > 0 ||
    current.dealsClosed > 0 ||
    current.revenue > 0;

  return (
    <div>
      <PortalReportsHeader
        clientName={report.clientName}
        monthLabel={report.reportMonthLabel}
        months={months}
        reportMonth={reportMonth}
        onMonthChange={setReportMonth}
        onDownload={downloadPdf}
        downloading={downloading}
      />

      {!adSpendEntered ? <PortalAdSpendEmptyState /> : null}

      {!hasMonthActivity ? (
        <PortalEmptyState
          title="Nothing to report this month yet"
          description="Leads, estimates, jobs, and revenue will show here as your campaigns bring in work."
          action={{ label: "Check your leads", href: "/portal/pipeline" }}
        />
      ) : (
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <MetricCard
                label="Ad spend"
                value={current.totalSpend}
                format="currency"
                hideChange
                placeholder={!adSpendEntered ? AD_SPEND_PENDING : undefined}
                footnote={adSpendEntered ? "Logged by your Lupin team" : undefined}
              />
              <MetricCard
                label="Leads"
                value={current.leads}
                change={previous ? pctChange(current.leads, previous.leads) : 0}
                format="number"
              />
              <MetricCard
                label="Cost per lead"
                value={current.costPerLead}
                format="currency"
                hideChange
                placeholder={costPerLeadPlaceholder}
                invertChange
              />
              <MetricCard
                label="Estimates"
                value={current.appointments}
                change={previous ? pctChange(current.appointments, previous.appointments) : 0}
                format="number"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <MetricCard
                label="Jobs"
                value={current.dealsClosed}
                change={previous ? pctChange(current.dealsClosed, previous.dealsClosed) : 0}
                format="number"
              />
              <MetricCard
                label="Revenue"
                value={current.revenue}
                change={previous ? pctChange(current.revenue, previous.revenue) : 0}
                format="currency"
              />
              <MetricCard
                label="Return on ads"
                value={current.roas}
                format="roas"
                hideChange
                placeholder={returnOnAdsPlaceholder}
                footnote={
                  adSpendEntered && current.roas > 0 ? "Revenue ÷ ad spend" : undefined
                }
              />
              <MetricCard
                label="Leads → estimates"
                value={leadsToEstimates}
                format="percent"
                hideChange
                footnote={
                  current.leads > 0
                    ? `${current.appointments} of ${current.leads} leads`
                    : "No leads this month"
                }
              />
            </div>
          </div>

          {report.highlights.length > 0 ? (
            <div className="dashboard-card p-4 sm:p-5 mt-6">
              <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-3">
                Month summary
              </p>
              <ul className="space-y-2">
                {report.highlights.map((h) => (
                  <li key={h} className="text-[13px] text-silver-muted flex items-start gap-2">
                    <span className="text-forest-glow mt-0.5">•</span>
                    {toPortalHighlight(h)}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function PortalReportsHeader({
  clientName,
  monthLabel,
  months,
  reportMonth,
  onMonthChange,
  onDownload,
  downloading = false,
}: {
  clientName: string;
  monthLabel: string;
  months: { month: string; label: string }[];
  reportMonth: string;
  onMonthChange: (month: string) => void;
  onDownload?: () => void;
  downloading?: boolean;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
      <div className="max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-2">
          Monthly report
        </p>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mb-1">
          {clientName}
        </h1>
        <p className="text-sm text-silver-muted leading-relaxed">
          {monthLabel
            ? `Leads, estimates, jobs, and revenue for ${monthLabel}.`
            : "Your monthly results from Lupin ad campaigns."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {months.length > 0 ? (
          <select
            value={reportMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="dashboard-card px-3 py-2.5 text-[13px] text-foreground bg-black-surface min-w-[10rem] min-h-[44px]"
          >
            {months.map((m) => (
              <option key={m.month} value={m.month}>
                {m.label}
              </option>
            ))}
          </select>
        ) : null}

        {onDownload ? (
          <button
            type="button"
            onClick={onDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-[13px] font-medium bg-forest-mid text-foreground hover:bg-forest-light border border-forest-light/30 transition-colors disabled:opacity-50 min-h-[44px]"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2V10M8 10L5 7M8 10L11 7M3 12V13C3 13.5 3.5 14 4 14H12C12.5 14 13 13.5 13 13V12" />
            </svg>
            {downloading ? "Preparing…" : "Download PDF"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function PortalAdSpendEmptyState() {
  return (
    <div className="dashboard-card px-4 sm:px-5 py-4 mb-6 border-l-2 border-l-forest-mid/40 bg-forest-mid/[0.05]">
      <p className="text-sm text-foreground leading-relaxed">
        Ad spend for this month hasn&apos;t been added yet. Cost per lead and return on your
        ads will show once your Lupin team logs it.
      </p>
    </div>
  );
}
