"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowUpRight, Compass, ShieldCheck, HelpCircle } from "lucide-react";
import { productCategories } from "@/data/site";
import * as CategoryIcons from "../ui/CategoryIcons";

// Define TypeScript interfaces for our product items
interface ProductItem {
  id: string;
  name: string;
  spec: string;
  fabric: string;
  moq: string;
  blueprintType: "tee" | "hoodie" | "pants" | "jacket" | "gloves" | "shorts";
}

// Custom technical blueprint vectors to render high-end apparel wireframes
const ApparelBlueprint: React.FC<{ type: ProductItem["blueprintType"]; active: boolean }> = ({ type, active }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 bg-neutral-950 ${active ? "shadow-[inset_0_0_40px_rgba(59,130,246,0.15)] border-blue-500/20" : "border-neutral-800"
      } border rounded-lg overflow-hidden`}>
      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
        backgroundSize: "16px 16px, 32px 32px, 32px 32px",
        backgroundPosition: "center"
      }} />

      {/* Blueprint Measurements and Technical Graphics */}
      <div className="absolute inset-x-4 top-4 flex justify-between text-[10px] font-mono text-neutral-500 select-none uppercase tracking-widest">
        <span>Scale: 1:12</span>
        <span>Spidex Cad-v4.1</span>
      </div>

      <div className="absolute inset-x-4 bottom-4 flex justify-between text-[9px] font-mono text-blue-500/60 select-none">
        <span>[CAD-DRAWING: {type.toUpperCase()}]</span>
        <span>PAT. PEND.</span>
      </div>

      {/* Vector Graphics based on apparel type */}
      <svg
        className={`w-4/5 h-4/5 transition-all duration-700 ${active ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] stroke-[1.5]" : "text-neutral-600 stroke-[1]"
          }`}
        viewBox="0 0 100 120"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* T-Shirt Pattern */}
        {type === "tee" && (
          <g>
            {/* Outline */}
            <path d="M30,25 C40,28 60,28 70,25 L85,38 L75,48 L68,43 L68,95 L32,95 L32,43 L25,48 L15,38 Z" />
            {/* Neck stitch */}
            <path d="M30,25 C35,35 65,35 70,25" strokeDasharray="2,2" />
            {/* Hem stitch */}
            <line x1="32" y1="91" x2="68" y2="91" strokeDasharray="2,2" />
            {/* Measurement annotations */}
            <line x1="22" y1="20" x2="78" y2="20" className="opacity-40" />
            <line x1="22" y1="18" x2="22" y2="22" className="opacity-40" />
            <line x1="78" y1="18" x2="78" y2="22" className="opacity-40" />
            <text x="50" y="16" fill="currentColor" textAnchor="middle" className="text-[6px] font-mono stroke-none">W: 560mm</text>

            <line x1="28" y1="45" x2="28" y2="95" className="opacity-40" />
            <line x1="26" y1="45" x2="30" y2="45" className="opacity-40" />
            <line x1="26" y1="95" x2="30" y2="95" className="opacity-40" />
            <text x="23" y="72" fill="currentColor" textAnchor="middle" transform="rotate(-90 23 72)" className="text-[6px] font-mono stroke-none">L: 720mm</text>
          </g>
        )}

        {/* Hoodie Pattern */}
        {type === "hoodie" && (
          <g>
            {/* Hood */}
            <path d="M35,32 C35,10 65,10 65,32 Z" />
            {/* Drawstrings */}
            <path d="M46,33 L46,48" strokeDasharray="1,1" />
            <path d="M54,33 L54,52" strokeDasharray="1,1" />
            {/* Body */}
            <path d="M30,32 C38,34 62,34 70,32 L88,48 L76,58 L70,52 L70,95 C70,98 30,98 30,95 L30,52 L24,58 L12,48 Z" />
            {/* Kangaroo pocket */}
            <path d="M38,72 L62,72 L58,90 L42,90 Z" />
            <path d="M38,72 L42,90" className="opacity-50" />
            <path d="M62,72 L58,90" className="opacity-50" />
            {/* Ribbed cuffs & hem */}
            <line x1="30" y1="93" x2="70" y2="93" strokeDasharray="2,2" />
            {/* Measurements */}
            <line x1="10" y1="105" x2="90" y2="105" className="opacity-40" />
            <text x="50" y="113" fill="currentColor" textAnchor="middle" className="text-[6px] font-mono stroke-none">SLEEVE-SPAN: 1650mm</text>
          </g>
        )}

        {/* Pants/Leggings Pattern */}
        {type === "pants" && (
          <g>
            {/* Waistband */}
            <path d="M32,15 L68,15 L68,22 L32,22 Z" />
            {/* Legs */}
            <path d="M32,22 L46,105 L50,105 L50,56 L50,105 L54,105 L68,22" />
            {/* Stitches */}
            <path d="M32,22 L68,22" strokeDasharray="2,2" />
            <path d="M42,22 L48,52" strokeDasharray="1,1" className="opacity-50" />
            <path d="M58,22 L52,52" strokeDasharray="1,1" className="opacity-50" />
            {/* Measurements */}
            <line x1="72" y1="15" x2="72" y2="105" className="opacity-40" />
            <line x1="70" y1="15" x2="74" y2="15" className="opacity-40" />
            <line x1="70" y1="105" x2="74" y2="105" className="opacity-40" />
            <text x="79" y="60" fill="currentColor" textAnchor="middle" transform="rotate(90 79 60)" className="text-[6px] font-mono stroke-none">OUTSEAM: 1020mm</text>
          </g>
        )}

        {/* Jacket Pattern */}
        {type === "jacket" && (
          <g>
            {/* Outline */}
            <path d="M30,22 C40,24 60,24 70,22 L86,40 L76,50 L70,45 L70,95 L30,95 L30,45 L24,50 L14,40 Z" />
            {/* Collar */}
            <path d="M30,22 L38,32 L62,32 L70,22" />
            {/* Zipper center line */}
            <line x1="50" y1="32" x2="50" y2="95" />
            {/* Pockets */}
            <path d="M34,70 L42,70 L42,78 L34,78 Z" strokeDasharray="2,1" />
            <path d="M58,70 L66,70 L66,78 L58,78 Z" strokeDasharray="2,1" />
            {/* Ribbing */}
            <line x1="30" y1="92" x2="70" y2="92" strokeDasharray="2,2" />
          </g>
        )}

        {/* Gloves Pattern */}
        {type === "gloves" && (
          <g>
            {/* Wrist */}
            <path d="M35,95 L65,95 L65,80 L35,80 Z" />
            {/* Glove body & fingers */}
            <path d="M35,80 L32,60 C30,50 35,48 35,52 L36,80 M35,80 L37,40 C38,30 43,30 44,40 L44,70 M44,70 L45,35 C46,25 51,25 52,35 L52,70 M52,70 L53,38 C54,28 59,28 60,38 L60,72 M60,72 L61,45 C62,38 67,38 67,45 L65,80" />
            {/* Padding/Stitching Details */}
            <circle cx="50" cy="70" r="10" strokeDasharray="2,2" className="opacity-60" />
            <line x1="35" y1="85" x2="65" y2="85" />
          </g>
        )}

        {/* Shorts Pattern */}
        {type === "shorts" && (
          <g>
            {/* Waistband */}
            <path d="M28,25 L72,25 L72,32 L28,32 Z" />
            {/* Legs */}
            <path d="M28,32 L22,65 L46,65 L50,48 L54,65 L78,65 L72,32" />
            {/* Stitching */}
            <line x1="28" y1="32" x2="72" y2="32" strokeDasharray="2,2" />
            <path d="M22,61 L46,61" strokeDasharray="1,1" className="opacity-50" />
            <path d="M54,61 L78,61" strokeDasharray="1,1" className="opacity-50" />
          </g>
        )}
      </svg>
    </div>
  );
};

// Main Static Category Data structured for grid content
// Designed specifically around the client's navbar categories
const categoryProducts: Record<string, ProductItem[]> = {
  sportware: [
    { id: "sw-1", name: "AeroDry Performance Tee", spec: "140 GSM Moisture-Wicking Fit", fabric: "100% Polyester Micro-Mesh", moq: "100 Units", blueprintType: "tee" },
    { id: "sw-2", name: "Apex Athletic Tracksuit", spec: "Premium zip jacket & tapered joggers", fabric: "92% Polyester, 8% Spandex", moq: "150 Units", blueprintType: "hoodie" },
    { id: "sw-3", name: "Vanguard Sublimated Jersey", spec: "Professional grade team jersey", fabric: "100% Interlock Mesh", moq: "100 Units", blueprintType: "tee" },
    { id: "sw-4", name: "Endurance Hybrid Shorts", spec: "4-way stretch with inside lining", fabric: "90% Nylon, 10% Elastane", moq: "120 Units", blueprintType: "shorts" },
  ],
  gymware: [
    { id: "gw-1", name: "Flex Racerback Tank", spec: "Rib-knit athletic cut tank top", fabric: "95% Combed Cotton, 5% Elastane", moq: "100 Units", blueprintType: "tee" },
    { id: "gw-2", name: "SculptFit Compression Leggings", spec: "Squat-proof, high waistband fit", fabric: "78% Nylon, 22% Spandex", moq: "150 Units", blueprintType: "pants" },
    { id: "gw-3", name: "ArmorTech Base Compression", spec: "Muscle-lock base layer compression", fabric: "85% Polyester, 15% Polyurethane", moq: "100 Units", blueprintType: "pants" },
    { id: "gw-4", name: "Impact High-Support Sports Bra", spec: "Encapsulated support, breathable liner", fabric: "80% Polyester, 20% Elastane", moq: "100 Units", blueprintType: "jacket" },
  ],
  streetware: [
    { id: "st-1", name: "Classic Oversized Heavy Tee", spec: "240 GSM street style drop shoulder", fabric: "100% Organic Combed Cotton", moq: "100 Units", blueprintType: "tee" },
    { id: "st-2", name: "Urban Comfort Fleece Hoodie", spec: "380 GSM heavy pullover, double lined", fabric: "80% Cotton, 20% Polyester Fleece", moq: "150 Units", blueprintType: "hoodie" },
    { id: "st-3", name: "Tactical Utility Cargo Pants", spec: "Reinforced pockets, relaxed cuff fit", fabric: "98% Cotton Ripstop, 2% Spandex", moq: "120 Units", blueprintType: "pants" },
    { id: "st-4", name: "Retro Satin Bomber Jacket", spec: "Quilted lined retro shell bomber", fabric: "100% Polyester Satin", moq: "100 Units", blueprintType: "jacket" },
  ],
  jackets: [
    { id: "jk-1", name: "Metropolis Softshell Jacket", spec: "Weatherproof membrane, microfleece backing", fabric: "100% Polyester Shell, TPU lamination", moq: "100 Units", blueprintType: "jacket" },
    { id: "jk-2", name: "Sub-Zero Quilted Puffer Jacket", spec: "Horizontal baffled thermal insulation", fabric: "100% Ripstop Nylon Shell, Down-alternative fill", moq: "150 Units", blueprintType: "jacket" },
    { id: "jk-3", name: "Elements Lightweight Windbreaker", spec: "Water repellent packable windbreaker", fabric: "100% Lightweight Polyester", moq: "100 Units", blueprintType: "jacket" },
    { id: "jk-4", name: "Legacy Wool Varsity Jacket", spec: "Melton wool body, premium cowhide sleeves", fabric: "80% Wool / 20% Nylon Body", moq: "80 Units", blueprintType: "jacket" },
  ],
  gloves: [
    { id: "gl-1", name: "Pro Grip Weightlifting Gloves", spec: "Padded gel-grip palm, wrist wrap strap", fabric: "Amara Leather & Nylon Mesh", moq: "100 Pairs", blueprintType: "gloves" },
    { id: "gl-2", name: "ThermaFit Insulated Winter Gloves", spec: "Touchscreen responsive fleece glove", fabric: "Windproof Neoprene & Fleece", moq: "150 Pairs", blueprintType: "gloves" },
    { id: "gl-3", name: "AeroSport Lightweight Gloves", spec: "Multi-sport glove with silicone palm mesh", fabric: "Lycra & Breathable Mesh", moq: "100 Pairs", blueprintType: "gloves" },
    { id: "gl-4", name: "StitchShield Reinforced Work Gloves", spec: "Knuckle guards, reinforced palm stitches", fabric: "Synthetic Leather & Kevlar lining", moq: "100 Pairs", blueprintType: "gloves" },
  ]
};

export default function CategorySmoothScrollLayout() {
  const [activeSection, setActiveSection] = useState<string>("sportware");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string>("sportware");
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  // Tracks active subcategories selected inside each section tab bar
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string>>({
    sportware: "Performance Tees",
    gymware: "Tank Tops",
    streetware: "Graphic Tees",
    jackets: "Bomber Jackets",
    gloves: "Training Gloves",
  });

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // IntersectionObserver to auto-update the active section in navigation when scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Detect sections in mid-to-top viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    productCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string,
    subcategoryLabel?: string
  ) => {
    e.preventDefault();

    // Set subcategory tab if provided
    if (subcategoryLabel) {
      setSelectedSubcategories((prev) => ({
        ...prev,
        [targetId]: subcategoryLabel,
      }));
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of our sticky header + safety padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash without standard page reload jump
      window.history.pushState(null, "", `#${targetId}`);

      // Close dropdowns
      setDropdownOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-950/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-950/10 blur-[150px] pointer-events-none" />

      {/* STICKY DROP-DOWN NAVBAR */}
      <header className="sticky top-0 z-[9999] w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center shrink-0 gap-3">
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              SPIDEX INDUSTRY
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-blue-950 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded-full">
              Factory
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link href="/" className="px-3 py-2 text-[14px] text-neutral-400 hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="px-3 py-2 text-[14px] text-neutral-400 hover:text-white transition">
              About Us
            </Link>
            <Link href="/services" className="px-3 py-2 text-[14px] text-neutral-400 hover:text-white transition">
              Services
            </Link>
            <Link href="/factory-production" className="px-3 py-2 text-[14px] text-neutral-400 hover:text-white transition">
              Production
            </Link>
            <Link href="/portfolio" className="px-3 py-2 text-[14px] text-neutral-400 hover:text-white transition">
              Portfolio
            </Link>

            {/* Product Categories Mega-Menu Trigger */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-[14px] font-medium transition-all ${dropdownOpen || activeSection
                  ? "bg-neutral-900/60 text-blue-400 border border-neutral-800"
                  : "text-neutral-300 hover:text-white"
                  }`}
              >
                Product Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Dropdown Menu Container */}
              <div className={`absolute left-0 top-full pt-1.5 w-[760px] transition-all duration-300 ${dropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible pointer-events-none"
                }`}>
                <div className="bg-neutral-900 border border-neutral-800/95 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex">
                  {/* Left: Main Categories */}
                  <div className="w-56 border-r border-neutral-800 bg-neutral-900/40 p-4 space-y-1">
                    <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-3 px-3">
                      Select Category
                    </p>
                    {productCategories.map((cat) => {
                      const Icon = (CategoryIcons as any)[cat.icon];
                      const active = hoveredCat === cat.id;

                      return (
                        <button
                          key={cat.id}
                          onMouseEnter={() => {
                            setHoveredCat(cat.id);
                            setHoveredSub(cat.sub?.[0]?.label ?? null);
                          }}
                          onClick={(e) => handleScrollTo(e, cat.id)}
                          className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${active
                            ? "bg-neutral-800 text-blue-400 font-medium"
                            : "text-neutral-400 hover:bg-neutral-850 hover:text-white"
                            }`}
                        >
                          {Icon && (
                            <Icon className={`w-4 h-4 transition ${active ? "text-blue-400" : "text-neutral-500"}`} />
                          )}
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Sub-categories */}
                  <div className="flex-1 p-6 bg-neutral-950/40 flex flex-col justify-between">
                    <div>
                      {productCategories.map((cat) => {
                        if (cat.id !== hoveredCat) return null;

                        return (
                          <div key={cat.id} className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-3">
                                {cat.label} Subcategories
                              </p>
                              <div className="space-y-1">
                                {cat.sub.map((s) => (
                                  <button
                                    key={s.label}
                                    onMouseEnter={() => setHoveredSub(s.label)}
                                    onClick={(e) => handleScrollTo(e, cat.id, s.label)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${hoveredSub === s.label
                                      ? "bg-neutral-850 text-blue-400 font-medium"
                                      : "text-neutral-400 hover:bg-neutral-850/50 hover:text-white"
                                      }`}
                                  >
                                    {s.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="bg-neutral-900/60 rounded-lg p-4 border border-neutral-800/60 flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                                  Current Focus
                                </h4>
                                <p className="text-sm font-semibold text-white">
                                  {hoveredSub || cat.sub[0]?.label}
                                </p>
                                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                                  Configure and order custom wholesale designs for {hoveredSub || cat.sub[0]?.label} specs.
                                </p>
                              </div>
                              <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer">
                                <span>View Section</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/reviews" className="px-3 py-2 text-[14px] text-neutral-400 hover:text-white transition">
              Reviews
            </Link>
            <Link href="/contact" className="px-3 py-2 text-[14px] text-neutral-400 hover:text-white transition">
              Contact Us
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm text-neutral-400 hover:text-white transition">
              Login
            </Link>
            <Link
              href="/get-quote"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white bg-neutral-900/40"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER NAV */}
      <div className={`fixed inset-0 z-[9998] bg-neutral-950 transition-all duration-300 lg:hidden ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}>
        <div className="p-6 pt-28 flex flex-col gap-5 h-full overflow-y-auto">
          <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
            Navigation Menu
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-lg py-2.5 border-b border-neutral-900 text-neutral-300">
              Home
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-lg py-2.5 border-b border-neutral-900 text-neutral-300">
              About Us
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="text-lg py-2.5 border-b border-neutral-900 text-neutral-300">
              Services
            </Link>
            <Link href="/factory-production" onClick={() => setMenuOpen(false)} className="text-lg py-2.5 border-b border-neutral-900 text-neutral-300">
              Production
            </Link>

            <div className="mt-3">
              <p className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-2">
                Scroll to Categories:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {productCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={(e) => handleScrollTo(e, cat.id)}
                    className="p-2 text-left rounded-lg text-xs font-medium bg-neutral-900/50 border border-neutral-800/60 text-neutral-300"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="border border-neutral-800 p-3 rounded-lg text-center text-sm font-medium text-neutral-300">
              Login
            </Link>
            <Link href="/get-quote" onClick={() => setMenuOpen(false)} className="bg-blue-600 text-white p-3 rounded-lg text-center text-sm font-medium">
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* HERO / INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4 uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Interactive Catalog & Customization Spec</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Product Categories & <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Manufacturing Blueprint</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          Navigate our core industrial apparel manufacturing capabilities. Hover the dropdown to jump to sections, view digital mock-ups, and configure specifications.
        </p>
      </section>

      {/* MAIN SINGLE-PAGE PRODUCT CATEGORIES SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-28">
        {productCategories.map((cat, index) => {
          const Icon = (CategoryIcons as any)[cat.icon];
          const activeSub = selectedSubcategories[cat.id] || cat.sub[0]?.label;
          const products = categoryProducts[cat.id] || [];

          return (
            <section
              key={cat.id}
              id={cat.id}
              // scroll-mt sets the offset so heading doesn't hide behind sticky header
              className="scroll-mt-24 lg:scroll-mt-28 relative pt-12 border-t border-neutral-900/60 first:border-t-0 first:pt-0"
            >
              {/* Section Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3.5 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center text-blue-500">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                      Category {index + 1}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    {cat.label}
                  </h2>
                  <p className="text-sm text-neutral-400 mt-2 max-w-xl">
                    High-end {cat.label.toLowerCase()} manufacturing. Select sub-categories below to preview specification wireframes.
                  </p>
                </div>

                {/* Sub-category Pills (Tabs) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none">
                  {cat.sub.map((s) => {
                    const active = activeSub === s.label;
                    return (
                      <button
                        key={s.label}
                        onClick={() =>
                          setSelectedSubcategories((prev) => ({
                            ...prev,
                            [cat.id]: s.label,
                          }))
                        }
                        className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide whitespace-nowrap transition-all duration-300 ${active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                          : "bg-neutral-900/40 text-neutral-400 hover:text-white border border-neutral-800/60"
                          }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid Layout of 4 Placeholder Picture Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                  const isHighlighted = activeSub === product.name || activeSub === product.id || true;

                  return (
                    <div
                      key={product.id}
                      className="group bg-neutral-900/40 border border-neutral-800/80 hover:border-blue-500/30 rounded-xl p-4 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Premium Wireframe Picture Box (Aspect 3:4 for high-end clothing) */}
                      <div className="aspect-[3/4] relative w-full mb-4 rounded-lg overflow-hidden">
                        <ApparelBlueprint type={product.blueprintType} active={isHighlighted} />
                      </div>

                      {/* Info & Meta Data */}
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between items-start gap-1">
                          <h3 className="text-sm font-semibold text-neutral-100 group-hover:text-blue-400 transition-colors duration-300">
                            {product.name}
                          </h3>
                        </div>

                        {/* Tech Spec Details */}
                        <div className="space-y-1 text-[11px] font-mono text-neutral-500">
                          <div className="flex justify-between border-b border-neutral-900 pb-1">
                            <span>Spec:</span>
                            <span className="text-neutral-300 text-right">{product.spec}</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-900 pb-1">
                            <span>Fabric:</span>
                            <span className="text-neutral-300 text-right">{product.fabric}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>MOQ:</span>
                            <span className="text-neutral-400 text-right font-semibold text-blue-500">{product.moq}</span>
                          </div>
                        </div>
                      </div>

                      {/* Customize Button CTA */}
                      <div className="mt-4 pt-2 border-t border-neutral-900">
                        <Link
                          href={`/get-quote?category=${cat.id}&item=${encodeURIComponent(product.name)}`}
                          className="flex items-center justify-between w-full px-3 py-2 text-xs font-mono bg-neutral-950 border border-neutral-800 group-hover:border-blue-500/20 group-hover:bg-blue-600/10 text-neutral-300 hover:text-white rounded-lg transition-all duration-300"
                        >
                          <span>Request Wholesale Quote</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-blue-400 transition" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* QUICK FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} Spidex Industry. All rights reserved. Premium App Router Implementation.</p>
        </div>
      </footer>
    </div>
  );
}
