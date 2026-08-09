"use client";

import { useState, useEffect, useRef, Suspense, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { interests as INTEREST_OPTIONS } from "@/data/sample-data";

type ItineraryDay = {
  day: number;
  location: string;
  activities: string[];
  overnightStay?: string;
};

type ItineraryResult = {
  itineraryJson: {
    title: string;
    days: ItineraryDay[];
    estimatedCostLkr: number;
    includes: string[];
    excludes: string[];
  };
};

export default function ItinerariesPage() {
  return (
    <Suspense fallback={null}>
      <ItinerariesPageInner />
    </Suspense>
  );
}

function ItinerariesPageInner() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const prefillInterests = searchParams.get("interests");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(() =>
    prefillInterests ? prefillInterests.split(",").filter(Boolean) : []
  );
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<ItineraryResult["itineraryJson"] | null>(null);

  function toggleInterest(i: string) {
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setResult(null);
    const form = new FormData(e.currentTarget);
    const days = Number(form.get("days")) || undefined;
    const travelers = Number(form.get("travelers")) || undefined;
    const budgetLkr = Number(form.get("budget")) || undefined;
    const arrivalDate = (form.get("arrivalDate") as string) || undefined;

    try {
      const res = await fetch("/api/itinerary/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Build a Sri Lanka itinerary for ${travelers ?? "a few"} traveler(s), focused on ${
            selectedInterests.join(", ") || "a general highlights tour"
          }.`,
          days,
          travelers,
          interests: selectedInterests,
          budgetLkr,
          arrivalDate,
        }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setResult(data.itineraryJson);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  // If arriving from the homepage's "Get My Itinerary" button, the form is
  // pre-filled via the URL and should submit itself once. Dispatching a real
  // submit event (rather than calling handleSubmit directly) keeps this
  // effect's own call stack free of state updates.
  useEffect(() => {
    if (searchParams.get("autorun") === "1") {
      formRef.current?.requestSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Build your itinerary"
        title="Tell me what you like"
        description="Answer a few questions and get a suggested route, driving times, and estimated cost."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-ink-600">Arrival date</span>
                <input
                  name="arrivalDate"
                  type="date"
                  defaultValue={searchParams.get("arrivalDate") ?? undefined}
                  className="input-field"
                />
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-ink-600">Number of days</span>
                <select
                  name="days"
                  defaultValue={searchParams.get("days") ?? ""}
                  className="input-field"
                >
                  <option value="">Select days</option>
                  {[3, 5, 7, 10, 14].map((d) => (
                    <option key={d} value={d}>{d} days</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-ink-600">Travelers</span>
                <input
                  name="travelers"
                  type="number"
                  min={1}
                  defaultValue={searchParams.get("travelers") ?? 2}
                  className="input-field"
                />
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-ink-600">Budget (LKR, total)</span>
                <input
                  name="budget"
                  type="number"
                  min={0}
                  placeholder="e.g. 250000"
                  defaultValue={searchParams.get("budget") ?? undefined}
                  className="input-field"
                />
              </label>
            </div>

            <div>
              <span className="mb-2 block text-xs font-medium text-ink-600">Interests</span>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      selectedInterests.includes(i)
                        ? "border-emerald-500 bg-emerald-500 text-forest-950"
                        : "border-forest-900/15 text-ink-900 hover:bg-sand-100"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 px-5 py-3 text-sm font-semibold text-sand-50 transition hover:bg-forest-800 disabled:opacity-60"
            >
              {status === "loading" ? "Building your itinerary…" : "Generate My Itinerary"}
              <ArrowRight size={15} />
            </button>

            {status === "error" && (
              <p className="text-sm text-red-600">
                The AI planner isn&rsquo;t configured yet (needs an ANTHROPIC_API_KEY on the
                server) — send an inquiry instead and I&rsquo;ll build your itinerary by hand.
              </p>
            )}
          </form>

          <aside className="h-fit rounded-2xl bg-sand-100 p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-forest-900">
              <Sparkles size={13} className="text-emerald-600" /> Map preview
            </p>
            <div className="mt-3 h-64 rounded-xl bg-white" aria-hidden="true" />
            <p className="mt-3 text-xs text-ink-600">
              Your route will plot here once your itinerary is generated.
            </p>
          </aside>
        </div>

        {result && (
          <div className="mt-10 rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="min-w-0 font-display text-xl font-semibold text-forest-900">
                {result.title}
              </h2>
              <span className="shrink-0 font-display text-lg font-semibold text-emerald-700">
                LKR {result.estimatedCostLkr?.toLocaleString?.() ?? result.estimatedCostLkr}
              </span>
            </div>

            <ol className="mt-6 space-y-4">
              {result.days?.map((d) => (
                <li key={d.day} className="rounded-xl bg-sand-50 p-4">
                  <h3 className="font-display text-sm font-semibold text-forest-900">
                    Day {d.day}: {d.location}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-600">
                    {d.activities?.map((a, idx) => <li key={idx}>{a}</li>)}
                  </ul>
                  {d.overnightStay && (
                    <p className="mt-2 text-xs text-ink-600">Overnight: {d.overnightStay}</p>
                  )}
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-6 flex items-center gap-2 rounded-full border border-forest-900/15 px-4 py-2 text-sm font-medium text-forest-900 hover:bg-sand-100"
            >
              <Download size={14} /> Download Itinerary (PDF)
            </button>
          </div>
        )}
      </section>
    </>
  );
}
