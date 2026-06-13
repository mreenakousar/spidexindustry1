
import Image from "next/image";
import FinalCTA from "../../components/sections/FinalCTA";
import CountUpNumber from "../../src/components/ui/CountUpNumber";

export const metadata = {
  title: "Factory & Production - Speedx Industry",
};

const processSteps = [
  {
    step: "01",
    title: "Design",
    image: "/process/design.jpg",
    description:
      "Clients share concepts, sketches, references, or existing samples for development.",
  },
  {
    step: "02",
    title: "Tech Pack Review",
    image: "/process/tech-pack.jpg",
    description:
      "Our team reviews measurements, materials, trims, artwork, and production requirements.",
  },
  {
    step: "03",
    title: "Sampling",
    image: "/process/sampling.jpg",
    description:
      "Samples are produced and approved before moving into bulk production.",
  },
  {
    step: "04",
    title: "Production",
    image: "/process/production.jpg",
    description:
      "Bulk manufacturing begins using modern machinery and skilled operators.",
  },
  {
    step: "05",
    title: "QC Inspection",
    image: "/process/qc.jpg",
    description:
      "Every order undergoes strict quality control and inspection procedures.",
  },
  {
    step: "06",
    title: "Packaging",
    image: "/process/packaging.jpg",
    description:
      "Products are packed securely according to client branding requirements.",
  },
  {
    step: "07",
    title: "Shipping",
    image: "/process/shipping.jpg",
    description:
      "Orders are shipped worldwide using reliable logistics partners.",
  },
];

const departments = [
  {
    title: "Cutting Department",
    image: "/factory/cutting.jpg",
  },
  {
    title: "Sewing Department",
    image: "/factory/sewing.jpg",
  },
  {
    title: "Embroidery Department",
    image: "/factory/embroidery.jpg",
  },
  {
    title: "Printing Department",
    image: "/factory/printing.jpg",
  },
  {
    title: "Packing Area",
    image: "/factory/packing.jpg",
  },
  {
    title: "Warehouse",
    image: "/factory/warehouse.jpg",
  },
];

const machines = [
  {
    name: "Tajima Embroidery Machines",
    quantity: "8 Units",
    image: "/machinery/tajima.jpg",
  },
  {
    name: "Industrial Sewing Machines",
    quantity: "25 Units",
    image: "/machinery/sewing-machine.jpg",
  },
  {
    name: "Overlock Machines",
    quantity: "12 Units",
    image: "/machinery/overlock.jpg",
  },
  {
    name: "DTF Printers",
    quantity: "2 Units",
    image: "/machinery/dtf.jpg",
  },
  {
    name: "Heat Press Machines",
    quantity: "4 Units",
    image: "/machinery/heatpress.jpg",
  },
  {
    name: "Sublimation Setup",
    quantity: "3 Units",
    image: "/machinery/sublimation.jpg",
  },
];

const videos = [
  {
    title: "Sewing Process",
    src: "/videos/sewing.mp4",
  },
  {
    title: "Embroidery Running",
    src: "/videos/embroidery.mp4",
  },
  {
    title: "DTF Printing",
    src: "/videos/dtf.mp4",
  },
  {
    title: "Packaging Process",
    src: "/videos/packaging.mp4",
  },
];

export default function FactoryProductionPage() {
  return (
    <section className="bg-white">
      {/* Hero Section with Video Background */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-blue-950/70 z-10" />

        {/* Hero Content */}
        <div className="container relative z-20 py-14 sm:py-20 lg:py-24">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Factory & Production
          </h1>

          <p className="mt-5 max-w-3xl text-base text-blue-100 sm:mt-6 sm:text-lg">
            Explore our manufacturing facility, production process,
            machinery, quality control systems, and factory operations
            that help us deliver premium garments worldwide.
          </p>
        </div>
      </div>

      {/* Stats */}
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
              <p className="mt-2 text-slate-600">
                Monthly Capacity
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="20+" /></h3>
              <p className="mt-2 text-slate-600">
                Countries Served
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Manufacturing Process */}
      <div className="container py-14 sm:py-20 lg:py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Manufacturing Process
          </h2>

          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            A transparent production workflow trusted by brands
            worldwide.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-52 sm:h-60 md:h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <span className="text-blue-700 font-bold text-sm">
                  STEP {item.step}
                </span>

                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Factory Gallery */}
      <div className="bg-slate-50">
        <div className="container py-14 sm:py-20 lg:py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Factory Gallery
            </h2>

            <p className="mt-4 text-sm text-slate-600 sm:text-base">
              Inside our production facility.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {departments.map((dept) => (
              <div
                key={dept.title}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
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
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {dept.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Machinery */}
      <div className="container py-14 sm:py-20 lg:py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Machinery & Equipment
          </h2>

          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            Modern machinery ensuring precision and efficiency.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {machines.map((machine) => (
            <div
              key={machine.name}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
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

      {/* Production Videos */}
      <div className="bg-blue-50">
        <div className="container py-14 sm:py-20 lg:py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Production Videos
            </h2>

            <p className="mt-4 text-sm text-slate-600 sm:text-base">
              Watch our production process in action.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:gap-8">
            {videos.map((video) => (
              <div
                key={video.title}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <video
                  controls
                  className="h-52 w-full object-cover sm:h-64 md:h-80"
                >
                  <source src={video.src} type="video/mp4" />
                </video>

                <div className="p-5 sm:p-6">
                  <h3 className="text-base font-semibold sm:text-lg">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Factory Information */}
      <div className="container py-24">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold">
              Factory Information
            </h3>

            <ul className="mt-6 space-y-4 text-slate-600">
              <li>📍 Location: Sialkot, Pakistan</li>
              <li>🏭 Factory Size: <CountUpNumber value="10,000+" className="inline-block" /> Sq Ft</li>
              <li>👥 Workforce: <CountUpNumber value="40+" className="inline-block" /> Employees</li>
              <li>📦 Capacity: <CountUpNumber value="25,000+" className="inline-block" /> Pieces Monthly</li>
              <li>🌎 Export Markets Worldwide</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold">
              Quality Assurance
            </h3>

            <ul className="mt-6 space-y-4 text-slate-600">
              <li>✓ Fabric Inspection</li>
              <li>✓ In-Line Inspection</li>
              <li>✓ AQL Quality Control</li>
              <li>✓ Final Product Check</li>
              <li>✓ Secure Packaging</li>
              <li>✓ Shipment Verification</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
    <FinalCTA/>
    </section>
  );
}