import type { StrategyCallBudget, StrategyCallTrade } from "./constants";

export type StrategyCallFormInput = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  trade: string;
  city: string;
  website: string;
  monthlyAdBudget: string;
  message: string;
};

export type StrategyCallPayload = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  trade: StrategyCallTrade | string;
  city: string;
  website: string | null;
  monthlyAdBudget: StrategyCallBudget | string | null;
  message: string | null;
};

export type StrategyCallSubmitResult = {
  success: true;
  message: string;
  consultationRequestId: string;
  crmLeadId: string;
};

export type StrategyCallValidationError = {
  success: false;
  error: string;
  fieldErrors?: Partial<Record<keyof StrategyCallFormInput, string>>;
};
