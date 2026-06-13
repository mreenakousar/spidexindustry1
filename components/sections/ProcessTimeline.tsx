
import SectionHeader from "../ui/SectionHeader";
import Image from "next/image"; 

interface ProcessStep {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProcessTimeline() {
  const steps: ProcessStep[] = [
    {
      title: "Consultation",
      description: "Discuss fabric weights, tech packs, custom trims, and target project deadlines.",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80", 
    },
    {
      title: "Design Review",
      description: "Review vector artwork, 3D mockups, print placements, and embroidery mapping.",
      imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Sampling",
      description: "Physical prototype creation including pattern cutting to lock final fit approvals.",
      imageUrl: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Production",
      description: "Bulk manufacturing using high-GSM fabrics, heavy-duty stitching, and custom treatments.",
      imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Quality Inspection",
      description: "Strict multi-point checks checking measurements, loose threads, and printing durability.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Packaging",
      description: "Custom steam-ironing, brand tags attachments, and secure poly-bag sealing.",
      imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Worldwide Delivery",
      description: "Dispatched globally with tracking integrations via premium ocean or air cargo networks.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="mt-16 py-12">
      <SectionHeader
        label="Process"
        title1="Manufacturing"
        title2="Journey"
        description="From concept to delivery, every step is carefully managed to ensure premium quality and customer satisfaction."
      />

      <div className="relative max-w-7xl mx-auto mt-16 px-4 sm:px-6">
        
        {/* Center Line (Adjusted for image weight) */}
        <div className="absolute left-6 lg:left-1/2 top-0 h-full w-[2px] bg-primary/20 -translate-x-1/2"></div>

        <div className="space-y-16 lg:space-y-12">
          {steps.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.title}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center justify-between w-full group ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* 1. Balanced Spacer Column */}
                <div className="hidden lg:block w-[46%]" />

                {/* 2. Timeline Center Number Badge */}
                <div className="absolute left-0 lg:left-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold shadow-xl -translate-x-0 lg:-translate-x-1/2 transition-transform duration-300 group-hover:scale-110 border-2 border-slate-900">
                  {idx + 1}
                </div>

                {/* 3. High-End Image + Content Card Combined */}
                <div className="w-full lg:w-[46%] pl-14 lg:pl-0">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-white/10 lg:hover:scale-[1.01] shadow-2xl">
                    
                    {/* Inner Content Grid */}
                    <div className="flex flex-col sm:flex-row h-full">
                      
                      {/* Image Container */}
                      <div className="relative w-full sm:w-2/5 h-44 sm:h-auto min-h-[160px] overflow-hidden grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105">
                        <img
                          src={item.imageUrl}
                          alt={`${item.title} phase description visual`}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay to merge with dark theme vibe */}
                        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/40 to-transparent" />
                      </div>

                      {/* Text details container */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary tracking-wider uppercase mb-1">
                          Step 0{idx + 1}
                        </span>
                        
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}