"use client";

import { useCallback, useEffect, useState } from "react";
import type { ClientBranding, ExecutiveReport } from "@/lib/reports/types";
import { getBrandings } from "@/lib/reports/branding";
import { ReportMetricCard } from "./ReportMetricCard";
import { BrandingPanel } from "./BrandingPanel";
import { formatCurrency } from "@/lib/dashboard/format";

export function ExecutiveReportsDashboard({
  variant = "agency",
}: {
  variant?: "agency" | "portal";
}) {
  const isPortal = variant === "portal";
  const dataEndpoint = isPortal ? "/api/portal/reports/data" : "/api/reports/data";
  const pdfEndpoint = isPortal ? "/api/portal/reports/pdf" : "/api/reports/pdf";
  const [clientId, setClientId] = useState("");
  const [reportMonth, setReportMonth] = useState("");
  const [report, setReport] = useState<ExecutiveReport | null>(null);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [months, setMonths] = useState<{ month: string; label: string }[]>([]);
  const [branding, setBranding] = useState<ClientBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [adSpendEntered, setAdSpendEntered] = useState(false);

  const CPL_ROAS_PLACEHOLDER = "Pending ad spend";

  const loadReport = useCallback(async (cId: string, month?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (!isPortal) params.set("clientId", cId);
      if (month) params.set("month", month);

      const query = params.toString();
      const res = await fetch(query ? `${dataEndpoint}?${query}` : dataEndpoint);
      const data = await res.json();

      if (data.empty || !data.report) {
        setEmpty(true);
        setReport(null);
        setClients(data.clients ?? []);
        setMonths([]);
        setBranding(null);
        return;
      }

      setEmpty(false);
      setReport(data.report);
      setAdSpendEntered(Boolean(data.adSpendEntered ?? data.report?.current?.adSpendEntered));
      if (data.clients) setClients(data.clients);
      setMonths(data.months);
      if (data.clientId) setClientId(data.clientId);
      if (!month) {
        setReportMonth((prev) => prev || data.report.reportMonth);
      }

      const brandings = getBrandings();
      const resolvedClientId = isPortal ? data.clientId ?? cId : cId;
      const b =
        brandings.find((x) => x.clientId === resolvedClientId) ?? data.report.branding;
      setBranding(b);
    } catch {
      setEmpty(true);
    } finally {
      setLoading(false);
    }
  }, [dataEndpoint, isPortal]);

  useEffect(() => {
    if (isPortal) return;

    fetch("/api/reports/data")
      .then((res) => res.json())
      .then((data) => {
        setClients(data.clients ?? []);
        if (!data.clients?.length) {
          setEmpty(true);
          setLoading(false);
          return;
        }
        setClientId((prev) => prev || data.clients[0].id);
      })
      .catch(() => {
        setEmpty(true);
        setLoading(false);
      });
  }, [isPortal]);

  useEffect(() => {
    if (isPortal) {
      loadReport("", reportMonth || undefined);
      return;
    }

    if (!clientId) return;
    loadReport(clientId, reportMonth || undefined);
  }, [clientId, reportMonth, loadReport, isPortal]);

  async function downloadPdf() {
    if (!report || !branding) return;
    setDownloading(true);

    try {
      const res = await fetch(pdfEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isPortal
            ? { reportMonth: report.reportMonth }
            : {
                clientId,
                reportMonth: report.reportMonth,
                branding,
              }
        ),
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `executive-report-${isPortal ? report.clientName : clientId}-${report.reportMonth}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading && !report) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-64 bg-black-surface rounded animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 dashboard-card animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (empty || !report || !branding) {
    return (
      <div>
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
            Executive Reporting
          </p>
          <h1 className="text-xl font-medium text-foreground">Monthly Performance</h1>
        </div>
        <div className="dashboard-card p-10 text-center max-w-xl">
          <p className="text-foreground font-medium mb-2">
            {isPortal ? "No reports available yet" : "No client reports yet"}
          </p>
          <p className="text-[13px] text-silver-muted leading-relaxed">
            {isPortal
              ? "Your monthly performance report will appear here once lead data is available for your account."
              : (
                <>
                  Reports pull live data from <code className="text-forest-glow">crm_leads</code> by
                  client campaign tag. When you onboard a founding partner, set their{" "}
                  <code className="text-forest-glow">campaign</code> on leads and add branding in
                  Supabase to generate PDFs here.
                </>
              )}
          </p>
        </div>
      </div>
    );
  }

  const { current, previous, trends, highlights } = report;
  const cplPlaceholder = !adSpendEntered ? CPL_ROAS_PLACEHOLDER : undefined;
  const roasPlaceholder = !adSpendEntered ? CPL_ROAS_PLACEHOLDER : undefined;

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
            Executive Reporting
          </p>
          <h1 className="text-xl font-medium text-foreground">
            Monthly Performance
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!isPortal ? (
            <select
              value={clientId}
              onChange={(e) => {
                setClientId(e.target.value);
                setReportMonth("");
              }}
              className="dashboard-card px-3 py-2 text-[13px] text-foreground bg-black-surface"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : null}

          <select
            value={reportMonth}
            onChange={(e) => setReportMonth(e.target.value)}
            className="dashboard-card px-3 py-2 text-[13px] text-foreground bg-black-surface"
          >
            {months.map((m) => (
              <option key={m.month} value={m.month}>
                {m.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={downloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium bg-forest-mid text-foreground hover:bg-forest-light border border-forest-light/30 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2V10M8 10L5 7M8 10L11 7M3 12V13C3 13.5 3.5 14 4 14H12C12.5 14 13 13.5 13 13V12" />
            </svg>
            {downloading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      <div
        className="rounded-md px-4 py-3 mb-6 border border-silver/10"
        style={{
          borderLeftColor: branding.primaryColor,
          borderLeftWidth: 3,
          backgroundColor: `${branding.primaryColor}10`,
        }}
      >
        <p className="text-sm font-medium text-foreground">{branding.clientName}</p>
        <p className="text-[12px] text-silver-muted">
          {report.reportMonthLabel} · Prepared by {branding.agencyName}
        </p>
      </div>

      {!isPortal && !adSpendEntered ? (
        <div className="dashboard-card px-5 py-4 mb-6 border-l-2 border-l-amber-400/40 bg-amber-400/[0.04]">
          <p className="text-sm text-foreground leading-relaxed">
            Ad spend has not been entered for this month.{" "}
            <a href="/dashboard/spend" className="text-forest-glow hover:underline">
              Log spend
            </a>{" "}
            to show CPL and ROAS.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        <ReportMetricCard
          label="Leads"
          value={current.leads}
          previous={previous?.leads}
          format="number"
        />
        <ReportMetricCard
          label="Cost Per Lead"
          value={current.costPerLead}
          previous={previous?.costPerLead}
          format="currency"
          invertChange
          placeholder={cplPlaceholder}
          hideChange={!adSpendEntered}
        />
        <ReportMetricCard
          label="Appointments"
          value={current.appointments}
          previous={previous?.appointments}
          format="number"
        />
        <ReportMetricCard
          label="Close Rate"
          value={current.closeRate}
          previous={previous?.closeRate}
          format="percent"
        />
        <ReportMetricCard
          label="Revenue"
          value={current.revenue}
          previous={previous?.revenue}
          format="currency"
        />
        <ReportMetricCard
          label="ROAS"
          value={current.roas}
          previous={previous?.roas}
          format="roas"
          placeholder={roasPlaceholder}
          hideChange={!adSpendEntered}
        />
      </div>

      <div className={isPortal ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-3 gap-6"}>
        <div className={isPortal ? "space-y-6" : "lg:col-span-2 space-y-6"}>
          <div className="dashboard-card overflow-hidden">
            <div className="px-5 py-4 border-b border-silver/8">
              <p className="text-[11px] uppercase tracking-wider text-silver-dim">
                6-Month Trend
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-silver/8 text-left">
                    {["Month", "Leads", "CPL", "Appts", "Close %", "Revenue", "ROAS"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-[11px] uppercase tracking-wider text-silver-dim font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trends.map((row) => (
                    <tr
                      key={row.month}
                      className={`border-b border-silver/4 ${
                        row.month === current.month ? "bg-forest-mid/5" : ""
                      }`}
                    >
                      <td className="px-5 py-3 font-medium text-foreground">{row.label}</td>
                      <td className="px-5 py-3 tabular-nums text-silver-muted">{row.leads}</td>
                      <td className="px-5 py-3 tabular-nums text-silver-muted">
                        {row.adSpendEntered ? formatCurrency(row.costPerLead) : "—"}
                      </td>
                      <td className="px-5 py-3 tabular-nums text-silver-muted">
                        {row.appointments}
                      </td>
                      <td className="px-5 py-3 tabular-nums text-silver-muted">
                        {row.closeRate}%
                      </td>
                      <td className="px-5 py-3 tabular-nums text-forest-glow">
                        {formatCurrency(row.revenue)}
                      </td>
                      <td className="px-5 py-3 tabular-nums text-silver-muted">
                        {row.adSpendEntered && row.roas > 0 ? `${row.roas}×` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card p-5">
            <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-3">
              Executive Summary
            </p>
            <ul className="space-y-2">
              {highlights.map((h) => (
                <li key={h} className="text-[13px] text-silver-muted flex items-start gap-2">
                  <span className="text-forest-glow mt-0.5">•</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!isPortal ? (
          <div>
            <BrandingPanel
              branding={branding}
              onSave={(b) => {
                setBranding(b);
                setReport((prev) =>
                  prev ? { ...prev, branding: b, clientName: b.clientName } : prev
                );
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
