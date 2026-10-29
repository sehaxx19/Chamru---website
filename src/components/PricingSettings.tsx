"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

export default function PricingSettings({ initialDayRateLkr }: { initialDayRateLkr: number }) {
  const router = useRouter();
  const [dayRate, setDayRate] = useState(String(initialDayRateLkr));
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  async function save() {
    const value = Number(dayRate);
    if (!value || value <= 0) {
      setStatus("error");
      return;
    }
    setPending(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayRateLkr: value }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("saved");
      router.refresh();
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mb-10 rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-forest-900">Pricing</h2>
      <p className="mt-1 text-xs text-ink-600">
        Every package&rsquo;s &ldquo;starting from&rdquo; price is calculated from this one day rate —
        update it here and it applies everywhere immediately.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="block text-xs">
          <span className="mb-1 block font-medium text-ink-600">Day rate (LKR)</span>
          <input
            type="number"
            min={1}
            value={dayRate}
            onChange={(e) => setDayRate(e.target.value)}
            className="w-40 rounded-lg border border-forest-900/15 px-2.5 py-1.5 text-sm"
          />
        </label>
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="flex items-center gap-1.5 rounded-lg bg-forest-900 px-3 py-1.5 text-xs font-semibold text-sand-50 transition hover:bg-forest-800 disabled:opacity-60"
        >
          {pending ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
          Save
        </button>
        {status === "saved" && <span className="text-xs text-emerald-700">Saved!</span>}
        {status === "error" && <span className="text-xs text-red-600">Enter a valid amount.</span>}
      </div>
    </div>
  );
}
