import { NextRequest, NextResponse, after } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryConfirmation, sendAdminNewInquiryAlert } from "@/lib/mailer";
import { auth } from "@/auth";

const inquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  travelDate: z.string().optional(), // ISO date string
  travelers: z.number().int().positive().optional(),
  message: z.string().optional(),
  itineraryId: z.string().optional(),
  attachmentUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid inquiry data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const session = await auth();
  const data = parsed.data;

  const inquiry = await prisma.inquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      travelDate: data.travelDate ? new Date(data.travelDate) : undefined,
      travelers: data.travelers,
      message: data.message,
      itineraryId: data.itineraryId,
      attachmentUrl: data.attachmentUrl,
      userId: session?.user ? (session.user as { id?: string }).id : undefined,
    },
    include: { itinerary: true },
  });

  // Send both emails after the response goes out, so a slow/unreachable SMTP
  // server never delays the user's response or a mail failure the request itself.
  after(async () => {
    try {
      await Promise.all([
        sendInquiryConfirmation({
          toEmail: inquiry.email,
          name: inquiry.name,
          inquiryId: inquiry.id,
          itinerary: inquiry.itinerary
            ? (inquiry.itinerary.itineraryJson as {
                title?: string;
                estimatedCostLkr?: number;
                days?: { day: number; location: string; activities?: string[]; overnightStay?: string }[];
              })
            : undefined,
        }),
        sendAdminNewInquiryAlert({
          inquiryId: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          message: inquiry.message,
        }),
      ]);
    } catch (err) {
      console.error("Failed to send inquiry emails:", err);
    }
  });

  return NextResponse.json({ id: inquiry.id, status: inquiry.status }, { status: 201 });
}
