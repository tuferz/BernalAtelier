"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook that observes elements with the `.reveal` class
 * and adds `.visible` when they enter the viewport.
 */
export function useRevealOnScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const container = containerRef.current;
    if (container) {
      const targets = container.querySelectorAll(".reveal");
      targets.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
