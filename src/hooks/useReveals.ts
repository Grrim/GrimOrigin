import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText, reducedMotion } from '../motion';

/**
 * Declarative scroll choreography. Markup opts in with data attributes:
 *   data-split          heading whose characters rise into place
 *   data-reveal         block that fades/slides in (batched, staggered)
 *   data-scrub-words    paragraph whose words light up as you scroll through it
 *   data-count          number that counts up when it enters the viewport
 *   data-parallax="n"   element drifts by n × its height while passing through
 * Hidden start states live in CSS under `html.motion`, so without JS (or with
 * reduced motion) everything is simply visible.
 */
export function useReveals() {
  useEffect(() => {
    if (reducedMotion()) return;
    let ctx: gsap.Context | null = null;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          const split = SplitText.create(el, { type: 'lines,chars', mask: 'lines', linesClass: 'split-line' });
          gsap.set(el, { autoAlpha: 1 });
          gsap.from(split.chars, {
            yPercent: 115,
            rotate: 6,
            duration: 1.1,
            ease: 'expo.out',
            stagger: { each: 0.022 },
            delay: el.dataset.splitDelay ? Number(el.dataset.splitDelay) : 0,
            scrollTrigger: el.closest('[data-hero]') ? undefined : { trigger: el, start: 'top 88%', once: true },
          });
        });

        // The opening screen plays as one sequence on load; everything else reveals on scroll.
        const all = gsap.utils.toArray<HTMLElement>('[data-reveal]');
        const opening = all.filter((el) => el.closest('[data-hero]'));
        gsap.to(opening, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.14, delay: 1.1 });

        ScrollTrigger.batch(all.filter((el) => !opening.includes(el)), {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
        });

        gsap.utils.toArray<HTMLElement>('[data-scrub-words]').forEach((el) => {
          const split = SplitText.create(el, { type: 'words' });
          gsap.fromTo(split.words, { opacity: 0.14 }, {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.6 },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const end = Number(el.dataset.count);
          const pad = el.dataset.pad ? Number(el.dataset.pad) : 0;
          const obj = { v: 0 };
          const fmt = (v: number) => String(Math.round(v)).padStart(pad, '0');
          el.textContent = fmt(0);
          gsap.to(obj, {
            v: end,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => { el.textContent = fmt(obj.v); },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 0.15;
          gsap.fromTo(el, { yPercent: amount * 100 }, {
            yPercent: -amount * 100,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
}
