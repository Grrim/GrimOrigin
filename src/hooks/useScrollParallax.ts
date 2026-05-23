import { useEffect } from 'react';
import { prefersReducedMotion } from '../tokens';

/**
 * Global scroll parallax engine.
 *
 * Any element with `data-parallax` and `data-parallax-speed="<number>"`
 * gets a CSS custom property `--py` set every frame, where:
 *    --py = (centerOfElement - viewportCenter) * speed
 *
 * Element only animates while in viewport (IntersectionObserver pauses cost).
 * Single rAF loop for entire page; transforms read --py via CSS.
 *
 * Usage in JSX:
 *   <div
 *     data-parallax
 *     data-parallax-speed="-0.08"
 *     style={{ transform: 'translate3d(0, var(--py, 0px), 0)' }}
 *   />
 *
 * Negative speed = element moves up slower than scroll (background feel).
 * Positive speed = element drifts down (foreground accent).
 */
export function useScrollParallax() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion()) return;

    const visible = new Set<HTMLElement>();
    let raf: number | null = null;
    let needsUpdate = true;

    const update = () => {
      raf = null;
      const viewportCenter = window.innerHeight / 2;
      visible.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? '0');
        if (!speed) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const offset = (elementCenter - viewportCenter) * speed;
        el.style.setProperty('--py', `${offset.toFixed(2)}px`);
      });
    };

    const schedule = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(update);
    };

    const onScroll = () => schedule();
    const onResize = () => schedule();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        if (visible.size > 0) schedule();
      },
      { rootMargin: '20% 0px 20% 0px' }
    );

    const refresh = () => {
      // Re-scan DOM for parallax targets (handles dynamic mounts)
      visible.clear();
      io.disconnect();
      const els = document.querySelectorAll<HTMLElement>('[data-parallax]');
      els.forEach((el) => io.observe(el));
      schedule();
    };

    refresh();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initial paint
    schedule();
    needsUpdate = false;
    void needsUpdate;

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
