import { useEffect, useRef, useState } from 'react';
import { TOKENS, TYPE, withAlpha } from '../tokens';
import type { App } from '../content';
import { AppIcon } from './AppShowcase';

type Props = { app: App; open: boolean; onClose: () => void };

/** Side drawer with a master/detail view of an app's `details` items. */
export function AppDrawer({ app, open, onClose }: Props) {
  const { items } = app.details;
  // Selection resets whenever a different app is shown.
  const [selection, setSelection] = useState({ id: app.id, index: 0 });
  const active = selection.id === app.id ? selection.index : 0;
  const select = (index: number) => setSelection({ id: app.id, index });
  const item = items[active];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelection((s) => ({ id: app.id, index: Math.min(items.length - 1, (s.id === app.id ? s.index : 0) + 1) }));
      if (e.key === 'ArrowUp') setSelection((s) => ({ id: app.id, index: Math.max(0, (s.id === app.id ? s.index : 0) - 1) }));
    };
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus({ preventScroll: true });
    };
  }, [open, onClose, app.id, items.length]);

  const pad = String(items.length).length < 2 ? 2 : String(items.length).length;

  return (
    <>
      {/* Backdrop */}
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

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-drawer-title"
        aria-hidden={!open}
        inert={!open}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100dvh',
          width: 'min(760px, 100vw)',
          background: TOKENS.surfaceDeep,
          borderLeft: `1px solid ${TOKENS.borderSoft}`,
          boxShadow: open ? '-24px 0 80px rgba(0,0,0,0.50)' : 'none',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform 500ms ${TOKENS.easeOutExpo}`,
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: 'clamp(20px, 1.5vw + 12px, 32px) clamp(20px, 1.5vw + 12px, 40px)',
            borderBottom: `1px solid ${TOKENS.borderSoft}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
            <AppIcon app={app} size={44} />
            <div style={{ minWidth: 0 }}>
              <div style={{ ...TYPE.eyebrow, ...TYPE.mono, fontSize: '10px', color: app.accent, marginBottom: '6px' }}>
                {app.details.eyebrow}
              </div>
              <h2 id="app-drawer-title" style={{ margin: 0, fontSize: 'clamp(22px, 1vw + 16px, 28px)', fontWeight: 600, letterSpacing: '-0.01em', color: TOKENS.textHigh }}>
                {app.details.heading}
              </h2>
            </div>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="icon-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </header>

        {/* Body */}
        <div className="drawer-body">
          {/* Item list */}
          <nav aria-label={`${app.details.itemLabel}s`} className="drawer-list">
            <ul>
              {items.map((it, i) => {
                const isActive = i === active;
                return (
                  <li key={it.title}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={isActive ? 'true' : undefined}
                      className="drawer-item"
                      style={{ ['--app-accent' as never]: app.accent, color: isActive ? TOKENS.textHigh : undefined, backgroundColor: isActive ? withAlpha(app.accent, 0.08) : undefined }}
                    >
                      <span aria-hidden className="drawer-item-bar" />
                      <span style={{ ...TYPE.mono, fontSize: '11px', color: isActive ? app.accent : TOKENS.textDim, minWidth: '24px' }}>
                        {String(i + 1).padStart(pad, '0')}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 400, letterSpacing: '0.005em' }}>{it.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Detail */}
          <div style={{ padding: 'clamp(24px, 2vw + 16px, 48px)', overflowY: 'auto', position: 'relative' }} data-lenis-prevent>
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at top right, ${withAlpha(app.accent, 0.08)} 0%, transparent 60%)`, pointerEvents: 'none' }} />
            <div key={`${app.id}-${active}`} style={{ position: 'relative', animation: `chapter-in 500ms ${TOKENS.easeOutExpo} both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ ...TYPE.mono, fontSize: '11px', color: TOKENS.textMute, border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '6px', padding: '4px 8px' }}>
                  {app.details.itemLabel} {String(active + 1).padStart(pad, '0')} / {String(items.length).padStart(pad, '0')}
                </span>
              </div>

              <h3 style={{ fontSize: 'clamp(28px, 2vw + 18px, 40px)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1, color: TOKENS.textHigh, margin: '0 0 24px' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '16px', lineHeight: 1.8, color: TOKENS.textMute, margin: '0 0 32px' }}>{item.body}</p>

              {item.meta && (
                <div style={{ border: `1px solid ${TOKENS.borderSoft}`, borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.30)' }}>
                  <div style={{ ...TYPE.eyebrow, ...TYPE.mono, fontSize: '9px', color: TOKENS.textDim, marginBottom: '12px' }}>Telemetry</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', ...TYPE.mono, fontSize: '12px' }}>
                    {item.meta.map(([label, value]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                        <span style={{ color: TOKENS.textDim }}>{label}</span>
                        <span style={{ color: app.accent }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
