
import Image from "next/image";
import FinalCTA from "../../components/sections/FinalCTA";
import PageHero from "../../components/ui/PageHero";
import CountUpNumber from "../../components/ui/CountUpNumber";
import SectionHeading from "../../components/ui/SectionHeading";
import VideoCardGroup from "../../components/ui/VideoCardGroup";

export const metadata = {
  title: "Factory & Production - Speedx Industry",
};

interface ProcessStep {
  step: string;
  title: string;
  image: string;
  description: string;
}

interface Department {
  title: string;
  image: string;
}

interface Machine {
  name: string;
  quantity: string;
  image: string;
}

interface ProductionVideo {
  title: string;
  src: string;
}

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Design",
    image: "/images/cut.jpg",
    description: "Clients share concepts, sketches, references, or existing samples for development.",
  },
  {
    step: "02",
    title: "Tech Pack Review",
    image: "/images/sew.jpg",
    description: "Our team reviews measurements, materials, trims, artwork, and production requirements.",
  },
  {
    step: "03",
    title: "Sampling",
    image: "/images/sampling.jpg",
    description: "Samples are produced and approved before moving into bulk production.",
  },
  {
    step: "04",
    title: "Production",
    image: "/process/production.jpg",
    description: "Bulk manufacturing begins using modern machinery and skilled operators.",
  },
  {
    step: "05",
    title: "QC Inspection",
    image: "/process/qc.jpg",
    description: "Every order undergoes strict quality control and inspection procedures.",
  },
  {
    step: "06",
    title: "Packaging",
    image: "/process/packaging.jpg",
    description: "Products are packed securely according to client branding requirements.",
  },
  {
    step: "07",
    title: "Shipping",
    image: "/process/shipping.jpg",
    description: "Orders are shipped worldwide using reliable logistics partners.",
  },
];

const departments: Department[] = [
  { title: "Cutting Department", image: "/images/cut.jpg" },
  { title: "Sewing Department", image: "/images/sewing.jpg" },
  { title: "Embroidery Department", image: "/images/embroid.jpg" },
  { title: "Printing Department", image: "/images/print.jpg" },
  { title: "Packing Area", image: "/images/packing.jpg" },
  { title: "Warehouse", image: "/images/warehouse.jpg" },
];

const machines: Machine[] = [
  { name: "Tajima Embroidery Machines", quantity: "8 Units", image: "/images/tajima.jpg" },
  { name: "Industrial Sewing Machines", quantity: "25 Units", image: "/images/sewingmachine.jpg" },
  { name: "Overlock Machines", quantity: "12 Units", image: "/images/overlack.jpg" },
  { name: "DTF Printers", quantity: "2 Units", image: "/images/dtfprint.jpg" },
  { name: "Heat Press Machines", quantity: "4 Units", image: "/images/heatprint.jpg" },
  { name: "Sublimation Setup", quantity: "3 Units", image: "/images/print.jpg" },
];

const videos: ProductionVideo[] = [
  { title: "Sewing Process", src: "/sew.mp4" },
  { title: "Embroidery Running", src: "/embroidery1.mp4" },
  { title: "DTF Printing", src: "/printing1.mp4" },
  { title: "Packaging Process", src: "/packing.mp4" },
];

export default function FactoryProductionPage() {
  return (
    <section className="bg-white">
      <PageHero
        title="Factory & Production"
        description="Explore our manufacturing facility, production process, machinery, quality control systems and factory operations that help us deliver premium garments worldwide."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70"
      />

      <div className="bg-blue-50">
        <div className="container py-12 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="10+" /></h3>
              <p className="mt-2 text-slate-600">Years Experience</p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="40+" /></h3>
              <p className="mt-2 text-slate-600">Skilled Workers</p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="25,000+" /></h3>
              <p className="mt-2 text-slate-600">Monthly Capacity</p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="20+" /></h3>
              <p className="mt-2 text-slate-600">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50">
        <div className="container py-14 sm:py-20 lg:py-24">
          <SectionHeading
            title="Factory Gallery"
            description="Inside our production facility."
            center={true}
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {departments.map((dept: Department) => (
              <div
                key={dept.title}
                className="overflow-hidden rounded-2xl bg-blue-50/60 border border-blue-100/80 shadow-sm"
              >
                <div className="relative h-56 sm:h-64 md:h-72">
                  <Image
                    src={dept.image}
                    alt={dept.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold sm:text-xl text-slate-900">
                    {dept.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-14 sm:py-20 lg:py-24">
        <SectionHeading
          title="Machinery & Equipment"
          description="Modern machinery ensuring precision and efficiency."
          center={true}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {machines.map((machine: Machine) => (
            <div
              key={machine.name}
              className="overflow-hidden rounded-2xl bg-blue-50/60 border border-blue-100/80 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-56 sm:h-64 md:h-72">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {machine.name}
                </h3>

                <p className="mt-3 text-blue-700 font-medium">
                  Quantity: {machine.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50">
        <div className="container py-14 sm:py-20 lg:py-24">
          <SectionHeading
            title="Production Videos"
            description="Watch our production process in action."
            center={true}
          />

          <VideoCardGroup
            className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:gap-8"
            items={videos.map((video) => ({
              id: video.title,
              title: video.title,
              description: "",
              videoSrc: video.src,
              services: [],
            }))}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-slate-200 aspect-video lg:aspect-square relative w-full bg-slate-100">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>

          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built for Quality.
              <br />
              Trusted Worldwide.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Our manufacturing facility combines skilled craftsmanship,
              advanced production processes, and strict quality control to
              deliver premium sportswear for global brands.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Premium Fabric Sourcing",
                "Skilled Production Team",
                "Multi-Stage Quality Inspection",
                "Worldwide Export Capability",
              ].map((item) => (
                <div key={item} className="flex items-center">
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-slate-100 pt-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  <CountUpNumber value="10,000+" />
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Sq Ft Facility
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  <CountUpNumber value="40+" />
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Experts
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  <CountUpNumber value="25,000+" />
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Monthly Units
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  <CountUpNumber value="15+" />
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Export Markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FinalCTA />
    </section>
  );
}