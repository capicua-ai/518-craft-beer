import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue, Lora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const BASE_URL = "https://518craft.com";
const TITLE = "518 Craft Beer — Two New Beers from Troy, NY";
const DESCRIPTION =
  "Farmers Market After Party Pilsner and Troy Night Out Hazy IPA. Craft beer born in Troy, NY. Every drink tells a story. Think NY, Drink NY.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "518 Craft Beer",
    images: [{ url: `${BASE_URL}/hero-v4.png`, width: 1717, height: 916 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${BASE_URL}/hero-v4.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bebasNeue.variable} ${lora.variable} h-full antialiased`}
      style={{ background: "var(--craft-bg)" }}
    >
      <body
        className="flex min-h-full flex-col"
        style={{ background: "var(--craft-bg)", color: "var(--craft-cream)" }}
      >
        {/* Skip to main content — keyboard / screen reader navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:text-sm focus:font-display focus:tracking-widest focus:uppercase"
          style={{ background: "var(--craft-amber)", color: "#0A0500" }}
        >
          Skip to content
        </a>

        {/* Paper grain — editorial atmosphere at ~4% opacity */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
