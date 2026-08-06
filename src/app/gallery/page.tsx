"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { gallery, galleryCategories } from "@/data/sample-data";

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>("All Photos");

  const filtered =
    active === "All Photos" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photos from the road"
        description="A look at the places, wildlife, and guests I've had the pleasure of traveling with."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                active === cat
                  ? "border-emerald-500 bg-emerald-500 text-forest-950"
                  : "border-forest-900/15 text-ink-900 hover:bg-sand-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <PhotoPlaceholder
              key={item.label}
              label={item.label}
              gradientIndex={i}
              className="h-40 w-full rounded-xl sm:h-48"
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-ink-600">
            No photos in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
