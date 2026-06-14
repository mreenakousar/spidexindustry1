
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionHeader from "../ui/SectionHeader";
import CountUpNumber from "../../src/components/ui/CountUpNumber";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "John Smith",
    company: "Sportswear Brand - USA",
    video: "/review.mp4",
  },
  {
    name: "Ahmed Khan",
    company: "Fitness Apparel - UAE",
    video: "/review.mp4",
  },
  {
    name: "James Wilson",
    company: "Streetwear Brand - UK",
    video: "review.mp4",
  },
  {
    name: "Michael Brown",
    company: "Gym Wear Brand - Canada",
    video: "/reviews/review4.mp4",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".testimonial-header",
          start: "top 85%",
        },
      });

      gsap.from(".review-slider", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".review-slider",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
       <SectionHeader
  label="Testimonials"
  title1="What Our Clients"
  title2="Say About Us"
  description="Real feedback from international brands that trusted us with their apparel manufacturing."
/>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 lg:mt-14">
          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl"><CountUpNumber value="500+" /></h3>
            <p className="text-slate-600 mt-2">Orders Delivered</p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl"><CountUpNumber value="50+" /></h3>
            <p className="text-slate-600 mt-2">Countries Served</p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl"><CountUpNumber value="98%" /></h3>
            <p className="text-slate-600 mt-2">Satisfaction Rate</p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center shadow sm:p-6">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl"><CountUpNumber value="7+" /></h3>
            <p className="text-slate-600 mt-2">Years Experience</p>
          </div>
        </div>

        {/* Video Slider */}
        <div className="review-slider mt-16">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white">
                  <video
                    controls
                    preload="metadata"
                    className="h-[320px] w-full object-cover sm:h-[420px] md:h-[600px]"
                  >
                    <source
                      src={review.video}
                      type="video/mp4"
                    />
                  </video>

                  <div className="p-8 text-center">
                    <div className="text-yellow-400 text-2xl">
                      ★★★★★
                    </div>

                    <h3 className="text-2xl font-bold mt-3">
                      {review.name}
                    </h3>

                    <p className="text-slate-500 mt-1">
                      {review.company}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      
      </div>
    </section>
  );
}