import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Photos from the road"
        description="A look at the places, wildlife, and guests I've had the pleasure of traveling with."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <GalleryGrid items={items} />
      </section>
    </>
  );
}
