import { NextRequest, NextResponse } from "next/server";
import { weatherLocations as LOCATIONS } from "@/data/sample-data";

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Weather is not configured. Set OPENWEATHER_API_KEY." },
      { status: 500 }
    );
  }

  const city = req.nextUrl.searchParams.get("city")?.trim();
  if (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    try {
      const res = await fetch(url, { next: { revalidate: 1800 } });
      if (res.status === 404) {
        return NextResponse.json({ error: `No results for "${city}".` }, { status: 404 });
      }
      if (!res.ok) throw new Error(`OpenWeather ${res.status}`);
      const data = await res.json();
      return NextResponse.json({
        location: {
          name: data.name,
          country: data.sys?.country ?? null,
          tempC: Math.round(data.main.temp),
          condition: data.weather?.[0]?.main ?? "Unknown",
        },
      });
    } catch (err) {
      console.error(`Weather fetch failed for "${city}":`, err);
      return NextResponse.json(
        { error: "Couldn't fetch weather for that city — try again." },
        { status: 502 }
      );
    }
  }

  const results = await Promise.all(
    LOCATIONS.map(async (loc) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${apiKey}`;
      try {
        const res = await fetch(url, { next: { revalidate: 1800 } }); // cache 30 min
        if (!res.ok) throw new Error(`OpenWeather ${res.status}`);
        const data = await res.json();
        return {
          name: loc.name,
          tempC: Math.round(data.main.temp),
          condition: data.weather?.[0]?.main ?? "Unknown",
          icon: data.weather?.[0]?.icon ?? null,
        };
      } catch (err) {
        console.error(`Weather fetch failed for ${loc.name}:`, err);
        return { name: loc.name, tempC: null, condition: "Unavailable", icon: null };
      }
    })
  );

  return NextResponse.json({ locations: results });
}
