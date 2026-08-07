import Link from "next/link";
import { Palmtree, MessageCircle } from "lucide-react";

// lucide-react no longer ships brand icons, so these are small inline SVGs.
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-sand-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Palmtree size={18} />
            </span>
            <span className="font-display text-lg font-semibold text-sand-50">
              Travel with Chamru
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-sand-100/70">
            Your trusted driver and guide for safe, comfortable, personalized
            journeys across Sri Lanka.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="text-sand-100/70 hover:text-emerald-400">
              <FacebookIcon size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="text-sand-100/70 hover:text-emerald-400">
              <InstagramIcon size={18} />
            </a>
            <a href="#" aria-label="WhatsApp" className="text-sand-100/70 hover:text-emerald-400">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-sand-50">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-sand-100/70">
            <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
            <li><Link href="/packages" className="hover:text-emerald-400">Packages</Link></li>
            <li><Link href="/about" className="hover:text-emerald-400">About Me</Link></li>
            <li><Link href="/itineraries" className="hover:text-emerald-400">Itineraries</Link></li>
            <li><Link href="/destinations" className="hover:text-emerald-400">Destinations</Link></li>
            <li><Link href="/vehicle" className="hover:text-emerald-400">Vehicle</Link></li>
            <li><Link href="/reviews" className="hover:text-emerald-400">Reviews</Link></li>
            <li><Link href="/gallery" className="hover:text-emerald-400">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-sand-50">
            Contact Me
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-sand-100/70">
            <li>+94 70 77 33 647</li>
            <li>travelwithchamru@gmail.com</li>
            <li>Kandy, Sri Lanka</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-sand-50">
            Subscribe
          </h3>
          <p className="mt-4 text-sm text-sand-100/70">
            Get travel tips &amp; special offers.
          </p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-full bg-sand-50/10 px-4 py-2 text-sm text-sand-50 placeholder:text-sand-100/40 outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-forest-950 hover:bg-emerald-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-sand-50/10 py-5 text-center text-xs text-sand-100/50">
        © {new Date().getFullYear()} Travel with Chamru. All Rights Reserved.
      </div>
    </footer>
  );
}
