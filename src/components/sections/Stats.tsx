
"use client";

import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";
import FootballAnimation from "../ui/FootballAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export default function TeamShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative mt-20 bg-slate-50 py-10">
      <SectionHeader
        label="Our Leadership"
        title1="The Visionaries Behind"
        title2="Spidex Industry"
        description="Driven by strategic vision and operational excellence, our leadership team unites design innovation with premium manufacturing to deliver top-tier custom apparel globally."
      />
      <FootballAnimation className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20" />

      <div className="mx-auto mt-10 max-w-6xl px-4 sm:mt-12 sm:px-0">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-2 md:gap-6">

            <div className="relative flex flex-col items-center justify-center rounded-xl p-6 bg-white overflow-hidden border border-slate-100 shadow-sm transition-all duration-300">

              <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-600 via-transparent to-blue-600 animate-[spin_5s_linear_infinite] -z-10" />
              <div className="absolute inset-[2px] bg-white rounded-[10px] -z-10" />

              <Image
                src="/team/ceo.jpeg"
                alt="Founder & CEO"
                width={200}
                height={200}
                className="rounded-full object-cover mb-4 relative z-10 border-4 border-slate-100 shadow-inner"
              />
              <h4 className="text-xl font-bold text-slate-900 relative z-10">Founder &amp; CEO</h4>
              <p className="mt-2 text-sm text-slate-600 text-center relative z-10">
                Leading the vision and strategy, driving innovation and growth across the company.
              </p>
            </div>

            <div className="relative flex flex-col items-center justify-center rounded-xl p-6 bg-white overflow-hidden border border-slate-100 shadow-sm transition-all duration-300">

              <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-600 via-transparent to-blue-600 animate-[spin_5s_linear_infinite] -z-10" />
              <div className="absolute inset-[2px] bg-white rounded-[10px] -z-10" />

              <Image
                src="/team/director.jpeg"
                alt="Managing Director"
                width={200}
                height={200}
                className="rounded-full object-cover mb-4 relative z-10 border-4 border-slate-100 shadow-inner"
              />
              <h4 className="text-xl font-bold text-slate-900 relative z-10">Managing Director</h4>
              <p className="mt-2 text-sm text-slate-600 text-center relative z-10">
                Overseeing operations and ensuring excellence in delivery and client satisfaction.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}