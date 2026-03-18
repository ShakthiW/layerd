import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getOrderById, updateOrderStatus } from "@/lib/db-helpers";
import { transporter, mailOptions } from "@/lib/email/transporter";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const order = await getOrderById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const order = await getOrderById(id);
    
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const { status, adminNotes, quotedPrice } = body;
    const updates: any = {};
    
    if (status !== undefined) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    if (quotedPrice !== undefined) updates.quotedPrice = quotedPrice;

    await updateOrderStatus(id, updates);

    // If status changed to "quoted" and we have a price, send email to customer
    if (status === "quoted" && order.status !== "quoted" && quotedPrice) {
      await transporter.sendMail({
        ...mailOptions,
        to: order.customerDetails.email,
        subject: `Your Layerd Quotation is Ready (${order.orderNumber})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your Custom Quote is Ready</h2>
            <p>Hi ${order.customerDetails.name},</p>
            <p>We've reviewed your request for <strong>${order.creationData.description || 'Custom Print'}</strong>.</p>
            <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 18px;"><strong>Quoted Price:</strong> LKR ${quotedPrice.toLocaleString()}</p>
            </div>
            ${adminNotes ? `<h3>Notes from our team:</h3><p>${adminNotes}</p>` : ''}
            <p>If you'd like to proceed, please reply to this email.</p>
            <br/>
            <p>Best regards,<br/>The Layerd Team</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
