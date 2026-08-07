import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94707733647"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-sand-50 shadow-lg shadow-forest-900/30 transition hover:scale-105 hover:bg-emerald-400"
    >
      <MessageCircle size={26} />
    </a>
  );
}
