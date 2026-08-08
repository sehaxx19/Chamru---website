import Image from "next/image";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

export default function DestinationImage({
  src,
  alt,
  gradientIndex = 0,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  src: string;
  alt: string;
  gradientIndex?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const hasRealPhoto = src.startsWith("http") || src.startsWith("/");
  if (!hasRealPhoto) {
    return <PhotoPlaceholder label={alt} gradientIndex={gradientIndex} className={className} />;
  }

  const hasPosition = /\b(absolute|fixed|sticky|relative)\b/.test(className);

  return (
    <div className={`${hasPosition ? "" : "relative"} overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
