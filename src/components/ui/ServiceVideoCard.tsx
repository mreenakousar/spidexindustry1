"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  services: string[];
  /** When provided, parent controls whether this card is the active one */
  isActive?: boolean;
  /** Called when the user presses play — parent should set this card as active */
  onActivate?: () => void;
}

export default function ServiceVideoCard({
  title,
  description,
  videoSrc,
  services,
  isActive,
  onActivate,
}: Props) {
  // Uncontrolled mode (no parent) — manage own playing state
  const [localPlaying, setLocalPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Controlled mode: if isActive prop provided, use it; else use local state
  const controlled = isActive !== undefined;
  const isPlaying = controlled ? isActive : localPlaying;

  // When parent deactivates this card, pause the video
  useEffect(() => {
    if (controlled && !isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setLocalPlaying(false);
    }
  }, [isActive, controlled]);

  const handlePlay = () => {
    onActivate?.(); // notify parent (stops other cards)
    if (!controlled) setLocalPlaying(true);
    // actual play happens after state update via useEffect or directly
    setTimeout(() => videoRef.current?.play(), 50);
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (!controlled) setLocalPlaying(false);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border">
      {/* Video */}
      <div className="relative h-64 group cursor-pointer">
        <video
          ref={videoRef}
          src={videoSrc}
          preload="metadata"
          playsInline
          loop
          className="w-full h-full object-cover"
          onClick={handlePause}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Play button — shown only when not playing */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:border-blue-600 text-white shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-7 h-7 sm:w-9 sm:h-9 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        {description && <p className="text-gray-600 mb-5">{description}</p>}
        {services.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {services.map((item) => (
              <div key={item} className="text-sm text-gray-700">
                ✓ {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
