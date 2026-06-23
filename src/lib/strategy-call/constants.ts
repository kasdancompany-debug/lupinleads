export const STRATEGY_CALL_TRADES = [
  "Roofer",
  "HVAC",
  "Plumber",
  "Landscaper",
  "Electrician",
  "General contractor",
  "Other",
] as const;

export const STRATEGY_CALL_BUDGETS = [
  "Not running ads yet",
  "Under $2,000/month",
  "$2,000–$5,000/month",
  "$5,000+/month",
  "Not sure yet",
] as const;

export type StrategyCallTrade = (typeof STRATEGY_CALL_TRADES)[number];
export type StrategyCallBudget = (typeof STRATEGY_CALL_BUDGETS)[number];
