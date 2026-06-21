import React from "react";

interface FieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Field({ label, error, children, className = "" }: FieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      {children}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
