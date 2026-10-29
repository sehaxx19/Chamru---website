import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import DestinationImage from "@/components/DestinationImage";
import { prisma } from "@/lib/prisma";
import { getDayRates, formatStartingPrice, formatDayRate } from "@/lib/pricing";

type RouteDestination = { name: string; region: string; shortDesc: string };

// Cycling through every destination in table order (the previous approach)
// can put the same town on two separate days — e.g. "Ella" and "Nine Arches
// Bridge" are both in Ella, so a naive day-2/day-5 split could show the same
// place twice. Group by the first segment of `region` (the town/area) and
// skip any destination whose area has already been used in this itinerary.
function buildSampleItinerary(destinations: RouteDestination[], dayCount: number) {
  const areaKey = (d: RouteDestination) => d.region.split(",")[0].trim().toLowerCase();

  const result: { day: number; destination: RouteDestination }[] = [];
  const usedAreas = new Set<string>();
  let cursor = 0;
  let attempts = 0;

  while (result.length < dayCount && attempts < destinations.length * 2) {
    const candidate = destinations[cursor % destinations.length];
    cursor++;
    attempts++;
    const key = areaKey(candidate);
    if (!usedAreas.has(key)) {
      usedAreas.add(key);
      result.push({ day: result.length + 1, destination: candidate });
    }
  }

  // Not enough distinct areas to fill every day (e.g. a 14-day package with
  // fewer than 14 unique areas) — repeat rather than cut the itinerary short.
  while (result.length < dayCount && destinations.length > 0) {
    result.push({
      day: result.length + 1,
      destination: destinations[result.length % destinations.length],
    });
  }

  return result;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const packages = await prisma.package.findMany({ select: { slug: true } });
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await prisma.package.findUnique({ where: { slug } });
  if (!pkg) return {};

  const dayRates = await getDayRates();
  const description =
    pkg.days > 0
      ? `${pkg.name} covering Sri Lanka's top destinations, from ${formatStartingPrice(pkg.days, dayRates)}. Private tour with Travel with Chamru — flexible, comfortable, fairly priced.`
      : "A fully customized Sri Lanka tour built entirely around your dates, interests, and budget with Travel with Chamru.";

  return {
    title: pkg.name,
    description,
    openGraph: pkg.heroImageUrl.startsWith("http") || pkg.heroImageUrl.startsWith("/")
      ? { images: [{ url: pkg.heroImageUrl }] }
      : undefined,
  };
}

const INCLUDES = [
  "Private vehicle with air conditioning",
  "English-speaking driver & guide",
  "Airport pickup and drop-off",
  "Fuel and driver accommodation",
  "All tolls and parking fees",
];

const EXCLUDES = [
  "International flights",
  "Entrance fees to attractions",
  "Meals not specified",
  "Personal expenses and tips",
];

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [pkg, destinations, dayRates] = await Promise.all([
    prisma.package.findUnique({ where: { slug } }),
    prisma.destination.findMany(),
    getDayRates(),
  ]);
  if (!pkg) notFound();

  const isCustom = pkg.days === 0;
  const dayCount = isCustom ? 7 : pkg.days;
  const itineraryDays = buildSampleItinerary(destinations, dayCount);

  return (
    <>
      <section className="relative overflow-hidden bg-forest-950">
        <DestinationImage
          src={pkg.heroImageUrl}
          alt={pkg.name}
          className="absolute inset-0 h-full w-full opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/20" />
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          <Link href="/packages" className="inline-flex items-center gap-1.5 text-sm text-sand-100/80 hover:text-sand-50">
            <ArrowLeft size={14} /> All packages
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold text-sand-50 sm:text-4xl">
            {pkg.name}
          </h1>
          <p className="mt-2 text-sm text-sand-100/80">
            {isCustom
              ? `Tell me your dates, interests, and pace — I'll build the route around you. From ${formatDayRate(dayRates)}.`
              : `${pkg.days} days · from ${formatStartingPrice(pkg.days, dayRates)}`}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              {isCustom ? "A sample route" : "Sample itinerary"}
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              {isCustom
                ? "This is a sample route so you can get an idea of the pace and stops — every custom tour is built from scratch around you, not copied from this example."
                : "This is a sample itinerary so you can get an idea of the pace and stops — not a fixed plan. Your actual route is built around what you want to see, and can differ from the example below."}
            </p>

            <div className="mt-4 rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-sm text-ink-900">
              <strong className="text-forest-900">Pricing: </strong>
              {isCustom ? (
                <>
                  {formatDayRate(dayRates)} for the vehicle and driver is our base rate, updated as
                  costs change. It&rsquo;s a starting point, not a final figure — your actual price
                  depends on the itinerary we build together (trip length, stops, group size).
                  Accommodation, meals, and entrance fees aren&rsquo;t included.
                </>
              ) : (
                <>
                  {formatStartingPrice(pkg.days, dayRates)} is the base rate for {pkg.days} days,
                  calculated at {formatDayRate(dayRates)} for the vehicle and driver — updated as
                  costs change. It&rsquo;s a starting point, not a final figure: your actual price
                  will depend on the itinerary you end up booking, not the sample route above.
                  Accommodation, meals, and entrance fees aren&rsquo;t included.
                </>
              )}
            </div>

            <ol className="mt-6 space-y-5">
              {itineraryDays.map(({ day, destination }) => (
                <li key={day} className="flex gap-4 rounded-xl border border-forest-900/10 bg-white p-4 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-semibold text-emerald-700">
                    {day}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-forest-900">
                      Day {day}: {destination.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-600">
                      <MapPin size={12} /> {destination.region}
                    </p>
                    <p className="mt-1.5 text-sm text-ink-600">{destination.shortDesc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="h-fit space-y-5">
            <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
              <h3 className="font-display text-sm font-semibold text-forest-900">Includes</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <h3 className="mt-5 font-display text-sm font-semibold text-forest-900">Excludes</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                {EXCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/instant-inquiry"
              className="block rounded-full bg-emerald-500 px-4 py-2.5 text-center text-sm font-semibold text-forest-950 hover:bg-emerald-400"
            >
              Send an Inquiry
            </Link>
            <Link
              href="/itineraries"
              className="block rounded-full border border-forest-900/15 px-4 py-2.5 text-center text-sm font-semibold text-forest-900 hover:bg-sand-100"
            >
              Customize this trip
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
