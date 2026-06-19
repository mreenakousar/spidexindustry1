import Card from "../ui/Card";

interface Service {
  id: string;
  title: string;
  description: string;
  moq: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="p-5 transition-shadow hover:border-primary/30 hover:shadow-md sm:p-6">
      <h4 className="text-base font-semibold text-primary sm:text-lg">{service.title}</h4>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">{service.description}</p>
      <div className="mt-4 text-xs font-medium text-slate-500 sm:text-sm">
        Min. Order: {service.moq} units
      </div>
    </Card>
  );
}
