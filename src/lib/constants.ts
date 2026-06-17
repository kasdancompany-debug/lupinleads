export const CTAS = {
  primary: "Book My Strategy Call",
  short: "Book a Call",
  founding: "Apply for Founding Partner",
  pricing: "See Pricing",
  estimates: "Get More Estimates",
  howItWorks: "See How It Works",
  talk: "Talk to Us",
  calendar: "Pick a Time on the Calendar",
} as const;

export const SITE = {
  name: "LUPIN LEADS",
  tagline: "The contractor growth system",
  headline: "Turn ad clicks into booked jobs.",
  coreLine: {
    lead: "More leads are nice.",
    highlight: "Booked jobs are better.",
  },
  supportingHeadline: "More leads are nice. Booked jobs are better.",
  heroSubheadline:
    "Meta Ads, lead capture, CRM, AI follow-up, and reporting — one system from ad click to booked job.",
  heroOneLiner:
    "Turn ad clicks into booked jobs — Meta Ads, capture, CRM, follow-up, and reporting in one system.",
  footerTagline:
    "The contractor growth system for Canadian trades. You own your Meta account and ad spend.",
  subheadline:
    "The complete growth system for Canadian contractors. You own your Meta ad account and ad spend.",
  description:
    "Turn ad clicks into booked jobs. Lupin Leads is the contractor growth system — Meta Ads, capture, CRM, AI follow-up, and reporting. You own your ad account and ad spend.",
  cta: CTAS.primary,
  ctaShort: CTAS.short,
  email: "hello@lupinleads.com",
  typicalAllIn:
    "Typical all-in: $2,300–$5,300/mo (Lupin fee + $2K–5K Meta ad spend on your account).",
  guaranteeShort:
    "Not satisfied in the first 30 days? Full refund on your Lupin management fee.",
} as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO_BENEFITS = [
  {
    id: "see-leads",
    title: "See every lead",
    description:
      "Track every form, call, estimate, and job in one clean pipeline.",
  },
  {
    id: "follow-up",
    title: "Follow up faster",
    description:
      "AI-assisted follow-up helps stop good leads from slipping through the cracks.",
  },
  {
    id: "revenue",
    title: "Know what made money",
    description:
      "Reports connect ad spend to estimates, booked jobs, and closed revenue.",
  },
  {
    id: "contractors",
    title: "Built for contractors",
    description:
      "Simple enough for busy owners. Powerful enough to run real growth.",
  },
] as const;

export const TRADES_SECTION = {
  title: "Built for trades that live and die by",
  highlight: "estimates.",
  description:
    "Whether you need emergency calls, seasonal installs, renovation estimates, or quote requests, Lupin is built to track the path from ad click to booked job.",
  trades: [
    "Plumbers",
    "Roofers",
    "HVAC",
    "Electricians",
    "Landscapers",
    "Renovators",
    "Deck builders",
    "Bathroom remodelers",
  ],
} as const;

export const SAMPLE_MONTH = {
  statusLabel: "Illustrative example",
  period: "Sample month · home remodeling contractor",
  disclaimer:
    "Sample contractor data shown for illustration. Your results depend on market, offer, budget, follow-up speed, and close rate.",
  funnel: [
    { id: "spend", value: "$3,240", label: "Ad spend" },
    { id: "leads", value: "31", label: "Leads" },
    { id: "estimates", value: "14", label: "Estimates booked" },
    { id: "jobs", value: "4", label: "Jobs won" },
    {
      id: "revenue",
      value: "$84,000",
      label: "Closed revenue",
      sample: true,
      highlight: true,
    },
  ],
  efficiency: [
    { id: "cpl", value: "$38", label: "CPL", sample: true },
    { id: "roas", value: "4.6x", label: "ROAS", sample: true },
  ],
} as const;

