import { AnimateIn } from "@/components/ui/animate-in";

const COMMUNITY = [
  "Troy Night Out",
  "Jazz & Jam Sessions",
  "Open Mic Nights",
  "Collar City Runners Club",
  "Rotating Art Shows",
];

export function StorySection() {
  return (
    <section
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "#050200",
        borderTop: "1px solid rgba(245,229,192,0.05)",
      }}
    >
      {/* Ambient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,125,26,0.05) 0%, transparent 70%)",
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
            className="text-[10px] tracking-[0.55em] uppercase mb-4"
            style={{ color: "rgba(201,125,26,0.55)" }}
          >
            Downtown Troy, NY &nbsp;&middot;&nbsp; The Trojan Renaissance
          </p>
          <h2
            className="font-display uppercase leading-none text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            A Corner
            <br />
            Clubhouse
          </h2>
          <div
            className="w-10 h-px mt-6"
            style={{ background: "#C97D1A", opacity: 0.4 }}
          />
        </AnimateIn>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">
          {/* Left: story copy */}
          <AnimateIn delay={100}>
            <p
              className="font-editorial italic text-base md:text-lg leading-relaxed mb-7"
              style={{ color: "rgba(245,229,192,0.58)" }}
            >
              At 518 Craft, we are a unique blend of craft beer, ciders, spirits,
              and specialty cocktails. Our commitment to storytelling sets us apart
              — every drink tells a story, from locally sourced ingredients to
              intricate flavors.
            </p>
            <p
              className="text-sm leading-relaxed mb-7"
              style={{ color: "rgba(245,229,192,0.32)" }}
            >
              518 Craft is a haven for musicians, artists, creatives, and
              beer-lovers alike. The walls are home to rotating art shows. Its
              space has welcomed countless musicians to perform and comedians to
              take the stage — a community-centered public house constantly
              adapting to fit the interests of their niche, beer-loving community.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(245,229,192,0.32)" }}
            >
              Founded by Jeremy Cowan, 518 Craft now enters an exciting new
              chapter with the addition of David Girard, Shannon Rafferty, and
              Thomas Williams to the management team — each bringing deep roots in
              the arts, hospitality, and the Albany&ndash;Troy community.
            </p>
          </AnimateIn>

          {/* Right: pull quote + events */}
          <AnimateIn delay={220} className="flex flex-col gap-12">
            {/* Pull quote */}
            <blockquote>
              <p
                className="font-editorial italic text-base md:text-lg leading-relaxed mb-4 pl-5"
                style={{
                  color: "rgba(245,229,192,0.5)",
                  borderLeft: "2px solid rgba(201,125,26,0.4)",
                }}
              >
                &ldquo;The continual appreciation for the community and the
                opportunity for expression is something I truly admire and hope
                to nurture here.&rdquo;
              </p>
              <cite
                className="text-[10px] tracking-[0.35em] uppercase not-italic pl-5"
                style={{ color: "rgba(201,125,26,0.55)" }}
              >
                David Girard &nbsp;&middot;&nbsp; Manager
              </cite>
            </blockquote>

            {/* Community events */}
            <div>
              <p
                className="text-[9px] tracking-[0.55em] uppercase pb-4 mb-7"
                style={{
                  color: "rgba(201,125,26,0.45)",
                  borderBottom: "1px solid rgba(201,125,26,0.12)",
                }}
              >
                In the House
              </p>
              <ul className="space-y-4">
                {COMMUNITY.map((event) => (
                  <li key={event} className="flex items-center gap-4">
                    <div
                      className="w-5 h-px flex-shrink-0"
                      style={{ background: "rgba(201,125,26,0.35)" }}
                    />
                    <span
                      className="font-display uppercase text-white leading-none"
                      style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
                    >
                      {event}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>

        {/* Bottom attribution line */}
        <AnimateIn delay={300}>
          <div
            className="mt-16 md:mt-20 pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            style={{ borderTop: "1px solid rgba(245,229,192,0.05)" }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(245,229,192,0.18)" }}
            >
              Founded by Jeremy Cowan
            </p>
            <p
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(245,229,192,0.18)" }}
            >
              An alliance of artists dedicated to the Trojan Renaissance
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
