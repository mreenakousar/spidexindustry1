import { LucideIcon } from "lucide-react";
import CountUpNumber from "./CountUpNumber";

interface StatCardProps {
  title: string;
  value: string | number;
  note?: string;
  icon?: LucideIcon;
  valueClassName?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  note,
  icon: Icon,
  valueClassName = "text-slate-900 dark:text-white",
  className = "",
}: StatCardProps) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <CountUpNumber
            value={value}
            className={`mt-4 text-3xl font-semibold ${valueClassName}`}
          />
        </div>
        {Icon ? (
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
      {note ? <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{note}</p> : null}
    </div>
  );
}