export const TRUST_GUARANTEES = [
  {
    id: "canadian-owned",
    title: "Canadian-owned",
    description: "Pricing, support, and reporting built for contractors across Canada.",
  },
  {
    id: "home-service",
    title: "Home service focus",
    description: "Roofing, HVAC, remodeling, trades — systems designed for estimate-based work.",
  },
  {
    id: "strategist",
    title: "Dedicated strategist",
    description: "A named point of contact — not a ticket queue or rotating account manager.",
  },
  {
    id: "your-leads",
    title: "Your leads, your pipeline",
    description:
      "Leads from your ads and forms stay yours — never resold or shared with other contractors.",
  },
  {
    id: "launch",
    title: "Fast launch timelines",
    description: "Typical onboarding in ~48 hours — ads, forms, CRM, and follow-up wired together.",
  },
  {
    id: "no-lock-in",
    title: "No long-term contracts",
    description: "Month-to-month management. Ad spend stays on your Meta account, your control.",
  },
] as const;

export const PROBLEM_CARDS = [
  {
    title: "Leads arrive cold",
    description:
      "Contractors wait too long to respond and good prospects disappear.",
    icon: "clock",
  },
  {
    title: "Nobody tracks the pipeline",
    description:
      "Leads get stuck between phone calls, estimates, and follow-ups.",
    icon: "pipeline",
  },
  {
    title: "Ad spend feels invisible",
    description:
      "You know money went out, but not which leads became jobs.",
    icon: "spend",
  },
  {
    title: "Follow-up gets forgotten",
    description:
      "Most contractors lose jobs simply because nobody followed up twice.",
    icon: "forgot",
  },
] as const;

export const ONBOARDING_STEPS = [
  {
    id: "connect",
    title: "Connect",
    description:
      "We get access to your Meta business assets or help you set them up.",
    timing: "0–12 hrs",
    icon: "connect",
  },
  {
    id: "build",
    title: "Build",
    description:
      "We create your ads, lead form, CRM pipeline, and reporting dashboard.",
    timing: "12–36 hrs",
    icon: "build",
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Your campaign goes live with your credit card connected directly to Meta.",
    timing: "36–48 hrs",
    icon: "launch",
  },
  {
    id: "track",
    title: "Track",
    description:
      "Every lead appears in your Lupin dashboard and moves through the pipeline.",
    timing: "Day 1+",
    icon: "track",
  },
  {
    id: "optimize",
    title: "Optimize",
    description:
      "We review performance monthly and improve creative, targeting, and follow-up.",
    timing: "Monthly",
    icon: "optimize",
  },
] as const;

export const FOUNDING_PARTNER = {
  name: "Founding Partner Plan",
  introPrice: 299,
  regularPrice: 499,
  slotsTotal: 5,
  slotsRemaining: 5,
  slotsLabel: "Limited to 5 founding partners across Canada",
  currency: "CAD" as const,
  description:
    "The full contractor growth system at a lower entry point — ads, creative, capture, CRM, follow-up, and reporting. One management fee. No surprise add-ons.",
  includes: [
    "Meta Ads management",
    "Custom creative included",
    "Lead capture system",
    "Contractor CRM pipeline",
    "AI follow-up support",
    "Monthly reporting dashboard",
    "Launch in ~48 hours",
    "30-day management fee guarantee",
    "You own your Meta account and ad spend",
  ],
  footnote:
    "Management fee in CAD. Ad spend is separate and paid directly to Meta on your account — typically $2,000–$5,000/month depending on market and goals.",
} as const;

export const FOUNDING_PARTNER_SPOTS = [
  {
    id: 1,
    label: "Founding Partner Spot 1",
    status: "open" as const,
  },
  {
    id: 2,
    label: "Founding Partner Spot 2",
    status: "open" as const,
  },
  {
    id: 3,
    label: "Founding Partner Spot 3",
    status: "open" as const,
  },
] as const;

export type CaseStudyStatus = "published" | "sample" | "pending";

export type CaseStudyMetric = {
  value: string;
  label: string;
  highlight?: boolean;
};

