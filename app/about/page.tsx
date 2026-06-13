
import Image from "next/image";
import FinalCTA from "../../components/sections/FinalCTA";
import CountUpNumber from "../../src/components/ui/CountUpNumber";
import PageHero from "../../components/ui/PageHero"; 
import SectionHeading from "../../components/ui/SectionHeading"; 
import {
  Factory,
  MapPin,
  Building2,
  Users,
  Package,
  Globe2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Us - Speedx Industry",
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
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
      
      {/* 1. Reusable Video Background Hero Section */}
      <PageHero 
        title="About Speedx Industry"
        description="Speedx Industry is a trusted clothing manufacturing company specializing in premium custom apparel, private label production, OEM manufacturing, and worldwide export solutions for brands, startups, and wholesalers."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70"
      />

      {/* 2. Company Story */}
      <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading title="Our Story" />

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

      {/* 3. Stats Section */}
      <div className="bg-blue-50">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="10+" />
              </h3>
              <p className="mt-2 text-slate-600">Years Experience</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="25,000+" />
              </h3>
              <p className="mt-2 text-slate-600">Monthly Production Capacity</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="40+" />
              </h3>
              <p className="mt-2 text-slate-600">Skilled Workers</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="20+" />
              </h3>
              <p className="mt-2 text-slate-600">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Factory Information & Quality Standards */}
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Side - Factory Video */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 aspect-video lg:aspect-square relative w-full bg-slate-100">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/factory.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Right Side - Production Excellence Details */}
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
                <div key={item} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-slate-900" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Inner Grid Core Metrics */}
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

      {/* 5. Team Section */}
      <div className="bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          
          <SectionHeading 
            title="Meet Our Team"
            description="Our experienced team ensures smooth production, strict quality control, and professional customer support for every project."
            center={true}
          />

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

                  <p className="text-blue-700 text-sm font-medium mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. CTA */}
      <FinalCTA />
    </section>
  );
}