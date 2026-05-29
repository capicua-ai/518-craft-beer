import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#050200",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Subtle amber glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,125,26,0.18) 0%, transparent 70%)",
        }}
      />
      {/* 518 mark */}
      <div
        style={{
          color: "#C97D1A",
          fontSize: 220,
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: "-8px",
          fontFamily: "serif",
        }}
      >
        518
      </div>
      {/* CRAFT sub-label */}
      <div
        style={{
          color: "rgba(245,229,192,0.55)",
          fontSize: 52,
          fontWeight: 600,
          letterSpacing: "24px",
          marginTop: 12,
          marginLeft: 24,
          fontFamily: "sans-serif",
          textTransform: "uppercase",
        }}
      >
        CRAFT
      </div>
    </div>,
    { width: 512, height: 512 }
  );
}
