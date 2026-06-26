
import Image from "next/image";
import { portfolio } from "@/data/site";
import SectionHeader from "../ui/SectionHeader";
import SectionHeading from "../ui/SectionHeading";

type Props = {
  full?: boolean;
};

export default function PortfolioPreview({ full = false }: Props) {
  const items = full ? portfolio : portfolio.slice(0, 6);

  return (
    <section className="mt-20">
      <SectionHeading
        title="Our Work & Portfolio"
        description="A collection of premium apparel projects crafted for global brands with precision, creativity, and high-end manufacturing standards."
        center={true}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="group overflow-hidden rounded-lg bg-blue-50/90 border border-blue-200 shadow-md transition-all duration-500 hover:shadow-xl hover:border-blue-400"
          >
            <div className="relative overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                width={600}
                height={400}
                className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-48 lg:h-52"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
            </div>

            <div className="p-3 sm:p-4 bg-blue-50/40 border-t border-blue-100/60">
              <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                {p.title}
              </h4>
              <p className="text-slate-600 mt-2 text-sm font-medium">
                {p.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}