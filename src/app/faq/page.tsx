import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { faqs } from "@/data/sample-data";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about touring Sri Lanka with Chamru — deposits, customization, train tickets, safari jeeps, airport pickup, and payment.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Answers to common questions from guests planning a trip."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="divide-y divide-forest-900/10 rounded-xl border border-forest-900/10 bg-white shadow-sm">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 py-4 open:pb-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest-900">
                {item.q}
                <ChevronDown
                  size={16}
                  className="shrink-0 text-ink-600 transition group-open:rotate-180"
                />
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-600">
          Still have a question?{" "}
          <a href="/contact" className="font-medium text-emerald-600 hover:text-emerald-500">
            Get in touch
          </a>
          .
        </p>
      </section>
    </>
  );
}
