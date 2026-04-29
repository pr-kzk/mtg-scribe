import { useEffect, useState } from "react";

interface Viewport {
  isMobile: boolean;
  isTablet: boolean;
}

const compute = (w: number): Viewport => ({
  isMobile: w <= 640,
  isTablet: w <= 880,
});

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(() =>
    compute(typeof window !== "undefined" ? window.innerWidth : 1024),
  );
  useEffect(() => {
    const onResize = (): void => setViewport(compute(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return viewport;
}
