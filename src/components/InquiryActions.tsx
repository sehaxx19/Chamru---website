"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";

const STATUSES = ["PENDING", "REVIEWED", "QUOTED", "CONFIRMED", "DECLINED"] as const;

export default function InquiryActions({
  id,
  currentStatus,
  initialPriceLkr,
}: {
  id: string;
  currentStatus: string;
  initialPriceLkr?: number | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [price, setPrice] = useState(initialPriceLkr ? String(initialPriceLkr) : "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    if (status === "QUOTED" && !price) {
      setError("Enter a price to send the quote.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          quotedPriceLkr: status === "QUOTED" ? Number(price) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — try again.");
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong — try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-forest-900/10 pt-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-forest-900/15 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-900"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {status === "QUOTED" && (
        <input
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (LKR)"
          className="w-32 rounded-lg border border-forest-900/15 px-2.5 py-1.5 text-xs"
        />
      )}

      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="flex items-center gap-1.5 rounded-lg bg-forest-900 px-3 py-1.5 text-xs font-semibold text-sand-50 transition hover:bg-forest-800 disabled:opacity-60"
      >
        {pending ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
        {status === "QUOTED" ? "Save & Email Quote" : "Update Status"}
      </button>

      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
