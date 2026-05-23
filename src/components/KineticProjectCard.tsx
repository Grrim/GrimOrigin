import { useRef, useState } from 'react';
import { PHeading, PText, PIcon } from '@porsche-design-system/components-react';
import { TOKENS, TYPE, prefersReducedMotion } from '../tokens';
import { useSpotlight } from '../hooks/useSpotlight';

export type ProjectItem = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  expandable?: boolean;
};

export type CardVariant = 'default' | 'hero' | 'wide';
export type CardTheme = 'nebula' | 'grain' | 'singularity' | 'minimal';

type Props = {
  project: ProjectItem;
  idx: number;
  onExpand?: () => void;
  variant?: CardVariant;
  theme?: CardTheme;
};

const MAX_TILT = 3.5;
const MAX_SHIFT = 6;

const GRAIN_DATA_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

function ThemeLayer({ theme, hovered }: { theme: CardTheme; hovered: boolean }) {
  if (theme === 'nebula') {
    return (
      <>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at var(--mx,30%) var(--my,30%),
              rgba(99,102,241,0.20) 0%,
              rgba(58,155,231,0.10) 30%,
              transparent 60%
            )`,
            opacity: hovered ? 1 : 0.7,
            transition: `opacity 600ms ${TOKENS.ease}`,
            pointerEvents: 'none',
          }}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 90% 110%,
              rgba(76,29,149,0.16) 0%,
              transparent 55%
            )`,
            pointerEvents: 'none',
          }}
        />
      </>
    );
  }
  if (theme === 'grain') {
    return (
      <>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: GRAIN_DATA_URL,
            backgroundSize: '220px 220px',
            opacity: 0.045,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg,
              rgba(120,53,15,0.10) 0%,
              rgba(0,0,0,0) 45%,
              rgba(0,0,0,0.25) 100%
            )`,
            pointerEvents: 'none',
          }}
        />
      </>
    );
  }
  if (theme === 'singularity') {
    return (
      <>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 23px,
              rgba(255,255,255,0.025) 24px
            )`,
            pointerEvents: 'none',
          }}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-20%',
            width: '60%',
            height: '120%',
            borderRadius: '50%',
            background: `radial-gradient(circle at 50% 50%,
              rgba(58,155,231,0.30) 0%,
              rgba(58,155,231,0.10) 28%,
              transparent 60%
            )`,
            filter: 'blur(20px)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: `transform 800ms ${TOKENS.easeOutExpo}`,
            pointerEvents: 'none',
          }}
        />
      </>
    );
  }
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg,
          rgba(255,255,255,0.02) 0%,
          rgba(58,155,231,0.04) 100%
        )`,
        pointerEvents: 'none',
      }}
    />
  );
}

function MonoBadge({
  children,
  emphasis = false,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <span
      style={{
        ...TYPE.mono,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontWeight: 600,
        color: emphasis ? TOKENS.accent : TOKENS.textMute,
        border: `1px solid ${emphasis ? TOKENS.accentBorder : TOKENS.borderSoft}`,
        background: emphasis ? TOKENS.accentSoft : 'rgba(0,0,0,0.30)',
        borderRadius: '999px',
        padding: '5px 10px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function MonoChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...TYPE.mono,
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '10px',
        letterSpacing: '0.10em',
        color: TOKENS.textMute,
        border: `1px solid ${TOKENS.borderSoft}`,
        borderRadius: '4px',
        padding: '4px 8px',
        background: 'rgba(0,0,0,0.30)',
      }}
    >
      {children}
    </span>
  );
}

export function KineticProjectCard({
  project,
  idx,
  onExpand,
  variant = 'default',
  theme = 'minimal',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  useSpotlight(ref);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(-py * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(px * MAX_TILT).toFixed(2)}deg`);
      el.style.setProperty('--shift-x', `${(px * MAX_SHIFT).toFixed(2)}px`);
      el.style.setProperty('--shift-y', `${(py * MAX_SHIFT).toFixed(2)}px`);
      el.style.setProperty('--shift-x-fast', `${(px * MAX_SHIFT * 1.6).toFixed(2)}px`);
      el.style.setProperty('--shift-y-fast', `${(py * MAX_SHIFT * 1.6).toFixed(2)}px`);
      el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
    });
  };

  const handleLeave = () => {
    setHovered(false);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--shift-x', '0px');
    el.style.setProperty('--shift-y', '0px');
    el.style.setProperty('--shift-x-fast', '0px');
    el.style.setProperty('--shift-y-fast', '0px');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  };

  const isClickable = !!onExpand;
  const Tag = isClickable ? 'button' : 'div';

  const sizes = {
    hero: {
      padding: 'clamp(24px, 2.5vw + 14px, 52px)',
      minHeight: 'clamp(320px, 30vw, 440px)',
      headingSize: 'x-large' as const,
    },
    wide: {
      padding: 'clamp(22px, 1.8vw + 12px, 36px)',
      minHeight: 'auto',
      headingSize: 'medium' as const,
    },
    default: {
      padding: 'clamp(24px, 2vw + 14px, 40px)',
      minHeight: 'clamp(260px, 22vw, 320px)',
      headingSize: 'large' as const,
    },
  }[variant];

  const idxBadge = String(idx + 1).padStart(2, '0');

  return (
    <Tag
      ref={ref as never}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      onClick={onExpand}
      type={isClickable ? 'button' : undefined}
      aria-label={isClickable ? `Open ${project.title} details` : undefined}
      className="reveal beam-card"
      style={{
        appearance: 'none',
        textAlign: 'left',
        width: '100%',
        height: '100%',
        padding: sizes.padding,
        minHeight: sizes.minHeight,
        transform: 'perspective(1100px) rotateX(var(--rx,0)) rotateY(var(--ry,0))',
        transformStyle: 'preserve-3d',
        cursor: isClickable ? 'pointer' : 'default',
        willChange: 'transform',
        display: 'flex',
        flexDirection: variant === 'wide' ? 'row' : 'column',
        alignItems: variant === 'wide' ? 'center' : 'stretch',
        gap: variant === 'wide' ? 'clamp(20px, 2vw + 12px, 40px)' : '0',
      }}
    >
      <ThemeLayer theme={theme} hovered={hovered} />

      {variant !== 'wide' && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: variant === 'hero' ? 'clamp(20px, 2vw, 36px)' : TYPE.spaceLg,
              transform: 'translate3d(var(--shift-x,0), var(--shift-y,0), 0)',
              transition: `transform 220ms ${TOKENS.ease}`,
            }}
          >
            <MonoBadge>
              <span style={{ color: TOKENS.accent }}>{idxBadge}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{project.category}</span>
            </MonoBadge>
            <PIcon
              name={project.expandable ? 'arrow-right' : 'external'}
              size="small"
              color="contrast-medium"
              theme="dark"
              style={{
                transform: hovered ? 'translate(2px,-2px)' : 'translate(0,0)',
                transition: `transform 400ms ${TOKENS.ease}`,
                color: hovered ? TOKENS.accent : undefined,
                flexShrink: 0,
              }}
            />
          </div>

          {variant === 'hero' && <div style={{ flex: 1 }} />}

          <div
            style={{
              transform:
                'translate3d(var(--shift-x-fast,0), var(--shift-y-fast,0), 0)',
              transition: `transform 220ms ${TOKENS.ease}`,
            }}
          >
            <PHeading
              size={sizes.headingSize}
              tag="h3"
              theme="dark"
              style={{
                marginBottom: '14px',
                letterSpacing: variant === 'hero' ? '-0.025em' : '-0.015em',
                lineHeight: variant === 'hero' ? 1.04 : 1.12,
              }}
            >
              {project.title}
            </PHeading>
          </div>

          <div
            style={{
              transform:
                'translate3d(calc(var(--shift-x,0) * 0.5), calc(var(--shift-y,0) * 0.5), 0)',
              transition: `transform 220ms ${TOKENS.ease}`,
              maxWidth: variant === 'hero' ? '720px' : 'none',
            }}
          >
            <PText
              size={variant === 'hero' ? 'medium' : 'small'}
              color="contrast-medium"
              theme="dark"
              style={{ lineHeight: 1.75, marginBottom: '20px' }}
            >
              {project.description}
            </PText>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map((tag) => (
                <MonoChip key={tag}>{tag}</MonoChip>
              ))}
            </div>
          </div>

          {project.expandable && (
            <div
              style={{
                marginTop: variant === 'hero' ? 'clamp(20px, 2vw, 32px)' : '24px',
                paddingTop: '16px',
                borderTop: `1px solid ${TOKENS.borderSoft}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <span
                style={{
                  ...TYPE.mono,
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: hovered ? TOKENS.accent : TOKENS.textMute,
                  transition: `color ${TOKENS.duration} ${TOKENS.ease}`,
                }}
              >
                12 Chapters · Deep Dive
              </span>
              <span
                style={{
                  ...TYPE.mono,
                  fontSize: '11px',
                  letterSpacing: '0.10em',
                  color: hovered ? TOKENS.accent : TOKENS.textMute,
                  transition: `color ${TOKENS.duration} ${TOKENS.ease}`,
                }}
              >
                Open →
              </span>
            </div>
          )}
        </>
      )}

      {variant === 'wide' && (
        <>
          <div
            style={{
              flex: '0 0 auto',
              transform: 'translate3d(var(--shift-x,0), var(--shift-y,0), 0)',
              transition: `transform 220ms ${TOKENS.ease}`,
            }}
          >
            <MonoBadge>
              <span style={{ color: TOKENS.accent }}>{idxBadge}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{project.category}</span>
            </MonoBadge>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              transform:
                'translate3d(var(--shift-x-fast,0), var(--shift-y-fast,0), 0)',
              transition: `transform 220ms ${TOKENS.ease}`,
            }}
          >
            <PHeading
              size="medium"
              tag="h3"
              theme="dark"
              style={{
                marginBottom: '8px',
                letterSpacing: '-0.005em',
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </PHeading>
            <PText
              size="small"
              color="contrast-medium"
              theme="dark"
              style={{ lineHeight: 1.7 }}
            >
              {project.description}
            </PText>
          </div>
          <div
            style={{
              flex: '0 0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              maxWidth: '240px',
              justifyContent: 'flex-end',
            }}
          >
            {project.tags.map((tag) => (
              <MonoChip key={tag}>{tag}</MonoChip>
            ))}
          </div>
          <PIcon
            name="external"
            size="small"
            color="contrast-medium"
            theme="dark"
            style={{
              flexShrink: 0,
              transform: hovered ? 'translate(2px,-2px)' : 'translate(0,0)',
              transition: `transform 400ms ${TOKENS.ease}`,
              color: hovered ? TOKENS.accent : undefined,
            }}
          />
        </>
      )}
    </Tag>
  );
}
