import PortfolioPreview from "../../components/sections/PortfolioPreview";
import CountUpNumber from "../../components/ui/CountUpNumber";
import PageHero from "../../components/ui/PageHero";
import FinalCTA from "../../components/sections/FinalCTA";
import SectionHeading from "../../components/ui/SectionHeading";
import VideoSlider from "../../components/ui/VideoSlider";

export const metadata = {
  title: "Portfolio - Manufacturing Work",
};

const sampleImages = [
  "/img/1.jpeg",
  "/img/2.jpeg",
  "/img/3.jpeg",
  "/img/4.jpeg",
  "/img/5.jpeg",
  "/img/6.jpeg",
   "/img/7.jpeg",
    "/img/8.jpeg",
     "/img/9.jpeg",
      "/img/10.jpeg",
       "/img/11.jpeg",
];

export default function Portfolio() {
  return (
    <section className="bg-white">

      <PageHero
        title="Our Manufacturing Portfolio"
        description="Premium sportswear, hoodies, jerseys and custom apparel manufactured with top-tier precision for local and international brands."
        videoSrc="/hero.mp4"
      />

      <div className="container py-16 space-y-20">

        {/* Sample Cards */}
        <div className="space-y-8">
          <SectionHeading
            title="Sample Work Gallery"
            description="A collection of our premium sample designs and manufacturing quality."
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleImages.map((img, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition"
              >
                <img
                  src={img}
                  alt={`Sample ${index + 1}`}
                  className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-50/60 rounded-3xl p-8 sm:p-12 border border-slate-100">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:gap-8">

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/50 hover:shadow-md transition">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="500+" />
              </h3>
              <p className="mt-2 text-slate-500">Completed Orders</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/50 hover:shadow-md transition">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="100+" />
              </h3>
              <p className="mt-2 text-slate-500">Happy Clients</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/50 hover:shadow-md transition">
              <h3 className="text-3xl font-bold text-blue-700 sm:text-4xl">
                <CountUpNumber value="5+" /> Years
              </h3>
              <p className="mt-2 text-slate-500">Experience</p>
            </div>

          </div>
        </div>

        {/* Video Reviews */}
        <div className="space-y-8">
          <SectionHeading
            title="Client Video Reviews"
            description="See what global brand owners say about our custom manufacturing quality."
            center
          />


          <VideoSlider />
        </div>

        <FinalCTA />

      </div>
    </section>
  );
}