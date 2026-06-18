import React from "react";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  neutral: "bg-slate-100 text-slate-700",
  info: "bg-sky-100 text-sky-700",
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function statusVariant(status: string): BadgeVariant {
  const normalized = status.toLowerCase();
  if (["completed", "paid", "approved", "delivered", "active"].includes(normalized)) {
    return "success";
  }
  if (["in production", "review", "in transit", "pending"].includes(normalized)) {
    return "warning";
  }
  if (["rejected", "failed", "cancelled"].includes(normalized)) {
    return "danger";
  }
  if (["open", "new"].includes(normalized)) {
    return "info";
  }
  return "neutral";
}
