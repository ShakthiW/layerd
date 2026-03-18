import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAllProducts, createProduct } from "@/lib/db-helpers";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const includeInactive = searchParams.get("all") === "true";

  try {
    const products = await getAllProducts(!includeInactive);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    if (!body.slug || !body.name || !body.price) {
      return NextResponse.json(
        { message: "Missing required fields (slug, name, price)" },
        { status: 400 }
      );
    }

    const newProduct = { ...body, isActive: true };
    await createProduct(newProduct);
    
    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "A product with this slug already exists" },
        { status: 409 }
      );
    }
    console.error("Products API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
