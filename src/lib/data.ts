// Sample data for the investor / OEM demo. Every property, host, route and
// number here is illustrative — none of it describes a real place or person.
import { LngLat, loopRoute, parcel } from "./geo";

export type Difficulty = "green" | "blue" | "black";
export type Kind = "private" | "public" | "event";
export type Scene = "dawn" | "day" | "dusk" | "autumn" | "mist";

export interface Host {
  name: string;
  property: string;
  since: string;
  verified: boolean;
  responseTime: string;
  quote: string;
}

export interface Listing {
  slug: string;
  name: string;
  kind: Kind;
  tagline: string;
  region: string;
  county: string;
  center: LngLat;
  acres?: number;
  difficulty: Difficulty;
  miles: number;
  gainFt: number;
  baseFt: number;
  hours: string;
  price?: number; // per vehicle per day; undefined = free public access
  capacity: number;
  rating: number;
  reviews: number;
  terrain: string[];
  season: string;
  highlights: string[];
  rules: string[];
  description: string;
  badge: string; // badge id earned on completion
  scene: Scene;
  host?: Host;
  date?: string; // events only
  route: LngLat[];
  boundary?: LngLat[];
  seed: number;
}

type Seed = Omit<Listing, "route" | "boundary">;

const seeds: Seed[] = [
  {
    slug: "hollow-creek-ranch",
    name: "Hollow Creek Ranch",
    kind: "private",
    tagline: "Creek fords and ridge-top views on a working cattle ranch",
    region: "Allegheny Highlands",
    county: "Highland County",
    center: [-79.58, 38.43],
    acres: 1240,
    difficulty: "blue",
    miles: 11.5,
    gainFt: 1350,
    baseFt: 2600,
    hours: "4–5 hrs",
    price: 65,
    capacity: 6,
    rating: 4.9,
    reviews: 128,
    terrain: ["Water crossings", "Ridge roads", "Pasture"],
    season: "Apr – Nov",
    highlights: [
      "Three shallow creek crossings with marked lines",
      "Ridge overlook at 3,950 ft — 40-mile views into West Virginia",
      "Primitive campsite available for overnight bookings",
    ],
    rules: [
      "Stay on marked tracks — cattle in the lower pastures",
      "Close every gate behind you",
      "Max 6 vehicles per booking, 15 mph on ranch roads",
    ],
    description:
      "A fourth-generation family ranch opening its ridge and creek roads to small groups. The loop climbs from the creek bottoms through hardwoods to an open ridge with some of the best views in the Highlands. Ideal first 'blue' trail for a stock Grenadier or Wrangler.",
    badge: "water-crossing",
    scene: "dawn",
    host: {
      name: "Ruth & Dale Whitcomb",
      property: "Hollow Creek Ranch",
      since: "2026",
      verified: true,
      responseTime: "within 2 hours",
      quote: "We'd rather share the ridge with folks who respect it than keep it to the cows.",
    },
    seed: 11,
  },
  {
    slug: "cedar-bluff-farm",
    name: "Cedar Bluff Farm Trails",
    kind: "private",
    tagline: "Gentle orchard and riverside loop — perfect first off-road day",
    region: "Shenandoah Valley",
    county: "Shenandoah County",
    center: [-78.62, 38.86],
    acres: 420,
    difficulty: "green",
    miles: 6.2,
    gainFt: 380,
    baseFt: 820,
    hours: "2 hrs",
    price: 45,
    capacity: 8,
    rating: 4.8,
    reviews: 214,
    terrain: ["Orchard lanes", "River bottom", "Gravel"],
    season: "Year-round",
    highlights: [
      "Instructor-led 'First Dirt' sessions on Saturdays",
      "Cider barn and picnic area at the trailhead",
      "Low-speed practice area for 4-Lo and hill starts",
    ],
    rules: ["Family-friendly — kids welcome", "No airing down required", "Pets on leash"],
    description:
      "Rolling orchard lanes along the North Fork of the Shenandoah. Built for the 'middle 80%' — owners who have never taken their truck off pavement. Pair it with the Recovery Ready skills module.",
    badge: "first-dirt",
    scene: "day",
    host: {
      name: "Marisol Ortega",
      property: "Cedar Bluff Farm",
      since: "2026",
      verified: true,
      responseTime: "within 1 hour",
      quote: "Trail fees now cover our orchard insurance. That's a real difference for a small farm.",
    },
    seed: 22,
  },
  {
    slug: "iron-furnace-timberlands",
    name: "Iron Furnace Timberlands",
    kind: "private",
    tagline: "Rock gardens and 1800s furnace ruins on private timberland",
    region: "Alleghany Highlands",
    county: "Alleghany County",
    center: [-79.86, 37.76],
    acres: 3100,
    difficulty: "black",
    miles: 14.8,
    gainFt: 2100,
    baseFt: 1400,
    hours: "6–7 hrs",
    price: 85,
    capacity: 5,
    rating: 4.9,
    reviews: 63,
    terrain: ["Rock gardens", "Steep climbs", "Off-camber"],
    season: "May – Oct",
    highlights: [
      "Two named rock gardens: The Anvil and Slag Heap",
      "Historic cold-blast iron furnace ruin at mile 7",
      "Recovery point checkpoints logged in the app",
    ],
    rules: [
      "Lockers and 33\"+ tires recommended",
      "Minimum two vehicles; recovery gear required",
      "Timber operations close sections Mon–Wed",
    ],
    description:
      "A managed timber tract with legacy logging roads that have weathered into proper technical terrain. Skills challenges unlock as you clear each checkpoint.",
    badge: "rock-crawler",
    scene: "autumn",
    host: {
      name: "Blue Ridge Timber Partners",
      property: "Iron Furnace Tract",
      since: "2026",
      verified: true,
      responseTime: "same day",
      quote: "Recreation revenue offsets road maintenance between harvests.",
    },
    seed: 33,
  },
  {
    slug: "rapidan-overlook",
    name: "Rapidan Overlook Estate",
    kind: "private",
    tagline: "Sunset overlook and overnight camping in the Piedmont foothills",
    region: "Blue Ridge Foothills",
    county: "Madison County",
    center: [-78.31, 38.41],
    acres: 680,
    difficulty: "green",
    miles: 7.4,
    gainFt: 720,
    baseFt: 650,
    hours: "3 hrs + camp",
    price: 55,
    capacity: 6,
    rating: 4.7,
    reviews: 91,
    terrain: ["Forest road", "Meadow", "Overlook"],
    season: "Year-round",
    highlights: [
      "Sunset overlook toward Old Rag",
      "Rooftop-tent friendly camp pads",
      "Stargazing — Bortle 3 skies",
    ],
    rules: ["Quiet hours 10pm–7am", "Fires in provided rings only", "Pack it in, pack it out"],
    description:
      "An easy climb to the best sunset on the east side of the Blue Ridge, with level camp pads at the top. A favourite for overlanders testing their setup before a big trip.",
    badge: "night-owl",
    scene: "dusk",
    host: {
      name: "James Pemberton",
      property: "Rapidan Overlook",
      since: "2026",
      verified: true,
      responseTime: "within 3 hours",
      quote: "TrailArc handles the waivers and the insurance. I just say hello at the gate.",
    },
    seed: 44,
  },
  {
    slug: "clinch-river-highlands",
    name: "Clinch River Highlands",
    kind: "private",
    tagline: "Former coal haul roads with big climbs and river views",
    region: "Southwest Virginia",
    county: "Russell County",
    center: [-82.09, 36.96],
    acres: 5200,
    difficulty: "black",
    miles: 22.0,
    gainFt: 2900,
    baseFt: 1500,
    hours: "Full day",
    price: 75,
    capacity: 8,
    rating: 4.8,
    reviews: 47,
    terrain: ["Haul roads", "Mud", "Steep grades"],
    season: "Apr – Nov",
    highlights: [
      "22 miles of reclaimed mine roads",
      "Clinch River overlook lunch stop",
      "Multi-day route connects to two neighbouring properties",
    ],
    rules: ["Recovery gear required", "Mud sections close after heavy rain", "Radios on channel 7"],
    description:
      "Reclaimed coal land turned into one of the largest private trail networks in the region — a model for how TrailArc helps rural landowners create new income.",
    badge: "ridge-runner",
    scene: "mist",
    host: {
      name: "Clinch Valley Land Co.",
      property: "Clinch River Highlands",
      since: "2026",
      verified: true,
      responseTime: "same day",
      quote: "These roads used to haul coal. Now they bring visitors to town every weekend.",
    },
    seed: 55,
  },
  {
    slug: "tobacco-barn-run",
    name: "Tobacco Barn Run",
    kind: "private",
    tagline: "Sandy Southside lanes past restored tobacco barns",
    region: "Southside",
    county: "Halifax County",
    center: [-78.92, 36.78],
    acres: 350,
    difficulty: "green",
    miles: 5.1,
    gainFt: 210,
    baseFt: 420,
    hours: "1.5 hrs",
    price: 40,
    capacity: 10,
    rating: 4.6,
    reviews: 156,
    terrain: ["Sand", "Farm lanes", "Woodland"],
    season: "Year-round",
    highlights: ["Restored 1920s tobacco barns", "Sand practice loop", "Great winter option"],
    rules: ["Stay off planted fields", "Max 10 vehicles", "Dogs welcome"],
    description:
      "Flat, sandy and forgiving — where new owners learn to air down and feel their truck move. Open all winter when the mountains close.",
    badge: "first-dirt",
    scene: "day",
    host: {
      name: "The Hargrove Family",
      property: "Hargrove Farm",
      since: "2026",
      verified: true,
      responseTime: "within 4 hours",
      quote: "Our kids grew up on these lanes. Nice to see other families enjoy them.",
    },
    seed: 66,
  },
  {
    slug: "shenandoah-ridge-route",
    name: "Shenandoah Mountain Ridge Route",
    kind: "public",
    tagline: "National Forest ridge road with long-range views",
    region: "George Washington National Forest",
    county: "Augusta County",
    center: [-79.02, 38.47],
    difficulty: "blue",
    miles: 16.0,
    gainFt: 1900,
    baseFt: 1900,
    hours: "4 hrs",
    capacity: 0,
    rating: 4.7,
    reviews: 302,
    terrain: ["Forest road", "Ridge", "Ruts"],
    season: "Apr 1 – Dec 31 (seasonal gate)",
    highlights: [
      "Legal for street-legal 4×4s per the forest's motor vehicle use map",
      "Seasonal gate status shown live in the app",
      "Offline map pack: 42 MB",
    ],
    rules: [
      "Street-legal vehicles only",
      "Stay on designated route — closures enforced",
      "Dispersed camping 100 ft from water",
    ],
    description:
      "A classic National Forest ridge road. TrailArc overlays motor vehicle use map legality, seasonal closures and land-ownership boundaries so you always know you're legal.",
    badge: "ridge-runner",
    scene: "mist",
    seed: 77,
  },
  {
    slug: "massanutten-crest",
    name: "Massanutten Crest Road",
    kind: "public",
    tagline: "Easy forest road between the two forks of the Shenandoah",
    region: "George Washington National Forest",
    county: "Page County",
    center: [-78.45, 38.62],
    difficulty: "green",
    miles: 9.0,
    gainFt: 900,
    baseFt: 1200,
    hours: "2.5 hrs",
    capacity: 0,
    rating: 4.5,
    reviews: 418,
    terrain: ["Gravel", "Forest road"],
    season: "Year-round",
    highlights: ["Two overlooks", "Good for stock SUVs", "Close to I-81"],
    rules: ["Street-legal vehicles only", "Yield to hikers at crossings"],
    description:
      "The gateway trail for Northern Virginia owners — 90 minutes from the Beltway and suitable for any AWD vehicle in dry weather.",
    badge: "trail-scout",
    scene: "day",
    seed: 88,
  },
  {
    slug: "peters-mountain-road",
    name: "Peters Mountain Fire Road",
    kind: "public",
    tagline: "Rugged fire road along the Virginia–West Virginia line",
    region: "Jefferson National Forest",
    county: "Giles County",
    center: [-80.62, 37.42],
    difficulty: "blue",
    miles: 12.5,
    gainFt: 1600,
    baseFt: 2100,
    hours: "3.5 hrs",
    capacity: 0,
    rating: 4.6,
    reviews: 187,
    terrain: ["Rocky", "Forest road", "Ridge"],
    season: "May – Nov",
    highlights: ["State-line ridge", "Wildflower meadows in June", "Cell coverage is poor — offline maps recommended"],
    rules: ["Street-legal vehicles only", "No camping at overlooks"],
    description:
      "A rockier ridge road with real consequences in the wet. Download offline maps before you go.",
    badge: "ridge-runner",
    scene: "autumn",
    seed: 99,
  },
  {
    slug: "blue-ridge-overland-weekend",
    name: "Blue Ridge Overland Weekend",
    kind: "event",
    tagline: "Guided two-day overland trip with camp, skills clinics and trail dinner",
    region: "Allegheny Highlands",
    county: "Highland County",
    center: [-79.55, 38.12],
    acres: 1240,
    difficulty: "blue",
    miles: 38.0,
    gainFt: 3200,
    baseFt: 2400,
    hours: "2 days",
    price: 349,
    capacity: 20,
    rating: 5.0,
    reviews: 36,
    terrain: ["Mixed", "Camp", "Skills course"],
    season: "May 16–17, 2027",
    date: "May 16–17, 2027",
    highlights: [
      "Veteran-led trail guides",
      "Recovery & winching clinic",
      "Chef-cooked camp dinner, all permits included",
    ],
    rules: ["Price per vehicle (2 people)", "Rooftop or ground tent required", "Radios provided"],
    description:
      "TrailArc's flagship guided experience: plan, drive and camp with a guide team, then share the trip with the community. The 'Adventure Flywheel' in a weekend.",
    badge: "steward",
    scene: "dusk",
    host: {
      name: "TrailArc Guides",
      property: "Guided Experience",
      since: "2026",
      verified: true,
      responseTime: "within 1 hour",
      quote: "We bring the permits, the routes and the dinner. You bring the truck.",
    },
    seed: 111,
  },
  {
    slug: "grenadier-owners-skills-day",
    name: "Grenadier Owners Skills Day",
    kind: "event",
    tagline: "OEM co-branded skills clinic — the dealer experience, scaled",
    region: "Shenandoah Valley",
    county: "Shenandoah County",
    center: [-78.98, 39.02],
    acres: 420,
    difficulty: "green",
    miles: 8.0,
    gainFt: 500,
    baseFt: 800,
    hours: "1 day",
    price: 149,
    capacity: 24,
    rating: 4.9,
    reviews: 22,
    terrain: ["Skills course", "Orchard lanes"],
    season: "Jun 7, 2027",
    date: "Jun 7, 2027",
    highlights: [
      "Diff locks, hill descent and articulation course",
      "Dealer service team on site for post-trip checks",
      "Exclusive 'Grenadier Pioneer' badge",
    ],
    rules: ["Open to Grenadier owners and guests", "Helmet not required", "Lunch included"],
    description:
      "A concept for OEM partner events: owners learn what their vehicle can do, the dealer earns service visits, and the brand gets first-party engagement data.",
    badge: "grenadier-pioneer",
    scene: "day",
    host: {
      name: "TrailArc Partner Events",
      property: "Cedar Bluff Farm",
      since: "2026",
      verified: true,
      responseTime: "within 1 hour",
      quote: "Ownership is the start of the adventure, not the end of the sale.",
    },
    seed: 122,
  },
];

