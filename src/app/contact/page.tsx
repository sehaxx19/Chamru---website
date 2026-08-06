"use client";

import { useState, FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone") || undefined,
          message: form.get("message") || undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Have a question or ready to start planning? Send a message and I'll reply within 48 hours."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <ul className="space-y-4 text-sm text-ink-900">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <MessageCircle size={16} />
                </span>
                WhatsApp: +94 77 123 4567
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Mail size={16} />
                </span>
                travelwithchamru@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <MapPin size={16} />
                </span>
                Kandy, Sri Lanka
              </li>
            </ul>
            <div className="mt-6 h-56 rounded-xl bg-sand-100" aria-hidden="true" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-forest-900/10 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-ink-600">Your name</span>
                <input name="name" required className="input-field" />
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-ink-600">WhatsApp number</span>
                <input name="phone" className="input-field" />
              </label>
            </div>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-ink-600">Email</span>
              <input name="email" type="email" required className="input-field" />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-ink-600">Your message</span>
              <textarea name="message" rows={4} className="input-field" />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Message"} <Send size={14} />
            </button>
            {status === "sent" && (
              <p className="text-sm text-emerald-700">
                Thanks — your message is in! I&rsquo;ll get back to you within 48 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong sending that. Try WhatsApp instead, or refresh and retry.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
