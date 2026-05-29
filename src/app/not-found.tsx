import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" style={{ background: "#050200" }}>
      <body
        className="flex min-h-screen flex-col items-center justify-center px-8 text-center"
        style={{ background: "#050200", color: "#F5E5C0" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/518logo.svg"
          alt="518 Craft"
          className="h-10 w-auto mb-14 opacity-80"
        />

        <p
          className="font-display text-[10px] tracking-[0.55em] uppercase mb-6"
          style={{ color: "#C97D1A" }}
        >
          518 Craft &nbsp;&middot;&nbsp; Troy, NY
        </p>

        <h1
          className="font-display uppercase leading-none text-white mb-6"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
        >
          Lost in
          <br />
          the Collar City
        </h1>

        <div
          className="w-10 h-px mb-8"
          style={{ background: "#C97D1A", opacity: 0.5 }}
        />

        <p
          className="font-display text-base tracking-widest uppercase mb-10"
          style={{ color: "rgba(245,229,192,0.5)" }}
        >
          Page not found
        </p>

        <Link
          href="/"
          className="text-sm tracking-[0.3em] uppercase px-6 py-3 transition-opacity hover:opacity-80"
          style={{
            border: "1px solid #C97D1A",
            color: "#C97D1A",
            textDecoration: "none",
          }}
        >
          Back to the Bar
        </Link>
      </body>
    </html>
  );
}
