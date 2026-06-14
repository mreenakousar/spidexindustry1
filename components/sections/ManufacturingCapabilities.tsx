"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const premiumCapabilities = [
  {
    id: "streetwear",
    title: "Premium Streetwear",
    description: "High-GSM oversized hoodies, drop-shoulder tees, and joggers featuring custom mineral washes, vintage textures, and high-fidelity 3D puff printing.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    slug: "/capabilities/streetwear"
  },
  {
    id: "sportswear",
    title: "Elite Sportswear",
    description: "Engineered performance apparel with moisture-wicking technology, 4-way stretch fabrics, and ergonomic flatlock stitching for global brands.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    slug: "/capabilities/sportswear"
  },
  {
    id: "gymwear",
    title: "Gymwear ",
    description: "Compression gear, seamless fits, and high-durability training wear designed to withstand intense athletic performance while maintaining shape.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    slug: "/capabilities/gymwear"
  },
  {
    id: "jackets",
    title: "Jackets",
    description: "Custom bomber jackets, windbreakers, and heavy-duty outerwear featuring weather-resistant materials, custom zippers, and internal premium linings.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
    slug: "/capabilities/jackets"
  },
  {
    id: "gloves",
    title: " Gloves",
    description: "Precision-cut tactical, gym, and lifestyle gloves crafted with premium leather, reinforced palms, and custom embossed branding.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
    slug: "/capabilities/gloves"
  },
  {
    id: "private-label",
    title: "Private Label Goods",
    description: "Full-service custom manufacturing from pattern drafting and fabric sourcing to bespoke custom labels, hangtags, and sustainable packaging.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    slug: "/capabilities/private-label"
  }
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ManufacturingCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP context clean-up ke liye taake memory leak na ho
    const ctx = gsap.context(() => {
      
      // 1. Section Header Title Animation
      gsap.fromTo(".section-header-anim", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.2 }
      );

      // 2. High Performance ScrollTrigger Batch Processing for Cards
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

      // 3. Card Inner Elements Hover Animations (Fixed Selectors)
      const cards = gsap.utils.toArray<HTMLElement>('.streetwear-card');
      cards.forEach((card) => {
        const image = card.querySelector('.product-image-zoom');
        const arrow = card.querySelector('.arrow-rotate');
        const overlay = card.querySelector('.dark-overlay');

        card.addEventListener('mouseenter', () => {
          if (image) gsap.to(image, { scale: 1.08, filter: "grayscale(0%) contrast(100%)", duration: 0.6, ease: "power2.out" });
          if (arrow) gsap.to(arrow, { rotation: 45, x: 3, y: -3, scale: 1.1, duration: 0.4, ease: "back.out(2)" });
          if (overlay) gsap.to(overlay, { opacity: 0.1, duration: 0.4 });
        });

        card.addEventListener('mouseleave', () => {
          if (image) gsap.to(image, { scale: 1, filter: "grayscale(100%) contrast(110%)", duration: 0.6, ease: "power2.out" });
          if (arrow) gsap.to(arrow, { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { opacity: 0.4, duration: 0.4 });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-16 font-sans text-white sm:py-20 md:py-24">
      
      <div className="absolute inset-0 opacity-60 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10 sm:px-6">
        
        <SectionHeader
          label="Built For Global Brands"
          title1="Manufacturing"
          title2="Without Limits"
          description="Advanced production facilities, skilled craftsmanship, and precision-driven quality control systems engineered to transform ambitious apparel concepts into premium products trusted by leading streetwear, sportswear, and private-label brands worldwide."
        />

        {/* Premium Apparel Grid */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {premiumCapabilities.map((c) => {
            return (
              <Link 
                href={c.slug} 
                key={c.id} 
                className="streetwear-card group flex h-full flex-col overflow-hidden rounded-none border border-zinc-900 bg-zinc-900/40 transition-all duration-500 hover:border-zinc-800 backdrop-blur-sm"
              >
                {/* Product/Fabric Image Showcase */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-zinc-900 bg-zinc-950">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="product-image-zoom w-full h-full object-cover object-center transition-all"
                    style={{ filter: "grayscale(100%) contrast(110%)" }}
                    loading="lazy"
                  />
                  {/* Dark Elegant Overlay Controlled By GSAP */}
                  <div className="dark-overlay absolute inset-0 bg-black opacity-45 transition-all pointer-events-none" />
                  {/* Premium Subtle Flash Grid Reflection */}
                  <div className="absolute inset-0 bg-white/0 transition-all duration-700 group-hover:bg-white/5 pointer-events-none" />
                </div>

                {/* Content Details */}
                <div className="relative flex flex-grow flex-col bg-black p-4 sm:p-5">
                  <div className="mb-3 flex items-start justify-between gap-2 sm:gap-4">
                    <h3 className="text-base font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400 sm:text-lg">
                      {c.title}
                    </h3>
                    <div className="arrow-rotate flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
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
  );
}