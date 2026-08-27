"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";

export default function ReviewModerationActions({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState("");

  async function act(action: "approve" | "reject") {
    setError("");
    setPending(action);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error("failed");
      router.refresh();
    } catch {
      setError("Something went wrong — try again.");
      setPending(null);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-forest-900/10 pt-3">
      <button
        type="button"
        onClick={() => act("approve")}
        disabled={pending !== null}
        className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-forest-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {pending === "approve" ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
        Approve
      </button>
      <button
        type="button"
        onClick={() => act("reject")}
        disabled={pending !== null}
        className="flex items-center gap-1.5 rounded-lg border border-red-600/30 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
      >
        {pending === "reject" ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
        Reject
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
