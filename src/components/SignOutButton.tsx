"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-1.5 rounded-full border border-forest-900/15 px-4 py-2 text-sm font-medium text-forest-900 hover:bg-sand-100"
    >
      <LogOut size={14} /> Sign Out
    </button>
  );
}
