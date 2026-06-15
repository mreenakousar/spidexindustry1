// app/portfolio/page.tsx
import PortfolioPreview from "../../components/sections/PortfolioPreview";
import CountUpNumber from "../../src/components/ui/CountUpNumber";
import PageHero from "../../components/ui/PageHero";
import FinalCTA from "../../components/sections/FinalCTA";
import SectionHeading from "../../components/ui/SectionHeading"; // Reusable TSX component import kiya

export const metadata = {
  title: "Portfolio - Manufacturing Work"
};

interface VideoReview {
  name: string;
  video: string;
}

const videoReviews: VideoReview[] = [
  {
    name: "Sportswear Brand UK",
    video: "/videos/review1.mp4",
  },
  {
    name: "Local Client Karachi",
    video: "/videos/review2.mp4",
  },
  {
    name: "Fitness Apparel Startup",
    video: "/videos/review3.mp4",
  },
];

export default function Portfolio() {
  return (
    <section className="bg-white">

      <PageHero
        title="Our Manufacturing Portfolio"
        description="Premium sportswear, hoodies, jerseys, and custom apparel manufactured with top-tier precision for local and international brands."
        videoSrc="/hero.mp4"
      />

      <div className="container py-16 space-y-20">

        <div>
          <PortfolioPreview full />
        </div>

        <div className="bg-slate-50/60 rounded-3xl p-8 sm:p-12 border border-slate-100">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:gap-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/50 transition duration-300 hover:shadow-md">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="500+" />
              </h3>
              <p className="mt-2 font-medium text-slate-500">Completed Orders</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/50 transition duration-300 hover:shadow-md">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="100+" />
              </h3>
              <p className="mt-2 font-medium text-slate-500">Happy Clients</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/50 transition duration-300 hover:shadow-md">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="5+" /> <span className="text-xl sm:text-2xl font-bold">Years</span>
              </h3>
              <p className="mt-2 font-medium text-slate-500">Manufacturing Experience</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            title="Client Video Reviews"
            description="See what global brand owners say about our custom manufacturing quality."
            center={true}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {videoReviews.map((item: VideoReview, i: number) => (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src={item.video} type="video/mp4" />
                    Your browser does not support video.
                  </video>
                </div>

                <div className="p-5 text-center bg-white border-t border-slate-50">
                  <p className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. CTA */}
        <FinalCTA />
      </div>
    </section>
  );
}
