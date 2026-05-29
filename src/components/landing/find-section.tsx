import { AnimateIn } from "@/components/ui/animate-in";

const HOURS = [
  { days: "MON – THU", time: "4 PM – 11 PM" },
  { days: "FRI – SAT", time: "4 PM – MIDNIGHT" },
  { days: "SUN", time: "4 PM – 10 PM" },
];

export function FindSection() {
  return (
    <section
      aria-label="Visit Us"
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "#07060F",
        borderTop: "1px solid rgba(201,125,26,0.12)",
      }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,125,26,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Vertical amber line — left edge */}
      <div
        className="absolute left-0 top-0 h-full w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(201,125,26,0.4) 30%, rgba(201,125,26,0.4) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <AnimateIn className="mb-16 md:mb-20">
          <p
            className="text-xs tracking-[0.55em] uppercase mb-4"
            style={{ color: "rgba(201,125,26,1)" }}
          >
            200 Broadway &nbsp;&middot;&nbsp; Troy, NY
          </p>
          <h2
            className="font-display uppercase leading-none text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Visit Us
          </h2>
          <div
            className="w-10 h-px mt-6"
            style={{ background: "var(--craft-amber)", opacity: 0.4 }}
          />
          <p
            className="font-editorial italic mt-6 max-w-sm text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(245,229,192,0.72)" }}
          >
            A haven for musicians, artists, creatives, and beer-lovers. Every drink tells a story.
          </p>
        </AnimateIn>

        {/* Two-column: address + hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">
          {/* Address & vibe */}
          <AnimateIn delay={100}>
            <p
              className="text-[11px] tracking-[0.55em] uppercase pb-4 mb-8"
              style={{
                color: "rgba(201,125,26,1)",
                borderBottom: "1px solid rgba(201,125,26,0.18)",
              }}
            >
              The Bar
            </p>
            <p
              className="font-display uppercase text-white leading-none mb-1.5"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.625rem)" }}
            >
              518 Craft
            </p>
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "rgba(245,229,192,0.70)" }}
            >
              200 Broadway · Troy, NY 12180
            </p>
            <a
              href="https://maps.google.com/?q=200+Broadway+Troy+NY+12180"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.25em] uppercase inline-block py-2 mb-6"
              style={{ color: "var(--craft-amber)", textDecoration: "none" }}
            >
              <span aria-hidden="true">↗ </span>Get Directions
            </a>
            <p
              className="font-editorial italic text-base leading-relaxed max-w-xs"
              style={{ color: "rgba(245,229,192,0.68)" }}
            >
              An alliance of artists dedicated to the Trojan Renaissance. Rotating art shows, live music, and Troy&rsquo;s finest craft beer.
            </p>
          </AnimateIn>

          {/* Hours */}
          <AnimateIn delay={220}>
            <p
              className="text-[11px] tracking-[0.55em] uppercase pb-4 mb-8"
              style={{
                color: "rgba(201,125,26,1)",
                borderBottom: "1px solid rgba(201,125,26,0.18)",
              }}
            >
              Hours
            </p>
            <ul className="space-y-7">
              {HOURS.map((h) => (
                <li key={h.days} className="flex items-baseline justify-between gap-4">
                  <p
                    className="font-display uppercase text-white leading-none"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
                  >
                    {h.days}
                  </p>
                  <p
                    className="text-xs tracking-[0.3em] uppercase"
                    style={{ color: "rgba(245,229,192,0.68)" }}
                  >
                    {h.time}
                  </p>
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>

        {/* Events line + contact */}
        <div
          className="mt-16 md:mt-20 pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderTop: "1px solid rgba(245,229,192,0.05)" }}
        >
          <p
            className="text-[10px] tracking-[0.35em] uppercase"
            aria-hidden="true"
            style={{ color: "rgba(245,229,192,0.30)" }}
          >
            Troy Night Out &nbsp;&middot;&nbsp; Jazz &amp; Jam &nbsp;&middot;&nbsp; Open Mic
          </p>
          <p
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "rgba(245,229,192,0.65)" }}
          >
            hello@518craft.com
          </p>
        </div>
      </div>
    </section>
  );
}
