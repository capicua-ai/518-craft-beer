import { AgeGate } from "@/components/landing/age-gate";
import { BeerSection } from "@/components/landing/beer-section";
import { FindSection } from "@/components/landing/find-section";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const FALLBACK_SETTINGS = {
  hero_headline: "TWO NEW BEERS",
  hero_subheadline: "Every drink tells a story. An alliance of artists dedicated to the Trojan Renaissance.",
  footer_address: "200 Broadway, Troy, NY",
  footer_website: "518craft.com",
  footer_instagram: "@518craft",
};

export default async function Home() {
  let settings = null;
  let beers: Array<{
    id: string;
    name: string;
    style: string;
    abv: string;
    size_oz: number;
    description: string;
    label_image_url: string | null;
    accent_color: string;
    bg_color: string;
    display_order: number;
  }> = [];

  try {
    [settings, beers] = await Promise.all([
      db.siteSettings.findFirst(),
      db.beer.findMany({ orderBy: { display_order: "asc" } }),
    ]);
  } catch {
    // DB not migrated yet — use fallback
  }

  const s = settings ?? FALLBACK_SETTINGS;

  return (
    <>
      <AgeGate />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Full-bleed background photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-v4.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Gradient overlays — heavy left/bottom for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(5,2,0,0.80) 0%, rgba(5,2,0,0.40) 40%, rgba(5,2,0,0.04) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,2,0,0.75) 0%, transparent 42%)",
            }}
          />

          {/* Logo — top left */}
          <div
            className="absolute top-8 left-8 md:top-10 md:left-12 lg:left-16"
            style={{ animation: "craft-rise 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/518logo.svg"
              alt="518 Craft"
              className="h-9 md:h-11 w-auto"
            />
          </div>

          {/* Headline — bottom left */}
          <div className="absolute bottom-14 left-8 md:left-12 lg:left-16 max-w-2xl">
            <p
              className="font-display text-[10px] tracking-[0.55em] uppercase mb-5"
              style={{
                color: "var(--craft-amber)",
                animation: "craft-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both",
              }}
            >
              518 &nbsp; CRAFT &nbsp;&middot;&nbsp; TROY, NY
            </p>
            <h1
              className="font-display uppercase leading-none text-white"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                animation: "craft-rise 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both",
              }}
            >
              {s.hero_headline}
            </h1>
            <div
              className="w-14 h-px my-5"
              style={{
                background: "var(--craft-amber)",
                opacity: 0.55,
                transformOrigin: "left",
                animation: "craft-expand-x 0.5s cubic-bezier(0.22,1,0.36,1) 0.65s both",
              }}
            />
            <p
              className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{
                color: "rgba(245,229,192,0.55)",
                animation: "craft-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.75s both",
              }}
            >
              {s.hero_subheadline}
            </p>
          </div>

          {/* Scroll hint — bottom right */}
          <div
            className="absolute bottom-10 right-8 md:right-12 flex flex-col items-center gap-2.5"
            style={{ animation: "craft-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.95s both" }}
          >
            <span
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(245,229,192,0.3)" }}
            >
              TONIGHT
            </span>
            <div
              className="w-px h-10"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(245,229,192,0.3), transparent)",
              }}
            />
          </div>
        </section>

        {/* ── Beer sections ─────────────────────────────────────────────────── */}
        {beers.map((beer, i) => (
          <BeerSection
            key={beer.id}
            beer={beer}
            flip={i % 2 !== 0}
            eventLabel={i === 0 ? "EVERY SAT · 9AM TO 2PM" : "EVERY FINAL FRIDAY"}
          />
        ))}

        {/* ── Find Our Beer ─────────────────────────────────────────────────── */}
        <FindSection />

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer
          style={{
            background: "#050200",
            borderTop: "1px solid rgba(245,229,192,0.05)",
          }}
        >
          {/* Brand mark */}
          <div
            className="py-12 px-6 text-center"
            style={{ borderBottom: "1px solid rgba(245,229,192,0.05)" }}
          >
            <p
              className="font-display text-2xl tracking-[0.55em] uppercase"
              style={{ color: "var(--craft-amber)" }}
            >
              518 &nbsp; CRAFT
            </p>
          </div>

          {/* Three-column grid */}
          <div className="px-8 md:px-16 lg:px-24 py-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Visit */}
            <div>
              <p
                className="text-[9px] tracking-[0.55em] uppercase pb-4 mb-6"
                style={{
                  color: "rgba(201,125,26,0.45)",
                  borderBottom: "1px solid rgba(201,125,26,0.12)",
                }}
              >
                Visit
              </p>
              <p
                className="font-display uppercase text-white leading-none mb-1"
                style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
              >
                200 Broadway
              </p>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-5"
                style={{ color: "rgba(245,229,192,0.25)" }}
              >
                Troy, NY 12180
              </p>
              <a
                href="https://maps.google.com/?q=200+Broadway+Troy+NY+12180"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(201,125,26,0.55)", textDecoration: "none" }}
              >
                ↗ Get Directions
              </a>
            </div>

            {/* Hours */}
            <div>
              <p
                className="text-[9px] tracking-[0.55em] uppercase pb-4 mb-6"
                style={{
                  color: "rgba(201,125,26,0.45)",
                  borderBottom: "1px solid rgba(201,125,26,0.12)",
                }}
              >
                Hours
              </p>
              <div className="space-y-2.5">
                {[
                  { d: "MON – THU", t: "4 – 11 PM" },
                  { d: "FRI – SAT", t: "4 PM – MIDNIGHT" },
                  { d: "SUN", t: "4 – 10 PM" },
                ].map((h) => (
                  <div key={h.d} className="flex items-baseline justify-between gap-4">
                    <span
                      className="text-[10px] tracking-[0.25em] uppercase text-white"
                    >
                      {h.d}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: "rgba(245,229,192,0.25)" }}
                    >
                      {h.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <p
                className="text-[9px] tracking-[0.55em] uppercase pb-4 mb-6"
                style={{
                  color: "rgba(201,125,26,0.45)",
                  borderBottom: "1px solid rgba(201,125,26,0.12)",
                }}
              >
                Connect
              </p>
              <div className="space-y-3">
                <p
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "rgba(245,229,192,0.25)" }}
                >
                  {s.footer_website}
                </p>
                <a
                  href="https://instagram.com/518craft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "rgba(245,229,192,0.25)", textDecoration: "none" }}
                >
                  {s.footer_instagram}
                </a>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "rgba(245,229,192,0.25)" }}
                >
                  hello@518craft.com
                </p>
              </div>
            </div>
          </div>

          {/* Bottom rule + tagline + legal */}
          <div
            className="px-6 pb-12 text-center"
            style={{ borderTop: "1px solid rgba(245,229,192,0.05)" }}
          >
            <p
              className="font-display text-sm tracking-[0.4em] uppercase py-8"
              style={{ color: "rgba(245,229,192,0.12)" }}
            >
              Think NY &nbsp;&middot;&nbsp; Drink NY
            </p>
            <p
              className="text-[10px] leading-relaxed max-w-lg mx-auto"
              style={{ color: "rgba(245,229,192,0.18)" }}
            >
              Government Warning: (1) According to the Surgeon General, women
              should not drink alcoholic beverages during pregnancy because of the
              risk of birth defects. (2) Consumption of alcoholic beverages
              impairs your ability to drive a car or operate machinery, and may
              cause health problems. Brewed &amp; canned by 518 Craft, Elmsford,
              NY.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
