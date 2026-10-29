import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const settingsSchema = z.object({
  dayRateLkr: z.number().int().positive(),
});

export async function PATCH(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const settings = await prisma.settings.upsert({
    where: { id: "singleton" },
    update: { dayRateLkr: parsed.data.dayRateLkr },
    create: { id: "singleton", dayRateLkr: parsed.data.dayRateLkr },
  });

  return NextResponse.json(settings);
}
