import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DestinationImage from "@/components/DestinationImage";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Tour Packages",
  description:
    "5, 7, 10, and 14-day Sri Lanka tour packages, or a fully customized trip built around you. Fair pricing, private tours, no hidden charges.",
};

export const revalidate = 3600;

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <PageHeader
        eyebrow="Packages"
        title="Our popular tour packages"
        description="Handpicked itineraries to give you the best Sri Lanka experience — or build one entirely your own."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Link
              key={p.slug}
              href={`/packages/${p.slug}`}
              className="group overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-sm transition hover:shadow-md"
            >
              <DestinationImage src={p.heroImageUrl} alt={p.name} gradientIndex={i} className="h-40 w-full" />
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-forest-900">
                  {p.name}
                </h3>
                {p.days > 0 && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-600">
                    <CalendarDays size={13} /> {p.days} days
                  </p>
                )}
                <p className="mt-3 text-sm font-medium text-ink-900">
                  {p.fromPriceLkr
                    ? `from LKR ${p.fromPriceLkr.toLocaleString()}`
                    : "Built entirely around you"}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:text-emerald-500">
                  View details <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
