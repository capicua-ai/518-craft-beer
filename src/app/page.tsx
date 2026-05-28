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
        <section
          className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #1C0A0020 0%, var(--craft-bg) 70%)",
          }}
        >
          {/* Subtle top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--craft-amber), transparent)",
              opacity: 0.3,
            }}
            aria-hidden="true"
          />

          {/* 518 Craft badge */}
          <div className="mb-8 flex flex-col items-center gap-1">
            <span
              className="font-display text-xs tracking-[0.6em] uppercase"
              style={{ color: "var(--craft-amber)" }}
            >
              518 &nbsp; CRAFT
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-display uppercase leading-none text-white mb-5"
            style={{ fontSize: "clamp(4.5rem,16vw,14rem)" }}
          >
            {s.hero_headline}
          </h1>

          {/* Divider */}
          <div
            className="w-16 h-px mb-6"
            style={{ background: "var(--craft-amber)", opacity: 0.5 }}
          />

          {/* Subheadline */}
          <p
            className="text-base md:text-lg max-w-xs md:max-w-sm leading-relaxed"
            style={{ color: "rgba(245,229,192,0.5)" }}
          >
            {s.hero_subheadline}
          </p>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
            <span
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(245,229,192,0.25)" }}
            >
              Scroll
            </span>
            <div
              className="w-px h-10"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(245,229,192,0.25), transparent)",
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
