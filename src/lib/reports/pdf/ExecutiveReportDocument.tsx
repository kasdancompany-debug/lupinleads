import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ExecutiveReport } from "../types";
import { pctChange } from "../calculations";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 2,
  },
  headerLeft: {},
  agencyName: {
    fontSize: 9,
    color: "#666",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  clientName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 11,
    color: "#444",
  },
  headerRight: {
    textAlign: "right",
  },
  dateText: {
    fontSize: 9,
    color: "#888",
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 28,
  },
  metricCard: {
    width: "30%",
    padding: 14,
    backgroundColor: "#f8f8f8",
    borderRadius: 4,
    borderLeftWidth: 3,
  },
  metricLabel: {
    fontSize: 8,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 8,
    color: "#888",
  },
  table: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
  },
  tableCellBold: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  highlightBox: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 4,
    marginBottom: 24,
  },
  highlightItem: {
    fontSize: 10,
    color: "#333",
    marginBottom: 6,
    paddingLeft: 12,
  },
  footer: {
    position: "absolute",
    bottom: 36,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: "#999",
  },
});

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

function formatChange(current: number, previous: number | undefined): string {
  if (previous === undefined) return "—";
  const change = pctChange(current, previous);
  const sign = change > 0 ? "+" : "";
  return `${sign}${change}% vs prior month`;
}

interface Props {
  report: ExecutiveReport;
}

export function ExecutiveReportDocument({ report }: Props) {
  const { branding, current, previous, trends, highlights } = report;
  const primary = branding.primaryColor;
  const generated = new Date(report.generatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const metrics = [
    {
      label: "Leads",
      value: current.leads.toLocaleString(),
      change: formatChange(current.leads, previous?.leads),
    },
    {
      label: "Cost Per Lead",
      value: formatCurrency(current.costPerLead),
      change: formatChange(current.costPerLead, previous?.costPerLead),
    },
    {
      label: "Appointments",
      value: current.appointments.toLocaleString(),
      change: formatChange(current.appointments, previous?.appointments),
    },
    {
      label: "Close Rate",
      value: `${current.closeRate}%`,
      change: formatChange(current.closeRate, previous?.closeRate),
    },
    {
      label: "Revenue",
      value: formatCurrency(current.revenue),
      change: formatChange(current.revenue, previous?.revenue),
    },
    {
      label: "ROAS",
      value: `${current.roas}×`,
      change: formatChange(current.roas, previous?.roas),
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { borderBottomColor: primary }]}>
          <View style={styles.headerLeft}>
            <Text style={styles.agencyName}>{branding.agencyName}</Text>
            <Text style={[styles.clientName, { color: primary }]}>
              {branding.clientName}
            </Text>
            <Text style={styles.reportTitle}>
              Executive Performance Report — {report.reportMonthLabel}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.dateText}>Generated {generated}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: primary }]}>
          Key Metrics
        </Text>
        <View style={styles.metricsGrid}>
          {metrics.map((m) => (
            <View
              key={m.label}
              style={[styles.metricCard, { borderLeftColor: branding.accentColor }]}
            >
              <Text style={styles.metricLabel}>{m.label}</Text>
              <Text style={styles.metricValue}>{m.value}</Text>
              <Text style={styles.metricChange}>{m.change}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: primary }]}>
          Monthly Trend
        </Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {["Month", "Leads", "CPL", "Appts", "Close %", "Revenue", "ROAS"].map((h) => (
              <Text key={h} style={styles.tableCellBold}>
                {h}
              </Text>
            ))}
          </View>
          {trends.map((row) => (
            <View key={row.month} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.label}</Text>
              <Text style={styles.tableCell}>{row.leads}</Text>
              <Text style={styles.tableCell}>${row.costPerLead}</Text>
              <Text style={styles.tableCell}>{row.appointments}</Text>
              <Text style={styles.tableCell}>{row.closeRate}%</Text>
              <Text style={styles.tableCell}>{formatCurrency(row.revenue)}</Text>
              <Text style={styles.tableCell}>{row.roas}×</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: primary }]}>
          Executive Summary
        </Text>
        <View style={styles.highlightBox}>
          {highlights.map((h) => (
            <Text key={h} style={styles.highlightItem}>
              • {h}
            </Text>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{branding.reportFooter}</Text>
          <Text style={styles.footerText}>
            Powered by {branding.agencyName}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
