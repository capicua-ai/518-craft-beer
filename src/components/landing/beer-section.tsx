import { AnimateIn } from "@/components/ui/animate-in";

interface BeerData {
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
}

interface BeerSectionProps {
  beer: BeerData;
  flip: boolean;
  eventLabel?: string;
  id?: string;
}

export function BeerSection({ beer, flip, eventLabel, id }: BeerSectionProps) {
  const ghostWord = beer.abv.replace("%", "");

  // Two-tone: first words white, last word in accent color
  const nameWords = beer.name.trim().split(/\s+/);
  const nameLast = nameWords.pop() ?? "";
  const nameFirst = nameWords.join(" ");

  return (
    <section
      id={id}
      aria-label={`${beer.name} – ${beer.style}`}
      className="relative min-h-screen flex items-stretch overflow-hidden"
      style={{
        background: `linear-gradient(155deg, ${beer.bg_color} 0%, #050200 60%)`,
      }}
    >
      {/* Ambient glow behind can */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: flip
            ? `radial-gradient(ellipse 60% 70% at 25% 50%, ${beer.accent_color}22 0%, transparent 70%)`
            : `radial-gradient(ellipse 60% 70% at 75% 50%, ${beer.accent_color}22 0%, transparent 70%)`,
          animation: "craft-glow-breathe 4s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 w-full flex flex-col md:flex-row items-center ${
          flip ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* ── Can image ──────────────────────────────────────────── */}
        <div className="flex-1 relative flex items-center justify-center py-10 px-8 md:py-24 md:px-12 lg:px-16">

          {/* Ghost style word */}
          <span
            aria-hidden="true"
            className="absolute font-display uppercase select-none pointer-events-none"
            style={{
              fontSize: "clamp(160px, 28vw, 420px)",
              color: beer.accent_color,
              opacity: 0.07,
              lineHeight: 1,
              letterSpacing: "0.06em",
              zIndex: 0,
            }}
          >
            {ghostWord}
          </span>

          {/* Rotated event label */}
          {eventLabel && (
            <div
              className={`absolute ${flip ? "right-3 md:right-5" : "left-3 md:left-5"} top-0 bottom-0 hidden md:flex items-center pointer-events-none select-none`}
              aria-hidden="true"
            >
              <span
                className="font-display text-sm tracking-[0.45em] uppercase"
                style={{
                  color: beer.accent_color,
                  opacity: 0.45,
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {eventLabel}
              </span>
            </div>
          )}

          {beer.label_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={beer.label_image_url}
              alt={`${beer.name} can`}
              className="relative z-10 w-auto max-w-[260px] md:max-w-none md:max-h-[55vh]"
              style={{
                filter: `drop-shadow(0 30px 80px ${beer.accent_color}55) drop-shadow(0 0 30px ${beer.accent_color}30)`,
              }}
            />
          ) : (
            <CanPlaceholder beer={beer} />
          )}
        </div>

        {/* ── Text stack ─────────────────────────────────────────── */}
        <div
          className={`flex-1 flex flex-col justify-center px-8 pb-20 md:pb-0 md:px-12 lg:px-16 xl:px-20 ${
            flip ? "md:items-end md:text-right" : ""
          }`}
        >
          <AnimateIn
            delay={200}
            className={
              flip
                ? "w-full md:flex md:flex-col md:items-end"
                : "w-full"
            }
          >
            {/* Flavor tags */}
            {beer.flavor_tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-7">
                {beer.flavor_tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm tracking-[0.3em] uppercase px-3 py-1"
                    style={{
                      color: beer.accent_color,
                      background: `${beer.accent_color}14`,
                      border: `1px solid ${beer.accent_color}35`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Beer name — two-tone */}
            <h2
              className="font-display uppercase leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
            >
              {nameFirst && (
                <span className="text-white">{nameFirst} </span>
              )}
              <span style={{ color: beer.accent_color }}>{nameLast}</span>
            </h2>

            {/* Thin rule */}
            <div
              className="h-px mb-8"
              style={{
                width: "3rem",
                background: beer.accent_color,
                opacity: 0.45,
                marginLeft: flip ? "auto" : undefined,
              }}
            />

            {/* Description */}
            <p
              className="font-editorial italic text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "rgba(245,229,192,0.82)" }}
            >
              {beer.description}
            </p>

            {/* Specs — bottom */}
            <p
              className="text-sm tracking-[0.4em] uppercase mt-10"
              style={{ color: `${beer.accent_color}99` }}
            >
              {beer.style} &middot; {beer.abv} ABV &middot; {beer.size_oz} FL OZ
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

function CanPlaceholder({ beer }: { beer: BeerData }) {
  const size = 240;
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 40% 35%, ${beer.bg_color} 0%, #050200 100%)`,
        border: `2px solid ${beer.accent_color}25`,
        boxShadow: `0 0 80px ${beer.accent_color}18, 0 0 160px ${beer.accent_color}08`,
      }}
    >
      <div
        className="absolute"
        style={{ inset: 14, borderRadius: "50%", border: `1px solid ${beer.accent_color}15` }}
      />
      <p className="font-display text-5xl leading-none" style={{ color: beer.accent_color }}>
        518
      </p>
      <p
        className="font-display text-xs tracking-[0.45em] uppercase mt-1 mb-4"
        style={{ color: "rgba(245,229,192,0.3)" }}
      >
        CRAFT
      </p>
      <p className="font-display text-lg uppercase leading-tight text-white tracking-wide px-8">
        {beer.name}
      </p>
      <p
        className="font-display text-[10px] tracking-[0.35em] uppercase mt-2"
        style={{ color: `${beer.accent_color}65` }}
      >
        {beer.style}
      </p>
    </div>
  );
}
