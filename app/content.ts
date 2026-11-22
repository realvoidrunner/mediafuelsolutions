// All the words and contact details on the site live here.
// Edit this file to change copy without touching the layout.

export const contact = {
  // TODO: replace these placeholders with your real details
  email: "hello@mediafuelsolutions.com",
  phoneDisplay: "+1 555 010 0000",
  phoneHref: "+15550100000", // digits only, with country code
  whatsapp: "15550100000", // digits only, with country code, no +
  hours: "Monday to Saturday, 10 am to 7 pm",
};

export type Service = {
  visual: "ads" | "landing" | "crm" | "followup";
  role: string;
  title: string;
  description: string;
  includes: string[];
  featured?: boolean;
};

// In the order a lead travels through them
export const services: Service[] = [
  {
    visual: "ads",
    role: "Core",
    title: "Google Ads and Meta Ads",
    description:
      "Ads on Google Search, Facebook and Instagram, aimed at people in your area who are already looking for what you offer.",
    includes: [
      "Campaign, keyword and audience setup",
      "Ad copy and creatives",
      "Weekly tuning to lower your cost per lead",
      "A budget you set and control",
    ],
  },
  {
    visual: "landing",
    role: "Supporting",
    title: "Landing pages",
    description:
      "A focused page for each offer that explains it clearly and makes enquiring easy, instead of sending ad clicks to a busy homepage.",
    includes: [
      "One page, one offer, one clear action",
      "Fast and built for phones first",
      "Enquiry form, click-to-call and WhatsApp button",
      "Tested and improved over time",
    ],
  },
  {
    visual: "crm",
    role: "Supporting",
    title: "Lead tracking and CRM",
    description:
      "Every enquiry lands in one place, tagged with the ad it came from, so you know exactly what you're paying for and nothing slips through.",
    includes: [
      "Forms, calls and WhatsApp in one list",
      "Source tracking for every lead",
      "Simple stages from new to booked",
      "CRM setup that fits your budget",
    ],
  },
  {
    visual: "followup",
    role: "What makes us different",
    title: "Automated lead follow-ups",
    description:
      "Most enquiries go to whoever replies first. New leads hear back from you within a minute, day or night, and get nudged until they book.",
    includes: [
      "Instant replies by WhatsApp, SMS or email",
      "Booking link straight into your calendar",
      "Reminders that cut no-shows",
      "Follow-ups for leads that went quiet",
    ],
    featured: true,
  },
];

export const industries = [
  "Clinics and dentists",
  "Salons and spas",
  "Gyms and fitness studios",
  "Home services and repairs",
  "Cleaning companies",
  "Real estate agents",
  "Coaches and consultants",
  "Law and accounting firms",
  "Education and tutoring",
];

export const reasons: { icon: "person" | "focus" | "unlock" | "chart"; title: string; body: string }[] = [
  {
    icon: "person",
    title: "You talk to the people doing the work",
    body: "No account managers passing messages along. You get answers from the person running your campaigns.",
  },
  {
    icon: "focus",
    title: "You're not one of hundreds",
    body: "We take on a small number of clients, so your account gets looked at every week.",
  },
  {
    icon: "unlock",
    title: "Start small, no long contracts",
    body: "Begin with one campaign. Stay because it's bringing in leads, not because you signed for a year.",
  },
  {
    icon: "chart",
    title: "Results you can count",
    body: "Every lead is tracked, so each month you see enquiries, cost per lead and appointments booked.",
  },
];

export const steps = [
  {
    title: "Free call",
    body: "A 30-minute chat about your business, your area and the kind of customers you want more of.",
  },
  {
    title: "Plan and quote",
    body: "A short written plan with your ad budget, our fixed monthly fee and what to expect.",
  },
  {
    title: "Build and launch",
    body: "We set up the ads, landing page, tracking and follow-ups, get your approval, then go live.",
  },
  {
    title: "Report and improve",
    body: "Each month you see leads, costs and bookings. We keep what works and fix what doesn't.",
  },
];

export const serviceOptions = [
  "Full setup, from ads to bookings",
  "Google Ads or Meta Ads",
  "A landing page",
  "Lead tracking and CRM",
  "Automated lead follow-ups",
  "Not sure yet",
];
