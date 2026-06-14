
"use client";

import SectionHeader from "../ui/SectionHeader";
import CountUpNumber from "../../src/components/ui/CountUpNumber";

export default function FactoryShowcase() {
  const areas = [
    {
      title: "Production Lines",
      video: "/machine1.mp4",
      description:
        "Advanced production lines designed for efficiency, consistency, and high-volume manufacturing.",
    },
    {
      title: "Sewing Units",
      video: "/sew2.mp4",
      description:
        "Skilled operators and modern machinery ensure precise stitching and durable garments.",
    },
      {
      title: "Cutting Area",
      video: "/cutting.mp4",
      description:
        "Precision cutting equipment ensures accurate fabric pieces for seamless assembly.",
    },
    {
      title: "Printing Area",
      video: "/printing1.mp4",
      description:
        "DTF, DTG, Screen Printing, and Sublimation facilities delivering vibrant results.",
    },
    {
      title: "Embroidery Department",
      video: "/embroidery1.mp4",
      description:
        "Premium embroidery machines producing clean, detailed, and long-lasting designs.",
    },
    {
      title: "Packing Department",
      video: "/packing.mp4",
      description:
        "Quality inspection, folding, packaging, and shipment preparation under one roof.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
      <SectionHeader
  label="Factory"
  title1="Inside Our"
  title2="Production"
  description="From cutting and sewing to printing, embroidery, and packaging, every step is managed under strict quality standards."
/>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
          {areas.map((area, index) => (
            <div
              key={index}
              className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Video */}
              <div className="relative h-[200px] overflow-hidden sm:h-[260px] md:h-[300px] lg:h-[320px]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src={area.video} type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Number */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white sm:h-14 sm:w-14 sm:text-lg">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    {area.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8">
                <p className="text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
                  {area.description}
                </p>

                <div className="mt-5 flex items-center justify-between sm:mt-6">
                  <span className="text-primary font-semibold">
                    View Process
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 transition-all duration-300 group-hover:bg-primary group-hover:text-white sm:h-10 sm:w-10">
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-20 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="15+" /></h3>
            <p className="text-gray-400 mt-2">Years Experience</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="100K+" /></h3>
            <p className="text-gray-400 mt-2">Monthly Capacity</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="50+" /></h3>
            <p className="text-gray-400 mt-2">Team Members</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="100%" /></h3>
            <p className="text-gray-400 mt-2">Quality Checked</p>
          </div>
        </div>
      </div>
    </section>
  );
}