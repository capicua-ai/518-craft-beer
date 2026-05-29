import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#050200",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "72px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient amber glow — right side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,125,26,0.22) 0%, transparent 65%)",
        }}
      />
      {/* Dark gradient left — text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(5,2,0,0.98) 0%, rgba(5,2,0,0.7) 50%, rgba(5,2,0,0.1) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: 640,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            color: "#C97D1A",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            marginBottom: 28,
          }}
        >
          518 CRAFT · TROY, NY
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 0.88,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 148,
              fontWeight: 900,
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              letterSpacing: "-2px",
            }}
          >
            POUR THE
          </span>
          <span
            style={{
              color: "#F5E5C0",
              fontSize: 148,
              fontWeight: 900,
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              letterSpacing: "-2px",
            }}
          >
            NIGHT
          </span>
        </div>

        {/* Amber rule */}
        <div
          style={{
            width: 56,
            height: 1,
            background: "#C97D1A",
            opacity: 0.55,
            marginBottom: 28,
          }}
        />

        {/* Beer names */}
        <div
          style={{
            display: "flex",
            gap: 32,
            color: "rgba(245,229,192,0.55)",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          <span>Farmers Market After Party · Pilsner</span>
          <span style={{ color: "rgba(201,125,26,0.6)" }}>·</span>
          <span>Troy Night Out · Hazy IPA</span>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
