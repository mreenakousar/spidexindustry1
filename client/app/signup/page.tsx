"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupAction } from "../../src/actions/auth";
import AuthShell from "../../src/components/ui/AuthShell";
import Button from "../../src/components/ui/Button";
import Field from "../../src/components/ui/Field";
import Input from "../../src/components/ui/Input";

export default function SignupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      const result = await signupAction({ name, email, password });

      if (!result.ok) {
        setError(result.error || "Unable to create account.");
        return;
      }

      router.push("/client-area");
    } catch (err: any) {
      setError(err?.message || "Unable to create account at this time.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Create Account"
      title="Sign Up for Production Support"
      description="Join our platform to send quote requests and manage your manufacturing orders."
      footer={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Login here
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
        <Field label="Full Name">
          <Input
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            required
          />
        </Field>

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
            placeholder="Create a password"
            autoComplete="new-password"
            required
          />
        </Field>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <Button
          type="submit"
          className="w-full px-5 py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
    </AuthShell>
  );
}