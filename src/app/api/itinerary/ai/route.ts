import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const requestSchema = z.object({
  prompt: z.string().min(1), // free-text "what I want" from the user
  days: z.number().int().positive().optional(),
  travelers: z.number().int().positive().optional(),
  interests: z.array(z.string()).optional(),
  budgetLkr: z.number().int().positive().optional(),
  arrivalDate: z.string().optional(),
});

const SYSTEM_PROMPT = `You are the AI trip planner for "Travel with Chamru", a private driver \
and guide service in Sri Lanka. Given a traveler's preferences, produce a realistic day-by-day \
itinerary using real Sri Lankan destinations (e.g. Sigiriya, Kandy, Ella, Yala National Park, \
Galle Fort, Nuwara Eliya, Mirissa, Bentota). Respect the requested number of days, traveler count, \
interests, and budget.

Respond with ONLY valid JSON (no markdown fences, no commentary) matching this shape:
{
  "title": string,
  "days": [
    {
      "day": number,
      "location": string,
      "activities": string[],
      "driveTimeFromPrevious": string | null,
      "overnightStay": string
    }
  ],
  "estimatedCostLkr": number,
  "includes": string[],
  "excludes": string[]
}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI trip planner is not configured. Set ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  const { prompt, days, travelers, interests, budgetLkr, arrivalDate } = parsed.data;

  const userMessage = `Traveler request: "${prompt}"
Days: ${days ?? "let the AI suggest a sensible length"}
Travelers: ${travelers ?? "unspecified"}
Interests: ${interests?.join(", ") || "unspecified"}
Budget (LKR): ${budgetLkr ?? "unspecified"}
Arrival date: ${arrivalDate ?? "unspecified"}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Anthropic API error:", errText);
    return NextResponse.json({ error: "AI planner failed to generate an itinerary" }, { status: 502 });
  }

  const data = await response.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === "text");

  let itineraryJson: unknown;
  try {
    const cleaned = (textBlock?.text ?? "").replace(/```json|```/g, "").trim();
    itineraryJson = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse AI itinerary JSON:", err, textBlock?.text);
    return NextResponse.json({ error: "AI planner returned an unexpected format" }, { status: 502 });
  }

  const session = await auth();
  const parsedItinerary = itineraryJson as { title?: string; days?: unknown[] };

  const saved = await prisma.itinerary.create({
    data: {
      title: parsedItinerary.title ?? "AI-generated itinerary",
      days: days ?? parsedItinerary.days?.length ?? 1,
      travelers: travelers ?? 1,
      interests: interests ?? [],
      budgetLkr: budgetLkr,
      arrivalDate: arrivalDate ? new Date(arrivalDate) : undefined,
      generatedBy: "ai",
      itineraryJson: itineraryJson as never,
      userId: session?.user ? (session.user as { id?: string }).id : undefined,
    },
  });

  return NextResponse.json(saved, { status: 201 });
}
