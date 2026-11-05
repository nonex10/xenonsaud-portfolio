import { useEffect, useRef } from "react";

// Attaches an IntersectionObserver to fade/slide elements with class "reveal"
// into view as they enter the viewport. Returns a ref for the container.
export default function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.classList.contains("reveal")
      ? [container]
      : Array.from(container.querySelectorAll(".reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}
