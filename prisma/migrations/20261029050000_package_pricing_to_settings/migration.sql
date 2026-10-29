-- AlterTable
ALTER TABLE "Package" DROP COLUMN "fromPriceLkr";

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "dayRateLkr" INTEGER NOT NULL DEFAULT 30000,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
