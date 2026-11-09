import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { APPS, PROJECTS, asset } from './content';
import { FloatingNav, type NavSection } from './components/FloatingNav';
import { AppShowcase } from './components/AppShowcase';
import { AppDrawer } from './components/AppDrawer';
import { OrbitChart } from './components/OrbitChart';
import { LegalModal } from './components/Legal';
import { useLenis, smoothScrollTo } from './hooks/useLenis';
import { useLocalTime } from './hooks/useLocalTime';

const EMAIL = 'grimssys@gmail.com';

const SECTIONS: NavSection[] = [
  { id: 'work', label: 'Work' },
  { id: 'labs', label: 'Labs' },
  { id: 'studio', label: 'Studio' },
  { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

const pad2 = (n: number) => String(n).padStart(2, '0');
const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (reduce) { els.forEach((el) => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } }); },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const sections = ['hero', ...ids].map((id) => document.getElementById(id)).filter((x): x is HTMLElement => !!x);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id === 'hero' ? '' : entry.target.id); }); },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function App() {
  const [drawer, setDrawer] = useState({ id: APPS[0].id, open: false });
  const [legal, setLegal] = useState<'privacy' | 'terms' | null>(null);
  const openApp = useCallback((id: string) => setDrawer({ id, open: true }), []);
  const closeDrawer = useCallback(() => setDrawer((d) => ({ ...d, open: false })), []);
  const closeLegal = useCallback(() => setLegal(null), []);
  useLenis(); useScrollReveal();
  const activeSection = useActiveSection(SECTION_IDS);
  const drawerApp = APPS.find((a) => a.id === drawer.id) ?? APPS[0];

  return (
    <div className="site">
      <GridLines />
      <FloatingNav sections={SECTIONS} active={activeSection} />
      <main>
        <Hero />
        <Marquee />
        <Work onOpen={openApp} />
        <Labs />
        <Studio />
        <Contact />
      </main>
      <Footer onOpenApp={openApp} onOpenLegal={setLegal} />
      <AppDrawer app={drawerApp} open={drawer.open} onClose={closeDrawer} />
      <LegalModal kind={legal} onClose={closeLegal} />
    </div>
  );
}

/** Faint column rules behind the page — the catalogue's ruled paper. */
function GridLines() {
  return (
    <div aria-hidden className="grid-lines">
      <div className="container">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const time = useLocalTime();
  const building = APPS[0];
  return (
    <section id="hero" className="hero">
      <div className="container">
        <dl className="cover-strip hero-word" style={{ ['--word-delay' as never]: '0ms' }}>
          <div><dt>File</dt><dd>GO / 2026</dd></div>
          <div><dt>Subject</dt><dd>Independent mobile studio</dd></div>
          <div><dt>Coordinates</dt><dd>52°N 19°E · Poland</dd></div>
          <div><dt>Local time</dt><dd>{time}</dd></div>
        </dl>

        <div className="cover">
          <h1 className="wordmark">
            <span className="hero-line"><span className="hero-word" style={{ ['--word-delay' as never]: '80ms' }}>Grim</span></span>
            <span className="hero-line"><span className="hero-word" style={{ ['--word-delay' as never]: '180ms' }}>Origin<span className="wordmark-dot">.</span></span></span>
          </h1>
          <div className="cover-chart hero-word" style={{ ['--word-delay' as never]: '320ms' }}>
            <OrbitChart apps={APPS} />
          </div>
        </div>

        <div className="cover-foot hero-word" style={{ ['--word-delay' as never]: '480ms' }}>
          <p className="cover-lede">
            Small games and tools about <em>how things begin</em> — stars, secrets and cycles. Designed and built by one person in Poland.
          </p>
          <div className="cover-actions">
            <button type="button" onClick={() => smoothScrollTo('work')} className="btn btn-primary">
              Open the catalogue <span aria-hidden className="btn-arrow">↓</span>
            </button>
            <button type="button" onClick={() => smoothScrollTo('contact')} className="btn btn-ghost">
              Write to the studio <span aria-hidden className="btn-arrow">→</span>
            </button>
          </div>
          <button type="button" className="now-building" onClick={() => smoothScrollTo('work')}>
            <span aria-hidden className="status-dot is-live" />
            <span className="now-label">{building.status === 'Closed Testing' ? 'Now in closed testing' : 'Now building'}</span>
            <span className="now-title">{building.title}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...APPS.map((a) => a.title), 'Physics puzzles', 'Narrative games', 'Privacy-first tools', 'Made in Poland'];
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t) => (<li key={t}>{t}<span aria-hidden className="marquee-sep">/</span></li>))}
    </ul>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

function SectionHead({ index, label, aside, title, intro }: { index: number; label: string; aside?: string; title: ReactNode; intro?: string }) {
  return (
    <header className="section-head reveal">
      <div className="section-rule">
        <span className="section-index">§{pad2(index)}</span>
        <span className="section-label">{label}</span>
        <span aria-hidden className="section-line" />
        {aside && <span className="section-aside">{aside}</span>}
      </div>
      <div className="section-title-row">
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </header>
  );
}

function Work({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <Section id="work">
      <SectionHead
        index={1}
        label="Catalogue"
        aside={`${pad2(APPS.length)} entries · 2026`}
        title={<>The work <em>so far</em></>}
        intro="Every title is designed, engineered and polished in-house — from the physics engine to the privacy policy."
      />
      <AppShowcase apps={APPS} onOpen={onOpen} />
    </Section>
  );
}

