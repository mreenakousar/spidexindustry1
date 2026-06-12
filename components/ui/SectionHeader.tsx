type SectionHeaderProps = {
  label?: string;
  title1?: string;
  title2?: string;
  description?: string;
};

export default function SectionHeader({
  label = "Built For Global Brands",
  title1 = "Manufacturing",
  title2 = "Without Limits",
  description =
    "Advanced production facilities, skilled craftsmanship, and precision-driven quality control systems.",
}: SectionHeaderProps) {
  return (
    <div className="mb-24 max-w-5xl mx-auto text-center">

      {/* Small Label */}
      <div className="section-header-anim inline-flex items-center gap-3 mb-6">
        <div className="h-px w-12 bg-zinc-700" />

        <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          {label}
        </span>

        <div className="h-px w-12 bg-zinc-700" />
      </div>

      {/* Heading */}
      <h2 className="section-header-anim text-5xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]">
        <span className="block text-blue-500">{title1}</span>

        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600">
          {title2}
        </span>
      </h2>

      {/* Description */}
      <p className="section-header-anim mt-8 text-zinc-400 text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}