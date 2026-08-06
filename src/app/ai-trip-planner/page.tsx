"use client";

import { useState, FormEvent } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

type ItineraryDay = {
  day: number;
  location: string;
  activities: string[];
  overnightStay?: string;
};

const EXAMPLE_PROMPTS = [
  "7 days, beaches and wildlife, moderate budget, two of us",
  "10 day honeymoon trip, culture and tea country, no early mornings",
  "5 days, adventure and hiking, backpacker budget, solo traveler",
];

export default function AiTripPlannerPage() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<{
    title: string;
    days: ItineraryDay[];
    estimatedCostLkr: number;
  } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setStatus("loading");
    setResult(null);

    try {
      const res = await fetch("/api/itinerary/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setResult(data.itineraryJson);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="AI trip planner"
        title="Plan with AI"
        description="Tell me what you like in your own words, and I'll build the perfect trip for you."
      />

      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm">
          <label className="block text-xs">
            <span className="mb-1 flex items-center gap-1.5 font-medium text-ink-600">
              <Sparkles size={13} className="text-emerald-600" /> Describe your dream trip
            </span>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="e.g. 7 days, beaches and wildlife, moderate budget, two of us"
              className="input-field"
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPrompt(p)}
                className="rounded-full border border-forest-900/15 px-3 py-1.5 text-xs text-ink-600 hover:bg-sand-100"
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {status === "loading" ? "Thinking…" : "Plan with AI"} <ArrowRight size={15} />
          </button>

          {status === "error" && (
            <p className="mt-3 text-sm text-red-600">
              The AI planner isn&rsquo;t configured yet (needs an ANTHROPIC_API_KEY on the
              server) — send an inquiry instead and I&rsquo;ll build your itinerary by hand.
            </p>
          )}
        </form>

        {result && (
          <div className="mt-8 rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-forest-900">
                {result.title}
              </h2>
              <span className="font-display text-base font-semibold text-emerald-700">
                LKR {result.estimatedCostLkr?.toLocaleString?.() ?? result.estimatedCostLkr}
              </span>
            </div>
            <ol className="mt-5 space-y-4">
              {result.days?.map((d) => (
                <li key={d.day} className="rounded-xl bg-sand-50 p-4">
                  <h3 className="font-display text-sm font-semibold text-forest-900">
                    Day {d.day}: {d.location}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-600">
                    {d.activities?.map((a, idx) => <li key={idx}>{a}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  );
}
