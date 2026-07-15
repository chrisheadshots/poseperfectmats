export type Review = {
  name: string;
  /** Shown when known (from the live Loox widget). Omitted when the metafield source has no date — never fabricated. */
  date?: string;
  body: string;
  product: string;
  personaTags: Array<
    "corporate" | "school" | "events" | "family" | "beginner" | "general"
  >;
  rating: 4 | 5;
  /** Marks this review as the lead spotlight quote for a persona page. */
  featured?: "corporate" | "school" | "events" | "family" | "beginner";
};

/**
 * Live Loox totals pulled from Shopify product metafields (namespace `loox`)
 * on 2026-07-14: branded 135 @ 4.7, unbranded 63 @ 4.6, Junior 3 @ 4.7,
 * posing guide 7 @ 4.3 → 208 reviews, 4.66 weighted (displayed as 4.6).
 * Refresh via `npm run refresh:reviews` (see scripts/refresh-reviews.mjs).
 */
export const LOOX_STATS = {
  count: 208,
  average: 4.6,
} as const;

/** Per-product Loox stats (same 2026-07-14 metafield pull). */
export const LOOX_STATS_BY_PRODUCT = {
  "standard-branded": { count: 135, average: 4.7 },
  "standard-unbranded": { count: 63, average: 4.6 },
  "junior-unbranded": { count: 3, average: 4.7 },
  "posing-guide": { count: 7, average: 4.3 },
} as const;

/** Real order volume from Shopify analytics (all-time, pulled 2026-07-14). */
export const ORDER_STATS = {
  totalOrders: 2973,
  label: "2,900+ orders shipped",
  asOf: "2026-07",
} as const;

