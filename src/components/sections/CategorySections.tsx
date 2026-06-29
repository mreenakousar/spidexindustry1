
"use client";

import React from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard, { Product } from "@/components/ui/ProductCard";

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
    description: "High-quality athletic jerseys including retro national team kits, custom mesh jerseys and graphic basketball apparel.",
    subcategories: ["Performance Tees", "Tracksuits", "Jerseys", "Sport Shorts", "Outerwear"],
    products: [
      { name: "Mexico Home Jersey", spec: "Retro green jersey with custom embroidery", fabric: "100% Breathable Polyester", blueprintType: "tee", image: "/sportswear/sport6.jpeg" },
      { name: "Presidents Club Mesh Jersey", spec: "Black oversized mesh jersey", fabric: "100% Polyester Mesh", blueprintType: "jacket", image: "/sportswear/sport2.jpeg" },
      { name: "Argentina Classic Jersey", spec: "Light blue & white stripes, #19", fabric: "100% Interlock Polyester", blueprintType: "tee", image: "/sportswear/sport3.jpeg" },
      { name: "Graphic Pattern Basketball Jersey", spec: "Purple custom printed graphic jersey", fabric: "Lightweight Mesh", blueprintType: "shorts", image: "/sportswear/sport4.jpeg" }
    ]
  },
  {
    id: "gymware",
    label: "Gymware",
    description: "Stylish and flexible women's activewear featuring ribbed crop sets, spandex zip rompers and comfortable track sets.",
    subcategories: ["Tank Tops", "Leggings", "Compression Wear", "Sports Bras", "Gym Shorts"],
    products: [
      { name: "Doll Apparel Crop Set", spec: "Cream ribbed crop top & shorts", fabric: "Seamless Ribbed Knit", blueprintType: "tee", image: "/gymwear/gym1.jpeg" },
      { name: "Lacoste Zip Romper", spec: "Navy blue one-piece with gold stripes", fabric: "Stretch Spandex Blend", blueprintType: "pants", image: "/gymwear/gym2.jpeg" },
      { name: "Mint Halter Gym Set", spec: "Light green halter crop top & shorts", fabric: "Cotton Spandex Blend", blueprintType: "pants", image: "/gymwear/gym4.jpeg" },
      { name: "California Pink Track Set", spec: "Pink crop top with matching shorts", fabric: "Soft Cotton Blend", blueprintType: "jacket", image: "/gymwear/gym5.jpeg" }
    ]
  },
  {
    id: "streetware",
    label: "Streetware",
    description: "Edgy streetwear collection featuring vintage acid wash tops, graphic muscle tees and premium tie-dye shirts.",
    subcategories: ["Graphic Tees", "Hoodies", "Cargo Pants", "Bomber Jackets", "Caps & Hats"],
    products: [
      { name: "Harley Davidson Muscle Tee", spec: "Grey sleeveless graphic shirt", fabric: "100% Cotton", blueprintType: "tee", image: "/streetwear/street1.jpeg" },
      { name: "Acid Wash Graphic Sleeveless", spec: "Vintage acid wash with 'Needy' graphic", fabric: "Heavyweight Cotton", blueprintType: "hoodie", image: "/streetwear/street2.jpeg" },
      { name: "Chrome Hearts Tie-Dye Tee", spec: "Red/black tie-dye with arched logo", fabric: "Premium Cotton", blueprintType: "pants", image: "/streetwear/street6.jpeg" },
      { name: "Never Quieten Imagination Tee", spec: "Forest green oversized graphic t-shirt", fabric: "100% Combed Cotton", blueprintType: "jacket", image: "/streetwear/street4.jpeg" }
    ]
  },
  {
    id: "jackets",
    label: "Jackets",
    description: "Premium custom leather outerwear, showcasing everything from classic minimalist designs to distressed finishes and bold graphic prints.",
    subcategories: ["Bomber Jackets", "Softshell", "Puffer"],
    products: [
      { name: "WHOTF Green Leather Jacket", spec: "Green leather with white fluffy lettering", fabric: "Genuine Leather & Fleece", blueprintType: "jacket", image: "/jackets/jacket4.jpeg" },
      { name: "Classic Black Leather Jacket", spec: "Minimalist black leather zip-up jacket", fabric: "100% Genuine Leather", blueprintType: "jacket", image: "/jackets/jacket3.jpeg" },
      { name: "ERD Graphic Leather Jacket", spec: "Black leather with white skull graphic", fabric: "Premium Leather", blueprintType: "jacket", image: "/jackets/jacket7.jpeg" },
      { name: "Distressed Red Leather Jacket", spec: "Vintage worn-in red leather jacket", fabric: "Distressed Cowhide Leather", blueprintType: "jacket", image: "/jackets/jacket6.jpeg" }
    ]
  },
  {
    id: "gloves",
    label: "Gloves",
    description: "Performance and utility gloves covering cycling, gym training, tactical protection and unique skeletal graphic leather designs.",
    subcategories: ["Training Gloves", "Winter Gloves", "Sport Gloves"],
    products: [
      { name: "Kyncilor Gel Cycling Gloves", spec: "Half-finger with shock-absorbing gel", fabric: "Lycra & Microfiber", blueprintType: "gloves", image: "/gloves/glove1.jpeg" },
      { name: "Sai Di Ni Training Gloves", spec: "Black fingerless gym gloves", fabric: "Breathable Mesh & Neoprene", blueprintType: "gloves", image: "/gloves/glove2.jpeg" },
      { name: "Skeleton Full-Finger Gloves", spec: "Black leather with white bone pattern", fabric: "Genuine Leather", blueprintType: "gloves", image: "/gloves/glove3.jpeg" },
      { name: "Tactical Half-Finger Gloves", spec: "Reinforced knuckle protection", fabric: "Synthetic Leather & Nylon", blueprintType: "gloves", image: "/gloves/glove4.jpeg" }
    ]
  },
  {
    id: "jeans",
    label: "Jeans",
    description: "Fashion-forward denim featuring distressed straight legs, vintage baggy fits, sparkling embellishments and rhinestone details.",
    subcategories: ["Slim Fit", "Regular Fit", "Relaxed Fit"],
    products: [
      { name: "Distressed Knee Straight Jeans", spec: "Blue denim with ripped knees", fabric: "100% Cotton Denim", blueprintType: "pants", image: "/jeans/jean1.jpeg" },
      { name: "Grey Washed Baggy Jeans", spec: "Vintage grey wide-leg denim", fabric: "Stonewashed Denim", blueprintType: "pants", image: "/jeans/jean3.jpeg" },
      { name: "Rhinestone Embellished Jeans", spec: "Blue denim with crystal detailing", fabric: "Stretch Denim & Rhinestones", blueprintType: "pants", image: "/jeans/jean4.jpeg" },
      { name: "Black Sparkle Wide Leg Jeans", spec: "Black denim with subtle shimmer", fabric: "Premium Black Denim", blueprintType: "pants", image: "/jeans/jean5.jpeg" }
    ]
  },
  {
    id: "caps",
    label: "Caps",
    description: "Custom headwear including unique embroidered corduroy truckers, classic flat brim snapbacks and washed cotton dad hats.",
    subcategories: ["Baseball Caps", "Snapbacks", "Trucker Hats"],
    products: [
      { name: "Cupid Embroidered Trucker", spec: "Cream & green corduroy cap with cupid", fabric: "Cotton Corduroy", blueprintType: "shorts", image: "/cap/cap1.jpeg" },
      { name: "Classic Flat Brim Snapback", spec: "High-profile, 6-panel, flat visor", fabric: "Wool-Acrylic Blend", blueprintType: "shorts", image: "/cap/cap2.jpeg" },
      { name: "Mesh Trucker Hat", spec: "5-panel, foam front, snap closure", fabric: "Cotton Front + Mesh Back", blueprintType: "shorts", image: "/cap/cap3.jpeg" },
      { name: "Dad Hat Washed Cotton", spec: "Low-profile unstructured, slide adjuster", fabric: "100% Garment-Washed Cotton", blueprintType: "shorts", image: "/cap/cap4.jpeg" }
    ]
  },
  {
    id: "socks",
    label: "Socks",
    description: "Custom socks manufacturing spanning from athletic crew styles and low-cut invisible socks to compression sportswear and jacquard dress socks.",
    subcategories: ["Crew Socks", "Ankle Socks", "Athletic Socks"],
    products: [
      { name: "Halloween Spooky Crew Socks", spec: "Haunted house & glowing cat eyes knit", fabric: "Combed Cotton Blend", blueprintType: "tee", image: "/socks/sock5.jpg" },
      { name: "Nordic Fair Isle Knit Socks", spec: "Thick winter knit with geometric patterns", fabric: "Wool & Acrylic Blend", blueprintType: "shorts", image: "/socks/sock6.jpg" },
      { name: "Alligator Novelty Socks", spec: "Playful crocodile design with open mouth", fabric: "Breathable Cotton Knit", blueprintType: "pants", image: "/socks/sock3.jpg" },
      { name: "Alien Abduction UFO Socks", spec: "UFO beam graphic with 'TAKE ME AWAY!' text", fabric: "Premium Cotton Blend", blueprintType: "jacket", image: "/socks/sock4.jpg" }
    ]
  },
  {
    id: "garment-accessories",
    label: "Garment Accessories",
    description: "Finishing touches for your brand, including custom metallic zipper sliders, foiled cardstock hang tags, tubular drawstrings and assorted buttons.",
    subcategories: ["Tags & Labels", "Zippers & Buttons", "Drawstrings"],
    products: [
      { name: "Custom Zipper Sliders", spec: "Various metal and custom molded sliders", fabric: "Metal Alloy & Rubber", blueprintType: "tee", image: "/accessories/fabric5.webp" },
      { name: "Carbonado Foiled Hang Tags", spec: "Matte black card with copper foil logo", fabric: "Premium Cardstock", blueprintType: "jacket", image: "/accessories/fabric2.jpg" },
      { name: "Grey Tubular Drawstring", spec: "Braided grey cotton/poly cord spool", fabric: "Cotton Polyester Blend", blueprintType: "shorts", image: "/accessories/fabric3.jpg" },
      { name: "Assorted Custom Buttons", spec: "Mixed plastic and resin custom buttons", fabric: "Resin & Plastic", blueprintType: "pants", image: "/accessories/fabric4.webp" }
    ]
  },
  {
    id: "packing-bags",
    label: "Packing Bags",
    description: "Complete packaging solutions spanning from printed poly mailers and heavy-duty canvas totes to branded drawstring pouches and luxury gift boxes.",
    subcategories: ["Polymailers", "Tote Bags", "Drawstring Bags"],
    products: [
      { name: "Custom Printed Poly Mailer", spec: "10x13\" co-ex film, 2.5 mil thickness", fabric: "Co-Extruded LDPE Poly Film", blueprintType: "shorts", image: "/images/packing.jpg" },
      { name: "Heavy-Duty Canvas Tote", spec: "12oz natural canvas, reinforced handles", fabric: "100% Natural Canvas Cotton", blueprintType: "tee", image: "/images/packbag.jpg" },
      { name: "Branded Drawstring Pouch", spec: "30x40cm athletic gym bag style", fabric: "210D Rip-Stop Polyester", blueprintType: "pants", image: "/images/packingstuf.jpg" },
      { name: "Luxury Gift Box Set", spec: "Rigid box + magnetic closure lid", fabric: "1200 GSM Greyboard + Art Paper", blueprintType: "jacket", image: "/images/packing1.avif" }
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

              {/* Subcategories tags removed */}
            </div>
            {category.id === "gymwear" && (
              <div className="flex flex-wrap justify-center gap-4 my-6">
                <img src="/gymwear/gym1.jpeg" alt="Gymwear 1" className="h-48 w-auto object-cover rounded" />
                <img src="/gymwear/gym2.jpeg" alt="Gymwear 2" className="h-48 w-auto object-cover rounded" />
                <img src="/gymwear/gym3.jpeg" alt="Gymwear 3" className="h-48 w-auto object-cover rounded" />
                <img src="/gymwear/gym4.jpeg" alt="Gymwear 4" className="h-48 w-auto object-cover rounded" />
                <img src="/gymwear/gym5.jpeg" alt="Gymwear 5" className="h-48 w-auto object-cover rounded" />
                <img src="/gymwear/gym6.jpeg" alt="Gymwear 6" className="h-48 w-auto object-cover rounded" />
                <img src="/gymwear/gym7.jpeg" alt="Gymwear 7" className="h-48 w-auto object-cover rounded" />
              </div>
            )}

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