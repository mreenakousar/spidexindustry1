
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
  },
  {
    id: "garment-accessories",
    label: "Garment Accessories",
    description: "Premium finishing accessories including custom woven labels, metal zippers, drawstrings, and branded hang tags for private label production.",
    subcategories: ["Tags & Labels", "Zippers & Buttons", "Drawstrings"],
    products: [
      { name: "Custom Woven Label", spec: "Heat-seal & sew-in damask weave", fabric: "100% Woven Polyester Thread", blueprintType: "tee" },
      { name: "YKK-Style Metal Zipper", spec: "5# gauge, auto-lock slider", fabric: "Brass Alloy & Polyester Tape", blueprintType: "jacket" },
      { name: "Branded Hang Tag Set", spec: "400 GSM matte laminated card + eyelet", fabric: "Premium Cardstock & Cotton String", blueprintType: "shorts" },
      { name: "Flat Elastic Drawstring", spec: "8mm tubular braid, heat-cut ends", fabric: "100% Polyester Flat Braid", blueprintType: "pants" }
    ]
  },
  {
    id: "packing-bags",
    label: "Packing Bags",
    description: "Custom-branded packaging solutions including poly mailers, tote bags, and drawstring pouches for retail and e-commerce shipping.",
    subcategories: ["Polymailers", "Tote Bags", "Drawstring Bags"],
    products: [
      { name: "Custom Printed Poly Mailer", spec: "10x13\" co-ex film, 2.5 mil thickness", fabric: "Co-Extruded LDPE Poly Film", blueprintType: "shorts" },
      { name: "Heavy-Duty Canvas Tote", spec: "12oz natural canvas, reinforced handles", fabric: "100% Natural Canvas Cotton", blueprintType: "tee" },
      { name: "Branded Drawstring Pouch", spec: "30x40cm athletic gym bag style", fabric: "210D Rip-Stop Polyester", blueprintType: "pants" },
      { name: "Luxury Gift Box Set", spec: "Rigid box + magnetic closure lid", fabric: "1200 GSM Greyboard + Art Paper", blueprintType: "jacket" }
    ]
  },
  {
    id: "jeans",
    label: "Jeans",
    description: "Premium denim manufacturing with custom washes, finishes, and fits — from slim-cut fashion jeans to relaxed workwear styles.",
    subcategories: ["Slim Fit", "Regular Fit", "Relaxed Fit"],
    products: [
      { name: "Slim Taper Stretch Denim", spec: "Mid-rise, tapered leg, 4-way stretch", fabric: "98% Cotton, 2% Elastane Denim", blueprintType: "pants" },
      { name: "Classic Regular Fit Jean", spec: "Straight leg, 5-pocket construction", fabric: "100% Raw Selvedge Denim", blueprintType: "pants" },
      { name: "Acid Wash Relaxed Jeans", spec: "Loose silhouette, vintage acid finish", fabric: "Stonewashed 12oz Cotton Denim", blueprintType: "pants" },
      { name: "Distressed Carpenter Denim", spec: "Relaxed utility, hammer loop detail", fabric: "14oz Enzyme-Washed Denim", blueprintType: "pants" }
    ]
  },
  {
    id: "caps",
    label: "Caps",
    description: "Custom headwear manufacturing including structured baseball caps, unstructured snapbacks, trucker hats with embroidery and screen-print options.",
    subcategories: ["Baseball Caps", "Snapbacks", "Trucker Hats"],
    products: [
      { name: "Structured 6-Panel Baseball Cap", spec: "Mid-profile, buckle strap closure", fabric: "100% Brushed Cotton Twill", blueprintType: "shorts" },
      { name: "Flat Brim Snapback", spec: "High-profile, 6-panel, flat visor", fabric: "Wool-Acrylic Blend Front Panel", blueprintType: "shorts" },
      { name: "Mesh Trucker Hat", spec: "5-panel, foam front, snap closure", fabric: "Cotton Front + Polyester Mesh Back", blueprintType: "shorts" },
      { name: "Dad Hat Washed Cotton", spec: "Low-profile unstructured, slide adjuster", fabric: "100% Garment-Washed Cotton", blueprintType: "shorts" }
    ]
  }
];

export default function CategorySections() {
  return (
    <section className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white antialiased">

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
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 gap-5">
              <div>
                <SectionHeading title={category.label} />
                <p className="text-sm text-slate-500 mt-2.5 leading-relaxed font-normal">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
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