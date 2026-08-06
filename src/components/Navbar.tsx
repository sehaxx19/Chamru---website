"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Palmtree } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/itineraries", label: "Itineraries" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/vehicle", label: "Vehicle" },
  { href: "/reviews", label: "Reviews" },
  { href: "/gallery", label: "Gallery" },
  { href: "/travel-info", label: "Travel Info" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest-900/10 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-sand-50">
            <Palmtree size={18} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-forest-900">
              Travel with Chamru
            </span>
            <span className="block text-[11px] tracking-wide text-ink-600">
              Your Trusted Driver &amp; Guide in Sri Lanka
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-900/80 transition hover:text-forest-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/plan-your-trip"
            className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-sand-50 transition hover:bg-forest-800"
          >
            Plan Your Trip
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-forest-900/10 bg-sand-50 px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-ink-900/80 hover:bg-sand-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/plan-your-trip"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-forest-900 px-5 py-2.5 text-center text-sm font-semibold text-sand-50"
            >
              Plan Your Trip
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
