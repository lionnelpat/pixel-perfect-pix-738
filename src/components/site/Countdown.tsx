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

export function Countdown({ target }: { target: string }) {
  const t = new Date(target).getTime();
  const [left, setLeft] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setLeft(diff(t));
    const id = setInterval(() => setLeft(diff(t)), 1000);
    return () => clearInterval(id);
  }, [t]);

  if (left && Object.values(left).every((v) => v === 0)) {
    return <p className="font-script text-4xl text-terracotta">C’est le grand jour !</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4" aria-live="off">
      {Object.entries(left ?? diff(t)).map(([k, v]) => (
        <div key={k} className="card-elegant px-2 py-3 text-center sm:px-5">
          <div className="font-serif text-3xl font-semibold tabular-nums text-navy sm:text-4xl" suppressHydrationWarning>
            {left ? String(v).padStart(2, "0") : "--"}
          </div>
          <div className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">{k}</div>
        </div>
      ))}
    </div>
  );
}
