import { Clock, Lock, MapPin, Navigation } from "lucide-react";
import { mapsEmbed, mapsLink, type WeddingEvent } from "@/content/wedding";
import { PendingNote } from "./Ornaments";
import { responsive } from "@/lib/images";

export function MapButton({ e, className = "" }: { e: WeddingEvent; className?: string }) {
  return (
    <a
      href={mapsLink(e)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-cream shadow-md shadow-terracotta/25 transition hover:-translate-y-0.5 hover:bg-copper ${className}`}
    >
      <Navigation className="h-4 w-4" aria-hidden /> Itinéraire Google Maps
    </a>
  );
}

export function EventCard({ e, showMap = false }: { e: WeddingEvent; showMap?: boolean }) {
  return (
    <article className="card-elegant group flex h-full flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="relative aspect-[2/1] overflow-hidden sm:aspect-[16/10]">
        <img {...responsive(e.image.src, "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 37vw")} alt={e.image.alt} loading="lazy" decoding="async" className="img-zoom h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
        <p className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1 text-sm font-semibold text-navy shadow">
          <Clock className="h-3.5 w-3.5 text-terracotta" aria-hidden />
          {e.time}
        </p>
        {e.restricted && (
          <p className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-navy/85 px-3 py-1 text-[0.7rem] uppercase tracking-widest text-gold">
            <Lock className="h-3 w-3" aria-hidden /> Sur invitation
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">{e.day}</p>
        <h3 className="mt-2 text-2xl font-semibold text-navy">{e.title}</h3>
        <p className="mt-3 flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden />
          <span>
            {e.place}
            {e.placeDetail && <span className="block italic text-muted-foreground">{e.placeDetail}</span>}
          </span>
        </p>
        {e.restricted && <p className="mt-2 text-sm italic text-muted-foreground">Sur invitation personnelle uniquement</p>}
        {e.aConfirmer && (
          <div>
            <PendingNote>Horaire à confirmer</PendingNote>
          </div>
        )}
        {showMap && (
          <div className="mt-auto pt-5">
            <MapButton e={e} />
          </div>
        )}
      </div>
    </article>
  );
}

/** Version compacte (accueil sur téléphone) : heure, titre et lieu sur une ligne. */
export function EventLine({ e }: { e: WeddingEvent }) {
  return (
    <li className="flex gap-4 py-4">
      <p className="w-14 shrink-0 pt-0.5 font-serif text-xl font-semibold tabular-nums text-terracotta">{e.time}</p>
      <div className="min-w-0">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{e.day}</p>
        <p className="mt-0.5 text-lg font-semibold leading-snug text-navy">{e.title}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-foreground/80">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-terracotta" aria-hidden />
          {e.place}
        </p>
        {e.restricted && (
          <p className="mt-1 flex items-center gap-1 text-xs italic text-muted-foreground">
            <Lock className="h-3 w-3" aria-hidden /> Sur invitation
          </p>
        )}
        {e.aConfirmer && <PendingNote>Horaire à confirmer</PendingNote>}
      </div>
    </li>
  );
}

/** Lieu avec photo, carte Google intégrée et bouton d'itinéraire. */
export function VenueCard({ e, reverse = false }: { e: WeddingEvent; reverse?: boolean }) {
  return (
    <article className="card-elegant overflow-hidden lg:grid lg:grid-cols-2">
      <div className={`group relative min-h-64 overflow-hidden ${reverse ? "lg:order-2" : ""}`}>
        <img {...responsive(e.image.src, "(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 37vw")} alt={e.image.alt} loading="lazy" decoding="async" className="img-zoom absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
        <div className="absolute bottom-0 p-6 text-navy-foreground">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {e.day} · {e.time}
          </p>
          <h2 className="mt-1 text-3xl font-semibold">{e.title}</h2>
        </div>
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <p className="flex items-start gap-2 font-serif text-xl text-navy">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-terracotta" aria-hidden />
          <span>
            {e.place}
            {e.placeDetail && <span className="block text-base italic text-muted-foreground">{e.placeDetail}</span>}
          </span>
        </p>
        {e.restricted && (
          <p className="mt-2 flex items-center gap-2 text-sm italic text-muted-foreground">
            <Lock className="h-3.5 w-3.5" aria-hidden /> Sur invitation personnelle uniquement
          </p>
        )}
        {/* Sur téléphone, le bouton « Itinéraire » ouvre directement l'application Google Maps. */}
        <div className="mt-5 hidden aspect-[16/10] overflow-hidden rounded-md border border-gold/40 sm:block">
          <iframe
            title={`Carte — ${e.place}`}
            src={mapsEmbed(e)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full grayscale-[30%]"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <MapButton e={e} />
          {!e.mapUrl && <span className="text-xs italic text-muted-foreground">Position exacte à confirmer par les mariés</span>}
        </div>
      </div>
    </article>
  );
}
