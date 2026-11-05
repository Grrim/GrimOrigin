import { useRef, type CSSProperties } from 'react';
import { TOKENS, TYPE, withAlpha } from '../tokens';
import { useSpotlight } from '../hooks/useSpotlight';
import { asset, type App } from '../content';

const CONTACT_EMAIL = 'grimssys@gmail.com';

export function AppShowcase({ apps, onOpen }: { apps: App[]; onOpen: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2vw, 28px)' }}>
      {apps.map((app, i) => (
        <AppRow key={app.id} app={app} index={i} total={apps.length} onOpen={() => onOpen(app.id)} />
      ))}
    </div>
  );
}

const pad2 = (n: number) => String(n).padStart(2, '0');

function AppRow({ app, index, total, onOpen }: { app: App; index: number; total: number; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;
  useSpotlight(ref);
  const live = app.status !== 'In Development';
  const statusColor = live ? '#34d399' : app.accent;

  return (
    <article ref={ref} className={`reveal beam-card app-row${flip ? ' is-flipped' : ''}`} aria-labelledby={`app-${app.id}`} style={{ ['--app-accent' as never]: app.accent }}>
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at ${flip ? '20%' : '80%'} 50%, ${withAlpha(app.accent, 0.14)} 0%, transparent 55%)`, pointerEvents: 'none' }} />
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: 'clamp(32px, 4vw, 64px)' }}>
        {/* Copy */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'clamp(20px, 2vw, 28px)' }}>
            <AppIcon app={app} size={64} />
            <span className="app-meta">
              <span>{pad2(index + 1)} / {pad2(total)}</span>
              <span>{app.kind}</span>
            </span>
            <span style={{ ...TYPE.mono, display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: statusColor, border: `1px solid ${withAlpha(live ? '#34d399' : app.accent, 0.4)}`, background: withAlpha(live ? '#34d399' : app.accent, 0.1), borderRadius: '999px', padding: '5px 10px' }}>
              <span aria-hidden style={{ width: '5px', height: '5px', borderRadius: '50%', background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
              {app.status}
            </span>
          </div>

          <div style={{ ...TYPE.mono, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: app.accent, marginBottom: '10px' }}>{app.tagline}</div>
          <h3 id={`app-${app.id}`} style={{ ...TYPE.display, fontSize: 'clamp(34px, 3.5vw + 12px, 60px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: TOKENS.textHigh, margin: '0 0 18px' }}>{app.title}</h3>
          <p style={{ fontSize: 'clamp(15px, 0.4vw + 13px, 18px)', lineHeight: 1.7, color: TOKENS.textMute, margin: '0 0 22px', maxWidth: '560px' }}>{app.description}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'clamp(28px, 3vw, 40px)' }}>
            {app.tags.map((tag) => (<span key={tag} style={{ ...TYPE.mono, fontSize: '10px', letterSpacing: '0.10em', color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '4px', padding: '4px 8px', background: 'rgba(0,0,0,0.30)' }}>{tag}</span>))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            <StoreButtons app={app} />
            <button type="button" onClick={onOpen} className="btn btn-ghost" aria-haspopup="dialog">
              Explore <span aria-hidden className="btn-arrow" style={{ color: app.accent }}>→</span>
            </button>
          </div>

          {app.privacyHref && (
            <a href={asset(app.privacyHref)} target="_blank" rel="noopener" className="text-link" style={{ ...TYPE.mono, display: 'inline-block', marginTop: '22px', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Privacy Policy
            </a>
          )}
        </div>

        {/* Visual */}
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`} style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneStack app={app} />
        </div>
      </div>
    </article>
  );
}

function StoreButtons({ app }: { app: App }) {
  const { googlePlay, appStore } = app.links ?? {};
  if (googlePlay || appStore) {
    return (
      <>
        {googlePlay && <StoreLink href={googlePlay} store="Google Play" accent={app.accent} />}
        {appStore && <StoreLink href={appStore} store="App Store" accent={app.accent} />}
      </>
    );
  }
  const subject = encodeURIComponent(`Notify me: ${app.title} launch`);
  return (
    <a href={`mailto:${CONTACT_EMAIL}?subject=${subject}`} className="btn app-cta" style={{ background: app.accent }}>
      {app.status === 'In Development' ? 'Follow development' : 'Notify me at launch'}
    </a>
  );
}

