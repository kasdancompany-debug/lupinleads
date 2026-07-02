import { FOUNDING_PARTNER } from "@/lib/constants";

export type TradeFaqItem = {
  question: string;
  answer: string;
};

export type TradeLandingPageData = {
  slug: string;
  tradeName: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineHighlight: string;
    subheadline: string;
  };
  painPoints: {
    title: string;
    description: string;
  }[];
  howWeHelp: {
    title: string;
    description: string;
  }[];
  faq: TradeFaqItem[];
};

export const TRADE_LANDING_SYSTEM_FEATURES = FOUNDING_PARTNER.includes;

const SHARED_FAQ_TAIL: TradeFaqItem[] = [
  {
    question: "Is ad spend included in the monthly fee?",
    answer:
      "No. The management fee covers the system and campaign work. Ad spend is paid separately and directly to Meta on your account.",
  },
  {
    question: "Do I need a full website to start?",
    answer:
      "No. We build dedicated landing pages for your campaigns with quote forms, tracking, and CRM integration.",
  },
];

export const TRADE_LANDING_PAGES: TradeLandingPageData[] = [
  {
    slug: "facebook-ads-for-roofers",
    tradeName: "roofers",
    meta: {
      title: "Facebook Ads for Roofers — Leads, CRM & Follow-Up",
      description:
        "Lupin Leads helps roofing contractors turn Facebook and Instagram ads into tracked quote requests — with landing pages, CRM, and reporting built in.",
    },
    hero: {
      eyebrow: "Roofing contractors · Canada",
      headlineLead: "Facebook ads that fill your",
      headlineHighlight: "roofing estimate calendar.",
      subheadline:
        "Lupin Leads gives roofing companies the ads, landing pages, CRM, and follow-up system to turn local homeowners into inspection and quote requests you can actually track.",
    },
    painPoints: [
      {
        title: "Slow seasons hit hard",
        description:
          "Referrals dip and the schedule has gaps — but guessing at Meta ads without a real follow-up system rarely fixes it.",
      },
      {
        title: "Leads disappear in the chaos",
        description:
          "Storm season, voicemails, and crew schedules mean quote requests get lost before anyone calls back.",
      },
      {
        title: "You can't see what closed",
        description:
          "Ad dashboards show clicks, not which inquiries became inspections, estimates, or signed jobs.",
      },
    ],
    howWeHelp: [
      {
        title: "Campaigns built for roofing offers",
        description:
          "Replacement, repair, and inspection campaigns targeted to your service area — on your Meta account, your budget.",
      },
      {
        title: "Landing pages that capture real project detail",
        description:
          "Homeowners submit roof type, timeline, and contact info through branded forms — not generic contact blasts.",
      },
      {
        title: "Pipeline from lead to booked job",
        description:
          "Every inquiry lands in your CRM so your office can track calls, estimates, and wins in one place.",
      },
    ],
    faq: [
      {
        question: "Does Facebook advertising work for roofing companies?",
        answer:
          "Yes — when the offer, targeting, and follow-up match how homeowners actually shop for roof work. We focus on quote requests in your service area, not vanity reach.",
      },
      {
        question: "What roofing services can we advertise?",
        answer:
          "Full replacements, repairs, inspections, metal roofing, and seasonal promotions. We tailor creative and forms to what you want more of.",
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: "facebook-ads-for-hvac",
    tradeName: "HVAC contractors",
    meta: {
      title: "Facebook Ads for HVAC — Quote Requests & CRM",
      description:
        "Get more HVAC service and install leads from Facebook and Instagram ads — with landing pages, lead tracking, and a contractor CRM from Lupin Leads.",
    },
    hero: {
      eyebrow: "HVAC contractors · Canada",
      headlineLead: "Turn Meta ads into",
      headlineHighlight: "HVAC quote requests.",
      subheadline:
        "Lupin Leads helps HVAC companies run Facebook and Instagram campaigns, capture service and install inquiries, and track every lead through booked estimates.",
    },
    painPoints: [
      {
        title: "Emergency calls aren't predictable",
        description:
          "You need a steady pipe of install and maintenance quotes — not just whatever rings through on a busy Saturday.",
      },
      {
        title: "Shared leads waste your time",
        description:
          "Marketplace leads often go to multiple companies. You're racing to call back the same homeowner as everyone else.",
      },
      {
        title: "Dispatch and sales live in different places",
        description:
          "Without one pipeline, it's hard to know which ads produced booked tune-ups, replacements, or duct jobs.",
      },
    ],
    howWeHelp: [
      {
        title: "Ads for installs, service, and seasonal pushes",
        description:
          "Campaigns aligned to furnaces, AC, heat pumps, and maintenance plans — geo-targeted to neighborhoods you actually serve.",
      },
      {
        title: "Forms that qualify the job",
        description:
          "Capture equipment age, issue type, and address so your team knows whether it's a service call or a sales opportunity.",
      },
      {
        title: "CRM your office can use",
        description:
          "Track contact attempts, scheduled estimates, and closed jobs without juggling spreadsheets and inboxes.",
      },
    ],
    faq: [
      {
        question: "Can Facebook ads work for HVAC in competitive markets?",
        answer:
          "They can when targeting, offers, and landing pages are specific to your services and area. We start with a strategy call to see if the math makes sense for your market.",
      },
      {
        question: "Do you run ads for both residential and light commercial HVAC?",
        answer:
          "We primarily work with residential HVAC and home-service contractors. Tell us your mix on the strategy call and we'll plan accordingly.",
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: "facebook-ads-for-plumbers",
    tradeName: "plumbers",
    meta: {
      title: "Facebook Ads for Plumbers — Local Leads & Pipeline",
      description:
        "Lupin Leads helps plumbing contractors get quote requests from Facebook and Instagram ads — with campaign management, landing pages, and CRM included.",
    },
    hero: {
      eyebrow: "Plumbing contractors · Canada",
      headlineLead: "More plumbing estimates from",
      headlineHighlight: "Facebook & Instagram.",
      subheadline:
        "Run Meta ads, capture homeowner project details, and track every plumbing lead from first click through booked work — one system, founder-led.",
    },
    painPoints: [
      {
        title: "You're reactive, not proactive",
        description:
          "Emergency work fills the day, but repipes, water heaters, and remodel rough-ins need a predictable lead flow.",
      },
      {
        title: "Missed calls mean missed revenue",
        description:
          "When you're on a job site, voicemails and form fills stack up — and the homeowner hires whoever responds first.",
      },
      {
        title: "Agencies stop at the lead",
        description:
          "Most ad vendors send a notification and disappear. You still need follow-up, scheduling, and visibility into what closed.",
      },
    ],
    howWeHelp: [
      {
        title: "Local campaigns for the work you want",
        description:
          "Promote installs, repairs, drain work, or bathroom projects to homeowners in your defined service area.",
      },
      {
        title: "Quote forms on dedicated landing pages",
        description:
          "No website rebuild required — we launch pages built to capture job type, urgency, and contact details.",
      },
      {
        title: "Track every lead to booked job",
        description:
          "Your CRM shows who's new, who's waiting on an estimate, and what actually converted from ad spend.",
      },
    ],
    faq: [
      {
        question: "Is Facebook advertising worth it for plumbers?",
        answer:
          "It can be for larger ticket jobs and planned work — repipes, water heaters, renovations — where a tracked quote request is worth the follow-up. We walk through realistic budgets on a strategy call.",
      },
      {
        question: "Can we advertise emergency plumbing?",
        answer:
          "Emergency demand is unpredictable on paid social. We typically focus campaigns on planned projects and installs where forms and follow-up convert reliably.",
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: "facebook-ads-for-landscapers",
    tradeName: "landscapers",
    meta: {
      title: "Facebook Ads for Landscapers — Booked Consultations",
      description:
        "Landscaping and lawn care contractors: get more project inquiries from Meta ads with Lupin Leads — ads, landing pages, CRM, and reporting in one place.",
    },
    hero: {
      eyebrow: "Landscaping contractors · Canada",
      headlineLead: "Landscaping leads that move to",
      headlineHighlight: "on-site estimates.",
      subheadline:
        "Lupin Leads helps landscapers and lawn care companies turn Facebook and Instagram traffic into tracked consultation requests — not just likes on project photos.",
    },
    painPoints: [
      {
        title: "Seasonality swings are brutal",
        description:
          "Spring and fall are packed; winter planning matters. You need leads you can schedule, not random DMs.",
      },
      {
        title: "Visual work, invisible results",
        description:
          "Your portfolio is strong, but without tracking you don't know which ads brought $30k patio jobs vs tire-kickers.",
      },
      {
        title: "Quoting takes time you don't have",
        description:
          "Driving to consultations that go nowhere hurts. Better intake upfront saves hours every week.",
      },
    ],
    howWeHelp: [
      {
        title: "Campaigns for design-build and maintenance",
        description:
          "Promote hardscaping, full-yard projects, seasonal cleanups, or maintenance plans to homeowners in your radius.",
      },
      {
        title: "Forms that filter project scope",
        description:
          "Capture yard size, project type, budget range, and timeline so you quote the right jobs first.",
      },
      {
        title: "Pipeline for consultations and closes",
        description:
          "See which leads booked a site visit, received a proposal, and signed — tied back to ad spend.",
      },
    ],
    faq: [
      {
        question: "Do Facebook ads work for landscaping companies?",
        answer:
          "Yes for design-build, hardscaping, and full-property projects where homeowners research online before requesting a consultation. We match creative to the work you want more of.",
      },
      {
        question: "Can this work for lawn care and maintenance too?",
        answer:
          "Often for higher-ticket maintenance packages or bundled seasonal services. We'll be direct on the strategy call if paid social fits your average job size.",
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: "facebook-ads-for-electricians",
    tradeName: "electricians",
    meta: {
      title: "Facebook Ads for Electricians — Quote Requests & CRM",
      description:
        "Electrical contractors: Lupin Leads runs Meta ads, builds landing pages, and wires leads into a CRM so you can track panels, EV chargers, and reno work from click to close.",
    },
    hero: {
      eyebrow: "Electrical contractors · Canada",
      headlineLead: "Electrical quote requests from",
      headlineHighlight: "Meta ads — tracked.",
      subheadline:
        "Lupin Leads gives electricians the ads, landing pages, CRM, and follow-up visibility to turn local homeowners into panel upgrades, EV installs, and reno inquiries you can manage.",
    },
    painPoints: [
      {
        title: "High-value jobs need better intake",
        description:
          "Panel upgrades and rewires need qualified homeowners — not vague \"need an electrician\" messages with no scope.",
      },
      {
        title: "Referrals cap your growth",
        description:
          "GC relationships are great, but they don't fill the calendar when you want to add a crew or a service truck.",
      },
      {
        title: "No line of sight after the ad click",
        description:
          "Without a pipeline, you can't tell which campaigns produced booked estimates vs wasted afternoons.",
      },
    ],
    howWeHelp: [
      {
        title: "Ads for panels, EV, and residential reno",
        description:
          "Campaigns focused on the electrical work you want — upgrades, additions, smart home, and remodel support.",
      },
      {
        title: "Landing pages with real job context",
        description:
          "Forms ask about project type, home age, and timeline so estimators know what they're walking into.",
      },
      {
        title: "CRM built for contractor sales",
        description:
          "Track outreach, scheduled estimates, and won jobs — founder-led setup, not a generic agency handoff.",
      },
    ],
    faq: [
      {
        question: "Are Facebook ads a fit for electrical contractors?",
        answer:
          "They're a strong fit for planned residential work — panel upgrades, EV chargers, basement finishes — where homeowners compare quotes. We map your services and area on a strategy call first.",
      },
      {
        question: "Do you work with residential electricians only?",
        answer:
          "Our system is built for home-service contractors selling estimates to homeowners. Light commercial can be discussed case by case.",
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
  {
    slug: "facebook-ads-for-painters",
    tradeName: "painters",
    meta: {
      title: "Facebook Ads for Painters — Interior & Exterior Leads",
      description:
        "Painting contractors: get more estimate requests from Facebook and Instagram with Lupin Leads — campaign management, landing pages, CRM, and monthly reporting.",
    },
    hero: {
      eyebrow: "Painting contractors · Canada",
      headlineLead: "Painting estimates from",
      headlineHighlight: "Facebook ads that convert.",
      subheadline:
        "Lupin Leads helps painting companies capture interior and exterior project inquiries, respond faster, and track every lead from ad click to booked job.",
    },
    painPoints: [
      {
        title: "Price shoppers flood your inbox",
        description:
          "Without qualifying questions upfront, you spend evenings quoting jobs that were never going to hire you.",
      },
      {
        title: "Seasonal demand is uneven",
        description:
          "Exterior season is short. You need a predictable flow of interior and commercial-residential work year-round.",
      },
      {
        title: "Boosting posts isn't a system",
        description:
          "Random engagement doesn't replace targeted ads, proper forms, and follow-up when someone's ready to paint.",
      },
    ],
    howWeHelp: [
      {
        title: "Campaigns for interior, exterior, and cabinets",
        description:
          "Promote the services you want to grow — whole-home repaints, accent walls, or cabinet refinishing — locally on Meta.",
      },
      {
        title: "Landing pages with project detail",
        description:
          "Homeowners share rooms, square footage, timeline, and photos so your estimators prioritize real opportunities.",
      },
      {
        title: "Follow-up you can see",
        description:
          "CRM stages for contacted, quoted, and booked — so good leads don't die while you're on a ladder.",
      },
    ],
    faq: [
      {
        question: "Do Facebook ads work for painting contractors?",
        answer:
          "Yes for residential interior and exterior projects where homeowners request quotes online. Creative and forms are tailored to your finishes and service area.",
      },
      {
        question: "Can we promote cabinet painting or specialty finishes?",
        answer:
          "Absolutely. We align ad messaging and form questions to the services you want to sell — not generic house painting only.",
      },
      ...SHARED_FAQ_TAIL,
    ],
  },
];

export const TRADE_LANDING_SLUGS = TRADE_LANDING_PAGES.map((page) => page.slug);

const tradePageBySlug = new Map(TRADE_LANDING_PAGES.map((page) => [page.slug, page]));

export function getTradeLandingPage(slug: string): TradeLandingPageData | undefined {
  return tradePageBySlug.get(slug);
}
