// // app/services/page.tsx
// import Image from "next/image";
// import FinalCTA from "../../components/sections/FinalCTA";
// import PageHero from "../../components/ui/PageHero"; 
// import SectionHeading from "../../components/ui/SectionHeading"; 

// export const metadata = {
//   title: "Premium Apparel Manufacturing Services - Speedx Industry",
// };

// interface OfferedServiceItem {
//   id: string;
//   title: string;
//   category: string;
//   desc: string;
//   moq: string;
//   materials: string[];
//   capabilities: string[];
//   image: string;
// }

// interface SolutionItem {
//   title: string;
//   desc: string;
//   tag: string;
//   image: string;
//   specs: string[];
// }

// interface BrandingModuleItem {
//   id: string;
//   title: string;
//   subtitle: string;
//   desc: string;
//   techniques: string[];
//   specs: string[];
//   badge: string;
// }

// export default function Services() {
//   const detailedServices: OfferedServiceItem[] = [
//     {
//       id: "01",
//       title: "Premium Streetwear",
//       category: "Luxury & Lifestyle",
//       desc: "High-end urban garments with precise drop-shoulder silhouettes, heavy-weight drapes, specialized vintage pigment washes, and distressed aesthetics engineered for luxury streetwear labels.",
//       moq: "50 Pcs / Design",
//       materials: ["360-500 GSM French Terry", "Heavy Luxury Combed Cotton", "Loopback Knit"],
//       capabilities: ["Acid & Enzyme Washes", "Distressed Edges", "Custom Oversized Fits"],
//       image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       id: "02",
//       title: "Performance Sportswear",
//       category: "Technical Athletic",
//       desc: "Engineered athletic apparel optimized for maximum mobility, heat dissipation, and rugged turf endurance. Built strictly to survive rigorous professional athletic deployment.",
//       moq: "100 Pcs / Design",
//       materials: ["Moisture-Wicking Polyester", "Interlock Spandex", "Recycled Ocean Nylon"],
//       capabilities: ["Anti-Odor Infusion", "4-Way Flatlock Stitching", "Mesh Ventilation Panels"],
//       image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       id: "03",
//       title: "Fitness & Gym Gear",
//       category: "Active Wear",
//       desc: "High-compression training garments that shape, support, and breathe during high-intensity gym routines. Designed to withstand sweat acidity and repeated stretch tension loops.",
//       moq: "100 Pcs / Design",
//       materials: ["Nylon-Spandex Blends", "Brushed Butter Soft Poly", "Ribbed Seamless Fabric"],
//       capabilities: ["Squat-Proof Structural Integrity", "Seamless Knit Tech", "High Elasticity Belts"],
//       image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       id: "04",
//       title: "Casual & Essentials",
//       category: "Retail Blanks",
//       desc: "Everyday retail essentials engineered for premium private labels. Features clean neckline layouts, pre-shrunk properties, and superior fabric memory retention after repeated washes.",
//       moq: "50 Pcs / Design",
//       materials: ["100% Organic Ring-Spun Cotton", "CVC Blends", "Bamboo Cotton Terry"],
//       capabilities: ["Pre-Shrunk Bio-Wash", "Twin-Needle Topstitching", "Silicone Softening"],
//       image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       id: "05",
//       title: "Teamwear & Outerwear",
//       category: "Enterprise Apparel",
//       desc: "Heavy-duty custom jackets, tracksuits, and uniform systems crafted for athletic clubs, technical crews, and corporate promotional deployments.",
//       moq: "30 Pcs / Design",
//       materials: ["Waterproof Taslan Nylon", "Polar Fleece Lining", "Hard-Shell Softshell Poly"],
//       capabilities: ["Windproof Seam Sealing", "Thermal Down Injection", "Laser Cut Zipper Tracks"],
//       image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       id: "06",
//       title: "Combat & Fight Wear",
//       category: "Extreme Sports",
//       desc: "Ultra-reinforced compression gear, rashguards, and training shorts tailored for martial arts academies, boxing stables, and professional MMA promotions worldwide.",
//       moq: "50 Pcs / Design",
//       materials: ["Heavyweight Sublimated Lycra", "Tear-Resistant Ripstop Poly", "Neoprene Zones"],
//       capabilities: ["Triple-Reinforced Inseams", "Silicone Waistband Grippers", "Split Side Panels"],
//       image: "https://images.unsplash.com/photo-1517438476312-10d79c07750d?auto=format&fit=crop&w=600&q=80"
//     }
//   ];

