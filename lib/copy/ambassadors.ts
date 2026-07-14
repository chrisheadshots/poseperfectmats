export type Ambassador = {
  handle: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  years?: string;
  specialty?: string;
  accomplishments?: string[];
  siteUrl: string;
  instagramUrl: string;
  /** Framed from public bio / brand positioning — not a fabricated mat endorsement. */
  highlight: string;
  image: string;
};

/**
 * Profiles synthesized from public websites (Muze Media, Shoot With Ray,
 * Joey Wright Photo). Follower counts / unverified awards are omitted.
 */
export const AMBASSADORS: Ambassador[] = [
  {
    handle: "@jaquieohh",
    name: "Jaquie Ohh",
    role: "Creative Director & Photographer — Muze Media",
    location: "Greenville, SC / Miami, FL",
    years: "Model-turned-photographer building education for real subjects",
    specialty: "Headshots, lifestyle, editorial, brand collaborations",
    accomplishments: [
      "Leads Muze Media creative direction and photographer education",
      "Known for teaching subjects how to look confident on camera",
      "Works across headshot, lifestyle, and commercial collaborations",
    ],
    bio: "Jaquie Ohh is a model-turned-photographer creating educational content for photographers and subjects who want to look better in photos. Through Muze Media she specializes in headshots, lifestyle, editorial, and brand work — with a focus on clear direction for inexperienced clients.",
    siteUrl: "https://www.muzemedia.co/about",
    instagramUrl: "https://www.instagram.com/jaquieohh/",
    highlight:
      "She builds confidence before the shutter — the same clarity PosePerfect puts on the floor for every client who freezes in frame.",
    image: "/ambassadors/jaquieohh.png",
  },
  {
    handle: "@shootwithray",
    name: "Ray Alvarez",
    role: "Portrait & Branding Photographer — Shoot With Ray",
    location: "Orlando, FL",
    years: "Central Florida portrait & commercial operator",
    specialty: "Headshots, corporate events, branding, commercial",
    accomplishments: [
      "Serves professionals and brands across Central Florida",
      "Specializes in efficient headshot and corporate event workflows",
      "Client-facing direction focused on posture and polish",
    ],
    bio: "Ray Alvarez is an Orlando portrait and branding photographer covering headshots, corporate events, and commercial work for brands and professionals. His sessions depend on clear, fast subject positioning — the difference between a smooth library day and a stalled line.",
    siteUrl: "https://www.shootwithray.com/",
    instagramUrl: "https://www.instagram.com/shootwithray/",
    highlight:
      "Corporate and branding days reward photographers who systematize stance — Ray’s world is exactly where a posing mat becomes infrastructure.",
    image: "/ambassadors/shootwithray.png",
  },
  {
    handle: "@joeywrightphoto",
    name: "Joey Wright",
    role: "Swimwear & Lifestyle Photographer",
    location: "Miami · LA · New York",
    years: "15+ years directing models & teaching posing",
    specialty: "Swimwear, lifestyle, workshops worldwide",
    accomplishments: [
      "15+ years photographing swimwear and lifestyle",
      "Teaches posing workshops for models and photographers",
      "Works across Miami, Los Angeles, and New York markets",
    ],
    bio: "Joey Wright is a South Florida-based swimwear and lifestyle photographer with 15+ years directing models and teaching posing workshops worldwide. Stance, tension, and confidence are his craft — long before retouching enters the chat.",
    siteUrl: "https://www.joeywrightphoto.com/",
    instagramUrl: "https://www.instagram.com/joeywrightphoto/",
    highlight:
      "When your career is built on precise posing direction, you understand: the shot starts with the feet — not the Lightroom preset.",
    image: "/ambassadors/joeywrightphoto.png",
  },
];
