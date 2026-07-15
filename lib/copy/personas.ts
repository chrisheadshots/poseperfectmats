import type { PersonaKey } from "@/lib/catalog/catalog";

export type FaqItem = {
  question: string;
  answer: string;
};

export type PersonaCopy = {
  key: PersonaKey;
  path: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  heroImage: string;
  heroAlt: string;
  problemTitle: string;
  problemBody: string;
  faqs: FaqItem[];
};

export const SITE = {
  name: "PosePerfect Mat™",
  url: "https://poseperfectmats.com",
  poweredBy: "Powered by Fail Up Inc.",
  instagramHandle: "@poseperfectmats",
  instagramUrl: "https://www.instagram.com/poseperfectmats/",
  heroHeadline:
    "Stop Repositioning Every Client. Put Their Feet Where the Perfect Shot Starts.",
  heroSubheadline:
    "PosePerfect Mat™ is the physical SOP for photographers who shoot people for a living — color-coded footprints so clients stand correctly in seconds, the line keeps moving, and you stop burning billable minutes on the same five instructions.",
  primaryCta: "Add PosePerfect Mat™ — $44.99",
  secondaryCta: "See the system",
} as const;

export const MASTER_FAQS: FaqItem[] = [
  {
    question: "Will the mat show in the final photo?",
    answer:
      "For headshots and most portraits, frame and crop so feet sit below the final crop. Many photographers leave the mat just outside the usable frame, or remove it for wide group shots after everyone is placed.",
  },
  {
    question: "What size is it, and who is Junior for?",
    answer:
      "Standard mats are 18\" × 30\". Junior is built for smaller subjects, kids, and second stations on school or family days. The Family & Volume Pack includes Standard + Junior.",
  },
  {
    question: "Branded vs Unbranded — which should I buy?",
    answer:
      "Branded ($44.99) is the most popular pick — 135 verified Loox reviews at 4.7★ and the lowest price. Unbranded ($54.99) keeps a clean, logo-free look for premium studios and full-length framing; buyers specifically praise the option to remove the logo.",
  },
  {
    question: "Is it better than tape or floor dots?",
    answer:
      "Tape marks a point. PosePerfect teaches the stance with color-coded footprints, no residue, and a repeatable system assistants can follow. Reviewers specifically call out ditching masking tape once the mat arrives.",
  },
  {
    question: "What surfaces does it work on?",
    answer:
      "Anti-slip rubber backing grips best on hardwood, concrete, tile, and low-pile carpet. On plush carpet a few reviewers note slight shifting — press it flat and reposition between groups, or gaffer-tape the corners for all-day stations. Wipe clean between sessions.",
  },
  {
    question: "How durable is it, and how should I store it?",
    answer:
      "Built for back-to-back picture days — many volume shooters keep a spare for heavy seasons. To protect the print, store it flat or loosely rolled print-side out; the most common complaint in critical reviews is cracking or fading after long storage tightly rolled. Wipe clean with a soft damp cloth.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "US orders ship free on the economy tier, typically arriving within 5–7 business days after 3–5 days of processing. International orders (27 countries via USPS/DHL) are calculated at checkout and can add customs time — several reviewers recommend ordering well ahead of a booked shoot.",
  },
  {
    question: "What if the stance feels too wide for a client?",
    answer:
      "The yellow footprints mark the widest stance. For petite clients or a narrower look, cue the inner edge of the yellow feet — same turn, tighter base. Reviewers use this exact adjustment for smaller-framed clients.",
  },
  {
    question: "Do quantity discounts and bundles work at checkout?",
    answer:
      "Family & Volume Pack and Mat + Guide Bundle are single Shopify products. Multi-buy tiers (2–5 mats at 15–30% off) apply when Fail Up Inc.’s automatic discounts fire on Shopify checkout after cart handoff.",
  },
  {
    question: "What is your return policy?",
    answer:
      "The product page offers a 30-day money-back style trial. Fail Up Inc.’s global refund policy historically restricted returns on sale items — if you need a return, contact support@failupinc.com promptly with your order so they can honor the product-page guarantee language. Buyers with damaged prints report receiving free replacements.",
  },
];

