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

// Hand-curated, geographically accurate day-by-day routes for each package
// (Cultural Triangle → Hill Country → Wildlife → South Coast) — kept in sync
// with prisma/migrations/20261029070000_add_sample_itinerary/migration.sql,
// which applies this same content directly in production.
const SIGIRIYA_DAMBULLA = {
  title: "Sigiriya & Dambulla",
  region: "Central Province",
  description:
    "Climb the UNESCO-listed Sigiriya Rock Fortress and explore the ancient cave temples of Dambulla, filled with centuries-old Buddhist murals and statues.",
};
const KANDY = {
  title: "Kandy",
  region: "Central Province",
  description:
    "Visit the Temple of the Sacred Tooth Relic, stroll the Royal Botanical Gardens in Peradeniya, and end the day with a traditional Kandyan dance show.",
};
const NUWARA_ELIYA = {
  title: "Nuwara Eliya",
  region: "Central Province",
  description:
    "Drive through rolling tea plantations, visit a working tea factory, and take in the cool hill-country air around Gregory Lake.",
};
const ELLA = {
  title: "Ella — Nine Arches Bridge",
  region: "Uva Province",
  description:
    "Walk across the iconic Nine Arches Bridge, hike up Little Adam's Peak for sweeping valley views, and cool off at Ravana Falls.",
};
const UDAWALAWE = {
  title: "Udawalawe",
  region: "Sabaragamuwa Province",
  description:
    "Visit the Elephant Transit Home and head out on a wildlife safari through Udawalawe National Park, one of the best places in Sri Lanka to see wild elephants.",
};
const YALA = {
  title: "Yala National Park",
  region: "Southern Province",
  description:
    "An early-morning safari through Yala, Sri Lanka's most famous national park and home to one of the highest leopard densities in the world.",
};
const MIRISSA = {
  title: "Mirissa",
  region: "Southern Province",
  description:
    "Head out on a whale-watching boat trip (seasonal, Nov–Apr), then relax on Mirissa's beaches and the famous Coconut Tree Hill.",
};
const GALLE = {
  title: "Galle",
  region: "Southern Province",
  description:
    "Explore the UNESCO-listed Galle Fort, walk the historic ramparts, and browse the boutiques and cafés inside its Dutch colonial walls.",
};
const POLONNARUWA = {
  title: "Polonnaruwa",
  region: "North Central Province",
  description:
    "Explore the ruins of Sri Lanka's medieval capital — royal palaces, ancient stupas, and the carved Buddha statues of Gal Vihara.",
};
const MINNERIYA = {
  title: "Minneriya Safari",
  region: "North Central Province",
  description:
    'Head out on a jeep safari at Minneriya National Park, famous for "The Gathering" — one of the largest wild elephant gatherings in Asia.',
};
const BENTOTA_TO_COLOMBO = {
  title: "Bentota",
  region: "Southern Province",
  description:
    "Try water sports along the Bentota coastline, take a boat safari through the Madu River's mangroves, and stop at the Pinnawala Elephant Orphanage on the way back to Colombo.",
};
const BENTOTA = {
  title: "Bentota",
  region: "Southern Province",
  description:
    "Try water sports along the Bentota coastline and take a boat safari through the Madu River's mangroves and river islands.",
};
const NEGOMBO = {
  title: "Negombo",
  region: "Western Province",
  description:
    "Settle in near a traditional fishing village, visit the bustling fish market, and relax on Negombo's beach after your flight in.",
};
const ANURADHAPURA = {
  title: "Anuradhapura",
  region: "North Central Province",
  description:
    "Explore Sri Lanka's first ancient capital — centuries-old dagobas, sacred Bodhi trees, and ruins spread across a vast archaeological park.",
};
const COLOMBO = {
  title: "Colombo",
  region: "Western Province",
  description:
    "Tour Sri Lanka's capital — Galle Face Green, Gangaramaya Temple, and the colonial-era Fort district — with a stop at the Pinnawala Elephant Orphanage along the way.",
};
const DEPARTURE = {
  title: "Departure",
  region: "Western Province",
  description: "Transfer to the airport for your onward journey, with time for last-minute souvenir shopping.",
};

function withDays<T>(stops: T[]) {
  return stops.map((stop, i) => ({ day: i + 1, ...stop }));
}

const SAMPLE_ITINERARIES: Record<string, ReturnType<typeof withDays>> = {
  "5-day-tour": withDays([SIGIRIYA_DAMBULLA, KANDY, NUWARA_ELIYA, ELLA, UDAWALAWE]),
  "7-day-tour": withDays([SIGIRIYA_DAMBULLA, KANDY, NUWARA_ELIYA, ELLA, UDAWALAWE, GALLE, MIRISSA]),
  "10-day-tour": withDays([
    SIGIRIYA_DAMBULLA,
    POLONNARUWA,
    MINNERIYA,
    KANDY,
    NUWARA_ELIYA,
    ELLA,
    YALA,
    MIRISSA,
    GALLE,
    BENTOTA_TO_COLOMBO,
  ]),
  "14-day-tour": withDays([
    NEGOMBO,
    ANURADHAPURA,
    POLONNARUWA,
    MINNERIYA,
    SIGIRIYA_DAMBULLA,
    KANDY,
    NUWARA_ELIYA,
    ELLA,
    YALA,
    MIRISSA,
    GALLE,
    BENTOTA,
    COLOMBO,
    DEPARTURE,
  ]),
  "customized-tour": withDays([SIGIRIYA_DAMBULLA, KANDY, NUWARA_ELIYA, ELLA, UDAWALAWE, GALLE, MIRISSA]),
};

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
      // Starting prices are computed live from Settings.dayRateLkr (see
      // src/lib/pricing.ts), not stored per package.
      summary:
        p.days > 0
          ? `${p.days}-day private tour covering Sri Lanka's top destinations.`
          : "A fully customized Sri Lanka tour built entirely around your dates, interests, and budget.",
      highlights: [],
      heroImageUrl: p.imageUrl,
      sampleItinerary: SAMPLE_ITINERARIES[p.slug] ?? [],
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
