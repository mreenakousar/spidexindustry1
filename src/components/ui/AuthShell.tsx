import React from "react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthShell({
  eyebrow,
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <main className="container mx-auto px-4 py-12 sm:py-20">
      <div className="mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-primary/5 px-6 py-8 text-center sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h1>
          <p className="muted mx-auto mt-3 max-w-xl text-sm sm:text-base sm:mt-4">{description}</p>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          {children}
          <div className="mt-6 sm:mt-8">{footer}</div>
        </div>
      </div>
    </main>
  );
}
