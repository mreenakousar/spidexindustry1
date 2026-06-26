
"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { Back } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set(heroRef.current, { transformOrigin: "center" });


      tl.fromTo(
        ".video-bg",
        { scale: 1.3 },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );


      tl.fromTo(
        ".light-sweep",
        { x: "-100%" },
        {
          x: "100%",
          duration: 2,
          ease: "power2.inOut",
        },
        "-=1.8"
      );

      tl.from(
        ".hero-text span",
        {
          y: 120,
          opacity: 0,
          skewY: 5,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=1"
      );

 
      tl.from(
        ".hero-para",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

      tl.from(
        ".hero-btn",
        {
          scale: 0.6,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
        },
        "-=0.5"
      );



    
      gsap.to(".hero-btn-primary", {
        scale: 1.06,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "power1.inOut",
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] overflow-hidden bg-black sm:min-h-screen"
    >
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-bg absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero2.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/70" />

      <div className="light-sweep absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-60" />



      <div className="relative z-10 container mx-auto flex min-h-[92vh] items-center px-4 py-20 sm:px-6 md:px-8">

        <div className="flex w-full max-w-5xl flex-col justify-center">

          <h1 className="hero-text flex flex-col gap-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span>Premium Custom</span>
            <span className="text-blue-400">Clothing Manufacturing</span>
            <span>For Global Brands</span>
          </h1>

          <p className="hero-para mt-6 max-w-2xl text-gray-300 sm:text-lg md:text-xl">
          From concept to production, Spidex-Industry delivers premium custom apparel manufacturing for global brands with precision, speed and uncompromising quality.
          </p>

          <div className="hero-btn mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">

            <Link
              href="/get-quote"
              className="hero-btn-primary rounded-lg bg-primary px-6 py-3 text-center text-white sm:w-auto"
            >
              <Button>Get Free Quote</Button>
            </Link>

            <Link
              href="/portfolio"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center text-white"
            >
              View Portfolio
            </Link>

          </div>

        </div>
      </div>

      {/*  SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border border-white/30">
          <div className="mt-2 h-3 w-1 animate-bounce bg-white mx-auto rounded-full" />
        </div>
      </div>

    </section>
  );
}