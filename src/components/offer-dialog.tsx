import * as React from "react";
import { Check, Copy, Mail } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const OFFER_EMAIL = "contact@devorix.space";
const MAILTO = `mailto:${OFFER_EMAIL}?subject=${encodeURIComponent("Offer for the domain")}&body=${encodeURIComponent(
  "Hi,\n\nI would like to make an offer to buy this domain.\n\nMy offer:\n\nThank you!",
)}`;

export default function OfferDialog() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OFFER_EMAIL);
      setCopied(true);
      return;
    } catch {
      // Fall back for browsers or contexts where the async clipboard is blocked.
    }
    try {
      const area = document.createElement("textarea");
      area.value = OFFER_EMAIL;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      setCopied(ok);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex min-h-14 shrink-0 cursor-pointer items-center gap-3 rounded-full bg-primary px-6",
          "text-sm font-semibold text-primary-foreground transition-transform duration-300",
          "hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Make an offer
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-3xl border-border/60 bg-card/95 p-7 backdrop-blur-sm sm:p-8">
        <DialogHeader className="space-y-3 text-left">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-primary">
            This domain is for sale
          </p>
          <DialogTitle className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Make an offer by email
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-muted-foreground">
            Send your offer to{" "}
            <span className="font-medium text-foreground">{OFFER_EMAIL}</span> to buy the domain.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
          <span className="select-all text-sm font-medium tracking-tight break-all sm:text-base">
            {OFFER_EMAIL}
          </span>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Tell us your offer and what you plan to build — we usually reply within a day.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={MAILTO}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Write the email
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="min-h-12 cursor-pointer rounded-full border border-border/60 px-5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
