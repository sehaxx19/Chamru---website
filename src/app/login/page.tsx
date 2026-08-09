"use client";

import { useState, FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setStatus("error");
    } else {
      window.location.href = callbackUrl;
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Log in"
        description="Sign in to manage your account."
      />

      <section className="mx-auto max-w-sm px-4 py-14 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-forest-900/10 bg-white p-6 shadow-sm">
          <label className="block text-xs">
            <span className="mb-1 block font-medium text-ink-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block font-medium text-ink-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {status === "loading" ? "Signing in…" : "Log In"} <LogIn size={14} />
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600">
              That email/password combination didn&rsquo;t work — double-check and try again.
            </p>
          )}

          <div className="relative py-2 text-center text-xs text-ink-600">
            <span className="relative bg-white px-2">or</span>
            <div className="absolute inset-x-0 top-1/2 -z-10 border-t border-forest-900/10" />
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-forest-900/15 px-5 py-2.5 text-sm font-semibold text-forest-900 hover:bg-sand-100"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-600">
          Just here for the site itself?{" "}
          <Link href="/" className="font-medium text-emerald-600 hover:text-emerald-500">
            Back to home
          </Link>
        </p>
      </section>
    </>
  );
}
