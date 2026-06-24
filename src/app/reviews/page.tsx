
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoSlider, { VideoItem } from "@/components/ui/VideoSlider";


export default function ReviewsPage() {
  return (
    <section className="bg-white">

      <PageHero
        title="Client Video Reviews"
        description="Watch real video feedback from brands and teams."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70"
      />

      <div className="container py-14 sm:py-20 space-y-10">

        <SectionHeading
          title="What Clients Say"
          description="Swipe through real testimonials."
          center
        />

        <VideoSlider  />

      </div>

      <FinalCTA />
    </section>
  );
}