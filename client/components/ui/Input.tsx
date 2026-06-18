import { forwardRef } from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                {...props}
                className={clsx(
                    "w-full rounded-lg border px-4 py-3 text-sm outline-none transition",
                    "bg-white text-slate-900 placeholder:text-slate-400",
                    "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:placeholder:text-slate-500",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    className
                )}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;