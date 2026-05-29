"use client";

import { useEffect, useRef, useState } from "react";

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
  const yesRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getCookie(COOKIE_NAME) !== "1") {
      setVisible(true);
    }
  }, []);

  // Lock body scroll and move focus when modal opens
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    yesRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Focus trap — keep Tab/Shift+Tab inside the dialog
  useEffect(() => {
    if (!visible) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        dialog!.querySelectorAll<HTMLElement>(
          'button, a, input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

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
      ref={dialogRef}
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
                ref={yesRef}
                onClick={handleYes}
                aria-label="Yes, I am 21 or older"
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
                aria-label="No, I am under 21"
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
              You must be 21 or older to visit this site.
            </p>
            <a
              href="https://www.responsibility.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.3em] uppercase mt-4 underline underline-offset-4"
              style={{ color: "rgba(245,229,192,0.4)" }}
              aria-label="Learn about responsible drinking at responsibility.org (opens in new tab)"
            >
              responsibility.org
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
