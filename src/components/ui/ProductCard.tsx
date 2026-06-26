
"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface Product {
  name: string;
  spec: string;
  fabric: string;
  blueprintType: "tee" | "hoodie" | "pants" | "jacket" | "gloves" | "shorts";
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ApparelWireframe: React.FC<{ type: Product["blueprintType"] }> = ({ type }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 border-b border-zinc-900 transition-all duration-500 overflow-hidden">
      {/* Light Blueprint Grid Backdrop (Adjusted for dark mode) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
        backgroundSize: "14px 14px, 28px 28px, 28px 28px",
        backgroundPosition: "center"
      }} />

      {/* CAD technical metadata */}
      <div className="absolute inset-x-4 top-3.5 flex justify-between text-[9px] font-mono text-zinc-600 select-none uppercase tracking-widest font-semibold">
        <span>UNIT: MM</span>
        <span>SPDX-CAD V1.0</span>
      </div>

      <div className="absolute inset-x-4 bottom-3.5 flex justify-between text-[9px] font-mono text-zinc-700 select-none">
        <span>[{type.toUpperCase()}_SPEC_DRAWING]</span>
        <span className="text-blue-500/60 font-bold">● REGISTERED</span>
      </div>

      {/* SVG Outline vectors - Default grayscale/zinc look, turns blue on parent group hover */}
      <svg
        className="w-2/3 h-2/3 text-zinc-600 group-hover:text-blue-500 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all duration-500 stroke-[1.25]"
        viewBox="0 0 100 120"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* T-Shirt Vector */}
        {type === "tee" && (
          <g>
            <path d="M30,25 C40,28 60,28 70,25 L85,38 L75,48 L68,43 L68,95 L32,95 L32,43 L25,48 L15,38 Z" />
            <path d="M30,25 C35,34 65,34 70,25" strokeDasharray="2,2" />
            <line x1="32" y1="91" x2="68" y2="91" strokeDasharray="2,2" />
            <line x1="22" y1="20" x2="78" y2="20" className="opacity-30" />
            <text x="50" y="16" fill="currentColor" textAnchor="middle" className="text-[6px] font-mono stroke-none">W: 560</text>
          </g>
        )}

        {/* Hoodie Vector */}
        {type === "hoodie" && (
          <g>
            <path d="M35,32 C35,10 65,10 65,32 Z" />
            <path d="M46,33 L46,46" strokeDasharray="1,1" />
            <path d="M54,33 L54,50" strokeDasharray="1,1" />
            <path d="M30,32 C38,34 62,34 70,32 L88,48 L76,58 L70,52 L70,95 C70,98 30,98 30,95 L30,52 L24,58 L12,48 Z" />
            <path d="M38,72 L62,72 L58,90 L42,90 Z" />
            <line x1="30" y1="93" x2="70" y2="93" strokeDasharray="2,2" />
          </g>
        )}

        {/* Pants Vector */}
        {type === "pants" && (
          <g>
            <path d="M32,15 L68,15 L68,22 L32,22 Z" />
            <path d="M32,22 L46,105 L50,105 L50,56 L50,105 L54,105 L68,22" />
            <path d="M32,22 L68,22" strokeDasharray="2,2" />
            <line x1="72" y1="15" x2="72" y2="105" className="opacity-30" />
            <text x="79" y="60" fill="currentColor" textAnchor="middle" transform="rotate(95 79 60)" className="text-[6px] font-mono stroke-none">L: 1020</text>
          </g>
        )}

        {/* Jacket Vector */}
        {type === "jacket" && (
          <g>
            <path d="M30,22 C40,24 60,24 70,22 L86,40 L76,50 L70,45 L70,95 L30,95 L30,45 L24,50 L14,40 Z" />
            <path d="M30,22 L38,32 L62,32 L70,22" />
            <line x1="50" y1="32" x2="50" y2="95" />
            <path d="M34,70 L42,70 L42,78 L34,78 Z" strokeDasharray="2,1" />
            <path d="M58,70 L66,70 L66,78 L58,78 Z" strokeDasharray="2,1" />
          </g>
        )}

        {/* Gloves Vector */}
        {type === "gloves" && (
          <g>
            <path d="M35,95 L65,95 L65,80 L35,80 Z" />
            <path d="M35,80 L32,60 C30,50 35,48 35,52 L36,80 M35,80 L37,40 C38,30 43,30 44,40 L44,70 M44,70 L45,35 C46,25 51,25 52,35 L52,70 M52,70 L53,38 C54,28 59,28 60,38 L60,72 M60,72 L61,45 C62,38 67,38 67,45 L65,80" />
            <circle cx="50" cy="70" r="10" strokeDasharray="2,2" className="opacity-40" />
          </g>
        )}

        {/* Shorts Vector */}
        {type === "shorts" && (
          <g>
            <path d="M28,25 L72,25 L72,32 L28,32 Z" />
            <path d="M28,32 L22,65 L46,65 L50,48 L54,65 L78,65 L72,32" />
            <line x1="28" y1="32" x2="72" y2="32" strokeDasharray="2,2" />
          </g>
        )}
      </svg>

      {/* Dark elegant image overlay effect */}
      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-all duration-500 pointer-events-none" />
      {/* Flash reflection effect on hover */}
      <div className="absolute inset-0 bg-white/0 transition-all duration-700 group-hover:bg-white/5 pointer-events-none" />
    </div>
  );
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-none border border-zinc-900 bg-zinc-900/40 transition-all duration-500 hover:border-zinc-800 backdrop-blur-sm text-white">

      {/* Aspect Ratio 4:5 Blueprint Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Content Details */}
      <div className="relative flex flex-grow flex-col bg-black p-5 sm:p-6 space-y-4">

        {/* Title & Premium Arrow */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400 line-clamp-1">
            {product.name}
          </h3>
          {/* Animated Arrow on Card Hover */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Technical Matrix Labeling (Dark Premium Version) */}
        <div className="space-y-2 text-[10px] font-mono p-3 bg-zinc-950 border border-zinc-900/80">
          <div className="flex justify-between border-b border-zinc-900 pb-2">
            <span className="text-zinc-500 uppercase tracking-wider text-[9px]">SPECIFICATION:</span>
            <span className="text-zinc-300 font-semibold text-right truncate max-w-[140px] uppercase">
              {product.spec}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-zinc-500 uppercase tracking-wider text-[9px]">FABRIC:</span>
            <span className="text-blue-400 font-semibold text-right truncate max-w-[140px] uppercase">
              {product.fabric}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}