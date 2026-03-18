import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { bucket } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // Expecting field name 'files'

    if (!files || files.length === 0) {
      return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
    }

    if (files.length > 4) {
      return NextResponse.json({ message: "Maximum 4 files allowed" }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      // Validate type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        throw new Error(`Invalid file type: ${file.type}`);
      }

      // Read buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Generate unique name
      const ext = file.name.split(".").pop();
      const fileName = `products/${uuidv4()}-${Date.now()}.${ext}`;
      
      const fileUpload = bucket.file(fileName);
      
      // Upload to Firebase
      await fileUpload.save(buffer, {
        metadata: {
          contentType: file.type,
        },
      });

      // Make public and get URL
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      
      return publicUrl;
    });

    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls }, { status: 201 });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
