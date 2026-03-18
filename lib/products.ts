// ─────────────────────────────────────────────────────────
// LAYERD — Centralized Product Data
// "This wasn't bought. It was built."
// ─────────────────────────────────────────────────────────

export interface ProductOption {
  colors?: { name: string; hex: string }[];
  sizes?: { label: string; dimensions: string }[];
  materials?: { name: string; description: string }[];
  finishes?: { name: string; description: string }[];
}

export interface ProductCustomization {
  allowCustomText?: { maxLength: number; placeholder: string };
  allowCustomImage?: boolean;
  allowCustomColors?: boolean;
  description: string;
}

export interface ProductStory {
  headline: string;
  paragraphs: string[];
  designInspo: string;
  printJourney: string;
}

export interface ProductSpecs {
  dimensions: string;
  weight: string;
  material: string;
  printTime: string;
  layerCount: string;
  finish: string;
  infill?: string;
}

export interface ProductReview {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  gradient: string;
  date: string;
  story: ProductStory;
  specs: ProductSpecs;
  options?: ProductOption;
  customization?: ProductCustomization;
  images?: string[];
  contextImages?: { url: string; location: string; description: string }[];
  lifestyleContexts: string[];
  badges?: string[];
  isNew?: boolean;
  isCustomizable?: boolean;
  relatedSlugs: string[];
  reviewList: ProductReview[];
}

// ─────────────────────────────────────────────────────────

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─────────────────────────────────────────────────────────
// Product catalogue
// ─────────────────────────────────────────────────────────

