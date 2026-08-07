import Link from "next/link";
import { Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DestinationImage from "@/components/DestinationImage";
import { vehicle } from "@/data/sample-data";

export const metadata = {
  title: "Vehicle | Travel with Chamru",
};

export default function VehiclePage() {
  return (
    <>
      <PageHeader
        eyebrow="Travel in comfort"
        title={vehicle.name}
        description={`A spacious, well-maintained ${vehicle.type.toLowerCase()} — comfortable for long drives across the island.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <DestinationImage
            src="/images/vehicle-user-1.jpg"
            alt={`${vehicle.name} exterior`}
            className="h-80 w-full rounded-2xl"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div>
            <h2 className="font-display text-xl font-semibold text-forest-900">
              What&rsquo;s included
            </h2>
            <ul className="mt-4 space-y-3">
              {vehicle.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-ink-900">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <Check size={13} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/instant-inquiry"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400"
            >
              Book This Vehicle
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-xl font-semibold text-forest-900">
          Interior &amp; exterior
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { label: "Front seats", src: "https://images.unsplash.com/photo-1677917367471-6b098b6bcc96?auto=format&fit=crop&w=600&q=80" },
            { label: "Rear seating", src: "" },
            { label: "Luggage space", src: "" },
            { label: "Dashboard", src: "" },
            { label: "Exterior", src: "" },
          ].map((item, i) => (
            <DestinationImage
              key={item.label}
              src={item.src}
              alt={item.label}
              gradientIndex={i}
              className="h-28 w-full rounded-lg"
            />
          ))}
        </div>
      </section>
    </>
  );
}
