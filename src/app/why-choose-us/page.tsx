import Link from "next/link";
import { Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { whyChooseUs } from "@/data/sample-data";

export const metadata = {
  title: "Why Choose Travel with Chamru | Travel with Chamru",
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why choose us"
        title="Why choose Travel with Chamru?"
        description="A private, personal way to see Sri Lanka — built around trust, comfort, and fair pricing."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <PhotoPlaceholder label="Chamru with the Honda Vezel on the road" className="h-80 w-full rounded-2xl" />
          <ul className="space-y-4">
            {whyChooseUs.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-forest-900/10 bg-white p-4 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Check size={14} />
                </span>
                <span className="text-sm font-medium text-ink-900">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 rounded-2xl bg-forest-900 p-8 text-center text-sand-50">
          <h2 className="font-display text-xl font-semibold">Let&rsquo;s plan your dream trip</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-sand-100/70">
            Start your unforgettable Sri Lanka adventure with a personalized itinerary.
          </p>
          <Link
            href="/itineraries"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400"
          >
            Plan Your Trip Now
          </Link>
        </div>
      </section>
    </>
  );
}