export const allProducts: Product[] = [
  // ── 1. Geometric Desk Organizer ──────────────────────
  {
    slug: "geometric-desk-organizer",
    name: "Geometric Desk Organizer",
    tagline: "72 hours. 2,847 layers. One organizer to rule your desk.",
    category: "Desk & Organization",
    price: 3500,
    rating: 4.9,
    reviews: 47,
    gradient: "from-blue-500/10 to-cyan-500/5",
    date: "2026-02-20",
    story: {
      headline: "Born from the need to tame chaos",
      paragraphs: [
        "Every great desk tells a story. But most desk organizers? They're afterthoughts — plastic trays and wire baskets that belong in an office supply graveyard. We thought your workspace deserved better.",
        "The Geometric Desk Organizer was designed with one obsession: making order feel beautiful. Its tessellated hexagonal compartments cradle your pens, cards, and cables in a sculptural form that looks intentional, not accidental.",
        "Each unit is precision-printed layer by layer, with tolerances tighter than 0.1mm. The matte finish absorbs light instead of reflecting it, creating a presence that's felt but never loud.",
      ],
      designInspo:
        "Inspired by crystalline mineral formations and Bauhaus principles — where function defines form, and form becomes art.",
      printJourney:
        "Printed over 72 hours in a continuous run. 2,847 layers of PLA+ at 0.12mm resolution. No supports needed thanks to our optimized geometry. Finished with a hand-sanded matte coat.",
    },
    specs: {
      dimensions: "18 × 12 × 9 cm",
      weight: "320g",
      material: "PLA+ (plant-based polymer)",
      printTime: "72 hours",
      layerCount: "2,847",
      finish: "Matte sanded",
      infill: "25% gyroid",
    },
    options: {
      colors: [
        { name: "Obsidian Black", hex: "#1a1a1a" },
        { name: "Warm Slate", hex: "#4a4a4a" },
        { name: "Arctic White", hex: "#f0f0f0" },
        { name: "Desert Sand", hex: "#c4a77d" },
      ],
      sizes: [
        { label: "Standard", dimensions: "18 × 12 × 9 cm" },
        { label: "Compact", dimensions: "14 × 9 × 7 cm" },
        { label: "XL", dimensions: "24 × 16 × 11 cm" },
      ],
      finishes: [
        { name: "Matte", description: "Smooth, light-absorbing surface" },
        { name: "Silk", description: "Subtle metallic sheen" },
      ],
    },
    lifestyleContexts: [
      "On a minimal Japanese-inspired desk setup",
      "Beside a MacBook in a home office",
      "Next to your morning pour-over coffee",
      "In a creative studio workspace",
    ],
    badges: ["Best Seller"],
    relatedSlugs: [
      "cable-management-tower",
      "modular-headphone-hook",
      "minimalist-vase-collection",
    ],
    reviewList: [
      {
        name: "Ashan P.",
        rating: 5,
        date: "Feb 18, 2026",
        text: "This is hands-down the most beautiful desk accessory I own. The matte finish is gorgeous and it holds everything perfectly.",
      },
      {
        name: "Kavini R.",
        rating: 5,
        date: "Feb 10, 2026",
        text: "Got the Obsidian Black. It's heavy, solid, and looks like something from a design museum. Worth every rupee.",
      },
      {
        name: "Dineth M.",
        rating: 4,
        date: "Jan 29, 2026",
        text: "Great organizer! Only wish the XL size was available sooner. The standard fits most things, but I have a lot of pens.",
      },
    ],
  },

  // ── 2. Gojo Satoru Figure ────────────────────────────
  {
    slug: "gojo-satoru-figure",
    name: "Gojo Satoru Figure",
    tagline: "The strongest sorcerer, layer by layer. 4,200 layers of detail.",
    category: "Anime Inspired",
    price: 5200,
    rating: 5.0,
    reviews: 82,
    gradient: "from-purple-500/10 to-pink-500/5",
    date: "2026-02-25",
    story: {
      headline: "The strongest sorcerer deserves the strongest craft",
      paragraphs: [
        "Gojo Satoru isn't just a character — he's a phenomenon. And a phenomenon deserves more than mass-produced PVC. This figure was sculpted digitally with painstaking attention to every fold of his uniform, every strand of hair, every curve of that iconic blindfold.",
        "We spent three months perfecting the pose. The slight tilt of the head, the casual arrogance of his stance — it had to feel alive, not posed. The result is a figure that commands any shelf it sits on.",
        "Printed in high-resolution resin at 0.05mm layers, then hand-painted with automotive-grade acrylics. Each piece takes over 12 hours of post-processing. This isn't a toy. It's a tribute.",
      ],
      designInspo:
        "Referenced the manga panels from volume 15 and the iconic Domain Expansion scene. The pose captures his effortless superiority.",
      printJourney:
        "Resin-printed in 6 separate parts at 0.05mm resolution. Assembled, sanded through 5 grits, primed, and hand-painted over 12 hours. Final clear coat for UV protection.",
    },
    specs: {
      dimensions: "22 × 10 × 10 cm",
      weight: "280g",
      material: "UV-cured resin",
      printTime: "18 hours (print) + 12 hours (finish)",
      layerCount: "4,200",
      finish: "Hand-painted with clear coat",
    },
    options: {
      finishes: [
        { name: "Standard Paint", description: "Full color hand-painted" },
        {
          name: "Monochrome",
          description: "Single-tone grayscale for a manga feel",
        },
        {
          name: "Metallic",
          description: "Pearlescent base coat with metallic accents",
        },
      ],
    },
    lifestyleContexts: [
      "On a collector's display shelf",
      "Next to your manga collection",
      "On a gaming desktop setup",
      "In a glass display case with LED lighting",
    ],
    badges: ["Top Rated", "Fan Favorite"],
    isNew: true,
    relatedSlugs: [
      "tanjiro-kamado-bust",
      "spirited-away-diorama",
      "f1-helmet-replica-stand",
    ],
    reviewList: [
      {
        name: "Ruwan K.",
        rating: 5,
        date: "Feb 24, 2026",
        text: "I've bought figures from Japan, China, everywhere. This is the best quality I've seen from a local maker. The paint job is insane.",
      },
      {
        name: "Thilini S.",
        rating: 5,
        date: "Feb 20, 2026",
        text: "Got this as a gift for my brother. He actually teared up. The detail on the blindfold and the hair is unreal.",
      },
      {
        name: "Naveen J.",
        rating: 5,
        date: "Feb 15, 2026",
        text: "The metallic finish option is INCREDIBLE. It catches light differently from every angle. Museum quality.",
      },
    ],
  },

  // ── 3. F1 Helmet Replica Stand ───────────────────────
  {
    slug: "f1-helmet-replica-stand",
    name: "F1 Helmet Replica Stand",
    tagline: "Race-day precision. 3,100 layers of pure motorsport.",
    category: "F1 Designs",
    price: 4800,
    rating: 4.8,
    reviews: 31,
    gradient: "from-red-500/10 to-orange-500/5",
    date: "2026-02-18",
    story: {
      headline: "For those who hear the grid before the green light",
      paragraphs: [
        "Formula 1 isn't just a sport. It's engineering poetry at 300km/h. And a real fan doesn't just watch — they collect, they celebrate, they display. This helmet stand was designed for that kind of fan.",
        "The stand cradles a 1:2 scale helmet replica with surgical precision. The aerodynamic curves of the base echo the front wing profiles of modern F1 cars, creating a visual language that any fan instantly recognizes.",
        "We partnered with local motorsport enthusiasts to get every angle right. The result is a stand that doesn't just hold a helmet — it presents it like a trophy.",
      ],
      designInspo:
        "The base profile mirrors the endplate curves of the 2024 regulation front wings. The mounting angle is set at exactly 15° — the same tilt seen on podium trophy displays.",
      printJourney:
        "Printed in PETG for superior strength, then finished with a carbon-fiber texture vinyl wrap option. 48-hour continuous print at 0.15mm resolution.",
    },
    specs: {
      dimensions: "25 × 18 × 20 cm",
      weight: "450g",
      material: "PETG (high-strength polymer)",
      printTime: "48 hours",
      layerCount: "3,100",
      finish: "Smooth with optional carbon wrap",
      infill: "30% cubic",
    },
    options: {
      colors: [
        { name: "Race Red", hex: "#c62828" },
        { name: "Papaya Orange", hex: "#ff8c00" },
        { name: "British Racing Green", hex: "#1b5e20" },
        { name: "Stealth Black", hex: "#111111" },
      ],
      finishes: [
        { name: "Smooth Matte", description: "Clean, no-frills surface" },
        {
          name: "Carbon Fiber Wrap",
          description: "Real carbon-fiber texture finish",
        },
      ],
    },
    lifestyleContexts: [
      "On a motorsport memorabilia shelf",
      "In a sim-racing cockpit setup",
      "On a bedside table for the true fan",
      "In a man-cave with F1 memorabilia",
    ],
    relatedSlugs: [
      "mclaren-mcl60-model",
      "gojo-satoru-figure",
      "modular-headphone-hook",
    ],
    reviewList: [
      {
        name: "Chamath D.",
        rating: 5,
        date: "Feb 16, 2026",
        text: "The carbon fiber wrap option is a game changer. It looks and feels like something straight out of the McLaren factory.",
      },
      {
        name: "Ishara W.",
        rating: 5,
        date: "Feb 8, 2026",
        text: "Fits my 1:2 Verstappen helmet perfectly. The angle is spot on. Looks incredible on my desk.",
      },
      {
        name: "Amila F.",
        rating: 4,
        date: "Jan 30, 2026",
        text: "Great quality! Would love to see a version that fits 1:1 scale helmets too.",
      },
    ],
  },

  // ── 4. Minimalist Vase Collection ────────────────────
  {
    slug: "minimalist-vase-collection",
    name: "Minimalist Vase Collection",
    tagline: "Three forms. One philosophy. Zero excess.",
    category: "Interior & Lifestyle",
    price: 2900,
    rating: 4.7,
    reviews: 56,
    gradient: "from-amber-500/10 to-yellow-500/5",
    date: "2026-01-28",
    story: {
      headline: "When nothing is wasted, everything is beautiful",
      paragraphs: [
        "Minimalism isn't about having less. It's about having only what matters. These three vases — Cylinder, Twist, and Wave — embody that ethos in pure geometric form.",
        "Each vase is designed around a single mathematical curve. No surface decoration, no busy textures. Just the raw honesty of form meeting function. They are waterproof (yes, you can put real flowers in them), and the interior is coated with a food-safe sealant.",
        "The collection works individually as accent pieces or together as a trio that creates a visual rhythm on any shelf, mantle, or table.",
      ],
      designInspo:
        "Inspired by Scandinavian design principles and Japanese wabi-sabi — the beauty of imperfection and simplicity.",
      printJourney:
        "Each vase is printed in a single continuous spiral (vase mode) — meaning they're made from one unbroken line of filament. No seams, no layers visible. Pure geometric purity.",
    },
    specs: {
      dimensions: "8 × 8 × 18 cm (each)",
      weight: "150g (each)",
      material: "PLA+ (plant-based polymer)",
      printTime: "6 hours (per vase)",
      layerCount: "1,500 (per vase)",
      finish: "Spiral vase mode (seamless)",
    },
    options: {
      colors: [
        { name: "Natural White", hex: "#f5f0e8" },
        { name: "Sage Green", hex: "#7d8c6e" },
        { name: "Terracotta", hex: "#c67b5c" },
        { name: "Midnight Blue", hex: "#1a2744" },
      ],
      sizes: [
        { label: "Petite", dimensions: "6 × 6 × 14 cm" },
        { label: "Standard", dimensions: "8 × 8 × 18 cm" },
        { label: "Tall", dimensions: "10 × 10 × 24 cm" },
      ],
    },
    lifestyleContexts: [
      "On a Scandinavian-style floating shelf",
      "As a dining table centerpiece with dried flowers",
      "On a bathroom vanity for a spa-like feel",
      "In a sunlit reading nook",
    ],
    relatedSlugs: [
      "hexagonal-wall-planter",
      "geometric-desk-organizer",
      "custom-name-plate-stand",
    ],
    reviewList: [
      {
        name: "Sachini M.",
        rating: 5,
        date: "Jan 25, 2026",
        text: "The Sage Green is stunning. It fits my Scandinavian aesthetic perfectly. I put dried eucalyptus in it and it looks amazing.",
      },
      {
        name: "Dulanjali P.",
        rating: 4,
        date: "Jan 18, 2026",
        text: "Love the seamless finish. You genuinely cannot see any layers. Only 4 stars because I wish the Tall size came in more colors.",
      },
      {
        name: "Lahiru B.",
        rating: 5,
        date: "Jan 10, 2026",
        text: "Bought the whole collection. They look incredible together on my bookshelf. The terracotta color is perfection.",
      },
    ],
  },

  // ── 5. Tanjiro Kamado Bust ───────────────────────────
  {
    slug: "tanjiro-kamado-bust",
    name: "Tanjiro Kamado Bust",
    tagline:
      "The breath of the sun, frozen in resin. 5,600 layers of dedication.",
    category: "Anime Inspired",
    price: 6800,
    rating: 4.9,
    reviews: 64,
    gradient: "from-emerald-500/10 to-cyan-500/5",
    date: "2026-02-22",
    story: {
      headline: "A boy who carried the weight of kindness",
      paragraphs: [
        "Tanjiro's story is one of relentless compassion in a world of demons. This bust captures not the warrior, but the boy — the one who sees humanity in monsters and fights with tears in his eyes.",
        "We chose the bust format deliberately. It removes the action-figure distraction and forces you to look at his face — the scar, the determined eyes, the quiet resolve. It's a portrait, not a pose.",
        "Every earring link, every hair strand, every crack in the scar is individually sculpted. The water-breathing effect at the base is printed in translucent resin to create a genuine sense of depth and motion.",
      ],
      designInspo:
        "Inspired by classical Roman portrait busts merged with the emotional weight of Chapter 1. The base references Water Breathing — First Form: Water Surface Slash.",
      printJourney:
        "Main bust in matte grey resin, water effect in translucent blue resin. Printed in 4 parts at 0.04mm resolution. 22 hours total print time, 15 hours hand-finishing and painting.",
    },
    specs: {
      dimensions: "18 × 14 × 24 cm",
      weight: "420g",
      material: "UV-cured resin (dual-color)",
      printTime: "22 hours (print) + 15 hours (finish)",
      layerCount: "5,600",
      finish: "Hand-painted with translucent base",
    },
    options: {
      finishes: [
        { name: "Full Color", description: "Manga-accurate hand-painted" },
        {
          name: "Bronze Patina",
          description: "Classical bust look with aged bronze",
        },
        {
          name: "Raw Resin",
          description: "Unpainted, showing pure print detail",
        },
      ],
    },
    lifestyleContexts: [
      "As the centerpiece of an anime display shelf",
      "On a study desk for daily inspiration",
      "In a glass cabinet with dramatic lighting",
      "Beside a window where sunlight catches the translucent base",
    ],
    badges: ["Limited Edition"],
    relatedSlugs: [
      "gojo-satoru-figure",
      "spirited-away-diorama",
      "f1-helmet-replica-stand",
    ],
    reviewList: [
      {
        name: "Pasan L.",
        rating: 5,
        date: "Feb 21, 2026",
        text: "The translucent water effect on the base is unbelievable. When light hits it, it actually looks like flowing water. Masterpiece.",
      },
      {
        name: "Nimali V.",
        rating: 5,
        date: "Feb 14, 2026",
        text: "I went with the Bronze Patina finish and it looks like a museum artifact. The detail in the scar and earrings is incredible.",
      },
      {
        name: "Kasun R.",
        rating: 4,
        date: "Feb 5, 2026",
        text: "Stunning piece. The only reason it's not 5 stars is I want a matching Nezuko bust and it doesn't exist yet. Please make one!",
      },
    ],
  },

  // ── 6. Cable Management Tower ────────────────────────
  {
    slug: "cable-management-tower",
    name: "Cable Management Tower",
    tagline: "Chaos, contained. Every cable finds its home.",
    category: "Desk & Organization",
    price: 2200,
    rating: 4.6,
    reviews: 39,
    gradient: "from-slate-500/10 to-zinc-500/5",
    date: "2026-02-10",
    story: {
      headline: "The unsung hero of every clean desk photo",
      paragraphs: [
        "You know those impossibly clean desk setups on Reddit? The ones where every cable seems to have vanished? There's always a secret weapon behind (or under) the monitor. This is that weapon.",
        "The Cable Management Tower uses a vertical stacking system with snap-fit cable channels. Each tier holds 3-4 cables and routes them invisibly from your desk surface down to the power strip below.",
        "The snap-fit mechanism means no tools, no glue, no drilling. Set it up in 2 minutes. Move it if you rearrange. It's designed for people who iterate on their setups constantly.",
      ],
      designInspo:
        "Inspired by server rack cable management systems, scaled down to desk proportions. The modular tier system borrows from stackable architecture in data centers.",
      printJourney:
        "Printed as 4 interlocking tiers with snap-fit connectors. Each tier is a 5-hour print. Total: 20 hours. The tolerances on the snap-fits are critical — 0.15mm clearance for a firm but removable click.",
    },
    specs: {
      dimensions: "8 × 8 × 30 cm (4 tiers)",
      weight: "280g",
      material: "PLA+ (plant-based polymer)",
      printTime: "20 hours (4 tiers)",
      layerCount: "2,100",
      finish: "Matte textured",
      infill: "20% grid",
    },
    options: {
      colors: [
        { name: "Stealth Black", hex: "#1a1a1a" },
        { name: "Warm Grey", hex: "#6b6b6b" },
        { name: "White", hex: "#f0f0f0" },
      ],
      sizes: [
        { label: "3-Tier", dimensions: "8 × 8 × 23 cm" },
        { label: "4-Tier (Standard)", dimensions: "8 × 8 × 30 cm" },
        { label: "6-Tier", dimensions: "8 × 8 × 44 cm" },
      ],
    },
    lifestyleContexts: [
      "Hidden behind a monitor in a clean desk setup",
      "Under a standing desk for cable routing",
      "Beside a gaming PC managing peripheral cables",
      "At a co-working hot desk for portable cable control",
    ],
    relatedSlugs: [
      "geometric-desk-organizer",
      "modular-headphone-hook",
      "hexagonal-wall-planter",
    ],
    reviewList: [
      {
        name: "Tharaka S.",
        rating: 5,
        date: "Feb 8, 2026",
        text: "This thing is a lifesaver. My desk looks 10x cleaner and it took 2 minutes to set up. The snap-fits are super satisfying.",
      },
      {
        name: "Malika D.",
        rating: 4,
        date: "Jan 28, 2026",
        text: "Works great for most cables. USB-C, Lightning, etc. Only struggle is very thick power cables. Get the 6-tier version.",
      },
      {
        name: "Sandun J.",
        rating: 5,
        date: "Jan 20, 2026",
        text: "Bought two — one for home, one for office. Everyone at work keeps asking where I got it.",
      },
    ],
  },

  // ── 7. McLaren MCL60 Model ───────────────────────────
  {
    slug: "mclaren-mcl60-model",
    name: "McLaren MCL60 Model",
    tagline: "Papaya dreams, printed in precision. 120 hours of pure F1.",
    category: "F1 Designs",
    price: 7500,
    rating: 5.0,
    reviews: 28,
    gradient: "from-orange-500/10 to-amber-500/5",
    date: "2026-02-27",
    story: {
      headline: "200 parts. One legend.",
      paragraphs: [
        "The McLaren MCL60 isn't just a car. It's the embodiment of McLaren's resurgence — the car that reminded the world that papaya isn't just a color, it's a statement. This model captures that statement in 1:18 scale.",
        "Every aerodynamic element is faithfully reproduced: the undercut sidepods, the beam wing, the intricate bargeboards. The front wing alone is printed as 12 separate elements and assembled by hand.",
        "We developed a custom papaya orange filament specifically for this model. It's not available anywhere else. The color was matched to Pantone 1505 C — the official McLaren papaya — under controlled lighting conditions.",
      ],
      designInspo:
        "A love letter to the MCL60's aerodynamic philosophy. Every surface serves a purpose, both on the real car and on this model.",
      printJourney:
        "Printed across 3 machines simultaneously over 5 days. 200+ individual parts, each at 0.08mm resolution. Assembly takes another full day. The wheels rotate and the DRS flap is articulated.",
    },
    specs: {
      dimensions: "30 × 14 × 8 cm",
      weight: "380g",
      material: "PLA+ & PETG (multi-material)",
      printTime: "120 hours total",
      layerCount: "8,400+",
      finish: "Gloss clear coat with custom papaya",
    },
    options: {
      finishes: [
        {
          name: "Papaya Gloss",
          description: "Official McLaren papaya with clear coat",
        },
        {
          name: "Chrome Edition",
          description: "Reflective chrome-look finish",
        },
        { name: "Gulf Livery", description: "Classic powder blue and orange" },
      ],
    },
    lifestyleContexts: [
      "On a dedicated motorsport display shelf",
      "In a home office as a conversation starter",
      "In a glass case with track lighting",
      "On a coffee table book about F1",
    ],
    badges: ["New Drop", "Limited Edition"],
    isNew: true,
    relatedSlugs: [
      "f1-helmet-replica-stand",
      "geometric-desk-organizer",
      "gojo-satoru-figure",
    ],
    reviewList: [
      {
        name: "Ravindu T.",
        rating: 5,
        date: "Feb 27, 2026",
        text: "I collect 1:18 scale F1 models. This is on par with Amalgam and Spark. For a fraction of the price. The DRS flap moves!",
      },
      {
        name: "Hashini L.",
        rating: 5,
        date: "Feb 25, 2026",
        text: "Bought the Gulf Livery edition. It's absolutely stunning. The color matching is perfect. Took my breath away out of the box.",
      },
      {
        name: "Chanuka M.",
        rating: 5,
        date: "Feb 22, 2026",
        text: "200 parts... you can tell. The detail on the bargeboards and the floor is insane. This is a collector's dream.",
      },
    ],
  },

  // ── 8. Hexagonal Wall Planter ────────────────────────
  {
    slug: "hexagonal-wall-planter",
    name: "Hexagonal Wall Planter",
    tagline: "Nature meets geometry. Modular, magnetic, alive.",
    category: "Interior & Lifestyle",
    price: 1800,
    rating: 4.5,
    reviews: 71,
    gradient: "from-green-500/10 to-emerald-500/5",
    date: "2026-01-15",
    story: {
      headline: "Walls were always meant to be gardens",
      paragraphs: [
        "The Hexagonal Wall Planter started as a personal project — we wanted to grow herbs in our apartment but had zero counter space. The wall was the only option. But every wall planter we found looked industrial or cheap.",
        "So we designed our own. Each hexagonal pod holds a small plant or succulent, and they tessellate infinitely — giving you the freedom to create any pattern you want on your wall. Start with three, grow to thirty.",
        "The magnetic mounting system is the real magic. Magnetic steel plates stick to the wall (with 3M adhesive — no drilling), and each planter snaps on and off magnetically for easy watering. It's gardening that feels like LEGO.",
      ],
      designInspo:
        "Inspired by natural honeycomb structures and the modular design philosophy of USM Haller furniture systems. Nature and Swiss engineering in one product.",
      printJourney:
        "Each hexagonal pod is a 3-hour print with an integrated drainage layer. The magnetic mount is a separate 1-hour print embedded with neodymium magnets during the print pause at layer 45.",
    },
    specs: {
      dimensions: "12 × 10 × 8 cm (per pod)",
      weight: "95g (per pod)",
      material: "PETG (water-resistant)",
      printTime: "3 hours (per pod)",
      layerCount: "850 (per pod)",
      finish: "Matte textured with drainage mesh",
    },
    options: {
      colors: [
        { name: "Forest Green", hex: "#2d5a27" },
        { name: "Terracotta", hex: "#c67b5c" },
        { name: "Stone Grey", hex: "#8c8c8c" },
        { name: "Cloud White", hex: "#f0f0f0" },
      ],
      sizes: [
        { label: "Single Pod", dimensions: "12 × 10 × 8 cm" },
        { label: "3-Pack", dimensions: "3 pods + mounting plates" },
        { label: "7-Pack (Honeycomb)", dimensions: "7 pods + mounting plates" },
      ],
    },
    lifestyleContexts: [
      "As a herb garden in a small kitchen",
      "Creating a living wall in a bedroom",
      "In a bathroom for air-purifying plants",
      "Around a window frame for trailing plants",
    ],
    relatedSlugs: [
      "minimalist-vase-collection",
      "geometric-desk-organizer",
      "custom-name-plate-stand",
    ],
    reviewList: [
      {
        name: "Anusha F.",
        rating: 5,
        date: "Jan 12, 2026",
        text: "Started with 3. Now I have 15 on my bedroom wall. They're addictive. The magnetic system is genius.",
      },
      {
        name: "Kavindu P.",
        rating: 4,
        date: "Dec 28, 2025",
        text: "Love the concept and design. The drainage works well. I'd like deeper pods for bigger plants though.",
      },
      {
        name: "Nimesha S.",
        rating: 5,
        date: "Dec 15, 2025",
        text: "Best housewarming gift ever. We got the 7-pack in mixed colors. Our kitchen wall is now a herb garden!",
      },
    ],
  },

  // ── 9. Custom Name Plate Stand ───────────────────────
  {
    slug: "custom-name-plate-stand",
    name: "Custom Name Plate Stand",
    tagline: "Your name. Your style. Precision-printed identity.",
    category: "Custom",
    price: 3200,
    rating: 4.8,
    reviews: 93,
    gradient: "from-pink-500/10 to-rose-500/5",
    date: "2026-02-14",
    story: {
      headline: "Because your name deserves more than a sticker",
      paragraphs: [
        "A name plate sounds simple, right? A piece of plastic with a name. But that's not what this is. This is a 3D-sculptured identity marker — your name rising from an architecturally designed base in a font and style you choose.",
        "We offer 8 font styles, from clean geometric sans-serifs to elegant serifs to playful scripts. Each one has been optimized for 3D printing — meaning the letter forms are designed to look perfect in three dimensions, not just on screen.",
        "The base is an angled display stand inspired by museum exhibit labels. It presents your name at 20° — the scientifically optimal reading angle for desktop displays. Your name, presented like a work of art. Because it is.",
      ],
      designInspo:
        "Museum exhibit labels meet modern typography. The 20° angle is borrowed from exhibition design standards used at the Louvre and MoMA.",
      printJourney:
        "Custom text is generated on order, test-printed for readability, then final-printed at 0.1mm resolution. The base and text are printed as one continuous piece — no assembly required.",
    },
    specs: {
      dimensions: "20 × 6 × 8 cm",
      weight: "180g",
      material: "PLA+ (plant-based polymer)",
      printTime: "8 hours",
      layerCount: "1,200",
      finish: "Matte or Silk (customizable)",
    },
    options: {
      colors: [
        { name: "Obsidian Black", hex: "#1a1a1a" },
        { name: "Warm Gold", hex: "#d4a853" },
        { name: "Rose Pink", hex: "#c77d8a" },
        { name: "Arctic White", hex: "#f0f0f0" },
        { name: "Navy Blue", hex: "#1a2744" },
      ],
      finishes: [
        { name: "Matte", description: "Professional, understated look" },
        {
          name: "Silk",
          description: "Elegant sheen, catches light beautifully",
        },
      ],
    },
    customization: {
      allowCustomText: {
        maxLength: 20,
        placeholder: "Enter your name or text...",
      },
      allowCustomColors: true,
      description:
        "Personalize this name plate with your name (up to 20 characters). Choose from 8 font styles and match any color from our palette to make it uniquely yours.",
    },
    isCustomizable: true,
    lifestyleContexts: [
      "On your work desk as a professional identity piece",
      "As a gift on a loved one's study table",
      "At a reception desk for a personal brand",
      "On a bookshelf next to your achievements",
    ],
    badges: ["Most Gifted", "Customizable"],
    relatedSlugs: [
      "geometric-desk-organizer",
      "minimalist-vase-collection",
      "viral-fidget-cube-pro",
    ],
    reviewList: [
      {
        name: "Hirantha J.",
        rating: 5,
        date: "Feb 13, 2026",
        text: "Got two custom name plates for my and my wife's desks. The silk finish in Warm Gold is ridiculously premium. Amazing Valentine's gift idea!",
      },
      {
        name: "Dilini A.",
        rating: 5,
        date: "Feb 5, 2026",
        text: "Ordered this for my boss's birthday. The font options are great, and the quality feels way more expensive than it is.",
      },
      {
        name: "Nuwan M.",
        rating: 4,
        date: "Jan 22, 2026",
        text: "Really nice quality. Just wish I could preview the exact font before ordering. But the result was amazing!",
      },
    ],
  },

  // ── 10. Spirited Away Diorama ────────────────────────
  {
    slug: "spirited-away-diorama",
    name: "Spirited Away Diorama",
    tagline: "A world beyond the tunnel. 12,000 layers of Studio Ghibli magic.",
    category: "Anime Inspired",
    price: 8900,
    rating: 5.0,
    reviews: 45,
    gradient: "from-indigo-500/10 to-blue-500/5",
    date: "2026-02-26",
    story: {
      headline: "Every detail is a love letter to Miyazaki",
      paragraphs: [
        "This isn't a model. It's a miniature world. The Spirited Away Diorama recreates the iconic bathhouse scene in breathtaking detail — from the lantern-lit bridge to the towering bathhouse facade, complete with No-Face standing quietly at the entrance.",
        "We researched every frame of the film for architectural accuracy. The bathhouse's layered roofing, the traditional Japanese tile work, the warm glow of the windows — everything is reproduced at 1:64 scale with obsessive fidelity.",
        "The diorama includes integrated LED lighting (warm white) powered by USB-C. At night, the bathhouse windows glow exactly like they do in the film. It's not just a display piece. It's an experience.",
      ],
      designInspo:
        "Frame-by-frame analysis of the bathhouse scenes from Spirited Away (2001). Architectural references from traditional Japanese onsen bathhouses in Dōgo and Ginzan.",
      printJourney:
        "Printed in 28 separate components over 7 days across 4 printers. The bathhouse alone is 15 parts. Each tile on the roof is individually resolved at 0.04mm. LED wiring is integrated during assembly.",
    },
    specs: {
      dimensions: "35 × 25 × 30 cm",
      weight: "850g",
      material: "UV-cured resin + PLA+ (hybrid)",
      printTime: "168 hours (7 days total)",
      layerCount: "12,000+",
      finish: "Hand-painted with integrated USB-C LED lighting",
    },
    options: {
      finishes: [
        {
          name: "Full Color + LED",
          description: "Hand-painted with warm LED lighting",
        },
        {
          name: "Monochrome + LED",
          description: "All-white with LED for a sculptural look",
        },
      ],
    },
    lifestyleContexts: [
      "As the centerpiece of a Studio Ghibli collection",
      "On a bookshelf beside Miyazaki artbooks",
      "As a night light on a bedside table",
      "In a living room display as a conversation starter",
    ],
    badges: ["Collectors Edition", "Staff Pick"],
    isNew: true,
    relatedSlugs: [
      "tanjiro-kamado-bust",
      "gojo-satoru-figure",
      "mclaren-mcl60-model",
    ],
    reviewList: [
      {
        name: "Miyuki T.",
        rating: 5,
        date: "Feb 25, 2026",
        text: "I cried when I opened the box. The LED lighting at night makes the bathhouse glow exactly like in the film. This is ART.",
      },
      {
        name: "Roshane W.",
        rating: 5,
        date: "Feb 20, 2026",
        text: "I've seen dioramas from Japan that cost 5x this price and don't have this level of detail. The individual roof tiles are insane.",
      },
      {
        name: "Thinuli K.",
        rating: 5,
        date: "Feb 12, 2026",
        text: "Bought as a gift for myself. No regrets. My entire apartment has a cozy glow at night from the bathhouse windows. Magic.",
      },
    ],
  },

  // ── 11. Viral Fidget Cube Pro ────────────────────────
  {
    slug: "viral-fidget-cube-pro",
    name: "Viral Fidget Cube Pro",
    tagline: "Six sides. Six satisfactions. Stress doesn't stand a chance.",
    category: "Trending",
    price: 1500,
    rating: 4.7,
    reviews: 214,
    gradient: "from-fuchsia-500/10 to-purple-500/5",
    date: "2026-02-28",
    story: {
      headline: "The internet's favorite fidget, made physical",
      paragraphs: [
        "It started as a TikTok trend. A perfectly satisfying fidget cube that clicked, spun, rolled, slid, toggled, and flipped — six sides of pure tactile satisfaction. Millions of views. But nobody was making a premium version. Until now.",
        "Our Fidget Cube Pro isn't injection-molded junk from a factory. Each mechanism is individually engineered for a specific tactile feel: the click has 400g of resistance, the spinner has a ceramic bearing, the roller uses a textured surface.",
        "We 3D print-in-place — meaning the moving parts are printed already assembled inside the cube. No gluing, no snapping together. The mechanisms are born functional. It's manufacturing magic.",
      ],
      designInspo:
        "Inspired by the original Antsy Labs kickstarter concept, but re-engineered from scratch for premium feel. Each side was tested with 50+ people for optimal satisfaction.",
      printJourney:
        "Print-in-place (PIP) technology — the entire cube with all 6 mechanisms is printed in a single 14-hour run at 0.12mm resolution. No assembly needed. The cube comes off the printer fully functional.",
    },
    specs: {
      dimensions: "4 × 4 × 4 cm",
      weight: "65g",
      material: "PLA+ (plant-based polymer)",
      printTime: "14 hours",
      layerCount: "980",
      finish: "Matte textured (grip-optimized)",
    },
    options: {
      colors: [
        { name: "Neon Purple", hex: "#8b5cf6" },
        { name: "Electric Blue", hex: "#3b82f6" },
        { name: "Hot Pink", hex: "#ec4899" },
        { name: "Obsidian Black", hex: "#1a1a1a" },
        { name: "Glow-in-Dark", hex: "#a3e635" },
      ],
      materials: [
        {
          name: "Standard PLA+",
          description: "Smooth, lightweight, satisfying",
        },
        {
          name: "Soft-Touch TPU",
          description: "Rubberized texture for extra grip",
        },
      ],
    },
    lifestyleContexts: [
      "In your hand during a Zoom meeting",
      "On your desk between coding sessions",
      "In a backpack for commute fidgeting",
      "On a coffee table as a conversation piece",
    ],
    badges: ["Viral Hit", "Best Value"],
    isNew: true,
    relatedSlugs: [
      "geometric-desk-organizer",
      "cable-management-tower",
      "custom-name-plate-stand",
    ],
    reviewList: [
      {
        name: "Yasith P.",
        rating: 5,
        date: "Feb 28, 2026",
        text: "The clicky side is SO satisfying. I can't stop using it during meetings. Way better quality than the cheap ones from Alibaba.",
      },
      {
        name: "Chamathka R.",
        rating: 5,
        date: "Feb 25, 2026",
        text: "Got the Glow-in-Dark version. It actually glows super bright! My kids love it and so do I. Great stress reliever.",
      },
      {
        name: "Shehan D.",
        rating: 4,
        date: "Feb 20, 2026",
        text: "Really impressive that this is printed as one piece. The spinner side could be smoother but everything else is perfect.",
      },
    ],
  },

  // ── 12. Modular Headphone Hook ───────────────────────
  {
    slug: "modular-headphone-hook",
    name: "Modular Headphone Hook",
    tagline: "Where your headphones rest. Engineered for audio lovers.",
    category: "Desk & Organization",
    price: 2800,
    rating: 4.9,
    reviews: 58,
    gradient: "from-cyan-500/10 to-sky-500/5",
    date: "2026-02-12",
    story: {
      headline: "Your headphones deserve a throne, not a corner",
      paragraphs: [
        "Audiophiles spend thousands on headphones. Then they toss them on a desk, hang them on a monitor, or — worst of all — leave them on a bed. Your headphones deserve better. They deserve a throne.",
        "The Modular Headphone Hook is an under-desk or wall-mounted cradle designed to hold any headphone from Apple AirPods Max to Sennheiser HD800S. The curved padding prevents headband deformation, and the wide cradle distributes weight evenly.",
        "The 'modular' in the name isn't just marketing. The base hook can be extended with snap-on accessories: a cable management clip, a DAC holder shelf, and a dual-hook adapter for two pairs.",
      ],
      designInspo:
        "Inspired by high-end watch winders and guitar wall mounts — objects designed to display and protect expensive gear, not just store it.",
      printJourney:
        "The hook is printed in PETG for maximum strength — it can hold up to 2kg without flex. The padding insert is printed in flexible TPU rubber for cushioning. Total print: 9 hours.",
    },
    specs: {
      dimensions: "14 × 8 × 12 cm",
      weight: "160g",
      material: "PETG (structural) + TPU (padding)",
      printTime: "9 hours",
      layerCount: "1,600",
      finish: "Matte with rubberized TPU padding",
    },
    options: {
      colors: [
        { name: "Stealth Black", hex: "#1a1a1a" },
        { name: "Arctic White", hex: "#f0f0f0" },
        { name: "Space Grey", hex: "#5a5a5a" },
      ],
      materials: [
        {
          name: "PETG Standard",
          description: "Strong, reliable, matte finish",
        },
        {
          name: "PETG + Wood Fill",
          description: "Wood-look texture with real wood particles",
        },
      ],
    },
    lifestyleContexts: [
      "Under a desk holding premium over-ear headphones",
      "Wall-mounted next to a turntable setup",
      "On a studio desk in a podcast recording space",
      "Beside a gaming monitor for tournament-ready headsets",
    ],
    relatedSlugs: [
      "cable-management-tower",
      "geometric-desk-organizer",
      "viral-fidget-cube-pro",
    ],
    reviewList: [
      {
        name: "Tharindu K.",
        rating: 5,
        date: "Feb 11, 2026",
        text: "My Sennheiser HD600s sit perfectly on this. The TPU padding is a genius touch. No more headband marks!",
      },
      {
        name: "Ishani M.",
        rating: 5,
        date: "Feb 3, 2026",
        text: "Got the wood-fill version for my home studio. It looks incredible next to my wooden desk. The cable clip add-on is essential.",
      },
      {
        name: "Dilan S.",
        rating: 5,
        date: "Jan 25, 2026",
        text: "Attached under my desk. Completely invisible but always accessible. Exactly what I needed for my clean setup.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// Utility functions
// ─────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];
}

export function formatPrice(price: number): string {
  return `LKR ${price.toLocaleString()}`;
}

export function getAllSlugs(): string[] {
  return allProducts.map((p) => p.slug);
}
