"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function LandingRFQForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString() || "";
    const contact = formData.get("contact")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    try {
      const data = { name, contact, message };

      console.log("RFQ Submitted:", data);

      // API call yahan add kar sakte ho
      // await fetch("/api/rfq", { method: "POST", body: JSON.stringify(data) });

      setSuccess(true);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to send RFQ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeading
          title="Get a Free Quote"
          description="Tell us what you need — we will respond quickly on WhatsApp or email."
        />

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input name="name" type="text" placeholder="Your Name" required />

          <Input
            name="contact"
            type="text"
            placeholder="Email or WhatsApp Number"
            required
          />

          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us what you want..."
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none bg-white"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white"
          >
            {loading ? "Sending..." : "Request Quote"}
          </Button>

          {success && (
            <p className="text-green-600 text-sm text-center">
              Thank you! We will contact you soon.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}