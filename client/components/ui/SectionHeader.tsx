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
    <div className="mx-auto mb-16 max-w-5xl px-4 text-center sm:mb-20 sm:px-0 md:mb-24">

      {/* Small Label */}
      <div className="section-header-anim mb-4 inline-flex items-center gap-2 sm:mb-6 sm:gap-3">
        <div className="h-px w-8 bg-zinc-700 sm:w-12" />

        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-[10px] uppercase tracking-[0.3em] text-transparent sm:text-xs md:text-sm md:tracking-[0.4em]">
          {label}
        </span>

        <div className="h-px w-8 bg-zinc-700 sm:w-12" />
      </div>

      {/* Heading */}
      <h2 className="section-header-anim text-3xl font-black uppercase tracking-tight leading-[0.92] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-7xl xl:text-8xl">
        <span className="block text-blue-500">{title1}</span>

        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600">
          {title2}
        </span>
      </h2>

      {/* Description */}
      <p className="section-header-anim mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-base md:mt-8 md:max-w-3xl md:text-xl">
        {description}
      </p>
    </div>
  );
}