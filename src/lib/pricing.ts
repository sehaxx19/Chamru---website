import { prisma } from "@/lib/prisma";

const DEFAULT_DAY_RATE_LKR = 30000;

export async function getDayRateLkr() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } });
  return settings?.dayRateLkr ?? DEFAULT_DAY_RATE_LKR;
}
