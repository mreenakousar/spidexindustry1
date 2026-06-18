
"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Sirf background video ka initial zoom effect
      gsap.fromTo(
        ".video-bg",
        { scale: 1.15 },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] overflow-hidden bg-black sm:min-h-screen"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="video-bg absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero2.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-[92vh] items-center px-4 py-20 sm:px-6 md:px-8 sm:py-24 lg:py-0">
        <div className="flex w-full max-w-5xl flex-col justify-center">
          <h1 className="flex flex-col gap-2 text-3xl font-bold leading-tight text-white sm:gap-3 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span>Premium Custom</span>

            <span className="text-blue-400">
              Clothing Manufacturing
            </span>

            <span>For Global Brands</span>
          </h1>

          <div className="mt-8 sm:mt-12">
            <p className="max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl">
              From concept to production. We help fashion brands,
              startups, sportswear companies and private labels
              manufacture high-quality garments with low MOQ,
              competitive pricing and worldwide shipping.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/get-quote" className="w-full rounded-lg bg-primary px-6 py-3 text-center text-white transition hover:bg-primary/90 sm:w-auto">
                <Button>
                  Get Free Quote
                </Button>
              </Link>

              <Link
                href="/portfolio"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}