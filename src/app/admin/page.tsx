import { redirect } from "next/navigation";
import { Mail, Phone, Calendar, Users as UsersIcon } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import SignOutButton from "@/components/SignOutButton";

export const metadata = {
  title: "Admin | Travel with Chamru",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-gold-500/15 text-gold-700",
  REVIEWED: "bg-sand-100 text-ink-900",
  QUOTED: "bg-emerald-500/15 text-emerald-700",
  CONFIRMED: "bg-emerald-500/25 text-emerald-800",
  DECLINED: "bg-red-500/10 text-red-700",
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

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <>
      <PageHeader eyebrow="Admin" title="Inquiries" description={`Signed in as ${session.user.email}`} />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-ink-600">
            {inquiries.length} inquir{inquiries.length === 1 ? "y" : "ies"}
          </p>
          <SignOutButton />
        </div>

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
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      STATUS_STYLES[inquiry.status] ?? "bg-sand-100 text-ink-900"
                    }`}
                  >
                    {inquiry.status}
                  </span>
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
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
