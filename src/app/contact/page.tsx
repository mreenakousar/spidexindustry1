
import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHero from "@/components/ui/PageHero";

export const metadata = {
  title: "Contact - Spidex Industry",
};

export default function Contact() {
  return (
    <section className="bg-white">
      <PageHero
        title="Let's Discuss Your Next Project"
        description="Contact Spidex Industry for custom sportswear manufacturing, bulk production orders, pricing details and export inquiries. Our team typically responds within 24 hours."
        videoSrc="/hero.mp4"
      />

      <div className="container py-16">
        <SectionHeading
          title="Contact Us"
          description="Get in touch for quotations, production information, private label services or factory visit inquiries. We are here to help bring your apparel ideas to life."
          center={true}
        />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10 items-start">
          {/* LEFT - INFO CARD */}
          <div className="rounded-xl border border-sky-100 bg-sky-50 p-5 sm:p-6 h-fit">
            <h3 className="text-lg font-semibold text-slate-900">
              Company Information
            </h3>

            <div className="mt-5 space-y-4 text-sm text-slate-700">
              {/* WhatsApp */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">WhatsApp</span>
                <a
                  href="https://wa.me/923252252130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green-600 hover:underline"
                >
                  +92 325 2252130
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">Email</span>
                <a
                  href="mailto:info@spidexindustry.com"
                  className="font-semibold text-sky-600 hover:underline"
                >
                  info@spidexindustry.com
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">Address</span>
                <span className="max-w-[280px] font-medium text-slate-900 sm:text-right">
                  Sialkot, Punjab, Pakistan
                </span>
              </div>

              {/* Business */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-slate-500">Business</span>
                <span className="sm:text-right">
                  Sportswear Manufacturer & Exporter
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="https://wa.me/923252252130"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-green-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-600"
              >
                WhatsApp Chat
              </a>

              <a
                href="mailto:info@spidexindustry.com"
                className="flex-1 rounded-lg bg-sky-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Email Us
              </a>
            </div>
          </div>

          {/* RIGHT - MAP CARD */}
          <div className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm h-fit">
            <div className="bg-slate-900  px-5 py-4 sm:px-6">
              <h3 className="font-semibold text-white">
                Our Factory Location
              </h3>
              <p className="text-sm text-sky-100">
                Sialkot, Punjab, Pakistan
              </p>
            </div>

            <iframe
              className="h-[300px] w-full border-0 sm:h-[340px] md:h-[360px]"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108252.33878479761!2d74.45347209999999!3d32.4972232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eebf05050a257%3A0x28afca0236dfcb20!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
              title="Spidex Industry Factory Location"
              allowFullScreen
            />

            <div className="bg-slate-50 p-4 text-xs text-slate-500">
              A fully equipped export-oriented sportswear manufacturing facility
              based in Sialkot, Pakistan, serving clients worldwide.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}