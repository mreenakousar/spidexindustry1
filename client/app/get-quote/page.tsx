import RFQForm from "../../components/forms/RFQForm";
import SectionHeading from "../../components/ui/SectionHeading";

export const metadata = { title: "Request a Quote - RFQ" };

export default function GetQuote() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl text-center">

        <SectionHeading
          title="Get a Quote"
          description="Provide some details and our production team will contact you with an estimate and next steps."
        />

        <div className="mt-10">
          <RFQForm />
        </div>

      </div>
    </section>
  );
}