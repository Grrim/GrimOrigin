import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from '../tokens';

/**
 * Cursor spotlight tracker — sets `--spot-x`, `--spot-y`, `--spot-on`
 * CSS variables on the target element. Pairs with `.beam-card` styling
 * in index.css to render a border beam and inner glow that follow the cursor.
 *
 * Runs through a single rAF tick per movement (no React re-renders).
 */
export function useSpotlight<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let raf: number | null = null;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        el.style.setProperty('--spot-x', `${x}px`);
        el.style.setProperty('--spot-y', `${y}px`);
      });
    };
    const onEnter = () => {
      el.style.setProperty('--spot-on', '1');
    };
    const onLeave = () => {
      el.style.setProperty('--spot-on', '0');
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);
}

/**
 * Magnetic hover — element nudges towards the cursor by a small amount
 * (clamped). Designed for nav links and small CTAs.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  strength = 0.35,
  max = 8
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let raf: number | null = null;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      const tx = Math.max(-max, Math.min(max, dx));
      const ty = Math.max(-max, Math.min(max, dy));
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
    };
    const onLeave = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength, max]);
}
