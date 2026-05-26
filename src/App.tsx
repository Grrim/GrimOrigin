import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { PText, PIcon } from '@porsche-design-system/components-react';
import { TOKENS, TYPE } from './tokens';
import { GravityField } from './components/GravityField';
import { Auroras } from './components/Auroras';
import { Starfield } from './components/Starfield';
import { FloatingNav } from './components/FloatingNav';
import { LuminisDrawer } from './components/LuminisDrawer';
import { useScrollParallax } from './hooks/useScrollParallax';
import { useLenis, smoothScrollTo } from './hooks/useLenis';
import { useSpotlight } from './hooks/useSpotlight';
import { useRef } from 'react';

const NAV_LINKS = ['Games', 'Projects', 'About'];

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
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { if (entry.target.id === 'hero') setActive(''); else { const label = NAV_LINKS.find((l) => l.toLowerCase() === entry.target.id) ?? ''; setActive(label); } } }); },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  useLenis(); useScrollReveal(); useScrollParallax();
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.toLowerCase()));

  return (
    <div className="min-h-screen" style={{ ...TYPE.sans, background: '#0E0E12', color: TOKENS.textHigh, position: 'relative', overflow: 'hidden' }}>
      <Auroras />
      <Starfield />
      <FloatingNav links={NAV_LINKS} active={activeSection} />
      <Hero />
      <Games onOpenLuminis={() => setDrawerOpen(true)} />
      <Projects />
      <AboutSection />
      <ContactSection />
      <Footer />
      <LuminisDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div aria-hidden data-parallax data-parallax-speed="-0.10" style={{ position: 'absolute', inset: '-10% -5% -10% -5%', backgroundImage: 'url(/hero-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', transform: 'translate3d(0, var(--py, 0px), 0)', willChange: 'transform' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,14,18,0.55) 0%, rgba(14,14,18,0.65) 30%, rgba(14,14,18,0.78) 55%, rgba(14,14,18,0.88) 75%, rgba(14,14,18,0.95) 90%, rgba(14,14,18,1) 100%)' }} />
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
            <button onClick={() => smoothScrollTo('games')} className="glow-btn" type="button" style={{ ...TYPE.mono, fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: TOKENS.textHigh, background: TOKENS.accentSoft, border: `1px solid ${TOKENS.accentBorder}`, borderRadius: '999px', padding: '16px 32px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
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

function Games({ onOpenLuminis }: { onOpenLuminis: () => void }) {
  return (
    <Section id="games" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <SectionHeader eyebrow="/// Our Apps" meta="03 Titles · In Production" title={<>Built for <span style={{ color: TOKENS.accent }}>mobile</span></>} subtitle="From physics puzzles to everyday tools — each app is crafted with care, precision, and respect for the user." />
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(16px, 2vw, 28px)' }}>
        <GameCard title="LUMINIS" subtitle="A 12-chapter physics puzzle through stellar evolution and deep space lore." status="Premiering Soon" tags={['Physics Puzzle', 'Matter.js', 'Narrative']} theme="nebula" onClick={onOpenLuminis} />
        <GameCard title="Luna" subtitle="A minimal, privacy-first menstrual cycle tracker with smart predictions and health insights." status="Premiering Soon" tags={['Health', 'Tracker', 'Privacy-first']} theme="minimal" />
        <GameCard title="OFFLINE" subtitle="Digital detox companion — track screen-free time, set goals, and build healthier habits." status="In Development" tags={['Wellness', 'Habits', 'Minimalist']} theme="singularity" />
      </div>
    </Section>
  );
}

function GameCard({ title, subtitle, status, tags, theme, onClick }: { title: string; subtitle: string; status: string; tags: string[]; theme: 'nebula' | 'singularity' | 'minimal'; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  useSpotlight(ref);
  const isFinal = status === 'Final Phase' || status === 'Premiering Soon';

  return (
    <div ref={ref} className="reveal beam-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick} style={{ padding: 'clamp(28px, 2.5vw + 14px, 44px)', minHeight: 'clamp(300px, 28vw, 380px)', display: 'flex', flexDirection: 'column', cursor: onClick ? 'pointer' : 'default' }}>
      {theme === 'nebula' && <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.15) 0%, rgba(58,155,231,0.06) 40%, transparent 65%)', pointerEvents: 'none' }} />}
      {theme === 'singularity' && <span aria-hidden style={{ position: 'absolute', top: '-20%', right: '-15%', width: '50%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(58,155,231,0.18) 0%, transparent 60%)', filter: 'blur(20px)', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: `transform 800ms ${TOKENS.easeOutExpo}`, pointerEvents: 'none' }} />}
      {theme === 'minimal' && <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(58,155,231,0.04) 100%)', pointerEvents: 'none' }} />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
        <span style={{ ...TYPE.mono, display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: isFinal ? '#34d399' : TOKENS.accent, border: `1px solid ${isFinal ? 'rgba(52,211,153,0.40)' : TOKENS.accentBorder}`, background: isFinal ? 'rgba(52,211,153,0.10)' : TOKENS.accentSoft, borderRadius: '999px', padding: '5px 10px' }}>
          <span aria-hidden style={{ width: '5px', height: '5px', borderRadius: '50%', background: isFinal ? '#34d399' : TOKENS.accent, boxShadow: `0 0 6px ${isFinal ? '#34d399' : TOKENS.accent}` }} />
          {status}
        </span>
        {onClick && <PIcon name="arrow-right" size="small" color="contrast-medium" theme="dark" style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: `transform 300ms ${TOKENS.ease}`, color: hovered ? TOKENS.accent : undefined }} />}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <h3 style={{ fontSize: 'clamp(28px, 3vw + 10px, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05, color: TOKENS.textHigh, marginBottom: '12px' }}>{title}</h3>
        <p style={{ fontSize: 'clamp(13px, 0.3vw + 11px, 15px)', lineHeight: 1.7, color: TOKENS.textMute, marginBottom: '16px' }}>{subtitle}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map((tag) => (<span key={tag} style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.10em', color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '4px', padding: '4px 8px', background: 'rgba(0,0,0,0.30)' }}>{tag}</span>))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <Section id="projects" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <SectionHeader eyebrow="/// Other Projects" meta="Beyond Apps" title={<>More from <span style={{ color: TOKENS.accent }}>Grim Origin</span></>} subtitle="Content creation and research projects that feed back into our design philosophy." />
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(16px, 2vw, 28px)' }}>
        <ProjectCard title="Grim History" category="Media Channel" description="Exploring historical anomalies, medieval mysteries, and dark history through engaging short-form video content." tags={['YouTube', 'Storytelling', 'Research']} />
        <ProjectCard title="Astrophysics Simulations" category="Interactive Lab" description="Web-based 2D/3D interactive simulations focusing on stellar dynamics, thermodynamics, and black hole behaviors." tags={['TypeScript', 'WebGL', 'Physics']} />
      </div>
    </Section>
  );
}

function ProjectCard({ title, category, description, tags }: { title: string; category: string; description: string; tags: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useSpotlight(ref);
  return (
    <div ref={ref} className="reveal beam-card" style={{ padding: 'clamp(28px, 2.5vw + 16px, 44px)' }}>
      <span style={{ ...TYPE.mono, display: 'inline-flex', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, background: 'rgba(0,0,0,0.30)', borderRadius: '999px', padding: '5px 10px', marginBottom: '20px' }}>{category}</span>
      <h3 style={{ fontSize: 'clamp(24px, 2.5vw + 12px, 36px)', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.1, color: TOKENS.textHigh, marginBottom: '14px' }}>{title}</h3>
      <p style={{ fontSize: 'clamp(14px, 0.3vw + 12px, 16px)', lineHeight: 1.75, color: TOKENS.textMute, marginBottom: '20px' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {tags.map((tag) => (<span key={tag} style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.10em', color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '4px', padding: '4px 8px', background: 'rgba(0,0,0,0.30)' }}>{tag}</span>))}
      </div>
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
            <img src="/avatar.webp" alt="Grzegorz" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async" />
          </div>
          <span style={{ fontSize: '14px', color: TOKENS.textMute }}>
            Founded by <strong style={{ color: TOKENS.textHigh, fontWeight: 600 }}>Grzegorz</strong>
          </span>
        </div>
        <span style={{ width: '1px', height: '20px', background: TOKENS.borderSoft }} />
        <StatBlock value="03" label="Apps" />
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
    <Section id="contact" soft={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(58,155,231,0.08) 0%, transparent 55%)' }} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
  return (
    <footer style={{ borderTop: `1px solid ${TOKENS.divider}`, padding: `clamp(20px, 1.5vw + 12px, 36px) ${TOKENS.gutter}` }}>
      <div className="mx-auto flex flex-wrap items-center justify-between" style={{ maxWidth: TOKENS.containerMax, gap: 'clamp(12px, 1vw + 6px, 24px)' }}>
        <PText size="x-small" theme="dark" color="contrast-medium">© {new Date().getFullYear()} Grim Origin. Indie apps from Poland.</PText>
        <div style={{ display: 'flex', gap: 'clamp(16px, 1.25vw + 10px, 32px)' }}>
          {['Privacy', 'Terms'].map((item) => (
            <PText key={item} size="x-small" theme="dark" color="contrast-medium">
              <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: `color ${TOKENS.duration} ${TOKENS.ease}` }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = TOKENS.textHigh)} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'inherit')}>{item}</a>
            </PText>
          ))}
        </div>
      </div>
    </footer>
  );
}
