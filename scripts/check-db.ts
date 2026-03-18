import { config } from "dotenv";
config({ path: ".env.local" });

import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

async function check() {
  if (!MONGODB_URI) {
    console.error("No URL");
    process.exit(1);
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();
  const admins = await db.collection("admin_users").find().toArray();
  console.log("Admins present:", admins.length);
  for (const admin of admins) {
    console.log(`- ${admin.email} (Role: ${admin.role})`);
    console.log(`  Hash from DB: ${admin.passwordHash}`);
  }
  process.exit(0);
}
check();
