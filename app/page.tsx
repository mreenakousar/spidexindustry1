import Hero from "../components/sections/Hero";
import ManufacturingCapabilities from "../components/sections/ManufacturingCapabilities";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import ProcessTimeline from "../components/sections/ProcessTimeline";
import FactoryShowcase from "../components/sections/FactoryShowcase";
import Stats from "../components/sections/Stats";
import PortfolioPreview from "../components/sections/PortfolioPreview";
import Testimonials from "../components/sections/Testimonials";
import FinalCTA from "../components/sections/FinalCTA";

export const metadata = {
  title: "Premium Custom Clothing Manufacturing | Home",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="container py-16">
        <ManufacturingCapabilities />
      </section>
      <section className="bg-white py-16">
        <div className="container">
          <WhyChooseUs />
          <ProcessTimeline />
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container">
          <FactoryShowcase />
          <Stats />
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container">

          <Testimonials />
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