//   const brandingModules: BrandingModuleItem[] = [
//     {
//       id: "M1",
//       title: "Advanced Printing Labs",
//       subtitle: "Industrial Fabric Inking Systems",
//       desc: "High-grade industrial printing layouts built for rich color profiles. We engineer everything from liquid-soft screen prints to photorealistic patterns that survive industrial laundry cycles without surface cracking.",
//       techniques: ["Industrial Screen Printing", "Direct To Garment (DTG)", "Vibrant Sublimation Gas Info", "High-Elasticity Silicone Inks"],
//       specs: ["Pantone Solid Matching", "Zero-Crack Ink Formula", "100+ Machine Wash Lifespan"],
//       badge: "Inking Hub"
//     },
//     {
//       id: "M2",
//       title: "Premium Embroidery & Relief",
//       subtitle: "Multi-Head Computerized Framing",
//       desc: "Heavy-duty high-stitch count embroidery modules designed to execute heavy structural texturing. Perfect for placing dense custom surfaces on heavyweight French Terry hoodies and streetwear blanks.",
//       techniques: ["3D Puff Textured Relief", "Flat Satin Metallic Stitches", "Micro-Woven Towel Patches", "Applique & Tackle Twill Layouts"],
//       specs: ["Zero-Pucker Backing Tech", "Tajima High-Speed Precision", "High-Tensile Poly Threads"],
//       badge: "Stitch Lab"
//     },
//     {
//       id: "M3",
//       title: "Custom Fabrics & Hardware Setup",
//       subtitle: "Bespoke Textiles, Washes & Trims",
//       desc: "Complete luxury transformation loops. From vintage mineral and acid washes that give fabric its soft luxury weight feel, down to custom laser-etched drawcords and branded metal zippers.",
//       techniques: ["Vintage Mineral & Acid Washes", "Enzyme Silicone Softening", "Custom Laser-Etched Eyelets", "Heavy Gauge Matte Zippers & Snaps"],
//       specs: ["Custom GSM Fabric Knitting", "Anti-Shrink Processing", "Corrosion-Proof Heavy Metals"],
//       badge: "Trims & Textile"
//     },
//     {
//       id: "M4",
//       title: "Private Label Integration",
//       subtitle: "Complete Brand Identity Kits",
//       desc: "Airtight branding loops designed to ready your inventory for international retail setups. We custom produce and stitch high-density neck patches, custom side tags, and brand bags.",
//       techniques: ["High-Density Satin Neck Labels", "Micro-Woven Bottom Hem Tags", "Frosted Slider Zipper Polybags", "Thick Cardboard Retail Hangtags"],
//       specs: ["Custom Brand Font Sizing", "Eco-Friendly Material Options", "Retail Barcode Deployment Ready"],
//       badge: "Full Branding Pack"
//     }
//   ];

//   return (
//     <section className="bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      
//       {/* 1. Cinematic Hero Section */}
//       <PageHero 
//         title="Manufacturing Services"
//         description="Speedx Industry engineered an advanced clothing production loop for premium global streetwear labels, technical sportswear brands, and private enterprise networks."
//         videoSrc="/hero.mp4"
//         overlayClass="bg-blue-950/40 backdrop-blur-[2px]"
//       />

//       {/* 2. Detailed "What We Offer" Catalog Section */}
//       <div className="container py-24 lg:py-32 relative overflow-hidden bg-white">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
//         <SectionHeading 
//           title="What We Offer"
//           description="From complex pattern engineering to custom fabric blend creation, we handle everything under strict enterprise timelines."
//           center={true}
//         />

//         <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
//           {detailedServices.map((service) => (
//             <div 
//               key={service.id} 
//               className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-500 hover:border-blue-500/50 hover:bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]"
//             >
//               <div>
//                 {/* Header Image Frame */}
//                 <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
//                   {/* Category Pill Tag */}
//                   <div className="absolute top-3 left-3 bg-white/90 border border-slate-200 backdrop-blur-md text-slate-800 text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-md shadow-sm">
//                     {service.category}
//                   </div>
                  
