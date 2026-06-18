
"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import DetailModal, { type CapabilityDetail } from '../ui/DetailModal';

const premiumCapabilities: CapabilityDetail[] = [
  {
    id: "streetwear",
    title: "Premium Streetwear",
    description: "High-GSM oversized hoodies, drop-shoulder tees, and joggers featuring custom mineral washes, vintage textures, and high-fidelity 3D puff printing.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
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

      gsap.fromTo(".section-header-anim",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.2 }
      );

      ScrollTrigger.batch(".streetwear-card", {
        interval: 0.1,
        batchMax: 3,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { opacity: 0, y: 60, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              stagger: 0.15,
              overwrite: "auto"
            }
          );
        },
        start: "top 88%",
        once: true
      });

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
        <div className="absolute inset-0 opacity-60 pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-4 relative z-10 sm:px-6">
          <SectionHeader
            label="Built For Global Brands"
            title1="Manufacturing"
            title2="Without Limits"
            description="Advanced production facilities, skilled craftsmanship, and precision-driven quality control systems engineered to transform ambitious apparel concepts into premium products trusted by leading streetwear, sportswear, and private-label brands worldwide."
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
                      <div className="arrow-rotate flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
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