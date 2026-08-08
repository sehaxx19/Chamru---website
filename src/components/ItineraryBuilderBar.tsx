"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import { interests as INTEREST_OPTIONS } from "@/data/sample-data";

export default function ItineraryBuilderBar() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  function toggleInterest(i: string) {
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const arrivalDate = form.get("arrivalDate") as string;
    const days = form.get("days") as string;
    const travelers = form.get("travelers") as string;
    const budget = form.get("budget") as string;

    if (arrivalDate) params.set("arrivalDate", arrivalDate);
    if (days) params.set("days", days);
    if (travelers) params.set("travelers", travelers);
    if (budget) params.set("budget", budget);
    if (selectedInterests.length) params.set("interests", selectedInterests.join(","));
    params.set("autorun", "1");

    router.push(`/itineraries?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-sand-50 p-4 shadow-xl sm:p-5"
    >
      <div className="mb-3 flex items-center gap-2 text-forest-900">
        <Sparkles size={15} className="text-emerald-600" />
        <span className="text-sm font-semibold">Build Your Own Itinerary</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
        <Field label="Arrival Date">
          <input name="arrivalDate" type="date" className="input-field" />
        </Field>
        <Field label="No. of Days">
          <select name="days" className="input-field" defaultValue="">
            <option value="">Select days</option>
            {[3, 5, 7, 10, 14].map((d) => (
              <option key={d} value={d}>
                {d} days
              </option>
            ))}
          </select>
        </Field>
        <Field label="Travelers">
          <input name="travelers" type="number" min={1} defaultValue={1} className="input-field" />
        </Field>
        <Field label="Budget (LKR)">
          <input name="budget" type="number" min={0} placeholder="Select budget" className="input-field" />
        </Field>
        <div className="hidden lg:block" aria-hidden="true" />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 self-end rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-sand-50 hover:bg-forest-800"
        >
          Get My Itinerary <ArrowRight size={15} />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {INTEREST_OPTIONS.map((i) => (
          <button
            type="button"
            key={i}
            onClick={() => toggleInterest(i)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              selectedInterests.includes(i)
                ? "border-emerald-500 bg-emerald-500 text-forest-950"
                : "border-forest-900/15 text-ink-900 hover:bg-sand-100"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs">
      <span className="mb-1 block font-medium text-ink-600">{label}</span>
      {children}
    </label>
  );
}
