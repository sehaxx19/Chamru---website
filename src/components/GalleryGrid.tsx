"use client";

import { useState } from "react";
import DestinationImage from "@/components/DestinationImage";
import { galleryCategories } from "@/data/sample-data";

type GalleryItemData = {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
};

export default function GalleryGrid({ items }: { items: GalleryItemData[] }) {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>("All Photos");

  const filtered =
    active === "All Photos" ? items : items.filter((g) => g.category === active);

  return (
    <>
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
          <DestinationImage
            key={item.id}
            src={item.url}
            alt={item.caption ?? ""}
            gradientIndex={i}
            className="h-40 w-full rounded-xl sm:h-48"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-600">
          No photos in this category yet.
        </p>
      )}
    </>
  );
}
