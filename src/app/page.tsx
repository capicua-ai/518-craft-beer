import { AgeGate } from "@/components/landing/age-gate";
import { BeerSection } from "@/components/landing/beer-section";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const FALLBACK_SETTINGS = {
  hero_headline: "TWO NEW BEERS",
  hero_subheadline: "Fresh from Troy, NY. Brewed with community in every can.",
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
                "linear-gradient(to right, rgba(5,2,0,0.92) 0%, rgba(5,2,0,0.65) 45%, rgba(5,2,0,0.15) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,2,0,0.85) 0%, transparent 50%)",
            }}
          />

          {/* Logo — top left */}
          <div className="absolute top-8 left-8 md:top-10 md:left-12 lg:left-16">
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
              style={{ color: "var(--craft-amber)" }}
            >
              518 &nbsp; CRAFT &nbsp;&middot;&nbsp; TROY, NY
            </p>
            <h1
              className="font-display uppercase leading-none text-white"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
            >
              {s.hero_headline}
            </h1>
            <div
              className="w-14 h-px my-5"
              style={{ background: "var(--craft-amber)", opacity: 0.55 }}
            />
            <p
              className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{ color: "rgba(245,229,192,0.55)" }}
            >
              {s.hero_subheadline}
            </p>
          </div>

          {/* Scroll hint — bottom right */}
          <div className="absolute bottom-10 right-8 md:right-12 flex flex-col items-center gap-2.5">
            <span
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(245,229,192,0.3)" }}
            >
              Scroll
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
          <BeerSection key={beer.id} beer={beer} flip={i % 2 !== 0} />
        ))}

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer
          className="py-16 px-6 text-center"
          style={{
            background: "#050200",
            borderTop: "1px solid rgba(245,229,192,0.05)",
          }}
        >
          <p
            className="font-display text-xl tracking-[0.5em] uppercase mb-5"
            style={{ color: "var(--craft-amber)" }}
          >
            518 &nbsp; CRAFT
          </p>

          <div
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs tracking-[0.25em] uppercase mb-8"
            style={{ color: "rgba(245,229,192,0.35)" }}
          >
            <span>{s.footer_website}</span>
            <span aria-hidden="true">/</span>
            <span>{s.footer_address}</span>
            <span aria-hidden="true">/</span>
            <span>{s.footer_instagram}</span>
          </div>

          <p
            className="font-display text-sm tracking-[0.4em] uppercase mb-10"
            style={{ color: "rgba(245,229,192,0.15)" }}
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
        </footer>
      </main>
    </>
  );
}
