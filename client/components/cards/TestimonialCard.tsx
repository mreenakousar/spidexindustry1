import Card from "../ui/Card";

interface Testimonial {
  client: string;
  company: string;
  quote: string;
}

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <p className="leading-relaxed italic text-slate-600">&#8220;{t.quote}&#8221;</p>
      <div className="mt-4 font-semibold text-slate-900">{t.client}</div>
      <div className="text-sm text-slate-500">{t.company}</div>
    </Card>
  );
}
