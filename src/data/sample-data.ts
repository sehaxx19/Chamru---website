// Placeholder content mirroring the Prisma schema shape.
// Once the database is connected, replace these with `prisma.destination.findMany()` etc.
// (see src/lib/prisma.ts). Keeping the shape identical makes that swap a one-line change
// per page.

export const destinations = [
  {
    slug: "sigiriya-rock-fortress",
    name: "Sigiriya Rock Fortress",
    region: "Sigiriya, Central Province",
    category: "Culture",
    shortDesc:
      "UNESCO World Heritage Site. Climb the Lion Rock and enjoy breathtaking views.",
    heroImageUrl: "/images/destinations/sigiriya.jpg",
    bestTime: "Apr – Sep",
    timeNeeded: "2–3 hrs",
    entranceFee: "LKR 4,500",
  },
  {
    slug: "ella",
    name: "Ella",
    region: "Badulla, Central Province",
    category: "Hiking",
    shortDesc:
      "Scenic train rides, lush tea plantations and breathtaking mountain views.",
    heroImageUrl: "/images/destinations/ella.jpg",
    bestTime: "Jan – Mar",
    timeNeeded: "1–2 hrs",
    entranceFee: "Free",
  },
  {
    slug: "yala-national-park",
    name: "Yala National Park",
    region: "Hambantota Province",
    category: "Wildlife",
    shortDesc: "Home to Sri Lanka's famous leopards and diverse wildlife.",
    heroImageUrl: "/images/destinations/yala.jpg",
    bestTime: "Feb – Jun",
    timeNeeded: "4–6 hrs",
    entranceFee: "LKR 15,000",
  },
  {
    slug: "galle-fort",
    name: "Galle Fort",
    region: "Galle, Southern Province",
    category: "Culture",
    shortDesc:
      "Historic Dutch fort with charming streets and ocean views.",
    heroImageUrl: "/images/destinations/galle-fort.jpg",
    bestTime: "Dec – Apr",
    timeNeeded: "2–3 hrs",
    entranceFee: "Free",
  },
  {
    slug: "nine-arches-bridge",
    name: "Nine Arches Bridge",
    region: "Ella, Uva Province",
    category: "Hiking",
    shortDesc:
      "Iconic colonial-era railway bridge set among tea plantations — best at sunrise.",
    heroImageUrl: "/images/destinations/nine-arches.jpg",
    bestTime: "Jan – Mar",
    timeNeeded: "1 hr",
    entranceFee: "Free",
  },
  {
    slug: "temple-of-the-tooth",
    name: "Temple of the Tooth",
    region: "Kandy, Central Province",
    category: "Culture",
    shortDesc:
      "Sacred Buddhist temple in the hill capital, home to a relic of the Buddha's tooth.",
    heroImageUrl: "/images/destinations/temple-of-tooth.jpg",
    bestTime: "Year-round",
    timeNeeded: "1–2 hrs",
    entranceFee: "LKR 1,500",
  },
  {
    slug: "mirissa-beach",
    name: "Mirissa",
    region: "Matara, Southern Province",
    category: "Beaches",
    shortDesc:
      "Golden-sand beach famous for whale watching and laid-back beach cafes.",
    heroImageUrl: "/images/destinations/mirissa.jpg",
    bestTime: "Nov – Apr",
    timeNeeded: "Half day",
    entranceFee: "Free",
  },
] as const;

export const gallery = [
  { label: "Sigiriya Rock Fortress at golden hour", category: "Culture", gradientIndex: 0 },
  { label: "Nine Arches Bridge, Ella", category: "Hiking", gradientIndex: 1 },
  { label: "Leopard on safari, Yala National Park", category: "Wildlife", gradientIndex: 2 },
  { label: "Galle Fort ramparts at sunset", category: "Culture", gradientIndex: 3 },
  { label: "Tea plantations, Nuwara Eliya", category: "Hiking", gradientIndex: 0 },
  { label: "Mirissa beach and fishing boats", category: "Beaches", gradientIndex: 1 },
  { label: "Guests with Chamru and the Honda Vezel", category: "Guests", gradientIndex: 2 },
  { label: "Whale watching off the southern coast", category: "Wildlife", gradientIndex: 3 },
  { label: "Ella train winding through the hills", category: "Hiking", gradientIndex: 0 },
] as const;

