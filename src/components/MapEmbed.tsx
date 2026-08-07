export default function MapEmbed({
  query,
  className = "",
  zoom = 14,
}: {
  query: string;
  className?: string;
  zoom?: number;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

  return (
    <iframe
      src={src}
      title={`Map showing ${query}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full border-0 ${className}`}
      allowFullScreen
    />
  );
}
