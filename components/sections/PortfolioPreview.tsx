
import Image from "next/image";
import { portfolio } from "../../data/site";
import SectionHeader from "../ui/SectionHeader";
import SectionHeading from "../ui/SectionHeading";

type Props = {
  full?: boolean;
};

export default function PortfolioPreview({ full = false }: Props) {
  const items = full ? portfolio : portfolio.slice(0, 6);

  return (
    <section className="mt-20">

      {/* Header */}

      <SectionHeading
        title="Our Work & Portfolio"
        description="A collection of premium apparel projects crafted for global brands with precision, creativity, and high-end manufacturing standards."
        center={true}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                width={600}
                height={400}
                className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-48 lg:h-52"
              />


              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </div>

            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                {p.title}
              </h4>

              <p className="text-gray-400 mt-2 text-sm">
                {p.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}