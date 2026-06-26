"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowUpRight, Package, Layers, Ruler, Tag } from "lucide-react";

export interface CapabilityDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  moq?: string;
  fabric?: string;
  gsm?: string;
  turnaround?: string;
  highlights?: string[];
}

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  data: CapabilityDetail | null;
}

export default function DetailModal({ open, onClose, data }: DetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open || !data) return null;

  const blurPlaceholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PC9zdmc+";

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-black/50 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-56 w-full sm:h-64 overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL={blurPlaceholder}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
              {data.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed">
            {data.description}
          </p>

          {/* Spec Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Package, label: "MOQ", value: data.moq ?? "50 pcs" },
              { icon: Layers, label: "Fabric", value: data.fabric ?? "Premium" },
              { icon: Ruler, label: "GSM", value: data.gsm ?? "180–500" },
              { icon: Tag, label: "Lead Time", value: data.turnaround ?? "15–25 days" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-xl bg-zinc-900 border border-zinc-800 p-3"
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</span>
                <span className="text-sm font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Highlights */}
          {data.highlights && data.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                Key Features
              </h4>
              <ul className="space-y-1.5">
                {data.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              href="/get-quote"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 transition-all active:scale-95"
            >
              Request a Quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-sm font-semibold py-3 transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
