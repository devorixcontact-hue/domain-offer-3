import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import OfferDialog from "@/components/offer-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Domain For Sale" },
      { name: "description", content: "This domain is available. Make an offer by email to buy it." },
      { property: "og:title", content: "Domain For Sale" },
      { property: "og:description", content: "This domain is available. Make an offer by email to buy it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DomainScene = lazy(() => import("../components/domain-scene"));

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden="true" className="absolute inset-0 opacity-90">
        <ClientOnly fallback={<div className="h-full w-full bg-background" />}>
          <Suspense fallback={<div className="h-full w-full bg-background" />}>
            <DomainScene />
          </Suspense>
        </ClientOnly>
      </div>

      <div aria-hidden="true" className="domain-grid absolute inset-0" />
      <div aria-hidden="true" className="domain-vignette absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col px-6 py-6 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between border-b border-border/50 pb-5">
          <a href="/" className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
            For Sale
          </a>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="status-dot h-2 w-2 rounded-full bg-primary" />
            Available now
          </div>
        </header>

        <section className="flex flex-1 items-center py-16 lg:py-20">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
              A digital address with potential
            </p>
            <h1 className="domain-title text-[clamp(4rem,12vw,10.5rem)] font-semibold uppercase leading-[0.78]">
              Buy the
              <br />
              domain<span className="text-primary">.</span>
            </h1>
            <div className="mt-10 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                This domain is for sale. If it fits your next ambitious idea, make an offer.
              </p>
              <OfferDialog />
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-border/50 pt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Premium domain acquisition</span>
          <a className="transition-colors hover:text-foreground" href="mailto:contact@devorix.space">
            contact@devorix.space
          </a>
        </footer>
      </div>
    </main>
  );
}
