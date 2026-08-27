// Seeds the database from the static content in src/data/sample-data.ts, so the
// public pages can eventually switch from importing that file to querying Prisma
// directly (see the comment at the top of sample-data.ts).
//
// Run with: npm run db:seed  (requires DATABASE_URL to be set)
//
// Content tables (Destination, Package, Vehicle, Review, GalleryItem) are wiped
// and re-inserted on every run, so this script is safe to re-run as sample-data.ts
// changes. The admin user is upserted instead, so it's never deleted.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import {
  destinations,
  packages,
  vehicle,
  reviews,
  gallery,
} from "../src/data/sample-data";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function seedContent() {
  await prisma.destination.deleteMany();
  await prisma.destination.createMany({
    data: destinations.map((d) => ({
      slug: d.slug,
      name: d.name,
      region: d.region,
      category: d.category,
      shortDesc: d.shortDesc,
      // No separate long-form copy exists yet — reuse shortDesc until real
      // per-destination descriptions are written.
      description: d.shortDesc,
      heroImageUrl: d.heroImageUrl,
      galleryUrls: [...d.galleryImageUrls],
      bestTime: d.bestTime,
      timeNeeded: d.timeNeeded,
      entranceFee: d.entranceFee,
    })),
  });

  await prisma.package.deleteMany();
  await prisma.package.createMany({
    data: packages.map((p) => ({
      slug: p.slug,
      name: p.name,
      days: p.days,
      fromPriceLkr: p.fromPriceLkr,
      summary:
        p.days > 0
          ? `${p.days}-day private tour covering Sri Lanka's top destinations, from LKR ${p.fromPriceLkr?.toLocaleString()}.`
          : "A fully customized Sri Lanka tour built entirely around your dates, interests, and budget.",
      highlights: [],
      heroImageUrl: p.imageUrl,
    })),
  });

  await prisma.vehicle.deleteMany();
  await prisma.vehicle.create({
    data: {
      name: vehicle.name,
      seats: 4,
      features: [...vehicle.features],
      heroImageUrl: vehicle.heroImageUrl,
      photoUrls: [
        "/images/vehicle-user-1.jpg",
        "/images/vehicle-front-seats.jpg",
        "/images/vehicle-rear-seats.jpg",
        "/images/vehicle-dashboard.jpg",
        "/images/vehicle-rear-exterior.jpg",
      ],
    },
  });

  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: reviews.map((r) => ({
      guestName: r.guestName,
      country: r.country,
      rating: r.rating,
      text: r.text,
      source: r.source,
      approved: true,
    })),
  });

  await prisma.galleryItem.deleteMany();
  await prisma.galleryItem.createMany({
    data: gallery
      .filter(
        (g): g is (typeof gallery)[number] & { imageUrl: string } =>
          "imageUrl" in g && !!g.imageUrl
      )
      .map((g) => ({
        type: "photo",
        url: g.imageUrl,
        category: g.category,
        caption: g.label,
      })),
  });

  console.log(
    `Seeded ${destinations.length} destinations, ${packages.length} packages, 1 vehicle, ${reviews.length} reviews, and gallery photos.`
  );
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", password: hashedPassword },
    create: {
      email,
      name: process.env.ADMIN_NAME || "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user ready: ${email}`);
}

async function main() {
  await seedContent();
  await seedAdmin();
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
