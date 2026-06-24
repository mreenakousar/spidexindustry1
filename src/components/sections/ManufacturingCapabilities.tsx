
"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import FootballAnimation from '../ui/FootballAnimation';
import DetailModal, { type CapabilityDetail } from '../ui/DetailModal';
import ArrowCircle from '../ui/ArrowCircle';

const premiumCapabilities: CapabilityDetail[] = [
  {
    id: "streetwear",
    title: "Premium Streetwear",
    description: "High-GSM oversized hoodies, drop-shoulder tees, and joggers featuring custom mineral washes, vintage textures, and high-fidelity 3D puff printing.",
    image: "/img/2.jpeg",
    slug: "/capabilities/streetwear",
    moq: "50 pcs",
    fabric: "Cotton / Fleece",
    gsm: "320–500 GSM",
    turnaround: "15–20 days",
    highlights: [
      "Oversized & drop-shoulder cuts",
      "Custom mineral wash & vintage textures",
      "3D puff print & embroidery options",
      "Private label & branded packaging",
    ],
  },
  {
    id: "sportswear",
    title: "Elite Sportswear",
    description: "Engineered performance apparel with moisture-wicking technology, 4-way stretch fabrics, and ergonomic flatlock stitching for global brands.",
    image: "/img/8.jpeg",
    slug: "/capabilities/sportswear",
    moq: "100 pcs",
    fabric: "Polyester / Spandex",
    gsm: "180–260 GSM",
    turnaround: "18–25 days",
    highlights: [
      "Moisture-wicking & quick-dry technology",
      "4-way stretch for maximum mobility",
      "Flatlock stitching for zero chafing",
      "Sublimation & heat-transfer branding",
    ],
  },
  {
    id: "gymwear",
    title: "Gymwear",
    description: "Compression gear, seamless fits, and high-durability training wear designed to withstand intense athletic performance while maintaining shape.",
    image: "/img/3.jpeg",
    slug: "/capabilities/gymwear",
    moq: "100 pcs",
    fabric: "Nylon / Spandex",
    gsm: "200–300 GSM",
    turnaround: "15–22 days",
    highlights: [
      "Seamless & compression-fit construction",
      "Anti-odor & sweat-wicking properties",
      "Shape retention after repeated washes",
      "Custom colorways & reflective detailing",
    ],
  },
  {
    id: "jackets",
    title: "Jackets",
    description: "Custom bomber jackets, windbreakers, and heavy-duty outerwear featuring weather-resistant materials, custom zippers, and internal premium linings.",
    image: "/img/jacket2.jpeg",
    slug: "/capabilities/jackets",
    moq: "50 pcs",
    fabric: "Nylon / Polyester",
    gsm: "280–420 GSM",
    turnaround: "20–28 days",
    highlights: [
      "Weather-resistant shell fabrics",
      "YKK or custom branded zippers",
      "Quilted & fleece inner linings",
      "Embroidery, patches & woven labels",
    ],
  },
  {
    id: "gloves",
    title: "Gloves",
    description: "Precision-cut tactical, gym, and lifestyle gloves crafted with premium leather, reinforced palms, and custom embossed branding.",
    image: "/img/glove.jpeg",
    slug: "/capabilities/gloves",
    moq: "100 pcs",
    fabric: "Leather / Synthetic",
    gsm: "—",
    turnaround: "15–20 days",
    highlights: [
      "Premium full-grain & synthetic leather",
      "Reinforced palm & finger protection",
      "Custom embossed or debossed branding",
      "Available: tactical, gym & lifestyle styles",
    ],
  },
  {
    id: "private-label",
    title: "Private Label Goods",
    description: "Full-service custom manufacturing from pattern drafting and fabric sourcing to bespoke custom labels, hangtags, and sustainable packaging.",
    image: "/img/6.jpeg",
    slug: "/capabilities/private-label",
    moq: "50 pcs",
    fabric: "All fabrics",
    gsm: "Custom",
    turnaround: "20–35 days",
    highlights: [
      "End-to-end pattern drafting & sampling",
      "Custom woven labels, hangtags & packaging",
      "Eco-friendly & sustainable material options",
      "Dedicated account manager per project",
    ],
  },
    {
    id: "accessories-packaging",
    title: "Accessories & Packaging",
    description: "Full-service custom manufacturing from pattern drafting and fabric sourcing to bespoke custom labels, hangtags, and sustainable packaging.",
    image: "/images/Accessories.jpg",
    slug: "/capabilities/accessories-packaging",
    moq: "50 pcs",
    fabric: "All fabrics",
    gsm: "Custom",
    turnaround: "20–35 days",
    highlights: [
      "End-to-end pattern drafting & sampling",
      "Custom woven labels, hangtags & packaging",
      "Eco-friendly & sustainable material options",
      "Dedicated account manager per project",
    ],
  },
   {
    id: "caps-hats",
    title: "Caps & Hats",
    description: "Full-service custom manufacturing from pattern drafting and fabric sourcing to bespoke custom labels, hangtags, and sustainable packaging.",
    image: "/img/cap.jpeg",
    slug: "/capabilities/caps-hats",
    moq: "50 pcs",
    fabric: "All fabrics",
    gsm: "Custom",
    turnaround: "20–35 days",
    highlights: [
      "End-to-end pattern drafting & sampling",
      "Custom woven labels, hangtags & packaging",
      "Eco-friendly & sustainable material options",
      "Dedicated account manager per project",
    ],
  },
   {
    id: "jeans-denim",
    title: "Jeans & Denim",
    description: "Full-service custom manufacturing from pattern drafting and fabric sourcing to bespoke custom labels, hangtags, and sustainable packaging.",
    image: "/images/cap.jpg",
    slug: "/capabilities/jeans-denim",
    moq: "50 pcs",
    fabric: "All fabrics",
    gsm: "Custom",
    turnaround: "20–35 days",
    highlights: [
      "End-to-end pattern drafting & sampling",
      "Custom woven labels, hangtags & packaging",
      "Eco-friendly & sustainable material options",
      "Dedicated account manager per project",
    ],
  },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ManufacturingCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blurPlaceholderUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PC9zdmc+";
  const [selectedCard, setSelectedCard] = useState<CapabilityDetail | null>(null);

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
                <button
                  key={c.id}
                  onClick={() => setSelectedCard(c)}
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
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <DetailModal
        open={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        data={selectedCard}
      />
    </>
  );
}