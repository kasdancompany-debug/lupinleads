export const ISOLATION_CLIENT_A = "summit-renovations";
export const ISOLATION_CLIENT_B = "northline-plumbing";

export const ISOLATION_CLIENT_A_NAME = "Summit Renovations";
export const ISOLATION_CLIENT_B_NAME = "Northline Plumbing";

export type IsolationTestResult = {
  id: string;
  name: string;
  pass: boolean;
  message: string;
  detail?: string;
};

export type IsolationTestReport = {
  ranAt: string;
  suite: "data" | "session" | "auth" | "full";
  role?: "agency" | "client" | "unauthenticated";
  clientSlug?: string;
  clients: { a: string; b: string };
  prerequisites: {
    configured?: boolean;
    clientALeadCount?: number;
    clientBLeadCount?: number;
    clientATestLeadId?: string | null;
    clientBTestLeadId?: string | null;
    clientAId?: string | null;
    clientBId?: string | null;
    message?: string;
  };
  results: IsolationTestResult[];
  passed: number;
  failed: number;
  allPassed: boolean;
};
