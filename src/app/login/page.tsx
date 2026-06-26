"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import AuthShell from "@/components/ui/AuthShell";
import { Button } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setError(null);
    setIsGoogleSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err?.message || "Google login failed.");
      setIsGoogleSubmitting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      const result = await loginAction({ email, password });

      if (!result.ok) {
        setError(result.error || "Invalid credentials. Please try again.");
        return;
      }

      if (result.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/client-area");
      }
    } catch (err: any) {
      setError(err?.message || "Unable to login at this time.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome Back"
      title="Sign In to Spidex Industry"
      description="Access your dashboard, track production status, and manage quotes in one place."
      footer={
        <p className="text-sm text-slate-600 text-center w-full">
          New here?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Password">
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </Field>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full px-5 py-3"
            disabled={isSubmitting || isGoogleSubmitting}
            isLoading={isSubmitting}
          >
            Login
          </Button>

          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-3 text-xs uppercase text-slate-500 font-semibold tracking-wider">
              Or continue with
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full py-3 active:scale-95 transition-all"
            disabled={isSubmitting || isGoogleSubmitting}
            isLoading={isGoogleSubmitting}
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 15.02 1 12 1 7.24 1 3.2 3.73 1.24 7.74l3.86 3C6.01 7.72 8.78 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58v2.98h3.84c2.25-2.07 3.57-5.12 3.57-8.71z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.1 14.76c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.24 7.2C.45 8.8.01 10.59.01 12.5s.44 3.7 1.23 5.3l3.86-3.04z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.84-2.98c-1.07.72-2.44 1.15-4.12 1.15-3.22 0-5.99-2.68-6.96-5.7l-3.87 3.04C3.2 20.27 7.24 23 12 23z"
                />
              </svg>
            }
            onClick={handleGoogleLogin}
          >
            Google
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}