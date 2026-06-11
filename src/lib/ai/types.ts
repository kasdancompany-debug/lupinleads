export type LeadTemperature = "hot" | "warm" | "cold";

export type RecommendedAction =
  | "call_immediately"
  | "follow_up_tomorrow"
  | "send_estimate";

export interface FollowUpAnalysis {
  score: LeadTemperature;
  scoreReason: string;
  recommendation: RecommendedAction;
  recommendationReason: string;
  nextAction: string;
  sms: string;
  email: {
    subject: string;
    body: string;
  };
  talkingPoints: string[];
}

export interface LeadContext {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceRequested: string;
  estimatedValue: number;
  notes: string;
  source: string;
  stage: string;
  createdAt: string;
  updatedAt: string;
}
