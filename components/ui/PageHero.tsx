
import React from "react";

interface PageHeroProps {
  title: string;
  description?: string; // Optional prop kyuki humne isme conditional check lagaya hua hai
  videoSrc?: string;     // Optional prop with a default value
  overlayClass?: string; // Optional prop with a default value
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
      <div className="container relative z-20 py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="mt-6 text-base text-blue-100 sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}