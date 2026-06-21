"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getRevealTargets() {
  if (typeof document === "undefined") {
    return { sections: [] as HTMLElement[], cards: [] as HTMLElement[] };
  }

  const main = document.querySelector("main");

  if (!main) {
    return { sections: [] as HTMLElement[], cards: [] as HTMLElement[] };
  }

  const sectionTargets = Array.from(main.querySelectorAll("section, article")).filter(
    (element): element is HTMLElement => element instanceof HTMLElement
  );

  const cardTargets = Array.from(
    main.querySelectorAll(
      [
        "section [class*='grid'] > *",
        "article [class*='grid'] > *",
        "section [class*='rounded']",
        "article [class*='rounded']",
        "section video",
        "article video",
        "section img",
        "article img",
        "section iframe",
        "article iframe",
      ].join(", ")
    )
  ).filter((element): element is HTMLElement => element instanceof HTMLElement);

  const uniqueCards = cardTargets.filter((card) => !sectionTargets.includes(card));

  return {
    sections: sectionTargets.length > 0 ? Array.from(new Set(sectionTargets)) : Array.from(main.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement
    ),
    cards: Array.from(new Set(uniqueCards)),
  };
}

export default function ScrollRevealProvider() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/client-area")) {
      return;
    }

    const { sections, cards } = getRevealTargets();

    if (sections.length === 0 && cards.length === 0) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([...sections, ...cards], { autoAlpha: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(sections, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });
      gsap.set(cards, { autoAlpha: 0, y: 18, willChange: "transform,opacity" });

      ScrollTrigger.batch(sections, {
        start: "top 86%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: "auto",
            clearProps: "opacity,transform,visibility",
          });
        },
      });

      if (cards.length > 0) {
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.06,
              overwrite: "auto",
              clearProps: "opacity,transform,visibility",
            });
          },
        });
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
