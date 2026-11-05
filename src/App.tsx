import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { TOKENS, TYPE } from './tokens';
import { APPS, PROJECTS, asset } from './content';
import { GravityField } from './components/GravityField';
import { FloatingNav, type NavSection } from './components/FloatingNav';
import { AppShowcase } from './components/AppShowcase';
import { AppDrawer } from './components/AppDrawer';
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
    <div className="min-h-screen" style={{ ...TYPE.sans, background: 'var(--color-canvas)', color: TOKENS.textHigh, position: 'relative', overflow: 'clip' }}>
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const time = useLocalTime();
  const building = APPS.find((a) => a.status === 'Premiering Soon') ?? APPS[0];
  return (
    <section id="hero" className="hero">
      <GravityField />
      <div className="container hero-inner">
        <ul className="hero-meta hero-word" style={{ ['--word-delay' as never]: '0ms' }}>
          <li>Independent mobile studio</li>
          <li>Est. 2026</li>
          <li>Poland · {time}</li>
        </ul>

        <h1 className="hero-title">
          <span className="hero-line"><span className="hero-word" style={{ ['--word-delay' as never]: '80ms' }}>Thoughtful apps</span></span>
          <span className="hero-line"><span className="hero-word" style={{ ['--word-delay' as never]: '160ms' }}>and games, made</span></span>
          <span className="hero-line"><span className="hero-word" style={{ ['--word-delay' as never]: '240ms' }}>in <em style={TYPE.serif}>Poland</em><span style={{ color: TOKENS.accent }}>.</span></span></span>
        </h1>

        <div className="hero-foot hero-word" style={{ ['--word-delay' as never]: '480ms' }}>
          <p className="hero-lede">
            Grim Origin designs and builds mobile games and everyday tools — physics-driven puzzles, narrative mysteries and privacy-first utilities. A small catalogue with high standards.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={() => smoothScrollTo('work')} className="btn btn-primary">
              See the work <span aria-hidden className="btn-arrow">↓</span>
            </button>
            <button type="button" onClick={() => smoothScrollTo('contact')} className="btn btn-ghost">
              Start a conversation <span aria-hidden className="btn-arrow">→</span>
            </button>
          </div>
        </div>

        <button type="button" className="now-building hero-word" style={{ ['--word-delay' as never]: '640ms' }} onClick={() => smoothScrollTo('work')}>
          <span aria-hidden className="pulse-dot" />
          <span className="now-label">Now building</span>
          <span className="now-title">{building.title}</span>
          <span className="now-status">{building.status}</span>
        </button>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...APPS.map((a) => a.title), 'Physics puzzles', 'Narrative games', 'Privacy-first tools', 'Made in Poland'];
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t) => (<li key={t}>{t}<span aria-hidden className="marquee-star">✦</span></li>))}
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
        <span className="section-index">({pad2(index)})</span>
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
        label="Selected work"
        aside={`${pad2(APPS.length)} titles · 2026`}
        title={<>Games and apps, <em style={TYPE.serif}>built to last</em>.</>}
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
        title={<>Side projects that <em style={TYPE.serif}>feed the work</em>.</>}
        intro="Research, storytelling and simulations — the experiments where ideas for the next title come from."
      />
      <ul className="lab-list reveal">
        {PROJECTS.map((p, i) => {
          const body = (
            <>
              <span className="lab-index">{pad2(i + 1)}</span>
              <span className="lab-title">{p.title}</span>
              <span className="lab-desc">{p.description}</span>
              <span className="lab-meta">
                <span>{p.category}</span>
                <span className="lab-tags">{p.tags.join(' · ')}</span>
              </span>
              <span className="lab-cta">{p.href ? <>{p.linkLabel ?? 'Open'} <span aria-hidden>↗</span></> : 'Soon'}</span>
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

const PRINCIPLES = [
  { title: 'Craft over speed', body: 'Every title gets the time it needs. We don’t rush releases — we refine until it feels right.' },
  { title: 'Respect the user', body: 'No ad spam, no dark patterns, no pay-to-win. Clean software that respects attention and privacy.' },
  { title: 'Curiosity-driven', body: 'Astrophysics, medieval history, strength training — every obsession feeds back into the work.' },
];

function Studio() {
  const facts: [string, string][] = [
    ['2026', 'Founded'],
    [pad2(APPS.length), 'Titles in production'],
    ['01', 'Person, end to end'],
    ['PL', 'Based in Poland'],
  ];
  return (
    <Section id="studio">
      <SectionHead index={3} label="Studio" aside="About" title={<>One person. <em style={TYPE.serif}>Studio standards.</em></>} />
      <div className="studio-grid">
        <div className="reveal">
          <p className="studio-statement">
            Grim Origin is an independent studio from Poland, founded in 2026.{' '}
            <span>We ship fewer things, but make each one count — games and tools that respect your attention, your privacy and your time.</span>
          </p>
          <div className="founder">
            <img src={asset('avatar.webp')} alt="" width={48} height={48} loading="lazy" decoding="async" />
            <div>
              <strong>Grzegorz</strong>
              <span>Founder · design &amp; development</span>
            </div>
          </div>
        </div>
        <ol className="principles reveal">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="principle">
              <span className="principle-index">{pad2(i + 1)}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <dl className="facts reveal">
        {facts.map(([value, label]) => (
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
      <SectionHead index={4} label="Contact" aside="Replies within 24 h" title={<>Have a project, a pitch <em style={TYPE.serif}>or a question?</em></>} />
      <div className="email-row reveal">
        <a href={`mailto:${EMAIL}`} className="email-link">{EMAIL}<span aria-hidden className="email-arrow">↗</span></a>
        <button type="button" onClick={copy} className="btn btn-ghost btn-sm" aria-live="polite">{copied ? '✓ Copied' : 'Copy address'}</button>
      </div>
      <div className="topics reveal">
        {topics.map(([title, body]) => (
          <div key={title} className="topic">
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
            <span className="footer-logo"><span aria-hidden className="pulse-dot" />Grim Origin</span>
            <p>Independent mobile studio. Games and everyday tools, designed and built in Poland.</p>
          </div>
          <nav aria-label="Apps" className="footer-col">
            <h2>Apps</h2>
            <ul>{APPS.map((a) => (<li key={a.id}><button type="button" onClick={() => onOpenApp(a.id)}>{a.title}</button></li>))}</ul>
          </nav>
          <nav aria-label="Studio" className="footer-col">
            <h2>Studio</h2>
            <ul>{SECTIONS.map((s) => (<li key={s.id}><button type="button" onClick={() => smoothScrollTo(s.id)}>{s.label}</button></li>))}</ul>
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
        <span>© {new Date().getFullYear()} Grim Origin</span>
        <span>Poland · {time}</span>
        <button type="button" onClick={() => smoothScrollTo('hero')}>Back to top ↑</button>
      </div>
    </footer>
  );
}
