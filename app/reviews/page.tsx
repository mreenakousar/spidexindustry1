import FinalCTA from "../../components/sections/FinalCTA";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";

export const metadata = {
  title: "Reviews - Client Video Testimonials",
};

interface ReviewVideo {
  title: string;
  description: string;
  video: string;
}

const reviewVideos: ReviewVideo[] = [
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

export default function ReviewsPage() {
  return (
    <section className="bg-white">
      <PageHero
        title="Client Video Reviews"
        description="Watch real video feedback from brands and teams who worked with our manufacturing setup, quality control, and export process."
        videoSrc="/hero.mp4"
        overlayClass="bg-blue-950/70"
      />

      <div className="container py-14 sm:py-20">
        <div className="space-y-10">
          <SectionHeading
            title="What Clients Say"
            description="Four short video reviews presented in a clean grid so the page stays consistent with the rest of the site."
            center
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {reviewVideos.map((review) => (
              <article
                key={review.title}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video bg-black">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={review.video} type="video/mp4" />
                    Your browser does not support video.
                  </video>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {review.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {review.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <FinalCTA />
    </section>
  );
}