export const PERSONAS: Record<Exclude<PersonaKey, "master">, PersonaCopy> = {
  corporate: {
    key: "corporate",
    path: "/corporate-headshots",
    navLabel: "Corporate headshots",
    eyebrow: "Corporate & LinkedIn days",
    headline:
      "Move 200 employees through headshots without repeating “step left” 200 times.",
    subheadline:
      "Give nervous teams one clear cue — put their feet on the colors — and keep the line moving through every conference-room station.",
    primaryCta: "Build My Headshot-Day Kit",
    heroImage:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/poseperfect-mat-hero.png?v=1782353205",
    heroAlt: "PosePerfect Mat ready for a corporate headshot station",
    problemTitle: "Open sessions create bottlenecks.",
    problemBody:
      "Corporate days fail when every employee needs the same verbal corrections. PosePerfect standardizes stance so you protect crop consistency and finish on time.",
    faqs: [
      {
        question: "Will it look professional in an office?",
        answer:
          "Yes — especially Unbranded. Clients step on, you shoot, and final headshot crops never need to include the mat.",
      },
      {
        question: "How many mats for 100+ employees?",
        answer:
          "One mat per station. Use the Volume Builder for 2–3 mats so assistants can run parallel lines without reinventing placement.",
      },
      {
        question: "Does it work on carpeted conference rooms?",
        answer:
          "Anti-slip backing grips low-pile office carpet well. On plush carpet, press it flat and reposition between groups — or gaffer-tape the corners for an all-day station.",
      },
    ],
  },
  school: {
    key: "school",
    path: "/school-volume",
    navLabel: "School & volume",
    eyebrow: "School · sports · volume studios",
    headline: "Standardize stance at every station — even with new assistants.",
    subheadline:
      "Picture day needs speed and structure. One message — “stand on the blue feet” — keeps K-8, sports, and volume lines consistent across operators.",
    primaryCta: "Shop Volume Packs",
    heroImage:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/11928183723383658915_2048.jpg?v=1774391970",
    heroAlt: "PosePerfect Mat Junior for high-volume school photography",
    problemTitle: "Consistency matters when you shoot hundreds in a day.",
    problemBody:
      "Students drift. Assistants vary. Retakes pile up. PosePerfect turns subject placement into a physical SOP your whole team can run.",
    faqs: [
      {
        question: "Will kids understand it?",
        answer:
          "Volume shooters report a single cue works: stand on the color. Junior mats help smaller subjects at second stations.",
      },
      {
        question: "How do I outfit a multi-station day?",
        answer:
          "Start with the Family & Volume Pack (Standard + Junior), then add mats in the Volume Builder for 15–30% multi-buy savings.",
      },
      {
        question: "Is it durable enough for picture day abuse?",
        answer:
          "Rated for 1000+ sessions with wipe-clean care — built for back-to-back school and sports days.",
      },
    ],
  },
  events: {
    key: "events",
    path: "/event-photo-booths",
    navLabel: "Events & booths",
    eyebrow: "Photo booths · weddings · activations",
    headline: "Make guests stand in the right spot without stopping the party.",
    subheadline:
      "Self-serve booths and event lines move faster when guests have a visual mark — not an attendant repeating “step left.”",
    primaryCta: "Get the Event Booth Mat",
    heroImage:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/PPM_Mockup_3.png?v=1774391500",
    heroAlt: "PosePerfect Mat for event photo booth setups",
    problemTitle: "Guests crowd the booth and ruin spacing.",
    problemBody:
      "Event energy is chaos by default. A floor stance system keeps groups framed, shareable, and moving — without awkward operator nagging.",
    faqs: [
      {
        question: "Can guests use it without an attendant?",
        answer:
          "Color-coded footprints are designed for instant understanding — perfect for semi-self-serve booths.",
      },
      {
        question: "Will it match my event aesthetic?",
        answer:
          "Choose Unbranded for a cleaner look under lights. Frame above the mat so the final image stays on-brand.",
      },
      {
        question: "Is it portable between venues?",
        answer:
          "18\" × 30\" rolls/packs with your kit. Anti-slip backing grips common venue floors.",
      },
    ],
  },
  family: {
    key: "family",
    path: "/family-sessions",
    navLabel: "Family sessions",
    eyebrow: "Minis · families · studio portraits",
    headline: "Keep mini-sessions moving when families don’t know where to stand.",
    subheadline:
      "Kids wander. Parents hesitate. A simple visual cue settles everyone into place so you protect your mini-day schedule.",
    primaryCta: "Save Time on My Next Mini Day",
    heroImage:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/PosePerfect-Mockup-4.jpg?v=1774391759",
    heroAlt: "PosePerfect Mat for family and mini sessions",
    problemTitle: "Positioning eats the session before expression starts.",
    problemBody:
      "Families feel awkward when they are corrected. Let the mat give the first instruction so you can coach smiles, not feet.",
    faqs: [
      {
        question: "Will clients think it looks silly?",
        answer:
          "Most clients find clear cues comforting. Photographers report subjects appreciate the guidance.",
      },
      {
        question: "What about toddlers and kids?",
        answer:
          "Junior + Standard in the Family & Volume Pack covers mixed ages across stations or setups.",
      },
      {
        question: "How do I clean between families?",
        answer:
          "Wipe-clean polyester surface — built for back-to-back mini days.",
      },
      {
        question: "What if the stance is too wide for kids or petite parents?",
        answer:
          "Cue the inner edge of the yellow footprints for a narrower base, or use the Junior mat for smaller subjects — same turn, tighter stance.",
      },
    ],
  },
  beginner: {
    key: "beginner",
    path: "/beginner-photographers",
    navLabel: "Beginners",
    eyebrow: "New photographers · side hustlers",
    headline: "A simple posing shortcut when you’re tired of guessing what to say.",
    subheadline:
      "Start every subject in a proven stance. Pair the mat with the Advanced Posing Guide when you want the language and the floor cue together.",
    primaryCta: "Get Mat + Posing Guide",
    heroImage:
      "https://cdn.shopify.com/s/files/1/0817/9099/2702/files/PPM_Guide_Mockup_Main.png?v=1755061597",
    heroAlt: "PosePerfect Mat Advanced Posing Guide for beginner photographers",
    problemTitle: "Direction is the hard part of looking professional.",
    problemBody:
      "You already own lights and a camera. PosePerfect gives you a repeatable first instruction so early sessions feel confident instead of chaotic.",
    faqs: [
      {
        question: "Is this only for pros?",
        answer:
          "No — many buyers use it for first paid headshots and local sessions. The Mat + Guide Bundle is built for that ramp-up.",
      },
      {
        question: "What poses does it help with?",
        answer:
          "Standing headshots and portrait baselines — foot placement, turn, and weight shift. Fine-tune expression and arms after the stance is set.",
      },
      {
        question: "Should I get branded or unbranded?",
        answer:
          "Branded is more affordable to start; Unbranded looks cleaner on camera if you’ll shoot full-length content.",
      },
    ],
  },
};

