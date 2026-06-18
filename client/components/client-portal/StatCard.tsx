import { LucideIcon } from "lucide-react";
import StatCard from "../../src/components/ui/StatCard";

export default function ClientPortalStatCard({
  icon: Icon,
  title,
  value,
  change,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
}) {
  return <StatCard icon={Icon} title={title} value={value} note={change} />;
}
