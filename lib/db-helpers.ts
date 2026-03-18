import { ObjectId, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export interface AdminUser {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: "super_admin" | "admin";
  createdAt: Date;
  lastLogin: Date | null;
}

export interface DbProduct {
  _id?: ObjectId;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  gradient: string;
  date: string;
  story: {
    headline: string;
    paragraphs: string[];
    designInspo: string;
    printJourney: string;
  };
  specs: {
    dimensions: string;
    weight: string;
    material: string;
    printTime: string;
    layerCount: string;
    finish: string;
    infill?: string;
  };
  options?: {
    colors?: { name: string; hex: string }[];
    sizes?: { label: string; dimensions: string }[];
    materials?: { name: string; description: string }[];
    finishes?: { name: string; description: string }[];
  };
  customization?: {
    allowCustomText?: { maxLength: number; placeholder: string };
    allowCustomImage?: boolean;
    allowCustomColors?: boolean;
    description: string;
  };
  lifestyleContexts: string[];
  badges?: string[];
  isNew?: boolean;
  isCustomizable?: boolean;
  relatedSlugs: string[];
  reviewList: { name: string; rating: number; date: string; text: string }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationOrder {
  _id?: ObjectId;
  orderNumber: string;
  customerDetails: { name: string; email: string; phone: string };
  creationData: {
    method: string;
    description: string;
    dimensions: string;
    notes: string;
    material: string;
    finish: string;
    quantity: number;
    fileAttached: boolean;
    imageAttached: boolean;
  };
  pricingData: { weightGrams: number; printTimeHours: number };
  fileUrl: string | null;
  status:
    | "pending"
    | "reviewed"
    | "quoted"
    | "accepted"
    | "rejected"
    | "completed";
  adminNotes: string;
  quotedPrice: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterSubscriber {
  _id?: ObjectId;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

export interface SiteContent {
  _id?: ObjectId;
  key: string;
  section: string;
  contentType: "text" | "rich_text" | "json";
  value: string | Record<string, unknown>;
  updatedAt: Date;
  updatedBy: ObjectId | null;
}

export interface PricingConfig {
  _id?: ObjectId;
  key: string;
  materialCostPerKg: number;
  hourlyRate: number;
  electricityRate: number;
  laborCost: number;
  failureMargin: number;
  profitMargin: number;
  materialMultipliers: Record<string, number>;
  finishSurcharges: Record<string, number>;
  materials: { id: string; label: string; description: string }[];
  finishes: { id: string; label: string; description: string }[];
  updatedAt: Date;
}

// ─────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────

export async function getAllProducts(onlyActive = true) {
  const db = await getDb();
  const filter = onlyActive ? { isActive: true } : {};
  return db
    .collection<DbProduct>("products")
    .find(filter)
    .sort({ date: -1 })
    .toArray();
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  return db.collection<DbProduct>("products").findOne({ slug });
}

export async function getRelatedProducts(slugs: string[]) {
  if (!slugs || slugs.length === 0) return [];
  const db = await getDb();
  return db.collection<DbProduct>("products")
    .find({ slug: { $in: slugs }, isActive: true })
    .toArray();
}

export async function createProduct(
  product: Omit<DbProduct, "_id" | "createdAt" | "updatedAt">
) {
  const db = await getDb();
  const now = new Date();
  return db.collection<DbProduct>("products").insertOne({
    ...product,
    createdAt: now,
    updatedAt: now,
  } as DbProduct);
}

export async function updateProduct(
  slug: string,
  updates: Partial<DbProduct>
) {
  const db = await getDb();
  return db
    .collection<DbProduct>("products")
    .updateOne({ slug }, { $set: { ...updates, updatedAt: new Date() } });
}

export async function deleteProduct(slug: string) {
  const db = await getDb();
  return db
    .collection<DbProduct>("products")
    .updateOne({ slug }, { $set: { isActive: false, updatedAt: new Date() } });
}

export async function getProductCount(onlyActive = true) {
  const db = await getDb();
  const filter = onlyActive ? { isActive: true } : {};
  return db.collection<DbProduct>("products").countDocuments(filter);
}

// ─────────────────────────────────────────────────────────
// QUOTATION ORDERS
// ─────────────────────────────────────────────────────────

export async function getOrders(
  filter: Record<string, unknown> = {},
  page = 1,
  limit = 20
) {
  const db = await getDb();
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    db
      .collection<QuotationOrder>("quotation_orders")
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    db
      .collection<QuotationOrder>("quotation_orders")
      .countDocuments(filter),
  ]);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getOrderById(id: string) {
  const db = await getDb();
  return db
    .collection<QuotationOrder>("quotation_orders")
    .findOne({ _id: new ObjectId(id) });
}

export async function updateOrderStatus(
  id: string,
  updates: {
    status?: QuotationOrder["status"];
    adminNotes?: string;
    quotedPrice?: number | null;
  }
) {
  const db = await getDb();
  return db
    .collection<QuotationOrder>("quotation_orders")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );
}

export async function getOrderCount(status?: QuotationOrder["status"]) {
  const db = await getDb();
  const filter = status ? { status } : {};
  return db
    .collection<QuotationOrder>("quotation_orders")
    .countDocuments(filter);
}

export async function getNextOrderNumber() {
  const db = await getDb();
  const lastOrder = await db
    .collection<QuotationOrder>("quotation_orders")
    .find()
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray();

  if (lastOrder.length === 0) return "QO-001";

  const lastNum = parseInt(lastOrder[0].orderNumber.replace("QO-", ""), 10);
  return `QO-${String(lastNum + 1).padStart(3, "0")}`;
}

// ─────────────────────────────────────────────────────────
// NEWSLETTER SUBSCRIBERS
// ─────────────────────────────────────────────────────────

export async function getSubscribers(page = 1, limit = 50) {
  const db = await getDb();
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    db
      .collection<NewsletterSubscriber>("newsletter_subscribers")
      .find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    db
      .collection<NewsletterSubscriber>("newsletter_subscribers")
      .countDocuments({ isActive: true }),
  ]);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function addSubscriber(email: string) {
  const db = await getDb();
  return db
    .collection<NewsletterSubscriber>("newsletter_subscribers")
    .updateOne(
      { email },
      {
        $set: { isActive: true },
        $setOnInsert: { email, subscribedAt: new Date() },
      },
      { upsert: true }
    );
}

export async function removeSubscriber(email: string) {
  const db = await getDb();
  return db
    .collection<NewsletterSubscriber>("newsletter_subscribers")
    .updateOne({ email }, { $set: { isActive: false } });
}

export async function getSubscriberCount() {
  const db = await getDb();
  return db
    .collection<NewsletterSubscriber>("newsletter_subscribers")
    .countDocuments({ isActive: true });
}

// ─────────────────────────────────────────────────────────
// SITE CONTENT
// ─────────────────────────────────────────────────────────

export async function getSiteContent(section?: string) {
  const db = await getDb();
  const filter = section ? { section } : {};
  return db
    .collection<SiteContent>("site_content")
    .find(filter)
    .sort({ key: 1 })
    .toArray();
}

export async function getSiteContentByKey(key: string) {
  const db = await getDb();
  return db.collection<SiteContent>("site_content").findOne({ key });
}

export async function updateSiteContent(
  key: string,
  value: string | Record<string, unknown>,
  adminId: ObjectId
) {
  const db = await getDb();
  return db.collection<SiteContent>("site_content").updateOne(
    { key },
    {
      $set: {
        value,
        updatedAt: new Date(),
        updatedBy: adminId,
      },
    }
  );
}

// ─────────────────────────────────────────────────────────
// PRICING CONFIG
// ─────────────────────────────────────────────────────────

export async function getPricingConfig() {
  const db = await getDb();
  return db
    .collection<PricingConfig>("pricing_config")
    .findOne({ key: "global_pricing" });
}

export async function updatePricingConfig(
  updates: Partial<Omit<PricingConfig, "_id" | "key">>
) {
  const db = await getDb();
  return db
    .collection<PricingConfig>("pricing_config")
    .updateOne(
      { key: "global_pricing" },
      { $set: { ...updates, updatedAt: new Date() } }
    );
}

// ─────────────────────────────────────────────────────────
// ADMIN USERS
// ─────────────────────────────────────────────────────────

export async function getAdminByEmail(email: string) {
  const db = await getDb();
  return db.collection<AdminUser>("admin_users").findOne({ email });
}

export async function getAdminById(id: string) {
  const db = await getDb();
  return db
    .collection<AdminUser>("admin_users")
    .findOne({ _id: new ObjectId(id) });
}

export async function createAdmin(
  admin: Omit<AdminUser, "_id" | "createdAt" | "lastLogin">
) {
  const db = await getDb();
  return db.collection<AdminUser>("admin_users").insertOne({
    ...admin,
    createdAt: new Date(),
    lastLogin: null,
  } as AdminUser);
}

export async function updateAdminLastLogin(id: string) {
  const db = await getDb();
  return db
    .collection<AdminUser>("admin_users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { lastLogin: new Date() } });
}

export async function getAllAdmins() {
  const db = await getDb();
  return db
    .collection<AdminUser>("admin_users")
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function deleteAdmin(id: string) {
  const db = await getDb();
  return db
    .collection<AdminUser>("admin_users")
    .deleteOne({ _id: new ObjectId(id) });
}
