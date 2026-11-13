import { useEffect, useRef, useState, type ReactNode } from 'react';
import { asset, EMAIL, type World } from '../content';
import { finePointer, reducedMotion } from '../motion';

/** Chapter rule: "Chapter II — Game · Found-phone thriller ————— status". */
export function ChapterRule({ world }: { world: World }) {
  return (
    <div className="chapter-rule" data-reveal>
      <span className="chapter-no">World {world.numeral}</span>
      <span className="chapter-kind">{world.kind} · {world.genre}</span>
      <span aria-hidden className="chapter-line" />
      <span className="chapter-status"><span aria-hidden className="pulse" />{world.status}</span>
    </div>
  );
}

/**
 * Centred, draggable rail of screenshots. It opens on the middle shot, snaps
 * each shot to the centre of the page and fades out at both edges. Native
 * scroll underneath, so touch and keyboard just work.
 */
export function ShotRail({ world, label, video }: { world: World; label: string; video?: { src: string; poster: string; caption: string } }) {
  const ref = useRef<HTMLDivElement>(null);

  // Start on the middle shot so the rail sits symmetrically under the page.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const centre = () => {
      const mid = el.children[Math.floor(el.children.length / 2)] as HTMLElement | undefined;
      if (mid) el.scrollLeft = mid.offsetLeft + mid.offsetWidth / 2 - el.clientWidth / 2;
    };
    centre();
    let lastW = window.innerWidth;
    const onResize = () => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; centre(); } };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    let down = false, startX = 0, startLeft = 0, moved = false;
    const onDown = (e: PointerEvent) => { down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft; el.classList.add('is-grabbing'); };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => { down = false; el.classList.remove('is-grabbing'); };
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('click', onClick, true);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('click', onClick, true);
    };
  }, []);

  const offset = video ? 1 : 0;
  return (
    <div className="rail-wrap" data-reveal>
      <div ref={ref} className="rail" role="region" aria-label={label} tabIndex={0} data-cursor="Drag">
        {video && <VideoShot {...video} />}
        {world.shots.map((s, i) => {
          const ratio = s.ratio ?? 19.5 / 9;
          return (
            <figure key={s.src} className="shot" style={{ ['--r' as string]: ratio }}>
              <div className="shot-media">
                <img src={asset(s.src)} alt={`${world.title} — ${s.caption}`} loading="lazy" decoding="async" draggable={false} width={720} height={Math.round(720 * ratio)} />
              </div>
              <figcaption><span>{String(i + 1 + offset).padStart(2, '0')}</span>{s.caption}</figcaption>
            </figure>
          );
        })}
      </div>
      <div className="rail-nav">
        <button type="button" className="rail-btn" onClick={() => step(-1)} aria-label="Previous screenshot"><Arrow dir="left" /></button>
        <button type="button" className="rail-btn" onClick={() => step(1)} aria-label="Next screenshot"><Arrow dir="right" /></button>
      </div>
    </div>
  );
}

/** A muted gameplay loop that only plays while it is on screen (and never under reduced motion). */
function VideoShot({ src, poster, caption }: { src: string; poster: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.play().catch(() => {}); } else { v.pause(); }
    }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="shot is-video" style={{ ['--r' as string]: 844 / 390 }}>
      <div className="shot-media">
        <video ref={ref} src={asset(src)} poster={asset(poster)} muted loop playsInline preload="metadata" aria-label={caption} controls={reducedMotion()} />
        <span className="shot-live" aria-hidden><span className="pulse" />In game</span>
      </div>
      <figcaption><span>01</span>{caption}</figcaption>
    </figure>
  );
}

/** Icon + status + closed-test request + privacy link. */
export function WorldFoot({ world, note }: { world: World; note: string }) {
  const subject = encodeURIComponent(`${world.title} — closed test`);
  const store = world.links?.googlePlay;
  return (
    <div className="world-foot" data-reveal>
      <img className="world-icon" src={asset(world.icon)} alt="" width={64} height={64} loading="lazy" />
      <div className="world-foot-text">
        <strong>{world.title}</strong>
        <span>{note}</span>
      </div>
      <div className="world-foot-actions">
        {store ? (
          <a className="btn btn-solid" href={store} target="_blank" rel="noopener">Get it on Google Play <Arrow /></a>
        ) : (
          <a className="btn btn-solid" href={`mailto:${EMAIL}?subject=${subject}`} data-cursor="Write">Join the closed test <Arrow /></a>
        )}
        <a className="btn btn-line" href={asset(world.privacyHref)} target="_blank" rel="noopener">Privacy policy</a>
      </div>
    </div>
  );
}

export function Arrow({ dir = 'ne' }: { dir?: 'ne' | 'down' | 'right' | 'left' }) {
  const paths = {
    ne: 'M4.5 11.5 11.5 4.5M5.5 4.5h6v6',
    down: 'M8 3v10M3.5 8.5 8 13l4.5-4.5',
    right: 'M3 8h10M8.5 3.5 13 8l-4.5 4.5',
    left: 'M13 8H3M7.5 3.5 3 8l4.5 4.5',
  };
  const d = paths[dir];
  return (
    <svg aria-hidden className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  );
}

/** Numbered feature list. */
export function FeatureList({ items, className = '' }: { items: { title: string; body: string }[]; className?: string }) {
  return (
    <ol className={`features ${className}`}>
      {items.map((f, i) => (
        <li key={f.title} className="feature" data-reveal>
          <span className="feature-no">{String(i + 1).padStart(2, '0')}</span>
          <h4>{f.title}</h4>
          <p>{f.body}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Desktop-only hover label ("Drag", "Open", "Write") next to the system cursor.
 * The pointer itself stays the native, hardware-drawn cursor, so it never lags
 * behind the mouse however busy the page is; the label is moved straight from
 * the pointer event, with no easing loop.
 */
export function Cursor() {
  const tag = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => typeof window !== 'undefined' && finePointer());

  useEffect(() => {
    const el = tag.current;
    if (!enabled || !el) return;
    let current = '';
    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const label = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      if (label === current) return;
      current = label;
      if (label) el.textContent = label;
      el.classList.toggle('is-on', !!label);
    };
    const onLeave = () => { current = ''; el.classList.remove('is-on'); };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={tag} className="cursor-tag" aria-hidden />;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow" data-reveal>{children}</p>;
}
