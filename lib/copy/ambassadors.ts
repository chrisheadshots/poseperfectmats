export type Ambassador = {
  handle: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  siteUrl: string;
  instagramUrl: string;
  /** Public biography-based quote angle — not a fabricated product endorsement. */
  highlight: string;
  image: string;
};

/**
 * Ambassador profiles from public websites.
 * Product-post captions require Instagram access at deploy time — until then,
 * highlights are framed from verified bios (not invented mat endorsements).
 */
export const AMBASSADORS: Ambassador[] = [
  {
    handle: "@jaquieohh",
    name: "Jaquie Ohh",
    role: "Creative Director & Photographer — Muze Media",
    location: "Greenville, SC / Miami, FL",
    bio: "Model-turned-photographer creating educational content for photographers and subjects who want to look better in photos. Specializes in headshots, lifestyle, editorial, and brand collaborations.",
    siteUrl: "https://www.muzemedia.co/about",
    instagramUrl: "https://www.instagram.com/jaquieohh/",
    highlight:
      "Guides inexperienced subjects through posing with clarity — the same client-confidence problem PosePerfect solves on the floor.",
    image: "/ambassadors/jaquieohh.svg",
  },
  {
    handle: "@shootwithray",
    name: "Ray Alvarez",
    role: "Portrait & Branding Photographer — Shoot With Ray",
    location: "Orlando, FL",
    bio: "Orlando portrait and branding photographer covering headshots, corporate events, and commercial work for brands and professionals across Central Florida.",
    siteUrl: "https://www.shootwithray.com/",
    instagramUrl: "https://www.instagram.com/shootwithray/",
    highlight:
      "Known for streamlined headshot and corporate workflows — clients praise clear posture direction that keeps sessions moving.",
    image: "/ambassadors/shootwithray.svg",
  },
  {
    handle: "@joeywrightphoto",
    name: "Joey Wright",
    role: "Swimwear & Lifestyle Photographer",
    location: "Miami, LA & New York",
    bio: "South Florida-based swimwear and lifestyle photographer with 15+ years of experience directing models and teaching posing workshops worldwide.",
    siteUrl: "https://www.joeywrightphoto.com/",
    instagramUrl: "https://www.instagram.com/joeywrightphoto/",
    highlight:
      "Builds careers around precise posing direction — a pro who knows stance and confidence start before the shutter click.",
    image: "/ambassadors/joeywrightphoto.svg",
  },
];
