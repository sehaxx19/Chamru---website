"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function RefreshButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.refresh()}
      className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-500"
    >
      <RefreshCw size={13} /> Refresh
    </button>
  );
}
