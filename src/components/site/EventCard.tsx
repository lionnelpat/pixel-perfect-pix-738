import { Clock, Lock, MapPin } from "lucide-react";
import type { WeddingEvent } from "@/content/wedding";
import { PendingNote } from "./Ornaments";

export function EventCard({ e, showMap = false }: { e: WeddingEvent; showMap?: boolean }) {
  return (
    <article className="card-elegant p-6">
      <p className="text-xs uppercase tracking-[0.25em] text-terracotta">{e.day}</p>
      <h3 className="mt-2 text-2xl font-semibold text-navy">{e.title}</h3>
      <div className="mt-3 space-y-1.5 text-sm">
        <p className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-copper" aria-hidden />{e.time}</p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden />
          <span>{e.place}{e.placeDetail && <span className="block italic text-muted-foreground">{e.placeDetail}</span>}</span>
        </p>
      </div>
      {e.restricted && (
        <p className="mt-3 flex items-center gap-2 text-sm italic text-muted-foreground">
          <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden /> Sur invitation personnelle uniquement
        </p>
      )}
      {e.aConfirmer && <PendingNote>Horaire à confirmer</PendingNote>}
      {showMap && (
        <div className="mt-4">
          {e.mapUrl ? (
            <a href={e.mapUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-terracotta underline underline-offset-4">
              Préparer mon itinéraire
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">Lien d’itinéraire bientôt disponible.</p>
          )}
        </div>
      )}
    </article>
  );
}
