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
}

export function BeerSection({ beer, flip, eventLabel }: BeerSectionProps) {
  const ghostWord = beer.style.split(" ").pop() ?? beer.style;

  return (
    <section
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

      {/* Vertical amber accent line — left edge */}
      <div
        className="absolute left-0 top-0 h-full w-px pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${beer.accent_color}55 30%, ${beer.accent_color}55 70%, transparent 100%)`,
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
              letterSpacing: "-0.02em",
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
                className="font-display text-[9px] tracking-[0.45em] uppercase"
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
              className="relative z-10 w-auto max-w-[320px] md:max-w-none md:max-h-[72vh]"
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
            {/* Style / specs */}
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: beer.accent_color }}
            >
              {beer.style} &middot; {beer.abv} ABV &middot; {beer.size_oz} FL OZ
            </p>

            {/* Flavor tags */}
            {beer.flavor_tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-7">
                {beer.flavor_tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-[0.3em] uppercase px-3 py-1"
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

            {/* Beer name */}
            <h2
              className="font-display uppercase leading-none text-white mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              {beer.name}
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

            {/* Badges */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-4 ${flip ? "md:justify-end" : ""}`}
            >
              <span
                className="text-sm tracking-[0.25em] uppercase border px-4 py-2"
                style={{
                  borderColor: beer.accent_color,
                  color: beer.accent_color,
                }}
              >
                Independent Craft
              </span>
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "rgba(245,229,192,0.50)" }}
              >
                Think NY &middot; Drink NY
              </span>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

function CanPlaceholder({ beer }: { beer: BeerData }) {
  const size = 300;
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
