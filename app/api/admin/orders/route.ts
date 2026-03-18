import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getOrders } from "@/lib/db-helpers";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const statusFilter = searchParams.get("status");

  try {
    const filter = statusFilter ? { status: statusFilter } : {};
    const orders = await getOrders(filter, page, limit);
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
