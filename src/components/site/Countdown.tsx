import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    Jours: Math.floor(ms / 86400000),
    Heures: Math.floor(ms / 3600000) % 24,
    Minutes: Math.floor(ms / 60000) % 60,
    Secondes: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown({ target, tone = "light" }: { target: string; tone?: "light" | "dark" }) {
  const t = new Date(target).getTime();
  const [left, setLeft] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setLeft(diff(t));
    const id = setInterval(() => setLeft(diff(t)), 1000);
    return () => clearInterval(id);
  }, [t]);

  if (left && Object.values(left).every((v) => v === 0)) {
    return <p className="font-script animate-heartbeat text-5xl text-terracotta">C’est le grand jour !</p>;
  }
  const dark = tone === "dark";
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-5" aria-live="off">
      {Object.entries(left ?? diff(t)).map(([k, v]) => (
        <div
          key={k}
          className={`relative overflow-hidden rounded-xl px-2 py-4 text-center sm:px-6 sm:py-6 ${
            dark ? "border border-gold/40 bg-navy-foreground/5 backdrop-blur-sm" : "card-elegant"
          }`}
        >
          <div
            key={left ? String(v) : "ssr"}
            className={`fade-up font-serif text-4xl font-semibold tabular-nums sm:text-6xl ${dark ? "text-gold" : "text-navy"}`}
            style={{ animationDuration: "0.5s" }}
            suppressHydrationWarning
          >
            {left ? String(v).padStart(2, "0") : "--"}
          </div>
          <div className={`mt-1 text-[0.65rem] uppercase tracking-widest sm:text-xs ${dark ? "text-navy-foreground/75" : "text-muted-foreground"}`}>{k}</div>
        </div>
      ))}
    </div>
  );
}
