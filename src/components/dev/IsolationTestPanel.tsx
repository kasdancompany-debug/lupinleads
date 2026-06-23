"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { IsolationTestReport } from "@/lib/testing/data-isolation.types";
import {
  ISOLATION_CLIENT_A,
  ISOLATION_CLIENT_B,
  ISOLATION_CLIENT_A_NAME,
  ISOLATION_CLIENT_B_NAME,
} from "@/lib/testing/data-isolation.types";

type RunState = "idle" | "running" | "done" | "error";

export function IsolationTestPanel() {
  const [dataReport, setDataReport] = useState<IsolationTestReport | null>(null);
  const [sessionReport, setSessionReport] = useState<IsolationTestReport | null>(null);
  const [dataState, setDataState] = useState<RunState>("idle");
  const [sessionState, setSessionState] = useState<RunState>("idle");
  const [error, setError] = useState("");

  const runDataSuite = useCallback(async () => {
    setDataState("running");
    setError("");

    try {
      const res = await fetch("/api/dev/isolation-test");
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Failed to run tests");
        setDataState("error");
        return;
      }

      setDataReport(body.report);
      setDataState("done");
    } catch {
      setError("Network error — is the dev server running?");
      setDataState("error");
    }
  }, []);

  const runSessionSuite = useCallback(async () => {
    setSessionState("running");
    setError("");

    try {
      const res = await fetch("/api/dev/isolation-test/session");
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Failed to run session tests");
        setSessionState("error");
        return;
      }

      setSessionReport(body.report);
      setSessionState("done");
    } catch {
      setError("Network error");
      setSessionState("error");
    }
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
          Pre-onboarding gate
        </p>
        <h1 className="text-xl font-medium text-foreground mb-2">Agency / client isolation</h1>
        <p className="text-[13px] text-silver-muted leading-relaxed max-w-2xl">
          Verifies tenant boundaries between{" "}
          <code className="text-forest-glow">{ISOLATION_CLIENT_A}</code> and{" "}
          <code className="text-forest-glow">{ISOLATION_CLIENT_B}</code>. Run before
          onboarding a real client — or use{" "}
          <code className="text-forest-glow">npm run test:isolation</code> from the CLI.
        </p>
      </header>

      <section className="dashboard-card p-5 space-y-4">
        <div>
          <h2 className="text-[15px] font-medium text-foreground mb-1">
            1. Automated suite (agency)
          </h2>
          <p className="text-[13px] text-silver-muted">
            Auth route rules + Supabase data checks. Covers dashboard/portal access,
            cross-tenant lead guards, scoped queries, and manual test-lead routing.
          </p>
        </div>
        <Button type="button" size="sm" onClick={runDataSuite} loading={dataState === "running"}>
          Run automated tests
        </Button>
        {dataReport ? <ResultsBlock report={dataReport} /> : null}
      </section>

      <section className="dashboard-card p-5 space-y-4">
        <div>
          <h2 className="text-[15px] font-medium text-foreground mb-1">
            2. Session suite (optional)
          </h2>
          <p className="text-[13px] text-silver-muted mb-3">
            Re-runs checks in the context of your current login. Sign in as each test
            portal user to confirm browser session behaviour.
          </p>
          <ol className="text-[13px] text-silver-muted space-y-2 list-decimal list-inside">
            <li>
              Invite <strong className="text-foreground">client-a@test.lupin.local</strong> to{" "}
              {ISOLATION_CLIENT_A_NAME} and{" "}
              <strong className="text-foreground">client-b@test.lupin.local</strong> to{" "}
              {ISOLATION_CLIENT_B_NAME} (or any two emails).
            </li>
            <li>Sign in at <code className="text-forest-glow">/portal/login</code> as Client A →{" "}
              <code className="text-forest-glow">/portal/dev/isolation-test</code> → expect pass.</li>
            <li>Sign out, sign in as Client B → <code className="text-forest-glow">/portal/dev/isolation-test</code> → expect pass.</li>
            <li>Sign in as agency admin → session tests run the full automated suite.</li>
          </ol>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={runSessionSuite}
          loading={sessionState === "running"}
        >
          Run session tests (current login)
        </Button>
        {sessionReport ? <ResultsBlock report={sessionReport} /> : null}
      </section>

      <section className="dashboard-card p-5">
        <h2 className="text-[15px] font-medium text-foreground mb-3">Prerequisites</h2>
        <ul className="text-[13px] text-silver-muted space-y-2">
          <li>Supabase migrations <code className="text-forest-glow">006</code> and{" "}
            <code className="text-forest-glow">008</code> applied (clients + isolation test leads).</li>
          <li>
            Test leads:{" "}
            <code className="text-forest-glow">isolation-test@summit-renovations.local</code>,{" "}
            <code className="text-forest-glow">isolation-test@northline-plumbing.local</code>
          </li>
          <li>CLI alternative: <code className="text-forest-glow">npm run test:isolation</code></li>
        </ul>
      </section>

      {error ? <p className="text-sm text-red-400/80">{error}</p> : null}
    </div>
  );
}

function ResultsBlock({ report }: { report: IsolationTestReport }) {
  return (
    <div className="mt-4 border border-silver/10 rounded-md overflow-hidden">
      <div
        className={`px-4 py-3 text-sm font-medium ${
          report.allPassed
            ? "bg-forest-mid/15 text-forest-glow border-b border-silver/8"
            : "bg-red-400/10 text-red-300 border-b border-silver/8"
        }`}
      >
        {report.allPassed
          ? `✓ ALL PASSED (${report.passed}/${report.results.length})`
          : `✗ FAILED (${report.failed} failed, ${report.passed} passed)`}
      </div>
      <ul className="divide-y divide-silver/6">
        {report.results.map((result) => (
          <li key={result.id} className="px-4 py-3">
            <div className="flex items-start gap-3">
              <span
                className={`shrink-0 text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  result.pass
                    ? "text-forest-glow bg-forest-mid/15"
                    : "text-red-300 bg-red-400/10"
                }`}
              >
                {result.pass ? "pass" : "fail"}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] text-foreground font-medium">{result.name}</p>
                <p className="text-[12px] text-silver-muted mt-0.5">{result.message}</p>
                {result.detail ? (
                  <p className="text-[11px] text-silver-dim mt-1 font-mono break-all">
                    {result.detail}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <pre className="px-4 py-3 text-[11px] text-silver-dim bg-black overflow-x-auto border-t border-silver/8 font-mono leading-relaxed">
        {formatReportText(report)}
      </pre>
    </div>
  );
}

function formatReportText(report: IsolationTestReport): string {
  const lines = [
    `Suite: ${report.suite} | ${report.ranAt}`,
    `A: ${report.clients.a} (${report.prerequisites.clientALeadCount} leads)`,
    `B: ${report.clients.b} (${report.prerequisites.clientBLeadCount} leads)`,
    "",
  ];

  for (const r of report.results) {
    lines.push(`[${r.pass ? "PASS" : "FAIL"}] ${r.name}`);
    lines.push(`  ${r.message}`);
    if (r.detail) lines.push(`  → ${r.detail}`);
  }

  lines.push("", report.allPassed ? "ALL TESTS PASSED" : "SOME TESTS FAILED");
  return lines.join("\n");
}
