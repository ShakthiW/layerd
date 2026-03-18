import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSubscribers } from "@/lib/db-helpers";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);

  try {
    const subscribers = await getSubscribers(page, limit);
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Subscribers API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
