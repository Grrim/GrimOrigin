import { useEffect, useRef } from 'react';
import { VARDEN, WORLDS } from '../content';
import { ChapterRule, FeatureList, ShotRail, WorldFoot } from '../components/ui';
import { useClock } from '../hooks/useClock';
import { gsap, reducedMotion } from '../motion';

/** A lock screen that shows the visitor's own time, with notifications arriving as you scroll. */
function LockScreen() {
  const time = useClock(undefined, false);
  const date = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.notif');
      gsap.set(cards, { autoAlpha: 0, y: 24, scale: 0.96 });
      gsap.to(cards, {
        autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.9,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="lock" aria-label="A found phone's lock screen" role="img">
      <div className="lock-status"><span>{time}</span><span>HB_Guest</span><span>9%</span></div>
      <div className="lock-clock">{time}</div>
      <div className="lock-date">{date}</div>
      <div className="lock-notifs">
        {VARDEN.notifications.map((n) => (
          <div key={n.text} className="notif">
            <div className="notif-head"><span className="notif-app">{n.app}</span><span>{n.time}</span></div>
            <p>{n.text}</p>
          </div>
        ))}
      </div>
      <div className="lock-hint">Tap to unlock</div>
    </div>
  );
}

export function Varden() {
  const w = WORLDS.varden;
  return (
    <section id="varden" className="world world--varden" data-stage="2" data-world="varden" aria-labelledby="varden-title">
      <div className="container">
        <ChapterRule world={w} />

        <div className="world-stage world-stage--flip" data-vivid>
          <div className="world-visual-space" aria-hidden />
          <div className="world-copy">
            <p className="varden-kicker" data-reveal><span aria-hidden className="rec" />Found phone thriller</p>
            <h2 id="varden-title" className="varden-title" data-split>Varden<br />Files</h2>
            <p className="varden-tag" data-reveal>{VARDEN.tagline}</p>
            <p className="world-hook" data-reveal>{VARDEN.hook}</p>
            <p className="world-pitch" data-reveal>{VARDEN.pitch}</p>
          </div>
        </div>

        <dl className="stats">
          {VARDEN.stats.map(([n, label]) => (
            <div key={label} className="stat" data-reveal><dt>{label}</dt><dd data-count={n}>{n}</dd></div>
          ))}
        </dl>

        <div className="varden-grid">
          <LockScreen />
          <FeatureList items={VARDEN.features} className="features--varden" />
        </div>

        <div className="locker">
          <header className="locker-head" data-reveal>
            <span className="locker-label">{VARDEN.custodian.label}</span>
            <h3>{VARDEN.custodian.title}</h3>
            <p>{VARDEN.custodian.body}</p>
          </header>
          <ol className="cases">
            {VARDEN.cases.map((c) => (
              <li key={c.no} className={`case ${c.open ? 'is-open' : 'is-sealed'}`} data-reveal>
                <div className="case-top">
                  <span className="case-no">Case {c.no}</span>
                  <span className="case-state">{c.open ? 'On the shelf' : 'Sealed'}</span>
                </div>
                <h4>{c.title}</h4>
                <p>{c.line}</p>
                {c.seal && <p className="case-ida">Ida: {c.seal}</p>}
                {!c.open && <span className="case-seal" aria-hidden>Evidence · do not open</span>}
              </li>
            ))}
          </ol>
          <p className="locker-note" data-reveal>{VARDEN.lockerNote}</p>
        </div>
      </div>

      <ShotRail world={w} label="VARDEN FILES screenshots" />

      <div className="container">
        <WorldFoot world={w} note={VARDEN.meta} />
      </div>
    </section>
  );
}
