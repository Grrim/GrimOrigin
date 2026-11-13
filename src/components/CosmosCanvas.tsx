import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, reducedMotion, finePointer } from '../motion';
import type { CosmosHandle } from '../scene/cosmos';

/**
 * Fixed WebGL backdrop. Every element with `data-stage="<0..4>"` re-targets the
 * particle field when it reaches the middle of the viewport, and sets
 * `data-world` on <html> so CSS can re-tint the whole page.
 */
export function CosmosCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = reducedMotion();
    let cosmos: CosmosHandle | null = null;
    let disposed = false;
    const triggers: ScrollTrigger[] = [];
    const cleanups: (() => void)[] = [];

    const stageEls = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'));
    let current: HTMLElement | null = null;

    /** The stage element under the middle of the viewport. */
    const findCurrent = () => {
      const mid = window.innerHeight * 0.5;
      return stageEls.find((el) => { const r = el.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; }) ?? stageEls[0];
    };

    // Page tint works even if WebGL never loads.
    const sync = (instant = false) => {
      const el = findCurrent();
      if (!el || el === current) return;
      current = el;
      document.documentElement.dataset.world = el.dataset.world ?? 'origin';
      if (!cosmos) return;
      const target = Number(el.dataset.stage);
      if (reduce || instant) { gsap.killTweensOf(cosmos.state, 'mix'); cosmos.state.mix = target; if (reduce) cosmos.renderOnce(); return; }
      gsap.to(cosmos.state, { mix: target, duration: 2.2, ease: 'power3.inOut', overwrite: 'auto' });
    };

    stageEls.forEach((el) => {
      triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 50%', end: 'bottom 50%', onToggle: () => sync() }));
    });
    const onRefresh = () => sync();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    cleanups.push(() => ScrollTrigger.removeEventListener('refresh', onRefresh));
    // A section can change its own stage (the hero slider does) and ask for a re-sync.
    const onResync = () => { current = null; sync(); };
    window.addEventListener('cosmos:resync', onResync);
    cleanups.push(() => window.removeEventListener('cosmos:resync', onResync));
    sync();

    // Load three.js after first paint so the page is readable immediately.
    import('../scene/cosmos').then(({ createCosmos }) => {
      if (disposed) return;
      try {
        cosmos = createCosmos(canvas, { reducedMotion: reduce });
      } catch {
        canvas.remove(); // no WebGL – the CSS backdrop carries the page
        return;
      }
      cosmos.state.mix = current ? Number(current.dataset.stage) : 0;
      canvas.classList.add('is-ready');

      if (reduce) { cosmos.renderOnce(); }
      else {
        cosmos.start();
        gsap.to(cosmos.state, { intro: 1, duration: 3.2, ease: 'power2.out', delay: 0.15 });
      }

      const onResize = () => { cosmos?.resize(); if (reduce) cosmos?.renderOnce(); };
      window.addEventListener('resize', onResize);
      cleanups.push(() => window.removeEventListener('resize', onResize));

      if (!reduce && finePointer()) {
        const onMove = (e: PointerEvent) => cosmos?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
        window.addEventListener('pointermove', onMove, { passive: true });
        cleanups.push(() => window.removeEventListener('pointermove', onMove));
      }

      // Don't burn battery in a background tab.
      const onVis = () => { if (document.hidden) cosmos?.stop(); else if (!reduce) cosmos?.start(); };
      document.addEventListener('visibilitychange', onVis);
      cleanups.push(() => document.removeEventListener('visibilitychange', onVis));
    });

    return () => {
      disposed = true;
      triggers.forEach((t) => t.kill());
      cleanups.forEach((fn) => fn());
      cosmos?.dispose();
    };
  }, []);

  return <canvas ref={ref} className="cosmos" aria-hidden />;
}
