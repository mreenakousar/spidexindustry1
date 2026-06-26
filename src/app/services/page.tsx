
import React from "react";
import Image from "next/image";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";
import FinalCTA from "../../components/sections/FinalCTA";
import VideoCardGroup from "../../components/ui/VideoCardGroup";

export const metadata = {
  title: "Custom Clothing Manufacturing Services | Speedx Industry",
  description:
    "Speedx Industry provides custom clothing manufacturing, private label apparel production, sportswear manufacturing, embroidery, printing, packaging and worldwide export services.",
};

interface ProductCategory {
  id: string;
  title: string;
  segment: string;
  description: string;
  image: string;
  features: string[];
}

interface ServiceModule {
  id: string;
  title: string;
  description: string;
  image: string;
  services: string[];
}

export default function ServicesPage() {
  const products: ProductCategory[] = [
    {
      id: "01",
      title: "Custom Sportswear",
      segment: "Sports Apparel",
      description:
        "Custom jerseys, shorts, tracksuits, training wear and sports uniforms manufactured according to your designs and branding requirements.",
      image: "/sportswear/sport3.jpeg",
      features: [
        "Sublimation Printing",
        "Custom Team Branding",
        "Dry-Fit Fabrics",
        "Private Label Production",
      ],
    },
    {
      id: "02",
      title: "Gym & Fitness Wear",
      segment: "Activewear",
      description:
        "Premium gym wear including compression garments, leggings, fitness tops and performance apparel for growing fitness brands.",
      image: "/gymwear/gym5.jpeg",
      features: [
        "4-Way Stretch Fabrics",
        "Moisture Wicking",
        "Custom Labels",
        "Bulk Production",
      ],
    },
    {
      id: "03",
      title: "Streetwear & Casual Wear",
      segment: "Fashion Apparel",
      description:
        "Oversized t-shirts, hoodies, sweatshirts, joggers and modern casual wear manufactured for fashion and streetwear brands.",
      image: "/img/3.jpeg",
      features: [
        "Heavy GSM Fabrics",
        "Embroidery",
        "Screen Printing",
        "Custom Sizing",
      ],
    },
    {
      id: "04",
      title: "Private Label Apparel",
      segment: "Brand Manufacturing",
      description:
        "Launch your own clothing brand with complete private label manufacturing including labels, tags, packaging and branding.",
      image: "/img/11.jpeg",
      features: [
        "Woven Labels",
        "Neck Labels",
        "Hang Tags",
        "Retail Packaging",
      ],
    },
    {
      id: "05",
      title: "Team Uniforms",
      segment: "Club & School Wear",
      description:
        "Custom uniforms for schools, sports clubs, academies, esports teams and organizations worldwide.",
      image: "/img/5.jpeg",
      features: [
        "Player Names",
        "Custom Numbers",
        "Sponsor Logos",
        "Bulk Orders",
      ],
    },
    {
      id: "06",
      title: "Jackets & Outerwear",
      segment: "Outerwear",
      description:
        "Custom varsity jackets, bomber jackets, windbreakers, fleece jackets and outerwear solutions.",
      image: "/jackets/jacket.jpeg",
      features: [
        "Embroidery",
        "Custom Patches",
        "Premium Hardware",
        "Custom Packaging",
      ],
    },
  ];

  const customizationServices: ServiceModule[] = [
    {
      id: "01",
      title: "Custom Printing",
      description:
        "High-quality garment printing solutions for fashion brands, sportswear labels and promotional apparel.",
      image: "/print.mp4",
      services: [
        "Screen Printing",
        "DTG Printing",
        "Sublimation",
        "Puff Printing",
        "Silicone Printing",
      ],
    },
    {
      id: "02",
      title: " Embroidery Services",
      description:
        "Professional embroidery solutions for premium apparel, uniforms and private label clothing brands.",
      image: "/embriodery.mp4",
      services: [
        "Flat Embroidery",
        "3D Puff Embroidery",
        "Chenille Patches",
        "Applique Work",
        "Custom Badges",
      ],
    },
    {
      id: "03",
      title: "Custom Fabrics & Trims",
      description:
        "Fabric sourcing and custom trims development according to your brand requirements.",
      image: "/fabric.mp4",
      services: [
        "Custom GSM",
        "Fabric Dyeing",
        "Custom Zippers",
        "Drawcords",
        "Metal Accessories",
      ],
    },
    {
      id: "04",
      title: "Private Label Branding",
      description:
        "Complete branding solutions to make your garments retail-ready.",
      image: "/privatelabelpacking.mp4",
      services: [
        "Woven Labels",
        "Printed Labels",
        "Hang Tags",
        "Custom Packaging",
        "Barcode Integration",
      ],
    },
  ];

  const manufacturingSolutions = [
    {
      title: "Cut & Sew Manufacturing",
      image: "/images/cut.jpg",
      description:
        "Manufacturing garments from scratch based on your tech packs, measurements and design specifications.",
    },
    {
      title: "OEM Production",
      image: "/images/embroid.jpg",
      description:
        "Large-scale production for established brands requiring consistent quality and reliable delivery schedules.",
    },
    {
      title: "White Label Solutions",
      image: "/img/7.jpeg",
      description:
        "Customize ready-made products with your branding for faster market entry.",
    },
    {
      title: "Packaging & Export",
      image: "/images/warehouse.jpg",
      description:
        "Retail-ready packaging and worldwide shipping support for international clients.",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Design Submission",
      desc: "Share your design, tech pack, logo, measurements or reference sample.",
    },
    {
      step: "02",
      title: "Sample Development",
      desc: "We create a sample for approval before bulk production begins.",
    },
    {
      step: "03",
      title: "Approval Process",
      desc: "Finalize sizing, fabric, branding, printing and packaging details.",
    },
    {
      step: "04",
      title: "Bulk Manufacturing",
      desc: "Production starts with strict quality control at every stage.",
    },
    {
      step: "05",
      title: "Quality Check & Shipping",
      desc: "Products are inspected, packed and shipped worldwide.",
    },
  ];

  return (
    <section className="bg-white">
      <PageHero
        title="Custom Clothing Manufacturing For Global Brands"
        description="Speedx Industry helps clothing brands manufacture custom sportswear, gym wear, streetwear, uniforms and private label apparel with complete branding and export solutions."
        videoSrc="/hero.mp4"
      />

      {/* Products */}
      <div className="container py-20">
        <SectionHeading
          title="Products We Manufacture"
          description="We manufacture apparel according to your designs, branding requirements and technical specifications."
          center={true}
        />

        <div className="grid gap-10 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  {item.segment}
                </span>

                <h3 className="text-xl font-bold mt-2 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-5">
                  {item.description}
                </p>

                <ul className="space-y-2">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-gray-700 flex items-center gap-2"
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customization */}
      <div className="bg-slate-50 py-20">
        <div className="container">
          <SectionHeading
            title="Customization & Branding Services"
            description="Everything your clothing brand needs to create a retail-ready product."
            center={true}
          />

          <VideoCardGroup
            className="grid gap-10 mt-16 md:grid-cols-2"
            items={customizationServices.map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              videoSrc: s.image,
              services: s.services,
            }))}
          />
        </div>
      </div>

      {/* Solutions */}
      <div className="container py-20">
        <SectionHeading
          title="Manufacturing Solutions"
          description="Flexible manufacturing options for startups, growing brands and established companies."
          center={true}
        />

        <div className="grid gap-8 mt-16 md:grid-cols-2">
          {manufacturingSolutions.map((item) => (
            <div
              key={item.title}
              className="border rounded-xl overflow-hidden bg-white"
            >
              <div className="relative h-60">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow */}
      <div className="bg-slate-50 py-20">
        <div className="container">
          <SectionHeading
            title="How We Manufacture Your Products"
            description="A simple and transparent process from design to delivery."
            center={true}
          />

          <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-5">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="text-center bg-white p-6 rounded-xl border"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>

                <h4 className="font-bold mt-4 mb-2">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="container py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Low MOQ Manufacturing",
              desc: "Perfect for startups and growing clothing brands.",
            },
            {
              title: "Private Label Solutions",
              desc: "Complete branding and packaging support.",
            },
            {
              title: "Strict Quality Control",
              desc: "Every order is inspected before shipment.",
            },
            {
              title: "Worldwide Shipping",
              desc: "Export-ready production for global customers.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border rounded-xl p-6 text-center"
            >
              <h3 className="font-bold text-blue-600 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
    </section>
  );
}
