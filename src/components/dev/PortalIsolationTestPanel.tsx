"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { IsolationTestReport } from "@/lib/testing/data-isolation.types";

export function PortalIsolationTestPanel() {
  const [report, setReport] = useState<IsolationTestReport | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(async () => {
    setRunning(true);
    setError("");

    try {
      const res = await fetch("/api/dev/isolation-test/session");
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Failed to run tests");
        return;
      }

      setReport(body.report);
    } catch {
      setError("Network error");
    } finally {
      setRunning(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] uppercase tracking-[0.15em] text-forest-glow mb-1">
          Pre-onboarding
        </p>
        <h1 className="text-xl font-medium text-foreground mb-2">Session isolation check</h1>
        <p className="text-[13px] text-silver-muted leading-relaxed">
          Confirms your portal login only sees your company&apos;s leads and cannot touch
          another client&apos;s data.
        </p>
      </header>

      <Button type="button" size="sm" onClick={run} loading={running}>
        Run my isolation tests
      </Button>

      {error ? <p className="text-sm text-red-400/80">{error}</p> : null}

      {report ? (
        <div className="dashboard-card overflow-hidden">
          <div
            className={`px-4 py-3 text-sm font-medium border-b border-silver/8 ${
              report.allPassed ? "text-forest-glow bg-forest-mid/10" : "text-red-300 bg-red-400/10"
            }`}
          >
            {report.allPassed ? "✓ ALL PASSED" : "✗ SOME TESTS FAILED"}
          </div>
          <ul className="divide-y divide-silver/6">
            {report.results.map((r) => (
              <li key={r.id} className="px-4 py-3 text-[13px]">
                <span className={r.pass ? "text-forest-glow" : "text-red-300"}>
                  [{r.pass ? "PASS" : "FAIL"}]
                </span>{" "}
                {r.name} — {r.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
