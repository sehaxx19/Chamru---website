import { prisma } from "@/lib/prisma";

const DEFAULT_DAY_RATE_LKR = 30000;
const DEFAULT_DAY_RATE_USD = 100;

export async function getDayRates() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } });
  return {
    lkr: settings?.dayRateLkr ?? DEFAULT_DAY_RATE_LKR,
    usd: settings?.dayRateUsd ?? DEFAULT_DAY_RATE_USD,
  };
}

// USD leads since it's the currency international travelers actually
// reason in; LKR stays alongside for transparency on the real local cost.
export function formatStartingPrice(days: number, rates: { lkr: number; usd: number }) {
  const usd = rates.usd * days;
  const lkr = rates.lkr * days;
  return `$${usd.toLocaleString()} (LKR ${lkr.toLocaleString()})`;
}

export function formatDayRate(rates: { lkr: number; usd: number }) {
  return `$${rates.usd.toLocaleString()}/day (LKR ${rates.lkr.toLocaleString()}/day)`;
}
