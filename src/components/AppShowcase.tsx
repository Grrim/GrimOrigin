import type { CSSProperties } from 'react';
import { TYPE, withAlpha } from '../tokens';
import { asset, type App } from '../content';

const CONTACT_EMAIL = 'grimssys@gmail.com';
const pad3 = (n: number) => String(n).padStart(3, '0');

/** Catalogue of titles: each app is a numbered dossier entry. */
export function AppShowcase({ apps, onOpen }: { apps: App[]; onOpen: (id: string) => void }) {
  return (
    <div className="entries">
      {apps.map((app, i) => (
        <Entry key={app.id} app={app} index={i} onOpen={() => onOpen(app.id)} />
      ))}
    </div>
  );
}

function Entry({ app, index, onOpen }: { app: App; index: number; onOpen: () => void }) {
  const live = app.status !== 'In Development';
  const specs: [string, string][] = [
    ['Type', app.kind],
    ['Genre', app.tags.join(', ')],
    ['Dossier', `${app.details.items.length} ${app.details.itemLabel.toLowerCase()}s`],
    ['Status', app.status === 'Closed Testing' ? 'Closed testing on Google Play' : app.status],
  ];

  return (
    <article className={`entry reveal${index % 2 ? ' is-flipped' : ''}`} aria-labelledby={`app-${app.id}`} style={{ ['--app-accent' as never]: app.accent }}>
      <header className="entry-head">
        <span className="entry-no">GO—{pad3(index + 1)}</span>
        <span>{app.kind}</span>
        <span className={`entry-status${live ? ' is-live' : ''}`}><span aria-hidden className="status-dot" />{app.status}</span>
        <span className="entry-year">2026</span>
      </header>

      <div className="entry-body">
        <div className="entry-main">
          <div className="entry-title-row">
            <AppIcon app={app} size={56} />
            <h3 id={`app-${app.id}`} className="entry-title">{app.title}</h3>
          </div>
          <p className="entry-tagline">{app.tagline}</p>
          <p className="entry-desc">{app.description}</p>

          <dl className="spec">
            {specs.map(([k, v]) => (
              <div key={k} className="spec-row">
                <dt>{k}</dt>
                <span aria-hidden className="spec-leader" />
                <dd className={k === 'Status' && live ? 'is-live' : undefined}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="entry-actions">
            <StoreButtons app={app} />
            <button type="button" onClick={onOpen} className="btn btn-ghost" aria-haspopup="dialog">
              Open dossier <span aria-hidden className="btn-arrow">→</span>
            </button>
          </div>
          {app.privacyHref && (
            <a href={asset(app.privacyHref)} target="_blank" rel="noopener" className="text-link entry-privacy">
              Privacy policy
            </a>
          )}
        </div>

        <figure className="entry-visual">
          <span aria-hidden className="corner corner-tl" />
          <span aria-hidden className="corner corner-br" />
          <PhoneStack app={app} />
          <figcaption>Fig. {index + 1} — {app.title}{app.screenshots?.length ? '' : ', placeholder screens'}</figcaption>
        </figure>
      </div>
    </article>
  );
}

function StoreButtons({ app }: { app: App }) {
  const { googlePlay, appStore } = app.links ?? {};
  if (googlePlay || appStore) {
    return (
      <>
        {googlePlay && <a href={googlePlay} target="_blank" rel="noopener" className="btn btn-primary">Google Play <span aria-hidden className="btn-arrow">{'↗︎'}</span></a>}
        {appStore && <a href={appStore} target="_blank" rel="noopener" className="btn btn-primary">App Store <span aria-hidden className="btn-arrow">{'↗︎'}</span></a>}
      </>
    );
  }
  if (app.status === 'Closed Testing') {
    const subject = encodeURIComponent(`Closed test access: ${app.title}`);
    const body = encodeURIComponent('Hi! I would like to join the closed test on Google Play.\nMy Google account e-mail: ');
    return (
      <a href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`} className="btn btn-primary">
        Join the closed test
      </a>
    );
  }
  const subject = encodeURIComponent(`Notify me: ${app.title} launch`);
  return (
    <a href={`mailto:${CONTACT_EMAIL}?subject=${subject}`} className="btn btn-primary">
      {app.status === 'In Development' ? 'Follow development' : 'Notify me at launch'}
    </a>
  );
}

export function AppIcon({ app, size }: { app: App; size: number }) {
  const style: CSSProperties = { width: size, height: size, borderRadius: size * 0.22, flexShrink: 0, boxShadow: 'inset 0 0 0 1px rgba(236,230,216,0.14)' };
  if (app.icon) return <img src={asset(app.icon)} alt="" width={size} height={size} style={{ ...style, objectFit: 'cover' }} loading="lazy" decoding="async" />;
  return (
    <span aria-hidden style={{ ...style, ...TYPE.display, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(145deg, ${app.accent} 0%, ${withAlpha(app.accent, 0.35)} 100%)`, color: '#0C0B09', fontWeight: 800, fontSize: size * 0.5, lineHeight: 1 }}>
      {app.title.charAt(0)}
    </span>
  );
}

function PhoneStack({ app }: { app: App }) {
  const [first, second] = app.screenshots ?? [];
  return (
    <div className="phone-stack">
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
    <div style={{ height: '100%', borderRadius: '34px', padding: '8px', background: 'linear-gradient(160deg, #2b2925 0%, #12110f 100%)', boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(236,230,216,0.10)' }}>
      <div style={{ position: 'relative', height: '100%', borderRadius: '27px', overflow: 'hidden', background: '#0B0A08' }}>
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
  const bar = (w: string, o = 0.10, h = 8): CSSProperties => ({ width: w, height: h, borderRadius: 999, background: `rgba(236,230,216,${o})` });
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '44px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px', background: `radial-gradient(ellipse at 50% 0%, ${withAlpha(app.accent, 0.32)} 0%, transparent 60%), #0B0A08` }}>
      {variant === 0 ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AppIcon app={app} size={32} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}><span style={bar('60%', 0.5)} /><span style={bar('35%')} /></div>
          </div>
          <div style={{ marginTop: '8px', aspectRatio: '1', borderRadius: '18px', background: `conic-gradient(from 200deg, ${withAlpha(app.accent, 0.9)}, ${withAlpha(app.accent, 0.15)}, ${withAlpha(app.accent, 0.9)})`, maskImage: 'radial-gradient(circle, transparent 42%, #000 43%, #000 62%, transparent 63%)', WebkitMaskImage: 'radial-gradient(circle, transparent 42%, #000 43%, #000 62%, transparent 63%)' }} />
          {[0.8, 0.55, 0.7].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '12px', background: 'rgba(236,230,216,0.04)', border: '1px solid rgba(236,230,216,0.05)' }}>
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
              <span key={i} style={{ borderRadius: '12px', background: i % 3 === 0 ? withAlpha(app.accent, 0.35) : 'rgba(236,230,216,0.05)' }} />
            ))}
          </div>
        </>
      )}
      <span style={{ ...TYPE.mono, marginTop: 'auto', textAlign: 'center', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(236,230,216,0.35)' }}>Screenshot soon</span>
    </div>
  );
}
