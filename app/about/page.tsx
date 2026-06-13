
import Image from "next/image";
import FinalCTA from "../../components/sections/FinalCTA";
import CountUpNumber from "../../src/components/ui/CountUpNumber";

export const metadata = {
  title: "About Us - Speedx Industry",
};

const teamMembers = [
  {
    name: "Muhammad Ali",
    role: "Chief Executive Officer",
    image: "/team/ceo.jpg",
  },
  {
    name: "Ahmed Khan",
    role: "Production Manager",
    image: "/team/production-manager.jpg",
  },
  {
    name: "Usman Tariq",
    role: "Quality Control Manager",
    image: "/team/qc-manager.jpg",
  },
  {
    name: "Sales Team",
    role: "International Client Support",
    image: "/team/sales-team.jpg",
  },
];

export default function About() {
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
          <source src="/hero2.mp4" type="video/mp4" />
          {/* Fallback color if video fails to load */}
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-blue-950/70 z-10" />

        {/* Hero Content */}
        <div className="container relative z-20 py-14 sm:py-20">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            About Speedx Industry
          </h1>

          <p className="mt-5 max-w-3xl text-base text-blue-100 sm:mt-6 sm:text-lg">
            Speedx Industry is a trusted clothing manufacturing company
            specializing in premium custom apparel, private label production,
            OEM manufacturing, and worldwide export solutions for brands,
            startups, and wholesalers.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="container py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Our Story
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
              Speedx Industry was founded with a vision to provide premium
              quality garment manufacturing services to brands worldwide.
              Through years of dedication, innovation, and continuous
              improvement, we have built a reputation for delivering
              high-quality products, reliable production timelines, and
              exceptional customer service.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Today we proudly serve international clothing brands, startups,
              sportswear companies, gym wear labels, and fashion businesses
              seeking dependable manufacturing partners.
            </p>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-2xl shadow-xl sm:h-[360px] md:h-[420px]">
            <Image
              src="/factory/factory-main.jpg"
              alt="Speedx Industry Factory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-50">
        <div className="container py-12 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="10+" /></h3>
              <p className="mt-2 text-slate-600">
                Years Experience
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="25,000+" />
              </h3>
              <p className="mt-2 text-slate-600">
                Monthly Production Capacity
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="40+" /></h3>
              <p className="mt-2 text-slate-600">
                Skilled Workers
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl"><CountUpNumber value="20+" /></h3>
              <p className="mt-2 text-slate-600">
                Countries Served
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Factory Information */}
      <div className="container py-14 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Factory Information
            </h3>

            <ul className="mt-6 space-y-4 text-slate-600">
              <li>
                📍 Location: Sialkot, Pakistan
              </li>

              <li>
                🏭 Factory Size: <CountUpNumber value="10,000+" className="inline-block" /> sq ft
              </li>

              <li>
                👥 Workforce: <CountUpNumber value="40+" className="inline-block" /> Skilled Professionals
              </li>

              <li>
                📦 Monthly Capacity: <CountUpNumber value="25,000+" className="inline-block" /> Pieces
              </li>

              <li>
                🌍 Export Markets: USA, UK, Europe,
                Australia & Middle East
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Quality Standards
            </h3>

            <ul className="mt-6 space-y-4 text-slate-600">
              <li>✓ Fabric Inspection</li>
              <li>✓ In-Line Quality Control</li>
              <li>✓ AQL Sampling Inspection</li>
              <li>✓ Final Product Verification</li>
              <li>✓ Secure Packaging Standards</li>
              <li>✓ International Shipping Compliance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-slate-50">
        <div className="container py-14 sm:py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Meet Our Team
            </h2>

            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Our experienced team ensures smooth production,
              strict quality control, and professional customer
              support for every project.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-56 sm:h-64 md:h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 text-center sm:p-6">
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {member.name}
                  </h3>

                  <p className="text-blue-700 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
     <FinalCTA/>
    </section>
  );
}