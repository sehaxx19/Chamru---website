import Link from "next/link";
import { Check, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DestinationImage from "@/components/DestinationImage";
import { vehicle } from "@/data/sample-data";

export const metadata = {
  title: "Vehicle",
  description:
    "Travel in comfort in a Honda Vezel — air conditioning, comfortable seating, and complimentary Wi-Fi. Larger vehicles available for bigger groups.",
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
            { label: "Front seats", src: "/images/vehicle-front-seats.jpg" },
            { label: "Rear seating", src: "/images/vehicle-rear-seats.jpg" },
            { label: "Luggage space", src: "" },
            { label: "Dashboard", src: "/images/vehicle-dashboard.jpg" },
            { label: "Exterior", src: "/images/vehicle-rear-exterior.jpg" },
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

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-forest-900/10 bg-sand-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
              <Users size={18} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-forest-900">
                Traveling as a larger group?
              </h3>
              <p className="mt-1 max-w-lg text-sm text-ink-600">
                The Vezel is ideal for individuals, couples, and small families.
                For bigger groups, larger vehicles — such as a Toyota Hiace
                van — can be arranged. Just mention your group size when you
                inquire and I&rsquo;ll confirm availability.
              </p>
            </div>
          </div>
          <Link
            href="/instant-inquiry"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-forest-900/15 px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:bg-white"
          >
            Ask About Group Vehicles
          </Link>
        </div>
      </section>
    </>
  );
}
