"use client";

import { useState, FormEvent } from "react";
import { Star, Send, ExternalLink } from "lucide-react";

const GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL;

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("sending");
    const form = new FormData(formEl);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: form.get("guestName"),
          country: form.get("country") || undefined,
          rating,
          text: form.get("text"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      formEl.reset();
      setRating(5);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
        <h3 className="font-display text-base font-semibold text-forest-900">
          Thanks for sharing your experience!
        </h3>
        <p className="mt-2 text-sm text-ink-600">
          Your review will appear on this page once it&rsquo;s been reviewed.
        </p>
        {GOOGLE_REVIEW_URL && (
          <>
            <p className="mt-4 text-sm text-ink-900">
              Would you also leave the same review on Google? It helps other travelers find us.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-forest-950 hover:bg-emerald-400"
            >
              Leave a Google Review <ExternalLink size={14} />
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-forest-900/10 bg-white p-6 shadow-sm"
    >
      <h3 className="font-display text-base font-semibold text-forest-900">Leave a review</h3>

      <label className="mt-4 block text-xs">
        <span className="mb-1.5 block font-medium text-ink-600">Your rating</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              className="text-gold-500"
            >
              <Star size={22} fill={n <= (hoverRating || rating) ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-xs">
          <span className="mb-1 block font-medium text-ink-600">Your name</span>
          <input name="guestName" required className="input-field" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block font-medium text-ink-600">Country (optional)</span>
          <input name="country" className="input-field" />
        </label>
      </div>

      <label className="mt-4 block text-xs">
        <span className="mb-1 block font-medium text-ink-600">Your review</span>
        <textarea name="text" rows={4} required className="input-field" />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {status === "sending" ? "Submitting…" : "Submit Review"} <Send size={14} />
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">
          That didn&rsquo;t go through — try again in a moment.
        </p>
      )}
    </form>
  );
}