export type CaseStudy = {
  id: string;
  client: string;
  trade: string;
  market: string;
  period: string;
  summary: string;
  metrics: readonly CaseStudyMetric[];
  status: CaseStudyStatus;
  statusLabel: string;
  featured?: boolean;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "sample-remodeling-gta",
    client: "Sample Contractor",
    trade: "Home Remodeling",
    market: "GTA West",
    period: "First 90 days",
    summary:
      "Illustrative results from a representative Lupin workflow — Meta Ads through CRM to closed jobs. Founding partner case studies will publish here with client approval and dashboard data.",
    status: "sample",
    statusLabel: "Illustrative example",
    featured: true,
    metrics: [
      { value: "17", label: "Qualified Leads" },
      { value: "8", label: "Appointments" },
      { value: "4", label: "Jobs Won" },
      { value: "$18,000", label: "Revenue Generated", highlight: true },
    ],
  },
  {
    id: "founding-slot-2",
    client: "Founding Partner",
    trade: "Your trade",
    market: "Your market",
    period: "—",
    summary:
      "Reserved for a founding partner ready to document real campaign results — leads, appointments, jobs won, and revenue from your Lupin dashboard.",
    status: "pending",
    statusLabel: "Case study pending",
    metrics: [
      { value: "—", label: "Qualified Leads" },
      { value: "—", label: "Appointments" },
      { value: "—", label: "Jobs Won" },
      { value: "—", label: "Revenue Generated" },
    ],
  },
  {
    id: "founding-slot-3",
    client: "Founding Partner",
    trade: "Your trade",
    market: "Your market",
    period: "—",
    summary:
      "Second open slot for a contractor who wants the full system and optional published results with their sign-off.",
    status: "pending",
    statusLabel: "Case study pending",
    metrics: [
      { value: "—", label: "Qualified Leads" },
      { value: "—", label: "Appointments" },
      { value: "—", label: "Jobs Won" },
      { value: "—", label: "Revenue Generated" },
    ],
  },
] as const;

export const PRICING_COMPARISON = {
  columns: [
    {
      id: "diy",
      name: "DIY Meta Ads",
      tagline: "Guesswork",
      subtitle: "You run ads yourself",
      highlighted: false,
    },
    {
      id: "agency",
      name: "Generic Agency",
      tagline: "Ads only",
      subtitle: "Management fee, limited stack",
      highlighted: false,
    },
    {
      id: "lupin",
      name: "Lupin Leads",
      tagline: "Full system",
      subtitle: "Ads + CRM + follow-up + reporting",
      highlighted: true,
    },
  ],
  rows: [
    { label: "Meta Ads setup & management", diy: "partial", agency: true, lupin: true },
    { label: "Custom ad creative", diy: false, agency: "partial", lupin: true },
    { label: "Lead capture forms", diy: false, agency: false, lupin: true },
    { label: "CRM pipeline", diy: false, agency: false, lupin: true },
    { label: "AI follow-up assistant", diy: false, agency: false, lupin: true },
    { label: "Monthly performance report", diy: false, agency: "partial", lupin: true },
    { label: "Click-to-closed job tracking", diy: false, agency: false, lupin: true },
  ],
} as const;

export const TESTIMONIALS: readonly {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
}[] = [];

export const FEATURES = [
  {
    title: "Meta Ads Management",
    description:
      "Facebook and Instagram campaigns built for your trade and service area — set up, optimized, and managed on your own Meta ad account.",
    icon: "target",
  },
  {
    title: "Custom Creative Included",
    description:
      "Ad copy and visuals tailored to your brand and offer. No extra agency fee for creative — it’s part of the system.",
    icon: "bolt",
  },
  {
    title: "Exclusive Lead Capture",
    description:
      "Branded forms collect project details, contact info, and timeline. Every lead is yours alone — never resold to competitors.",
    icon: "shield",
  },
  {
    title: "CRM Tracking",
    description:
      "Every lead from first click to won job lives in one pipeline. Stages, notes, job value, and follow-ups in a single place.",
    icon: "map",
  },
  {
    title: "AI Follow-Up",
    description:
      "Leads scored hot, warm, or cold with recommended next steps and draft SMS or email — so your crew responds while interest is high.",
    icon: "users",
  },
  {
    title: "Monthly Reporting",
    description:
      "Clear monthly reports on leads, cost per lead, pipeline, and closed revenue — tied to your real CRM data, not guesswork.",
    icon: "chart",
  },
] as const;

