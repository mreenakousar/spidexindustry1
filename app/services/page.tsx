
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

      {/* 1. Industrial B2B Hero Section - Rich Cobalt Identity overlay */}
      <PageHero
        title="Apparel Production Partner"
        description="Speedx Industry is a certified, full-scale clothing manufacturer providing premium cut & sew, custom printing, embroidery, and private label services for global clothing brands."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70 backdrop-blur-[1px]"
      />

      {/* 2. Core Manufacturing Verticals Section */}
      <div className="container py-24 lg:py-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <SectionHeading
          title="Our Production Portfolio"
          description="We manufacture clothing lines from scratch according to exact brand parameters. Select your category to begin manufacturing."
          center={true}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {productionCategories.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-blue-50/20 p-6 transition-all duration-500 hover:border-blue-600 hover:bg-white hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(37,99,235,0.09)]"
            >
              <div>
                {/* Visual Cover Frame */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent" />

                  {/* Segment Badge Tag */}
                  <div className="absolute top-4 left-4 bg-blue-600/95 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
                    {service.segment}
                  </div>

                  {/* Dynamic Serial Identity */}
                  <div className="absolute bottom-4 right-4 text-4xl font-black text-white/20 tracking-tighter font-mono">
                    {service.id}
                  </div>
                </div>

                {/* Typography Block */}
                <div className="mt-6">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-slate-600 font-medium">
                    {service.desc}
                  </p>
                </div>

                <div className="my-5 border-t border-dashed border-blue-100" />

                {/* Technical Mill Fabric List */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Available Fabrics</div>
                  <div className="flex flex-col gap-1.5">
                    {service.fabrics.map((fab) => (
                      <div key={fab} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-blue-50/60 border border-blue-100/40 px-3 py-1.5 rounded-xl transition-colors group-hover:bg-blue-50/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        {fab}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structural Capabilities Checklist */}
                <div className="mt-5 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Technical Customizations</div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.specs.map((spec) => (
                      <span key={spec} className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl bg-blue-600 text-white shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* B2B Framework Constraints - Dynamic Blue/White Footer Highlight */}
              <div className="mt-6 pt-4 border-t border-blue-50 flex items-center justify-between">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Sourcing Matrix
                </div>
                <div className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-lg shadow-inner">
                  {service.moq}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* 3. CORE CUSTOMIZATION FACILITY: Printing, Embroidery, Hardware & Labels */}
      <div className="bg-gradient-to-b from-blue-50/40 to-white border-t border-b border-blue-100/50 relative overflow-hidden">
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
                className="group bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)] hover:-translate-y-1"
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
                        <div key={option} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-blue-50/30 border border-blue-100/30 p-2 rounded-xl group-hover:border-blue-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          <span className="leading-tight">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quality / Industrial Benchmarks Output */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {mod.benchmarks.map((bench) => (
                    <span key={bench} className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
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
                className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-blue-50/10 transition-all duration-500 hover:border-blue-600 hover:bg-white hover:shadow-[0_15px_35px_rgba(37,99,235,0.07)]"
              >
                <div className="relative w-full md:w-[42%] h-56 md:h-auto min-h-[220px] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/90 via-transparent to-transparent md:from-white md:via-transparent" />
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
                      <div key={spec} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
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

      {/* 7. Final Conversion B2B Conversion Hook */}
      <FinalCTA />
    </section>
  );
}