/**
 * Seed script — populates MongoDB with initial data
 *
 * Run:  npx tsx scripts/seed.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";

// ── Import existing static data ────────────────────────
// We inline the product data here since this script runs outside Next.js
// and cannot use path aliases (@/lib/...).

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment variables");
  process.exit(1);
}

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();

  // ── 1. Create indexes ──────────────────────────────────
  console.log("📑 Creating indexes...");
  await db
    .collection("products")
    .createIndex({ slug: 1 }, { unique: true });
  await db
    .collection("admin_users")
    .createIndex({ email: 1 }, { unique: true });
  await db
    .collection("newsletter_subscribers")
    .createIndex({ email: 1 }, { unique: true });
  await db
    .collection("site_content")
    .createIndex({ key: 1 }, { unique: true });

  // ── 2. Seed super admin ────────────────────────────────
  console.log("👤 Creating super admin...");
  const adminEmail = "admin@layerd.lk";
  const adminPassword = "Layerd@2026";
  const existingAdmin = await db
    .collection("admin_users")
    .findOne({ email: adminEmail });

  if (!existingAdmin) {
    await db.collection("admin_users").insertOne({
      name: "Layerd Admin",
      email: adminEmail,
      passwordHash: await hash(adminPassword, 12),
      role: "super_admin",
      createdAt: new Date(),
      lastLogin: null,
    });
    console.log(`   ✅ Admin created: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("   ⏭️  Admin already exists, skipping.");
  }

  // ── 3. Seed pricing config ─────────────────────────────
  console.log("💰 Seeding pricing config...");
  const existingPricing = await db
    .collection("pricing_config")
    .findOne({ key: "global_pricing" });

  if (!existingPricing) {
    await db.collection("pricing_config").insertOne({
      key: "global_pricing",
      materialCostPerKg: 3500,
      hourlyRate: 500,
      electricityRate: 50,
      laborCost: 300,
      failureMargin: 0.1,
      profitMargin: 0.35,
      materialMultipliers: { PLA: 1.0, PETG: 1.25, ABS: 1.15 },
      finishSurcharges: { Standard: 0, Smoothed: 250, Painted: 600 },
      materials: [
        { id: "PLA", label: "PLA", description: "Most popular, great surface finish" },
        { id: "PETG", label: "PETG", description: "Stronger, heat & chemical resistant" },
        { id: "ABS", label: "ABS", description: "Tough & impact resistant" },
      ],
      finishes: [
        { id: "Standard", label: "Standard", description: "Straight off the printer" },
        { id: "Smoothed", label: "Smoothed", description: "Sanded & polished surface" },
        { id: "Painted", label: "Painted", description: "Hand-painted with your colour choice" },
      ],
      updatedAt: new Date(),
    });
    console.log("   ✅ Pricing config created.");
  } else {
    console.log("   ⏭️  Pricing config already exists, skipping.");
  }

  // ── 4. Seed site content ───────────────────────────────
  console.log("📝 Seeding site content...");
  const contentEntries = [
    {
      key: "hero_headline",
      section: "home",
      contentType: "text",
      value: "This wasn't bought. It was built.",
    },
    {
      key: "hero_subheadline",
      section: "home",
      contentType: "text",
      value: "Sri Lanka's first premium 3D-printed lifestyle brand. Every product is printed layer by layer — designed with obsession, crafted with patience.",
    },
    {
      key: "brand_story_headline",
      section: "home",
      contentType: "text",
      value: "Why we exist",
    },
    {
      key: "brand_story_body",
      section: "home",
      contentType: "rich_text",
      value: "We believe the best things aren't mass-produced. They're imagined, designed, and printed — one layer at a time.",
    },
    {
      key: "about_headline",
      section: "about",
      contentType: "text",
      value: "We are Layerd",
    },
    {
      key: "about_body",
      section: "about",
      contentType: "rich_text",
      value: "A collective of designers, engineers, and dreamers building premium 3D-printed products in Sri Lanka.",
    },
    {
      key: "custom_headline",
      section: "custom",
      contentType: "text",
      value: "Build Something Yours",
    },
    {
      key: "footer_tagline",
      section: "footer",
      contentType: "text",
      value: "Every layer tells a story.",
    },
  ];

  for (const entry of contentEntries) {
    const existing = await db
      .collection("site_content")
      .findOne({ key: entry.key });
    if (!existing) {
      await db.collection("site_content").insertOne({
        ...entry,
        updatedAt: new Date(),
        updatedBy: null,
      });
    }
  }
  console.log("   ✅ Site content seeded.");

  // ── 5. Seed products ───────────────────────────────────
  console.log("📦 Seeding products...");
  const existingProductCount = await db
    .collection("products")
    .countDocuments();

  if (existingProductCount === 0) {
    const now = new Date();
    const products = getProductData().map((p) => ({
      ...p,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }));
    await db.collection("products").insertMany(products);
    console.log(`   ✅ ${products.length} products inserted.`);
  } else {
    console.log(
      `   ⏭️  ${existingProductCount} products already exist, skipping.`
    );
  }

  // ── 6. Migrate existing quotation_requests → quotation_orders ─
  console.log("📋 Checking for quotation_requests migration...");
  const collections = await db.listCollections().toArray();
  const hasOldCollection = collections.some(
    (c) => c.name === "quotation_requests"
  );

  if (hasOldCollection) {
    const oldDocs = await db
      .collection("quotation_requests")
      .find()
      .toArray();
    if (oldDocs.length > 0) {
      const migrated = oldDocs.map((doc, i) => {
        const { _id, ...rest } = doc;
        return {
          ...rest,
          orderNumber: `QO-${String(i + 1).padStart(3, "0")}`,
          status: doc.status || "pending",
          adminNotes: "",
          quotedPrice: null,
          updatedAt: doc.createdAt || new Date(),
        };
      });
      await db.collection("quotation_orders").insertMany(migrated);
      console.log(
        `   ✅ Migrated ${migrated.length} quotation requests → quotation_orders.`
      );
    } else {
      console.log("   ⏭️  No old quotation_requests to migrate.");
    }
  } else {
    console.log("   ⏭️  No quotation_requests collection found.");
  }

  console.log("\n🎉 Seed complete!\n");
  await client.close();
}

// ─────────────────────────────────────────────────────────
// Product data (copied from lib/products.ts for standalone use)
// ─────────────────────────────────────────────────────────

function getProductData() {
  return [
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
        designInspo: "Inspired by crystalline mineral formations and Bauhaus principles — where function defines form, and form becomes art.",
        printJourney: "Printed over 72 hours in a continuous run. 2,847 layers of PLA+ at 0.12mm resolution. No supports needed thanks to our optimized geometry. Finished with a hand-sanded matte coat.",
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
      relatedSlugs: ["cable-management-tower", "modular-headphone-hook", "minimalist-vase-collection"],
      reviewList: [
        { name: "Ashan P.", rating: 5, date: "Feb 18, 2026", text: "This is hands-down the most beautiful desk accessory I own. The matte finish is gorgeous and it holds everything perfectly." },
        { name: "Kavini R.", rating: 5, date: "Feb 10, 2026", text: "Got the Obsidian Black. It's heavy, solid, and looks like something from a design museum. Worth every rupee." },
        { name: "Dineth M.", rating: 4, date: "Jan 29, 2026", text: "Great organizer! Only wish the XL size was available sooner. The standard fits most things, but I have a lot of pens." },
      ],
    },
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
          "Gojo Satoru isn't just a character — he's a phenomenon. And a phenomenon deserves more than mass-produced PVC.",
          "We spent three months perfecting the pose. The slight tilt of the head, the casual arrogance of his stance — it had to feel alive, not posed.",
          "Printed in high-resolution resin at 0.05mm layers, then hand-painted with automotive-grade acrylics. Each piece takes over 12 hours of post-processing.",
        ],
        designInspo: "Referenced the manga panels from volume 15 and the iconic Domain Expansion scene.",
        printJourney: "Resin-printed in 6 separate parts at 0.05mm resolution. Assembled, sanded through 5 grits, primed, and hand-painted over 12 hours.",
      },
      specs: { dimensions: "22 × 10 × 10 cm", weight: "280g", material: "UV-cured resin", printTime: "18 hours (print) + 12 hours (finish)", layerCount: "4,200", finish: "Hand-painted with clear coat" },
      options: {
        finishes: [
          { name: "Standard Paint", description: "Full color hand-painted" },
          { name: "Monochrome", description: "Single-tone grayscale for a manga feel" },
          { name: "Metallic", description: "Pearlescent base coat with metallic accents" },
        ],
      },
      lifestyleContexts: ["On a collector's display shelf", "Next to your manga collection", "On a gaming desktop setup", "In a glass display case with LED lighting"],
      badges: ["Top Rated", "Fan Favorite"],
      isNew: true,
      relatedSlugs: ["tanjiro-kamado-bust", "spirited-away-diorama", "f1-helmet-replica-stand"],
      reviewList: [
        { name: "Ruwan K.", rating: 5, date: "Feb 24, 2026", text: "Best quality I've seen from a local maker. The paint job is insane." },
        { name: "Thilini S.", rating: 5, date: "Feb 20, 2026", text: "Got this as a gift for my brother. He actually teared up." },
        { name: "Naveen J.", rating: 5, date: "Feb 15, 2026", text: "The metallic finish option is INCREDIBLE. Museum quality." },
      ],
    },
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
          "Formula 1 isn't just a sport. It's engineering poetry at 300km/h.",
          "The stand cradles a 1:2 scale helmet replica with surgical precision.",
          "We partnered with local motorsport enthusiasts to get every angle right.",
        ],
        designInspo: "The base profile mirrors the endplate curves of the 2024 regulation front wings.",
        printJourney: "Printed in PETG for superior strength, then finished with a carbon-fiber texture vinyl wrap option.",
      },
      specs: { dimensions: "25 × 18 × 20 cm", weight: "450g", material: "PETG (high-strength polymer)", printTime: "48 hours", layerCount: "3,100", finish: "Smooth with optional carbon wrap", infill: "30% cubic" },
      options: {
        colors: [
          { name: "Race Red", hex: "#c62828" },
          { name: "Papaya Orange", hex: "#ff8c00" },
          { name: "British Racing Green", hex: "#1b5e20" },
          { name: "Stealth Black", hex: "#111111" },
        ],
        finishes: [
          { name: "Smooth Matte", description: "Clean, no-frills surface" },
          { name: "Carbon Fiber Wrap", description: "Real carbon-fiber texture finish" },
        ],
      },
      lifestyleContexts: ["On a motorsport memorabilia shelf", "In a sim-racing cockpit setup", "On a bedside table for the true fan", "In a man-cave with F1 memorabilia"],
      relatedSlugs: ["mclaren-mcl60-model", "gojo-satoru-figure", "modular-headphone-hook"],
      reviewList: [
        { name: "Chamath D.", rating: 5, date: "Feb 16, 2026", text: "The carbon fiber wrap option is a game changer." },
        { name: "Ishara W.", rating: 5, date: "Feb 8, 2026", text: "Fits my 1:2 Verstappen helmet perfectly." },
        { name: "Amila F.", rating: 4, date: "Jan 30, 2026", text: "Great quality! Would love a 1:1 scale version." },
      ],
    },
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
          "Minimalism isn't about having less. It's about having only what matters.",
          "Each vase is designed around a single mathematical curve.",
          "The collection works individually as accent pieces or together as a trio.",
        ],
        designInspo: "Inspired by Scandinavian design principles and Japanese wabi-sabi.",
        printJourney: "Each vase is printed in a single continuous spiral (vase mode) — one unbroken line of filament.",
      },
      specs: { dimensions: "8 × 8 × 18 cm (each)", weight: "150g (each)", material: "PLA+ (plant-based polymer)", printTime: "6 hours (per vase)", layerCount: "1,500 (per vase)", finish: "Spiral vase mode (seamless)" },
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
      lifestyleContexts: ["On a Scandinavian-style floating shelf", "As a dining table centerpiece", "On a bathroom vanity", "In a sunlit reading nook"],
      relatedSlugs: ["hexagonal-wall-planter", "geometric-desk-organizer", "custom-name-plate-stand"],
      reviewList: [
        { name: "Sachini M.", rating: 5, date: "Jan 25, 2026", text: "The Sage Green is stunning." },
        { name: "Dulanjali P.", rating: 4, date: "Jan 18, 2026", text: "Love the seamless finish." },
        { name: "Lahiru B.", rating: 5, date: "Jan 10, 2026", text: "Bought the whole collection. Terracotta is perfection." },
      ],
    },
    {
      slug: "tanjiro-kamado-bust",
      name: "Tanjiro Kamado Bust",
      tagline: "The breath of the sun, frozen in resin. 5,600 layers of dedication.",
      category: "Anime Inspired",
      price: 6800,
      rating: 4.9,
      reviews: 64,
      gradient: "from-emerald-500/10 to-cyan-500/5",
      date: "2026-02-22",
      story: {
        headline: "A boy who carried the weight of kindness",
        paragraphs: [
          "Tanjiro's story is one of relentless compassion in a world of demons.",
          "We chose the bust format deliberately — a portrait, not a pose.",
          "Every earring link, every hair strand, every crack in the scar is individually sculpted.",
        ],
        designInspo: "Inspired by classical Roman portrait busts merged with Chapter 1.",
        printJourney: "Main bust in matte grey resin, water effect in translucent blue resin. 22 hours total print time.",
      },
      specs: { dimensions: "18 × 14 × 24 cm", weight: "420g", material: "UV-cured resin (dual-color)", printTime: "22 hours (print) + 15 hours (finish)", layerCount: "5,600", finish: "Hand-painted with translucent base" },
      options: {
        finishes: [
          { name: "Full Color", description: "Manga-accurate hand-painted" },
          { name: "Bronze Patina", description: "Classical bust look with aged bronze" },
          { name: "Raw Resin", description: "Unpainted, showing pure print detail" },
        ],
      },
      lifestyleContexts: ["As the centerpiece of an anime display shelf", "On a study desk for daily inspiration", "In a glass cabinet with dramatic lighting", "Beside a window for the translucent base"],
      badges: ["Limited Edition"],
      relatedSlugs: ["gojo-satoru-figure", "spirited-away-diorama", "f1-helmet-replica-stand"],
      reviewList: [
        { name: "Pasan L.", rating: 5, date: "Feb 21, 2026", text: "The translucent water effect on the base is unbelievable." },
        { name: "Nimali V.", rating: 5, date: "Feb 14, 2026", text: "Bronze Patina finish looks like a museum artifact." },
        { name: "Kasun R.", rating: 4, date: "Feb 5, 2026", text: "Stunning piece. Please make a matching Nezuko bust!" },
      ],
    },
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
          "You know those impossibly clean desk setups on Reddit?",
          "The Cable Management Tower uses a vertical stacking system with snap-fit cable channels.",
          "The snap-fit mechanism means no tools, no glue, no drilling.",
        ],
        designInspo: "Inspired by server rack cable management systems, scaled down to desk proportions.",
        printJourney: "Printed as 4 interlocking tiers with snap-fit connectors. Each tier is a 5-hour print.",
      },
      specs: { dimensions: "8 × 8 × 30 cm (4 tiers)", weight: "280g", material: "PLA+ (plant-based polymer)", printTime: "20 hours (4 tiers)", layerCount: "2,100", finish: "Matte textured", infill: "20% grid" },
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
      lifestyleContexts: ["Hidden behind a monitor", "Under a standing desk", "Beside a gaming PC", "At a co-working hot desk"],
      relatedSlugs: ["geometric-desk-organizer", "modular-headphone-hook", "hexagonal-wall-planter"],
      reviewList: [
        { name: "Tharaka S.", rating: 5, date: "Feb 8, 2026", text: "This thing is a lifesaver. My desk looks 10x cleaner." },
        { name: "Malika D.", rating: 4, date: "Jan 28, 2026", text: "Works great for most cables. Get the 6-tier version." },
        { name: "Sandun J.", rating: 5, date: "Jan 20, 2026", text: "Bought two — one for home, one for office." },
      ],
    },
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
          "The McLaren MCL60 isn't just a car. It's the embodiment of McLaren's resurgence.",
          "Every aerodynamic element is faithfully reproduced at 1:18 scale.",
          "We developed a custom papaya orange filament specifically for this model.",
        ],
        designInspo: "A love letter to the MCL60's aerodynamic philosophy.",
        printJourney: "Printed across 3 machines over 5 days. 200+ individual parts at 0.08mm resolution.",
      },
      specs: { dimensions: "30 × 14 × 8 cm", weight: "380g", material: "PLA+ & PETG (multi-material)", printTime: "120 hours total", layerCount: "8,400+", finish: "Gloss clear coat with custom papaya" },
      options: {
        finishes: [
          { name: "Papaya Gloss", description: "Official McLaren papaya with clear coat" },
          { name: "Chrome Edition", description: "Reflective chrome-look finish" },
          { name: "Gulf Livery", description: "Classic powder blue and orange" },
        ],
      },
      lifestyleContexts: ["On a dedicated motorsport display shelf", "In a home office", "In a glass case with track lighting", "On a coffee table book"],
      badges: ["New Drop", "Limited Edition"],
      isNew: true,
      relatedSlugs: ["f1-helmet-replica-stand", "geometric-desk-organizer", "gojo-satoru-figure"],
      reviewList: [
        { name: "Ravindu T.", rating: 5, date: "Feb 27, 2026", text: "On par with Amalgam and Spark. The DRS flap moves!" },
        { name: "Hashini L.", rating: 5, date: "Feb 25, 2026", text: "Gulf Livery is absolutely stunning." },
        { name: "Chanuka M.", rating: 5, date: "Feb 22, 2026", text: "200 parts, you can tell. Collector's dream." },
      ],
    },
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
          "We wanted to grow herbs in our apartment but had zero counter space.",
          "Each hexagonal pod tessellates infinitely — start with three, grow to thirty.",
          "The magnetic mounting system is the real magic.",
        ],
        designInspo: "Inspired by natural honeycomb structures and USM Haller modular design.",
        printJourney: "Each hexagonal pod is a 3-hour print with an integrated drainage layer.",
      },
      specs: { dimensions: "12 × 10 × 8 cm (per pod)", weight: "95g (per pod)", material: "PETG (water-resistant)", printTime: "3 hours (per pod)", layerCount: "850 (per pod)", finish: "Matte textured with drainage mesh" },
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
      lifestyleContexts: ["As a herb garden in a small kitchen", "Creating a living wall", "In a bathroom for air-purifying plants", "Around a window frame"],
      relatedSlugs: ["minimalist-vase-collection", "geometric-desk-organizer", "custom-name-plate-stand"],
      reviewList: [
        { name: "Anusha F.", rating: 5, date: "Jan 12, 2026", text: "Started with 3. Now I have 15. The magnetic system is genius." },
        { name: "Kavindu P.", rating: 4, date: "Dec 28, 2025", text: "Love the concept. I'd like deeper pods though." },
        { name: "Nimesha S.", rating: 5, date: "Dec 15, 2025", text: "Best housewarming gift ever." },
      ],
    },
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
          "This is a 3D-sculptured identity marker — your name rising from an architecturally designed base.",
          "We offer 8 font styles, each optimized for 3D printing.",
          "The base presents your name at 20° — the scientifically optimal reading angle.",
        ],
        designInspo: "Museum exhibit labels meet modern typography.",
        printJourney: "Custom text generated on order, printed at 0.1mm resolution. Base and text are one continuous piece.",
      },
      specs: { dimensions: "20 × 6 × 8 cm", weight: "180g", material: "PLA+ (plant-based polymer)", printTime: "8 hours", layerCount: "1,200", finish: "Matte or Silk (customizable)" },
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
          { name: "Silk", description: "Elegant sheen, catches light beautifully" },
        ],
      },
      customization: {
        allowCustomText: { maxLength: 20, placeholder: "Enter your name or text..." },
        allowCustomColors: true,
        description: "Personalize this name plate with your name (up to 20 characters).",
      },
      isCustomizable: true,
      lifestyleContexts: ["On your work desk", "As a gift", "At a reception desk", "On a bookshelf"],
      badges: ["Most Gifted", "Customizable"],
      relatedSlugs: ["geometric-desk-organizer", "minimalist-vase-collection", "viral-fidget-cube-pro"],
      reviewList: [
        { name: "Hirantha J.", rating: 5, date: "Feb 13, 2026", text: "The silk finish in Warm Gold is ridiculously premium." },
        { name: "Dilini A.", rating: 5, date: "Feb 5, 2026", text: "Ordered this for my boss's birthday. Amazing quality." },
        { name: "Nuwan M.", rating: 4, date: "Jan 22, 2026", text: "Really nice quality. Wish I could preview the font." },
      ],
    },
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
          "This isn't a model. It's a miniature world recreating the iconic bathhouse scene.",
          "We researched every frame of the film for architectural accuracy.",
          "The diorama includes integrated LED lighting (warm white) powered by USB-C.",
        ],
        designInspo: "Frame-by-frame analysis of the bathhouse scenes from Spirited Away (2001).",
        printJourney: "Printed in 28 separate components over 7 days across 4 printers.",
      },
      specs: { dimensions: "35 × 25 × 30 cm", weight: "850g", material: "UV-cured resin + PLA+ (hybrid)", printTime: "168 hours (7 days total)", layerCount: "12,000+", finish: "Hand-painted with integrated USB-C LED lighting" },
      options: {
        finishes: [
          { name: "Full Color + LED", description: "Hand-painted with warm LED lighting" },
          { name: "Monochrome + LED", description: "All-white with LED for a sculptural look" },
        ],
      },
      lifestyleContexts: ["As the centerpiece of a Ghibli collection", "On a bookshelf beside Miyazaki artbooks", "As a night light", "In a living room as a conversation starter"],
      badges: ["Collectors Edition", "Staff Pick"],
      isNew: true,
      relatedSlugs: ["tanjiro-kamado-bust", "gojo-satoru-figure", "mclaren-mcl60-model"],
      reviewList: [
        { name: "Miyuki T.", rating: 5, date: "Feb 25, 2026", text: "I cried when I opened the box. This is ART." },
        { name: "Roshane W.", rating: 5, date: "Feb 20, 2026", text: "Better detail than models costing 5x this price." },
        { name: "Thinuli K.", rating: 5, date: "Feb 12, 2026", text: "My apartment has a cozy glow at night from the bathhouse windows." },
      ],
    },
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
          "It started as a TikTok trend. We made a premium version.",
          "Each mechanism is individually engineered for a specific tactile feel.",
          "We 3D print-in-place — moving parts are printed already assembled.",
        ],
        designInspo: "Re-engineered from the original Antsy Labs concept for premium feel.",
        printJourney: "Print-in-place (PIP) technology — the entire cube printed in a single 14-hour run.",
      },
      specs: { dimensions: "4 × 4 × 4 cm", weight: "65g", material: "PLA+ (plant-based polymer)", printTime: "14 hours", layerCount: "980", finish: "Matte textured (grip-optimized)" },
      options: {
        colors: [
          { name: "Neon Purple", hex: "#8b5cf6" },
          { name: "Electric Blue", hex: "#3b82f6" },
          { name: "Hot Pink", hex: "#ec4899" },
          { name: "Obsidian Black", hex: "#1a1a1a" },
          { name: "Glow-in-Dark", hex: "#a3e635" },
        ],
        materials: [
          { name: "Standard PLA+", description: "Smooth, lightweight, satisfying" },
          { name: "Soft-Touch TPU", description: "Rubberized texture for extra grip" },
        ],
      },
      lifestyleContexts: ["In your hand during a Zoom meeting", "On your desk between coding sessions", "In a backpack for commute fidgeting", "On a coffee table"],
      badges: ["Viral Hit", "Best Value"],
      isNew: true,
      relatedSlugs: ["geometric-desk-organizer", "cable-management-tower", "custom-name-plate-stand"],
      reviewList: [
        { name: "Yasith P.", rating: 5, date: "Feb 28, 2026", text: "The clicky side is SO satisfying." },
        { name: "Chamathka R.", rating: 5, date: "Feb 25, 2026", text: "Got the Glow-in-Dark version. It actually glows!" },
        { name: "Shehan D.", rating: 4, date: "Feb 20, 2026", text: "Really impressive print-in-place technology." },
      ],
    },
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
          "Audiophiles spend thousands on headphones. Then they toss them on a desk.",
          "The Modular Headphone Hook is designed to hold any headphone from AirPods Max to HD800S.",
          "The base hook can be extended with snap-on accessories.",
        ],
        designInspo: "Inspired by high-end watch winders and guitar wall mounts.",
        printJourney: "The hook is printed in PETG for maximum strength. The padding insert is printed in flexible TPU.",
      },
      specs: { dimensions: "14 × 8 × 12 cm", weight: "160g", material: "PETG (structural) + TPU (padding)", printTime: "9 hours", layerCount: "1,600", finish: "Matte with rubberized TPU padding" },
      options: {
        colors: [
          { name: "Stealth Black", hex: "#1a1a1a" },
          { name: "Arctic White", hex: "#f0f0f0" },
          { name: "Space Grey", hex: "#5a5a5a" },
        ],
        materials: [
          { name: "PETG Standard", description: "Strong, reliable, matte finish" },
          { name: "PETG + Wood Fill", description: "Wood-look texture with real wood particles" },
        ],
      },
      lifestyleContexts: ["Under a desk holding premium headphones", "Wall-mounted next to a turntable", "On a studio desk", "Beside a gaming monitor"],
      relatedSlugs: ["cable-management-tower", "geometric-desk-organizer", "viral-fidget-cube-pro"],
      reviewList: [
        { name: "Tharindu K.", rating: 5, date: "Feb 11, 2026", text: "My Sennheiser HD600s sit perfectly on this." },
        { name: "Ishani M.", rating: 5, date: "Feb 3, 2026", text: "Wood-fill version looks incredible." },
        { name: "Dilan S.", rating: 5, date: "Jan 25, 2026", text: "Completely invisible but always accessible." },
      ],
    },
  ];
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