export const REVIEWS: Review[] = [
  // ——— Corporate headshots ———
  {
    name: "Brian W.",
    body: "Easily took 1–2 minutes off of each headshot — with 200–250 back to back that pays off. And clients loved how simple it was.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "general"],
    rating: 5,
    featured: "corporate",
  },
  {
    name: "Brian",
    body: "Chris personally processed my order on the fly and got my mats delivered by the time I needed them for a 500+ person headshot job — used the mats for 3 days straight and the customers loved how easy it was to follow. It for sure cut out 1–2 minutes per headshot. Highly recommend.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "school"],
    rating: 5,
  },
  {
    name: "Kris I.",
    body: "The 16 actors loved how efficiently using the mat moved them along, and I got consistent poses for the lobby headshots.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "events"],
    rating: 5,
  },
  {
    name: "Serge",
    body: "I went with my daughter, who is the photographer, to a photo shoot with the municipal elected officials — even the clients really liked the mat. The time savings are huge.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "events"],
    rating: 5,
  },
  {
    name: "Lisette B.",
    body: "Used this mat for the first time at a corporate shoot and it was great. Made the images streamlined and the process of guiding people as to how to stand quick and efficient.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["corporate"],
    rating: 5,
  },
  {
    name: "Kevin",
    body: "Product was perfect for my corporate headshot session.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["corporate", "beginner"],
    rating: 5,
  },
  {
    name: "Roger B.",
    date: "2026-03-04",
    body: "Used it for the first time last week. What a time saver. Before, I spent so much time tweaking people's poses...\"Move 3 inches to your right--no, too far! Scooch an inch to your left.\" Makes for efficient, and consistent, headshots.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "beginner", "general"],
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
    name: "Quynh P.",
    body: "It's a heavy-duty rubber mat with a premium anti-slip backing that locks onto any surface, from hardwood to slick studio tile. Clear, color-coded footprint guides make positioning foolproof — clients walk up and know exactly where to stand. It completely eliminates the guesswork.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "general"],
    rating: 5,
  },

  // ——— School / volume ———
  {
    name: "John B.",
    date: "2025-09-17",
    body: "We've been shooting K-8 sports photos. The mat is awesome. It saves a ton of time as everyone gets the same simple message \"stand on the blue feet\". A great help to keep things on track.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["school", "general"],
    rating: 5,
    featured: "school",
  },
  {
    name: "Melissa L.",
    body: "I photographed a group of 75 high school students and this mat made the event go so much smoother! A must have for headshots.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["school"],
    rating: 5,
  },
  {
    name: "Michael P.",
    body: "Such a simple idea which genuinely does save lots of time and effort when doing multiple shots of teams and clubs.",
    product: "PosePerfect Mat™ Junior by Chris Headshots (UnBranded)",
    personaTags: ["school", "family"],
    rating: 5,
  },
  {
    name: "Charleston Photographer",
    body: "Extremely useful during volume photography evolutions. You can have both feet on the same color or alternate — it keeps the subject in the right spot consistently across images and makes it much easier.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["school", "corporate"],
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

  // ——— Events / photo booths ———
  {
    name: "Renata S.",
    body: "Great idea. Arrived in a timely manner. No surprises. I'll be using it this month for 65+ people whom I will photograph for headshots 5 minutes apart, so efficiency will be key.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["events", "corporate"],
    rating: 5,
    featured: "events",
  },
  {
    name: "Sabina D.",
    body: "It's really great. It saved so much time doing a shoot of 50 officials and created a perfect set of aligned images.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["events", "corporate"],
    rating: 5,
  },
  {
    name: "Kelly B.",
    body: "I'll be photographing close to 300+ people for our local PD, and I know this will help make things run so much more smoothly!",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["events", "school"],
    rating: 5,
  },
  {
    name: "Adrian O.",
    body: "It was easy to use, and I could get through my session with 40 people in a breeze.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["events", "general"],
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

  // ——— Family / mini sessions ———
  {
    name: "Shannon L.",
    body: "This makes directing the kids I work with in school photography so much easier.",
    product: "PosePerfect Mat™ Junior by Chris Headshots (UnBranded)",
    personaTags: ["family", "school"],
    rating: 5,
    featured: "family",
  },
  {
    name: "Adam J.",
    body: "Something so simple to guide clients into the right posable position. Cuts down the hassle of trying to tell them where to stand and which direction to face, all the while letting them feel like they are part of the process instead of being a prop. Highly recommended.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["family", "general"],
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
    name: "Michelle A.",
    date: "2025-09-23",
    body: "I love this mat! It made for perfect poses for my headshot clients! Just tell them what color to stand on and their images looked amazing!!",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["corporate", "family"],
    rating: 5,
  },

  // ——— Beginner / confidence ———
  {
    name: "Terry G.",
    body: "After buying, I have used this mat for 3 headshot sessions and can say that I have cut down on my time by several minutes each person. This mat makes it very easy to just say \"stand on the yellow\" and they do. Absolutely amazing product.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["beginner", "corporate"],
    rating: 5,
    featured: "beginner",
  },
  {
    name: "Christine V.",
    body: "My headshot photoshoots are going much faster and with better results! No more misunderstandings or insecurities on how you need to position yourself. Love it. Best buy in a long time!",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["beginner", "corporate"],
    rating: 5,
  },
  {
    name: "Linda B.",
    body: "The PosePerfect Mat is a game-changer for assisting clients in posing for headshots. The color-coded footprints make it a breeze to instruct the client into three positions. So glad I bought this mat!",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["beginner", "general"],
    rating: 5,
  },
  {
    name: "Harry E.",
    body: "I purchased both the posing mat and the posing guide and I couldn't be happier. The mat makes it so simple to direct clients during headshots — no more second guessing where they should stand. The posing guide gives quick references for different body angles and professional looks.",
    product: "PosePerfect Mat™ by Chris Headshots",
    personaTags: ["beginner", "corporate"],
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
    name: "Jasmin T.",
    date: "2025-10-21",
    body: "My headshots are so much smoother with the PosePerfect mat. No confusion or awkward moments during the sessions. I highly recommend!!",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["corporate", "beginner"],
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
  {
    name: "Gary S.",
    date: "2026-06-20",
    body: "The pose mat has transformed my clients experience and given me consistent efficiency with my photo shoots. Highly recommend — will grab another as a spare.",
    product: "PosePerfect Mat™ (UnBranded)",
    personaTags: ["general", "corporate"],
    rating: 5,
  },
];

/** Verified Loox review (branded mat, 2026-07-14 metafield pull). */
export const CASE_STUDY = {
  name: "Brian W., verified Loox buyer",
  quote:
    "Easily took 1–2 minutes off of each headshot — with 200–250 back to back, that pays off",
};

export function reviewsForPersona(
  persona: Review["personaTags"][number],
  limit = 3,
): Review[] {
  const tagged = REVIEWS.filter((r) => r.personaTags.includes(persona));
  const fallback = REVIEWS.filter((r) => r.personaTags.includes("general"));
  return [...tagged, ...fallback]
    .filter((r, i, arr) => arr.findIndex((x) => x.name === r.name) === i)
    .sort(
      (a, b) =>
        Number(b.featured === persona) - Number(a.featured === persona),
    )
    .slice(0, limit);
}
