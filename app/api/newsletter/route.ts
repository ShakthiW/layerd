import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/email/transporter";
import { getNewsletterTemplate } from "@/lib/email/templates/newsletter";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 },
      );
    }

    const htmlContent = getNewsletterTemplate();

    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "Welcome to the Layerd Journey",
      html: htmlContent,
    });

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Failed to subscribe to newsletter" },
      { status: 500 },
    );
  }
}