export const listings: Listing[] = seeds.map((s) => ({
  ...s,
  route: loopRoute(s.center, s.miles, s.seed, s.kind !== "public"),
  boundary: s.acres && s.kind !== "public" ? parcel(s.center, s.acres, s.seed) : undefined,
}));

export function getListing(slug: string) {
  return listings.find((l) => l.slug === slug);
}

export const difficultyLabel: Record<Difficulty, string> = {
  green: "Easy",
  blue: "Moderate",
  black: "Difficult",
};

export const kindLabel: Record<Kind, string> = {
  private: "Private land",
  public: "Public route",
  event: "Guided event",
};

// ---- Badges & ranks --------------------------------------------------------

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  points: number;
  secret?: boolean;
  partner?: boolean;
}

export const badges: Badge[] = [
  { id: "trail-scout", name: "Trail Scout", description: "Complete your first public route", icon: "Compass", points: 50 },
  { id: "first-dirt", name: "First Dirt", description: "Complete an easy private-land trail", icon: "Sprout", points: 75 },
  { id: "water-crossing", name: "Creek Crosser", description: "Ford three water crossings on one trip", icon: "Waves", points: 100 },
  { id: "ridge-runner", name: "Ridge Runner", description: "Reach 3,500 ft on a ridge route", icon: "Mountain", points: 100 },
  { id: "rock-crawler", name: "Rock Crawler", description: "Clear a black-diamond rock garden", icon: "Gem", points: 150 },
  { id: "night-owl", name: "Night Owl", description: "Camp overnight on a TrailArc property", icon: "Moon", points: 75 },
  { id: "recovery-ready", name: "Recovery Ready", description: "Finish the winching & recovery skills module", icon: "Anchor", points: 100 },
  { id: "steward", name: "Trail Steward", description: "Volunteer at a trail clean-up or join a guided weekend", icon: "Leaf", points: 200 },
  { id: "grenadier-pioneer", name: "Grenadier Pioneer", description: "Attend an owners' skills day", icon: "Shield", points: 150, partner: true },
  { id: "bigfoot", name: "Bigfoot Spotted", description: "Some say he lives on a ridge near Potts. Keep looking.", icon: "Footprints", points: 250, secret: true },
];

