import { MongoClient, type Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

// Cache the client across hot-reloads in development
let cached = (global as Record<string, unknown>).__mongoClient as {
  client: MongoClient;
  db: Db;
} | undefined;

export async function getDb(): Promise<Db> {
  if (cached) return cached.db;

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(); // uses the DB name from the connection string ("layerd")

  cached = { client, db };
  (global as Record<string, unknown>).__mongoClient = cached;

  return db;
}