export const PERSONA_LIST = Object.values(PERSONAS);

export type RoiDefaults = {
  subjects: number;
  minutesSavedPerSubject: number;
  hourlyValue: number;
  jobsPerMonth: number;
  subjectsLabel?: string;
};

/**
 * Persona-tuned ROI calculator defaults. Minutes-saved stays inside the
 * 1–2 min/headshot range verified buyers report (Brian W., Brian, Terry G.).
 */
export const PERSONA_ROI_DEFAULTS: Record<
  Exclude<PersonaKey, "master">,
  RoiDefaults
> = {
  corporate: {
    subjects: 150,
    minutesSavedPerSubject: 2,
    hourlyValue: 150,
    jobsPerMonth: 2,
    subjectsLabel: "Employees per headshot day",
  },
  school: {
    subjects: 300,
    minutesSavedPerSubject: 1,
    hourlyValue: 100,
    jobsPerMonth: 4,
    subjectsLabel: "Students per picture day",
  },
  events: {
    subjects: 200,
    minutesSavedPerSubject: 1,
    hourlyValue: 125,
    jobsPerMonth: 3,
    subjectsLabel: "Guests per event",
  },
  family: {
    subjects: 8,
    minutesSavedPerSubject: 8,
    hourlyValue: 175,
    jobsPerMonth: 6,
    subjectsLabel: "Mini sessions per day",
  },
  beginner: {
    subjects: 10,
    minutesSavedPerSubject: 5,
    hourlyValue: 75,
    jobsPerMonth: 4,
    subjectsLabel: "Subjects per session",
  },
};
