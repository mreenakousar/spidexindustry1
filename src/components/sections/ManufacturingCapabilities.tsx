
"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader';
import FootballAnimation from '../ui/FootballAnimation';
import ArrowCircle from '../ui/ArrowCircle';

interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  image: string;
}
const premiumCapabilities: CapabilityCard[] = [
  {
    id: "streetwear",
    title: "Premium Streetwear",
    description: "High-GSM oversized hoodies, drop-shoulder tees and joggers featuring custom mineral washes, vintage textures and high-fidelity 3D puff printing.",
    image: "/img/2.jpeg",
  },
  {
    id: "sportswear",
    title: "Elite Sportswear",
    description: "Engineered performance apparel with moisture-wicking technology, 4-way stretch fabrics and ergonomic flatlock stitching for global brands.",
    image: "/sportswear/sporthero.jpeg",
  },
  {
    id: "gymwear",
    title: "Gymwear",
    description: "Compression gear, seamless fits and high-durability training wear designed to withstand intense athletic performance while maintaining shape.",
    image: "/gymwear/gym5.jpeg",
  },
  {
    id: "jackets",
    title: "Jackets",
    description: "Custom bomber jackets, windbreakers and heavy-duty outerwear featuring weather-resistant materials, custom zippers and internal premium linings.",
    image: "/jackets/jacket.jpeg",
  },
  {
    id: "gloves",
    title: "Gloves",
    description: "Precision-cut tactical, gym and lifestyle gloves crafted with premium leather, reinforced palms and custom embossed branding.",
    image: "/img/glove.jpeg",
  },
  {
    id: "private-label",
    title: "Private Label Goods",
    description: "Full-service custom manufacturing from pattern drafting and fabric sourcing to bespoke custom labels, hangtags and sustainable packaging.",
    image: "/img/6.jpeg",
  },
  {
    id: "accessories",
    title: "Accessories & Packaging",
    description: "Premium garment accessories including luxury stone buttons, custom hardware and trims, paired with high-quality custom packaging bags and boxes.",
    image: "/images/Accessories.jpg",
  },
  {
    id: "caps",
    title: "Caps & Hats",
    description: "Premium headwear including snapbacks, dad hats and beanies with custom 3D embroidery, structured panels and adjustable premium closures.",
    image: "/img/cap.jpeg",
  },
  {
    id: "denim",
    title: "Jeans & Denim",
    description: "Custom denim jackets and jeans featuring heavy-duty construction, bespoke hardware, vintage distressed finishes and specialized washes.",
    image: "/jeans/jean1.jpeg",
  },
];


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ManufacturingCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blurPlaceholderUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PC9zdmc+";

  useEffect(() => {
    const ctx = gsap.context(() => {

      const cards = gsap.utils.toArray<HTMLElement>('.streetwear-card');
      cards.forEach((card) => {
        const image = card.querySelector('.product-image-zoom');
        const arrow = card.querySelector('.arrow-rotate');

        card.addEventListener('mouseenter', () => {
          if (image) gsap.to(image, { scale: 1.06, duration: 0.6, ease: "power2.out" });
          if (arrow) gsap.to(arrow, { rotation: 45, x: 3, y: -3, scale: 1.1, duration: 0.4, ease: "back.out(2)" });
        });

        card.addEventListener('mouseleave', () => {
          if (image) gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
          if (arrow) gsap.to(arrow, { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative overflow-hidden py-16 font-sans text-white sm:py-20 md:py-24">

        <FootballAnimation className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20" />

        <div className="absolute inset-0 opacity-60 pointer-events-none" />


        <div className="container mx-auto max-w-7xl px-4 relative z-10 sm:px-6">

          <SectionHeader
            label="Built For Global Brands"
            title1="Manufacturing"
            title2="Without Limits"
            description="Advanced production facilities, skilled craftsmanship and precision-driven quality control systems engineered to transform ambitious apparel concepts into premium products trusted by leading streetwear, sportswear and private-label brands worldwide."
          />

          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {premiumCapabilities.map((c) => {
              return (
                <Link
                  key={c.id}
                  href="/product-categories"
                  className="streetwear-card group flex h-full flex-col overflow-hidden rounded-none border border-zinc-900 bg-zinc-900/40 transition-all duration-500 hover:border-zinc-800 backdrop-blur-sm text-left cursor-pointer"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-zinc-900 bg-zinc-950">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-w-7xl) 33vw, 400px"
                      className="product-image-zoom object-cover object-center transition-all"
                      placeholder="blur"
                      blurDataURL={blurPlaceholderUrl}
                    />
                    <div className="absolute inset-0 bg-white/0 transition-all duration-700 group-hover:bg-white/5 pointer-events-none z-10" />
                  </div>

                  <div className="relative flex flex-grow flex-col bg-black p-4 sm:p-5">

                    <div className="mb-3 flex items-start justify-between gap-2 sm:gap-4">
                      <h3 className="text-base font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400 sm:text-lg">
                        {c.title}
                      </h3>

                      <ArrowCircle />
                    </div>

                    <p className="flex-grow text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm">
                      {c.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}