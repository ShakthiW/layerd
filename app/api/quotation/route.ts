import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/email/transporter";
import { getQuotationTemplate } from "@/lib/email/templates/quotation";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.customerDetails?.email || !data.customerDetails?.name) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 },
      );
    }

    const htmlContent = getQuotationTemplate(data);

    await transporter.sendMail({
      ...mailOptions,
      to: process.env.NODEMAILER_EMAIL, // Send to site owner
      subject: `New Custom Quote Request from ${data.customerDetails.name}`,
      html: htmlContent,
    });

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
