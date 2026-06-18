"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "../../src/actions/auth";
import AuthShell from "../../src/components/ui/AuthShell";
import Button from "../../src/components/ui/Button";
import Field from "../../src/components/ui/Field";
import Input from "../../src/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      title="Login to Your Account"
      description="Access your quote history and manage requests quickly with your login."
      footer={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            New here?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>

          <Link
            href="/get-quote"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Request a Quote instead
          </Link>
        </div>
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

        <Button type="submit" className="w-full px-5 py-3" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthShell>
  );
}