function Labs() {
  return (
    <Section id="labs">
      <SectionHead
        index={2}
        label="Labs"
        aside="Beyond apps"
        title={<>Side projects <em>that feed the work</em></>}
        intro="Research, storytelling and simulations — the experiments where ideas for the next title come from."
      />
      <ul className="lab-list reveal">
        {PROJECTS.map((p, i) => {
          const body = (
            <>
              <span className="lab-index">L—{pad2(i + 1)}</span>
              <span className="lab-title">{p.title}</span>
              <span className="lab-desc">{p.description}</span>
              <span className="lab-meta">
                <span>{p.category}</span>
                <span className="lab-tags">{p.tags.join(' · ')}</span>
              </span>
              <span className="lab-cta">{p.href ? <>{p.linkLabel ?? 'Open'} <span aria-hidden>{'↗︎'}</span></> : 'Link soon'}</span>
            </>
          );
          return (
            <li key={p.title}>
              {p.href ? <a className="lab-row" href={p.href} target="_blank" rel="noopener">{body}</a> : <div className="lab-row">{body}</div>}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

const ARTICLES = [
  { title: 'Craft over speed', body: 'Every title gets the time it needs. Releases are not rushed — they are refined until they feel right.' },
  { title: 'Respect the user', body: 'No ad spam, no dark patterns, no pay-to-win. Software that respects attention and privacy.' },
  { title: 'Follow curiosity', body: 'Astrophysics, medieval history, strength training — every obsession feeds back into the work.' },
];

function Studio() {
  const facts: [string, string][] = [
    ['Founded', '2026'],
    ['Titles', pad2(APPS.length)],
    ['Team', '01'],
    ['Based', 'PL'],
  ];
  return (
    <Section id="studio">
      <SectionHead index={3} label="Studio" aside="Charter" title={<>One person, <em>studio standards</em></>} />
      <div className="studio-grid">
        <div className="reveal">
          <p className="studio-statement">
            Grim Origin is an independent studio from Poland, founded in 2026. <em>It ships fewer things, but makes each one count</em> — games and tools that respect your attention, your privacy and your time.
          </p>
          <div className="founder">
            <img src={asset('avatar.webp')} alt="" width={52} height={52} loading="lazy" decoding="async" />
            <div>
              <strong>Grzegorz</strong>
              <span>Founder · design &amp; development</span>
            </div>
          </div>
        </div>
        <ol className="articles reveal">
          {ARTICLES.map((a, i) => (
            <li key={a.title} className="article">
              <span className="article-no">Art. {ROMAN[i]}</span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <dl className="facts reveal">
        {facts.map(([label, value]) => (
          <div key={label} className="fact">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${EMAIL}`; }
  };
  const topics: [string, string][] = [
    ['Publishing & partnerships', 'Publishers, platforms and collaborators — tell me what you have in mind.'],
    ['Press', 'Please include your outlet name and deadline.'],
    ['Feedback & support', 'Bugs, ideas or questions about one of the apps — all welcome.'],
  ];
  return (
    <Section id="contact" className="contact">
      <SectionHead index={4} label="Correspondence" aside="Replies within 24 h" title={<>Open a file <em>with the studio</em></>} />
      <div className="email-row reveal">
        <a href={`mailto:${EMAIL}`} className="email-link">{EMAIL}<svg aria-hidden className="email-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12 12 4M5 4h7v7" /></svg></a>
        <button type="button" onClick={copy} className="btn btn-ghost btn-sm" aria-live="polite">{copied ? '✓ Copied' : 'Copy address'}</button>
      </div>
      <div className="topics reveal">
        {topics.map(([title, body], i) => (
          <div key={title} className="topic">
            <span className="topic-no">{pad2(i + 1)}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onOpenApp, onOpenLegal }: { onOpenApp: (id: string) => void; onOpenLegal: (kind: 'privacy' | 'terms') => void }) {
  const time = useLocalTime();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div className="footer-brand">
            <span className="footer-logo">Grim Origin<span className="wordmark-dot">.</span></span>
            <p>Small games and tools about how things begin. Designed and built in Poland.</p>
          </div>
          <nav aria-label="Apps" className="footer-col">
            <h2>Catalogue</h2>
            <ul>{APPS.map((a, i) => (<li key={a.id}><button type="button" onClick={() => onOpenApp(a.id)}><span className="footer-no">{String(i + 1).padStart(3, '0')}</span>{a.title}</button></li>))}</ul>
          </nav>
          <nav aria-label="Studio" className="footer-col">
            <h2>Index</h2>
            <ul>{SECTIONS.map((s, i) => (<li key={s.id}><button type="button" onClick={() => smoothScrollTo(s.id)}><span className="footer-no">§{pad2(i + 1)}</span>{s.label}</button></li>))}</ul>
          </nav>
          <nav aria-label="Legal" className="footer-col">
            <h2>Legal</h2>
            <ul>
              <li><button type="button" onClick={() => onOpenLegal('privacy')}>Privacy</button></li>
              <li><button type="button" onClick={() => onOpenLegal('terms')}>Terms</button></li>
              {APPS.filter((a) => a.privacyHref).map((a) => (
                <li key={a.id}><a href={asset(a.privacyHref!)} target="_blank" rel="noopener">{a.title} privacy</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div aria-hidden className="footer-wordmark">Grim Origin</div>
      <div className="container footer-bar">
        <span>© {new Date().getFullYear()} Grim Origin · File GO/2026</span>
        <span>52°N 19°E · {time}</span>
        <button type="button" onClick={() => smoothScrollTo('hero')}>Back to top ↑</button>
      </div>
    </footer>
  );
}
