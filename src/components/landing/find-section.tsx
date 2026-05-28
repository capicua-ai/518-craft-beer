const VENUES_ON_TAP = [
  { name: "TROY BEER HOUSE", detail: "River Street · Troy" },
  { name: "UNION STREET TAPS", detail: "Union Street · Troy" },
  { name: "THE STEUBEN", detail: "3rd & Congress · Troy" },
];

const VENUES_IN_CANS = [
  { name: "COLLAR CITY MARKET", detail: "Congress St · Troy" },
  { name: "RIVER STREET MARKET", detail: "River Street · Troy" },
  { name: "CAPITAL BOTTLE SHOP", detail: "Albany, NY" },
];

export function FindSection() {
  return (
    <section
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "#050200",
        borderTop: "1px solid rgba(245,229,192,0.05)",
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
        <div className="mb-16 md:mb-20">
          <p
            className="text-[10px] tracking-[0.55em] uppercase mb-4"
            style={{ color: "rgba(201,125,26,0.55)" }}
          >
            Troy, NY &nbsp;&middot;&nbsp; Capital Region
          </p>
          <h2
            className="font-display uppercase leading-none text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Find Our Beer
          </h2>
          <div
            className="w-10 h-px mt-6"
            style={{ background: "#C97D1A", opacity: 0.4 }}
          />
          <p
            className="font-editorial italic mt-6 max-w-sm text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(245,229,192,0.4)" }}
          >
            On tap and in cans at select bars, restaurants, and bottle shops across the region.
          </p>
        </div>

        {/* Two-column venue list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">
          {/* On Tap */}
          <div>
            <p
              className="text-[9px] tracking-[0.55em] uppercase pb-4 mb-8"
              style={{
                color: "rgba(201,125,26,0.45)",
                borderBottom: "1px solid rgba(201,125,26,0.12)",
              }}
            >
              On Tap
            </p>
            <ul className="space-y-7">
              {VENUES_ON_TAP.map((v) => (
                <li key={v.name}>
                  <p
                    className="font-display uppercase text-white leading-none mb-1.5"
                    style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.625rem)" }}
                  >
                    {v.name}
                  </p>
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase"
                    style={{ color: "rgba(245,229,192,0.22)" }}
                  >
                    {v.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* In Cans */}
          <div>
            <p
              className="text-[9px] tracking-[0.55em] uppercase pb-4 mb-8"
              style={{
                color: "rgba(201,125,26,0.45)",
                borderBottom: "1px solid rgba(201,125,26,0.12)",
              }}
            >
              In Cans
            </p>
            <ul className="space-y-7">
              {VENUES_IN_CANS.map((v) => (
                <li key={v.name}>
                  <p
                    className="font-display uppercase text-white leading-none mb-1.5"
                    style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.625rem)" }}
                  >
                    {v.name}
                  </p>
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase"
                    style={{ color: "rgba(245,229,192,0.22)" }}
                  >
                    {v.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* More locations / inquiry line */}
        <div
          className="mt-16 md:mt-20 pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderTop: "1px solid rgba(245,229,192,0.05)" }}
        >
          <p
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "rgba(245,229,192,0.18)" }}
          >
            More locations coming soon
          </p>
          <p
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "rgba(245,229,192,0.18)" }}
          >
            Wholesale &nbsp;&middot;&nbsp; hello@518craft.com
          </p>
        </div>
      </div>
    </section>
  );
}
