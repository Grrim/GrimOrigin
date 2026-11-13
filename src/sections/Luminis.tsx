import { LUMINIS, WORLDS } from '../content';
import { ChapterRule, FeatureList, ShotRail, WorldFoot } from '../components/ui';

export function Luminis() {
  const w = WORLDS.luminis;
  return (
    <section id="luminis" className="world world--luminis" data-stage="1" data-world="luminis" aria-labelledby="luminis-title">
      <div className="container">
        <ChapterRule world={w} />

        <div className="world-stage">
          <div className="world-copy">
            <h2 id="luminis-title" className="luminis-title" data-split>LUMINIS</h2>
            <p className="luminis-sub" data-reveal>{LUMINIS.subtitle}</p>
            <p className="world-hook" data-reveal>{LUMINIS.hook}</p>
            <p className="world-pitch" data-reveal>{LUMINIS.pitch}</p>
          </div>
          <div className="world-visual-space" aria-hidden />
        </div>

        <dl className="stats stats--luminis">
          {LUMINIS.stats.map(([n, label]) => (
            <div key={label} className="stat" data-reveal>
              <dt>{label}</dt>
              <dd data-count={n}>{n}</dd>
            </div>
          ))}
        </dl>

        <FeatureList items={LUMINIS.features} className="features--luminis" />
      </div>

      <ShotRail world={w} label="LUMINIS screenshots" video={LUMINIS.video} />

      <div className="container">
        <WorldFoot world={w} note={LUMINIS.meta} />
      </div>
    </section>
  );
}
