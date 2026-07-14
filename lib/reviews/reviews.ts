export type Review = {
  name: string;
  date: string;
  body: string;
  product: string;
  personaTags: Array<
    "corporate" | "school" | "events" | "family" | "beginner" | "general"
  >;
  rating: 5;
};

/** Curated from live Loox widget (213 reviews, ~4.6★) — verified purchase language only. */
export const LOOX_STATS = {
  count: 213,
  average: 4.6,
} as const;

export const REVIEWS: Review[] = [
  {
    name: "Roger B.",
    date: "2026-03-04",
    body: "Used it for the first time last week. What a time saver. Before, I spent so much time tweaking people's poses...\"Move 3 inches to your right--no, too far! Scooch an inch to your left.\" Makes for efficient, and consistent, headshots.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "beginner", "general"],
    rating: 5,
  },
  {
    name: "John B.",
    date: "2025-09-17",
    body: "We've been shooting K-8 sports photos. The mat is awesome. It saves a ton of time as everyone gets the same simple message \"stand on the blue feet\". A great help to keep things on track.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["school", "general"],
    rating: 5,
  },
  {
    name: "Christian F.",
    date: "2025-07-07",
    body: "If you do headshots, portraits, or personal branding sessions, it's a game changer. It streamlines your workflow and takes away the need for constant posing direction. Clients really appreciate the extra guidance.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "beginner", "general"],
    rating: 5,
  },
  {
    name: "Melvin D.",
    date: "2025-04-21",
    body: "I recently was hired to do a large college shoot on campus and I was surprised how easily I was able to work with the students. For anyone doing head shots or especially volume head shots, this mat will serve you well.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["school", "corporate", "general"],
    rating: 5,
  },
  {
    name: "Kane T.",
    date: "2025-08-24",
    body: "So easy to direct the client to the correct amount of turn and feet spread. The feet markers give accurate 30 degree turn to offset the shoulders. Perfect set up every time.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "general"],
    rating: 5,
  },
  {
    name: "Jamie C.",
    date: "2025-06-17",
    body: "This was a FANTASTIC product! The subjects really appreciated the help it gave! I 100% loved it!",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["family", "events", "general"],
    rating: 5,
  },
  {
    name: "Gary S.",
    date: "2026-06-20",
    body: "The pose mat has transformed my clients experience and given me consistent efficiency with my photo shoots. Highly recommend — will grab another as a spare.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["general", "corporate"],
    rating: 5,
  },
  {
    name: "Jasmin T.",
    date: "2025-10-21",
    body: "My headshots are so much smoother with the PosePerfect mat. No confusion or awkward moments during the sessions. I highly recommend!!",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["corporate", "beginner"],
    rating: 5,
  },
  {
    name: "Michelle A.",
    date: "2025-09-23",
    body: "I love this mat! It made for perfect poses for my headshot clients! Just tell them what color to stand on and their images looked amazing!!",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "family"],
    rating: 5,
  },
  {
    name: "Manuel R.",
    date: "2026-01-12",
    body: "I no longer had to place masking tape or duck tape. I just laid down the mat and that was it. Well done!",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["events", "general"],
    rating: 5,
  },
  {
    name: "Liza H.",
    date: "2025-10-28",
    body: "Made my job so much easier. No thinking just advising! Clients all thought it was cool!",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["events", "family"],
    rating: 5,
  },
  {
    name: "Michael M.",
    date: "2025-10-28",
    body: "Worked like a charm, and made it easy to direct models who aren't used to taking photos. Great product, and I love the option to remove your logo.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["events", "beginner"],
    rating: 5,
  },
];

/** On-page case study seed (official product page). */
export const CASE_STUDY = {
  name: "Sarah M., Professional Photographer",
  quote: "Saved me 4 hours on a 200-person corporate headshot day",
};

export function reviewsForPersona(
  persona: Review["personaTags"][number],
  limit = 3,
): Review[] {
  const tagged = REVIEWS.filter((r) => r.personaTags.includes(persona));
  const fallback = REVIEWS.filter((r) => r.personaTags.includes("general"));
  return [...tagged, ...fallback]
    .filter(
      (r, i, arr) => arr.findIndex((x) => x.name === r.name) === i,
    )
    .slice(0, limit);
}
