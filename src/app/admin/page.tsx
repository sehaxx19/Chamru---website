import { redirect } from "next/navigation";
import { Mail, Phone, Calendar, Users as UsersIcon, MapPinned, Star } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import SignOutButton from "@/components/SignOutButton";
import InquiryActions from "@/components/InquiryActions";
import ReviewModerationActions from "@/components/ReviewModerationActions";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-gold-500/15 text-gold-700",
  REVIEWED: "bg-sand-100 text-ink-900",
  QUOTED: "bg-emerald-500/15 text-emerald-700",
  CONFIRMED: "bg-emerald-500/25 text-emerald-800",
  DECLINED: "bg-red-500/10 text-red-700",
};

type AttachedItineraryJson = {
  title?: string;
  estimatedCostLkr?: number;
  days?: {
    day: number;
    location: string;
    activities?: string[];
    overnightStay?: string;
  }[];
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN") {
    return (
      <>
        <PageHeader eyebrow="Admin" title="Access restricted" />
        <section className="mx-auto max-w-lg px-4 py-14 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-ink-600">
            This page is only available to admin accounts. You&rsquo;re signed in as{" "}
            <strong>{session.user.email}</strong>, which doesn&rsquo;t have admin access.
          </p>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </section>
      </>
    );
  }

  const [inquiries, pendingReviews] = await Promise.all([
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { itinerary: true },
    }),
    prisma.review.findMany({
      where: { approved: false },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <PageHeader eyebrow="Admin" title="Dashboard" description={`Signed in as ${session.user.email}`} />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-end">
          <SignOutButton />
        </div>

        {pendingReviews.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-forest-900">
              <Star size={17} className="text-gold-500" /> Reviews awaiting approval ({pendingReviews.length})
            </h2>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base font-semibold text-forest-900">
                        {review.guestName}
                        {review.country && (
                          <span className="ml-1.5 font-normal text-ink-600">· {review.country}</span>
                        )}
                      </h3>
                      <p className="mt-1 text-xs text-ink-600">
                        Submitted {review.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-0.5 text-gold-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 rounded-lg bg-white p-3 text-sm text-ink-900">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <ReviewModerationActions id={review.id} />
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="mb-4 font-display text-lg font-semibold text-forest-900">
          Inquiries ({inquiries.length})
        </h2>

        {inquiries.length === 0 ? (
          <p className="rounded-xl border border-forest-900/10 bg-white p-8 text-center text-sm text-ink-600">
            No inquiries yet — they&rsquo;ll show up here as soon as someone submits the Contact
            or Instant Inquiry form.
          </p>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-semibold text-forest-900">
                      {inquiry.name}
                    </h3>
                    <p className="mt-1 text-xs text-ink-600">
                      Submitted {inquiry.createdAt.toLocaleDateString()} at{" "}
                      {inquiry.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {inquiry.quotedPriceLkr && (
                      <span className="text-xs font-semibold text-emerald-700">
                        LKR {inquiry.quotedPriceLkr.toLocaleString()}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        STATUS_STYLES[inquiry.status] ?? "bg-sand-100 text-ink-900"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-ink-900 sm:grid-cols-2">
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="flex items-center gap-2 hover:text-emerald-600"
                  >
                    <Mail size={14} className="text-ink-600" /> {inquiry.email}
                  </a>
                  {inquiry.phone && (
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="flex items-center gap-2 hover:text-emerald-600"
                    >
                      <Phone size={14} className="text-ink-600" /> {inquiry.phone}
                    </a>
                  )}
                  {inquiry.travelDate && (
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-ink-600" />
                      {inquiry.travelDate.toLocaleDateString()}
                    </span>
                  )}
                  {inquiry.travelers && (
                    <span className="flex items-center gap-2">
                      <UsersIcon size={14} className="text-ink-600" /> {inquiry.travelers} traveler
                      {inquiry.travelers === 1 ? "" : "s"}
                    </span>
                  )}
                </div>

                {inquiry.message && (
                  <p className="mt-3 rounded-lg bg-sand-50 p-3 text-sm text-ink-600">
                    {inquiry.message}
                  </p>
                )}

                {inquiry.itinerary && (
                  <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                        <MapPinned size={13} /> Attached itinerary
                      </p>
                      {(() => {
                        const json = inquiry.itinerary.itineraryJson as AttachedItineraryJson;
                        return json.estimatedCostLkr ? (
                          <span className="text-xs font-semibold text-emerald-700">
                            LKR {json.estimatedCostLkr.toLocaleString()}
                          </span>
                        ) : null;
                      })()}
                    </div>
                    {(() => {
                      const json = inquiry.itinerary.itineraryJson as AttachedItineraryJson;
                      return (
                        <>
                          <p className="mt-1 text-sm font-medium text-forest-900">
                            {json.title ?? inquiry.itinerary.title}
                          </p>
                          {json.days && json.days.length > 0 && (
                            <ol className="mt-2 space-y-1.5 text-xs text-ink-600">
                              {json.days.map((d) => (
                                <li key={d.day}>
                                  <span className="font-semibold text-ink-900">
                                    Day {d.day}: {d.location}
                                  </span>
                                  {d.activities && d.activities.length > 0 && (
                                    <span> — {d.activities.join(", ")}</span>
                                  )}
                                </li>
                              ))}
                            </ol>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}

                <InquiryActions
                  id={inquiry.id}
                  currentStatus={inquiry.status}
                  initialPriceLkr={inquiry.quotedPriceLkr}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
