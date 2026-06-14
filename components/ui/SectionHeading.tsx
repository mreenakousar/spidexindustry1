
import React from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  description,
  center = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${center ? "text-center mx-auto max-w-2xl" : "max-w-3xl"} ${className}`}>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
        {title}
      </h2>


      {description && (
        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base md:text-lg md:leading-7">
          {description}
        </p>
      )}
    </div>
  );
}