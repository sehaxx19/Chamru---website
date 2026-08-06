import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHeader from "@/components/PageHeader";
import { ShieldCheck, Languages, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Me" title="Hello, I'm Chamru" />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <PhotoPlaceholder label="Chamru with the Honda Vezel" className="h-80 w-full rounded-2xl" gradientIndex={1} />
        <div>
          <h2 className="font-display text-2xl font-semibold text-forest-900">
            Your Friendly Local Driver &amp; Guide in Sri Lanka
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            I&rsquo;m Chamru, a professional driver and guide with years of
            experience showing visitors the beauty of Sri Lanka. Safe,
            reliable and personalized tours to make your journey comfortable
            and unforgettable.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-ink-900">
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-600" /> Safe &amp; comfortable driving</li>
            <li className="flex items-center gap-2"><Users size={16} className="text-emerald-600" /> Friendly &amp; trustworthy service</li>
            <li className="flex items-center gap-2"><Languages size={16} className="text-emerald-600" /> Fluent in English</li>
            <li className="flex items-center gap-2"><Star size={16} className="text-emerald-600" /> Flexible &amp; personalized tours</li>
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-600" /> Clean driving record</li>
          </ul>

          <div className="mt-8 grid grid-cols-4 gap-4 border-t border-forest-900/10 pt-6 text-center">
            <div><p className="font-display text-xl font-semibold text-forest-900">5+</p><p className="text-xs text-ink-600">Years Experience</p></div>
            <div><p className="font-display text-xl font-semibold text-forest-900">1000+</p><p className="text-xs text-ink-600">Happy Guests</p></div>
            <div><p className="font-display text-xl font-semibold text-forest-900">5★</p><p className="text-xs text-ink-600">Google Rating</p></div>
            <div><p className="font-display text-xl font-semibold text-forest-900">100%</p><p className="text-xs text-ink-600">Safe &amp; Reliable</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
