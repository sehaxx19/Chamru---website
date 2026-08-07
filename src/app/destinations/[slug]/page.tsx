import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Wallet, CalendarDays, ArrowLeft } from "lucide-react";
import DestinationImage from "@/components/DestinationImage";
import MapEmbed from "@/components/MapEmbed";
import { destinations } from "@/data/sample-data";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) notFound();

  const others = destinations.filter((d) => d.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-forest-950">
        <DestinationImage
          src={destination.heroImageUrl}
          alt={destination.name}
          className="absolute inset-0 h-full w-full"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/10" />
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm text-sand-100/80 hover:text-sand-50"
          >
            <ArrowLeft size={14} /> All destinations
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            {destination.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-sand-50 sm:text-4xl">
            {destination.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-sand-100/80">
            <MapPin size={14} /> {destination.region}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {destination.shortDesc} It&rsquo;s one of the stops I include most
              often when building itineraries around {destination.category.toLowerCase()},
              and I&rsquo;m happy to time your visit to avoid the busiest hours and
              make the drive there part of the experience.
            </p>

            <h2 className="mt-8 font-display text-xl font-semibold text-forest-900">
              Gallery
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((i) => {
                const extraPhotos =
                  "galleryImageUrls" in destination ? destination.galleryImageUrls : [];
                const src = extraPhotos[i] ?? "";
                return (
                  <DestinationImage
                    key={i}
                    src={src}
                    alt={`${destination.name} photo ${i + 1}`}
                    gradientIndex={i}
                    className="h-24 w-full rounded-lg"
                    sizes="33vw"
                  />
                );
              })}
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-forest-900">
              Quick info
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-emerald-600" /> {destination.region}
              </li>
              <li className="flex items-start gap-2">
                <CalendarDays size={14} className="mt-0.5 text-emerald-600" /> Best time: {destination.bestTime}
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 text-emerald-600" /> Time needed: {destination.timeNeeded}
              </li>
              <li className="flex items-start gap-2">
                <Wallet size={14} className="mt-0.5 text-emerald-600" /> Entrance fee: {destination.entranceFee}
              </li>
            </ul>
            <MapEmbed
              query={`${destination.name}, ${destination.region}, Sri Lanka`}
              zoom={13}
              className="mt-5 h-32 rounded-lg"
            />
            <Link
              href="/itineraries"
              className="mt-5 block rounded-full bg-emerald-500 px-4 py-2.5 text-center text-sm font-semibold text-forest-950 hover:bg-emerald-400"
            >
              Add to my itinerary
            </Link>
          </aside>
        </div>

        {others.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-xl font-semibold text-forest-900">
              You might also like
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {others.map((d, i) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-sm transition hover:shadow-md"
                >
                  <DestinationImage src={d.heroImageUrl} alt={d.name} gradientIndex={i + 1} className="h-28 w-full" />
                  <div className="p-3">
                    <h3 className="font-display text-sm font-semibold text-forest-900">
                      {d.name}
                    </h3>
                    <p className="mt-1 text-xs text-ink-600">{d.region}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
