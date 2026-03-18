import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSiteContent, updateSiteContent } from "@/lib/db-helpers";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section") || undefined;

  try {
    const content = await getSiteContent(section);
    return NextResponse.json(content);
  } catch (error) {
    console.error("Content API error:", error);
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
    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { message: "Missing reqired fields (key, value)" },
        { status: 400 }
      );
    }

    const adminId = new ObjectId(session.user.id as string);
    await updateSiteContent(key, value, adminId);

    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error) {
    console.error("Content API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
