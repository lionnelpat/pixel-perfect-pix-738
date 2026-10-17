import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Fait apparaître son contenu en douceur lorsqu'il entre à l'écran. */
export function Reveal({
  children,
  as: Tag = "div",
  from = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  from?: "up" | "left" | "right" | "zoom";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-from={from} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
