import { asset, EMAIL, NEWS, PRESS_FACTS, WORLDS, WORLD_ORDER } from '../content';
import { scrollToId } from '../motion';
import { Arrow } from '../components/ui';
import { GameLogo } from './Opening';

const fmtDate = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Publisher-style grid of capsule cards. */
export function Games() {
  return (
    <section id="games" className="games" data-stage="0" data-world="origin" aria-labelledby="games-title">
      <div className="container">
        <header className="block-head">
          <p className="eyebrow" data-reveal>Our games</p>
          <h2 id="games-title" className="section-title" data-split>Three worlds.<br />One origin.</h2>
        </header>
        <ul className="capsules">
          {WORLD_ORDER.map((id) => {
            const w = WORLDS[id];
            const art = w.shots[w.cardShot];
            return (
              <li key={id} data-reveal>
                <button type="button" className={`capsule capsule--${id}`} onClick={() => scrollToId(id)} data-cursor="Open" aria-label={`${w.title}: ${w.genre}`}>
                  <span className="capsule-art">
                    <img src={asset(art.src)} alt="" loading="lazy" decoding="async" />
                    <span className="capsule-chip">{w.kind} · v{w.version}</span>
                  </span>
                  <span className="capsule-body">
                    <GameLogo world={w} size="md" />
                    <span className="capsule-genre">{w.genre}</span>
                    <span className="capsule-tagline">{w.tagline}</span>
                    <span className="capsule-foot">
                      <span><span className="pulse" aria-hidden />Closed testing</span>
                      <span className="capsule-platform"><PlayIcon /> Android</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Latest changes, straight from each project's changelog. */
export function News() {
  return (
    <section id="news" className="news" data-stage="0" data-world="origin" aria-labelledby="news-title">
      <div className="container">
        <header className="block-head block-head--row">
          <div>
            <p className="eyebrow" data-reveal>Latest</p>
            <h2 id="news-title" className="section-title section-title--sm" data-split>From the studio</h2>
          </div>
        </header>
        <ul className="news-list">
          {NEWS.map((n) => {
            const w = WORLDS[n.world];
            const s = w.shots[n.shot];
            return (
              <li key={n.title} data-reveal>
                <article className={`news-card news-card--${w.id}`}>
                  <button type="button" className="news-hit" onClick={() => scrollToId(w.id)} aria-label={`${n.title}. Read about ${w.title}`} />
                  <div className="news-art"><img src={asset(s.src)} alt="" loading="lazy" decoding="async" /></div>
                  <div className="news-text">
                    <p className="news-meta"><time dateTime={n.date}>{fmtDate(n.date)}</time><span>{w.title}</span></p>
                    <h3>{n.title}</h3>
                    <p>{n.body}</p>
                    <span className="news-more">Read more <Arrow dir="right" /></span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Press & partners: fact sheet, icons, and a direct line. */
export function Press() {
  return (
    <section id="press" className="press" data-stage="0" data-world="origin" aria-labelledby="press-title">
      <div className="container press-grid">
        <div>
          <p className="eyebrow" data-reveal>Press & partners</p>
          <h2 id="press-title" className="section-title section-title--sm" data-split>Press kit</h2>
          <p className="press-intro" data-reveal>
            Writing about one of our games, or want to bring it to a new platform? Here are the facts.
            Store art, builds for review and interviews on request.
          </p>
          <a className="btn btn-solid" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Press kit request')}`} data-reveal>Request press kit <Arrow /></a>
        </div>
        <div>
          <dl className="press-facts" data-reveal>
            {PRESS_FACTS.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
          <ul className="press-icons" data-reveal>
            {WORLD_ORDER.map((id) => (
              <li key={id}>
                <a href={asset(WORLDS[id].icon)} download>
                  <img src={asset(WORLDS[id].icon)} alt="" width={56} height={56} loading="lazy" />
                  <span>{WORLDS[id].title}<small>App icon · 256 px</small></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2.4 1.3c-.2.2-.3.5-.3.9v11.6c0 .4.1.7.3.9l6.5-6.7-6.5-6.7Zm7.3 7.5-1.6 1.6-5 5.2c.3.1.7 0 1-.2l7.7-4.4-2.1-2.2Zm3.6-2.1-1.9-1.1-2.3 2.4 2.3 2.4 1.9-1.1c.7-.4.7-2.2 0-2.6Zm-11 -5.6 5 5.2 1.6 1.6 2.1-2.2-7.7-4.4c-.3-.2-.7-.3-1-.2Z" /></svg>
  );
}
