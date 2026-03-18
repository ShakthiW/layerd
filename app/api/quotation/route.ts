import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { bucket } from "@/lib/firebase";
import { getDb } from "@/lib/mongodb";
import { transporter, mailOptions } from "@/lib/email/transporter";
import { getQuotationTemplate } from "@/lib/email/templates/quotation";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    // ── Parse fields ────────────────────────────────────────────
    const jsonStr = data.get("formData") as string | null;
    if (!jsonStr) {
      return NextResponse.json(
        { message: "Missing form data" },
        { status: 400 },
      );
    }

    const formPayload = JSON.parse(jsonStr) as {
      customerDetails: { name: string; email: string; phone: string };
      creationData: {
        method: string;
        description: string;
        dimensions: string;
        notes: string;
        material: string;
        finish: string;
        quantity: number;
        fileAttached: boolean;
        imageAttached: boolean;
      };
      pricingData: { weightGrams: number; printTimeHours: number };
    };

    // Basic validation
    if (
      !formPayload.customerDetails?.email ||
      !formPayload.customerDetails?.name
    ) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 },
      );
    }

    // ── Upload file to Firebase Storage (if attached) ───────────
    const file = data.get("file") as File | null;
    let fileUrl: string | null = null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop() || "bin";
      const storagePath = `quotation-files/${uuidv4()}.${ext}`;

      const blob = bucket.file(storagePath);
      await blob.save(buffer, {
        metadata: {
          contentType: file.type || "application/octet-stream",
          metadata: { originalName: file.name },
        },
      });

      // Make publicly readable and build URL
      await blob.makePublic();
      fileUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
    }

    // ── Persist to MongoDB + send email in parallel ─────────────
    const orderDoc = {
      customerDetails: formPayload.customerDetails,
      creationData: formPayload.creationData,
      pricingData: formPayload.pricingData,
      fileUrl,
      status: "pending",
      createdAt: new Date(),
    };

    const dbPromise = getDb().then((db) =>
      db.collection("quotation_requests").insertOne(orderDoc),
    );

    const emailHtml = getQuotationTemplate({ ...formPayload, fileUrl });

    const emailPromise = transporter.sendMail({
      ...mailOptions,
      to: process.env.NODEMAILER_EMAIL,
      subject: `New Custom Quote Request from ${formPayload.customerDetails.name}`,
      html: emailHtml,
    });

    await Promise.all([dbPromise, emailPromise]);

    return NextResponse.json(
      { message: "Quotation request sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Quotation request error:", error);
    return NextResponse.json(
      { message: "Failed to send quotation request" },
      { status: 500 },
    );
  }
}
