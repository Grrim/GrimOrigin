import { useEffect, useState } from 'react';
import { PHeading, PText, PTag, PIcon } from '@porsche-design-system/components-react';
import { TOKENS, TYPE } from '../tokens';

type Chapter = {
  n: number;
  title: string;
  log: string;
};

const CHAPTERS: Chapter[] = [
  { n: 1, title: 'Ignition', log: 'A protostar collapses inward. Hydrogen begins to fuse — the first photon escapes the cradle.' },
  { n: 2, title: 'Main Sequence', log: 'Equilibrium settles. Gravity pulls, radiation pushes. A long quiet stability begins.' },
  { n: 3, title: 'Cosmic Dust', log: 'Drift through nebular fields. Particles cluster under weak gravity, sketching new geometries.' },
  { n: 4, title: 'Red Giant', log: 'The core contracts, the envelope swells. Outer layers bleed crimson into the void.' },
  { n: 5, title: 'Helium Flash', log: 'A sudden ignition deep in the core. The puzzle reshapes itself in a single brilliant pulse.' },
  { n: 6, title: 'The Companion', log: 'A binary partner enters orbit. Mutual gravity bends the path of every falling object.' },
  { n: 7, title: 'Stellar Winds', log: 'Mass shedding. Light pressure becomes a literal force shaping the level around you.' },
  { n: 8, title: 'Planetary Nebula', log: 'A glowing shell expands outward. Color, symmetry, and silence converge.' },
  { n: 9, title: 'White Dwarf', log: 'Density beyond intuition. Each step echoes through degenerate matter.' },
  { n: 10, title: 'Supernova', log: 'A constraint shatters. Energy releases. The board rearranges itself around the blast.' },
  { n: 11, title: 'Neutron Star', log: 'Spin and magnetism dominate. Lighthouse beams sweep across the play field.' },
  { n: 12, title: 'Singularity', log: 'The final chapter. Geometry inverts. The puzzle solves itself only by letting go.' },
];

type Props = { open: boolean; onClose: () => void };

