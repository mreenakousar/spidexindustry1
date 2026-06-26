import { ReactNode } from "react";

interface PageHeaderProps {
  /** Small uppercase badge above the title (e.g. "My Orders") */
  label: string;
  /** Main page heading rendered as <h1> — accepts string or JSX */
  title: ReactNode;
  /** Subtitle / description text */
  description?: string;
  /**
   * Visual theme.
   * - "dark"  → slate-900 background, white text (dashboard / my-orders style)
   * - "light" → white background, slate text (all other pages)
   * @default "light"
   */
  variant?: "dark" | "light";
  /** Optional right-side slot — refresh button, action links, etc. */
  children?: ReactNode;
}

/**
 * Reusable page heading banner used across all client-area pages.
 *
 * Usage (light):
 *   <PageHeader label="Invoices" title="Invoice dashboard" description="…" />
 *
 * Usage (dark + action slot):
 *   <PageHeader variant="dark" label="My Orders" title="Order Management" description="…">
 *     <RefreshButton />
 *   </PageHeader>
 */
export function PageHeader({
  label,
  title,
  description,
  variant = "light",
  children,
}: PageHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`relative overflow-hidden -mx-6 -mt-16 mb-6 md:mx-0 md:mt-0 md:mb-0 ${
        isDark
          ? "rounded-none bg-slate-900 border-b border-slate-800 shadow-sm p-6 pt-20 md:p-[clamp(1.25rem,2.5vw,2rem)]"
          : "rounded-none md:rounded-3xl bg-white border-b border-slate-100 md:border-none shadow-sm p-6 pt-20 md:p-8"
      }`}
    >
      {/* Right-side slot (e.g. refresh button) */}
      {children && (
        <div className="absolute top-4 right-4 md:top-0 md:right-0 md:p-4">{children}</div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {/* Section label */}
          <p
            className={`font-semibold uppercase tracking-[0.24em] ${
              isDark
                ? "text-[clamp(11px,1vw,12px)] text-sky-500"
                : "text-sm text-sky-600"
            }`}
          >
            {label}
          </p>

          {/* Main title */}
          <h1
            className={`font-semibold ${
              isDark
                ? "mt-3 text-[clamp(1.5rem,2.5vw,1.875rem)] text-white"
                : "mt-3 text-3xl text-slate-900"
            }`}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={`mt-2 ${
                isDark
                  ? "text-[clamp(13px,1.1vw,14px)] text-slate-300"
                  : "text-slate-600"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
