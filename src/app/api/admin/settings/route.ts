import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const settingsSchema = z.object({
  dayRateLkr: z.number().int().positive(),
  dayRateUsd: z.number().int().positive(),
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
    update: parsed.data,
    create: { id: "singleton", ...parsed.data },
  });

  // Prices are computed at render time from this value, but those pages are
  // ISR-cached (revalidate = 3600) — without this they'd keep serving the
  // old price for up to an hour after the admin updates the rate.
  revalidatePath("/");
  revalidatePath("/packages");
  revalidatePath("/packages/[slug]", "layout");

  return NextResponse.json(settings);
}
