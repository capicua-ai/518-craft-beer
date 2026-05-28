interface BeerData {
  id: string;
  name: string;
  style: string;
  abv: string;
  size_oz: number;
  description: string;
  label_image_url: string | null;
  accent_color: string;
  bg_color: string;
}

interface BeerSectionProps {
  beer: BeerData;
  flip: boolean;
}

export function BeerSection({ beer, flip }: BeerSectionProps) {
  return (
    <section
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24"
      style={{
        background: `linear-gradient(160deg, ${beer.bg_color} 0%, #0A0500 100%)`,
      }}
    >
      <div
        className={`w-full max-w-5xl mx-auto flex flex-col gap-16 md:gap-20 items-center ${
          flip ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Label art */}
        <div className="flex-shrink-0 flex justify-center">
          <LabelArt beer={beer} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {/* Style / specs badge */}
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: beer.accent_color }}
          >
            {beer.style} &middot; {beer.abv} ABV &middot; {beer.size_oz} FL OZ
          </p>

          {/* Beer name */}
          <h2
            className="font-display uppercase leading-none mb-8 text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            {beer.name}
          </h2>

          {/* Description */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-md"
            style={{ color: "rgba(245,229,192,0.6)" }}
          >
            {beer.description}
          </p>

          {/* Badges */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span
              className="text-[10px] tracking-[0.3em] uppercase border px-3 py-1.5"
              style={{
                borderColor: `${beer.accent_color}50`,
                color: `${beer.accent_color}90`,
              }}
            >
              Independent Craft
            </span>
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(245,229,192,0.2)" }}
            >
              Think NY &middot; Drink NY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabelArt({ beer }: { beer: BeerData }) {
  const size = 320;

  if (beer.label_image_url) {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `2px solid ${beer.accent_color}30`,
          boxShadow: `0 0 80px ${beer.accent_color}15, 0 0 160px ${beer.accent_color}08`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beer.label_image_url}
          alt={`${beer.name} label`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 40% 35%, ${beer.bg_color}FF 0%, #050200 100%)`,
        border: `2px solid ${beer.accent_color}25`,
        boxShadow: `0 0 80px ${beer.accent_color}12, 0 0 160px ${beer.accent_color}06`,
      }}
    >
      {/* Decorative ring */}
      <div
        className="absolute"
        style={{
          inset: 14,
          borderRadius: "50%",
          border: `1px solid ${beer.accent_color}15`,
        }}
      />
      <div
        className="absolute"
        style={{
          inset: 28,
          borderRadius: "50%",
          border: `1px dashed ${beer.accent_color}10`,
        }}
      />

      {/* Content */}
      <p
        className="font-display text-6xl leading-none"
        style={{ color: beer.accent_color }}
      >
        518
      </p>
      <p
        className="font-display text-sm tracking-[0.45em] uppercase mt-1 mb-5"
        style={{ color: "rgba(245,229,192,0.35)" }}
      >
        CRAFT
      </p>

      <div className="px-8">
        <p
          className="font-display text-xl uppercase leading-tight text-white tracking-wide"
        >
          {beer.name}
        </p>
      </div>

      <p
        className="font-display text-xs tracking-[0.35em] uppercase mt-3"
        style={{ color: `${beer.accent_color}70` }}
      >
        {beer.style}
      </p>
    </div>
  );
}
