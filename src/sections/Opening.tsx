import { useCallback, useEffect, useRef, useState } from 'react';
import { asset, EMAIL, WORLDS, WORLD_ORDER, type World } from '../content';
import { gsap, reducedMotion, scrollToId } from '../motion';
import { Arrow } from '../components/ui';

const SLIDE_MS = 8000;

/** Game title set in each world's own typeface. */
export function GameLogo({ world, size = 'xl' }: { world: World; size?: 'xl' | 'md' | 'sm' }) {
  return (
    <span className={`logo logo--${world.id} logo--${size}`}>
      {world.id === 'varden' ? <>VARDEN<span className="logo-files">FILES</span></> : world.title}
    </span>
  );
}

/** Three phones in a fan: the centre one forward, two behind. */
export function PhoneFan({ world, eager = false }: { world: World; eager?: boolean }) {
  const [c, l, r] = world.heroShots;
  const phone = (i: number, pos: string) => {
    const s = world.shots[i];
    // The slot holds the fan position; the phone inside is what GSAP animates.
    return (
      <div className={`fan-slot fan-slot--${pos}`} style={{ ['--r' as string]: s.ratio ?? 2.1667 }}>
        <div className={`fan-phone fan-phone--${pos}`}>
          <img src={asset(s.src)} alt={pos === 'c' ? `${world.title} — ${s.caption}` : ''} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
        </div>
      </div>
    );
  };
  return (
    <div className="fan" aria-hidden={false}>
      {phone(l, 'l')}
      {phone(r, 'r')}
      {phone(c, 'c')}
    </div>
  );
}

/** Full-screen featured slider — one slide per game, like a publisher's front page. */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const world = WORLDS[WORLD_ORDER[index]];

  const go = useCallback((i: number) => setIndex((i + WORLD_ORDER.length) % WORLD_ORDER.length), []);

  // Tell the particle field which world is on stage.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.dataset.stage = String(world.stage);
    el.dataset.world = world.id;
    window.dispatchEvent(new Event('cosmos:resync'));
  }, [world]);

  // Auto-advance (paused on hover/focus, off under reduced motion).
  useEffect(() => {
    if (paused || reducedMotion()) return;
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  // Slide-in choreography.
  useEffect(() => {
    if (reducedMotion()) return;
    const el = root.current?.querySelector('.slide.is-active');
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.slide-kicker, .slide-tagline, .slide-actions', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08, delay: 0.25 });
      gsap.fromTo('.logo', { yPercent: 30, autoAlpha: 0, filter: 'blur(12px)' }, { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', delay: 0.1 });
      gsap.fromTo('.fan-phone--c', { y: 80, autoAlpha: 0, rotate: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out', delay: 0.15 });
      gsap.fromTo('.fan-phone--l', { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out', delay: 0.3 });
      gsap.fromTo('.fan-phone--r', { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out', delay: 0.3 });
    }, el);
    return () => ctx.revert();
  }, [index]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };

  return (
    <section
      id="top"
      ref={root}
      className={`hero hero--${world.id}`}
      data-stage={world.stage}
      data-world={world.id}
      data-hero
      aria-roledescription="carousel"
      aria-label="Featured games"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
    >
      <div className="hero-vignette" aria-hidden />
      {WORLD_ORDER.map((id, i) => {
        const w = WORLDS[id];
        const active = i === index;
        return (
          <div
            key={id}
            className={`slide ${active ? 'is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${WORLD_ORDER.length}: ${w.title}`}
            aria-hidden={!active}
            inert={!active}
          >
            <div className="container slide-inner">
              <div className="slide-copy">
                <p className="slide-kicker"><span className="pulse" aria-hidden />{w.kind} · {w.genre} · {w.status}</p>
                <h2 className="slide-title"><GameLogo world={w} /></h2>
                <p className="slide-tagline">{w.tagline}</p>
                <div className="slide-actions">
                  <button type="button" className="btn btn-solid" onClick={() => scrollToId(id)}>Explore {w.title} <Arrow dir="down" /></button>
                  <a className="btn btn-line" href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${w.title} — closed test`)}`}>Join the closed test</a>
                </div>
              </div>
              <div className="slide-art"><PhoneFan world={w} eager={i === 0} /></div>
            </div>
          </div>
        );
      })}

      <div className="container hero-controls">
        <ol className="hero-tabs">
          {WORLD_ORDER.map((id, i) => (
            <li key={id}>
              <button type="button" className={`hero-tab ${i === index ? 'is-active' : ''}`} onClick={() => go(i)} aria-current={i === index ? 'true' : undefined}>
                <span className="hero-tab-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="hero-tab-name">{WORLDS[id].title}</span>
                <span className="hero-tab-bar" aria-hidden><span key={`${index}-${paused}`} className={i === index && !paused ? 'is-running' : ''} style={{ animationDuration: `${SLIDE_MS}ms` }} /></span>
              </button>
            </li>
          ))}
        </ol>
        <div className="hero-arrows">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous game"><Arrow dir="left" /></button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next game"><Arrow dir="right" /></button>
        </div>
      </div>
    </section>
  );
}
