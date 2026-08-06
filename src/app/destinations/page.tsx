import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DestinationImage from "@/components/DestinationImage";
import { destinations } from "@/data/sample-data";

export const metadata = {
  title: "Destinations | Travel with Chamru",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Top destinations in Sri Lanka"
        description="From ancient rock fortresses to leopard-filled national parks, here's where your itinerary can take you."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-sm transition hover:shadow-md"
            >
              <DestinationImage src={d.heroImageUrl} alt={d.name} gradientIndex={i} className="h-44 w-full" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold text-forest-900">
                    {d.name}
                  </h3>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                    {d.category}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-ink-600">{d.shortDesc}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-600">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {d.timeNeeded}
                  </span>
                  <span>{d.entranceFee}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-xs text-ink-600">
                  <MapPin size={12} /> {d.region}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-forest-900 p-8 text-center text-sand-50">
          <h2 className="font-display text-xl font-semibold">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-sand-100/70">
            Tell me your interests and travel dates, and I&rsquo;ll put together a
            route that covers the destinations that matter most to you.
          </p>
          <Link
            href="/itineraries"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400"
          >
            Build Your Itinerary
          </Link>
        </div>
      </section>
    </>
  );
}
