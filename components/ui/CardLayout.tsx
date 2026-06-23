import React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "primary" | "pending" | "secondary";
  children: React.ReactNode;
}

export default function CardLayout({ children, className = "" }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[clamp(8px,1vw,10px)] p-[clamp(1.25rem,2.5vw,2rem)]",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
