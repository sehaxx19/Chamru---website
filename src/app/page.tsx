import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Wallet,
  Users,
  CalendarDays,
  Star,
  MapPin,
  Clock,
  Wifi,
  Snowflake,
  BatteryCharging,
  Luggage,
  CloudSun,
  ShieldCheck,
  Ban,
} from "lucide-react";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import DestinationImage from "@/components/DestinationImage";
import {
  destinations,
  packages,
  vehicle,
  reviews,
  whyChooseUs,
  interests,
} from "@/data/sample-data";

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-forest-950">
        <PhotoPlaceholder
          label="Hero photo — traveler overlooking Sigiriya at golden hour"
          className="absolute inset-0 h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/20" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] text-sand-50 sm:text-5xl lg:text-6xl">
                Discover Sri Lanka
                <br />
                <span className="italic text-emerald-400">
                  with a trusted local driver &amp; guide.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-sand-100/80 sm:text-lg">
                Safe, comfortable, personalized. Unforgettable journeys made
                just for you.
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sand-100/80">
                <li className="flex items-center gap-1.5">
                  <Shield size={15} className="text-emerald-400" /> Private Tours
                </li>
                <li className="flex items-center gap-1.5">
                  <CalendarDays size={15} className="text-emerald-400" /> Flexible Itineraries
                </li>
                <li className="flex items-center gap-1.5">
                  <Wallet size={15} className="text-emerald-400" /> Fair Pricing
                </li>
                <li className="flex items-center gap-1.5">
                  <Ban size={15} className="text-emerald-400" /> No Hidden Charges
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/plan-your-trip"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400"
                >
                  Build Your Itinerary <ArrowRight size={16} />
                </Link>
                <Link
                  href="/instant-inquiry"
                  className="inline-flex items-center gap-2 rounded-full border border-sand-50/30 px-6 py-3 text-sm font-semibold text-sand-50 transition hover:bg-sand-50/10"
                >
                  Instant Inquiry
                </Link>
              </div>
            </div>

            {/* AI Trip Planner card */}
            <div className="rounded-2xl border border-sand-50/15 bg-forest-900/80 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sand-50">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Sparkles size={16} />
                </span>
                <span className="font-display text-base font-semibold">
                  AI Trip Planner
                </span>
              </div>
              <p className="mt-3 text-sm text-sand-100/70">
                Tell us what you like, our AI will build the perfect trip for
                you.
              </p>
              <Link
                href="/ai-trip-planner"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400"
              >
                Plan with AI <Sparkles size={14} />
              </Link>
            </div>
          </div>

          {/* Build Your Own Itinerary bar */}
          <div className="route-line my-10 opacity-40" />
          <ItineraryBuilderBar />
        </div>
      </section>

      {/* ---------------- Popular Destinations + Packages ---------------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-forest-900 sm:text-3xl">
                Popular Destinations
              </h2>
              <Link
                href="/destinations"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                View All Destinations →
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {destinations.map((d, i) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group overflow-hidden rounded-xl border border-forest-900/10 bg-white shadow-sm transition hover:shadow-md"
                >
                  <DestinationImage
                    src={d.heroImageUrl}
                    alt={d.name}
                    gradientIndex={i}
                    className="h-32 w-full"
                  />
                  <div className="p-3">
                    <h3 className="font-display text-sm font-semibold text-forest-900">
                      {d.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-ink-600">
                      {d.shortDesc}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-ink-600">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {d.timeNeeded}
                      </span>
                      <span>{d.entranceFee}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-ink-600">
                      <MapPin size={11} /> {d.region}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Packages sidebar */}
          <aside className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-forest-900">
                Popular Packages
              </h3>
              <Link href="/packages" className="text-xs font-medium text-emerald-600">
                View All
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {packages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/packages/${p.slug}`}
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-sm transition hover:bg-sand-100"
                  >
                    <span className="text-ink-900">{p.name}</span>
                    <span className="text-xs text-ink-600">
                      {p.fromPriceLkr
                        ? `from LKR ${p.fromPriceLkr.toLocaleString()}`
                        : "Build your own"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ---------------- Vehicle + Reviews ---------------- */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
              Travel in Comfort
            </p>
            <h3 className="font-display text-xl font-semibold text-forest-900">
              {vehicle.name}
            </h3>
            <PhotoPlaceholder
              label={`${vehicle.name} — exterior`}
              gradientIndex={2}
              className="mt-3 h-48 w-full rounded-lg"
            />
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-ink-600">
              <li className="flex items-center gap-1.5"><Snowflake size={14} className="text-emerald-600" /> Air Conditioned</li>
              <li className="flex items-center gap-1.5"><Users size={14} className="text-emerald-600" /> Comfortable Seating</li>
              <li className="flex items-center gap-1.5"><Luggage size={14} className="text-emerald-600" /> Luggage Space</li>
              <li className="flex items-center gap-1.5"><Wifi size={14} className="text-emerald-600" /> Free Wi-Fi</li>
              <li className="flex items-center gap-1.5"><BatteryCharging size={14} className="text-emerald-600" /> Charging Ports</li>
            </ul>
            <Link
              href="/vehicle"
              className="mt-4 inline-block rounded-full border border-forest-900/20 px-4 py-2 text-sm font-medium text-forest-900 hover:bg-sand-100"
            >
              View Vehicle Details
            </Link>
          </div>

          <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-forest-900">
                Guest Reviews
              </h3>
              <span className="flex items-center gap-1 text-sm font-semibold text-gold-500">
                <Star size={14} fill="currentColor" /> 5.0
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <div key={r.guestName} className="rounded-lg bg-sand-50 p-4">
                  <div className="flex gap-0.5 text-gold-500">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-ink-900">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-2 text-xs text-ink-600">
                    {r.guestName} · {r.country} · {r.source}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/reviews"
              className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              View All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Feature strip ---------------- */}
      <section className="border-y border-forest-900/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
          {[
            { icon: Users, label: "Private Tours Only" },
            { icon: CalendarDays, label: "Flexible Itineraries" },
            { icon: MapPin, label: "Local Knowledge" },
            { icon: ShieldCheck, label: "Safe & Comfortable" },
            { icon: Clock, label: "24/7 Assistance" },
            { icon: Ban, label: "No Hidden Charges" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Icon size={18} />
              </span>
              <span className="text-xs font-medium text-ink-900">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Weather / Travel Info / Why Choose / CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-forest-900">
              <CloudSun size={16} className="text-emerald-600" /> Weather Update
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-ink-600">
              <li className="flex justify-between"><span>Colombo</span><span>30°C · Partly Cloudy</span></li>
              <li className="flex justify-between"><span>Kandy</span><span>26°C · Light Rain</span></li>
              <li className="flex justify-between"><span>Ella</span><span>23°C · Cloudy</span></li>
              <li className="flex justify-between"><span>Yala</span><span>30°C · Sunny</span></li>
              <li className="flex justify-between"><span>Galle</span><span>29°C · Partly Cloudy</span></li>
            </ul>
            <Link href="/weather" className="mt-3 inline-block text-xs font-medium text-emerald-600">
              View Full Forecast →
            </Link>
          </div>

          <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <h4 className="font-display text-sm font-semibold text-forest-900">Travel Information</h4>
            <ul className="mt-3 space-y-1.5 text-xs text-ink-600">
              <li>Visa Details</li>
              <li>Currency Exchange</li>
              <li>SIM Cards</li>
              <li>Weather by Season</li>
              <li>Packing Tips</li>
              <li>Cultural Etiquette</li>
              <li>Emergency Contacts</li>
            </ul>
            <Link href="/travel-info" className="mt-3 inline-block text-xs font-medium text-emerald-600">
              Learn More →
            </Link>
          </div>

          <div className="rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
            <h4 className="font-display text-sm font-semibold text-forest-900">
              Why Choose Travel with Chamru?
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-ink-600">
              {whyChooseUs.slice(0, 6).map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/why-choose-us" className="mt-3 inline-block text-xs font-medium text-emerald-600">
              Learn More About Me →
            </Link>
          </div>

          <div className="rounded-xl bg-forest-900 p-5 text-sand-50">
            <h4 className="font-display text-sm font-semibold">
              Let&rsquo;s Plan Your Dream Trip!
            </h4>
            <p className="mt-2 text-xs text-sand-100/70">
              Start your unforgettable Sri Lanka adventure with a
              personalized itinerary.
            </p>
            <Link
              href="/plan-your-trip"
              className="mt-4 block rounded-full bg-emerald-500 px-4 py-2.5 text-center text-xs font-semibold text-forest-950 hover:bg-emerald-400"
            >
              Plan Your Trip Now
            </Link>
            <Link
              href="/contact"
              className="mt-2 block rounded-full border border-sand-50/30 px-4 py-2.5 text-center text-xs font-semibold text-sand-50 hover:bg-sand-50/10"
            >
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ItineraryBuilderBar() {
  return (
    <form className="rounded-2xl bg-sand-50 p-4 shadow-xl sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-forest-900">
        <Sparkles size={15} className="text-emerald-600" />
        <span className="text-sm font-semibold">Build Your Own Itinerary</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
        <Field label="Arrival Date">
          <input type="date" className="input-field" />
        </Field>
        <Field label="No. of Days">
          <select className="input-field">
            <option>Select days</option>
            {[3, 5, 7, 10, 14].map((d) => (
              <option key={d}>{d} days</option>
            ))}
          </select>
        </Field>
        <Field label="Travelers">
          <input type="number" min={1} defaultValue={1} className="input-field" />
        </Field>
        <Field label="Interests">
          <select className="input-field">
            <option>Select interests</option>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget">
          <input type="text" placeholder="Select budget" className="input-field" />
        </Field>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 self-end rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-sand-50 hover:bg-forest-800"
        >
          Get My Itinerary <ArrowRight size={15} />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map((i) => (
          <span
            key={i}
            className="rounded-full border border-forest-900/15 px-3 py-1 text-xs font-medium text-ink-900"
          >
            {i}
          </span>
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