export function LuminisDrawer({ open, onClose }: Props) {
  const [active, setActive] = useState(0);
  const chapter = CHAPTERS[active];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setActive((i) => Math.min(CHAPTERS.length - 1, i + 1));
      if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

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
        aria-labelledby="luminis-drawer-title"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 'min(720px, 100vw)',
          background: TOKENS.surfaceDeep,
          borderLeft: `1px solid ${TOKENS.borderSoft}`,
          boxShadow: '-24px 0 80px rgba(0,0,0,0.50)',
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
            padding: 'clamp(20px,1.5vw+12px,32px) clamp(20px,1.5vw+12px,40px)',
            borderBottom: `1px solid ${TOKENS.borderSoft}`,
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                ...TYPE.eyebrow,
                ...TYPE.mono,
                fontSize: '10px',
                color: TOKENS.accent,
                marginBottom: '6px',
              }}
            >
              LUMINIS · DEEP DIVE
            </div>
            <PHeading
              size="medium"
              tag="h2"
              theme="dark"
              id="luminis-drawer-title"
              style={{ letterSpacing: '-0.01em' }}
            >
              Stellar Evolution
            </PHeading>
          </div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              background: 'transparent',
              border: `1px solid ${TOKENS.borderSoft}`,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: TOKENS.textMute,
              transition: `border-color ${TOKENS.duration} ${TOKENS.ease}, color ${TOKENS.duration} ${TOKENS.ease}, background ${TOKENS.duration} ${TOKENS.ease}`,
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.borderColor = TOKENS.accent;
              btn.style.color = TOKENS.textHigh;
              btn.style.background = TOKENS.accentSoft;
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.borderColor = TOKENS.borderSoft;
              btn.style.color = TOKENS.textMute;
              btn.style.background = 'transparent';
            }}
          >
            <PIcon name="close" size="small" color="inherit" theme="dark" />
          </button>
        </header>

        {/* Body */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 280px) 1fr',
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Chapter list */}
          <nav
            aria-label="Chapters"
            style={{
              borderRight: `1px solid ${TOKENS.borderSoft}`,
              overflowY: 'auto',
              padding: '12px 0',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {CHAPTERS.map((c, i) => {
                const isActive = i === active;
                return (
                  <li key={c.n}>
                    <button
                      onClick={() => setActive(i)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        padding: '14px clamp(20px,1.5vw+12px,32px)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        position: 'relative',
                        color: isActive ? TOKENS.textHigh : TOKENS.textMute,
                        transition: `color ${TOKENS.duration} ${TOKENS.ease}, background ${TOKENS.duration} ${TOKENS.ease}`,
                        backgroundColor: isActive ? 'rgba(58,155,231,0.06)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLElement).style.color = TOKENS.textHigh;
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLElement).style.color = TOKENS.textMute;
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '14px',
                          bottom: '14px',
                          width: '2px',
                          background: TOKENS.accent,
                          transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                          transformOrigin: 'top',
                          transition: `transform 400ms ${TOKENS.ease}`,
                        }}
                      />
                      <span
                        style={{
                          ...TYPE.mono,
                          fontSize: '11px',
                          color: isActive ? TOKENS.accent : TOKENS.textDim,
                          minWidth: '24px',
                        }}
                      >
                        {String(c.n).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: isActive ? 600 : 400,
                          letterSpacing: '0.005em',
                        }}
                      >
                        {c.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Detail */}
          <div
            style={{
              padding: 'clamp(24px,2vw+16px,48px)',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at top right, rgba(58,155,231,0.06) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div key={chapter.n} style={{ position: 'relative', animation: `chapter-in 500ms ${TOKENS.easeOutExpo} both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <PTag theme="dark" variant="secondary">
                  Chapter {String(chapter.n).padStart(2, '0')} / 12
                </PTag>
                <span
                  style={{
                    ...TYPE.eyebrow,
                    ...TYPE.mono,
                    color: TOKENS.textDim,
                    fontSize: '10px',
                  }}
                >
                  SIM_LOG
                </span>
              </div>

              <PHeading
                size="x-large"
                tag="h3"
                theme="dark"
                style={{ marginBottom: '24px', letterSpacing: '-0.01em', lineHeight: 1.1 }}
              >
                {chapter.title}
              </PHeading>

              <PText
                size="medium"
                theme="dark"
                color="contrast-medium"
                style={{ lineHeight: 1.8, marginBottom: '32px' }}
              >
                {chapter.log}
              </PText>

              {/* Mock telemetry */}
              <div
                style={{
                  border: `1px solid ${TOKENS.borderSoft}`,
                  borderRadius: '12px',
                  padding: '20px',
                  background: 'rgba(0,0,0,0.30)',
                }}
              >
                <div
                  style={{
                    ...TYPE.eyebrow,
                    ...TYPE.mono,
                    fontSize: '9px',
                    color: TOKENS.textDim,
                    marginBottom: '12px',
                  }}
                >
                  TELEMETRY
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    ...TYPE.mono,
                    fontSize: '12px',
                  }}
                >
                  <Telemetry label="luminosity" value={`${(chapter.n * 0.42 + 1.2).toFixed(2)} L☉`} />
                  <Telemetry label="radius" value={`${(chapter.n * 1.8 + 0.4).toFixed(1)} R☉`} />
                  <Telemetry label="temp" value={`${(8000 - chapter.n * 320).toLocaleString()} K`} />
                  <Telemetry label="age" value={`${(chapter.n * 0.85).toFixed(2)} Gyr`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        @keyframes chapter-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function Telemetry({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
      <span style={{ color: TOKENS.textDim }}>{label}</span>
      <span style={{ color: TOKENS.accent }}>{value}</span>
    </div>
  );
}
