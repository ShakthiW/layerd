import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllAdmins, createAdmin, deleteAdmin } from "@/lib/db-helpers";
import { hash } from "bcryptjs";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ message: "Unauthorized or insufficient permissions" }, { status: 403 });
  }

  try {
    const admins = await getAllAdmins();
    return NextResponse.json(admins);
  } catch (error) {
    console.error("Settings API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ message: "Unauthorized or insufficient permissions" }, { status: 403 });
  }

  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const passwordHash = await hash(password, 12);
    await createAdmin({ name, email, passwordHash, role });

    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "An admin with this email already exists" },
        { status: 409 }
      );
    }
    console.error("Settings API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "super_admin") {
    return NextResponse.json({ message: "Unauthorized or insufficient permissions" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Admin ID is required" },
        { status: 400 }
      );
    }

    // Prevent self-deletion
    if (id === session.user.id) {
      return NextResponse.json(
        { message: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    await deleteAdmin(id);
    return NextResponse.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Settings API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
