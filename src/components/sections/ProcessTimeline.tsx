"use client";

import SectionHeader from "../ui/SectionHeader";
import FootballAnimation from "../ui/FootballAnimation";
import Image from "next/image";

interface ProcessStep {
  title: string;
  description: string;
  imageUrl: string;
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const steps: ProcessStep[] = [
    {
      title: "Consultation",
      description: "Discuss fabric weights, tech packs, custom trims, and target project deadlines.",
      imageUrl: "/images/cloth.jpg",
    },
    {
      title: "Design Review",
      description: "Review vector artwork, 3D mockups, print placements, and embroidery mapping.",
      imageUrl: "/images/tech2.jpg",
    },
    {
      title: "Sampling",
      description: "Physical prototype creation including pattern cutting to lock final fit approvals.",
      imageUrl: "/images/embro.jpg",
    },
    {
      title: "Production",
      description: "Bulk manufacturing using high-GSM fabrics, heavy-duty stitching, and custom treatments.",
      imageUrl: "/images/print.jpg",
    },
    {
      title: "Quality Inspection",
      description: "Strict multi-point checks checking measurements, loose threads, and printing durability.",
      imageUrl: "/images/warehouse.jpg",
    },
    {
      title: "Packaging",
      description: "Custom steam-ironing, brand tags attachments, and secure poly-bag sealing.",
      imageUrl: "/images/packing.jpg",
    },
    {
      title: "Worldwide Delivery",
      description: "Dispatched globally with tracking integrations via premium ocean or air cargo networks.",
      imageUrl: "/images/warehouse.jpg",
    },
  ];

  const blurPlaceholderUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+";

  return (
    <section className="mt-8 py-10 sm:mt-16 sm:py-12">
      <SectionHeader
        label="Process"
        title1="Manufacturing"
        title2="Journey"
        description="From concept to delivery, every step is carefully managed to ensure premium quality and customer satisfaction."
      />
      <FootballAnimation className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20" />

      <div className="relative max-w-7xl mx-auto mt-10 px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="absolute left-6 lg:left-1/2 top-0 h-full w-[2px] bg-primary/20 -translate-x-1/2 hidden sm:block"></div>

        <div className="space-y-16 lg:space-y-12">
          {steps.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.title}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center justify-between w-full group ${isEven ? "lg:flex-row-reverse" : ""
                  }`}
              >
                <div className="hidden lg:block w-[46%]" />

                <div className="absolute left-0 sm:left-0 lg:left-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-white font-bold shadow-xl -translate-x-0 lg:-translate-x-1/2 transition-transform duration-300 group-hover:scale-110 border-2 border-slate-900 text-sm sm:text-base">
                  {idx + 1}
                </div>

                <div className="w-full lg:w-[46%] pl-14 sm:pl-16 lg:pl-0">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-white/10 lg:hover:scale-[1.01] shadow-2xl">
                    <div className="flex flex-col sm:flex-row h-full">

                      <div className="relative w-full sm:w-2/5 h-44 sm:h-auto min-h-[160px] overflow-hidden transition-all duration-500">
                        <Image
                          src={item.imageUrl}
                          alt={`${item.title} phase description visual`}
                          fill
                          sizes="(max-w-7xl) 30vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
                          placeholder="blur"
                          blurDataURL={blurPlaceholderUrl}
                        />
                      </div>

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary tracking-wider uppercase mb-1">
                          Step 0{idx + 1}
                        </span>

                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}