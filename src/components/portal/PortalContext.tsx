"use client";

import { createContext, useContext } from "react";

export type PortalContextValue = {
  clientName: string;
  clientSlug: string;
};

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({
  clientName,
  clientSlug,
  children,
}: PortalContextValue & { children: React.ReactNode }) {
  return (
    <PortalContext.Provider value={{ clientName, clientSlug }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortalContext(): PortalContextValue {
  const value = useContext(PortalContext);
  if (!value) {
    throw new Error("usePortalContext must be used within PortalProvider");
  }
  return value;
}
