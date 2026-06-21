
// // "use client";

// // import { useLayoutEffect, useRef } from "react";
// // import Link from "next/link";
// // import Button from "../ui/Button";
// // import gsap from "gsap";

// // export default function Hero() {
// //   const heroRef = useRef<HTMLDivElement>(null);
// //   const videoRef = useRef<HTMLVideoElement>(null);

// //   useLayoutEffect(() => {
// //     const ctx = gsap.context(() => {
// //       gsap.fromTo(
// //         ".video-bg",
// //         { scale: 1.15 },
// //         {
// //           scale: 1,
// //           duration: 2,
// //           ease: "power3.out",
// //         }
// //       );
// //     }, heroRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <section
// //       ref={heroRef}
// //       className="relative min-h-[92vh] overflow-hidden bg-black sm:min-h-screen"
// //     >
// //       {/* Background Video */}
// //       <video
// //         ref={videoRef}
// //         autoPlay
// //         muted
// //         loop
// //         playsInline
// //         className="video-bg absolute inset-0 w-full h-full object-cover"
// //       >
// //         <source src="/hero2.mp4" type="video/mp4" />
// //       </video>

// //       {/* Dark Overlay */}
// //       <div className="absolute inset-0 bg-black/70" />

// //       {/* Glow Effect */}
// //       <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-transparent" />

// //       {/* Content */}
// //       <div className="relative z-10 container mx-auto flex min-h-[92vh] items-center px-4 py-20 sm:px-6 md:px-8 sm:py-24 lg:py-0">
// //         <div className="flex w-full max-w-5xl flex-col justify-center">
// //           <h1 className="flex flex-col gap-2 text-3xl font-bold leading-tight text-white sm:gap-3 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
// //             <span>Premium Custom</span>

// //             <span className="text-blue-400">
// //               Clothing Manufacturing
// //             </span>

// //             <span>For Global Brands</span>
// //           </h1>

// //           <div className="mt-8 sm:mt-12">
// //             <p className="max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl">
// //               From concept to production. We help fashion brands,
// //               startups, sportswear companies and private labels
// //               manufacture high-quality garments with low MOQ,
// //               competitive pricing and worldwide shipping.
// //             </p>

// //             <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
// //               <Link href="/get-quote" className="w-full rounded-lg bg-primary px-6 py-3 text-center text-white transition hover:bg-primary/90 sm:w-auto">
// //                 <Button>
// //                   Get Free Quote
// //                 </Button>
// //               </Link>

// //               <Link
// //                 href="/portfolio"
// //                 className="w-full rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto"
// //               >
// //                 View Portfolio
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Scroll Indicator */}
// //       <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10">
// //         <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
// //           <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useLayoutEffect, useRef } from "react";
// import Link from "next/link";
// import Button from "../ui/Button";
// import gsap from "gsap";
// import { Back } from "gsap";

// export default function Hero() {
//   const heroRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline();

//       // 🎬 Background zoom
//       tl.fromTo(
//         ".video-bg",
//         { scale: 1.25 },
//         { scale: 1, duration: 2, ease: "power3.out" }
//       );

//       // 🧠 Heading
//       tl.from(
//         ".hero-text span",
//         {
//           y: 100,
//           opacity: 0,
//           duration: 1,
//           stagger: 0.2,
//           ease: "power3.out",
//         },
//         "-=1"
//       );

//       // 📝 Paragraph
//       tl.from(
//         ".hero-para",
//         {
//           y: 30,
//           opacity: 0,
//           duration: 0.8,
//         },
//         "-=0.6"
//       );

//       // 🔘 Buttons
//       tl.from(
//         ".hero-btn",
//         {
//           scale: 0.7,
//           opacity: 0,
//           duration: 0.8,
//           ease: Back.easeOut.config(1.7),
//           stagger: 0.15,
//         },
//         "-=0.5"
//       );

//       // ⚽ FOOTBALL KICK (SMALL → BIG → CROSS SCREEN)
//       tl.fromTo(
//         ".football",
//         {
//           x: "-40vw",
//           y: 80,
//           scale: 0.3,   // 🔥 start small
//           rotate: -360,
//           opacity: 0,
//         },
//         {
//           x: "120vw",   // 🔥 full screen cross
//           y: -60,
//           scale: 1.4,   // 🔥 becomes big in middle
//           rotate: 720,
//           opacity: 1,
//           duration: 2.5,
//           ease: "power2.out",
//         },
//         "-=1"
//       );

//       // ⚽ FADE OUT AFTER EXIT
//       tl.to(".football", {
//         opacity: 0,
//         scale: 0.8,
//         duration: 0.6,
//         ease: "power2.inOut",
//       });

