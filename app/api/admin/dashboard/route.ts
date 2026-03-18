import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getProductCount,
  getOrderCount,
  getSubscriberCount,
  getOrders,
} from "@/lib/db-helpers";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      productsCount,
      pendingOrdersCount,
      subscribersCount,
      recentOrdersResult,
      totalOrdersCount,
    ] = await Promise.all([
      getProductCount(true),
      getOrderCount("pending"),
      getSubscriberCount(),
      getOrders({}, 1, 5),
      getOrderCount(),
    ]);

    return NextResponse.json({
      metrics: {
        products: productsCount,
        pendingOrders: pendingOrdersCount,
        subscribers: subscribersCount,
        totalOrders: totalOrdersCount,
      },
      recentOrders: recentOrdersResult.items,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
