import { useEffect, useRef } from "react";

export function useResizeRedraw(containerRef, onResize) {
  const rafId = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      // debounce via rAF
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(onResize);
    });
    ro.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, [containerRef, onResize]);
}
