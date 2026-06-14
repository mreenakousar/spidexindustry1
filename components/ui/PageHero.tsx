
import React from "react";

interface PageHeroProps {
  title: string;
  description?: string;
  videoSrc?: string;
  overlayClass?: string;
}

export default function PageHero({
  title,
  description,
  videoSrc = "/hero2.mp4",
  overlayClass = "bg-blue-950/70"
}: PageHeroProps) {
  return (
    <div className="relative bg-blue-900 text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dynamic Overlay */}
      <div className={`absolute inset-0 z-10 ${overlayClass}`} />

      {/* Hero Content */}
      <div className="container relative z-20 py-14 sm:py-20 md:py-24 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="mt-4 text-sm text-blue-100 sm:mt-6 sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}