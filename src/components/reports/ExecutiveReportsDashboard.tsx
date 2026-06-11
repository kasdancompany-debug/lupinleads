"use client";

import { useCallback, useEffect, useState } from "react";
import type { ClientBranding, ExecutiveReport } from "@/lib/reports/types";
import { getBrandings } from "@/lib/reports/branding";
import { ReportMetricCard } from "./ReportMetricCard";
import { BrandingPanel } from "./BrandingPanel";
import { formatCurrency } from "@/lib/dashboard/format";

export function ExecutiveReportsDashboard() {
  const [clientId, setClientId] = useState("apex-outdoors");
  const [reportMonth, setReportMonth] = useState("");
  const [report, setReport] = useState<ExecutiveReport | null>(null);
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [months, setMonths] = useState<{ month: string; label: string }[]>([]);
  const [branding, setBranding] = useState<ClientBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const loadReport = useCallback(async (cId: string, month?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ clientId: cId });
      if (month) params.set("month", month);

      const res = await fetch(`/api/reports/data?${params}`);
      const data = await res.json();

      setReport(data.report);
      setClients(data.clients);
      setMonths(data.months);
      if (!month) setReportMonth(data.report.reportMonth);

      const brandings = getBrandings();
      const b = brandings.find((x) => x.clientId === cId) ?? data.report.branding;
      setBranding(b);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReport(clientId, reportMonth || undefined);
  }, [clientId, reportMonth, loadReport]);

  async function downloadPdf() {
    if (!report || !branding) return;
    setDownloading(true);

    try {
      const res = await fetch("/api/reports/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          reportMonth: report.reportMonth,
          branding,
        }),
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `executive-report-${clientId}-${report.reportMonth}.pdf`;
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

  if (!report || !branding) return null;

  const { current, previous, trends, highlights } = report;

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
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                        {formatCurrency(row.costPerLead)}
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
                      <td className="px-5 py-3 tabular-nums text-silver-muted">{row.roas}×</td>
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
      </div>
    </div>
  );
}
