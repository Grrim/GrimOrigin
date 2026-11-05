import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { TOKENS, TYPE } from './tokens';
import { APPS, PROJECTS, asset, type Project } from './content';
import { GravityField } from './components/GravityField';
import { Starfield } from './components/Starfield';
import { FloatingNav } from './components/FloatingNav';
import { AppShowcase } from './components/AppShowcase';
import { AppDrawer } from './components/AppDrawer';
import { useScrollParallax } from './hooks/useScrollParallax';
import { useLenis, smoothScrollTo } from './hooks/useLenis';
import { useSpotlight } from './hooks/useSpotlight';

const NAV_LINKS = ['Apps', 'Projects', 'About'];
const SECTION_LABELS = [...NAV_LINKS, 'Contact'];


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
    const allIds = ['hero', ...ids];
    const sections = allIds.map((id) => document.getElementById(id)).filter((x): x is HTMLElement => !!x);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { if (entry.target.id === 'hero') setActive(''); else { const label = SECTION_LABELS.find((l) => l.toLowerCase() === entry.target.id) ?? ''; setActive(label); } } }); },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = SECTION_LABELS.map((l) => l.toLowerCase());

export default function App() {
  const [drawer, setDrawer] = useState({ id: APPS[0].id, open: false });
  const closeDrawer = useCallback(() => setDrawer((d) => ({ ...d, open: false })), []);
  useLenis(); useScrollReveal(); useScrollParallax();
  const activeSection = useActiveSection(SECTION_IDS);
  const drawerApp = APPS.find((a) => a.id === drawer.id) ?? APPS[0];

  return (
    <div className="min-h-screen" style={{ ...TYPE.sans, background: '#0E0E12', color: TOKENS.textHigh, position: 'relative', overflow: 'hidden' }}>
      <Starfield />
      <FloatingNav links={NAV_LINKS} active={activeSection} />
      <Hero />
      <Apps onOpen={(id) => setDrawer({ id, open: true })} />
      <Projects />
      <AboutSection />
      <ContactSection />
      <Footer />
      <AppDrawer app={drawerApp} open={drawer.open} onClose={closeDrawer} />
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0E0E12' }}>
      <GravityField />
      <div className="relative w-full mx-auto" style={{ zIndex: 2, maxWidth: TOKENS.containerMax, padding: `clamp(160px, 18vw, 240px) ${TOKENS.gutter} clamp(100px, 10vw, 180px)`, pointerEvents: 'none' }}>
        <div style={{ maxWidth: '900px', pointerEvents: 'auto', textAlign: 'center', margin: '0 auto' }}>
          <div className="hero-word" style={{ ['--word-delay' as never]: '0ms', marginBottom: 'clamp(16px, 2vw, 28px)' }}>
            <Eyebrow><span aria-hidden style={{ width: '6px', height: '6px', borderRadius: '50%', background: TOKENS.accent, boxShadow: `0 0 8px ${TOKENS.accent}`, display: 'inline-block' }} />Indie Mobile Studio</Eyebrow>
          </div>
          <h1 style={{ fontSize: 'clamp(56px, 10vw, 160px)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 700, margin: '0 auto', color: TOKENS.textMute }}>
            <span className="hero-word kinetic-word" style={{ ['--word-delay' as never]: '120ms', marginRight: '0.25em' }}>Grim</span>
            <span className="hero-word kinetic-word" style={{ ['--word-delay' as never]: '200ms', color: TOKENS.accent }}>Origin</span>
          </h1>
          <p className="hero-word" style={{ ['--word-delay' as never]: '500ms', maxWidth: '600px', margin: 'clamp(24px, 3vw, 40px) auto clamp(32px, 3vw, 56px)', fontSize: 'clamp(16px, 0.5vw + 14px, 20px)', lineHeight: 1.7, color: TOKENS.textMute, display: 'block' }}>
            We craft mobile apps that blend thoughtful design with deep functionality. From physics-driven games to everyday utility tools.
          </p>
          <div className="hero-word" style={{ ['--word-delay' as never]: '800ms', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <button onClick={() => smoothScrollTo('apps')} className="glow-btn" type="button" style={{ ...TYPE.mono, fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: TOKENS.textHigh, background: TOKENS.accentSoft, border: `1px solid ${TOKENS.accentBorder}`, borderRadius: '999px', padding: '16px 32px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              Explore Our Apps <span aria-hidden style={{ fontSize: '16px', color: TOKENS.accent }}>↓</span>
            </button>
            <button onClick={() => smoothScrollTo('contact')} className="glow-btn" type="button" style={{ ...TYPE.mono, fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: TOKENS.textMute, background: 'rgba(255,255,255,0.04)', border: `1px solid ${TOKENS.borderSoft}`, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '999px', padding: '16px 32px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              Get in Touch <span aria-hidden style={{ fontSize: '16px' }}>→</span>
            </button>
          </div>
        </div>
      </div>
      <div aria-hidden style={{ position: 'absolute', bottom: 'clamp(24px, 4vh, 48px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
        <span style={{ ...TYPE.mono, fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: TOKENS.textDim }}>Scroll</span>
        <span style={{ width: '1px', height: '40px', background: `linear-gradient(to bottom, ${TOKENS.accent}, transparent)`, animation: 'scroll-line 2.4s ease-in-out infinite', transformOrigin: 'top' }} />
      </div>
      <style>{`@keyframes scroll-line { 0%, 100% { transform: scaleY(0.5); opacity: 0.4; } 50% { transform: scaleY(1); opacity: 1; } }`}</style>
    </section>
  );
}

function Apps({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <Section id="apps">
      <SectionHeader eyebrow="/// Our Apps" meta={`${String(APPS.length).padStart(2, '0')} Titles · In Production`} title={<>Built for <span style={{ color: TOKENS.accent }}>mobile</span></>} subtitle="From physics puzzles to everyday tools — each app is crafted with care, precision, and respect for the user." />
      <AppShowcase apps={APPS} onOpen={onOpen} />
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHeader eyebrow="/// Other Projects" meta="Beyond Apps" title={<>More from <span style={{ color: TOKENS.accent }}>Grim Origin</span></>} subtitle="Content creation and research projects that feed back into our design philosophy." />
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(16px, 2vw, 28px)' }}>
        {PROJECTS.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>
    </Section>
  );
}

function ProjectCard({ project: { title, category, description, tags, href, linkLabel } }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  useSpotlight(ref);
  return (
    <div ref={ref} className="reveal beam-card" style={{ padding: 'clamp(28px, 2.5vw + 16px, 44px)', display: 'flex', flexDirection: 'column' }}>
      <span style={{ ...TYPE.mono, alignSelf: 'flex-start', display: 'inline-flex', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, background: 'rgba(0,0,0,0.30)', borderRadius: '999px', padding: '5px 10px', marginBottom: '20px' }}>{category}</span>
      <h3 style={{ fontSize: 'clamp(24px, 2.5vw + 12px, 36px)', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.1, color: TOKENS.textHigh, marginBottom: '14px' }}>{title}</h3>
      <p style={{ fontSize: 'clamp(14px, 0.3vw + 12px, 16px)', lineHeight: 1.75, color: TOKENS.textMute, marginBottom: '20px' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {tags.map((tag) => (<span key={tag} style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.10em', color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '4px', padding: '4px 8px', background: 'rgba(0,0,0,0.30)' }}>{tag}</span>))}
      </div>
      {href && (
        <a href={href} target="_blank" rel="noopener" className="text-link" style={{ ...TYPE.mono, alignSelf: 'flex-start', marginTop: '24px', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          {linkLabel ?? 'Open'} →
        </a>
      )}
    </div>
  );
}

function AboutSection() {
  return (
    <Section id="about">
      <SectionHeader
        eyebrow="/// About"
        meta="The Studio"
        title={<>One person. <span style={{ color: TOKENS.accent }}>Big vision.</span></>}
        subtitle="Grim Origin is a solo indie studio based in Poland, founded in 2026. We ship fewer things, but make each one count."
      />

      {/* Value cards — outline style (distinct from Games beam-cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(16px, 2vw, 28px)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
        <ValueCard emoji="🎯" title="Craft over speed" description="Every app gets the time it needs. We don't rush releases — we refine until it feels right." gradient="linear-gradient(145deg, rgba(58,155,231,0.08) 0%, rgba(20,20,28,0.90) 50%, rgba(14,14,18,0.95) 100%)" />
        <ValueCard emoji="🔒" title="Respect the user" description="No ads spam, no dark patterns, no pay-to-win. Clean software that respects attention and privacy." gradient="linear-gradient(145deg, rgba(99,102,241,0.08) 0%, rgba(20,20,28,0.90) 50%, rgba(14,14,18,0.95) 100%)" />
        <ValueCard emoji="🌌" title="Curiosity-driven" description="Astrophysics, medieval history, strength training — every obsession feeds back into the design philosophy." gradient="linear-gradient(145deg, rgba(139,92,246,0.08) 0%, rgba(20,20,28,0.90) 50%, rgba(14,14,18,0.95) 100%)" />
      </div>

      {/* Founder strip */}
      <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 2vw, 32px)', flexWrap: 'wrap', paddingTop: 'clamp(24px, 3vw, 40px)', borderTop: `1px solid ${TOKENS.borderSoft}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `1.5px solid ${TOKENS.accentBorder}`, flexShrink: 0 }}>
            <img src={asset('avatar.webp')} alt="Grzegorz" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async" />
          </div>
          <span style={{ fontSize: '14px', color: TOKENS.textMute }}>
            Founded by <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Grzegorz</strong>
          </span>
        </div>
        <span style={{ width: '1px', height: '20px', background: TOKENS.borderSoft }} />
        <StatBlock value={String(APPS.length).padStart(2, '0')} label="Apps" />
        <StatBlock value="2026" label="Founded" />
        <StatBlock value="PL" label="Based" />
      </div>
    </Section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 600, color: TOKENS.accent, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '6px' }}>{value}</div>
      <div style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: TOKENS.textDim }}>{label}</div>
    </div>
  );
}

function ContactSection() {
  return (
    <Section id="contact" soft={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(58,155,231,0.08) 0%, transparent 55%)' }} style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <Eyebrow>
          <span aria-hidden style={{ position: 'relative', width: '7px', height: '7px', display: 'inline-flex' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: TOKENS.accent, animation: 'signal-ring 2.4s ease-out infinite' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: TOKENS.accent, boxShadow: `0 0 8px ${TOKENS.accent}` }} />
          </span>
          Get in Touch
        </Eyebrow>

        <h2 style={{ fontSize: 'clamp(36px, 5vw + 16px, 72px)', lineHeight: 1.0, letterSpacing: '-0.025em', fontWeight: 600, color: TOKENS.textHigh, margin: 'clamp(24px, 3vw, 40px) 0' }}>
          Let&apos;s <span style={{ color: TOKENS.accent }}>talk</span>.
        </h2>

        <p style={{ fontSize: 'clamp(15px, 0.4vw + 13px, 17px)', lineHeight: 1.75, color: TOKENS.textMute, marginBottom: '16px' }}>
          Whether you&apos;re interested in publishing partnerships, collaboration on a project, press coverage, or just want to share feedback on one of our apps — I&apos;d love to hear from you.
        </p>
        <p style={{ fontSize: 'clamp(15px, 0.4vw + 13px, 17px)', lineHeight: 1.75, color: TOKENS.textMute, marginBottom: 'clamp(32px, 4vw, 56px)' }}>
          Response time is usually within 24 hours. For press inquiries, please include your outlet name and deadline.
        </p>

        <EmailCTA email="grimssys@gmail.com" />
      </div>
    </Section>
  );
}

function EmailCTA({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${email}`; }
  };
  return (
    <a href={`mailto:${email}`} onClick={onCopy} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="glow-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', padding: '14px 20px 14px 22px', background: 'rgba(13,13,13,0.70)', border: `1px solid ${hovered ? TOKENS.accentBorder : TOKENS.borderSoft}`, borderRadius: '999px', textDecoration: 'none', color: TOKENS.textHigh, transition: `border-color 300ms ${TOKENS.ease}`, cursor: 'pointer' }}>
      <span style={{ ...TYPE.mono, fontSize: 'clamp(14px, 0.4vw + 12px, 16px)', letterSpacing: '0.02em', fontWeight: 500 }}>{email}</span>
      <span aria-hidden style={{ width: '1px', height: '20px', background: TOKENS.borderSoft }} />
      <span style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: copied ? TOKENS.accent : TOKENS.textMute, transition: `color 200ms ${TOKENS.ease}` }}>{copied ? '✓ Copied' : 'Click to copy'}</span>
    </a>
  );
}

// ─── Layout primitives ────────────────────────────────────────────────────────

type SectionProps = { id: string; children: ReactNode; soft?: { background: string }; style?: CSSProperties };

function Section({ id, children, soft, style }: SectionProps) {
  return (
    <section id={id} style={{ padding: `${TOKENS.sectionPad} ${TOKENS.gutter}`, position: 'relative', ...style }}>
      {soft && <div aria-hidden style={{ position: 'absolute', inset: 0, background: soft.background, pointerEvents: 'none' }} />}
      <div className="relative z-10 mx-auto" style={{ maxWidth: TOKENS.containerMax }}>{children}</div>
    </section>
  );
}

function SectionHeader({ eyebrow, meta, title, subtitle }: { eyebrow: string; meta?: string; title: ReactNode; subtitle: string }) {
  return (
    <div className="reveal" style={{ marginBottom: 'clamp(40px, 5vw, 80px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: TYPE.spaceLg }}>
        <span aria-hidden style={{ display: 'inline-flex', width: '6px', height: '6px', borderRadius: '50%', background: TOKENS.accent, boxShadow: `0 0 10px ${TOKENS.accent}` }} />
        <span style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', fontWeight: 600, color: TOKENS.textMute }}>{eyebrow}</span>
        <span aria-hidden style={{ flex: 1, height: '1px', background: TOKENS.borderSoft, minWidth: '40px' }} />
        {meta && <span style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: TOKENS.textDim }}>{meta}</span>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'clamp(24px, 3vw, 48px)', alignItems: 'end' }}>
        <h2 style={{ fontSize: 'clamp(32px, 4vw + 16px, 60px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: TOKENS.textHigh, margin: 0, fontWeight: 600 }} className="lg:col-span-8">{title}</h2>
        <p style={{ fontSize: 'clamp(14px, 0.3vw + 12px, 16px)', lineHeight: 1.75, color: TOKENS.textMute, maxWidth: '420px', margin: 0 }} className="lg:col-span-4">{subtitle}</p>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span style={{ ...TYPE.mono, display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, background: 'rgba(0,0,0,0.30)', borderRadius: '999px', padding: '6px 12px', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}

function ValueCard({ emoji, title, description, gradient }: { emoji: string; title: string; description: string; gradient: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'clamp(28px, 2.5vw + 14px, 40px)',
        borderRadius: '18px',
        border: `1px solid ${hovered ? TOKENS.accentBorder : TOKENS.borderSoft}`,
        background: gradient,
        transition: `border-color 300ms ${TOKENS.ease}, transform 300ms ${TOKENS.ease}, box-shadow 300ms ${TOKENS.ease}`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.30)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span style={{ fontSize: '36px', display: 'block', marginBottom: '20px' }}>{emoji}</span>
      <h3 style={{ fontSize: 'clamp(18px, 1.5vw + 10px, 22px)', fontWeight: 600, color: hovered ? TOKENS.accent : TOKENS.textHigh, marginBottom: '12px', letterSpacing: '-0.01em', transition: `color 300ms ${TOKENS.ease}` }}>{title}</h3>
      <p style={{ fontSize: 'clamp(13px, 0.3vw + 11px, 15px)', lineHeight: 1.75, color: TOKENS.textMute, margin: 0 }}>{description}</p>
    </div>
  );
}

function Footer() {
  const [legalOpen, setLegalOpen] = useState<'privacy' | 'terms' | null>(null);
  return (
    <>
      <footer style={{ borderTop: `1px solid ${TOKENS.divider}`, padding: `clamp(20px, 1.5vw + 12px, 36px) ${TOKENS.gutter}` }}>
        <div className="mx-auto flex flex-wrap items-center justify-between" style={{ maxWidth: TOKENS.containerMax, gap: 'clamp(12px, 1vw + 6px, 24px)' }}>
          <p style={{ margin: 0, fontSize: '12px', color: TOKENS.textMute }}>© {new Date().getFullYear()} Grim Origin. Indie apps from Poland.</p>
          <div style={{ display: 'flex', gap: 'clamp(16px, 1.25vw + 10px, 32px)' }}>
            <button type="button" onClick={() => setLegalOpen('privacy')} className="text-link" style={{ fontSize: '12px' }}>Privacy</button>
            <button type="button" onClick={() => setLegalOpen('terms')} className="text-link" style={{ fontSize: '12px' }}>Terms</button>
          </div>
        </div>
      </footer>
      <LegalModal kind={legalOpen} onClose={() => setLegalOpen(null)} />
    </>
  );
}

function LegalModal({ kind, onClose }: { kind: 'privacy' | 'terms' | null; onClose: () => void }) {
  useEffect(() => {
    if (!kind) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [kind, onClose]);

  const open = kind !== null;
  const title = kind === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const updated = 'May 2026';

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8,9,12,0.72)',
          backdropFilter: open ? 'blur(8px)' : 'blur(0px)',
          WebkitBackdropFilter: open ? 'blur(8px)' : 'blur(0px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `opacity 400ms ${TOKENS.ease}, backdrop-filter 400ms ${TOKENS.ease}`,
          zIndex: 100,
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.96)',
          width: 'min(720px, calc(100vw - 32px))',
          maxHeight: 'min(80vh, 800px)',
          background: TOKENS.surfaceDeep,
          border: `1px solid ${TOKENS.borderSoft}`,
          borderRadius: '20px',
          boxShadow: open ? '0 24px 80px rgba(0,0,0,0.60)' : 'none',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `opacity 400ms ${TOKENS.ease}, transform 400ms ${TOKENS.easeOutExpo}`,
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: 'clamp(20px, 2vw + 8px, 32px) clamp(24px, 2.5vw + 8px, 40px)', borderBottom: `1px solid ${TOKENS.borderSoft}` }}>
          <div>
            <span style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: TOKENS.textDim, display: 'block', marginBottom: '6px' }}>Last updated · {updated}</span>
            <h2 style={{ fontSize: 'clamp(20px, 1.5vw + 12px, 26px)', fontWeight: 600, letterSpacing: '-0.015em', color: TOKENS.textHigh, margin: 0 }}>{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: TOKENS.textMute, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: `background 200ms ${TOKENS.ease}, color 200ms ${TOKENS.ease}` }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.color = TOKENS.textHigh; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = TOKENS.textMute; }}>✕</button>
        </header>
        <div data-lenis-prevent style={{ overflow: 'auto', overscrollBehavior: 'contain', padding: 'clamp(20px, 2vw + 8px, 32px) clamp(24px, 2.5vw + 8px, 40px)', flex: 1 }}>
          {kind === 'privacy' ? <PrivacyContent /> : kind === 'terms' ? <TermsContent /> : null}
        </div>
      </aside>
    </>
  );
}

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 'clamp(20px, 2vw, 28px)' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, color: TOKENS.textHigh, letterSpacing: '-0.01em', margin: '0 0 8px' }}>{title}</h3>
      <div style={{ fontSize: '14px', lineHeight: 1.7, color: TOKENS.textMute }}>{children}</div>
    </section>
  );
}

function PrivacyContent() {
  return (
    <div>
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: TOKENS.textMute, marginTop: 0 }}>
        Grim Origin (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a sole-proprietor indie studio based in Poland. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website (grrim.github.io/GrimOrigin) or use our mobile applications, including LUMINIS, Luna, and OFFLINE (collectively, the &quot;Services&quot;). We are committed to data minimization and full compliance with the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), the Children&apos;s Online Privacy Protection Act (COPPA), and the Google Play User Data Policy.
      </p>

      <LegalSection title="1. Data Controller">
        The data controller responsible for processing your personal data is Grim Origin, contactable at <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>. As a sole-proprietor studio in the EU, we do not have a separate Data Protection Officer, but the founder personally handles all privacy inquiries.
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p style={{ margin: '0 0 8px' }}><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Website.</strong> Our website does not use analytics, advertising trackers, or third-party cookies. Standard server logs maintained by GitHub Pages (our hosting provider) may temporarily record IP address, user agent, and timestamps for security and abuse prevention; we do not access or retain these logs.</p>
        <p style={{ margin: '0 0 8px' }}><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Apps.</strong> Our apps are privacy-first. Personal data such as preferences, progress, health entries (Luna), and screen-time logs (OFFLINE) is stored locally on your device by default. We collect:</p>
        <ul style={{ margin: '0 0 8px', paddingLeft: '20px' }}>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Account data</strong> (only if you create one): email address, hashed password, display name.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Crash and diagnostic data</strong>: anonymized crash reports, device model, OS version, app version. Used to fix bugs.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Purchase data</strong>: handled by Google Play / App Store; we receive only confirmation of entitlement, never card details.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>In-app health entries (Luna)</strong>: cycle dates, symptoms, mood. Stored on-device and, if you opt-in to backup, end-to-end encrypted in your own cloud account.</li>
        </ul>
        <p style={{ margin: 0 }}><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Email correspondence.</strong> When you email us, we retain the message and your email address for as long as needed to respond.</p>
      </LegalSection>

      <LegalSection title="3. Sensitive Data and Health Information">
        Luna may process information about menstrual cycles and reproductive health, which is considered sensitive personal data under GDPR Article 9 and special-category data in many jurisdictions. We process this data exclusively on the legal basis of your <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>explicit consent</strong>. You can withdraw consent and delete all data at any time within the app. We do not share, sell, or use sensitive data for advertising under any circumstances.
      </LegalSection>

      <LegalSection title="4. How We Use Your Information">
        We use personal information to: (a) provide, maintain, and improve the Services; (b) deliver in-app content and updates; (c) process purchases and verify entitlements; (d) respond to support requests; (e) detect, prevent, and address technical issues, fraud, or abuse; (f) comply with legal obligations. We do not use your data for behavioral advertising or to build user profiles for sale.
      </LegalSection>

      <LegalSection title="5. Legal Bases (GDPR)">
        We process personal data on the following bases: <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>consent</strong> (Art. 6(1)(a)) for optional features, analytics, and sensitive data; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>contract</strong> (Art. 6(1)(b)) for account features and purchases; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>legitimate interests</strong> (Art. 6(1)(f)) for crash diagnostics and security, balanced against your rights; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>legal obligation</strong> (Art. 6(1)(c)) for tax and consumer-protection records.
      </LegalSection>

      <LegalSection title="6. Sharing and Third-Party Services">
        We do not sell personal data. We share limited data only with service providers acting as processors under our instructions:
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Google Play / Apple App Store</strong> — app distribution, in-app purchases, subscription management.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Crash reporting (e.g., Firebase Crashlytics or Sentry)</strong> — anonymized stack traces and device metadata. No personal content.</li>
          <li><strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Cloud hosting (e.g., Cloudflare, GitHub Pages)</strong> — infrastructure for our website.</li>
        </ul>
        Each provider has its own privacy policy that governs their handling of data. We do not disclose data to advertisers or data brokers. We may disclose data when required by law, court order, or to protect rights and safety.
      </LegalSection>

      <LegalSection title="7. International Transfers">
        Some processors may operate outside the European Economic Area. When transferring personal data internationally, we rely on EU Standard Contractual Clauses (SCCs), adequacy decisions, or other safeguards as required by GDPR Chapter V.
      </LegalSection>

      <LegalSection title="8. Data Retention">
        We retain personal data only as long as necessary for the purposes described, or as required by law. Account data is kept until you delete your account; crash logs are retained for up to 90 days; email correspondence is kept up to 2 years unless required longer for tax or legal purposes. Locally-stored data persists on your device until you delete the app or clear its data.
      </LegalSection>

      <LegalSection title="9. Your Rights">
        Depending on your jurisdiction, you have the right to: <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>access</strong> your personal data; <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>rectify</strong> inaccurate data; request <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>erasure</strong> (&quot;right to be forgotten&quot;); restrict or object to processing; receive a portable copy of your data; withdraw consent at any time; lodge a complaint with a supervisory authority (in Poland: <em>Prezes UODO</em>, <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>uodo.gov.pl</a>). California residents additionally have the right to know, delete, correct, and opt out of sale of personal information under the CCPA/CPRA — we do not sell personal information. To exercise any right, email <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>; we respond within 30 days.
      </LegalSection>

      <LegalSection title="10. Children's Privacy">
        Our Services are not directed to children under 13 (or 16 in the EEA, where applicable). We do not knowingly collect personal information from children. If you believe a child has provided us personal data, contact us and we will delete it promptly. Apps targeted at general audiences participate in Google Play&apos;s Designed for Families program guidelines where applicable.
      </LegalSection>

      <LegalSection title="11. Security">
        We use technically and organizationally appropriate measures to protect personal data, including HTTPS/TLS encryption in transit, encryption at rest where supported, principle of least privilege for access to operational systems, and regular review of dependencies. No method of transmission or storage is 100% secure.
      </LegalSection>

      <LegalSection title="12. Permissions Used by Our Apps">
        Our apps may request the following Android/iOS permissions, only when needed for a feature you use: <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Notifications</strong> (reminders, in Luna and OFFLINE); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Storage</strong> (export/import of your data); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Internet</strong> (sync and updates); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Vibration</strong> (haptic feedback in LUMINIS); <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Usage Stats</strong> (OFFLINE — only if you enable digital-detox tracking, with prominent in-app disclosure).
      </LegalSection>

      <LegalSection title="13. Changes to This Policy">
        We may update this Privacy Policy occasionally. Material changes will be communicated via in-app notice or by updating the &quot;Last updated&quot; date at the top of this document. Continued use of the Services after changes constitutes acceptance.
      </LegalSection>

      <LegalSection title="14. Contact">
        For privacy questions, complaints, or to exercise your rights, contact: <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>. Postal correspondence on request.
      </LegalSection>
    </div>
  );
}

function TermsContent() {
  return (
    <div>
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: TOKENS.textMute, marginTop: 0 }}>
        These Terms of Service (&quot;Terms&quot;) are a legally binding agreement between you and Grim Origin (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), a sole-proprietor indie studio based in Poland. They govern your access to and use of our website (grrim.github.io/GrimOrigin) and our mobile applications, including LUMINIS, Luna, and OFFLINE (collectively, the &quot;Services&quot;). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, do not use the Services.
      </p>

      <LegalSection title="1. Eligibility">
        You must be at least 13 years old (or 16 in the EEA, where applicable) to use our Services. If you are under the age of legal majority in your jurisdiction, you may use the Services only with consent from a parent or legal guardian. By using the Services, you represent that you meet these requirements and that the information you provide is accurate.
      </LegalSection>

      <LegalSection title="2. License Grant">
        Subject to your compliance with these Terms, we grant you a limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable license to download, install, and use our apps on devices you own or control, solely for personal, non-commercial purposes. Apps obtained via the Google Play Store or Apple App Store are also governed by the applicable end-user license agreement of that platform.
      </LegalSection>

      <LegalSection title="3. Restrictions">
        You agree not to, and not to permit others to: (a) reverse engineer, decompile, disassemble, or attempt to derive source code, except as expressly permitted by law; (b) modify, adapt, translate, or create derivative works of the Services; (c) remove or alter any proprietary notices; (d) rent, lease, lend, sell, redistribute, or sublicense the Services; (e) use the Services to violate any law, infringe rights, transmit malware, or interfere with other users; (f) use automated means to scrape or extract data from our website; (g) bypass technical protection measures or access controls; (h) impersonate any person or misrepresent your affiliation.
      </LegalSection>

      <LegalSection title="4. User Content">
        Some apps allow you to create or store content (e.g., notes, health entries, scores). You retain all rights to the content you create. By submitting content to a feature that publishes or shares it (such as a leaderboard or feedback form), you grant us a worldwide, royalty-free, non-exclusive license to host, store, transmit, and display that content for the purpose of operating the relevant feature. You are responsible for the legality of content you submit, and you must not upload content that is illegal, infringing, defamatory, hateful, sexually explicit, or harmful to minors.
      </LegalSection>

      <LegalSection title="5. Purchases, Subscriptions, and Refunds">
        Some apps offer paid features, in-app purchases, or subscriptions. All purchases are processed by the platform store (Google Play or Apple App Store) and are subject to that platform&apos;s payment terms. Subscriptions auto-renew unless canceled at least 24 hours before the renewal date through your platform account settings. Refund requests are governed by the platform&apos;s refund policy: <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>Google Play refund policy</a> or <a href="https://support.apple.com/en-us/HT204084" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>App Store refund policy</a>. EU consumers retain their statutory right of withdrawal where applicable; some digital content begins performance immediately, and you waive the right of withdrawal upon download where the law permits.
      </LegalSection>

      <LegalSection title="6. Updates and Service Changes">
        We may issue updates, patches, and new versions automatically or at your request. We may add, modify, or remove features at any time. We may also suspend or discontinue the Services, in whole or part, with reasonable notice. We are not liable to you or third parties for any modification, suspension, or discontinuance of the Services.
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        All rights, title, and interest in the Services, including software, design, source code, graphics, audio, trademarks, logos, and the names &quot;Grim Origin&quot;, &quot;LUMINIS&quot;, &quot;Luna&quot;, and &quot;OFFLINE&quot;, are owned by Grim Origin or its licensors and are protected by intellectual-property laws. These Terms grant you no rights other than the limited license in Section 2. All other rights are reserved.
      </LegalSection>

      <LegalSection title="8. Third-Party Services">
        The Services may contain links to or integrate with third-party services (e.g., platform stores, cloud providers). We are not responsible for the content, policies, or practices of third parties. Your use of third-party services is at your own risk and subject to their terms and policies.
      </LegalSection>

      <LegalSection title="9. Privacy">
        Use of the Services is subject to our <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Privacy Policy</strong>, which is incorporated by reference into these Terms. By using the Services you acknowledge the privacy practices described there.
      </LegalSection>

      <LegalSection title="10. Disclaimer of Warranties">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, OR UNINTERRUPTED OPERATION. Some apps (especially Luna) provide informational content related to health and wellness; this content is not medical advice and is not a substitute for consultation with a qualified healthcare professional. Statutory consumer rights are not affected.
      </LegalSection>

      <LegalSection title="11. Limitation of Liability">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, GRIM ORIGIN SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES. OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIM RELATING TO THE SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM, OR (B) EUR 50. NOTHING IN THESE TERMS LIMITS LIABILITY FOR FRAUD, GROSS NEGLIGENCE, OR ANY LIABILITY THAT CANNOT BE LAWFULLY EXCLUDED.
      </LegalSection>

      <LegalSection title="12. Indemnity">
        You agree to indemnify and hold Grim Origin harmless from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from: (a) your use of the Services in violation of these Terms; (b) your user content; or (c) your violation of any law or third-party right.
      </LegalSection>

      <LegalSection title="13. Termination">
        We may suspend or terminate your access to the Services at any time, with or without notice, for breach of these Terms or any conduct we determine to be harmful. Upon termination, the licenses granted to you cease immediately, but Sections 7 (IP), 10 (Disclaimer), 11 (Limitation), 12 (Indemnity), and 14 (Governing Law) survive.
      </LegalSection>

      <LegalSection title="14. Governing Law and Jurisdiction">
        These Terms are governed by the laws of the Republic of Poland, without regard to conflict-of-law principles. Disputes will be submitted to the competent Polish courts. If you are a consumer, mandatory protections under the law of your country of residence (including the EU consumer-protection directives) remain available to you, and you may bring proceedings in your local courts. EU consumers may also access the European Commission&apos;s Online Dispute Resolution platform: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: TOKENS.accent, textDecoration: 'none' }}>ec.europa.eu/consumers/odr</a>.
      </LegalSection>

      <LegalSection title="15. Changes to These Terms">
        We may revise these Terms occasionally. Material changes will be communicated via in-app notice or by updating the &quot;Last updated&quot; date. Continued use after changes become effective constitutes acceptance of the revised Terms. If you do not agree, you must stop using the Services.
      </LegalSection>

      <LegalSection title="16. Miscellaneous">
        These Terms (with the Privacy Policy) form the entire agreement between you and Grim Origin regarding the Services and supersede prior agreements on the same subject. If any provision is held unenforceable, the remaining provisions remain in effect. Our failure to enforce a right is not a waiver. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets.
      </LegalSection>

      <LegalSection title="17. Contact">
        Questions about these Terms? Email <a href="mailto:grimssys@gmail.com" style={{ color: TOKENS.accent, textDecoration: 'none' }}>grimssys@gmail.com</a>. Postal correspondence on request.
      </LegalSection>
    </div>
  );
}