//                   {/* Dynamic Serial Counter */}
//                   <div className="absolute bottom-3 right-3 text-3xl font-black text-white/40 tracking-tighter">
//                     {service.id}
//                   </div>
//                 </div>

//                 {/* Core Title Details */}
//                 <div className="mt-5">
//                   <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-300">
//                     {service.title}
//                   </h3>
//                   <p className="mt-2 text-xs leading-relaxed text-slate-600">
//                     {service.desc}
//                   </p>
//                 </div>

//                 {/* Material Pill List Block */}
//                 <div className="mt-4 space-y-1">
//                   <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Premium Fabrics:</div>
//                   <div className="flex flex-wrap gap-1">
//                     {service.materials.map((mat) => (
//                       <span key={mat} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
//                         {mat}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Industrial Capabilities Bullet Checklist */}
//                 <div className="mt-4 space-y-1">
//                   <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stitch & Tech Treatment:</div>
//                   <ul className="space-y-1">
//                     {service.capabilities.map((cap) => (
//                       <li key={cap} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
//                         <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0" />
//                         {cap}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Card Base Information Footer */}
//               <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
//                 <div className="text-[11px] text-slate-500 font-medium">
//                   Min Order Loop:
//                 </div>
//                 <div className="text-xs font-bold text-blue-600 bg-blue-5 border border-blue-200 px-2.5 py-1 rounded-lg">
//                   {service.moq}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 3. INTEGRATED SECTION: Printing, Embroidery & Everything Custom Labs */}
//       <div className="bg-slate-50 border-t border-b border-slate-200 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

//         <div className="container py-24 lg:py-32 relative z-10">
//           <SectionHeading 
//             title="Apparel Branding & Decoration Labs"
//             description="Our specialized customization systems handle everything from heavy printing ink depths to absolute 3D puff embroidery structures."
//             center={true}
//           />

//           <div className="mt-16 grid gap-8 md:grid-cols-2">
//             {brandingModules.map((mod) => (
//               <div 
//                 key={mod.id} 
//                 className="group bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_15px_35px_rgba(59,130,246,0.06)] hover:-translate-y-1"
//               >
//                 <div>
//                   {/* Card Header Module */}
//                   <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//                     <div>
//                       <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{mod.subtitle}</span>
//                       <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 group-hover:text-blue-600 transition-colors duration-300">
//                         {mod.title}
//                       </h3>
//                     </div>
//                     <span className="text-xs font-bold bg-blue-50 border border-blue-100 text-blue-600 px-2.5 py-1 rounded-lg shrink-0">
//                       {mod.badge}
//                     </span>
//                   </div>

//                   {/* Core Description Text */}
//                   <p className="mt-4 text-xs leading-relaxed text-slate-600">
//                     {mod.desc}
//                   </p>

//                   {/* Available Techniques Grid */}
//                   <div className="mt-6 space-y-1.5">
//                     <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Customizations:</div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       {mod.techniques.map((tech) => (
//                         <div key={tech} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 p-2 rounded-xl">
//                           <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
//                           <span className="leading-tight">{tech}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Industrial Benchmarks Footer Specs */}
//                 <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
//                   {mod.specs.map((spec) => (
//                     <span key={spec} className="text-[10px] font-semibold text-blue-700 bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-md">
//                       ✓ {spec}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 4. Core Manufacturing Solutions Section */}
//       <div className="bg-white relative">
//         <div className="container py-24 lg:py-32 relative z-10">
//           <SectionHeading 
//             title="Core Manufacturing Solutions"
//             description="Industrial facilities customized to scale volume loops without dropping quality thresholds."
//             center={true}
//           />

