"use client";

import React from "react";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";
import ProductCard, { Product } from "../../components/ui/ProductCard";

interface CategoryData {
  id: string;
  label: string;
  description: string;
  subcategories: string[];
  products: Product[];
}

// DYNAMIC CATEGORY DATA ARRAY (100% Original Content)
const categoriesData: CategoryData[] = [
  {
    id: "sportware",
    label: "Sportware",
    description: "High-performance athletic apparel constructed with specialized moisture-wicking and UV-resistant materials.",
    subcategories: ["Performance Tees", "Tracksuits", "Jerseys", "Sport Shorts", "Outerwear"],
    products: [
      { name: "AeroDry Performance Tee", spec: "140 GSM Active Athletic Fit", fabric: "100% Polyester Micro-Mesh", blueprintType: "tee" },
      { name: "Apex Pro Tracksuit Jacket", spec: "Tapered silhouette with zip styling", fabric: "92% Poly, 8% Spandex Blend", blueprintType: "jacket" },
      { name: "Vanguard Sublimated Jersey", spec: "Interlock knit, team customization ready", fabric: "100% Interlock Polyester", blueprintType: "tee" },
      { name: "Endurance Utility Shorts", spec: "4-Way stretch active running shorts", fabric: "90% Nylon, 10% Elastane", blueprintType: "shorts" }
    ]
  },
  {
    id: "gymware",
    label: "Gymware",
    description: "Form-fitting base layers and training gear engineered for flexibility, compression, and durability.",
    subcategories: ["Tank Tops", "Leggings", "Compression Wear", "Sports Bras", "Gym Shorts"],
    products: [
      { name: "Flex Racerback Tank", spec: "Athletic cut ribbed training top", fabric: "95% Combed Cotton, 5% Spandex", blueprintType: "tee" },
      { name: "SculptFit Compression Leggings", spec: "Squat-proof, high-waisted support", fabric: "78% Nylon, 22% Spandex", blueprintType: "pants" },
      { name: "ArmorTech Compression Longsleeve", spec: "Base layer muscle support system", fabric: "Polyester-Polyurethane Knit", blueprintType: "pants" },
      { name: "Impact High-Support Sports Bra", spec: "Molded cups, breathable mesh liner", fabric: "80% Polyester, 20% Elastane", blueprintType: "jacket" }
    ]
  },
  {
    id: "streetware",
    label: "Streetware",
    description: "Premium oversized fashion styles manufactured with heavyweight canvas fabrics and custom print finishes.",
    subcategories: ["Graphic Tees", "Hoodies", "Cargo Pants", "Bomber Jackets", "Caps & Hats"],
    products: [
      { name: "Oversized Boxy Tee", spec: "240 GSM heavy combed cotton streetwear", fabric: "100% Premium Combed Cotton", blueprintType: "tee" },
      { name: "Urban Fleece Pullover Hoodie", spec: "380 GSM heavyweight custom hoodie", fabric: "80% Organic Cotton, 20% Polyester", blueprintType: "hoodie" },
      { name: "Tactical Multi-Pocket Jogger", spec: "Ripstop structure, reinforced seams", fabric: "Cotton-Spandex Ripstop Blend", blueprintType: "pants" },
      { name: "Satin Vintage Bomber Jacket", spec: "Quilted lined retro shell bomber", fabric: "100% Polyester Satin Outershell", blueprintType: "jacket" }
    ]
  },
  {
    id: "jackets",
    label: "Jackets",
    description: "Custom outerwear solutions featuring weather-proof softshell layers and insulated thermal winter garments.",
    subcategories: ["Bomber Jackets", "Softshell", "Puffer"],
    products: [
      { name: "Metropolis Softshell Jacket", spec: "Windproof membrane, fleece lining", fabric: "TPU Laminated Technical Polyester", blueprintType: "jacket" },
      { name: "Sub-Zero Thermal Puffer", spec: "Baffled thermal chambers, down-alt fill", fabric: "Ripstop Nylon Shell & Synthetic Fill", blueprintType: "jacket" },
      { name: "Elements Waterproof Windbreaker", spec: "Packable windproof utility jacket", fabric: "100% Lightweight Ripstop Nylon", blueprintType: "jacket" },
      { name: "Legacy Wool Varsity Jacket", spec: "Classic fit Melton wool, genuine leather trim", fabric: "Melton Wool & Full Grain Cowhide", blueprintType: "jacket" }
    ]
  },
  {
    id: "gloves",
    label: "Gloves",
    description: "Utility and performance gloves designed for professional training, grip support, and thermal insulation.",
    subcategories: ["Training Gloves", "Winter Gloves", "Sport Gloves"],
    products: [
      { name: "Pro Grip Weightlifting Gloves", spec: "Padded gel palm, double wrist wrap strap", fabric: "Amara Premium Leather & Lycra", blueprintType: "gloves" },
      { name: "ThermaFit Touchscreen Gloves", spec: "Windproof panels, capacitive fingertips", fabric: "Neoprene Face & Brushed Fleece Core", blueprintType: "gloves" },
      { name: "AeroSport Breathable Gloves", spec: "Silicon grip mapping, lightweight chassis", fabric: "Breathable Stretch-Mesh & Poly", blueprintType: "gloves" },
      { name: "StitchShield Reinforced Utility Gloves", spec: "Kevlar lining, high-impact rubber guard", fabric: "Synthetic Suede & Kevlar Threads", blueprintType: "gloves" }
    ]
  }
];

export default function CategorySections() {
  return (
    <section className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white antialiased">

      {/* 1. Reusable Video Background Hero Section Integrated */}
      <PageHero
        title="Our Production Catalogues"
        description="Explore Speedx Industry's comprehensive custom apparel configurations, premium technical subcategories, and active streetwear material specifications designed for global exports."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-28">
        {categoriesData.map((category, index) => (
          <div
            key={category.id}
            id={category.id}
            className="scroll-mt-24 lg:scroll-mt-28 border-t border-slate-100 pt-16 first:border-t-0 first:pt-0"
          >
            {/* Header Content Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-xl">

                <SectionHeading title={category.label} />
                <p className="text-sm text-slate-500 mt-2.5 leading-relaxed font-normal">
                  {category.description}
                </p>
              </div>

              {/* Subcategories Chips */}
              <div className="flex flex-wrap items-center gap-1.5 md:max-w-md md:justify-end">
                {category.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 rounded-md text-[10px] font-mono tracking-wide bg-[#F4F7FC] border border-blue-100/50 text-blue-900/80 select-none font-medium"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Showcase Product Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}