/** Six-step visual journey for How It Works — copy sourced from existing product messaging */
export const HOW_IT_WORKS_JOURNEY = [
  {
    id: "meta-ads",
    title: "Meta Ads",
    description:
      "Facebook and Instagram campaigns for your trade and area — managed on your own Meta ad account.",
  },
  {
    id: "lead-captured",
    title: "Lead Captured",
    description:
      "Branded forms collect project details and contact info. Exclusive to you — never resold.",
  },
  {
    id: "ai-follow-up",
    title: "AI Follow-Up",
    description:
      "Leads scored hot, warm, or cold with draft SMS or email so your crew responds fast.",
  },
  {
    id: "appointment-booked",
    title: "Appointment Booked",
    description:
      "Contact attempts and booked estimates tracked in CRM until a firm time is on your calendar.",
  },
  {
    id: "estimate-sent",
    title: "Estimate Sent",
    description:
      "Pipeline shows who received a quote, who needs follow-up, and who is ready to decide.",
  },
  {
    id: "job-won",
    title: "Job Won",
    description:
      "Closed job value logged and tied back to the original click — real data, not guesswork.",
  },
] as const;

export const BUILDER_CREDIBILITY = {
  eyebrow: "Behind Lupin",
  title: "Built By Someone Who Lives This Every Day.",
  paragraphs: [
    "Lupin wasn't built in a boardroom. It came from running campaigns, answering leads, and watching capable contractors lose jobs because follow-up was slow or scattered across inboxes.",
    "I've spent years in paid marketing — writing ads, reading form submissions, and learning which leads are worth a call. I've also run businesses where payroll, reputation, and a slow winter month matter more than a slide deck.",
    "Local contractors don't need another agency pitch. They need someone who understands that a lead on Tuesday affects your crew schedule on Thursday — and that ad spend feels personal when it's your account and your money.",
    "That's why Lupin is a working system: your Meta account, your pipeline, your reporting. Built the way I'd want it if I were in your chair.",
  ],
  pillars: [
    {
      title: "Paid marketing",
      body: "Meta campaigns run hands-on — targeting, creative, and spend reviewed regularly, not handed off and forgotten.",
    },
    {
      title: "Lead generation",
      body: "Forms and follow-up designed around how homeowners actually inquire — not shared lists or race-to-call chaos.",
    },
    {
      title: "Business ownership",
      body: "Recommendations weighed against payroll, seasonality, and cash flow — not vanity metrics on a monthly report.",
    },
    {
      title: "Local markets",
      body: "Realistic ad budgets for your trade and service area. An honest conversation before you commit to anything.",
    },
  ],
  pullQuote:
    "Hiring marketing help shouldn't feel like gambling. You should know what you're buying — and who you're working with.",
  assurance: [
    "The strategy call is a conversation, not a pressure close.",
    "We'll tell you plainly if Lupin isn't the right fit for your market or trade.",
    "Pricing and founding partner terms are on the page — no surprises on the call.",
  ],
} as const;

