"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "age_verified";
const COOKIE_DAYS = 30;

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function AgeGate() {
  const [visible, setVisible] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (getCookie(COOKIE_NAME) !== "1") {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function handleYes() {
    setCookie(COOKIE_NAME, "1", COOKIE_DAYS);
    setVisible(false);
  }

  function handleNo() {
    setDenied(true);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Age verification"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10, 5, 0, 0.97)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-xs w-full">
        {/* 518 Craft mark */}
        <div className="mb-10">
          <p
            className="font-display text-7xl leading-none"
            style={{ color: "var(--craft-amber)" }}
          >
            518
          </p>
          <p
            className="font-display text-base tracking-[0.5em] uppercase mt-1"
            style={{ color: "rgba(245,229,192,0.5)" }}
          >
            CRAFT
          </p>
        </div>

        {!denied ? (
          <>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "rgba(245,229,192,0.4)" }}
            >
              Please confirm
            </p>
            <p
              className="font-display text-4xl uppercase leading-tight mb-10"
              style={{ color: "var(--craft-cream)" }}
            >
              Are you 21
              <br />
              or older?
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={handleYes}
                className="flex-1 py-4 font-display text-2xl uppercase tracking-widest transition-all duration-150 hover:brightness-110 active:scale-[0.97] cursor-pointer"
                style={{
                  background: "var(--craft-amber)",
                  color: "#0A0500",
                }}
              >
                YES
              </button>
              <button
                onClick={handleNo}
                className="flex-1 py-4 font-display text-2xl uppercase tracking-widest border transition-all duration-150 hover:bg-white/5 active:scale-[0.97] cursor-pointer"
                style={{
                  borderColor: "rgba(245,229,192,0.2)",
                  color: "rgba(245,229,192,0.7)",
                }}
              >
                NO
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p
              className="font-display text-3xl uppercase"
              style={{ color: "var(--craft-cream)" }}
            >
              Sorry
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(245,229,192,0.5)" }}
            >
              You must be 21 or older to visit this site. Please come back when
              you&apos;re of legal drinking age.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
