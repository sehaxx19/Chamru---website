import { CloudSun } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import RefreshButton from "@/components/RefreshButton";
import { weatherLocations } from "@/data/sample-data";

export const metadata = {
  title: "Weather | Travel with Chamru",
};

// Re-fetch at most every 30 minutes.
export const revalidate = 1800;

type WeatherLocation = {
  name: string;
  tempC: number | null;
  condition: string;
};

const FALLBACK: WeatherLocation[] = [
  { name: "Colombo", tempC: 30, condition: "Partly Cloudy" },
  { name: "Kandy", tempC: 26, condition: "Light Rain" },
  { name: "Ella", tempC: 23, condition: "Cloudy" },
  { name: "Yala", tempC: 30, condition: "Sunny" },
  { name: "Galle", tempC: 29, condition: "Partly Cloudy" },
];

async function getWeather(): Promise<{ locations: WeatherLocation[]; live: boolean }> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) return { locations: FALLBACK, live: false };

  try {
    const results = await Promise.all(
      weatherLocations.map(async (loc) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${apiKey}`;
        const res = await fetch(url, { next: { revalidate: 1800 } });
        if (!res.ok) throw new Error(`OpenWeather ${res.status}`);
        const data = await res.json();
        return {
          name: loc.name,
          tempC: Math.round(data.main.temp),
          condition: data.weather?.[0]?.main ?? "Unknown",
        };
      })
    );
    return { locations: results, live: true };
  } catch {
    return { locations: FALLBACK, live: false };
  }
}

export default async function WeatherPage() {
  const { locations, live } = await getWeather();

  return (
    <>
      <PageHeader
        eyebrow="Weather"
        title="Weather in Sri Lanka"
        description="Check current conditions across popular destinations before you travel."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-600">
            {live ? "Live data" : "Sample data — connect OPENWEATHER_API_KEY for live conditions"}
          </p>
          <RefreshButton />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <div key={loc.name} className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-forest-900">
                  {loc.name}
                </h3>
                <CloudSun size={20} className="text-emerald-600" />
              </div>
              <p className="mt-3 font-display text-2xl font-semibold text-forest-900">
                {loc.tempC !== null ? `${loc.tempC}°C` : "—"}
              </p>
              <p className="mt-1 text-sm text-ink-600">{loc.condition}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
