import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";

type Message = { name: string; message: string; createdAt: string };

/** Message du livre d'or en entier (fenêtre). `children` : actions éventuelles (administration). */
export function MessageDialog({ message, onClose, children }: { message: Message | null; onClose: () => void; children?: ReactNode }) {
  return (
    <Dialog open={message !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85svh] overflow-y-auto border-gold/50 bg-card p-8 sm:max-w-xl sm:rounded-xl">
        {message && (
          <>
            <DialogTitle className="font-script text-4xl font-normal text-terracotta">{message.name}</DialogTitle>
            <DialogDescription className="text-xs">{formatDate(message.createdAt)}</DialogDescription>
            <p className="mt-2 whitespace-pre-line font-serif text-lg leading-relaxed text-foreground/90">{message.message}</p>
            {children && <div className="mt-4 flex flex-wrap gap-2 border-t border-gold/30 pt-4">{children}</div>}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Message tronqué dans les listes, à ouvrir en entier dans la fenêtre. */
export function isLongMessage(message: string) {
  return message.length > 240 || message.split("\n").length > 5;
}
