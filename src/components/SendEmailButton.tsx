"use client";

import { useState } from "react";
import { Loader2, Mail, X } from "lucide-react";

export default function SendEmailButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function send() {
    if (!subject.trim() || !message.trim()) return;
    setPending(true);
    setStatus("idle");
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setSubject("");
      setMessage("");
      setTimeout(() => setOpen(false), 1200);
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setStatus("idle");
        }}
        className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-forest-950 transition hover:bg-emerald-400"
      >
        <Mail size={12} /> Send Email
      </button>
    );
  }

  return (
    <div className="mt-3 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Send a message to {name}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-ink-600 hover:text-ink-900"
        >
          <X size={14} />
        </button>
      </div>

      <label className="mb-2 block text-xs">
        <span className="mb-1 block font-medium text-ink-600">Subject</span>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" />
      </label>

      <label className="block text-xs">
        <span className="mb-1 block font-medium text-ink-600">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="input-field"
        />
      </label>

      <div className="mt-3 flex items-center justify-end gap-2">
        {status === "error" && (
          <span className="text-xs text-red-600">Failed to send — try again.</span>
        )}
        {status === "sent" && <span className="text-xs text-emerald-700">Sent!</span>}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-forest-900/20 px-3 py-1.5 text-xs font-medium text-forest-900 hover:bg-sand-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={send}
          disabled={pending || !subject.trim() || !message.trim()}
          className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-forest-950 hover:bg-emerald-400 disabled:opacity-60"
        >
          {pending ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />}
          Send Email
        </button>
      </div>
    </div>
  );
}