export const galleryCategories = [
  "All Photos",
  "Culture",
  "Wildlife",
  "Beaches",
  "Hiking",
  "Guests",
] as const;

export const packages = [
  { slug: "5-day-tour", name: "5 Days Tour", days: 5, fromPriceLkr: 95000 },
  { slug: "7-day-tour", name: "7 Days Tour", days: 7, fromPriceLkr: 135000 },
  { slug: "10-day-tour", name: "10 Days Tour", days: 10, fromPriceLkr: 175000 },
  { slug: "14-day-tour", name: "14 Days Tour", days: 14, fromPriceLkr: 245000 },
  { slug: "customized-tour", name: "Customized Tour", days: 0, fromPriceLkr: null },
] as const;

export const vehicle = {
  name: "Honda Vezel",
  type: "SUV",
  features: [
    "Air Conditioned",
    "Comfortable Seating",
    "Luggage Space",
    "Free Wi-Fi",
    "Phone Charging Ports",
    "Complimentary Bottled Water",
  ],
  heroImageUrl: "/images/vehicle/honda-vezel.jpg",
};

export const reviews = [
  {
    guestName: "John & Emily",
    country: "Australia",
    rating: 5,
    text: "Amazing experience with Chamru! Very friendly, professional and knowledgeable. He made our trip to Sri Lanka unforgettable.",
    source: "Google",
  },
  {
    guestName: "Markus",
    country: "Germany",
    rating: 5,
    text: "Highly recommend! Safe driving, clean car and excellent service. We felt like traveling with a friend.",
    source: "Google",
  },
] as const;

export const whyChooseUs = [
  "Private Tours Only",
  "Flexible Itineraries",
  "Fair Pricing",
  "Local Knowledge & Experience",
  "Safe & Comfortable Driving",
  "Assistance Throughout Your Trip",
  "No Hidden Charges",
];

export const faqs = [
  {
    q: "Do I need to pay a deposit?",
    a: "Yes, a small deposit confirms your booking once your itinerary and quote are finalized. The remaining balance is paid during the trip.",
  },
  {
    q: "Can I customize my trip?",
    a: "Absolutely — every itinerary is built around your interests, pace, and budget. Use the itinerary builder or just message me directly.",
  },
  {
    q: "Do you help with train tickets?",
    a: "Yes, I can help arrange scenic train tickets (like the Ella line) in advance where seats are limited.",
  },
  {
    q: "Can you arrange safari jeeps?",
    a: "Yes, jeep safaris at Yala, Udawalawe, and other parks can be arranged as part of your itinerary.",
  },
  {
    q: "Do you provide airport pickup?",
    a: "Yes, airport pickup and drop-off is included in all tour packages.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Bank transfer, major cards, and cash on arrival are all accepted. Details are shared with your quote.",
  },
];

export const travelInfo = [
  { label: "Visa Details", href: "/travel-info#visa" },
  { label: "Currency Exchange", href: "/travel-info#currency" },
  { label: "Local SIM Cards", href: "/travel-info#sim" },
  { label: "Weather by Season", href: "/travel-info#weather" },
  { label: "Packing Tips", href: "/travel-info#packing" },
  { label: "Cultural Etiquette", href: "/travel-info#etiquette" },
  { label: "Emergency Contacts", href: "/travel-info#emergency" },
];

export const weatherLocations = [
  { name: "Colombo", lat: 6.9271, lon: 79.8612 },
  { name: "Kandy", lat: 7.2906, lon: 80.6337 },
  { name: "Ella", lat: 6.8667, lon: 81.0466 },
  { name: "Yala", lat: 6.3728, lon: 81.5183 },
  { name: "Galle", lat: 6.0535, lon: 80.221 },
] as const;

export const interests = [
  "Wildlife",
  "Beaches",
  "Culture",
  "Hiking",
  "Tea Country",
  "Adventure",
  "Luxury",
];
