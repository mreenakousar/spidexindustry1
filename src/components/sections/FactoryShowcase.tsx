"use client";

import React, { useRef, useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import CountUpNumber from "../ui/CountUpNumber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FootballAnimation from "../ui/FootballAnimation";
import ArrowCircle from "../ui/ArrowCircle";


interface ActiveVideoType {
  src: string;
  title: string;
}

export default function FactoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const [activeVideo, setActiveVideo] = useState<ActiveVideoType | null>(null);

  const handlePlayVideo = (index: number) => {
    setActiveVideoIndex(index);
  };

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-16 sm:py-20 md:py-24" ref={containerRef}>
      <div className="absolute inset-0 bg-gray-900  bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container-custom relative z-10 px-4 sm:px-6 ">
      
        <SectionHeader
          label="Factory"
          title1="Inside Our"
          title2="Production"
          description="From cutting and sewing to printing, embroidery and packaging, every step is managed under strict quality standards."
        />
        <FootballAnimation className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20" />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8 bg-red">
          {areas.map((area, index) => {
            const isPlaying = activeVideoIndex === index;

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

                  <div
                    className="mt-5 flex items-center justify-between sm:mt-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideo({ src: area.video, title: area.title });
                    }}
                  >
                    <span className="text-primary font-semibold text-sm sm:text-base">
                      {isPlaying ? "Now Playing" : "View Process"}
                    </span>

                    <ArrowCircle
                      className="bg-primary border-primary/30 text-white group-hover:bg-primary/90 group-hover:border-primary"
                    />
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

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h3 className="text-lg font-bold text-white sm:text-xl">{activeVideo.title}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.src}
                autoPlay
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
