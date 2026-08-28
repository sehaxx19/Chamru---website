import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Prevents creating a new PrismaClient on every hot-reload in dev,
// which would otherwise exhaust the Postgres connection pool.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// TEMPORARY diagnostic — logs only the DB host (never credentials) to
// pin down a mismatch between the connection string used at runtime/build
// and the one the migration was verified against. Remove once resolved.
try {
  console.log("[prisma] connecting to host:", new URL(process.env.DATABASE_URL!).host);
} catch {
  console.log("[prisma] DATABASE_URL is not a valid URL or is unset");
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
