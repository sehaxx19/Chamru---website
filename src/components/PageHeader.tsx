export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-forest-950 px-4 py-14 text-center sm:px-6 lg:px-8">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-display text-3xl font-semibold text-sand-50 sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-3 max-w-xl text-sm text-sand-100/70">
          {description}
        </p>
      )}
    </div>
  );
}
