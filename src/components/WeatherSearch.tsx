"use client";

import { useState, FormEvent } from "react";
import { CloudSun, Search } from "lucide-react";

type SearchedLocation = {
  name: string;
  country: string | null;
  tempC: number;
  condition: string;
};

export default function WeatherSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<SearchedLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus("loading");
    setResult(null);

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong — try again.");
        setStatus("error");
        return;
      }
      setResult(data.location);
      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong — try again.");
      setStatus("error");
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any city — e.g. Nuwara Eliya, or your hometown"
          className="input-field"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400 disabled:opacity-60"
        >
          <Search size={14} /> {status === "loading" ? "Searching…" : "Search"}
        </button>
      </form>

      {status === "error" && <p className="mt-3 text-sm text-red-600">{errorMsg}</p>}

      {status === "done" && result && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-sand-50 p-4">
          <div>
            <h3 className="font-display text-sm font-semibold text-forest-900">
              {result.name}
              {result.country ? `, ${result.country}` : ""}
            </h3>
            <p className="mt-1 text-sm text-ink-600">{result.condition}</p>
          </div>
          <div className="flex items-center gap-2">
            <CloudSun size={20} className="text-emerald-600" />
            <span className="font-display text-2xl font-semibold text-forest-900">
              {result.tempC}°C
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
