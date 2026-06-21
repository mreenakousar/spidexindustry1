import React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
            {eyebrow}
          </p>
        )}
        <h1 className={`text-3xl font-semibold text-slate-900 ${eyebrow ? "mt-3" : ""}`}>
          {title}
        </h1>
        {description && <p className="mt-2 text-slate-600">{description}</p>}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}
