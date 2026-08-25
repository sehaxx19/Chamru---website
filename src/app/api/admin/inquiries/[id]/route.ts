import { NextRequest, NextResponse, after } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendQuoteEmail } from "@/lib/mailer";

const updateSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "QUOTED", "CONFIRMED", "DECLINED"]),
  quotedPriceLkr: z.number().int().positive().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { status, quotedPriceLkr } = parsed.data;

  if (status === "QUOTED" && !quotedPriceLkr) {
    return NextResponse.json(
      { error: "A price is required to send a quote." },
      { status: 400 }
    );
  }

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: {
      status,
      quotedPriceLkr: quotedPriceLkr ?? undefined,
    },
  });

  if (status === "QUOTED" && quotedPriceLkr) {
    // Send after responding — a slow SMTP round-trip shouldn't hold up the
    // admin's status update.
    after(async () => {
      try {
        await sendQuoteEmail({
          toEmail: inquiry.email,
          name: inquiry.name,
          priceLkr: quotedPriceLkr,
          inquiryId: inquiry.id,
        });
      } catch (err) {
        console.error("Failed to send quote email:", err);
      }
    });
  }

  return NextResponse.json(inquiry);
}
