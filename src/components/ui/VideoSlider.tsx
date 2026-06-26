
"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

export interface VideoItem {
  title: string;
  description?: string;
  video: string;
}


const videoReviews: VideoItem[] = [
  {
    title: "Client Review 01",
    description: "On-camera feedback from a long-term apparel client.",
    video: "/review.mp4",
  },
  {
    title: "Client Review 02",
    description: "A second production testimonial from the floor.",
    video: "/sew1.mp4",
  },
  {
    title: "Client Review 03",
    description: "Project feedback shared during a manufacturing update.",
    video: "/printing1.mp4",
  },
  {
    title: "Client Review 04",
    description: "Final delivery review from the team and client side.",
    video: "/embroidery1.mp4",
  },
];

export default function VideoSlider() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const current = videoReviews[index];

  const prev = () => {
    setIndex((p) => (p === 0 ? videoReviews.length - 1 : p - 1));
    setPlaying(false);
  };

  const next = () => {
    setIndex((p) => (p === videoReviews.length - 1 ? 0 : p + 1));
    setPlaying(false);
  };

  useEffect(() => {
    setPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [index]);

  const handlePlay = () => {
    setPlaying(true);

    setTimeout(() => {
      videoRef.current?.play();
    }, 50);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-6">

      <div className="relative flex items-center justify-center">

        {/* LEFT */}
        <button
          onClick={prev}
          className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-10
          bg-white shadow-md border border-slate-200 rounded-full w-11 h-11 flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>

        {/* CARD */}
        <article className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">

          <div className="relative aspect-video bg-black">

            {/* PLAY OVERLAY */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <button
                  onClick={handlePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:border-blue-600 text-white shadow-2xl z-30"
                >
                  <FaPlay className="text-white text-xl sm:text-2xl ml-1" />
                </button>
              </div>
            )}

            {/* VIDEO */}
            <video
              ref={videoRef}
              key={current.video}
              className="h-full w-full object-cover"
              controls
              muted
              playsInline
            >
              <source src={current.video} type="video/mp4" />
            </video>

          </div>

          <div className="p-5 text-center">
            <h3 className="text-lg font-semibold">{current.title}</h3>
            {current.description && (
              <p className="text-sm text-slate-500 mt-1">
                {current.description}
              </p>
            )}
          </div>

        </article>

        {/* RIGHT */}
        <button
          onClick={next}
          className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-10
          bg-white shadow-md border border-slate-200 rounded-full w-11 h-11 flex items-center justify-center"
        >
          <FaChevronRight />
        </button>

      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-5">
        {videoReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setPlaying(false);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-blue-600" : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}