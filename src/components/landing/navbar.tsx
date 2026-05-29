"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Our Beers", href: "#beers" },
  { label: "Visit Us", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      aria-label="Main navigation"
      style={{
        background: scrolled ? "rgba(5,2,0,0.92)" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(201,125,26,0.12)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-8 md:px-12 lg:px-16 h-16 md:h-20">
        {/* Logo */}
        <a href="/" aria-label="518 Craft — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/518logo.svg"
            alt="518 Craft"
            className="h-8 md:h-10 w-auto transition-opacity duration-300"
            style={{ opacity: scrolled ? 1 : 0.9 }}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.4em] uppercase transition-colors duration-200 hover:text-craft-amber relative group"
              style={{ color: "rgba(245,229,192,0.88)", textDecoration: "none" }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: "var(--craft-amber)" }}
                aria-hidden="true"
              />
            </a>
          ))}
          <a
            href="#visit"
            className="text-xs tracking-[0.3em] uppercase font-semibold px-4 py-2 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "var(--craft-amber)",
              color: "#0A0500",
              textDecoration: "none",
            }}
          >
            <span aria-hidden="true">↗ </span>200 Broadway
          </a>
        </div>

        {/* Mobile — logo only + CTA */}
        <a
          href="#visit"
          className="md:hidden text-xs tracking-[0.3em] uppercase font-semibold px-3 py-2"
          style={{
            border: "1px solid var(--craft-amber)",
            color: "var(--craft-amber)",
            textDecoration: "none",
          }}
          aria-label="Visit 518 Craft at 200 Broadway"
        >
          Visit
        </a>
      </div>
    </nav>
  );
}
