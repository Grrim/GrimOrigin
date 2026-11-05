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
