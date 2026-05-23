import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from '../tokens';

/**
 * Initialize Lenis smooth scroll once for the entire app.
 * Returns the instance via window for `scrollTo` calls from anywhere.
 * Skipped under prefers-reduced-motion.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

/** Smooth scroll to an element id via Lenis (or native fallback). */
export function smoothScrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = typeof window !== 'undefined' ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(target, { offset: -8 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
