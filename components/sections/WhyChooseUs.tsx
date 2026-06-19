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
import CountUpNumber from "../../src/components/ui/CountUpNumber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footballRef = useRef<HTMLImageElement>(null);

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
  /* =========================
  FOOTBALL ANIMATION
========================= */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (footballRef.current) {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: "power2.inOut" },
      });

      tl.to(footballRef.current, {
        x: 120,
        y: -20,
        rotate: 180,
        duration: 1.2,
      });

      tl.to(footballRef.current, {
        y: -80,
        scale: 1.1,
        rotate: 260,
        duration: 0.6,
        ease: "power2.out",
      });

      tl.to(footballRef.current, {
        y: 0,
        scale: 1,
        rotate: 360,
        duration: 0.8,
        ease: "bounce.out",
      });

      gsap.to(footballRef.current, {
        y: -140,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1,
        },
      });
    }
  }, []);
  return (
    // <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 relative"
    >
      <div className="container">

        <SectionHeader
          label="Why Choose Us"
          title1="Trusted Manufacturing"
          title2="Partner"
          description="We help startups, established brands, and wholesalers manufacture premium-quality apparel with reliable production, quality control, and worldwide logistics support."
        />
        <img

          ref={footballRef}

          src="/images/football.webp"

          className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20"

        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 sm:mt-12 md:mt-14">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-8"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-600 sm:mb-6 sm:h-14 sm:w-14">
                  <Icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 text-blue-600 font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Learn More
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:mt-16 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-4 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl"><CountUpNumber value="500+" /></h3>
            <p className="text-slate-600 mt-2">Projects Completed</p>
          </div>

          <div className="rounded-xl border bg-white p-4 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl"><CountUpNumber value="50+" /></h3>
            <p className="text-slate-600 mt-2">Countries Served</p>
          </div>

          <div className="rounded-xl border bg-white p-4 text-center shadow-sm sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl"><CountUpNumber value="99%" /></h3>
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