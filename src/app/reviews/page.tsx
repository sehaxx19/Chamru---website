import { Star } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ReviewForm from "@/components/ReviewForm";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Guest Reviews",
  description:
    "Real feedback from travelers who've explored Sri Lanka with Travel with Chamru — safe, comfortable, personalized private tours.",
};

export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <>
      <PageHeader
        eyebrow="Guest reviews"
        title="What our guests say"
        description="Real feedback from travelers who've explored Sri Lanka with Chamru."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <span className="flex text-gold-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill={i < Math.round(avg) ? "currentColor" : "none"} />
            ))}
          </span>
          <span className="font-display text-lg font-semibold text-forest-900">
            {avg.toFixed(1)} · Based on {reviews.length}+ reviews
          </span>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
              <div className="flex gap-0.5 text-gold-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm text-ink-900">&ldquo;{r.text}&rdquo;</p>
              <p className="mt-3 text-xs font-medium text-ink-600">
                {r.guestName} · {r.country} · {r.source}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-center font-display text-xl font-semibold text-forest-900">
            Traveled with Chamru?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink-600">
            I&rsquo;d love to hear about your trip.
          </p>
          <div className="mx-auto mt-6 max-w-lg">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
