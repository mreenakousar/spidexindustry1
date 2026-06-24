"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionHeader from "../ui/SectionHeader";
import FootballAnimation from "../ui/FootballAnimation";
import CountUpNumber from "../ui/CountUpNumber";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "John Smith",
    company: "Sportswear Brand - USA",
    video: "/review.mp4",
    thumbnail: "/thumbnails/review1.jpg",
  },
  {
    name: "Ahmed Khan",
    company: "Fitness Apparel - UAE",
    video: "/review.mp4",
    thumbnail: "/thumbnails/review2.jpg",
  },
  {
    name: "James Wilson",
    company: "Streetwear Brand - UK",
    video: "/review.mp4",
    thumbnail: "/thumbnails/review3.jpg",
  },
  {
    name: "Michael Brown",
    company: "Gym Wear Brand - Canada",
    video: "/reviews/review4.mp4",
    thumbnail: "/thumbnails/review4.jpg",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeVideos, setActiveVideos] = useState<{ [key: number]: boolean }>({});
  const handlePlayVideo = (index: number) => {
    setActiveVideos((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="testimonial-header">
          <SectionHeader
            label="Testimonials"
            title1="What Our Clients"
            title2="Say About Us"
            description="Real feedback from international brands that trusted us with their apparel manufacturing."
          />
          <FootballAnimation className="absolute top-20 left-10 w-12 h-12 pointer-events-none z-20" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 lg:mt-14">
          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              <CountUpNumber value="500+" />
            </h3>
            <p className="text-slate-600 mt-2">Orders Delivered</p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              <CountUpNumber value="50+" />
            </h3>
            <p className="text-slate-600 mt-2">Countries Served</p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              <CountUpNumber value="98%" />
            </h3>
            <p className="text-slate-600 mt-2">Satisfaction Rate</p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              <CountUpNumber value="7+" />
            </h3>
            <p className="text-slate-600 mt-2">Years Experience</p>
          </div>
        </div>

        <div className="review-slider mt-16">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            className="rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            {reviews.map((review, index) => {
              const isPlaying = activeVideos[index];

              return (
                <SwiperSlide key={index}>
                  <div className="bg-white group relative">
                    <div
                      onClick={() => !isPlaying && handlePlayVideo(index)}
                      className="relative w-full h-[320px] sm:h-[420px] md:h-[550px] bg-black flex items-center justify-center cursor-pointer"
                    >
                      {!isPlaying ? (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <video
                            src={review.video}
                            preload="metadata"
                            poster={review.thumbnail}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-600 text-white shadow-2xl z-30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 ml-1 transition-transform group-hover:translate-x-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <video
                          autoPlay
                          controls
                          loop
                          playsInline
                          className="w-full h-full object-contain z-10 relative"
                        >
                          <source src={review.video} type="video/mp4" />
                        </video>
                      )}
                    </div>

                    <div className="p-8 text-center border-t border-slate-100">
                      <div className="text-yellow-400 text-2xl tracking-wider">
                        ★★★★★
                      </div>

                      <h3 className="text-2xl font-bold mt-3 text-slate-900">
                        {review.name}
                      </h3>

                      <p className="text-slate-500 font-medium mt-1">
                        {review.company}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}