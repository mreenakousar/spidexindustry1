"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountUpNumberProps = {
  value: string | number;
  className?: string;
  duration?: number;
  threshold?: number;
};

type ParsedCounter = {
  prefix: string;
  suffix: string;
  value: number;
  decimals: number;
};

function parseCounterValue(input: string | number): ParsedCounter | null {
  if (typeof input === "number") {
    if (!Number.isFinite(input)) {
      return null;
    }

    return {
      prefix: "",
      suffix: "",
      value: input,
      decimals: Number.isInteger(input)
        ? 0
        : Math.min(3, input.toString().split(".")[1]?.length ?? 0),
    };
  }

  const text = input.trim();

  if (!text || text.includes("/")) {
    return null;
  }

  const match = text.match(/^([^0-9-+]*?)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericText, suffix] = match;
  const value = Number(numericText.replace(/,/g, ""));

  if (!Number.isFinite(value)) {
    return null;
  }

  return {
    prefix,
    suffix,
    value,
    decimals: numericText.includes(".") ? numericText.split(".")[1].length : 0,
  };
}

function formatCounterValue(parsed: ParsedCounter, currentValue: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });

  return `${parsed.prefix}${formatter.format(currentValue)}${parsed.suffix}`;
}

export default function CountUpNumber({
  value,
  className = "",
  duration = 1200,
  threshold = 0.45,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const parsed = useMemo(() => parseCounterValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(() => {
    if (!parsed) {
      return String(value);
    }

    return formatCounterValue(parsed, 0);
  });

  useEffect(() => {
    if (!parsed) {
      setDisplayValue(String(value));
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(formatCounterValue(parsed, parsed.value));
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = parsed.value * easedProgress;

          setDisplayValue(formatCounterValue(parsed, currentValue));

          if (progress < 1) {
            animationRef.current = window.requestAnimationFrame(tick);
          } else {
            setDisplayValue(formatCounterValue(parsed, parsed.value));
          }
        };

        animationRef.current = window.requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();

      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, parsed, threshold, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}