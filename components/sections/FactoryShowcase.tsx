
"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import CountUpNumber from "../ui/CountUpNumber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FactoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footballRef = useRef<HTMLImageElement>(null);
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

  const [activeVideos, setActiveVideos] = useState<{ [key: number]: boolean }>({});

  const handlePlayVideo = (index: number) => {
    setActiveVideos((prev) => ({ ...prev, [index]: true }));
  };

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
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <SectionHeader
          label="Factory"
          title1="Inside Our"
          title2="Production"
          description="From cutting and sewing to printing, embroidery, and packaging, every step is managed under strict quality standards."
        />
        <img

          ref={footballRef}

          src="/images/football.webp"

          className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20"

        />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
          {areas.map((area, index) => {
            const isPlaying = activeVideos[index];

            return (
              <div
                key={index}
                onClick={() => !isPlaying && handlePlayVideo(index)}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >

                <div className="relative h-[200px] overflow-hidden sm:h-[260px] md:h-[300px] lg:h-[320px] bg-zinc-950">

                  {!isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center z-20">

                      <video
                        src={area.video}
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary text-white shadow-2xl z-30">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 ml-1 transition-transform group-hover:translate-x-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>

                    </div>
                  ) : (
                    <video
                      autoPlay
                      controls
                      loop
                      playsInline
                      className="w-full h-full object-cover z-10 relative"
                    >
                      <source src={area.video} type="video/mp4" />
                    </video>
                  )}

                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 pointer-events-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white sm:h-14 sm:w-14 sm:text-lg border-2 border-slate-950">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>


                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 pointer-events-none">
                    <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl drop-shadow-md">
                      {area.title}
                    </h3>
                  </div>
                </div>


                <div className="p-5 sm:p-6 md:p-8">
                  <p className="text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
                    {area.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between sm:mt-6">
                    <span className="text-primary font-semibold text-sm sm:text-base">
                      {isPlaying ? "Now Playing" : "View Process"}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 transition-all duration-300 group-hover:bg-primary group-hover:text-white sm:h-10 sm:w-10 text-white">
                      →
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>


        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-20 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="15+" /></h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Years Experience</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="100K+" /></h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Monthly Capacity</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="50+" /></h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Team Members</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center sm:p-6">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl"><CountUpNumber value="100%" /></h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Quality Checked</p>
          </div>
        </div>
      </div>
    </section>
  );
}