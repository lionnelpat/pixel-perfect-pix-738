/** Pétales terracotta / or / bleu nuit qui tombent doucement (décoratif). */
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 1.7) % 12,
  duration: 11 + ((i * 5) % 9),
  size: 10 + ((i * 7) % 12),
  drift: ((i % 2 ? 1 : -1) * (30 + ((i * 13) % 60))),
  color: ["var(--terracotta)", "var(--gold)", "var(--copper)", "var(--navy-foreground)"][i % 4],
}));

export function Petals({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {PETALS.map((p, i) => (
        <span
          key={i}
          // Sur téléphone, un pétale sur deux seulement.
          className={`petal absolute -top-8 ${i % 2 ? "hidden sm:block" : "block"}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.7,
              background: p.color,
              opacity: 0,
              borderRadius: "80% 0 80% 0",
              "--drift": `${p.drift}px`,
              animation: `float-petal ${p.duration}s linear ${p.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
