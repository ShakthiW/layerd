import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { DbCategory } from "@/lib/db-helpers";

export async function GET() {
  try {
    const db = await getDb();
    // Return categories sorted by their defined order
    const categories = await db
      .collection<DbCategory>("categories")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json(categories);
  } catch (err: any) {
    console.error("Failed to fetch categories:", err);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "super_admin" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, slug, order, isActive } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const db = await getDb();
    
    // Check for duplicate slug
    const existing = await db.collection("categories").findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: "Category slug already exists" }, { status: 400 });
    }

    const newCategory: Omit<DbCategory, "_id"> = {
      name,
      slug,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection("categories").insertOne(newCategory);
    
    return NextResponse.json({ ...newCategory, _id: result.insertedId }, { status: 201 });
  } catch (err: any) {
    console.error("Error creating category:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "super_admin" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { _id, name, slug, order, isActive } = body;

    if (!_id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const db = await getDb();

    // Check slug collision
    if (slug) {
      const existing = await db.collection("categories").findOne({ 
        slug, 
        _id: { $ne: new ObjectId(_id) } 
      });
      if (existing) {
        return NextResponse.json({ error: "Category slug already exists" }, { status: 400 });
      }
    }

    const updateData: Partial<DbCategory> = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;

    const result = await db.collection("categories").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error updating category:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== "super_admin" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const db = await getDb();
    
    const result = await db.collection("categories").deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error deleting category:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
