import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-blue-900 text-white">
      <div className="container py-14 text-center sm:py-20">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          Ready To Start Your Project?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:mt-5 sm:text-base md:text-lg">
          Contact our team today and receive a custom quotation
          tailored to your product specifications and production
          requirements.
        </p>

        <Link
          href="/get-quote"
          className="mt-7 inline-block w-full rounded-xl bg-white px-6 py-3 font-semibold text-blue-900 transition hover:bg-blue-100 sm:mt-8 sm:w-auto sm:px-8 sm:py-4 md:text-lg"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
