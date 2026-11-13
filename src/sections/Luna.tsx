import { useEffect, useRef } from 'react';
import { LUNA, WORLDS } from '../content';
import { ChapterRule, FeatureList, ShotRail, WorldFoot } from '../components/ui';
import { gsap, reducedMotion } from '../motion';

// An illustrative 28-day cycle; the app itself uses each person's own history.
const PHASES = [
  { name: 'Period', days: 5, cls: 'p-period' },
  { name: 'Follicular', days: 8, cls: 'p-follicular' },
  { name: 'Ovulation', days: 3, cls: 'p-ovulation' },
  { name: 'Luteal', days: 12, cls: 'p-luteal' },
];
const TOTAL = PHASES.reduce((s, p) => s + p.days, 0);
const R = 120;
const CIRC = 2 * Math.PI * R;
const GAP = 6;
/** Each phase as an arc: its drawn length and the angle it starts at. */
const ARCS = PHASES.map((p, i) => {
  const before = PHASES.slice(0, i).reduce((s, q) => s + q.days, 0);
  return { ...p, len: (p.days / TOTAL) * CIRC - GAP, angle: (before / TOTAL) * 360 };
});

function phaseOf(day: number) {
  let acc = 0;
  for (const p of PHASES) { acc += p.days; if (day <= acc) return p.name; }
  return PHASES[PHASES.length - 1].name;
}

/** Cycle ring whose day marker follows the scroll position. */
function CycleRing() {
  const root = useRef<HTMLDivElement>(null);
  const marker = useRef<SVGGElement>(null);
  const dayEl = useRef<HTMLSpanElement>(null);
  const phaseEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.ring-arc', { strokeDashoffset: (_i: number, t: SVGCircleElement) => Number(t.dataset.len), duration: 1.4, ease: 'expo.out', stagger: 0.15, scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
      const s = { d: 1 };
      gsap.to(s, {
        d: TOTAL,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 20%', scrub: 0.8 },
        onUpdate: () => {
          const day = Math.max(1, Math.min(TOTAL, Math.round(s.d)));
          if (dayEl.current) dayEl.current.textContent = String(day);
          if (phaseEl.current) phaseEl.current.textContent = phaseOf(day);
          // SVG transform attribute rotates around the user-space origin, i.e. the ring centre.
          marker.current?.setAttribute('transform', `rotate(${((s.d - 0.5) / TOTAL) * 360})`);
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="cycle-ring" role="img" aria-label="Illustration of a cycle ring with four phases: period, follicular, ovulation and luteal">
      <svg viewBox="-150 -150 300 300" aria-hidden>
        <circle r={R} className="ring-track" />
        <g transform="rotate(-90)">
          {ARCS.map((a) => (
            <circle
              key={a.name}
              r={R}
              className={`ring-arc ${a.cls}`}
              strokeDasharray={`${a.len} ${CIRC}`}
              strokeDashoffset={0}
              data-len={a.len}
              transform={`rotate(${a.angle})`}
            />
          ))}
        </g>
        <g ref={marker} className="ring-marker">
          <circle cx="0" cy={-R} r="11" className="ring-marker-halo" />
          <circle cx="0" cy={-R} r="6" className="ring-marker-dot" />
        </g>
      </svg>
      <div className="ring-center">
        <span className="ring-label">Cycle day</span>
        <span ref={dayEl} className="ring-day">1</span>
        <span ref={phaseEl} className="ring-phase">Period</span>
      </div>
      <ul className="ring-legend">
        {PHASES.map((p) => <li key={p.name}><span aria-hidden className={`ring-swatch ${p.cls}`} />{p.name}</li>)}
      </ul>
    </div>
  );
}

export function Luna() {
  const w = WORLDS.luna;
  return (
    <section id="luna" className="world world--lune" data-stage="3" data-world="luna" aria-labelledby="luna-title">
      <div className="container">
        <ChapterRule world={w} />

        <div className="world-stage">
          <div className="world-copy">
            <h2 id="luna-title" className="lune-title" data-split>Luna</h2>
            <p className="lune-tag" data-reveal>{LUNA.tagline}</p>
          </div>
          <div className="world-visual-space" aria-hidden />
        </div>

        <div className="honesty">
          {LUNA.promises.map((h) => (
            <div key={h.title} className="honesty-item" data-reveal>
              <h4>{h.title}</h4>
              <p>{h.body}</p>
            </div>
          ))}
        </div>

        <dl className="stats stats--luna">
          {LUNA.stats.map(([n, label]) => (
            <div key={label} className="stat" data-reveal><dt>{label}</dt><dd data-count={n}>{n}</dd></div>
          ))}
        </dl>

        <div className="lune-grid">
          <div>
            <h3 className="lune-h" data-reveal>Privacy you don’t have to <em>take on faith</em></h3>
            <FeatureList items={LUNA.privacy} className="features--lune" />
          </div>
          <CycleRing />
        </div>
        <p className="lune-disclaimer" data-reveal>{LUNA.disclaimer}</p>
      </div>

      <ShotRail world={w} label="Luna screenshots" />

      <div className="container">
        <WorldFoot world={w} note={LUNA.meta} />
      </div>
    </section>
  );
}
