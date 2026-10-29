import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import DestinationImage from "@/components/DestinationImage";
import { prisma } from "@/lib/prisma";
import { getDayRateLkr } from "@/lib/pricing";

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

  const dayRateLkr = await getDayRateLkr();
  const description =
    pkg.days > 0
      ? `${pkg.name} covering Sri Lanka's top destinations, from LKR ${(dayRateLkr * pkg.days).toLocaleString()}. Private tour with Travel with Chamru — flexible, comfortable, fairly priced.`
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
  const [pkg, destinations, dayRateLkr] = await Promise.all([
    prisma.package.findUnique({ where: { slug } }),
    prisma.destination.findMany(),
    getDayRateLkr(),
  ]);
  if (!pkg) notFound();

  const isCustom = pkg.days === 0;
  const startingPriceLkr = dayRateLkr * pkg.days;
  const dayCount = isCustom ? 7 : pkg.days;
  const itineraryDays =
    destinations.length > 0
      ? Array.from({ length: dayCount }).map((_, i) => {
          const d = destinations[i % destinations.length];
          return { day: i + 1, destination: d };
        })
      : [];

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
              ? `Tell me your dates, interests, and pace — I'll build the route around you. From LKR ${dayRateLkr.toLocaleString()}/day.`
              : `${pkg.days} days · from LKR ${startingPriceLkr.toLocaleString()}`}
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
                ? "Every custom tour is different — here's an example of how a first week might look."
                : "This is one example of how these days could go, not a fixed plan tied to the price below — stops, order, and pacing are all adjusted to what you actually want to see."}
            </p>

            <div className="mt-4 rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-sm text-ink-900">
              <strong className="text-forest-900">Pricing: </strong>
              {isCustom ? (
                <>
                  From LKR {dayRateLkr.toLocaleString()}/day for the vehicle and driver, based on
                  the current day rate — updated as costs change. Your final price depends on trip
                  length, stops, and group size. Accommodation, meals, and entrance fees aren&rsquo;t
                  included.
                </>
              ) : (
                <>
                  Starting from LKR {startingPriceLkr.toLocaleString()} for {pkg.days} days, based
                  on the current day rate of LKR {dayRateLkr.toLocaleString()}/day for the vehicle
                  and driver — updated as costs change. This is an estimate, not a quote for the
                  exact itinerary above. Accommodation, meals, and entrance fees aren&rsquo;t
                  included.
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