//           <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
//             {[
//               {
//                 title: "Custom Manufacturing",
//                 desc: "Fully customized premium apparel production engineered around heavy GSM fabrics, custom dropped shoulders, vintage acid washes, and specific brand measurements.",
//                 tag: "Bespoke Cut & Sew",
//                 image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80",
//                 specs: ["Custom Tech-Packs", "Heavy Fleece & French Terry", "Streetwear Fits"],
//               },
//               {
//                 title: "OEM Manufacturing",
//                 desc: "High-volume white-label manufacturing loops for fast-growing sportswear brands. Hand over your specifications under airtight, international NDA protection.",
//                 tag: "Mass Scale Facility",
//                 image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
//                 specs: ["Pre-Shrunk Processing", "Automated Cutting Layouts", "Bulk Sizing Runs"],
//               },
//               {
//                 title: "Private Label Setup",
//                 desc: "Complete custom branding kits. We design, produce, and stitch premium satin neck patches, micro-woven labels, laser-etched hardware, and thick card tags.",
//                 tag: "Full Identity Kit",
//                 image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
//                 specs: ["Silicon Neck Prints", "Custom Heavy Hangtags", "Woven Hem Labels"],
//               },
//               {
//                 title: "Premium Packaging Modules",
//                 desc: "Protect your retail items with custom frosted slider zip-locks, bio-degradable eco bags, custom tissue wrap inserts, and moisture-proof master shipping cartons.",
//                 tag: "Export Ready Standard",
//                 image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
//                 specs: ["Frosted Zipper Bags", "Custom Branded Boxes", "Barcoded Layouts"],
//               },
//             ].map((item: SolutionItem) => (
//               <div
//                 key={item.title}
//                 className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 transition-all duration-500 hover:border-blue-500/50 hover:bg-white hover:shadow-[0_10px_30px_rgba(59,130,246,0.08)]"
//               >
//                 <div className="relative w-full md:w-[42%] h-56 md:h-auto min-h-[220px] overflow-hidden bg-slate-100">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/80 via-transparent to-transparent md:from-white md:via-transparent" />
//                   <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
//                     {item.tag}
//                   </div>
//                 </div>

//                 <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-300">
//                       {item.title}
//                     </h3>
//                     <p className="mt-3 text-xs leading-relaxed text-slate-600">
//                       {item.desc}
//                     </p>
//                   </div>
                  
//                   <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 gap-2">
//                     {item.specs.map((spec) => (
//                       <div key={spec} className="flex items-center gap-2 text-[11px] font-medium text-slate-700">
//                         <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
//                         {spec}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 5. Production Sequencer Line Section */}
//       <div className="bg-slate-50 border-t border-slate-200 relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.05),transparent_50%)]" />
        
//         <div className="container py-24 lg:py-32 relative z-10">
//           <SectionHeading 
//             title="The Production Sequence"
//             description="A highly structured assembly architecture built to eliminate errors and lock down delivery deadlines."
//             center={true}
//           />

//           <div className="mt-16 relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
//             <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

