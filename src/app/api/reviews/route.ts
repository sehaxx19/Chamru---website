import { NextRequest, NextResponse, after } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendAdminNewReviewAlert } from "@/lib/mailer";

const reviewSchema = z.object({
  guestName: z.string().min(1).max(100),
  country: z.string().max(100).optional(),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1).max(2000),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid review data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { guestName, country, rating, text } = parsed.data;

  const review = await prisma.review.create({
    data: {
      guestName,
      country,
      rating,
      text,
      source: "Website",
      approved: false,
    },
  });

  after(async () => {
    try {
      await sendAdminNewReviewAlert({
        reviewId: review.id,
        guestName: review.guestName,
        country: review.country,
        rating: review.rating,
        text: review.text,
      });
    } catch (err) {
      console.error("Failed to send new-review admin alert:", err);
    }
  });

  return NextResponse.json({ id: review.id }, { status: 201 });
}
