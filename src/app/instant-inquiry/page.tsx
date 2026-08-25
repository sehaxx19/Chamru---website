"use client";

import { Suspense, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Send, MapPinned } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function InstantInquiryPage() {
  return (
    <Suspense fallback={null}>
      <InstantInquiryPageInner />
    </Suspense>
  );
}

function InstantInquiryPageInner() {
  const searchParams = useSearchParams();
  const itineraryId = searchParams.get("itineraryId");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("sending");
    const form = new FormData(formEl);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("whatsapp") || undefined,
          travelDate: form.get("travelDate") || undefined,
          travelers: form.get("travelers") ? Number(form.get("travelers")) : undefined,
          message: form.get("message") || undefined,
          itineraryId: itineraryId || undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Instant inquiry"
        title="Send an inquiry"
        description="Quick details now — I'll follow up with a tailored quote within 48 hours."
      />

      <section className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
        <a
          href="https://wa.me/94707733647"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <MessageCircle size={16} /> Message on WhatsApp instead
        </a>

        {itineraryId && status !== "sent" && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800">
            <MapPinned size={16} className="shrink-0" />
            Your generated itinerary is attached to this inquiry — Chamru will review it directly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-forest-900/10 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-ink-600">Your name</span>
              <input name="name" required className="input-field" />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-ink-600">WhatsApp number</span>
              <input name="whatsapp" className="input-field" />
            </label>
          </div>
          <label className="block text-xs">
            <span className="mb-1 block font-medium text-ink-600">Email</span>
            <input name="email" type="email" required className="input-field" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-ink-600">Travel date</span>
              <input name="travelDate" type="date" className="input-field" />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-ink-600">Travelers</span>
              <input name="travelers" type="number" min={1} defaultValue={1} className="input-field" />
            </label>
          </div>
          <label className="block text-xs">
            <span className="mb-1 block font-medium text-ink-600">
              Anything else? (interests, budget, itinerary you&rsquo;ve built)
            </span>
            <textarea name="message" rows={3} className="input-field" />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Submit Inquiry"} <Send size={14} />
          </button>
          {status === "sent" && (
            <p className="text-sm text-emerald-700">
              Got it! A confirmation email is on its way, and I&rsquo;ll follow up within 48 hours.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">
              That didn&rsquo;t go through — try again, or message on WhatsApp above.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
