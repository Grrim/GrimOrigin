import { useState } from 'react';
import { asset, EMAIL, PRINCIPLES, WORLDS, WORLD_ORDER } from '../content';
import { useClock } from '../hooks/useClock';
import { scrollToId } from '../motion';
import { Arrow } from '../components/ui';

export function Studio() {
  return (
    <section id="studio" className="studio" data-stage="0" data-world="origin" aria-labelledby="studio-title">
      <div className="container">
        <p className="eyebrow" data-reveal>The studio</p>
        <p className="manifesto-text" data-scrub-words>
          Every world begins with a single point of light. A sky that forgot its song. A city whose phones
          remember. A calendar that keeps your secrets. We start small and build outward until it holds
          together, without ads, dark patterns or shortcuts.
        </p>
        <div className="studio-head">
          <h2 id="studio-title" className="section-title" data-split>One person.<br />Studio standards.</h2>
          <div className="studio-intro" data-reveal>
            <p>
              Grim Origin is an independent studio from Poland, founded in 2026. Design, code, music synthesis,
              level tools, store art and privacy policies are all made in-house, by one person.
            </p>
            <div className="founder">
              <img src={asset('avatar.webp')} alt="" width={56} height={56} loading="lazy" decoding="async" />
              <div><strong>Grzegorz</strong><span>Founder · design &amp; development</span></div>
            </div>
          </div>
        </div>

        <dl className="facts">
          <div className="fact" data-reveal><dt>Games &amp; apps</dt><dd data-count="3" data-pad="2">03</dd></div>
          <div className="fact" data-reveal><dt>Ads in any of them</dt><dd data-count="0" data-pad="2">00</dd></div>
          <div className="fact" data-reveal><dt>Team</dt><dd data-count="1" data-pad="2">01</dd></div>
          <div className="fact" data-reveal><dt>Based</dt><dd>PL</dd></div>
        </dl>

        <ol className="principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="principle" data-reveal>
              <span className="principle-no">{['I', 'II', 'III'][i]}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${EMAIL}`; }
  };
  const topics: [string, string][] = [
    ['Closed tests', 'Want to play LUMINIS or VARDEN FILES, or try Luna, before launch? Ask for an invite.'],
    ['Publishing & press', 'Publishers, platforms, journalists: include your outlet and deadline.'],
    ['Feedback & support', 'Bugs, ideas or questions about any of the worlds. Every message is read.'],
  ];
  return (
    <section id="contact" className="contact" data-stage="4" data-world="outro" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow" data-reveal>Contact</p>
        <h2 id="contact-title" className="section-title contact-title" data-split>Start something<br />with us.</h2>
        <div className="email-row" data-reveal>
          <a href={`mailto:${EMAIL}`} className="email-link" data-cursor="Write">{EMAIL}<Arrow /></a>
          <button type="button" onClick={copy} className="btn btn-line" aria-live="polite">{copied ? 'Copied ✓' : 'Copy address'}</button>
        </div>
        <div className="topics">
          {topics.map(([title, body], i) => (
            <div key={title} className="topic" data-reveal>
              <span className="topic-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ onLegal }: { onLegal: (kind: 'privacy' | 'terms') => void }) {
  const time = useClock('Europe/Warsaw');
  return (
    <footer className="footer" data-stage="4" data-world="outro">
      <div className="container footer-cols">
        <div className="footer-brand">
          <span className="footer-logo">Grim Origin<span className="dot">.</span></span>
          <p>Small worlds that begin with a single point of light. Designed and built in Poland.</p>
        </div>
        <nav aria-label="Worlds" className="footer-col">
          <h2>Worlds</h2>
          <ul>{WORLD_ORDER.map((id) => (<li key={id}><button type="button" onClick={() => scrollToId(id)}><span>{WORLDS[id].numeral}</span>{WORLDS[id].title}</button></li>))}</ul>
        </nav>
        <nav aria-label="Legal" className="footer-col">
          <h2>Legal</h2>
          <ul>
            <li><button type="button" onClick={() => onLegal('privacy')}>Studio privacy</button></li>
            <li><button type="button" onClick={() => onLegal('terms')}>Terms</button></li>
            {WORLD_ORDER.map((id) => (<li key={id}><a href={asset(WORLDS[id].privacyHref)} target="_blank" rel="noopener">{WORLDS[id].title} privacy</a></li>))}
          </ul>
        </nav>
      </div>
      <div aria-hidden className="footer-wordmark">Grim Origin</div>
      <div className="container footer-bar">
        <span>© {new Date().getFullYear()} Grim Origin</span>
        <span>52°N 19°E · {time}</span>
        <button type="button" onClick={() => scrollToId('top')}>Back to the first light ↑</button>
      </div>
    </footer>
  );
}