export const ranks = [
  { name: "Newbie", min: 0 },
  { name: "Trail Scout", min: 250 },
  { name: "Seasoned Explorer", min: 750 },
  { name: "Veteran Outfitter", min: 1500 },
  { name: "Trail Legend", min: 3000 },
];

export function rankFor(points: number) {
  let idx = 0;
  ranks.forEach((r, i) => {
    if (points >= r.min) idx = i;
  });
  return { current: ranks[idx], next: ranks[idx + 1], index: idx };
}

// ---- Demo explorer ---------------------------------------------------------

export const explorer = {
  name: "Alex Morgan",
  handle: "@alexmorgan",
  home: "Arlington, VA",
  memberSince: "March 2026",
  startingPoints: 1340,
  startingBadges: ["trail-scout", "first-dirt", "ridge-runner", "recovery-ready", "night-owl"],
  vehicle: {
    name: "Basecamp",
    model: "2025 INEOS Grenadier Trialmaster",
    mileage: 8750,
    mods: ["Front winch", "Roof rack + RTT", "All-terrain tires (33\")", "Aux lighting"],
    readiness: [
      { label: "Tire pressure", value: "38 psi", ok: true },
      { label: "Next service", value: "in 1,250 mi", ok: true },
      { label: "Recovery kit", value: "4 / 5 items", ok: false },
      { label: "Offline maps", value: "3 regions", ok: true },
    ],
  },
  pastTrips: [
    { slug: "massanutten-crest", date: "Apr 12, 2026", note: "First trip in the Grenadier" },
    { slug: "cedar-bluff-farm", date: "May 3, 2026", note: "First Dirt session with the kids" },
    { slug: "shenandoah-ridge-route", date: "Jun 21, 2026", note: "Fog on the ridge, cleared by noon" },
    { slug: "rapidan-overlook", date: "Aug 9, 2026", note: "Overnight — Perseids" },
  ],
};
