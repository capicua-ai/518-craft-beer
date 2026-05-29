import { AgeGate } from "@/components/landing/age-gate";
import { BeerSection } from "@/components/landing/beer-section";
import { FindSection } from "@/components/landing/find-section";
import { Navbar } from "@/components/landing/navbar";
import { StorySection } from "@/components/landing/story-section";
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
    flavor_tags: string[];
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

  const heroWords = s.hero_headline.trim().split(/\s+/);
  const heroLastWord = heroWords[heroWords.length - 1] ?? "";
  const heroOtherWords = heroWords.slice(0, -1);

  return (
    <>
      <AgeGate />
      <Navbar />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section aria-label="Hero" className="relative min-h-screen overflow-hidden">
          {/* Full-bleed background photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-v4.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "62% center" }}
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

          {/* Headline — lower-third left */}
          <div className="absolute bottom-[12%] left-8 md:left-12 lg:left-16 max-w-2xl">
            <p
              className="font-display text-sm tracking-[0.55em] uppercase mb-5"
              style={{
                color: "var(--craft-amber)",
                animation: "craft-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both",
              }}
            >
              518 &nbsp; CRAFT &nbsp;&middot;&nbsp; TROY, NY
            </p>
            <h1
              className="font-display uppercase leading-none"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                animation: "craft-rise 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both",
              }}
            >
              {heroOtherWords.map((word) => (
                <span key={word} className="text-white block" style={{ lineHeight: 0.85 }}>{word}</span>
              ))}
              <span className="block" style={{ lineHeight: 0.85, color: "var(--craft-cream)" }}>{heroLastWord}</span>
            </h1>
            {s.hero_subheadline && (
              <p
                className="text-sm md:text-base leading-relaxed max-w-sm mb-2"
                style={{
                  color: "rgba(245,229,192,0.88)",
                  animation: "craft-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.75s both",
                }}
              >
                {s.hero_subheadline}
              </p>
            )}

            {/* CTA */}
            <a
              href="#beers"
              className="inline-flex items-center gap-2 mt-8 px-5 py-3 text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                background: "var(--craft-amber)",
                color: "#0A0500",
                textDecoration: "none",
                animation: "craft-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.9s both",
              }}
            >
              <span aria-hidden="true">→</span>
              Explore Our Beers
            </a>
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

        {/* ── Story ─────────────────────────────────────────────────────────── */}
        <StorySection id="story" />

        {/* ── Beer sections ─────────────────────────────────────────────────── */}
        {beers.map((beer, i) => (
          <BeerSection
            key={beer.id}
            beer={beer}
            flip={i % 2 !== 0}
            eventLabel={i === 0 ? "EVERY SAT · 9AM TO 2PM" : "EVERY FINAL FRIDAY"}
            id={i === 0 ? "beers" : undefined}
          />
        ))}

        {/* ── Find Our Beer ─────────────────────────────────────────────────── */}
        <FindSection id="visit" />

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer
          className="relative overflow-hidden"
          style={{
            background: "#0C0400",
            borderTop: "2px solid rgba(201,125,26,0.55)",
          }}
        >
          {/* Ambient amber glow at the top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,125,26,0.08) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Brand mark */}
          <div
            className="relative py-14 px-6 text-center flex justify-center"
            style={{ borderBottom: "1px solid rgba(245,229,192,0.07)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/518logo.svg"
              alt="518 Craft"
              className="h-14 w-auto opacity-90"
            />
          </div>

          {/* Three-column grid */}
          <div className="px-8 md:px-16 lg:px-24 py-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
            {/* Visit */}
            <div>
              <p
                className="text-xs tracking-[0.55em] uppercase pb-4 mb-6"
                style={{
                  color: "rgba(201,125,26,1)",
                  borderBottom: "1px solid rgba(201,125,26,0.18)",
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
                className="text-sm tracking-[0.3em] uppercase mb-5"
                style={{ color: "rgba(245,229,192,0.65)" }}
              >
                Troy, NY 12180
              </p>
              <a
                href="https://maps.google.com/?q=200+Broadway+Troy+NY+12180"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-[0.25em] uppercase inline-block py-2"
                style={{ color: "var(--craft-amber)", textDecoration: "none" }}
              >
                <span aria-hidden="true">↗ </span>Get Directions
              </a>
            </div>

            {/* Hours */}
            <div>
              <p
                className="text-xs tracking-[0.55em] uppercase pb-4 mb-6"
                style={{
                  color: "rgba(201,125,26,1)",
                  borderBottom: "1px solid rgba(201,125,26,0.18)",
                }}
              >
                Hours
              </p>
              <div className="space-y-3">
                {[
                  { d: "MON – THU", t: "4 – 11 PM" },
                  { d: "FRI – SAT", t: "4 PM – MIDNIGHT" },
                  { d: "SUN", t: "4 – 10 PM" },
                ].map((h) => (
                  <div key={h.d} className="flex items-baseline justify-between gap-4">
                    <span className="text-sm tracking-[0.25em] uppercase text-white">
                      {h.d}
                    </span>
                    <span
                      className="text-sm tracking-wide uppercase"
                      style={{ color: "rgba(245,229,192,0.65)" }}
                    >
                      {h.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div className="md:col-span-2 lg:col-span-1">
              <p
                className="text-xs tracking-[0.55em] uppercase pb-4 mb-6"
                style={{
                  color: "rgba(201,125,26,1)",
                  borderBottom: "1px solid rgba(201,125,26,0.18)",
                }}
              >
                Connect
              </p>
              <div className="space-y-3">
                <p
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{ color: "rgba(245,229,192,0.65)" }}
                >
                  {s.footer_website}
                </p>
                <a
                  href="https://instagram.com/518craft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm tracking-[0.3em] uppercase"
                  style={{ color: "rgba(245,229,192,0.65)", textDecoration: "none" }}
                >
                  {s.footer_instagram}
                </a>
                <p
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{ color: "rgba(245,229,192,0.65)" }}
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
              aria-hidden="true"
              style={{ color: "rgba(245,229,192,0.35)" }}
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
