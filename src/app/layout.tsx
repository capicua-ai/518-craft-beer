import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
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

export const metadata: Metadata = {
  title: "518 Craft Beer — Two New Beers from Troy, NY",
  description:
    "Farmers Market After Party Pilsner and Troy Night Out Hazy IPA. Brewed and canned in Elmsford, NY. Think NY, Drink NY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bebasNeue.variable} h-full antialiased`}
      style={{ background: "var(--craft-bg)" }}
    >
      <body
        className="flex min-h-full flex-col"
        style={{ background: "var(--craft-bg)", color: "var(--craft-cream)" }}
      >
        {children}
      </body>
    </html>
  );
}
