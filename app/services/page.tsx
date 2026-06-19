
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
  image?: string;
}

interface B2BWorkflowStep {
  step: string;
  title: string;
  process: string;
}

export default function Services() {

  const productionCategories: ManufacturingCategory[] = [
    {
      id: "01",
      title: "Luxury Streetwear Division",
      segment: "Premium Retail Blanks",
      desc: "Precision-engineered urban garments featuring drop-shoulder silhouettes, heavy-weight custom drapes, vintage pigment washes, and raw distressed alignments calibrated for high-tier streetwear labels.",
      moq: "No MOQ (Flexible Prototype & Production Loops)",
      fabrics: ["360-500 GSM Premium French Terry", "100% Combed Luxury Compact Cotton", "High-Density Loopback Knit Ecosystems"],
      specs: ["Acid, Mineral & Enzyme Vintage Washes", "Bespoke Pattern Engineering (Cut & Sew)", "Industrial Distressed & Frayed Edge Executions"],
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "02",
      title: "Technical Sportswear",
      segment: "Athletic & Performance",
      desc: "Engineered activewear built to withstand high stretch loops and intense athletic conditions. Developed strictly according to performance tech-pack specifications.",
      moq: "Flexible Capacity Models Available",
      fabrics: ["Moisture-Wicking Polyester", "Interlock Spandex Blends", "Recycled Ocean Nylon"],
      specs: ["4-Way Flatlock Seam Stitching", "Anti-Odor & Dry-Fit Infusions", "Mesh Airflow Panels"],
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "03",
      title: "High-Compression Gym Gear",
      segment: "Active Lifestyle Wear",
      desc: "Premium compression wear that offers structural muscle support, high elasticity, and moisture management for modern gym and fitness brands.",
      moq: "Flexible Capacity Models Available",
      fabrics: ["Nylon-Spandex Heavy Blends", "Brushed Butter-Soft Poly", "Ribbed Seamless Fabric"],
      specs: ["Squat-Proof Structural Integrity", "Seamless Knitting Technology", "High-Elasticity Belts"],
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "04",
      title: "Premium Casual Essentials",
      segment: "Private Label Everyday",
      desc: "High-turnover retail essentials engineered for everyday private labels. Exceptional fabric memory retention and premium hand-feel post repeated commercial washes.",
      moq: "Flexible Capacity Models Available",
      fabrics: ["100% Organic Ring-Spun Cotton", "Premium CVC Blends", "Bamboo Cotton Terry"],
      specs: ["Pre-Shrunk Bio-Wash Treatment", "Twin-Needle Topstitching", "Silicone Softening Cycles"],
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "05",
      title: "Teamwear & Outerwear Solutions",
      segment: "Heavy-Duty Utility",
      desc: "Custom jackets, tracksuits, and weatherproof uniform layouts crafted for professional clubs, racing crews, and luxury lifestyle outerwear releases.",
      moq: "Flexible Capacity Models Available",
      fabrics: ["Waterproof Taslan Nylon", "Thermal Polar Fleece", "Hard-Shell Softshell Poly"],
      specs: ["Windproof Seam Sealing", "Thermal Down Layer Injection", "Laser-Cut Zipper Tracks"],
      image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "06",
      title: "Combat & Fight Wear",
      segment: "Extreme Sports Gear",
      desc: "Ultra-reinforced compression gear, rashguards, and heavy-duty MMA training shorts tailored for fight academies and premium combat equipment brands.",
      moq: "Flexible Capacity Models Available",
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

  const b2bWorkflow: B2BWorkflowStep[] = [
    { step: "01", title: "Tech-Pack & Design Submission", process: "Send us your custom vector files, measurement charts, or physical reference samples. Our engineering team conducts a strict structural production analysis." },
    { step: "02", title: "Pre-Bulk Sampling Phase", process: "We source your requested fabric blend and manufacture a physical fit sample. This step locks in sizing accuracy, fabric weight, and custom printing or embroidery details." },
    { step: "03", title: "Airtight NDA & Production Lock", process: "Your brand designs are fully protected under signed international Non-Disclosure Agreements. Once the sample is approved, raw material procurement and scheduling begin." },
    { step: "04", title: "Bulk Mass Production & AQL Audit", process: "Fabric cutting, panel printing, high-speed stitching, and embroidery occur simultaneously. Every batch undergo strict multi-stage AQL 2.5 quality control inspections." },
    { step: "05", title: "Worldwide Secure Cargo Shipping", process: "Garments are individually folded into branded frosted zipper bags and packed into moisture-proof master shipping cartons for direct global air or ocean freight distribution." }
  ];

  return (
    <section className="bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">

      <PageHero
        title="Apparel Production Partner"
        description="Speedx Industry is a certified, full-scale clothing manufacturer providing premium cut & sew, custom printing, embroidery, and private label services for global clothing brands."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70 backdrop-blur-[1px]"
      />


      <div className="bg-white relative py-24 lg:py-32">
        <div className="container relative z-10 mx-auto px-4">
          <SectionHeading
            title="Our Production Portfolio"
            description="We manufacture clothing lines from scratch according to exact brand parameters. Select your category to begin manufacturing."
            center={true}
          />

          <div className="mt-20 grid gap-16 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {productionCategories.map((service) => (
              <div key={service.id} className="flex flex-col gap-6 group">
                <div className="w-full aspect-[16/11] overflow-hidden rounded-xl bg-slate-100 relative border border-slate-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    {service.segment}
                  </div>
                </div>

                <div className="px-1 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded shrink-0">
                        {service.moq}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-500 font-normal mb-6">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-3 pt-5 border-t border-slate-100">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Available Fabrics:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {service.fabrics.map((fab) => (
                          <div key={fab} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                            <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="leading-none">{fab}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-white relative py-24 lg:py-32">
        <div className="container relative z-10 mx-auto px-4">
          <SectionHeading
            title="Industrial Customization Divisions"
            description="Our heavy-duty facility integrates advanced printing inks, high-stitch embroidery setups, and precise custom trims under one production ecosystem."
            center={true}
          />

          <div className="mt-20 flex flex-col gap-12 max-w-5xl mx-auto">
            {customizationLabs.map((mod, index) => (
              <div
                key={mod.id}
                className={`flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch py-8 border-b border-slate-200 group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                <div className="w-full md:w-[40%] h-64 md:h-auto min-h-[240px] overflow-hidden rounded-xl bg-slate-100 relative">
                  <img
                    src={mod.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                    alt={mod.title}
                    className="w-full h-full object-cover grayscale opacity-90 contrast-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                        {mod.division}
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="text-xs font-medium text-slate-400">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300 mb-4">
                      {mod.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-500 max-w-xl">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="grid grid-cols-2 gap-2 max-w-md">
                      {mod.options.map((option) => (
                        <div key={option} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                          <span className="w-1 h-1 bg-blue-600 rounded-full" />
                          {option}
                        </div>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-slate-50/50 relative py-24 lg:py-32">
        <div className="container relative z-10 mx-auto px-4">
          <SectionHeading
            title="Flexible B2B Sourcing Frameworks"
            description="Whether you require complete bespoke Cut & Sew production loops or white-label high-volume solutions, we manage your supply chain seamlessly."
            center={true}
          />

          <div className="mt-20 grid gap-12 lg:grid-cols-2 max-w-7xl mx-auto">
            {[
              {
                title: "Bespoke Cut & Sew Production",
                desc: "Full execution of your brand's unique patterns, specs, and measurements. Your team provides the tech packs, and our facility crafts the garments from scratch with extreme stitch precision.",
                tag: "Custom Manufacturing",
                image: "https://images.unsplash.com/photo-1524295928322-4e92e4de7ff2?auto=format&fit=crop&w=1000&q=80",
                specs: ["Custom Technical Patterns", "Tailored Fit Profiles", "Heavy GSM Fabric Developments"],
              },
              {
                title: "OEM / Volume Sourcing Loops",
                desc: "High-output production runs designed for scalable clothing lines. We offer stable raw material pricing and rapid repeat manufacturing capability under secure international trade terms.",
                tag: "Mass Scale Assembly",
                image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1000&q=80",
                specs: ["Automated High-Speed Cutting", "Consistent Color-Lot Matching", "High Volume Tier Discounts"],
              },
              {
                title: "White Label & Private Tagging",
                desc: "Accelerate your market entry by utilizing our premium existing blanks. Customize the garments using high-density neck patches, custom side tags, and screen-printed interior branding.",
                tag: "Fast Turnaround Option",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
                specs: ["Premium Blank Bases In-Stock", "Custom Relabeling Infrastructure", "Rapid Prototype Dispatch"],
              },
              {
                title: "Export Packaging Configurations",
                desc: "Protect your retail inventory during international transit. We wrap and bundle every piece under export-compliant guidelines ready for barcode scanners and warehouse sortation.",
                tag: "Retail Distribution Standard",
                image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1000&q=80",
                specs: ["Custom Frosted Zip Bags", "Master Carton Barcoding Layouts", "Moisture-Absorbent Packing Packs"],
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-600/50 group"
              >
                <div className="w-full sm:w-[45%] h-64 sm:h-auto relative overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>


                    <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-500 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 space-y-2">
                    {item.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
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

      <div className="bg-gradient-to-b from-white to-blue-50/30 border-t border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.05),transparent_50%)]" />

        <div className="container py-24 lg:py-32 relative z-10">
          <SectionHeading
            title="The B2B Manufacturing Journey"
            description="A highly structured onboarding sequence engineered to remove sample errors, safeguard assets, and meet shipping deadlines."
            center={true}
          />

          <div className="mt-16 relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />

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
              className="rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 p-6 text-center hover:border-blue-600 transition-all duration-300 hover:shadow-sm"
            >
              <div className="text-blue-600 font-extrabold text-base tracking-tight">
                {item.metric}
              </div>
              <div className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                {item.info}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
    </section>
  );
}