//             {[
//               { title: "Design Audit", note: "Tech-Pack Blueprint Validation" },
//               { title: "Pre-Bulk Sampling", note: "Fit Patterns & Fabric Lock" },
//               { title: "Precision Assembly", note: "Smart Cutting & Stitching Runs" },
//               { title: "AQL Quality Inspection", note: "Triple Micro Error Audits" },
//               { title: "Global Shipping Freight", note: "Ocean & Air Freight Gate" },
//             ].map((step, index) => (
//               <div key={step.title} className="relative z-10 text-center group">
//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 text-base font-bold text-slate-800 shadow-sm group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-md">
//                   0{index + 1}
//                 </div>
//                 <h4 className="mt-5 text-base font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-300">
//                   {step.title}
//                 </h4>
//                 <p className="mt-2 text-[11px] text-slate-600 leading-normal max-w-[180px] mx-auto">
//                   {step.note}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 6. Why Choose Us Section */}
//       <div className="container py-20 lg:py-28 border-t border-slate-200 bg-white">
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {[
//             { metric: "Flexible MOQ Solutions", info: "Scalable volumes for start-up testing runs" },
//             { metric: "Premium Export Fabrics", info: "Heavy GSM options up to luxury weights" },
//             { metric: "Worldwide Tracking Cargo", info: "Direct air and ocean logistics lines" },
//             { metric: "Direct Executive Support", info: "Instant status tracking logs via WhatsApp" },
//           ].map((item) => (
//             <div
//               key={item.metric}
//               className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-center hover:bg-white hover:border-blue-500/30 transition-all duration-300 hover:shadow-sm"
//             >
//               <div className="text-blue-600 font-bold text-base tracking-tight">
//                 {item.metric}
//               </div>
//               <div className="mt-2 text-xs text-slate-600 leading-relaxed">
//                 {item.info}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 7. Final Conversion Call To Action */}
//       <FinalCTA />
//     </section>
//   );
// }
// app/services/page.tsx
import Image from "next/image";
import FinalCTA from "../../components/sections/FinalCTA";
import PageHero from "../../components/ui/PageHero"; 
import SectionHeading from "../../components/ui/SectionHeading"; 
import FactoryShowcase from "../../components/sections/FactoryShowcase";

export const metadata = {
  title: "B2B Apparel Manufacturing & Sourcing Solutions - Speedx Industry",
  description: "Certified clothing manufacturer for global streetwear, athletic wear, and private labels. Complete tech-pack execution with strict quality control.",
};

interface ManufacturingCategory {
  id: string;
  title: string;
  segment: string;
  desc: string;
  moq: string;
  fabrics: string[];
  specs: string[];
  image: string;
}

interface CapabilityModule {
  id: string;
  title: string;
  division: string;
  desc: string;
  options: string[];
  benchmarks: string[];
  badge: string;
}

interface B2BWorkflowStep {
  step: string;
  title: string;
  process: string;
}

export default function Services() {
  
  // 1. Core Manufacturing Verticals (What brands can manufacture)
  const productionCategories: ManufacturingCategory[] = [
    {
      id: "01",
      title: "Luxury Streetwear Division",
      segment: "High-End Retail Blanks",
      desc: "Precision-engineered urban garments featuring drop-shoulder silhouettes, heavy-weight custom drapes, vintage pigment washes, and distressed alignments built for high-tier streetwear labels.",
      moq: "50 Pcs / Position",
      fabrics: ["360-500 GSM French Terry", "100% Combed Luxury Cotton", "Loopback Knit Fabrics"],
      specs: ["Acid & Enzyme Vintage Washes", "Custom Pattern Cut & Sew", "Distressed Edge Executions"],
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "02",
      title: "Technical Sportswear",
      segment: "Athletic & Performance",
      desc: "Engineered activewear built to withstand high stretch loops and intense athletic conditions. Developed strictly according to performance tech-pack specifications.",
      moq: "100 Pcs / Design",
      fabrics: ["Moisture-Wicking Polyester", "Interlock Spandex Blends", "Recycled Ocean Nylon"],
      specs: ["4-Way Flatlock Seam Stitching", "Anti-Odor & Dry-Fit Infusions", "Mesh Airflow Panels"],
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "03",
      title: "High-Compression Gym Gear",
      segment: "Active Lifestyle Wear",
      desc: "Premium compression wear that offers structural muscle support, high elasticity, and moisture management for modern gym and fitness brands.",
      moq: "100 Pcs / Design",
      fabrics: ["Nylon-Spandex Heavy Blends", "Brushed Butter-Soft Poly", "Ribbed Seamless Fabric"],
      specs: ["Squat-Proof Structural Integrity", "Seamless Knitting Technology", "High-Elasticity Belts"],
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "04",
      title: "Premium Casual Essentials",
      segment: "Private Label Everyday",
      desc: "High-turnover retail essentials engineered for everyday private labels. Exceptional fabric memory retention and premium hand-feel post repeated commercial washes.",
      moq: "50 Pcs / Design",
      fabrics: ["100% Organic Ring-Spun Cotton", "Premium CVC Blends", "Bamboo Cotton Terry"],
      specs: ["Pre-Shrunk Bio-Wash Treatment", "Twin-Needle Topstitching", "Silicone Softening Cycles"],
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "05",
      title: "Teamwear & Outerwear Solutions",
      segment: "Heavy-Duty Utility",
      desc: "Custom jackets, tracksuits, and weatherproof uniform layouts crafted for professional clubs, racing crews, and luxury lifestyle outerwear releases.",
      moq: "30 Pcs / Design",
      fabrics: ["Waterproof Taslan Nylon", "Thermal Polar Fleece", "Hard-Shell Softshell Poly"],
      specs: ["Windproof Seam Sealing", "Thermal Down Layer Injection", "Laser-Cut Zipper Tracks"],
      image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "06",
      title: "Combat & Fight Wear",
      segment: "Extreme Sports Gear",
      desc: "Ultra-reinforced compression gear, rashguards, and heavy-duty MMA training shorts tailored for fight academies and premium combat equipment brands.",
      moq: "50 Pcs / Design",
      fabrics: ["Heavyweight Sublimated Lycra", "Tear-Resistant Ripstop Poly", "Neoprene Impact Zones"],
      specs: ["Triple-Reinforced Inseams", "Silicone Anti-Slip Waistbands", "High-Leg Split Side Panels"],
      image: "https://images.unsplash.com/photo-1517438476312-10d79c07750d?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // 2. Industrial Decoration & Customization Labs (Printing, Embroidery, Hardware, Labels)
  const customizationLabs: CapabilityModule[] = [
    {
      id: "L1",
      title: "Advanced Printing Labs",
      division: "Industrial Textile Decoration",
      desc: "High-volume industrial fabric inking machinery configured for rich color density. We execute retail-ready print layouts that guarantee absolute durability without surface peeling.",
      options: ["Plastisol & Discharge Screen Printing", "Photorealistic 1200 DPI DTG", "Full-Surface Gas Sublimation", "3D Raised Puff Printing", "High-Elasticity Silicone Gel Tech"],
      benchmarks: ["Exact Pantone Matching", "Zero-Crack Ink Layering", "Certified 100+ Wash Life Cycle"],
      badge: "Inking Facility"
    },
    {
      id: "L2",
      title: "Premium Embroidery Hub",
      division: "Multi-Head Computerized Framing",
      desc: "High-density stitch count embroidery modules engineered for heavy fabric configurations. Perfect for placing clean, dimensional reliefs on heavy luxury cotton and fleece.",
      options: ["3D Puff Embroidery Profiles", "Flat Satin Metallic Stitching", "Custom Micro-Woven Towel Patches", "Tackle Twill & Applique Work", "Chenille Textured Badges"],
      benchmarks: ["Tajima™ High-Speed Precision Head Layouts", "Zero-Pucker Backing Profiles", "High-Tensile Industrial Poly Threads"],
      badge: "Stitch Division"
    },
    {
      id: "L3",
      title: "Custom Fabrics & Hardware",
      division: "Textile Mill Sourcing & Trims",
      desc: "Complete custom material development loops. We source custom GSM yarn weaves and finish them with specialized washes, combined with laser-etched premium hardware accessories.",
      options: ["Bespoke GSM Fabric Knitting", "Vintage Mineral, Acid & Oil Washes", "Enzyme Matte Softening Treatments", "Laser-Etched Metal Eyelets & Aglets", "Heavy-Gauge Custom Zipper Tracks"],
      benchmarks: ["SGS Approved Fabric Testing", "Anti-Shrinkage Memory Processing", "Corrosion-Proof Plated Base Metals"],
      badge: "Textiles & Trims"
    },
    {
      id: "L4",
      title: "Private Label Setup",
      division: "End-to-End Brand Identity Kits",
      desc: "Full integration of brand assets to prepare garments directly for commercial retail distribution. Complete execution of internal and external touchpoints under tight tolerances.",
      options: ["High-Density Satin Neck Labels", "Micro-Woven Bottom Hem Tags", "Screen-Printed Clean Sizing Labels", "Thick Cardboard Retail Hangtags", "Frosted Slider Zipper Polybags"],
      benchmarks: ["Laser-Straight Edge Stitching", "Eco-Friendly Recycled Packaging Available", "Retail Barcode System Alignment Ready"],
      badge: "Full Branding Pack"
    }
  ];

  // 3. Structured B2B Onboarding Sequence (How brands work with you)
  const b2bWorkflow: B2BWorkflowStep[] = [
    { step: "01", title: "Tech-Pack & Design Submission", process: "Send us your custom vector files, measurement charts, or physical reference samples. Our engineering team conducts a strict structural production analysis." },
    { step: "02", title: "Pre-Bulk Sampling Phase", process: "We source your requested fabric blend and manufacture a physical fit sample. This step locks in sizing accuracy, fabric weight, and custom printing or embroidery details." },
    { step: "03", title: "Airtight NDA & Production Lock", process: "Your brand designs are fully protected under signed international Non-Disclosure Agreements. Once the sample is approved, raw material procurement and scheduling begin." },
    { step: "04", title: "Bulk Mass Production & AQL Audit", process: "Fabric cutting, panel printing, high-speed stitching, and embroidery occur simultaneously. Every batch undergo strict multi-stage AQL 2.5 quality control inspections." },
    { step: "05", title: "Worldwide Secure Cargo Shipping", process: "Garments are individually folded into branded frosted zipper bags and packed into moisture-proof master shipping cartons for direct global air or ocean freight distribution." }
  ];

  return (
    <section className="bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. Industrial B2B Hero Section */}
      <PageHero 
        title="Apparel Production Partner"
        description="Speedx Industry is a certified, full-scale clothing manufacturer providing premium cut & sew, custom printing, embroidery, and private label services for global clothing brands."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/50 backdrop-blur-[1px]"
      />

      {/* 2. Core Manufacturing Verticals Section */}
      <div className="container py-24 lg:py-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <SectionHeading 
          title="Our Production Portfolio"
          description="We manufacture clothing lines from scratch according to exact brand parameters. Select your category to begin manufacturing."
          center={true}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {productionCategories.map((service) => (
            <div 
              key={service.id} 
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-500 hover:border-blue-500/50 hover:bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.08)]"
            >
              <div>
                {/* Visual Cover Frame */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Segment Badge Tag */}
                  <div className="absolute top-3 left-3 bg-white/90 border border-slate-200 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                    {service.segment}
                  </div>
                  
                  {/* Dynamic Serial Identity */}
                  <div className="absolute bottom-3 right-3 text-3xl font-black text-white/30 tracking-tighter">
                    {service.id}
                  </div>
                </div>

                {/* Typography Block */}
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {service.desc}
                  </p>
                </div>

                {/* Technical Mill Fabric List */}
                <div className="mt-4 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Fabrics:</div>
                  <div className="flex flex-wrap gap-1">
                    {service.fabrics.map((fab) => (
                      <span key={fab} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {fab}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Structural Capabilities Checklist */}
                <div className="mt-4 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical Customizations:</div>
                  <ul className="space-y-1">
                    {service.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                        <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* B2B Minimum Order Quantity Constraints */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Baseline MOQ Loop:
                </div>
                <div className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                  {service.moq}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    

      {/* 3. CORE CUSTOMIZATION FACILITY: Printing, Embroidery, Hardware & Labels */}
      <div className="bg-slate-50 border-t border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container py-24 lg:py-32 relative z-10">
          <SectionHeading 
            title="Industrial Customization Divisions"
            description="Our heavy-duty facility integrates advanced printing inks, high-stitch embroidery setups, and precise custom trims under one production ecosystem."
            center={true}
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {customizationLabs.map((mod) => (
              <div 
                key={mod.id} 
                className="group bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_15px_35px_rgba(59,130,246,0.06)] hover:-translate-y-1"
              >
                <div>
                  {/* Division Header Layout */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{mod.division}</span>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 group-hover:text-blue-600 transition-colors duration-300">
                        {mod.title}
                      </h3>
                    </div>
                    <span className="text-xs font-bold bg-blue-50 border border-blue-100 text-blue-600 px-2.5 py-1 rounded-lg shrink-0">
                      {mod.badge}
                    </span>
                  </div>

                  {/* Core Capacity Description */}
                  <p className="mt-4 text-xs leading-relaxed text-slate-600">
                    {mod.desc}
                  </p>

                  {/* Operational Capabilities Framework */}
                  <div className="mt-6 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Production Tech:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.options.map((option) => (
                        <div key={option} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 p-2 rounded-xl">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="leading-tight">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quality / Industrial Benchmarks Output */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {mod.benchmarks.map((bench) => (
                    <span key={bench} className="text-[10px] font-semibold text-blue-700 bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-md">
                      ✓ {bench}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     

      {/* 4. Supply Chain Solutions & Formats */}
      <div className="bg-white relative">
        <div className="container py-24 lg:py-32 relative z-10">
          <SectionHeading 
            title="Flexible B2B Sourcing Frameworks"
            description="Whether you require complete bespoke Cut & Sew production loops or white-label high-volume solutions, we manage your supply chain seamlessly."
            center={true}
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {[
              {
                title: "Bespoke Cut & Sew Production",
                desc: "Full execution of your brand's unique patterns, specs, and measurements. Your team provides the tech packs, and our facility crafts the garments from scratch with extreme stitch precision.",
                tag: "Custom Manufacturing",
                image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80",
                specs: ["Custom Technical Patterns", "Tailored Fit Profiles", "Heavy GSM Fabric Developments"],
              },
              {
                title: "OEM / Volume Sourcing Loops",
                desc: "High-output production runs designed for scalable clothing lines. We offer stable raw material pricing and rapid repeat manufacturing capability under secure international trade terms.",
                tag: "Mass Scale Assembly",
                image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
                specs: ["Automated High-Speed Cutting", "Consistent Color-Lot Matching", "High Volume Tier Discounts"],
              },
              {
                title: "White Label & Private Tagging",
                desc: "Accelerate your market entry by utilizing our premium existing blanks. Customize the garments using high-density neck patches, custom side tags, and screen-printed interior branding.",
                tag: "Fast Turnaround Option",
                image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
                specs: ["Premium Blank Bases In-Stock", "Custom Relabeling Infrastructure", "Rapid Prototype Dispatch"],
              },
              {
                title: "Export Packaging Configurations",
                desc: "Protect your retail inventory during international transit. We wrap and bundle every piece under export-compliant guidelines ready for barcode scanners and warehouse sortation.",
                tag: "Retail Distribution Standard",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
                specs: ["Custom Frosted Zip Bags", "Master Carton Barcoding Layouts", "Moisture-Absorbent Packing Packs"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 transition-all duration-500 hover:border-blue-500/50 hover:bg-white hover:shadow-[0_10px_30px_rgba(59,130,246,0.08)]"
              >
                <div className="relative w-full md:w-[42%] h-56 md:h-auto min-h-[220px] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/80 via-transparent to-transparent md:from-white md:via-transparent" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                    {item.tag}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 gap-2">
                    {item.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-[11px] font-medium text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. B2B Client Workflow Onboarding Sequencer */}
      <div className="bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.05),transparent_50%)]" />
        
        <div className="container py-24 lg:py-32 relative z-10">
          <SectionHeading 
            title="The B2B Manufacturing Journey"
            description="A highly structured onboarding sequence engineered to remove sample errors, safeguard assets, and meet shipping deadlines."
            center={true}
          />

          <div className="mt-16 relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {b2bWorkflow.map((step, index) => (
              <div key={step.title} className="relative z-10 text-center group">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 text-base font-bold text-slate-800 shadow-sm group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-md">
                  {step.step}
                </div>
                <h4 className="mt-5 text-base font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-300">
                  {step.title}
                </h4>
                <p className="mt-2 text-[11px] text-slate-600 leading-relaxed max-w-[200px] mx-auto">
                  {step.process}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Commercial Terms & Guarantees Bar */}
      <div className="container py-20 lg:py-28 border-t border-slate-200 bg-white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { metric: "AQL 2.5 Quality Audits", info: "Multi-stage inline batch inspections before custom shipment packaging." },
            { metric: "Strict NDA Protection", info: "Your proprietary brand patterns and graphics are legally protected." },
            { metric: "Verified Customs Clearance", info: "Complete export paperwork logistics handling across European and North American ports." },
            { metric: "Real-Time Project Logistics", info: "Direct tracking communications through dedicated WhatsApp production managers." },
          ].map((item) => (
            <div
              key={item.metric}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-center hover:bg-white hover:border-blue-500/30 transition-all duration-300 hover:shadow-sm"
            >
              <div className="text-blue-600 font-bold text-base tracking-tight">
                {item.metric}
              </div>
              <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                {item.info}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Final Conversion B2B Conversion Hook */}
      <FinalCTA />
    </section>
  );
}