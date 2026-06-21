
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FootballAnimation({
  className = "absolute top-20 left-10 w-12 h-12 pointer-events-none z-20",
}: {
  className?: string;
}) {
  const footballRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!footballRef.current) return;

    const animateRandomly = () => {
      const el = footballRef.current;
      if (!el) return;

      const parent = (el.offsetParent || el.parentElement) as HTMLElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth || window.innerWidth;
      const parentHeight = parent.clientHeight || window.innerHeight;

      // Absolute original offsets relative to offsetParent
      const offsetLeft = el.offsetLeft;
      const offsetTop = el.offsetTop;
      const footballWidth = el.offsetWidth || 48;
      const footballHeight = el.offsetHeight || 48;

      // We restrict x and y translation within the parent container's borders
      const minX = -offsetLeft;
      const maxX = Math.max(0, parentWidth - offsetLeft - footballWidth);
      const minY = -offsetTop;
      const maxY = Math.max(0, parentHeight - offsetTop - footballHeight);

      // Generate random translation coordinates
      const targetX = minX + Math.random() * (maxX - minX);
      const targetY = minY + Math.random() * (maxY - minY);

      gsap.to(el, {
        x: targetX,
        y: targetY,
        duration: Math.random() * 2 + 2,
        ease: "power1.inOut",
        onComplete: animateRandomly,
      });
    };

    animateRandomly();

    return () => {
      gsap.killTweensOf(footballRef.current);
    };
  }, []);

  return (
    <img
      ref={footballRef}
      src="/images/football.webp"
      alt="football animation"
      className={className}
    />
  );
}