
"use client";
import {
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  BuildingOffice2Icon,
  CubeTransparentIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import SectionHeader from "../ui/SectionHeader";
import FootballAnimation from "../ui/FootballAnimation";
import CountUpNumber from "../ui/CountUpNumber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      title: "Low MOQ",
      description:
        "Start your clothing brand with flexible minimum order quantities tailored for startups and growing businesses.",
      icon: CubeTransparentIcon,
    },
    {
      title: "Private Label",
      description:
        "Custom neck labels, hang tags, packaging, and branding solutions to build your own identity.",
      icon: BuildingOffice2Icon,
    },
    {
      title: "Quality Inspection",
      description:
        "Every order passes through strict quality control checkpoints before shipment.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Global Shipping",
      description:
        "Reliable worldwide delivery with complete export documentation and tracking support.",
      icon: GlobeAltIcon,
    },
    {
      title: "Fast Turnaround",
      description:
        "Efficient production processes ensure timely manufacturing and delivery schedules.",
      icon: ClockIcon,
    },
    {
      title: "Dedicated Production Team",
      description:
        "A dedicated account manager and production team guide your project from start to finish.",
      icon: UserGroupIcon,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 relative"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Why Choose Us"
          title1="Trusted Manufacturing"
          title2="Partner"
          description="We help startups, established brands, and wholesalers manufacture premium-quality apparel with reliable production, quality control, and worldwide logistics support."
        />
        <FootballAnimation className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20" />
        
        {/* Grid Container */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 sm:mt-12 md:mt-14">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-8"
              >
                {/* Top Accent - Always Visible Now */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />

                {/* Icon - Always Blue background with white icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 sm:mb-6 sm:h-14 sm:w-14">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {item.description}
                </p>

             <Link
  href="/get-quote"
  className="mt-6 text-blue-600 font-medium flex items-center gap-2 transition-all duration-300"
>
  Learn More
  <span className="transform transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:mt-16 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-4 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              <CountUpNumber value="500+" />
            </h3>
            <p className="text-slate-600 mt-2">Projects Completed</p>
          </div>

          <div className="rounded-xl border bg-white p-4 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              <CountUpNumber value="50+" />
            </h3>
            <p className="text-slate-600 mt-2">Countries Served</p>
          </div>

          <div className="rounded-xl border bg-white p-4 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              <CountUpNumber value="99%" />
            </h3>
            <p className="text-slate-600 mt-2">Quality Satisfaction</p>
          </div>

          <div className="rounded-xl border bg-white p-4 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">24/7</h3>
            <p className="text-slate-600 mt-2">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}