function StoreLink({ href, store, accent }: { href: string; store: string; accent: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="btn app-cta" style={{ background: accent }}>
      Get it on {store}
    </a>
  );
}

export function AppIcon({ app, size }: { app: App; size: number }) {
  const style: CSSProperties = { width: size, height: size, borderRadius: size * 0.24, flexShrink: 0, boxShadow: `0 8px 24px ${withAlpha(app.accent, 0.25)}, inset 0 0 0 1px rgba(255,255,255,0.10)` };
  if (app.icon) return <img src={asset(app.icon)} alt="" width={size} height={size} style={{ ...style, objectFit: 'cover' }} loading="lazy" decoding="async" />;
  return (
    <span aria-hidden style={{ ...style, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(145deg, ${app.accent} 0%, ${withAlpha(app.accent, 0.35)} 100%)`, color: '#0E0E12', fontWeight: 700, fontSize: size * 0.42, letterSpacing: '-0.04em' }}>
      {app.title.charAt(0)}
    </span>
  );
}

function PhoneStack({ app }: { app: App }) {
  const [first, second] = app.screenshots ?? [];
  return (
    <div className="phone-stack" style={{ position: 'relative', width: 'clamp(220px, 22vw, 300px)', aspectRatio: '9 / 19' }}>
      <div className="phone-back" aria-hidden>
        <Phone app={app} src={second} variant={1} />
      </div>
      <div style={{ position: 'relative', height: '100%' }}>
        <Phone app={app} src={first} variant={0} />
      </div>
    </div>
  );
}

function Phone({ app, src, variant }: { app: App; src?: string; variant: 0 | 1 }) {
  return (
    <div style={{ height: '100%', borderRadius: '36px', padding: '9px', background: 'linear-gradient(160deg, #2a2b31 0%, #121317 100%)', boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 60px ${withAlpha(app.accent, 0.12)}, inset 0 0 0 1px rgba(255,255,255,0.08)` }}>
      <div style={{ position: 'relative', height: '100%', borderRadius: '28px', overflow: 'hidden', background: '#0B0B0F' }}>
        {src ? (
          <img src={asset(src)} alt={`${app.title} screenshot`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async" />
        ) : (
          <PlaceholderScreen app={app} variant={variant} />
        )}
        <span aria-hidden style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '28%', height: '18px', borderRadius: '999px', background: '#000' }} />
      </div>
    </div>
  );
}

/** Themed stand-in until real screenshots are added in content.ts. */
function PlaceholderScreen({ app, variant }: { app: App; variant: 0 | 1 }) {
  const bar = (w: string, o = 0.10, h = 8): CSSProperties => ({ width: w, height: h, borderRadius: 999, background: `rgba(255,255,255,${o})` });
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '44px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px', background: `radial-gradient(ellipse at 50% 0%, ${withAlpha(app.accent, 0.35)} 0%, transparent 60%), #0B0B0F` }}>
      {variant === 0 ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AppIcon app={app} size={32} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}><span style={bar('60%', 0.5)} /><span style={bar('35%')} /></div>
          </div>
          <div style={{ marginTop: '8px', aspectRatio: '1', borderRadius: '18px', background: `conic-gradient(from 200deg, ${withAlpha(app.accent, 0.9)}, ${withAlpha(app.accent, 0.15)}, ${withAlpha(app.accent, 0.9)})`, maskImage: 'radial-gradient(circle, transparent 42%, #000 43%, #000 62%, transparent 63%)', WebkitMaskImage: 'radial-gradient(circle, transparent 42%, #000 43%, #000 62%, transparent 63%)' }} />
          {[0.8, 0.55, 0.7].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: withAlpha(app.accent, 0.5 - i * 0.12) }} />
              <span style={bar(`${w * 100}%`)} />
            </div>
          ))}
        </>
      ) : (
        <>
          <span style={bar('45%', 0.5, 10)} />
          <span style={bar('70%')} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} style={{ borderRadius: '12px', background: i % 3 === 0 ? withAlpha(app.accent, 0.35) : 'rgba(255,255,255,0.05)' }} />
            ))}
          </div>
        </>
      )}
      <span style={{ ...TYPE.mono, marginTop: 'auto', textAlign: 'center', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Screenshot soon</span>
    </div>
  );
}
