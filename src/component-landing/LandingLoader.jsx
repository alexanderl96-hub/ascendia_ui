import React, { useEffect, useRef, useState } from "react";
import "./landing-loader.css";

/**
 * Fullscreen loading/landing screen
 *
 * Props:
 * - bgUrl: string       // background image URL (default: /images/loading-planet.png)
 * - duration: number    // ms for the progress to hit 100% (default: 4000)
 * - onDone: () => void  // optional callback when progress completes
 * - title: string       // optional "Loading..." text override
 */
export default function LandingLoader({
   src,
  alt = "",
  duration = 4000,
  onDone,
  stickyMs = 300,
  respectReducedMotion = true,
}) {
   const barRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReduced =
      respectReducedMotion &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced motion: jump to 100%, then finish
    if (prefersReduced) {
      bar.style.width = "100%";
      setPercent(100);
      const t = setTimeout(() => onDone && onDone(), stickyMs);
      return () => clearTimeout(t);
    }

    const supportsWAAPI = typeof bar.animate === "function";
    const start = performance.now();

    let rafId;

    if (supportsWAAPI) {
      // WAAPI animation
      bar.animate([{ width: "0%" }, { width: "100%" }], {
        duration,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      });

      // Drive the percentage text
      const tick = (now) => {
        const elapsed = Math.min(now - start, duration);
        const p = Math.round((elapsed / duration) * 100);
        setPercent(p);
        if (elapsed < duration) {
          rafId = requestAnimationFrame(tick);
        } else {
          // Hold briefly, then complete
          setTimeout(() => onDone && onDone(), stickyMs);
        }
      };
      rafId = requestAnimationFrame(tick);
    } else {
      // Fallback: CSS transition + rAF for percentage
      bar.style.transition = `width ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      // Ensure layout is ready before setting width
      requestAnimationFrame(() => (bar.style.width = "100%"));

      const tick = (now) => {
        const elapsed = Math.min(now - start, duration);
        const p = Math.round((elapsed / duration) * 100);
        setPercent(p);
        if (elapsed < duration) {
          rafId = requestAnimationFrame(tick);
        } else {
          setTimeout(() => onDone && onDone(), stickyMs);
        }
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [duration, onDone, stickyMs, respectReducedMotion]);


  return (
     <div className="icl-root"  style={{ backgroundImage: `url(${src})` }}  >
     
      {/* Bottom progress HUD (always visible) */}
      <div className="icl-hud">
        <div className="icl-track">
          <div className="icl-bar" ref={barRef} />
        </div>
        <div className="icl-hud-row">
          <span className="icl-caption">Loading…</span>
          <span className="icl-percent" aria-live="polite">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