//       // 🔥 CTA pulse
//       gsap.to(".hero-btn-primary", {
//         scale: 1.05,
//         repeat: -1,
//         yoyo: true,
//         duration: 1.2,
//         ease: "power1.inOut",
//       });

//     }, heroRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={heroRef}
//       className="relative min-h-[92vh] overflow-hidden bg-black sm:min-h-screen"
//     >
//       {/* 🎬 VIDEO */}
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="video-bg absolute inset-0 h-full w-full object-cover"
//       >
//         <source src="/hero2.mp4" type="video/mp4" />
//       </video>

//       {/* 🌑 OVERLAY */}
//       <div className="absolute inset-0 bg-black/70" />

//       {/* 🔵 GLOW */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-transparent" />

//       {/* ⚽ FOOTBALL */}
//       <img
//         src="/images/football.webp"
//         alt="football"
//         className="football pointer-events-none absolute bottom-10 left-10 z-20 w-20 opacity-0"
//       />

//       {/* 📦 CONTENT */}
//       <div className="relative z-10 container mx-auto flex min-h-[92vh] items-center px-4 py-20 sm:px-6 md:px-8">
//         <div className="flex w-full max-w-5xl flex-col justify-center">

//           <h1 className="hero-text flex flex-col gap-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
//             <span>Premium Custom</span>
//             <span className="text-blue-400">Clothing Manufacturing</span>
//             <span>For Global Brands</span>
//           </h1>

//           <p className="hero-para mt-6 max-w-2xl text-gray-300 sm:text-lg md:text-xl">
//             From concept to production. We help global brands manufacture premium sportswear
//             with low MOQ and worldwide shipping.
//           </p>

//           <div className="hero-btn mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">

//             <Link
//               href="/get-quote"
//               className="hero-btn-primary rounded-lg bg-primary px-6 py-3 text-center text-white sm:w-auto"
//             >
//               <Button>Get Free Quote</Button>
//             </Link>

//             <Link
//               href="/portfolio"
//               className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center text-white"
//             >
//               View Portfolio
//             </Link>

//           </div>

//         </div>
//       </div>

//       {/* ⬇ SCROLL */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
//         <div className="h-10 w-6 rounded-full border border-white/30">
//           <div className="mt-2 h-3 w-1 animate-bounce bg-white mx-auto rounded-full" />
//         </div>
//       </div>

//     </section>
//   );
// }
"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import gsap from "gsap";
import { Back } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 🌑 Screen base shake reset
      gsap.set(heroRef.current, { transformOrigin: "center" });

      // 🎬 1. Background zoom cinematic
      tl.fromTo(
        ".video-bg",
        { scale: 1.3 },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );

      // ⚡ 2. Stadium light sweep (overlay glow feel)
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

      // 🧠 3. Heading cinematic entry
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

      // 📝 Paragraph
      tl.from(
        ".hero-para",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

      //  Buttons
      tl.from(
        ".hero-btn",
        {
          scale: 0.6,
          opacity: 0,
          duration: 0.8,
          ease: Back.easeOut.config(1.7),
          stagger: 0.15,
        },
        "-=0.5"
      );

      //  FOOTBALL SUPER KICK
      tl.fromTo(
        ".football",
        {
          x: "-45vw",
          y: 120,
          scale: 0.25,
          rotate: -540,
          opacity: 0,
        },
        {
          x: "120vw",
          y: -100,
          scale: 1.6,
          rotate: 1080,
          opacity: 1,
          duration: 2.2,
          ease: "power2.out",
          onStart: () => {
            //  SCREEN SHAKE ON KICK
            gsap.to(heroRef.current, {
              x: 10,
              duration: 0.05,
              repeat: 10,
              yoyo: true,
            });
          },
        },
        "-=1"
      );

      // football exit fade
      tl.to(".football", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
      });

      //  CTA pulse premium
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
      {/* 🎬 BACKGROUND VIDEO */}
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

      <img
        src="/images/football.webp"
        alt="football"
        className="football pointer-events-none absolute bottom-10 left-10 z-20 w-20 opacity-0"
      />

      <div className="relative z-10 container mx-auto flex min-h-[92vh] items-center px-4 py-20 sm:px-6 md:px-8">

        <div className="flex w-full max-w-5xl flex-col justify-center">

          <h1 className="hero-text flex flex-col gap-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span>Premium Custom</span>
            <span className="text-blue-400">Clothing Manufacturing</span>
            <span>For Global Brands</span>
          </h1>

          <p className="hero-para mt-6 max-w-2xl text-gray-300 sm:text-lg md:text-xl">
            From concept to production. SPEEDX Industry delivers premium sportswear manufacturing
            for global brands with precision, speed, and quality.
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