import WhatsAppIcon from "./WhatsAppIcon";

interface WhatsAppWidgetProps {
  phone?: string;
  href?: string;
  label?: string;
}

const DEFAULT_PHONE = "+923414541200";
const DEFAULT_HREF = "https://wa.me/923414541200";
const DEFAULT_LABEL = "Chat with us";

export default function WhatsAppWidget({
  phone = DEFAULT_PHONE,
  href = DEFAULT_HREF,
  label = DEFAULT_LABEL,
}: WhatsAppWidgetProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} on WhatsApp ${phone}`}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 overflow-visible rounded-full bg-slate-950 px-4 py-3 text-white shadow-[0_18px_70px_-30px_rgba(15,23,42,0.95)] ring-1 ring-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 sm:bottom-8 sm:right-8"
    >
      <span className="absolute -top-12 right-1/2 hidden w-max -translate-x-1/2 rounded-full bg-slate-950 px-3 py-2 text-xs font-medium text-slate-100 shadow-lg shadow-slate-950/20 opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100 md:block">
        {label}
      </span>

      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-emerald-500/30 transition duration-300 group-hover:bg-emerald-600">
        <WhatsAppIcon className="h-5 w-5 animate-pulse" aria-hidden="true" />
      </span>

      <span className="hidden min-w-[90px] text-sm font-semibold tracking-tight text-white sm:inline">
        {label}
      </span>
    </a>
  );
}
