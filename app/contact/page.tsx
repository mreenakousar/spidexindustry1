// app/contact/page.tsx
import React from "react";
import SectionHeading from "../../components/ui/SectionHeading"; // Reusable TSX component

export const metadata = { 
  title: "Contact - Speedx Industry" 
};

export default function Contact() {
  return (
    <section className="bg-white">
      <div className="container py-16">

        {/* Header - Reusable SectionHeading */}
        <SectionHeading 
          title="Contact Us" 
          description="Reach out for quotations, production details, or factory visits. We usually respond within 24 hours."
        />

        {/* GRID */}
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10 items-start">

          {/* LEFT - INFO CARD (Height adjusted purely to fit content tightly) */}
          <div className="rounded-xl border border-sky-100 bg-sky-50 p-5 sm:p-6 h-fit">
            <h3 className="text-lg font-semibold text-slate-900">
              Company Information
            </h3>

            {/* Content rows with tight, natural spacing */}
            <div className="mt-5 space-y-4 text-sm text-slate-700">
              
              {/* WhatsApp */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">WhatsApp</span>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-semibold hover:underline"
                >
                  +92 300 1234567
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">Email</span>
                <a
                  href="mailto:sales@speedxindustry.com"
                  className="text-sky-600 font-semibold hover:underline"
                >
                  sales@speedxindustry.com
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">Address</span>
                <span className="sm:text-right font-medium text-slate-900 max-w-[280px]">
                  Small Industrial Estate, Sialkot, Punjab, Pakistan
                </span>
              </div>

              {/* Business */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">Business</span>
                <span className="sm:text-right">
                  Premium Sportswear & Manufacturing
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-green-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-600"
              >
                WhatsApp Chat
              </a>

              <a
                href="mailto:sales@speedxindustry.com"
                className="flex-1 rounded-lg bg-sky-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Email Us
              </a>
            </div>
          </div>

          {/* RIGHT - MAP CARD */}
          <div className="rounded-xl border border-sky-100 overflow-hidden bg-white shadow-sm h-fit">
            {/* Map Header */}
            <div className="bg-sky-600 px-5 py-4 sm:px-6">
              <h3 className="text-white font-semibold">
                Our Factory Location
              </h3>
              <p className="text-sky-100 text-sm">
                Sialkot Hub - Punjab, Pakistan
              </p>
            </div>

            {/* Map */}
            <iframe
              className="h-[300px] w-full sm:h-[340px] md:h-[360px] border-0 dynamic-map"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108252.33878479761!2d74.45347209999999!3d32.4972232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eebf05050a257%3A0x28afca0236dfcb20!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
              title="Speedx Industry Sialkot Map"
              allowFullScreen
            ></iframe>

            {/* Footer note */}
            <div className="p-4 bg-slate-50 text-xs text-slate-500">
              Fully equipped export-oriented garment manufacturing unit based in Sialkot.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}