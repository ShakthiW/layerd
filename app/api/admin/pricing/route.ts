import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPricingConfig, updatePricingConfig } from "@/lib/db-helpers";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = await getPricingConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Pricing API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await req.json();
    await updatePricingConfig(updates);
    
    return NextResponse.json({ message: "Pricing config updated successfully" });
  } catch (error) {
    console.error("Pricing API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
