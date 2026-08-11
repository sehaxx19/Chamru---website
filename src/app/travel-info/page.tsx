import {
  FileText,
  Banknote,
  Smartphone,
  CloudSun,
  Briefcase,
  Heart,
  Phone,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Travel Information",
  description:
    "Visa details, currency exchange, local SIM cards, weather by season, packing tips, cultural etiquette, and emergency contacts for visiting Sri Lanka.",
};

const SECTIONS = [
  {
    id: "visa",
    icon: FileText,
    title: "Visa details",
    body: "Most nationalities need an Electronic Travel Authorization (ETA) before arrival, obtainable online in a few minutes. A handful of countries qualify for visa-free entry — I can confirm your specific requirement once I know your nationality.",
  },
  {
    id: "currency",
    icon: Banknote,
    title: "Currency exchange",
    body: "The Sri Lankan Rupee (LKR) is the local currency. Airports, banks, and licensed exchange counters in cities all offer competitive rates. Cards are widely accepted in hotels and larger shops; carry cash for smaller vendors and rural areas.",
  },
  {
    id: "sim",
    icon: Smartphone,
    title: "Local SIM cards",
    body: "Prepaid tourist SIM cards (Dialog, Mobitel, Airtel) are available at the airport on arrival with reasonable data packages. I'm happy to help you pick one up on the way to your first stop.",
  },
  {
    id: "weather",
    icon: CloudSun,
    title: "Weather by season",
    body: "Sri Lanka has two monsoon seasons affecting different coasts at different times — broadly, the west and south coasts are driest from December to March, while the east coast is best from April to September. I'll help time your route around the season you're visiting.",
  },
  {
    id: "packing",
    icon: Briefcase,
    title: "Packing tips",
    body: "Light, breathable clothing for the lowlands, a light jacket for the hill country evenings, comfortable walking shoes, sun protection, and modest clothing (shoulders and knees covered) for temple visits.",
  },
  {
    id: "etiquette",
    icon: Heart,
    title: "Cultural etiquette",
    body: "Remove shoes and hats before entering temples, dress modestly at religious sites, and ask before photographing people, especially at religious ceremonies. Public displays of affection are best kept low-key.",
  },
  {
    id: "emergency",
    icon: Phone,
    title: "Emergency contacts",
    body: "Police: 119 · Ambulance: 1990 · Tourist Police: +94 11 242 1052. As your driver and guide, I'm also reachable throughout your trip for anything you need.",
  },
];

export default function TravelInfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Travel info"
        title="Useful information for your trip"
        description="Everything you need to know before and during your visit to Sri Lanka."
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {SECTIONS.map(({ id, icon: Icon, title, body }) => (
            <div key={id} id={id} className="scroll-mt-24 rounded-xl border border-forest-900/10 bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Icon size={17} />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold text-forest-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
