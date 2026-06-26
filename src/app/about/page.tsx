
import Image from "next/image";
import FinalCTA from "@/components/sections/FinalCTA";
import CountUpNumber from "@/components/ui/CountUpNumber";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
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

      <PageHero
        title="About Spidex Industry"
        description="Spidex Industry is a trusted clothing manufacturing company specializing in premium custom apparel, private label production, OEM manufacturing, and worldwide export solutions for brands, startups, and wholesalers."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70"
      />

      <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading title="Our Story" />

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
              Spidex Industry is a trusted garment manufacturing company committed to
              delivering premium-quality apparel solutions to brands across the globe.
              With years of experience in the industry. we specialize in transforming
              ideas into high-quality finished products through precision, innovation
              and strict quality control at every stage of production.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              We proudly work with international clothing brands, startups, sportswear
              labels, gym wear companies and fashion businesses, offering complete
              manufacturing solutions including custom designs, bulk production and
              private labeling. Our focus is on reliability, timely delivery and
              building long-term partnerships based on trust and consistency.
            </p>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-2xl shadow-xl sm:h-[360px] md:h-[420px]">
            <Image
              src="/team/factory.png"
              alt="Speedx Industry Factory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

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

      {/* 5. Team Section */}
      <div className="bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">

          <SectionHeading
            title="The Visionaries Behind Spidex Industry"
            description="Driven by strategic vision and operational excellence, our leadership team unites design innovation with premium manufacturing to deliver top-tier custom apparel globally."
            center={true}
          />

          <div className="mx-auto mt-10 max-w-6xl px-4 sm:mt-12 sm:px-0">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-2 md:gap-6">

                <div className="relative flex flex-col items-center justify-center rounded-xl p-6 bg-white overflow-hidden border border-slate-100 shadow-sm transition-all duration-300">

                  <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-600 via-transparent to-blue-600 animate-[spin_5s_linear_infinite] -z-10" />
                  <div className="absolute inset-[2px] bg-white rounded-[10px] -z-10" />

                  <Image
                    src="/team/ceo.jpeg"
                    alt="Founder & CEO"
                    width={200}
                    height={200}
                    className="rounded-full object-cover mb-4 relative z-10 border-4 border-slate-100 shadow-inner"
                  />
                  <h4 className="text-xl font-bold text-slate-900 relative z-10">Founder &amp; CEO</h4>
                  <p className="mt-2 text-sm text-slate-600 text-center relative z-10">
                    Leading the vision and strategy, driving innovation and growth across the company.
                  </p>
                </div>

                <div className="relative flex flex-col items-center justify-center rounded-xl p-6 bg-white overflow-hidden border border-slate-100 shadow-sm transition-all duration-300">

                  <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-600 via-transparent to-blue-600 animate-[spin_5s_linear_infinite] -z-10" />
                  <div className="absolute inset-[2px] bg-white rounded-[10px] -z-10" />

                  <Image
                    src="/team/director.jpeg"
                    alt="Managing Director"
                    width={200}
                    height={200}
                    className="rounded-full object-cover mb-4 relative z-10 border-4 border-slate-100 shadow-inner"
                  />
                  <h4 className="text-xl font-bold text-slate-900 relative z-10">Managing Director</h4>
                  <p className="mt-2 text-sm text-slate-600 text-center relative z-10">
                    Overseeing operations and ensuring excellence in delivery and client satisfaction.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. CTA */}
      <FinalCTA />
    </section>
  );
}