export const FAQ_ITEMS = [
  {
    question: "What does the 30-day satisfaction guarantee cover?",
    answer:
      "If you're not satisfied with Lupin's management in the first 30 days, we refund your Lupin management fee in full. Ad spend paid to Meta stays on your account — you keep ownership and control throughout.",
  },
  {
    question: "Is Lupin just a Facebook ads agency?",
    answer:
      "No. Lupin is a complete contractor growth system. We manage Meta Ads and custom creative, capture leads on branded forms, track them in CRM, power AI follow-up, and deliver monthly reporting. Ads are one piece — the system covers click to closed job.",
  },
  {
    question: "What's included in the Founding Partner program?",
    answer:
      "The Founding Partner Plan at $299 CAD for month one, then $499/mo locked in. Includes Meta Ads management, custom creative, lead capture, CRM pipeline, AI follow-up, monthly reporting, launch in ~48 hours, and a 30-day management fee guarantee. Limited to 5 founding partners across Canada — book a strategy call to apply.",
  },
  {
    question: "Does the $499 cover one campaign or multiple?",
    answer:
      "The $499/month is for managing your contractor growth system, not just one campaign. We may run one or multiple Meta campaigns depending on your trade, market, budget, and offer. The goal is not to sell \"campaigns\" — the goal is to generate and track booked jobs.",
  },
  {
    question: "Do I pay ad spend separately?",
    answer:
      "Yes. Your ad spend is paid directly from your own Meta ad account. You own the account, the data, and the spend. Lupin manages the strategy, creative, tracking, reporting, and optimization.",
  },
  {
    question: "Do you change the ads every month?",
    answer:
      "We do not rebuild everything for the sake of looking busy. We keep what works, kill what doesn't, and introduce new creative, offers, and campaigns when it makes sense.",
  },
  {
    question: "What types of contractors do you work with?",
    answer:
      "Home services and trades — roofing, remodeling, HVAC, plumbing, electrical, landscaping, windows, doors, and general contracting. If you sell estimates to homeowners, the system is built for you.",
  },
  {
    question: "How is this different from HomeAdvisor or Angi?",
    answer:
      "Those platforms sell shared leads. Lupin builds your own demand through Meta Ads, captures exclusive leads on your forms, and tracks them through CRM to close. You’re not racing four other contractors for the same name.",
  },
  {
    question: "How does lead tracking work from click to closed job?",
    answer:
      "Every step is logged: ad click, form submit, CRM entry, follow-up, appointment, estimate, and won job. Your team sees one pipeline. Monthly reports pull from that data so you know what spend produced — not just how many clicks you bought.",
  },
  {
    question: "How does the AI follow-up system work?",
    answer:
      "When a lead comes in, AI scores urgency, suggests the next action — call now, follow up tomorrow, send an estimate — and drafts SMS or email copy your team can send or adapt. It supports your crew; it doesn’t replace the relationship.",
  },
  {
    question: "How much should I budget for ad spend?",
    answer:
      "Most contractors start with $2,000–$5,000/month paid directly to Meta, on top of Lupin’s management fee. We’ll recommend a range based on your market, trade, and goals on the strategy call. Management fee and ad spend are separate by design.",
  },
] as const;

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Growth System",
    price: 499,
    interval: "month" as const,
    description: "The complete contractor growth system — your low-risk starting point.",
    features: [
      "Meta Ads setup and management",
      "Custom ad creative",
      "Lead capture forms",
      "CRM pipeline",
      "AI follow-up assistant",
      "Monthly performance report",
      "30-day satisfaction guarantee",
    ],
    highlighted: true,
    stripePriceEnvKey: "STRIPE_PRICE_SCOUT",
  },
  {
    id: "growth",
    name: "Growth",
    price: 699,
    interval: "month" as const,
    description: "For contractors ready to scale estimate volume with hands-on strategy.",
    features: [
      "Everything in Starter",
      "Dedicated strategist",
      "Weekly campaign optimization",
      "AI SMS & email drafts",
      "Branded PDF executive reports",
      "Priority support",
      "Click-to-closed job tracking",
    ],
    highlighted: false,
    stripePriceEnvKey: "STRIPE_PRICE_ALPHA",
  },
  {
    id: "scale",
    name: "Scale",
    price: 999,
    interval: "month" as const,
    description: "For established companies running serious ad spend across markets.",
    features: [
      "Everything in Growth",
      "Multi-location campaigns",
      "Custom integrations",
      "Executive reporting suite",
      "Quarterly strategy sessions",
      "Slack + phone support",
      "Dedicated account lead",
    ],
    highlighted: false,
    stripePriceEnvKey: "STRIPE_PRICE_PACK",
  },
] as const;
